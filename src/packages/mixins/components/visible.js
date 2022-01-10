export default {
  computed: {
    visible_: {
      get() {
        return this.visible
      },
      set(val) {
        this.$emit('update:visible', val)
      }
    }
  },
  props: {
    visible: Boolean
  },
  methods: {
    /**
     * @description:显示 
     * @param {*}
     */
    show() {
      this.visible_ = true
    },

    /**
     * @description: 隐藏
     * @param {*}
     */
    hide() {
      this.visible_ = false
    }
  }
}
