<template>
  <em-form-dialog ref="form" v-bind="dialog" :visible.sync="visible_">
    <el-row :gutter="20">
      <el-col :span="18" :offset="2">
        <el-form-item label="企业" prop="enterpriseName">
          <el-input type="text" v-model="user.enterpriseName" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="账号" prop="userCode">
          <el-input type="text" v-model="user.userCode" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="userName">
          <el-input type="text" v-model="user.userName" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-tag v-if="user.sex">男</el-tag>
          <el-tag v-if="!user.sex" type="danger">女</el-tag>
        </el-form-item>

        <el-form-item label="职位" prop="jobName">
          <el-input type="text" v-model="user.jobName" :disabled="true"></el-input>
        </el-form-item>

        <el-form-item label="角色" prop="roleNames">
          <el-tag type="danger">{{ user.roleNames }}</el-tag>
        </el-form-item>
      </el-col>
    </el-row>
  </em-form-dialog>
</template>
<script>
import visible from '../../mixins/components/visible'
export default {
  name: 'user-info',
  mixins: [visible],
  data() {
    return {
      dialog: {
        title: '用户信息',
        icon: 'user',
        width: '600px',
        height: '389px',
        footer: false
      }
    }
  }
}
</script>
