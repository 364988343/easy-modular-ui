<template>
  <div class="em-editor">
    <div :ref="id"></div>
  </div>
</template>

<script>
import E from 'wangeditor'
export default {
  name: 'editor',
  data() {
    return {
      editor: null,
      value_: ''
    }
  },
  props: {
    //富文本编辑器ID
    id: {
      type: String,
      default: 'editor'
    },
    //内容
    value: {
      type: String,
      require: true
    },
    //高度
    height: {
      type: Number,
      default: 300
    },
    //提示文字
    placeholder: {
      type: String,
      default: '请输入正文'
    },
    //禁用
    disable: Boolean,
    //上传图片方式(local/config/custom)
    uploadImgType: {
      type: String,
      default: 'local'
    },
    //上传图片服务地址
    uploadImgServer: String,
    //图片大小
    uploadImgMaxSize: {
      type: Number,
      default: 5 * 1024 * 1024
    },
    //图片类型
    uploadImgAccept: {
      type: Array,
      default: () => ['jpg', 'jpeg', 'png', 'gif', 'bmp']
    },
    //图片最大数量
    uploadImgMaxLength: {
      type: Number,
      default: 50
    },
    //上传图片参数
    uploadImgParams: Object,
    //上传图片自定义 header
    uploadImgHeaders: Object,
    //上传的图片名称
    uploadImgName: String,
    //上传图片跨域传递 cookie
    withCredentials: {
      type: Boolean,
      default: true
    },
    //上传图片超时时间
    uploadImgTimeout: {
      type: Number,
      default: 10 * 1000
    },
    //隐藏插入网络图片的功能
    showLinkImg: {
      type: Boolean,
      default: true
    },
    //网络图片设置alt
    showLinkImgAlt: {
      type: Boolean,
      default: true
    },
    //网络图片跳转
    showLinkImgHref: {
      type: Boolean,
      default: true
    },
    //上传视频方式(config/custom)
    uploadVideoType: String,

    //上传视频服务地址
    uploadVideoServer: String,
    //视频大小
    uploadVideoMaxSize: {
      type: Number,
      default: 500 * 1024 * 1024
    },
    //视频类型
    uploadVideoAccept: {
      type: Array,
      default: () => ['mp4']
    },
    //上传视频参数
    uploadVideoParams: Object,
    //上传视频参数拼接到Url
    uploadVideoParamsWithUrl: Boolean,
    //上传视频自定义 header
    uploadVideoHeaders: Object,
    //上传视频自定义 fileName
    uploadVideoName: String,
    //上传视频跨域传递 cookie
    withVideoCredentials: {
      type: Boolean,
      default: true
    },
    //上传视频超时时间
    uploadVideoTimeout: {
      type: Number,
      default: 1000 * 60 * 5
    },
    //隐藏插入网络视频的功能
    showLinkVideo: Boolean
  },
  methods: {
    /**
     * @description: 初始化
     * @param {*}
     */
    init() {
      const _this = this
      if (_this.editor != null) _this.editor.destroy()

      _this.editor = new E(this.$refs[this.id])

      _this.editor.config.height = this.height
      _this.editor.config.placeholder = this.placeholder

      //图片上传设置
      _this.setImg()
      //视频上传设置
      _this.setVideo()

      _this.editor.config.onchange = function (newHtml) {
        _this.value_ = newHtml
        _this.$emit('input', _this.value_)
        _this.$emit('change', _this.value_)
      }

      _this.editor.create()
      if (this.disable) _this.editor.disable()
    },

    /**
     * @description: 图片上传设置
     * @param {*}
     */
    setImg() {
      const _this = this
      _this.editor.config.uploadImgMaxSize = this.uploadImgMaxSize
      _this.editor.config.uploadImgMaxLength = this.uploadImgMaxLength
      _this.editor.config.showLinkImg = this.showLinkImg
      _this.editor.config.showLinkImgAlt = this.showLinkImgAlt
      _this.editor.config.showLinkImgHref = this.showLinkImgHref

      //图片本地上传
      if (this.uploadImgType === 'local') {
        _this.editor.config.uploadImgShowBase64 = true
      }

      //配置服务上传图片
      if (this.uploadImgType === 'config') {
        _this.editor.config.uploadImgServer = this.uploadImgServer
        _this.editor.config.withCredentials = this.withCredentials
        _this.editor.config.uploadImgTimeout = this.uploadImgTimeout
        if (this.uploadImgParams) _this.editor.config.uploadImgParams = this.uploadImgParams
        if (this.uploadImgHeaders) _this.editor.config.uploadImgHeaders = this.uploadImgHeaders
        if (this.uploadFileName) _this.editor.config.uploadFileName = this.uploadImgName

        _this.editor.config.uploadImgHooks = {
          // 上传图片之前
          before: function (xhr) {
            _this.$emit('uploadImgBefore', xhr)
          },
          // 图片上传并返回了结果，图片插入已成功
          success: function (xhr) {
            _this.$emit('uploadImgSuccess', xhr)
          },
          // 图片上传并返回了结果，但图片插入时出错了
          fail: function (xhr, editor, resData) {
            _this.$emit('uploadImgFail', xhr, editor, resData)
          },
          // 上传图片出错，一般为 http 请求的错误
          error: function (xhr, editor, resData) {
            _this.$emit('uploadImgError', xhr, editor, resData)
          },
          // 上传图片超时
          timeout: function (xhr) {
            _this.$emit('uploadImgTimeout', xhr)
          },
          // 图片上传并返回了结果，想要自己把图片插入到编辑器中
          // 例如服务器端返回的不是 { errno: 0, data: [...] } 这种格式，可使用 customInsert
          customInsert: function (insertImgFn, result) {
            // result 即服务端返回的接口
            // insertImgFn 可把图片插入到编辑器，传入图片 src ，执行函数即可
            _this.$emit('customInsertImg', insertImgFn, result)
          }
        }
      }

      //自定义上传图片
      if (this.uploadImgType === 'custom') {
        _this.editor.config.customUploadImg = function (resultFiles, insertImgFn) {
          _this.$emit('customUploadImg', resultFiles, insertImgFn)
        }
      }
    },

    /**
     * @description: 视频上传设置
     * @param {*}
     */
    setVideo() {
      const _this = this
      _this.editor.config.uploadVideoServer = this.uploadVideoServer
      _this.editor.config.uploadVideoMaxSize = this.uploadVideoMaxSize
      _this.editor.config.uploadVideoAccept = this.uploadVideoAccept

      if (this.uploadVideoType === 'config') {
        _this.editor.config.uploadVideoServer = this.uploadVideoServer
        _this.editor.config.withVideoCredentials = this.withVideoCredentials
        _this.editor.config.uploadVideoTimeout = this.uploadVideoTimeout
        if (this.uploadVideoParams) _this.editor.config.uploadVideoParams = this.uploadVideoParams
        if (this.uploadVideoName) _this.editor.config.uploadVideoName = this.uploadVideoName
        if (this.uploadVideoHeaders) _this.editor.config.uploadVideoHeaders = this.uploadVideoName

        _this.editor.config.uploadVideoHooks = {
          // 上传视频之前
          before: function (xhr) {
            _this.$emit('uploadVideoBefore', xhr)
          },
          // 视频上传并返回了结果，视频插入已成功
          success: function (xhr) {
            _this.$emit('uploadVideoSuccess', xhr)
          },
          // 视频上传并返回了结果，但视频插入时出错了
          fail: function (xhr, editor, resData) {
            _this.$emit('uploadVideoFail', xhr, editor, resData)
          },
          // 上传视频出错，一般为 http 请求的错误
          error: function (xhr, editor, resData) {
            _this.$emit('uploadVideoError', xhr, editor, resData)
          },
          // 上传视频超时
          timeout: function (xhr) {
            _this.$emit('uploadVideoTimeout', xhr)
          },
          // 视频上传并返回了结果，想要自己把视频插入到编辑器中
          // 例如服务器端返回的不是 { errno: 0, data: { url : '.....'} } 这种格式，可使用 customInsert
          customInsert: function (insertVideoFn, result) {
            // result 即服务端返回的接口
            // insertVideoFn 可把视频插入到编辑器，传入视频 src ，执行函数即可
            _this.$emit('customInsertVideo', insertVideoFn, result)
          }
        }
      }

      if (this.uploadVideoType === 'custom') {
        _this.editor.config.customUploadVideo = function (resultFiles, insertVideoFn) {
          // resultFiles 是 input 中选中的文件列表
          // insertVideoFn 是获取视频 url 后，插入到编辑器的方法
          _this.$emit('customUploadVideo', resultFiles, insertVideoFn)
        }
      }
    }
  },
  watch: {
    value: {
      handler(n, o) {
        if (n != o) this.value_ = n
      },
      immediate: true
    }
  },
  mounted() {
    this.init()
  }
}
</script>
