<template>
  <div class="em-main-sidebar" :class="{ collapse: collapse }">
    <div class="nm-menu-wapper">
      <nm-menus />
    </div>
  </div>
</template>
<script>
import NmMenus from '../menus'
import { mapState } from 'vuex'
export default {
  components: { NmMenus },
  computed: {
    ...mapState('app/sidebar', ['collapse'])
  }
}
</script>
