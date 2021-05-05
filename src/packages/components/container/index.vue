<template>
  <div class="em-container" :class="{ 'is-horizontal': horizontal }">
    <div class="em-container-main">
      <em-scrollbar v-if="scrollbar" :horizontal="horizontal">
        <slot />
      </em-scrollbar>
      <slot v-else />
    </div>
  </div>
</template>
<script>
export default {
  name: 'container',
  props: {
    /** 滚动条 */
    scrollbar: Boolean,
    /** 是否显示水平滚动条 */
    horizontal: Boolean
  }
}
</script>
