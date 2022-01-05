<template>
  <attributes :data="data">
    <el-form-item label="是否支持透明度选择">
      <el-switch v-model="data.attributes.showAlpha"> </el-switch>
    </el-form-item>
    <el-form-item label="数据格式">
      <el-select v-model="data.attributes.colorFormat" placeholder="请选择">
        <el-option v-for="item in formats" :key="item.value" :label="item.label" :value="item.value"> </el-option>
      </el-select>
    </el-form-item>
  </attributes>
</template>

<script>
import attributes from '../attributes'
export default {
  name: 'em-color-picker-attr',
  components: { attributes },
  props: { data: Object },
  data() {
    return {
      formats: [
        {
          value: 'hsl',
          label: 'hsl'
        },
        {
          value: 'hsv',
          label: 'hsv'
        },
        {
          value: 'hex',
          label: 'hex'
        },
        {
          value: 'rgb',
          label: 'rgb'
        }
      ]
    }
  }
}
</script>
