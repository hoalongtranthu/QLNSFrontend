<template>
    <div class="popup-container" >
        <div class="m-popup error-popup">
        <div class="popup-content">
                <Icons :size="48" icon="error"/>
                <div class="popup-text">{{title}}</div>    
        </div>
        <div class="popup-footer">
            <div></div>
            <button class="m-button" @click="$emit('close')">Đóng</button>
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
    data(){
        return{
        }
    }
}
</script>