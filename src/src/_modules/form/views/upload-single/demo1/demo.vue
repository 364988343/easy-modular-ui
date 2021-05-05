<template>
  <em-panel-row height="400px">
    <em-panel-col :span="12">
      <em-form-page header title="单文件上传示例">
        <el-row>
          <el-col :span="21" :offset="1">
            <el-form-item label="上传文件" prop="filePath">
              <em-upload-single v-model="filePath" :name.sync="fileName" action="http://ip.com" />
            </el-form-item>
          </el-col>
        </el-row>
      </em-form-page>
    </em-panel-col>
  </em-panel-row>
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
