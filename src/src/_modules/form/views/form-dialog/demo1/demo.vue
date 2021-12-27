<template>
  <em-panel v-bind="panel">
    <em-button text="新增" @click="dialog.add = true" />
    <em-button text="编辑" @click="dialog.edit = true" />
    <em-form-dialog v-bind="dialogAdd" :visible.sync="dialog.add">
      <el-row>
        <el-col :span="21" :offset="1">
          <el-form-item label="姓名：" prop="name">
            <el-input v-model="dialogAdd.model.name" />
          </el-form-item>
        </el-col>
        <el-col :span="21" :offset="1">
          <el-form-item label="年龄：" prop="age">
            <el-input v-model="dialogAdd.model.age" />
          </el-form-item>
        </el-col>
      </el-row>
    </em-form-dialog>
    <em-form-dialog v-bind="dialogEdit" :visible.sync="dialog.edit">
      <el-row>
        <el-col :span="21" :offset="1">
          <el-form-item label="姓名：" prop="name">
            <el-input v-model="dialogEdit.model.name" />
          </el-form-item>
        </el-col>
        <el-col :span="21" :offset="1">
          <el-form-item label="年龄：" prop="age">
            <el-input v-model="dialogEdit.model.age" />
          </el-form-item>
        </el-col>
      </el-row>
    </em-form-dialog>
  </em-panel>
</template>
<script>
export default {
  data() {
    return {
      panel: {
        page: true,
        header: true,
        title: '表单对话框',
        icon: 'app'
      },
      dialog: {
        add: false,
        edit: false
      },
      dialogAdd: {
        header: true,
        title: '新增',
        icon: 'detail',
        height: '240px',
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
      },
      dialogEdit: {
        header: true,
        title: '编辑',
        icon: 'detail',
        height: '240px',
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
