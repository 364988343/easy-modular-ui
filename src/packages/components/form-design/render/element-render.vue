<script>
export default {
  props: ['data', 'value'],
  render(h) {
    const children = this.getChildren(h)
    const event = this.getEvent(this)
    return h(
      this.data.tag,
      {
        props: {
          value: this.value,
          ...this.data.props
        },
        style: { ...this.data.style },
        attrs: { ...this.data.attributes },
        on: { ...event }
      },
      children
    )
  },
  methods: {
    /**
     * @description: 获取子组件
     * @param {*}
     */
    getChildren(h) {
      let children = []
      if (this.data.children) {
        this.data.children.forEach((m) => {
          children.push(h(m.tag, { attrs: { ...m.attributes } }, m.children))
        })
      }

      return children
    },

    /**
     * @description: 获取事件
     * @param {*}
     */
    getEvent(self) {
      let on = {}
      //v-model
      on.input = function (val) {
        self.$emit('input', val)
      }

      return on
    }
  }
}
</script>
