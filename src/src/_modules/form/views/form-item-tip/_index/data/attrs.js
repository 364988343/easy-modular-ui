export default [
  {
    name: 'label',
    desc: '标签',
    type: 'String',
    opt: '-',
    def: '-'
  },
  {
    name: 'title',
    desc: '标题',
    type: 'String',
    opt: '-',
    def: '-'
  },
  {
    name: 'content',
    desc: '显示的内容',
    type: 'String',
    opt: '-',
    def: '-'
  },
  {
    name: 'width',
    desc: '宽度',
    type: 'String, Number',
    opt: '-',
    def: '200'
  },
  {
    name: 'placement',
    desc: '出现位置',
    type: '出现位置',
    opt: 'top/top-start/top-end/bottom/bottom-start/bottom-end/left/left-start/left-end/right/right-start/right-end',
    def: 'true'
  },
  {
    name: 'trigger',
    desc: '触发方式',
    type: 'String',
    opt: 'click/focus/hover/manual',
    def: 'hover'
  },
  {
    name: 'label-position',
    desc: '表单域标签的位置，如果值为 left 或者 right 时，则需要设置 label-width',
    type: 'String',
    opt: 'right/left/top',
    def: 'right'
  },
  {
    name: 'icon',
    desc: '图标',
    type: 'String',
    opt: '-',
    def: 'question-circle-fill'
  },
  {
    name: 'iconColor',
    desc: '图标颜色',
    type: 'String',
    opt: '-',
    def: '#909399'
  }
]
