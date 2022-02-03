<template>
  <div id="app">
    <template v-if="inFrame">
      <em-main v-if="isRouterAlive"></em-main>
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
  provide() {
    return {
      reload: this.reload
    }
  },
  data() {
    return {
      isRouterAlive: true
    }
  },
  computed: {
    // 是否在框架中显示
    inFrame() {
      return !this.$route.meta || this.$route.meta.frameIn !== false
    }
  },
  methods: {
    /**
     * @description:重载 
     * @param {*}
     */
    reload() {
      this.isRouterAlive = false
      this.$nextTick(function () {
        this.isRouterAlive = true
      })
    }
  }
}
</script>
