export default [
  {
    name: 'v-model/value',
    desc: '绑定值',
    type: 'String',
    opt: '-',
    def: '-'
  },
  {
    name: 'action',
    desc: '查询方法',
    type: 'Function',
    opt: '-',
    def: '-'
  },
  {
    name: 'valueKey',
    desc: '选项的值的键名',
    type: 'String',
    opt: '-',
    def: 'value'
  },
  {
    name: 'labelKeys',
    desc: '选项的文本的键名（可多个，英文逗号隔开）',
    type: 'String',
    opt: '-',
    def: 'value'
  },
  {
    name: 'size',
    desc: '尺寸，默认按照框架的字号设置',
    type: 'String',
    opt: '-',
    def: '-'
  },

  {
    name: 'noLoading',
    desc: '不显示loading',
    type: 'Boolean',
    opt: '-',
    def: 'false'
  },
  {
    name: 'triggerOnFocus',
    desc: '是否激活即获取数据',
    type: 'Boolean',
    opt: '-',
    def: 'true'
  },
  {
    name: 'debounce',
    desc: '获取输入建议的去抖延时',
    type: 'Number',
    opt: '-',
    def: '300'
  },
  {
    name: 'placement',
    desc: '菜单弹出位置',
    type: 'String',
    opt: 'top / top-start / top-end / bottom / bottom-start / bottom-end',
    def: 'bottom-start'
  },
  {
    name: 'placeholder',
    desc: '占位符',
    type: 'String',
    opt: '-',
    def: '请选择...'
  }
]
