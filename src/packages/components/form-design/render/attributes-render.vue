<script>
const requireComponent = require.context('../elements', true, /\w+\.vue$/)
const cmps = {}
requireComponent.keys().forEach((fileName) => {
  const cmp = requireComponent(fileName).default
  if (cmp.name) cmps[cmp.name] = cmp
})

export default {
  props: { data: Object },
  components: { ...cmps },
  render(h) {
    const tag = this.data.name === '多行文本' ? 'el-textarea' : this.data.tag
    return h(`${tag}-attr`, { props: { data: this.data } })
  }
}
</script>
