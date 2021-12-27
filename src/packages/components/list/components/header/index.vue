<template>
  <header class="em-list-header">
    <div class="em-list-icon">
      <em-icon :name="icon || 'profile'" />
    </div>
    <div class="em-list-title">{{ title }}</div>
    <div class="em-list-header-toolbar">
      <!--工具栏插槽-->
      <slot name="toolbar" />
      <!--刷新按钮-->
      <em-button v-if="!noRefresh" icon="reload" @click="refresh" />
      <!--全屏按钮-->
      <em-button v-if="!noFullscreen" :icon="fullscreen ? 'fullscreen-exit' : 'fullscreen'" @click="onFullscreenClick" />
    </div>
  </header>
</template>
<script>
export default {
  props: {
    //标题
    title: String,
    //图标
    icon: String,
    //是否显示全屏
    fullscreen: Boolean,
    //不显示全屏
    noFullscreen: Boolean,
    //不显示刷新
    noRefresh: Boolean
  },
  methods: {
    /**
     * @description:
     * @param {*}
     */
    refresh() {
      this.$parent.page.index = 1
      this.$parent.query()
    },

    /**
     * @description: 全屏
     * @param {*}
     */
    onFullscreenClick() {
      this.$parent.triggerFullscreen()
    }
  }
}
</script>
