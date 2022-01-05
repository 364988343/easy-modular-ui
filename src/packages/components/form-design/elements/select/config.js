export default {
  //标签
  tag: 'el-select',
  //组件名称
  name: '下拉选择',
  //组件图标
  icon: 'select',
  //组件分组
  group: 'base',
  //排序
  sort: 3,
  //是否必填
  required: true,
  //栅格占据的列数
  span: null,
  //标题
  label: '下拉选择',
  //字段名称
  fieldName: '',
  //组件属性
  attributes: {
    //占位符
    placeholder: '请选择',
    //是否禁用
    disabled: false,
    //尺寸
    size: 'small'
  },
  //子组件
  children: [{ tag: 'el-option', attributes: { label: '', value: '' } }]
}
