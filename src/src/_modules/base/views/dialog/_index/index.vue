<template>
  <em-tmpl v-bind="tmpl"></em-tmpl>
</template>
<script>
import page from './page.js'
import attrs from './data/attrs.js'
import events from './data/events.js'
import slots from './data/slots'
import methods from './data/methods'
export default {
  name: page.name,
  data() {
    return {
      tmpl: {
        title: '对话框(em-dialog)',
        icon: 'detail',
        attrs,
        events,
        slots,
        methods
      }
    }
  },
  created() {
    this.setTabName(this.tmpl.title)
  }
}
</script>
