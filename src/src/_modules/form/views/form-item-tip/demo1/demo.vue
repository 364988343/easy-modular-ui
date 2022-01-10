<template>
  <em-panel page  header title="表单栏位提示示例" icon="profile">
    <em-form ref="form1" v-bind="form">
      <el-row>
        <el-col :span="21" :offset="1">
          <el-form-item prop="name">
            <template v-slot:label>
              <em-form-item-tip label="姓名" content="这是一段内容,这是一段内容,这是一段内容,这是一段内容"></em-form-item-tip>
            </template>
            <el-input v-model="form.model.name" />
          </el-form-item>
        </el-col>
        <el-col :span="21" :offset="1">
          <el-form-item label="爱好" prop="hobby">
            <el-input v-model="form.model.hobby" />
          </el-form-item>
        </el-col>
      </el-row>
    </em-form>
  </em-panel>
</template>
<script>
export default {
  data() {
    return {
      form: {
        model: {
          name: '',
          hobby: 0
        }
      }
    }
  }
}
</script>
