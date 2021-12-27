<template>
  <em-form-page v-bind="form">
    <el-form-item label="图标：" prop="icon">
      <em-icon-picker v-model="form.model.icon" />
    </el-form-item>
  </em-form-page>
</template>
<script>
export default {
  data() {
    return {
      form: {
        header: true,
        title: '图标选择器示例',
        icon: 'detail',
        model: {
          icon: ''
        }
      }
    }
  }
}
</script>
