<template>
  <div ref="row" class="em-panel-row" :style="{ height }">
    <slot />
  </div>
</template>
<script>
export default {
  name: 'panel-row',
  props: {
    /** 间隔 */
    gutter: {
      type: Number,
      default: 5
    },
    /** 高度 */
    height: {
      type: String,
      required: false
    }
  },
  computed: {
    gutter_() {
      return this.gutter / 2 + 'px'
    }
  }
}
</script>
