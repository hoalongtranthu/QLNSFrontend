<template>
  <div ref="dropdown" class="dropdown">
    <div class="dropdown__trigger" @click.stop="toggle">
      <slot name="trigger" :active="active" />
    </div>
    <Teleport to="body" v-if="active && appendToBody">
      <div role="menu" :style="styles">
        <slot />
      </div>
    </Teleport>
    <div
      :class="['dropdown__content', contentFull && 'dropdown__content--full']"
      v-else-if="active"
    >
      <slot />
    </div>
  </div>
</template>
<script>
import Teleport from 'vue2-teleport';
export default {
  components:{
    Teleport
  },
  props: {
    /**
     * dong dropdown khi click
     */
    closeOnClick: {
      type: Boolean,
      default: true,
    },
    /**
     * teleport den body
     */
    appendToBody: Boolean,
    contentFull: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    /* Hiển thị dropdown
     * author:LAĐức(08/02/2022)
     */
    toggle() {
      this.active = !this.active;
      if (this.active && this.appendToBody) {
        //tính toán vị trí hiển thị nếu teleport đến body
        const { right, bottom, width } =
          this.$refs.dropdown.getBoundingClientRect();
        this.styles = {
          left: `${right}px`,
          top: `${bottom}px`,
          minWidth: `${width}px`,
          position: "absolute",
          transform: "translateX(-100%)",
          zIndex: "200"
        };
      }
    },

    /* đóng dropdown khi click ra ngoài dropdown
     * author:LAĐức(08/02/2022)
     */
    handleClickOutside(evt) {
      const target = evt.target;
      const isClickOutside = !(
        this.$refs.dropdown == target 
      );
      if (isClickOutside || this.closeOnClick) {
        this.active = false;
      }
    },
  },
  data() {
    return {
      active: false,
      styles: {},
    };
  },
  created() {
    document.addEventListener("click", this.handleClickOutside);
  },
  unmounted() {
    document.removeEventListener("click", this.handleClickOutside);
  },
};
</script>

<style>
@import url('../../style/component/dropdown.css');
</style>
