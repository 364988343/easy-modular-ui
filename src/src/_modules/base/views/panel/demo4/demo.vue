<template>
  <em-panel v-bind="panel">
    <el-alert
      title="面板页"
      type="warning"
      description="通过设置 page 属性为true，可以让面板变成一个面板页，面板页高度会自动填充满整个父级元素，当内容超出时会有滚动条"
      show-icon
      :closable="false"
    ></el-alert>
    <pre>
      假如生活欺骗了你

      假如生活欺骗了你，

      不要悲伤，不要心急！

      忧郁的日子里须要镇静：

      相信吧，快乐的日子将会来临！

      心儿永远向往着未来；

      现在却常是忧郁。

      一切都是瞬息，一切都将会过去；
      
      而那过去了的，就会成为亲切的怀恋
    </pre>

    <template v-slot:footer>
      <em-button type="success" text="确认" @click="onClick" />
    </template>
  </em-panel>
</template>
<script>
export default {
  data() {
    return {
      panel: {
        page: true,
        header: true,
        footer: true,
        title: '面板页示例',
        icon: 'app',
        fullscreen: true,
        collapse: true
      }
    }
  },
  methods: {
    onClick() {
      this._success('保存成功')
    }
  }
}
</script>
