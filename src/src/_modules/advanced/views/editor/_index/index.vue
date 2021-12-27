<template>
  <em-tmpl v-bind="tmpl">
      <el-alert type="warning" show-icon>基于富文本编辑器wangeditor的封装，支持v-model</el-alert>
  </em-tmpl>
</template>
<script>
import page from './page.js'
import attrs from './data/attrs.js'
import slots from './data/slots.js'
import methods from './data/methods.js'
import events from './data/events.js'
export default {
  name: page.name,
  data() {
    return {
      val: '',
      tmpl: {
        title: '富文本编辑器(em-editor)',
        icon: 'detail',
        attrs,
        slots,
        methods,
        events
      }
    }
  },
  created() {
    this.setTabName(this.tmpl.title)
  }
}
</script>
