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
        title: '列表页-懒加载',
        icon: 'detail',
        lazy: true,
        load: this.load,
        action: this.query,
        noOperateCol: true,
        noOperateBar: true,
        rowKey: 'id',
        treeProps: { children: 'children', hasChildren: 'hasChildren' },
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
        {
          id: 2,
          code: 'weide',
          name: '韦德',
          phone: '18762970231',
          entryDate: '2021-1-8 10:33',
          hasChildren: true
        },
        { id: 3, code: 'ouwen', name: '欧文', phone: '13662970321', entryDate: '2021-1-8' }
      ]
      return new Promise((resolve) => {
        resolve({
          rows,
          total: 6
        })
      })
    },
    load(tree, treeNode, resolve) {
      setTimeout(() => {
        resolve([
          { id: 4, code: 'weide1', name: '韦德1', phone: '13662970321', entryDate: '2021-1-8 12:22:10' },
          { id: 5, code: 'weide2', name: '韦德2', phone: '13662970321', entryDate: '2021-1-8 12:22:10' },
          { id: 6, code: 'weide3', name: '韦德3', phone: '13662970321', entryDate: '2021-1-8 12:22:10' }
        ])
      }, 1000)
    }
  }
}
</script>
