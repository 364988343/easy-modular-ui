<template>
  <em-form-page v-bind="form">
    <el-form-item label="普通用法：" prop="color">
      <em-color-picker v-model="form.model.color" />
    </el-form-item>
    <el-form-item label="禁用：" prop="color1">
      <em-color-picker v-model="form.model.color1" disabled />
    </el-form-item>
    <el-form-item label="透明度：" prop="color1">
      <em-color-picker v-model="form.model.color2" show-alpha />
    </el-form-item>
    <el-form-item label="预定义颜色：" prop="color1">
      <em-color-picker v-model="form.model.color2" :predefine="predefine" />
    </el-form-item>
  </em-form-page>
</template>
<script>
export default {
  data() {
    return {
      form: {
        header: true,
        title: '颜色选择器示例',
        icon: 'detail',
        model: {
          color: '',
          color1: '',
          color2: ''
        }
      },
      predefine: ['#ccc', '#744914', '#B80A04', '#808080']
    }
  }
}
</script>
<style></style>
