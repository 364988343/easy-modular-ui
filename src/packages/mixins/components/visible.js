/*
 * @Author: 陈曦
 * @Date: 2021-04-27 23:02:55
 * @Description: 显示隐藏混入
 */
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
    show() {
      this.visible_ = true
    },
    hide() {
      this.visible_ = false
    }
  }
}
