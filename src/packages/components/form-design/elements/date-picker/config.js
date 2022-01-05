export default {
  //标签
  tag: 'el-date-picker',
  //组件名称
  name: '日期选择器',
  //组件图标
  icon: 'date',
  //组件分组
  group: 'base',
  //排序
  sort: 5,
  //是否必填
  required: true,
  //栅格占据的列数
  span: null,
  //标题
  label: '日期',
  //字段名称
  fieldName: '',
  //组件属性
  attributes: {
    //占位符
    placeholder: '请选择',
    //是否禁用
    disabled: false,
    //尺寸
    size: 'small',
    //显示类型
    type: 'date',
    //数据格式
    format: 'yyyy-MM-dd'
  },
  style: {
    width: '100%'
  }
}
