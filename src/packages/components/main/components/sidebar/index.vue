<template>
  <div class="em-main-sidebar" :class="{ collapse: collapse }">
    <em-menus />
  </div>
</template>
<script>
import EmMenus from '../menus'
import { mapState } from 'vuex'
export default {
  components: { EmMenus },
  computed: {
    ...mapState('app/sidebar', ['collapse'])
  }
}
</script>
