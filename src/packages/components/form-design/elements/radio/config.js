export default {
  //标签
  tag: 'el-radio-group',
  //组件名称
  name: '单选框',
  //组件图标
  icon: 'radio',
  //组件分组
  group: 'base',
  //排序
  sort: 7,
  //是否必填
  required: true,
  //栅格占据的列数
  span: null,
  //标题
  label: '单选框',
  //字段名称
  fieldName: '',
  //组件属性
  attributes: {
    //是否禁用
    disabled: false,
    //尺寸
    size: 'small'
  },
  //子组件
  children: [{ tag: 'el-radio', attributes: { label: '' }, children: '选项1' }]
}
