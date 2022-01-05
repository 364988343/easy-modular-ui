<template>
  <attributes :data="data">
    <el-form-item label="最小值">
      <el-input-number v-model="data.attributes.min" controls-position="right"></el-input-number>
    </el-form-item>
    <el-form-item label="最大值">
      <el-input-number v-model="data.attributes.max" controls-position="right"></el-input-number>
    </el-form-item>
    <el-form-item label="步长">
      <el-input-number v-model="data.attributes.step" controls-position="right"></el-input-number>
    </el-form-item>
  </attributes>
</template>

<script>
import attributes from '../attributes'
export default {
  name: 'el-slider-attr',
  components: { attributes },
  props: { data: Object }
}
</script>
