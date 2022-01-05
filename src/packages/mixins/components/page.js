import { mapState, mapActions } from 'vuex'
export default {
  computed: { ...mapState('app/page', { openList: 'opened', currentRoute: 'current' }) },
  methods: {
    ...mapActions('app/page', ['close']),
    /**
     * @description:关闭页面
     * @param {*}
     */
    closePage(routeName) {
      let to = {}
      const name = routeName || this.currentRoute.meta.relateRoute
      if (name) to.name = name

      const curIndex = this.openList.findIndex((m) => m.path === this.currentRoute.path)
      this.close({ index: curIndex, router: this.$router, to })
    }
  }
}
