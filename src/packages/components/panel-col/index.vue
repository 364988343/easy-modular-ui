<template>
  <div
    :class="['em-panel-col', span ? 'em-panel-col-' + span : '', offset ? 'em-panel-col-offset-' + offset : '', push ? 'em-panel-col-push-' + push : '', pull ? 'em-panel-col-pull-' + pull : '']"
    :style="style"
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
    style() {
      return {
        paddingLeft: this.$parent.gutter_,
        paddingRight: this.$parent.gutter_
      }
    }
  }
}
</script>
