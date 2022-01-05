export default {
  //标签
  tag: 'em-color-picker',
  //组件名称
  name: '颜色选择器',
  //组件图标
  icon: 'color',
  //组件分组
  group: 'advanced',
  //排序
  sort: 3,
  //是否必填
  required: true,
  //栅格占据的列数
  span: null,
  //标题
  label: '颜色',
  //字段名称
  fieldName: '',
  //组件属性
  attributes: {
    //占位符
    placeholder: '请选择颜色',
    //是否禁用
    disabled: false,
    //尺寸
    size: 'small',
    //是否支持透明度选择
    showAlpha: false,
    //写入 v-model 的颜色的格式
    colorFormat: ''
  }
}
