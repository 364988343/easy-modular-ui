export default {
  //标签
  tag: 'el-rate',
  //组件名称
  name: '评分',
  //组件图标
  icon: 'star',
  //组件分组
  group: 'base',
  //排序
  sort: 6,
  //是否必填
  required: true,
  //栅格占据的列数
  span: null,
  //标题
  label: '评分',
  //字段名称
  fieldName: '',
  //组件属性
  attributes: {
    //是否禁用
    disabled: false,
    //尺寸
    size: 'small',
    //是否显示辅助文字
    showText: false,
    //是否显分数
    showScore: false,
    //辅助文字数组
    texts: ['极差', '失望', '一般', '满意', '惊喜']
  }
}
