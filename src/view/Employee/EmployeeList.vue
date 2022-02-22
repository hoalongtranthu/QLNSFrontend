<template>
    <div id="maincontent" class="maincontent">
        <div class="content-header">
            <div class="content-tittle">Nhân Viên</div>
            <button class="m-button" @click="OpenEmployeeForm">Thêm nhân viên</button>
        </div>
        <div class="content-body">
            <div class="content-body-table">
                <div class="content-body-tool">
                    <Dropdown style="z-index: 103" :contentFull="false">
                        <template #trigger>
                            <div class="around-dropdown">
                                <span>Thực hiện hàng loại</span>
                                <Icons icon="arrow-down-black" :size="16"/>
                            </div>
                        </template>
                        <ul class="ul" style="width:100px">
                            <li class="li" @click="deleteSomeEmployees">Xóa</li>
                        </ul>
                    </Dropdown>
                    <div class="main-tool">
                    <div class="input-search">
                        <input type="text" class="m-input " placeholder="Tìm theo mã, tên nhân viên,..." v-model="filter">
                        <div class="input-icon-search mi mi-16"></div>
                    </div>
                    <Icons icon="excel" @click="getExcelFile" />
                    <button class="m-button-onlyicon mi m-24" @click="reLoadData"></button>
                    </div>
                </div>
                <Table ref="tableEmployee" :headers="employeeHeaders" :items="employees" keyName="employeeId" 
                style="max-height: 510px; max-width: 1280px;" v-model="selectedEmployeeIds" 
                :showAction="true" @selectedRow="EditEmployee" @updateSelectedIds="setSelectedEmployeeIds">
                    <template #actions="{ item }">
                        <button @click="EditEmployee(item)">Sửa</button>
                        <Dropdown :appendToBody="true">
                            <template #trigger="{ active }">
                                <Icons
                                icon="arrow-down-blue"
                                :size="16"
                                :style="active && 'border: 1px solid #0075c2;'"
                                />
                            </template>
                            <ul class="ul" style="width:150px">
                            <li class="li" @click="CloneEmployee(item)">Nhân bản</li>
                            <li class="li" @click="DelEmp(item)">Xóa</li>
                            <li class="li">Ngừng sử dụng</li>
                            </ul>
                        </Dropdown>
                    </template>
                </Table>
            </div>
        </div>
        <div id="footer">
            <div class="footer">
                <div class="footer-total">Tổng số: {{TotalRecord}} Nhân viên</div>
                <div class="footer-chose">
                    <Combobox :items="pageListOption" labelMember="text" :top="true" :defaultSelected="pageListOption[0]" @select="setPage" valueMenber="value" readonly="readonly"/>
                    <Pagination :itemCount="TotalRecord" :maxDisplayPage="3" :page="PageNumber" :perPage="PageSize" @pageChange="pageChange"/>
                </div>
            </div>
        </div>
        <EmployeeForm :employee="employee" :display="displayMode" v-if="ShowEmployeeForm" 
        @CloseForm="CloseForm()" @reloadData="getData()" :dep="dep" @ShowToast="ShowToasts"/>
        <InfoPopup :title="title" v-if="ShowInfoDialog" @close="no" @yes="yes"/>
        <WarningPopup :title="title" v-if="ShowWarningDialog" @close="no"/>
        <ToastMesage :mesage="mesage" v-if="ShowToast" @closeToast="closeToast"/>
        <Loader v-if="ShowLoader"/>
    </div>
