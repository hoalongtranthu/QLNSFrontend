<template>
<div class="popup-container" id="WarningPopup">
        <div class="popup-bg"></div>
    <div class="m-popup error-popup">
        <div class="popup-content">
            <Icons :size="48" icon="warning"/>
            <div class="popup-text">{{title}}</div>
        </div>
        <div class="popup-footer">
            <div></div>
            <button class="m-button" @click="$emit('close')">Đồng ý</button>
        </div>
    </div>
</div>
</template>
<style scoped>
@import url('../../../style/component/popup.css');
</style>
<script>
import Icons from '../Icons.vue'
export default {
    props:['title'],
    components:{
        Icons
    },
}
</script>