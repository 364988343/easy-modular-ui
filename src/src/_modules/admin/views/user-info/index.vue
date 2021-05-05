<template>
  <em-form-dialog ref="form" v-bind="dialog" :visible.sync="visible_">
    <el-row :gutter="20">
      <el-col :span="18" :offset="2">
        <el-form-item label="账号" prop="userCode">
          <el-input type="text" v-model="model.userCode" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="userName">
          <el-input type="text" v-model="model.userName" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-input type="text" v-model="model.sex" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="部门" prop="organizeName">
          <el-input type="text" v-model="model.organizeName" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="职位" prop="jobName">
          <el-input type="text" v-model="model.jobName" :disabled="true"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
  </em-form-dialog>
</template>
<script>
import visible from '../../../../../packages/mixins/components/visible'
import userApi from '../../api/user'

export default {
  name: 'UserInfo',
  mixins: [visible],
  data() {
    return {
      model: {},
      dialog: {
        title: '用户信息',
        icon: 'user',
        width: '600px',
        height: '420px',
        footer: false
      }
    }
  },
  methods: {
    async getUserInfo() {
      const data = await userApi.get()
      Object.assign(this.model, data)
    }
  },
  created() {
    this.getUserInfo()
  }
}
</script>
<style lang="scss" scoped></style>
