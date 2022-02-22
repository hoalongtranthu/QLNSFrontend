<template>
<div class="popup-container">
        <div class="popup-bg"></div>
    <div class="m-popup info-popup">
        <div class="popup-content">
            <Icons :size="48" icon="warning"/>
            <div class="popup-text">{{title}}</div>
        </div>
        <div class="popup-footer">
            <button class="m-button-primary" @click="$emit('close')">Không</button>
            <button class="m-button"  @click="$emit('yes')">Có</button>
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