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
    def: '-'
  },
  {
    name: 'action',
    desc: '数据查询方法，必须',
    type: 'Function',
    opt: '-',
    def: '-'
  },
  {
    name: 'no-querybar',
    desc: '不显示查询栏',
    type: 'Boolean',
    opt: '-',
    def: 'false'
  },
  {
    name: 'querybar-label-width',
    desc: '查询栏表单标签宽度',
    type: 'String',
    opt: '-',
    def: '-'
  },
  {
    name: 'model',
    desc: '查询模型',
    type: 'Object',
    opt: '-',
    def: '-'
  },
  {
    name: 'rules',
    desc: '查询模型验证规则',
    type: 'Object',
    opt: '-',
    def: '-'
  },
  {
    name: 'cols',
    desc: '列信息',
    type: 'Arrary',
    opt: '-',
    def: '数据结构在页面底部'
  },
  {
    name: 'multiple',
    desc: '是否可多选',
    type: 'Boolean',
    opt: '-',
    def: 'false'
  },
  {
    name: 'show-no',
    desc: '是否显示序号',
    type: 'Boolean',
    opt: '-',
    def: 'true'
  },
  {
    name: 'no-operation',
    desc: '不显示操作列',
    type: 'Boolean',
    opt: '-',
    def: 'false'
  },
  {
    name: 'operation-width',
    desc: '操作列宽度',
    type: 'String, Number',
    opt: '-',
    def: '-'
  },
  {
    name: 'no-select-column',
    desc: '不显示选择列按钮',
    type: 'Boolean',
    opt: '-',
    def: 'false'
  },
  {
    name: 'no-fullscreen',
    desc: '不显示全屏按钮',
    type: 'Boolean',
    opt: '-',
    def: 'false'
  },
  {
    name: 'no-refresh',
    desc: '不显示刷新按钮',
    type: 'Boolean',
    opt: '-',
    def: 'false'
  },
  {
    name: 'no-header',
    desc: '不显示头部',
    type: 'Boolean',
    opt: '-',
    def: 'false'
  },
  {
    name: 'no-footer',
    desc: '不显示底部',
    type: 'Boolean',
    opt: '-',
    def: 'false'
  },
  {
    name: 'no-search',
    desc: '不包含搜索功能',
    type: 'Boolean',
    opt: '-',
    def: 'false'
  },
  {
    name: 'no-operateBar',
    desc: '不显示操作栏',
    type: 'Boolean',
    opt: '-',
    def: 'false'
  },
  {
    name: 'no-search-button-icon',
    desc: '不显示查询按钮图标',
    type: 'Boolean',
    opt: '-',
    def: 'false'
  },
  {
    name: 'span-method',
    desc: '合并行列的方法',
    type: 'Function',
    opt: '-',
    def: '通用合并行方法'
  },
  {
    name: '合并行的列',
    desc: '合并行的列',
    type: 'merge-row-cols',
    opt: '-',
    def: '-'
  },
  {
    name: 'loading',
    desc: '加载中动画',
    type: 'Boolean',
    opt: '-',
    def: 'false'
  },
  {
    name: 'loading-text',
    desc: '加载中文本',
    type: 'String',
    opt: '-',
    def: 'false'
  },
  {
    name: 'query-on-created',
    desc: '创建后是否执行一次查询',
    type: 'Boolean',
    opt: '-',
    def: 'true'
  },
  {
    name: 'tenant-col',
    desc: '租户字段',
    type: 'String',
    opt: '-',
    def: 'tenantName'
  },
  {
    name: 'tenant-show',
    desc: '租户栏位显示',
    type: 'Boolean',
    opt: '-',
    def: 'false'
  }
]
