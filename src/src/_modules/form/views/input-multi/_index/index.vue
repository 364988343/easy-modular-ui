<template>
  <em-tmpl v-bind="tmpl"></em-tmpl>
</template>
<script>
import page from './page.js'
import attrs from './data/attrs.js'
import events from './data/events.js'
import methods from './data/methods.js'
export default {
  name: page.name,
  data() {
    return {
      val: '',
      tmpl: {
        title: '多文本框(em-input-multi)',
        icon: 'detail',
        attrs,
        events,
        methods
      }
    }
  },
  created() {
    this.setTabName(this.tmpl.title)
  }
}
</script>
