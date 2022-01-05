<template>
  <el-form ref="form" :model="data" label-position="top" :size="fontSize">
    <el-form-item label="表单列数">
      <el-radio-group v-model="data.colNum">
        <el-radio-button :label="1">1列</el-radio-button>
        <el-radio-button :label="2">2列</el-radio-button>
        <el-radio-button :label="3">3列</el-radio-button>
        <el-radio-button :label="4">4列</el-radio-button>
      </el-radio-group>
    </el-form-item>

    <el-form-item label="表单尺寸">
      <el-radio-group v-model="data.size">
        <el-radio-button label="medium">medium</el-radio-button>
        <el-radio-button label="small">small</el-radio-button>
        <el-radio-button label="mini">mini</el-radio-button>
      </el-radio-group>
    </el-form-item>

    <el-form-item label="标签对齐方式">
      <el-radio-group v-model="data.labelPosition">
        <el-radio-button label="right">左对齐</el-radio-button>
        <el-radio-button label="left">右对齐</el-radio-button>
        <el-radio-button label="top">顶部对齐</el-radio-button>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="表单标签宽度">
      <el-input-number v-model="data.labelWidth" controls-position="right"></el-input-number>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  props: { data: Object },
  data() {
    return {}
  }
}
</script>
