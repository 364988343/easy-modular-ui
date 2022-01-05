export default {
  //标签
  tag: 'em-upload-single',
  //组件名称
  name: '单文件上传',
  //组件图标
  icon: 'upload',
  //组件分组
  group: 'advanced',
  //排序
  sort: 4,
  //是否必填
  required: true,
  //栅格占据的列数
  span: null,
  //标题
  label: '文件',
  //字段名称
  fieldName: '',
  //组件属性
  attributes: {
    //占位符
    placeholder: '请上传文件',
    //是否禁用
    disabled: false,
    //上传地址
    action: '',
    //接受上传的文件类型
    accept: '',
    //文件最大大小
    maxSize: ''
  }
}
