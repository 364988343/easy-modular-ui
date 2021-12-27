export default [
  {
    name: 'v-model/value',
    desc: '绑定值',
    type: 'String, Number, Array',
    opt: '-',
    def: '-'
  },
  {
    name: 'options',
    desc: '选项（如果选项有数据则不从后台获取数据）',
    type: 'Array',
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
    def: 'label'
  },
  {
    name: 'size',
    desc: '尺寸，默认按照框架的字号设置',
    type: 'String',
    opt: '-',
    def: '-'
  },
  {
    name: 'multiple',
    desc: '多选',
    type: 'Boolean',
    opt: '-',
    def: 'false'
  },
  {
    name: 'multiple-limit',
    desc: '多选时用户最多可以选择的项目数，为 0 则不限制',
    type: 'Number',
    opt: '-',
    def: '0'
  },
  {
    name: 'clearable',
    desc: '可清空',
    type: 'Boolean',
    opt: '-',
    def: 'false'
  },
  {
    name: 'noLoading',
    desc: '不显示loading',
    type: 'Boolean',
    opt: '-',
    def: 'true'
  },
  {
    name: 'filterable',
    desc: '是否可搜索',
    type: 'Boolean',
    opt: '-',
    def: 'false'
  },
  {
    name: 'autoComplete',
    desc: '自动完成',
    type: 'Boolean',
    opt: '-',
    def: 'false'
  },
  {
    name: 'triggerOnFocus',
    desc: '自动完成模式下激活即获取数据',
    type: 'Boolean',
    opt: '-',
    def: 'true'
  },
  {
    name: 'allowCreate',
    desc: '禁用',
    type: 'Boolean',
    opt: '-',
    def: 'false'
  },
  {
    name: 'placeholder',
    desc: '占位符',
    type: 'String',
    opt: '-',
    def: '请选择...'
  }
]
