<template>
    <div class="employee-form">
        <div class="employee-form-bg"></div>
        <div class="employee-form-content">
        <div class="employee-form-header">
            <div class="form-header-tittle">Thông tin nhân viên</div>
            <div class="form-header-option">
                <Checkbox/>Là khách hàng         
                <Checkbox/>Là nhà cung cấp
            </div>
            <div class="form-header-button">
                <div class="form-help-container"><div class="mi mi-24 form-help"></div></div>
                <div class="form-close-container"><div class="mi mi-24 form-close" @click="CloseForm()"></div></div>
                
            </div>
        </div>
        <div class="employee-form-body">
            <div class="employee-form-bodytop">
                <div class="bodytop-block">
                    <div class="bodytop-block-line">
                        <div class="employee-pro m-40">
                            <div class="employee-pro-name ">Mã<span style="color:red;">*</span></div>
                            <div class="employee-pro-input">
                                <input ref="employeeCode" type="text" class="m-input" v-model="item.employeeCode" id="EmployeeCode" 
                                :class="{'input-error': !isEmployeeCode.isTrue}" :title="isEmployeeCode.title"
                                @change="validateData()">
                            </div>
                        </div>
                        <div class="employee-pro">
                            <div class="employee-pro-name m-60">Tên<span style="color:red;">*</span></div>
                            <div class="employee-pro-input">
                                <input type="text" class="m-input" v-model="item.fullName" id="EmployeeName" 
                                :class="{'input-error': !isFullName.isTrue}" :title="isFullName.title"
                                @change="validateData()">
                            </div>
                        </div>
                    </div>
                    <div class="bodytop-block-line">
                        <div class="employee-pro">
                            <div class="employee-pro-name">Đơn vị<span style="color:red;">*</span></div>
                            <div class="employee-pro-input">
                                <Combobox ref="departmentCombobox" :items="departments" @open="LoadDepartments" labelMember="departmentName" 
                                @select="setSelectedDepartment" :defaultSelected="department" valueMenber="departmentId" 
                                :error="!isDepartment" readonly="readonly"/>
                            </div>
                        </div>
                    </div>
                    <div class="bodytop-block-line">
                        <div class="employee-pro">
                            <div class="employee-pro-name">Chức danh</div>
                            <div class="employee-pro-input">
                                <input type="text" class="m-input" v-model="item.position" @change="validateData()">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="bodytop-block">
                    <div class="bodytop-block-line">
                        <div class="employee-pro">
                            <div class="employee-pro-name">Ngày sinh</div>
                            <div class="employee-pro-input">
                                <DatePicker v-model="item.dateOfBirth" format="DD/MM/YYYY" value-type="YYYY-MM-DD" 
                                placeholder="DD/MM/YYYY" lang="vi" :input-class="{'m-input':true,'input-error': !isDateOfBirth.isTrue}" 
                                :title="isDateOfBirth.title" @change="validateData()"/>
                            </div>
                        </div>
                        <div class="employee-pro">
                            <div class="employee-pro-name">Giới tính</div>
                            <div class="employee-pro-input">
                                    <input type="radio" class="m-radio" name="gender" value="1" v-model="item.gender" @change="validateData()">Nam
                                    <input type="radio" class="m-radio" name="gender" value="0" v-model="item.gender" @change="validateData()">Nữ
                                    <input type="radio" class="m-radio" name="gender" value="2" v-model="item.gender" @change="validateData()">Khác
                            </div>
                        </div>
                    </div>
                    <div class="bodytop-block-line">
                        <div class="employee-pro">
                            <div class="employee-pro-name">Số CMND</div>
                            <div class="employee-pro-input">
                                <input type="text" class="m-input m-60" v-model="item.identityNumber" @change="validateData()">
                            </div>
                        </div>
                        <div class="employee-pro m-40">
                            <div class="employee-pro-name">Ngày cấp</div>
                            <div class="employee-pro-input">
                                <DatePicker v-model="item.identityDate" format="DD/MM/YYYY" value-type="YYYY-MM-DD" 
                                placeholder="DD/MM/YYYY" lang="vi" :input-class="{'m-input':true,'input-error': !isIdentityDate.isTrue}" 
                                :title="isIdentityDate.title" @change="validateData()"/>
                            </div>
                        </div>
                    </div>

                    <div class="bodytop-block-line">
                        <div class="employee-pro">
                            <div class="employee-pro-name">Nơi cấp</div>
                            <div class="employee-pro-input">
                                <input type="text" class="m-input" v-model="item.identityPlace" @change="validateData()">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="employee-form-bodymiddle">
                <div class="bodymiddle-block-line">
                        <div class="employee-pro">
                            <div class="employee-pro-name">Địa chỉ</div>
                            <div class="employee-pro-input">
                                <input type="text" class="m-input" v-model="item.address" @change="validateData()">
                            </div>
                        </div>
                </div>
            </div>
            <div class="employee-form-bodybottom">
                <div class="bodybottom-block-line">
                    <div class="employee-pro">
                            <div class="employee-pro-name">ĐT di động</div>
                            <div class="employee-pro-input">
                                <input type="text" class="m-input" v-model="item.phoneNumber" 
                                :class="{'input-error': !isPNumber.isTrue}" :title="isPNumber.title"
                                @change="validateData()">
                            </div>
                    </div>
                    <div class="employee-pro">
                            <div class="employee-pro-name">ĐT cố định</div>
                            <div class="employee-pro-input">
                                <input type="text" class="m-input" v-model="item.telephoneNumber" 
                                :class="{'input-error': !isTPNumber.isTrue}" :title="isTPNumber.title"
                                @change="validateData()">
                            </div>
                    </div>
                    <div class="employee-pro">
                            <div class="employee-pro-name">Email</div>
                            <div class="employee-pro-input">
                                <input type="text" class="m-input" v-model="item.email" id="email"  
                                :class="{'input-error': !isEmail.isTrue}" :title="isEmail.title"
                                @change="validateData()">
                            </div>
                    </div>

                </div>
                <div class="bodybottom-block-line">
                        <div class="employee-pro">
                            <div class="employee-pro-name">Tài khoản ngân hàng</div>
                            <div class="employee-pro-input">
                                <input type="text" class="m-input" v-model="item.bankNumber" @change="validateData()">
                            </div>
                        </div>
                        <div class="employee-pro">
                            <div class="employee-pro-name">Tên ngân hàng</div>
                            <div class="employee-pro-input">
                                <input type="text" class="m-input" v-model="item.bankName" @change="validateData()">
                            </div>
                        </div>
                        <div class="employee-pro">
                            <div class="employee-pro-name">Chi nhánh</div>
                            <div class="employee-pro-input">
                                <input type="text" class="m-input" v-model="item.bankPlace" @change="validateData()">
                            </div>
                        </div>
                </div>
            </div>
        </div>
        <div class="employee-form-footer">
            <button class="m-button-primary" id="EmployeeFormExit" @click="$emit('CloseForm')">Hủy</button>
            <div>
            <button class="m-button-primary" id="EmployeeFormSave" @click="Save">Cất</button>
            <button class="m-button" id="EmployeeFormSaveAdd" @click="SaveAndAdd">Cất và Thêm</button>
            </div>
        </div>
        </div>
        <ErrorPopup :title="title" v-if="ShowError" @close="close"/>
        <WarningPopup :title="title" v-if="ShowWarning" @close="close"/>
        <QuestionPopup :title="title" v-if="ShowQuestion" @close="close" @no="no" @yes="yes"/>
        <Loader v-if="ShowLoader"/>
    </div>
