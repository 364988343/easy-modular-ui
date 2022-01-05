<template>
  <el-form ref="form" :model="data" label-position="top" :size="fontSize">
    <el-form-item label="字段标识">
      <el-input v-model="data.fieldName"></el-input>
    </el-form-item>

    <el-form-item label="标题">
      <el-input v-model="data.label"></el-input>
    </el-form-item>

    <el-form-item label="占位内容" v-if="data.attributes.placeholder != null">
      <el-input v-model="data.attributes.placeholder"></el-input>
    </el-form-item>

    <el-form-item label="尺寸" v-if="data.attributes.size != null">
      <el-radio-group v-model="data.attributes.size">
        <el-radio-button label="medium">medium</el-radio-button>
        <el-radio-button label="small">small</el-radio-button>
        <el-radio-button label="mini">mini</el-radio-button>
      </el-radio-group>
    </el-form-item>

    <el-form-item label="栅格占据的列数">
      <el-radio-group v-model="data.span">
        <el-radio-button :label="1">1列</el-radio-button>
        <el-radio-button :label="2">2列</el-radio-button>
        <el-radio-button :label="3">3列</el-radio-button>
        <el-radio-button :label="4">4列</el-radio-button>
      </el-radio-group>
    </el-form-item>

    <el-form-item label="是否必填">
      <el-switch v-model="data.required"> </el-switch>
    </el-form-item>

    <el-form-item label="是否禁用">
      <el-switch v-model="data.attributes.disabled"> </el-switch>
    </el-form-item>

    <slot />
  </el-form>
</template>

<script>
export default {
  props: { data: Object }
}
</script>
