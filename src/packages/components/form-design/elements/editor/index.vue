<template>
  <attributes :data="data">
    <el-form-item label="编辑器Id">
      <el-input v-model="data.attributes.id" controls-position="right"></el-input>
    </el-form-item>
    <el-form-item label="高度">
      <el-input-number v-model="data.attributes.height" controls-position="right"></el-input-number>
    </el-form-item>
  </attributes>
</template>

<script>
import attributes from '../attributes'
export default {
  name: 'em-editor-attr',
  components: { attributes },
  props: { data: Object }
}
</script>
