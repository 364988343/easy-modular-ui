export default [
  {
    name: 'title',
    desc: '标题文本，显示在左上方',
    type: 'String',
    opt: '-',
    def: '-'
  },
  {
    name: 'labelWidth',
    desc: '标签的宽度',
    type: 'String',
    opt: '-',
    def: '160px'
  },
  {
    name: 'direction',
    desc: '排列的方向',
    type: 'String',
    opt: 'vertical / horizontal',
    def: 'vertical'
  },

  {
    name: 'size',
    desc: '列表的尺寸',
    type: 'String',
    opt: 'medium / small / mini',
    def: '-'
  },
  {
    name: 'colon',
    desc: '是否显示冒号',
    type: 'Boolean',
    opt: '-',
    def: 'false'
  },
  {
    name: 'action',
    desc: '数据查询方法',
    type: 'Function',
    opt: '-',
    def: '-'
  },
  {
    name: 'model',
    desc: '模型数据，对于不需要通过接口返回的数据，可以通过该属性传递',
    type: 'Object',
    opt: '-',
    def: '-'
  },
  {
    name: 'cols',
    desc: '栏位',
    type: 'Arrary',
    opt: '-',
    def: '-'
  },
  {
    name: 'no-loading',
    desc: '不显示加载动画',
    type: 'boolean',
    opt: '-',
    def: 'false'
  },
  {
    name: 'query-on-created',
    desc: '创建时执行一次查询',
    type: 'boolean',
    opt: '-',
    def: 'true'
  }
]
