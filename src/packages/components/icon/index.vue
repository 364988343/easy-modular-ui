<template>
  <svg class="em-icon" :class="customClass" aria-hidden="true" :style="style_">
    <use :xlink:href="`#icon-${this.name}`" />
  </svg>
</template>

<script>
export default {
  name: 'icon',
  props: {
    //图标名称
    name: String,
    //图标大小
    size: String,
    //图标颜色
    color: String,
    //图标自定义类名
    customClass: String
  },
  computed: {
    style_() {
      let style = {}
      if (this.size) style.fontSize = this.size
      if (this.color) style.color = this.color
      return style
    }
  }
}
</script>
