<template>
  <em-tmpl v-bind="tmpl">
  </em-tmpl>
</template>
<script>
import page from './page.js'
import attrs from './data/attrs'
import events from './data/events'
import slots from './data/slots'
export default {
  name: page.name,
  data() {
    return {
      tmpl: {
        title: '抽屉(em-drawer)',
        icon: 'detail',
        attrs,
        events,
        slots
      }
    }
  },
  created() {
    this.setTabName(this.tmpl.title)
  }
}
</script>
