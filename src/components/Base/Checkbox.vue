<template>
  <label class="checkbox">
    <input ref="input" type="checkbox" @click="selectedItem($event)" @change="$emit('change',$event)" :checked="checked"/>
  </label>
</template>
<script>
export default {
  props: ["item","checked"],
  methods: {
    /*xử lý sự kiện checkbox
     * author:LAĐức(08/02/2022)
     */
    selectedItem(evt){
      if(evt.target.checked){
        this.$emit("addSelectedItem");
      }
      else{
        this.$emit("removeSelectedItem");
      }
    }
  },
};
</script>
<style scoped>
@import url('../../style/component/checkbox.css');
</style>