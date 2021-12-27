<template>
  <div
    :class="class_"
    :style="style_"
  >
    <slot />
  </div>
</template>
<script>
export default {
  name: 'panel-col',
  props: {
    // 栅格占据的列数
    span: {
      type: Number,
      default: 24
    },
    // 栅格左侧的间隔格数
    offset: {
      type: Number,
      default: 0
    },
    // 栅格向右移动格数
    push: {
      type: Number,
      default: 0
    },
    // 栅格向左移动格数
    pull: {
      type: Number,
      default: 0
    }
  },
  computed: {
    class_() {
      let classAtrr = ['em-panel-col']
      if (this.span) classAtrr.push(`em-panel-col-${this.span}`)
      if (this.offset) classAtrr.push(`em-panel-col-offset-${this.offset}`)
      if (this.push) classAtrr.push(`em-panel-col-push-${this.push}`)
      if (this.pull) classAtrr.push(`em-panel-col-pull-${this.pull}`)
      return classAtrr
    },
    style_() {
      return {
        paddingLeft: this.$parent.gutter_,
        paddingRight: this.$parent.gutter_
      }
    }
  }
}
</script>