</template>
<style scoped>
@import url('../../style/layout/content/content.css');
@import url('../../style/layout/content/footer.css');
@import url('../../style/component/checkbox.css');
</style>
<script>
import axios from 'axios'
import EmployeeForm from '../Employee/EmployeeForm.vue'
import InfoPopup from '../../components/Base/BasePopup/InfoPopup.vue'
import WarningPopup from '../../components/Base/BasePopup/WarningPopup.vue'
import Dropdown from '../../components/Base/Dropdown.vue'
import Loader from '../../components/Base/Loader.vue'
import Api from '../../js/api'
import Pagination from '../../components/Base/Pagination.vue'
import Combobox from '../../components/Base/Combobox.vue'
import Table from '../../components/Base/Table.vue'
import Icons from '../../components/Base/Icons.vue'
import ToastMesage from '../../components/Base/ToastMesage.vue'
import Resource from '../../js/resource'
import MisaEnum from '../../js/misaEnum'
import FormatData from '../../js/FormatData'

export default {
    //khởi tạo các component
    components:{
        EmployeeForm,
        InfoPopup,
        WarningPopup,
        Dropdown,
        Loader,
        Pagination,
        Combobox,
        Table,
        Icons,
        ToastMesage
    },
    //lấy data khi khởi chạy xong vue
    created(){
        this.getData();

    },
    watch:{
        /*theo dõi dữ liệu ô tìm kiếm để gọi api load lại dữ liệu
        * author:LAĐức(10/02/2022)
        */
        filter:function(val){
            this.filter=val;
            this.PageNumber=1;
            this.getData();
        }
    },
    methods: {
        /*load lại dữ liệu của trang web
        * author:LAĐức(10/02/2022)
        */
        reLoadData(){
            this.filter="";
            this.PageNumber=1;
            this.getData();
        },

        /*gọi api để lấy dữ liệu cho web
        * author:LAĐức(10/02/2022)
        */
        async getData(){
            var me=this;
            try{
            await axios.get(`${Api.employeeApi}/Pagination`,
            {
                params:{
                    PageSize:this.PageSize,
                    PageNumber:this.PageNumber,
                    empfilter:this.filter
                }
            })
            .then( function(response){
                console.log(response);
                me.employees=response.data.data;
                me.TotalPage=response.data.totalPage;
                me.TotalRecord=response.data.totalRecord;
            })
            .catch(function(response){
            console.log(response);
            })
        }
        catch(err){
            console.log(err);
        }
        },

    /*mở form chi tiết để clone thông tin nhân viên 
     * author:LAĐức(10/02/2022)
     */
    async CloneEmployee(item){
        var me=this;
        me.ShowLoader=true;
        this.displayMode=MisaEnum.enumMethod.clone;
        this.employee=(await axios.get(`${Api.employeeApi}/${item.employeeId}`)).data;
        await axios.get(`${Api.departmentApi}/${item.departmentId}`)
        .then(function(res){
            console.log(res.data);
            me.dep=res.data;
        })
        .catch(function(res){
            console.log(res);
        })
        .finally(me.ShowLoader=false);
        me.ShowLoader=true;
        await axios.get(`${Api.employeeApi}/NewEmployeeCode`)
            .then(function(res){
            me.employee.employeeCode=res.data;
            console.log( me.employee.employeeCode);
            })
            .catch(function(res){
            console.log(res);
            })
            .finally(me.ShowLoader=false);
        this.ShowEmployeeForm=true;
    },

    /*mở form chi tiết để thêm thông tin nhân viên 
     * author:LAĐức(10/02/2022)
     */
    async OpenEmployeeForm(){
        var me=this;
        this.dep=null;
        this.displayMode=MisaEnum.enumMethod.add;
        //khởi tạo 1 employee mới
        this.employee={ 
        employeeCode:"",
        fullName: "",
        departmentId: "",
        gender: 1,
        dateOfBirth: "",
        phoneNumber: "",
        email: "",
        address: "",
        identityNumber: "",
        identityPlace: "",
        telephoneNumber: "",
        position: "",
        departmentName: "",
        bankName: "",
        bankNumber: "",
        bankPlace: "",
      };
      //gọi api để lấy mã nhân viên mới nhất
          try{
              me.ShowLoader=true;
              await axios.get(`${Api.employeeApi}/NewEmployeeCode`)
                    .then(function(res){
                    me.employee.employeeCode=res.data;
                    console.log( me.employee.employeeCode);
                    })
                    .catch(function(res){
                    console.log(res);
                    })
                    .finally(me.ShowLoader=false);
            }
            catch(err){
                console.log(err);
            }
        this.ShowEmployeeForm=true;

    },

    /*mở form chi tiết để sửa thông tin nhân viên 
     * author:LAĐức(10/02/2022)
     */
    async EditEmployee(employee){
        var me=this;
        this.employee=employee;
        this.displayMode=MisaEnum.enumMethod.update;
        me.ShowLoader=true;
        await axios.get(`${Api.departmentApi}/${employee.departmentId}`)
        .then(function(res){
            console.log(res.data);
            me.dep=res.data;
        })
        .catch(function(res){
            console.log(res);
        })
        .finally(me.ShowLoader=false);
        this.ShowEmployeeForm=true;
    },

    /*mở form xác nhận xóa khi click xóa 
     * author:LAĐức(10/02/2022)
     */
    DelEmp(emp){
        this.employee=emp;
        this.deleteType=0;
        this.ShowInfoDialog=true;
        this.title=FormatData.formatString(Resource.resource.VN.deleteOneEmployee, emp.employeeCode) ;
    },

    /*nếu không đồng ý xóa 
     * author:LAĐức(10/02/2022)
     */
    no(){
        this.ShowInfoDialog=false;
        this.ShowWarningDialog=false;
    },

    /*nếu đồng ý xóa
     * author:LAĐức(10/02/2022)
     */
    async yes(){
        var me = this;
        this.ShowInfoDialog = false;
        me.ShowLoader = true;
        //nếu là xóa 1 nhân viên thì gọi api xóa 1 nhân viên
        if(this.deleteType==0){
        await axios.delete(`${Api.employeeApi}/${me.employee.employeeId}`)
        .then(function(res){
            console.log(res);
            me.getData();
        })
        .catch(function(res){
            console.log(res);
            
        })
        .finally(function(){
            me.ShowLoader=false;
            me.mesage=FormatData.formatString(Resource.resource.VN.successfull,Resource.resource.VN.deleteEmployee);
            me.ShowToast=true;
            setTimeout(()=>{
                me.ShowToast=false;
            },4000);
        });
        }
        //nếu là xóa nhiều thì gọi api xóa nhiều
        if(this.deleteType==1){
        await axios.delete(`${Api.employeeApi}/DeleteSomeEmployee`,{data:me.selectedEmployeeIds})
        .then(function(response){
            console.log(response);
            me.getData();
            me.$refs.tableEmployee.setEmptyArray();
        })
        .catch(function(res){
            console.log(res);
        })
        .finally(function(){
            me.ShowLoader=false;
            me.mesage=FormatData.formatString(Resource.resource.VN.successfull,Resource.resource.VN.deleteEmployee);
            me.ShowToast=true;
            setTimeout(()=>{
                me.ShowToast=false;
            },4000);
        });
        }   
    },

    /*đóng form
     * author:LAĐức(10/02/2022)
     */
    CloseForm(){
        this.ShowEmployeeForm=false;
    },

    /*thay đổi trang hiển thị
     * author:LAĐức(11/02/2022)
     */
    pageChange(value){
        this.PageNumber=value;
        this.getData();
    },

    /*thay đổi số lượng bản ghi trên 1 trang
     * author:LAĐức(11/02/2022)
     */
    setPage(item){
        this.PageSize=item.value;
        this.PageNumber=1;
        this.getData();
    },

    /*lấy danh sách các nhân viên khi được chọn 
     * author:LAĐức(10/02/2022)
     */
    setSelectedEmployeeIds(listIds){
        this.selectedEmployeeIds=listIds;
    },

    /*hiển thị popup thông báo khi xóa nhiều
     * author:LAĐức(11/02/2022)
     */
    deleteSomeEmployees(){
        if(this.selectedEmployeeIds.length<=0){
            this.title=FormatData.formatString(Resource.resource.VN.excuteBulk);
            this.ShowWarningDialog=true;
        }
        else{
            this.deleteType=1;
            this.title=FormatData.formatString(Resource.resource.VN.deleteSomeEmployees, this.selectedEmployeeIds.length);
            this.ShowInfoDialog=true;
        }
    },

    /*lấy file excel thông tin nhân viên
     * author:LAĐức(13/02/2022)
     */
    getExcelFile(){
        location.href= `${Api.employeeApi}/ExcelFile`;
    },

    /*đóng toast bằng chuột nếu muốn
     * author:LAĐức(13/02/2022)
     */
    closeToast(){
        this.ShowToast=false;
    },
    ShowToasts(msg){
        this.mesage=msg;
        this.ShowToast=true;
        setTimeout(()=>{
            this.ShowToast=false;
        },4000);
    }
    },

    //dữ liệu của component
    data(){
        return{
            selectedEmployeeIds:[],
            employees: [],
            employee:{},
            displayMode:0,
            ShowInfoDialog:false,
            ShowWarningDialog:false,
            deleteType:0,
            ShowEmployeeForm:false,
            title:"",
            ShowLoader:false,
            mesage:"",
            ShowToast:false,
            dep:{},
            pageListOption:[
                {text:"10 nhân viên/trang",value:10,},
                {text:"20 nhân viên/trang",value:20,},
                {text:"30 nhân viên/trang",value:30,},
                {text:"50 nhân viên/trang",value:40,},
                {text:"100 nhân viên/trang",value:100,},
            ],
            employeeHeaders:[
                { text: "Mã nhân viên", propName: "employeeCode", width: 150, classes:"text-align-left"},
                { text: "Tên nhân viên", propName: "fullName", width: 174 , classes:"text-align-left"},
                { text: "Giới tính", propName: "gender", width: 100, format: "gender", classes:"text-align-left"},
                { text: "Ngày sinh", propName: "dateOfBirth", format: "date", width: 110, classes:"text-align-center"},
                { text: "Số CMND", propName: "identityNumber", width: 100, classes:"text-align-left" },
                { text: "Chức danh", propName: "position", width: 150, classes:"text-align-left" },
                { text: "Tên đơn vị", propName: "departmentName", width: 200, classes:"text-align-left" },
                { text: "Số tài khoản", propName: "bankNumber", width: 150, classes:"text-align-left" },
                { text: "Tên ngân hàng", propName: "bankName", width: 200, classes:"text-align-left" },
                { text: "Chi nhánh TK ngân hàng", propName: "bankPlace", width: 250, classes:"text-align-left"},
                // { text: "Địa chỉ", propName: "address", width: 200, classes:"text-align-left" },
                //{ text: "Ngày cấp", propName: "identityDate", width: 110, format: "date", classes:"text-align-center"},
                // { text: "Nơi cấp", propName: "identityPlace", width: 140, classes:"text-align-left" },
                // { text: "ĐT di động", propName: "phoneNumber", width: 150, classes:"text-align-left" },
                // { text: "ĐT cố định", propName: "telephoneNumber", width: 150, classes:"text-align-left" },
                // { text: "Email", propName: "email", width: 200, classes:"text-align-left" },
                // { text: "Mã đơn vị", propName: "departmentCode", width: 150, classes:"text-align-left" },
                // { text: "Ngày tạo", propName: "createdDate", format: "date", width: 150, classes:"text-align-center" },
                // { text: "Người tạo", propName: "createdBy", width: 150, classes:"text-align-left" },
                // {text: "Ngày sửa", propName: "modifiedDate", format: "date", width: 150, classes:"text-align-center"},
                // { text: "Người sửa", propName: "modifiedBy", width: 150 , classes:"text-align-left" },
            ],
            PageSize:10,
            PageNumber:1,
            TotalPage:0,
            TotalRecord:0,
            filter:"",
        }
    }
}
</script>