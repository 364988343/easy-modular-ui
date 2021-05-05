<template>
  <em-list v-bind="list">
    <template v-slot:querybar>
      <el-form-item label="姓名：" prop="name">
        <el-input v-model="list.model.name" />
      </el-form-item>
    </template>
    <template v-slot:querybar-advanced>
      <el-form-item label="年龄：" prop="age">
        <el-input v-model="list.model.age" />
      </el-form-item>
    </template>
    <template v-slot:col-operation>
      <em-button type="text" text="编辑" icon="edit" />
      <em-button-delete type="text" :action="remove" id="1" @success="onSuccess" />
    </template>
  </em-list>
</template>
<script>
export default {
  data() {
    return {
      list: {
        title: '简单列表',
        icon: 'list',
        action: this.query,
        model: {
          name: '',
          age: ''
        },
        advanced: {
          enabled: true
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
          },
          {
            name: 'entryDate',
            label: '出生日期',
            format: 'YYYY年MM月DD日'
          }
        ]
      }
    }
  },
  methods: {
    query() {
      const rows = [
        { id: 1, name: '张三', age: 22, entryDate: '2021-1-8' },
        { id: 2, name: '李四', age: 26, entryDate: '2020-1-8 12:23' },
        { id: 3, name: '王五', age: 26, entryDate: '2008-1-8' }
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
