<template>
  <attributes :data="data">
    <el-form-item label="上传地址">
      <el-input v-model="data.attributes.action"></el-input>
    </el-form-item>
    <el-form-item label="接受上传的文件类型">
      <el-input v-model="data.attributes.accept"></el-input>
    </el-form-item>
    <el-form-item label="文件最大大小">
      <el-input v-model="data.attributes.maxSize"></el-input>
    </el-form-item>
  </attributes>
</template>

<script>
import attributes from '../attributes'
export default {
  name: 'em-upload-single-attr',
  components: { attributes },
  props: { data: Object }
}
</script>
