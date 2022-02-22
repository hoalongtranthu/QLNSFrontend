<template>
  <div
    :class="`mi mi-${size} mi-${icon}`"
    @click="$emit('click')"
  ></div>
</template>
<script>
export default {
  emits: ["click"],
  props: {
    size: {
      type: Number,
      default: 24,
    },
    icon: {
      type: String,
      required: true,
    },
  },
};
</script>
<style scoped src="../../style/component/icons.css"></style>
