<template>
  <em-form-page page header title="单文件上传示例" icon="upload">
    <el-form-item label="上传文件" prop="filePath">
      <em-upload-single v-model="filePath" :name.sync="fileName" action="http://ip.com" />
    </el-form-item>
  </em-form-page>
</template>
<script>
export default {
  data() {
    return {
      filePath: '',
      fileName: ''
    }
  }
}
</script>
