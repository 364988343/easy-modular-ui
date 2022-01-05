<template>
  <attributes :data="data">
    <el-form-item label="switch宽度">
      <el-input-number v-model="data.attributes.width" controls-position="right"></el-input-number>
    </el-form-item>
  </attributes>
</template>

<script>
import attributes from '../attributes'
export default {
  name: 'el-switch-attr',
  components: { attributes },
  props: { data: Object }
}
</script>
