<template>
  <attributes :data="data">
    <el-form-item label="是否显示辅助文字">
      <el-switch v-model="data.attributes.showText"> </el-switch>
    </el-form-item>
    <el-form-item label="是否显分数">
      <el-switch v-model="data.attributes.showScore"></el-switch>
    </el-form-item>
    <el-form-item label="辅助文字">
      <el-row>
        <el-col :span="24" v-for="(item, index) in data.attributes.texts" :key="index">
          <el-input v-model="data.attributes.texts[index]"></el-input>
        </el-col>
      </el-row>
    </el-form-item>
  </attributes>
</template>

<script>
import attributes from '../attributes'
export default {
  name: 'el-rate-attr',
  components: { attributes },
  props: { data: Object },
  data() {
    return {}
  }
}
</script>
