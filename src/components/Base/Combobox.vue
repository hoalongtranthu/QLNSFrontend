<template>
    <div class="m-combobox" ref="combobox">
        <input class="m-input" :readonly="readonly" :value="this.selected[labelMember]" :class="{'input-error':error}">
        <div class="drop-icon mi mi-16 mi-arrow-dropdown" @click="ShowOption()"></div>
        <div class="m-combobox-option" :class="{'combobox-option-top': top}" v-if="open">
            <div  v-for="(item,index) in items" :key="index" @click="setSelectedItem(item)" class="option" :class="{'option-selected': item[valueMenber]==selected[valueMenber]}">
                {{ getLabel(item) }}
            </div>
        </div>
        <Loader v-if="Loading"/>
    </div>
    
</template>
<script>
import Loader from './Loader.vue'
export default {
    components:{
        Loader,
    },
    //khởi tạo dữ liệu cho component 
    created(){
        if(this.defaultSelected){
            this.selected=this.defaultSelected;
        }
    },
    props:["items","position","labelMember","top","defaultSelected","valueMenber","error","readonly"],
    methods:
    {
        //lấy tên để hiển thị lên combobox
        /*xử lý sự kiện checkbox
        * author:LAĐức(08/02/2022)
        */
        getLabel(item) {
        return item[this.labelMember];
        },

        /*hiển thị danh sách trong combobox
        * author:LAĐức(08/02/2022)
        */
        async ShowOption(){
            this.Loading=true;
            this.open =! this.open;
            this.Loading=false;

        },

        /*set item được chọn trong combobox
        * author:LAĐức(08/02/2022)
        */
        setSelectedItem(item){
            this.selected=item;
            this.$emit("select",this.selected);
            this.open=false;
        },
        clearSelectedItem(){
            this.selected={};
        }
    },
    watch:{
        
        open:function(value){
            if(value){
                this.$emit('open');
            }
        },
    },
    data(){
        return{
            open:false,
            selected:{},
            isSelected:false,
            Loading:false,
            filter:"",

        }
    },
}
</script>
<style scoped>
@import url('../../style/component/combobox.css');
@import url('../../style/component/icons.css');

</style>