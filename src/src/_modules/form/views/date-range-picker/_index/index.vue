<template>
  <em-tmpl v-bind="tmpl"></em-tmpl>
</template>
<script>
import page from './page.js'
import attrs from './data/attrs.js'
import events from './data/events.js'
export default {
  name: page.name,
  data() {
    return {
      tmpl: {
        title: '日期段选择(em-date-range-picker)',
        icon: 'detail',
        attrs,
        events
      }
    }
  },
  created() {
    this.setTabName(this.tmpl.title)
  }
}
</script>
