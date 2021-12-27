<template>
  <div>
    <em-panel-row height="300px">
      <em-panel-col :span="12">
        <em-panel header footer title="基础表单示例" icon="profile">
          <em-form ref="form1" v-bind="form1">
            <el-row>
              <el-col :span="21" :offset="1">
                <el-form-item label="姓名：" prop="name">
                  <el-input v-model="form1.model.name" />
                </el-form-item>
              </el-col>
              <el-col :span="21" :offset="1">
                <el-form-item label="爱好：" prop="hobby">
                  <el-input v-model="form1.model.hobby" />
                </el-form-item>
              </el-col>
            </el-row>
          </em-form>
          <template v-slot:footer>
            <em-button type="success" text="保存" @click="$refs.form1.submit()" />
          </template>
        </em-panel>
      </em-panel-col>
      <em-panel-col :span="12">
        <em-panel header footer title="基础表单示例" icon="profile">
          <em-form ref="form2" v-bind="form2">
            <el-row>
              <el-col :span="10" :offset="1">
                <el-form-item label="姓名：" prop="name">
                  <el-input v-model="form2.model.name" />
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="爱好：" prop="hobby">
                  <el-input v-model="form1.model.hobby" />
                </el-form-item>
              </el-col>
            </el-row>
          </em-form>
          <template v-slot:footer>
            <em-button type="success" text="保存" @click="$refs.form2.submit()" />
            <em-button type="info" text="重置" @click="$refs.form2.reset()" />
          </template>
        </em-panel>
      </em-panel-col>
    </em-panel-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form1: {
        model: {
          name: '',
          hobby: 0
        },
        rules: {
          name: [{ required: true, message: '请输入姓名' }]
        },
        action() {
          return new Promise((resolve) => {
            resolve()
          })
        }
      },
      form2: {
        model: {
          name: '',
          age: 0
        },
        rules: {
          name: [{ required: true, message: '请输入姓名' }]
        },
        action() {
          return new Promise((resolve) => {
            resolve()
          })
        }
      }
    }
  }
}
</script>
