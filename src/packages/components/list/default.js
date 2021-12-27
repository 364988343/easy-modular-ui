// 默认列信息
const columnInfo = {
  // 列的字段名称
  name: '',
  // 列的显示名称
  label: '',
  // 宽度
  width: '',
  // 排序
  sortable: false,
  // 固定列
  fixed: false,
  // 对其方式
  align: 'center',
  // 表头对其方式
  headerAlign: 'center',
  // 是否显示
  show: true,
  // 格式化，暂时针对日期，采用dayjs组件 https://github.com/iamkun/dayjs/blob/dev/docs/zh-cn/API-reference.md
  format: '',
  // 当内容过长被隐藏时显示 tooltip
  showOverflowTooltip: true,
  //导出配置
  export: {
    //导出列宽
    width: 0
  }
}
export default {
  columnInfo
}
