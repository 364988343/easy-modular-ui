<template>
  <em-tmpl v-bind="tmpl">
  </em-tmpl>
</template>

<script>
import page from './page.js'
import attrs from './data/attrs.js'

export default {
  data() {
    return {
      tmpl: {
        title: '容器(em-container)',
        icon: 'list',
        attrs
      }
    }
  }
}
</script>
