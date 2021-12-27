export default [
  {
    name: 'id',
    desc: '富文本编辑器ID',
    type: 'String',
    opt: '-',
    def: 'editor'
  },
  {
    name: 'value',
    desc: '内容',
    type: 'String',
    opt: '-',
    def: '-'
  },
  {
    name: 'height',
    desc: '高度',
    type: 'Number',
    opt: '-',
    def: '300'
  },
  {
    name: 'placeholder',
    desc: '提示文字',
    type: 'String',
    opt: '-',
    def: '请输入正文'
  },
  {
    name: 'disable',
    desc: '禁用',
    type: 'Boolean',
    opt: '-',
    def: 'false'
  },
  {
    name: 'uploadImgType',
    desc: '上传图片方式(local:本地、config:配置、custom:自定义)',
    type: 'String',
    opt: 'local/config/custom',
    def: 'local'
  },
  {
    name: 'uploadImgServer',
    desc: '上传图片服务地址',
    type: 'String',
    opt: '-',
    def: '-'
  },
  {
    name: 'uploadImgMaxSize',
    desc: '图片大小',
    type: 'Number',
    opt: '-',
    def: '5 * 1024 * 1024'
  },
  {
    name: 'uploadImgAccept',
    desc: '图片类型',
    type: 'Array',
    opt: '-',
    def: 'jpg, jpeg, png, gif, bmp'
  },
  {
    name: 'uploadImgMaxLength',
    desc: '图片最大数量',
    type: 'Number',
    opt: '-',
    def: '50'
  },
  {
    name: 'uploadImgParams',
    desc: '上传图片参数',
    type: 'Object',
    opt: '-',
    def: '-'
  },
  {
    name: 'uploadImgHeaders',
    desc: '上传图片自定义 header',
    type: 'Object',
    opt: '-',
    def: '-'
  },
  {
    name: 'uploadImgName',
    desc: '上传的图片名称',
    type: 'String',
    opt: '-',
    def: '-'
  },
  {
    name: 'withCredentials',
    desc: '上传图片跨域传递 cookie',
    type: 'Boolean',
    opt: '-',
    def: 'true'
  },
  {
    name: 'uploadImgTimeout',
    desc: '上传图片超时时间（毫秒）',
    type: 'Number',
    opt: '-',
    def: '10 * 1000'
  },
  {
    name: 'showLinkImg',
    desc: '隐藏插入网络图片的功能',
    type: 'Boolean',
    opt: '-',
    def: 'true'
  },
  {
    name: 'showLinkImgAlt',
    desc: '网络图片设置alt',
    type: 'Boolean',
    opt: '-',
    def: 'true'
  },
  {
    name: 'showLinkImgHref',
    desc: '网络图片跳转',
    type: 'Boolean',
    opt: '-',
    def: 'true'
  },
  {
    name: 'uploadVideoType',
    desc: '上传图片方式(config:配置、custom:自定义)',
    type: 'Boolean',
    opt: 'config/custom',
    def: ''
  },
  {
    name: 'uploadVideoServer',
    desc: '上传视频服务地址',
    type: 'String',
    opt: '-',
    def: '-'
  },
  {
    name: 'uploadVideoMaxSize',
    desc: '视频大小',
    type: 'Number',
    opt: '-',
    def: '500 * 1024 * 1024'
  },
  {
    name: 'uploadVideoAccept',
    desc: '视频类型',
    type: 'Array',
    opt: '-',
    def: 'mp4'
  },
  {
    name: 'uploadVideoParams',
    desc: '上传视频参数',
    type: 'Object',
    opt: '-',
    def: '-'
  },
  {
    name: 'uploadVideoParamsWithUrl',
    desc: '上传视频参数拼接到Url',
    type: 'Boolean',
    opt: '-',
    def: 'false'
  },
  {
    name: 'uploadVideoHeaders',
    desc: '上传视频自定义 header',
    type: 'Object',
    opt: '-',
    def: '-'
  },
  {
    name: 'uploadVideoParamsWithUrl',
    desc: '上传视频参数拼接到Url',
    type: 'Boolean',
    opt: '-',
    def: 'false'
  },
  {
    name: 'uploadVideoName',
    desc: '上传视频自定义 fileName',
    type: 'String',
    opt: '-',
    def: '-'
  },
  {
    name: 'withVideoCredentials',
    desc: '上传视频跨域传递 cookie',
    type: 'Boolean',
    opt: '-',
    def: 'true'
  },
  {
    name: 'uploadVideoTimeout',
    desc: '上传视频超时时间',
    type: 'Number',
    opt: '-',
    def: '1000 * 60 * 5'
  },
  {
    name: 'showLinkVideo',
    desc: '隐藏插入网络视频的功能',
    type: 'Boolean',
    opt: '-',
    def: 'false'
  }
]
