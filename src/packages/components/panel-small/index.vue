<template>
  <div :class="class_" :style="style_">
    <div class="em-panel-small-content">
      <div class="em-panel-small-content-value">
        {{ value }}
        <span v-if="unit" class="em-panel-small-content-unit">{{ unit }}</span>
      </div>
      <div v-if="label" class="em-panel-small-content-label">{{ label }}</div>
    </div>
    <div v-if="icon" class="em-panel-small-content-icon">
      <em-icon :name="icon" />
    </div>
    <em-button v-if="more" class="more" @click="onMore">
      更多
      <em-icon name="arrow-right" />
    </em-button>
  </div>
</template>
<script>
export default {
  name: 'panel-small',
  props: {
    /** 文本 */
    label: String,
    /** 值 */
    value: [String, Number],
    /** 单位 */
    unit: String,
    /** 图标 */
    icon: String,
    /** 显示更多 */
    more: Boolean,
    /** 背景色 */
    bgColor: {
      type: String,
      default: 'success'
    }
  },
  computed: {
    class_() {
      let classArr = ['em-panel-small']
      if (this.includeBgColor) {
        classArr.push(`em-bg-${this.bgColor}`)
      }
      return classArr
    },
    style_() {
      let style = {}
      if (!this.includeBgColor) {
        style.backgroundColor = this.bgColor
      }
      return style
    },
    includeBgColor() {
      return ['success', 'primary', 'info', 'warning', 'danger'].includes(this.bgColor)
    }
  },
  methods: {
    onMore() {
      this.$emit('more')
    }
  }
}
</script>
