<template>
  <em-panel page header title="上传文件对话框示例" icon="app">
    <em-button text="上传" @click="dialog.visible = true" />
    <em-upload-dialog
      v-bind="dialog"
      :visible.sync="dialog.visible"
      @downloadTemplate="downloadTemplate"
    ></em-upload-dialog>
  </em-panel>
</template>
<script>
export default {
  data() {
    return {
      dialog: {
        title: '导入',
        visible: false,
        action: 'http://ip.com',
        limit: 1,
        accept: '',
        tip: ''
      }
    }
  },
  methods: {
    downloadTemplate() {
      this._error('下载模板成功')
    }
  }
}
</script>