</template>
<style scoped>

@import url('../../style/component/form.css');
@import url('../../style/component/radio.css');
@import url('../../style/component/datepicker.css');
</style>
<script>
//import component
import 'vue2-datepicker/locale/vi'
import Api from '../../js/api'
import axios from 'axios'
import ErrorPopup from '../../components/Base/BasePopup/ErrorPopup.vue'
import WarningPopup from '../../components/Base/BasePopup/WarningPopup.vue'
import Loader from '../../components/Base/Loader.vue'
import Combobox from '../../components/Base/Combobox.vue'
import Checkbox from '../../components/Base/Checkbox.vue'
import QuestionPopup from '../../components/Base/BasePopup/QuestionPopup.vue'
import FormatData from '../../js/FormatData'
import {isRequired, isEmail, isPhoneNumber, isDateLessThan, isEmployeeCode}  from '../../js/ValidateData'
import DatePicker from 'vue2-datepicker';
import Resource from '../../js/resource'
import misaEnum from '../../js/misaEnum'

export default {
    components:{
        ErrorPopup,
        WarningPopup,
        Loader,
        QuestionPopup,
        Combobox,
        Checkbox,
        DatePicker,
    },
    //khai báo các thuộc tính
    props:["employee","display","dep"],

    //khởi tạo dữ liệu cho form
    created(){
        this.item={...this.employee};
        this.item.dateOfBirth = FormatData.formatDate(FormatData.convertDate(this.employee.dateOfBirth),2,"-");
        this.item.identityDat = FormatData.formatDate(this.employee.identityDate,2,"-");
        if(this.display!=2){
            this.item.gender=FormatData.convertGender(this.item.gender);
        }
    },

    //Phương thức của component
    methods:{
        /*kiểm tra hợp lệ dữ liệu khi nhập và lưu dữ liệu
        * author:LAĐức(11/02/2022)
        */
        validateData(){
            var c=false;
            this.changeData=this.changeData+1;
            console.log(Resource.resource.VN.notReGex);
            //kiểm tra hợp lệ email
            if(isEmail(this.item.email)){
                    this.isEmail.title="";
                    this.isEmail.isTrue=true;
                }
                else{
                    this.isEmail.title=FormatData.formatString(Resource.resource.VN.notReGex,"Email");
                    this.isEmail.isTrue=false;
                    this.title=FormatData.formatString(Resource.resource.VN.notReGex2,"Email");
                    c=true;
                }
                //kiểm tra xem ngày tháng có đúng yêu cầu không
                if(isDateLessThan(this.item.dateOfBirth,new Date())){
                    this.isDateOfBirth.title="";
                    this.isDateOfBirth.isTrue=true;
                }
                else{
                    this.isDateOfBirth.title=FormatData.formatString(Resource.resource.VN.dateLessThanToDay,Resource.resource.VN.dateOfBirth);
                    this.isDateOfBirth.isTrue=false;
                    this.title=FormatData.formatString(Resource.resource.VN.dateLessThanToDay2,Resource.resource.VN.dateOfBirth);
                    c=true;
                }
                if(isDateLessThan(this.item.identityDate,new Date())){
                    this.isIdentityDate.title="";
                    this.isIdentityDate.isTrue=true;
                }
                else{
                    this.isIdentityDate.title=FormatData.formatString(Resource.resource.VN.dateLessThanToDay,Resource.resource.VN.identityDate);
                    this.isIdentityDate.isTrue=false;
                    this.title=FormatData.formatString(Resource.resource.VN.dateLessThanToDay2,Resource.resource.VN.identityDate);
                    c=true;
                }
                //kiểm tra số điện thoại đã đúng định dạng chưa
                if(isPhoneNumber(this.item.phoneNumber)){
                    this.isPNumber.title="";
                    this.isPNumber.isTrue=true;
                }
                else{
                    this.isPNumber.title=FormatData.formatString(Resource.resource.VN.notReGex,Resource.resource.VN.phoneNumber);
                    this.isPNumber.isTrue=false;
                    this.title=FormatData.formatString(Resource.resource.VN.notReGex2,Resource.resource.VN.phoneNumber);
                    c=true;
                }
                //kiểm tra số điện thoại cố định đã đúng định dạng chưa
                if(isPhoneNumber(this.item.telephoneNumber)){
                    this.isTPNumber.title="";
                    this.isTPNumber.isTrue=true;
                }
                else{
                    this.isTPNumber.title=FormatData.formatString(Resource.resource.VN.notReGex,Resource.resource.VN.telephoneNumber);
                    this.isTPNumber.isTrue=false;
                    this.title=FormatData.formatString(Resource.resource.VN.notReGex2,Resource.resource.VN.telephoneNumber);
                    c=true;
                }

                //kiểm tra phòng ban của nhân viên đã được nhập chưa
                if(this.department){
                    this.isDepartment=true;
                }
                else{
                    this.isDepartment=false;
                    this.title=FormatData.formatString(Resource.resource.VN.isNotEmpty2,Resource.resource.VN.department);
                    c=true;
                }

                //kiểm tra tên nhân viên được nhập chưa
                if(isRequired(this.item.fullName)){
                    this.isFullName.title="";
                    this.isFullName.isTrue=true;
                }
                else{
                    this.isFullName.title=FormatData.formatString(Resource.resource.VN.isNotEmpty,Resource.resource.VN.fullName);
                    this.isFullName.isTrue=false;
                    this.title=FormatData.formatString(Resource.resource.VN.isNotEmpty2,Resource.resource.VN.fullName);
                    c=true;
                }

                //kiểm tra định dạng mã nhân viên
                if(isEmployeeCode(this.item.employeeCode)){
                    this.EmployeeCodeValidate.title="";
                    this.EmployeeCodeValidate.isTrue=true;
                }
                else{
                    this.EmployeeCodeValidate.title=FormatData.formatString(Resource.resource.VN.notReGex,Resource.resource.VN.employeeCode);
                    this.EmployeeCodeValidate.isTrue=false;
                    this.title=FormatData.formatString(Resource.resource.VN.notReGex2,Resource.resource.VN.employeeCode);
                    c=true;
                }

                //kiểm tra mã nhân viên đã được nhập chưa
                if(isRequired(this.item.employeeCode)){
                    this.isEmployeeCode.title="";
                    this.isEmployeeCode.isTrue=true;
                }
                else{
                    this.isEmployeeCode.title=FormatData.formatString(Resource.resource.VN.isNotEmpty,Resource.resource.VN.employeeCode);
                    this.isEmployeeCode.isTrue=false;
                    this.title=FormatData.formatString(Resource.resource.VN.isNotEmpty2,Resource.resource.VN.employeeCode);
                    c=true;
                }
                return c;
        },

        /*thực hiện thêm hoặc sửa thông tin nhân viên
        * author:LAĐức(11/02/2022)
        */
        async SaveEmployee(status){
            var me=this;
            this.changeData=this.changeData-1;
            try{
                //kiểm tra xem có lỗi nhập liệu không
                if(this.validateData()){
                    this.ShowError=true;
                    return false;
                }

                //Thêm mới nhân viên
                if(me.display == misaEnum.enumMethod.add || me.display == misaEnum.enumMethod.clone){
                    this.ShowLoader=true;
                    //gọi api thêm mới nhân viên
                    await axios.post(Api.employeeApi,me.item)
                    .then(async function(res){
                        console.log(res);
                        //load lại dữ liệu sau khi đóng form
                        me.$emit("reloadData",null);
                        if(status==0){
                            me.item=me.NewEmptyEmployee();
                            me.item.employeeCode=(await axios.get(`${Api.employeeApi}/NewEmployeeCode`)).data;
                            me.$refs.departmentCombobox.clearSelectedItem();
                            me.$emit('ShowToast',FormatData.formatString(Resource.resource.VN.successfull,Resource.resource.VN.addEmployee));
                        }
                        else{
                            //đóng form chi tiết nhân viên
                            me.$emit("CloseForm");
                            me.$emit('ShowToast',FormatData.formatString(Resource.resource.VN.successfull,Resource.resource.VN.addEmployee));
                        }
                        
                    })
                    .catch(function(res){
                        //hiển thị thông báo lỗi
                        me.title=res.response.data.devMsg;
                        me.ShowWarning=true;
                    })
                    .finally(me.ShowLoader=false);
                }

                //sửa thông tin nhân viên
                if(me.display == misaEnum.enumMethod.update){
                    this.ShowLoader=true;
                    //gọi api sửa thông tin nhân viên
                    await axios.put(`${Api.employeeApi}/${me.item.employeeId}`,me.item)
                    .then(async function(){
                        //load lại dữ liệu sau khi đóng form
                        me.$emit("reloadData",null);
                        if(status==0){
                            me.item=me.NewEmptyEmployee();
                            me.item.employeeCode =(await axios.get(`${Api.employeeApi}/NewEmployeeCode`)).data;
                            me.department=null;
                            me.$emit('ShowToast',FormatData.formatString(Resource.resource.VN.successfull,Resource.resource.VN.updateEmployee));
                        }
                        else{
                            //đóng form sau khi sửa
                            me.$emit("CloseForm");
                            me.$emit('ShowToast',FormatData.formatString(Resource.resource.VN.successfull,Resource.resource.VN.updateEmployee));
                        }
                    })
                    .catch(function(res){
                        //hiển thị thông báo lỗi
                        me.title=res.response.data.devMsg;
                        me.ShowWarning=true;
                    })
                    .finally(me.ShowLoader=false);
                }
                return true;
                }

            catch(err){
                console.log(err);
                return false;
            }
            
        },

        //lưu nhân viên khi ấn cất
        Save(){
            this.SaveEmployee(1);
            
        },

        //click nút cất và thêm
        async SaveAndAdd(){
            this.SaveEmployee(0);
        },
        
        /*lấy dữ liệu department để hiển thị lên combobox
        * author:LAĐức(11/02/2022)
        */
        async LoadDepartments(){
            var me=this;
            this.ShowLoader=true;
            await axios.get(Api.departmentApi)
            .then(function(res){
                me.departments=res.data;
            })
            .catch(function(res){
                console.log(res);
            })
            .finally(me.ShowLoader=false);
        },

        /*set department được chọn trong combobox
        * author:LAĐức(11/02/2022)
        */
        setSelectedDepartment(department){
            this.department=department;
            this.item.departmentId=this.department.departmentId;
            this.item.departmentName=this.department.departmentName;
            this.item.departmentCode=this.department.departmentCode;
            this.validateData();
        },

        /*đóng các popup cảnh báo
        * author:LAĐức(11/02/2022)
        */
        close(){
            this.ShowError=false;
            this.ShowWarning=false;
            this.ShowQuestion=false;
        },

        //đóng form mà không sửa dữ liệu
        no(){
            this.ShowQuestion=false;
            this.closeThisForm();
        },

        //đóng form và lưu dữ liệu
        async yes(){
            this.ShowQuestion=false;
            var success=await this.SaveEmployee(1);
            if(success){
                this.closeThisForm();
            }
        },

        //Emit phương thức ra component cha để đóng form
        closeThisForm(){
            this.$emit("CloseForm");
        },

        //hiển thị form xác nhận thay đổi dữ liệu khi đóng form
        CloseForm(){
            if(this.changeData==0){
                this.$emit("CloseForm");
            }
            else{
                this.title=FormatData.formatString(Resource.resource.VN.updateAfterModified);
                this.ShowQuestion=true;
            }
        },

        //khởi tạo 1 nhân viên rỗng
        NewEmptyEmployee(){
            return{
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
                }  
        }
        },
        mounted(){
            this.$refs.employeeCode.focus();
        },
    //dữ liệu của forn
    data(){
        return{
            changeData:0,
            item:{},
            displayMode:0,
            title:Resource.resource.VN.errorMessage,
            ShowLoader:false,
            ShowError:false,
            ShowWarning:false,
            ShowQuestion:false,
            departments:[],
            department: this.dep,
            isDepartment:true,
            isEmployeeCode:{title:"",isTrue:true},
            isFullName:{title:"",isTrue:true},
            isEmail:{title:"",isTrue:true},
            isPNumber:{title:"",isTrue:true},
            isTPNumber:{title:"",isTrue:true},
            isDateOfBirth:{title:"",isTrue:true},
            isIdentityDate:{title:"",isTrue:true},
            EmployeeCodeValidate:{title:"",isTrue:true},
            date:null,

        }
    },
    }
</script>