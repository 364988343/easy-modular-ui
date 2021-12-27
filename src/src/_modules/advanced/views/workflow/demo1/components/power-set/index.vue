<template>
  <div class="em-workflow-powser-set">
    <el-alert v-if="type === 'start'" title="发起环节只拥有保存和提交权限" type="warning" show-icon> </el-alert>
    <el-alert v-else title="默认拥有所有审批权限" type="warning" show-icon> </el-alert>
    <el-checkbox-group v-if="type != 'start'" v-model="approval.power">
      <el-checkbox :label="0" border>同意</el-checkbox>I
      <el-checkbox :label="1" border>驳回</el-checkbox>
      <el-checkbox :label="2" border>驳回指定环节</el-checkbox>
      <el-checkbox :label="3" border>转签</el-checkbox>
      <el-checkbox :label="4" border>不同意</el-checkbox>
    </el-checkbox-group>
  </div>
</template>

<script>
export default {
  props: { approval: Object, type: String },
  data() {
    return {}
  }
}
</script>

<style lang="scss">
.em-workflow-powser-set {
  .el-checkbox {
    width: 140px;
    margin-left: 0 !important;
    margin-bottom: 20px;
  }
}
</style>
