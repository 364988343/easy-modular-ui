<template>
  <em-tmpl v-bind="tmpl">
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
        title: '视频预览(em-video-preview)',
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
