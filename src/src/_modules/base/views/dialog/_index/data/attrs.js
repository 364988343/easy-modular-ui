export default [
  {
    name: 'header',
    desc: '显示头部',
    type: 'Boolean',
    opt: '-',
    def: 'true'
  },
  {
    name: 'title',
    desc: 'Dialog 的标题，也可通过具名 title传入',
    type: 'String',
    opt: '-',
    def: '-'
  },
  {
    name: 'icon',
    desc: '头部左侧图标',
    type: 'String',
    opt: '-',
    def: '-'
  },
  {
    name: 'width',
    desc: 'Dialog 的宽度',
    type: 'Number / String',
    opt: '',
    def: '50%'
  },
  {
    name: 'height',
    desc: 'Dialog 的高度',
    type: 'Number / String',
    opt: '-',
    def: '自适应'
  },
  {
    name: 'padding',
    desc: '内边距',
    type: 'Number / String',
    opt: '-',
    def: '8px'
  },
  {
    name: 'footer',
    desc: '显示底部',
    type: 'Boolean',
    opt: '-',
    def: 'false'
  },
  {
    name: 'modal',
    desc: '是否需要遮罩层',
    type: 'Boolean',
    opt: '-',
    def: 'true'
  },
  {
    name: 'close-on-click-modal',
    desc: '是否可以通过点击 modal 关闭 Dialog',
    type: 'Boolean',
    opt: '-',
    def: '手动设置优先，默认与系统中的设置一致'
  },
  {
    name: 'show-close',
    desc: '是否显示关闭按钮',
    type: 'Boolean',
    opt: '-',
    def: 'true'
  },
  {
    name: 'before-close',
    desc: '关闭前的回调，会暂停 Dialog 的关闭',
    type: 'Function',
    opt: '-',
    def: '-'
  },
  {
    name: 'fullscreen',
    desc: '是否显示全屏按钮',
    type: 'Boolean',
    opt: '-',
    def: 'false'
  },
  {
    name: 'loading',
    desc: '显示loading',
    type: 'Boolean',
    opt: '-',
    def: 'false'
  },
  {
    name: 'draggable',
    desc: '是否可拖拽',
    type: 'Boolean',
    opt: '-',
    def: 'false'
  },
  {
    name: 'footer-close-button',
    desc: '是否显示底部关闭按钮',
    type: 'Boolean',
    opt: '-',
    def: 'false'
  },
  ,
  {
    name: 'no-scrollbar',
    desc: '不显示滚动条',
    type: 'boolean',
    opt: '-',
    def: 'false'
  },
  {
    name: 'horizontal',
    desc: '是否显示水平滚动条',
    type: 'boolean',
    opt: '-',
    def: 'false'
  }
]
