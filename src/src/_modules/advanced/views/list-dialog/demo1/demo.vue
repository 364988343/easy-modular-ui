<template>
  <em-panel>
    <em-button type="success" text="查询列表" @click="show = true"></em-button>
    <em-list-dialog v-bind="dialog" :visible.sync="show">
      <em-list v-bind="list">
        <template v-slot:querybar>
          <el-form-item label="姓名：" prop="name">
            <el-input v-model="list.model.name" />
          </el-form-item>
        </template>

        <template v-slot:col-operation>
          <em-button type="text" text="编辑" icon="edit" />
          <em-button-delete type="text" :action="remove" id="1" @success="onSuccess" />
        </template>
      </em-list>
    </em-list-dialog>
  </em-panel>
</template>
<script>
export default {
  data() {
    return {
      show: false,
      dialog: {
        title: '列表页对话框示例',
        icon: 'list',
        width: '80%',
        height: '80%'
      },
      list: {
        noHeader: true,
        action: this.query,
        model: {
          name: ''
        },
        cols: [
          {
            name: 'id',
            label: '工号',
            show: false
          },
          {
            name: 'name',
            label: '姓名'
          },
          {
            name: 'age',
            label: '年龄'
          }
        ]
      }
    }
  },
  methods: {
    query() {
      const rows = [
        { id: 1, name: '张三', age: 33 },
        { id: 2, name: '李四', age: 32 },
        { id: 3, name: '王五', age: 55 }
      ]
      return new Promise(resolve => {
        resolve({
          rows,
          total: 3
        })
      })
    },
    remove() {},
    onSuccess() {
      this.query()
    }
  }
}
</script>
