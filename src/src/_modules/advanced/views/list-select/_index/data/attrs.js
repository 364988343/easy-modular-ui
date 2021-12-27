export default [
  {
    name: 'title',
    desc: '标题',
    type: 'String',
    opt: '-',
    def: '-'
  },
  {
    name: 'icon',
    desc: '头部左侧的图标',
    type: 'String',
    opt: '-',
    def: 'list'
  },
  {
    name: 'width',
    desc: 'Dialog 的宽度',
    type: 'String',
    opt: '-',
    def: '60%'
  },
  {
    name: 'height',
    desc: 'Dialog 的高度',
    type: 'Number, String',
    opt: '-',
    def: '80%'
  },
  {
    name: 'fullscreen',
    desc: '是否显示全屏按钮',
    type: 'Boolean',
    opt: '-',
    def: 'true'
  },
  {
    name: 'list',
    desc: '列表模型',
    type: 'Object',
    opt: '-',
    def: '和列表组件一样'
  },
  {
    name: 'multiple',
    desc: '多选',
    type: 'Boolean',
    opt: '-',
    def: 'false'
  }
]
