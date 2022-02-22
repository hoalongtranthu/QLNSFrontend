<template>
  <div class="form">
    <div class="form-container">
      <div class="form-header" v-if="showHeader">
        <div class="form-title">
          <slot name="title" />
        </div>
        <div class="form-icons">
            <div class="mi mi-24 form-help"></div>
            <div class="mi mi-24 form-close" @click="$emit('CloseForm')"></div>
        </div>
      </div>
      <div class="form-content">
        <slot />
      </div>
      <div class="form-footer">
        <slot name="footer" />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  components: {
    MIcon,
  },
  emits: ["close"],
  props: {
    /**
     * max width popup
     */
    maxW: {
      type: Number,
      default: 900,
    },
    /**
     * co hien header ko
     */
    showHeader: {
      type: Boolean,
      default: true,
    },
  },
};
</script>
<style scoped>
@import url('../../style/component/form.css');
</style>