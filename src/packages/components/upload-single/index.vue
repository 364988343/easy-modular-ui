<template>
  <div class="em-upload-single">
    <div class="input">
      <el-input :value="fileName" :placeholder="placeholder" disabled :size="size || fontSize" />
    </div>
    <div class="button">
      <el-upload
        ref="upload"
        :action="action"
        :headers="{
          Authorization: 'Bearer ' + accessToken
        }"
        :multiple="false"
        :data="data"
        :accept="accept"
        :limit="1"
        :drag="false"
        :disabled="loading"
        auto-upload
        :show-file-list="true"
        :on-success="onSuccess"
        :on-error="onError"
        :before-upload="onBeforeUpload"
      >
        <em-button :type="btnType" text="上传" :icon="icon_" @click="onClick" :loading="loading" :size="size || fontSize" />
      </el-upload>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'upload-single',
  data() {
    return {
      fileName: this.name,
      filePath: this.value,
      loading: false
    }
  },
  props: {
    value: String,
    //占位符
    placeholder: String,
    //上传地址
    action: {
      type: String,
      required: true
    },
    //是否禁用
    disabled: Boolean,
    //文件名称
    name: String,
    //按钮类型
    btnType: {
      type: String,
      default: 'primary'
    },
    //不显示图标
    noIcon: Boolean,
    //额外的数据
    data: Object,
    //文件最大大小
    maxSize: String,
    //接受上传的文件类型
    accept: String,
    //尺寸
    size: String
  },
  computed: {
    ...mapState('app/user', ['accessToken']),
    maxSizeBytes() {
      if (this.maxSize) {
        const max = this.maxSize.toLowerCase()
        if (max.endsWith('kb')) {
          return parseFloat(max.replace('kb', '')) * 1024
        } else if (max.endsWith('mb')) {
          return parseFloat(max.replace('mb', '')) * 1024 * 1024
        } else if (max.endsWith('gb')) {
          return parseFloat(max.replace('gb', '')) * 1024 * 1024 * 1024
        } else if (max.endsWith('tb')) {
          return parseFloat(max.replace('tb', '')) * 1024 * 1024 * 1024 * 1024
        } else if (max.endsWith('b')) {
          return parseFloat(max.replace('b', ''))
        } else {
          return parseFloat(max)
        }
      }
      return 0
    },
    icon_() {
      return this.loading ? 'loading' : this.noIcon ? '' : 'upload'
    }
  },
  methods: {
    /**
     * @description: 点击事件
     * @param {*}
     */
    onClick() {
      if (this.loading) {
        return
      }
      this.$refs.upload.clearFiles()
    },

    /**
     * @description: 上传前触发事件
     * @param {*} file
     */
    onBeforeUpload(file) {
      if (this.maxSizeBytes && file.size > this.maxSizeBytes) {
        this._error('文件大小不能超过' + this.maxSize)
        return false
      }
      this.loading = true
    },

    /**
     * @description: 上传成功触发事件
     * @param {*} response
     * @param {*} file
     */
    onSuccess(response, file) {
      if (response.code === 1) {
        this.fileName = response.data.fileName
        this.filePath = response.data.fullPath
        this.$emit('input', this.filePath)
        this.$emit('update:name', this.fileName)
        this.$emit('success', response.data, file)
      } else {
        this.onError()
      }
      this.loading = false
    },

    /**
     * @description: 上传失败触发事件
     * @param {*}
     */
    onError() {
      this._error('上传失败')
      this.loading = false
    },

    /**
     * @description: 重置
     * @param {*}
     */
    reset() {
      this.fileName = ''
      this.filePath = ''
    }
  },
  watch: {
    value(val) {
      this.filePath = val
    },
    name(val) {
      this.fileName = val
    }
  }
}
</script>
