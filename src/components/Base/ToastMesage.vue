<template>
    <div class="m-toast-msg">
        <div class="m-toast-content">
            <Icons icon="success"/>
            <div class="m-toast-mesage">{{mesage}}</div>
            <Icons icon="miniclose" @click="$emit('closeToast')"/>
        </div>
    </div>
</template>
<script>
import Icons from './Icons.vue'
export default {
    components:{
        Icons,
    },
    props:["mesage"]
}
</script>
<style scoped>
@import url('../../style/component/icons.css');
@import url('../../style/component/toast.css');
</style>