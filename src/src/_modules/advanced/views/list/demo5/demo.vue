<template>
  <em-list v-bind="list">
    <template v-slot:querybar>
      <el-form-item label="账号：" prop="code">
        <el-input v-model="list.model.code" />
      </el-form-item>
      <el-form-item label="姓名：" prop="name">
        <el-input v-model="list.model.name" />
      </el-form-item>
    </template>
  </em-list>
</template>
<script>
export default {
  data() {
    return {
      list: {
        title: '列表页-行合并',
        icon: 'detail',
        action: this.query,
        noOperateCol: true,
        noOperateBar: true,
        mergeRowCols: ['code', 'name'],
        model: {
          name: ''
        },
        cols: [
          {
            name: 'id',
            label: 'id',
            show: false
          },
          {
            name: 'code',
            label: '姓名'
          },
          {
            name: 'name',
            label: '姓名'
          },
          {
            name: 'phone',
            label: '手机号码'
          },

          {
            name: 'entryDate',
            label: '入职时间',
            format: 'YYYY-MM-DD'
          }
        ]
      }
    }
  },
  methods: {
    query() {
      const rows = [
        { id: 1, code: 'zanmusi', name: '詹姆斯', phone: '13662970321', entryDate: '2021-1-8 12:22:10' },
        { id: 2, code: 'weide', name: '韦德', phone: '18762970231', entryDate: '2021-1-8 10:33' },
        { id: 5, code: 'weide', name: '韦德', phone: '18762970231', entryDate: '2021-1-9 10:33' },
        { id: 3, code: 'ouwen', name: '欧文', phone: '13662970321', entryDate: '2021-1-8' }
      ]
      return new Promise((resolve) => {
        resolve({
          rows,
          total: 6
        })
      })
    }
  }
}
</script>
