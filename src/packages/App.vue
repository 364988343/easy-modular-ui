<template>
  <div id="app">
    <template v-if="inFrame">
      <em-main></em-main>
    </template>
    <template v-else>
      <router-view />
    </template>
  </div>
</template>

<script>
import EmMain from './components/main'
import { mapState, mapActions } from 'vuex'
export default {
  components: { EmMain },
  computed: {
    // 是否在框架中显示
    inFrame() {
      return !this.$route.meta || this.$route.meta.frameIn !== false
    }
  }
}
</script>
