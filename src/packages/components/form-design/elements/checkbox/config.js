export default {
  //标签
  tag: 'el-checkbox-group',
  //组件名称
  name: '多选框',
  //组件图标
  icon: 'checkbox',
  //组件分组
  group: 'base',
  //排序
  sort: 8,
  //是否必填
  required: true,
  //栅格占据的列数
  span: null,
  //标题
  label: '多选框',
  //字段名称
  fieldName: '',
  //默认值
  defaultVal: [],
  //组件属性
  attributes: {
    //是否禁用
    disabled: false,
    //尺寸
    size: 'small'
  },
  //子组件
  children: [{ tag: 'el-checkbox', attributes: { label: '' }, children: '选项1' }]
}
