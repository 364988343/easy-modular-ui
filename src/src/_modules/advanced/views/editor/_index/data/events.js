export default [
  {
    name: 'change',
    desc: '编辑器内容发生改变时触发该事件',
    params: 'data'
  },
  {
    name: 'uploadImgBefore',
    desc: '上传图片之前触发的事件',
    params: 'xhr'
  },
  {
    name: 'uploadImgSuccess',
    desc: '图片上传并返回了结果，图片插入已成功触发该事件',
    params: 'xhr'
  },
  {
    name: 'uploadImgFail',
    desc: '图片上传并返回了结果，但图片插入时出错了触发该事件',
    params: 'xhr, editor, resData'
  },
  {
    name: 'uploadImgError',
    desc: '上传图片出错，一般为 http 请求的错误触发该事件',
    params: 'xhr, editor, resData'
  },
  {
    name: 'uploadImgTimeout',
    desc: '上传图片超时触发该事件',
    params: 'xhr'
  },
  {
    name: 'customInsertImg',
    desc: '图片上传并返回了结果触发该事件，通常用于修改返回结果插入图片到编辑器（insertImgFn：插入图片的方法，参数为图片路径）',
    params: 'insertImgFn, result'
  },
  {
    name: 'customUploadImg',
    desc: '自定义上传图片（resultFiles：图片、insertImgFn：插入图片的方法，参数为图片的路径）',
    params: 'resultFiles, insertImgFn'
  },
  {
    name: 'uploadVideoBefore',
    desc: '上传视频之前触发该事件',
    params: 'xhr'
  },
  {
    name: 'uploadVideoSuccess',
    desc: '视频上传并返回了结果，视频插入已成功触发该事件',
    params: 'xhr, editor, resData'
  },
  {
    name: 'uploadVideoError',
    desc: '上传传视频出错，一般为 http 请求的错误触发该事件',
    params: 'xhr, editor, resData'
  },
  {
    name: 'uploadVideoTimeout',
    desc: '上传视频超时触发该事件',
    params: 'xhr'
  },
  {
    name: 'customInsertVideo',
    desc: '视频上传并返回了结果触发该事件，通常用于修改返回结果插入视频到编辑器',
    params: 'xhr, editor, resData'
  },
  {
    name: 'uploadVideoSuccess',
    desc: '视频上传并返回了结果，视频插入已成功触发该事件（insertVideoFn：插入视频的方法，参数为视频路径）',
    params: 'insertVideoFn, result'
  },
  {
    name: 'customUploadVideo',
    desc: '自定义上传视频（resultFiles：视频、insertVideoFn：插入视频的方法，参数为视频的路径）',
    params: 'resultFiles, insertVideoFn'
  }
]
