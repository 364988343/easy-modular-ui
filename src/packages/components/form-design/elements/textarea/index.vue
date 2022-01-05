<template>
  <attributes :data="data">
    <el-form-item label="行数">
      <el-input-number v-model="data.attributes.rows" controls-position="right"></el-input-number>
    </el-form-item>
  </attributes>
</template>

<script>
import attributes from '../attributes'
export default {
  name: 'el-textarea-attr',
  components: { attributes },
  props: { data: Object }
}
</script>
