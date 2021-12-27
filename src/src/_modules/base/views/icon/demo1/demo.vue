<template>
  <em-panel v-bind="panel">
    <el-divider>简单示例</el-divider>
    <em-icon name="github-fill" size="50px"></em-icon>
    <el-divider>图标大小</el-divider>
    <em-icon name="github-fill" size="100px"></em-icon>
    <el-divider>图标颜色</el-divider>
    <em-icon name="github-fill" size="120px" color="#409eff"></em-icon>
    <el-divider>图标自定义样式</el-divider>
    <em-icon name="github-fill" custom-class="icon-class"></em-icon>
  </em-panel>
</template>
<script>
export default {
  data() {
    return {
      panel: {
        title: '图标示例',
        page: true,
        header: true,
        icon: 'detail'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.icon-class {
  width: 200px;
  height: 200px;
  color: #67c23a;
}
</style>
