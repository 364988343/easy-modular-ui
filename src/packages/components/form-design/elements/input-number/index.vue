<template>
  <attributes :data="data">

    <el-form-item label="是否使用控制按钮">
      <el-switch v-model="data.attributes.controls"> </el-switch>
    </el-form-item>

    <el-form-item label="控制按钮位置">
      <el-radio-group v-model="data.attributes.controlsPosition">
        <el-radio-button :label="null">默认</el-radio-button>
        <el-radio-button label="right">right</el-radio-button>
      </el-radio-group>
    </el-form-item>
  </attributes>
</template>

<script>
import attributes from '../attributes'
export default {
  name: 'el-input-number-attr',
  components: { attributes },
  props: { data: Object }
}
</script>
