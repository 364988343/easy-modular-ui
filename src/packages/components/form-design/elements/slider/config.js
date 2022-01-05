export default {
  //标签
  tag: 'el-slider',
  //组件名称
  name: '滑块',
  //组件图标
  icon: 'slider',
  //组件分组
  group: 'base',
  //排序
  sort: 10,
  //是否必填
  required: true,
  //栅格占据的列数
  span: null,
  //标题
  label: '滑块',
  //字段名称
  fieldName: '',
  //组件属性
  attributes: {
    //是否禁用
    disabled: false,
    //尺寸
    size: 'small',
    //最小值
    min: 0,
    //最大值
    max: 100,
    //步长
    step: 1
  }
}
