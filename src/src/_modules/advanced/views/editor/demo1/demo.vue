<template>
  <em-panel page header title="富文本示例" icon="detail">
    <em-editor v-model="value" v-bind="editor" @customUploadImg="customUploadImg"></em-editor>

    <h3>富文本编辑器内容</h3>
    <el-input type="textarea" :rows="15" v-model="value" readonly> </el-input>
  </em-panel>
</template>
<script>
export default {
  data() {
    return {
      value: '',
      editor: {
        uploadImgType: 'custom',

        customUploadImg: this.test
      }
    }
  },
  methods: {
    customUploadImg(data, fun) {
      console.log(data)
       console.log(fun)
    }
  }
}
</script>

<style lang="scss" scoped>
.count-up {
  width: 500px;
  height: 200px;
  line-height: 200px;
  text-align: center;
  font-size: 50px;
  border: 1px solid #ccc;
  margin: 30px auto;
}
</style>
