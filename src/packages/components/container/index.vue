<template>
  <div class="em-container" :class="{ 'is-horizontal': horizontal }">
    <div class="em-container-main">
      <em-scrollbar v-if="!noScrollbar" :horizontal="horizontal">
        <slot />
      </em-scrollbar>
      <slot v-else />
    </div>
  </div>
</template>
BU
<script>
export default {
  name: 'container',
  props: {
    //不显示滚动条
    noScrollbar: {
      type: Boolean,
      default: true
    },
    //是否显示水平滚动条
    horizontal: Boolean
  }
}
</script>
