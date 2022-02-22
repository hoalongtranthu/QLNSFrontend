<template>
    <div id="Navbar" class="m-navbar">
        <div class="logo-container">
            <a href="#" class="menu-container-option"></a>
            <a href="#" class="img-icon"><img src="../../assets/img/Logo_Module_TiengViet_White.66947422.svg" alt="Image"></a>
        </div>
        <div class="menu-list" v-for="(item,index) in items" :key="index">
            <div class="menu-item" @click="changeActive">
                <a class="">
                    <Icons :icon="item.icon"></Icons>
                    <div class="menu-item-text">{{item.text}}</div>
                </a>
            </div>
           
        </div>
    </div>
</template>
<style scoped>
@import url('../../style/layout/navbar.css');
@import url('../../style/component/icons.css');
</style>
<script>
import Icons from '../Base/Icons.vue'
export default {
    components:{
        Icons
    },
    methods:{
        changeActive(){
            this.isActive=!this.isActive;
        }
    },
    data() {
    return {
        isActive:false,
      items: [
        { icon: "dashboard", text: "Tổng quan" },
        { icon: "cash", text: "Tiền mặt" },
        { icon: "bank", text: "Tiền gửi", active: true },
        { icon: "bag", text: "Mua hàng" },
        { icon: "sale", text: "Bán hàng" },
        { icon: "invoice", text: "Quản lý hóa đơn" },
        { icon: "stock", text: "Kho" },
        { icon: "tools", text: "Công cụ dụng cụ" },
        { icon: "car", text: "Tài sản cố định" },
        { icon: "tax", text: "Thuế" },
        { icon: "price", text: "Giá thành" },
        { icon: "general", text: "Tổng hợp" },
        { icon: "budge", text: "Ngân sách" },
        { icon: "report", text: "Báo cáo" },
        { icon: "finance", text: "Phân tích tài chính" },
      ],
    };
  },
}
</script>

