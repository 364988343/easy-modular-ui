<template>
  <em-list v-bind="list" v-on="on">
    <!--默认查询条件-->
    <template v-slot:querybar>
      <el-form-item label="账号：" prop="code">
        <el-input v-model="list.model.code" />
      </el-form-item>
      <el-form-item label="姓名：" prop="name">
        <el-input v-model="list.model.name" />
      </el-form-item>
      <el-form-item label="部门：" prop="dept">
        <el-input v-model="list.model.dept" />
      </el-form-item>
      <el-form-item label="手机号码：" prop="phone">
        <el-input v-model="list.model.phone" />
      </el-form-item>
    </template>

    <!--更多查询条件-->
    <template v-slot:querybar-more>
      <el-form-item label="创建人：" prop="createMan">
        <el-input v-model="list.model.createMan" />
      </el-form-item>
      <el-form-item label="职位：" prop="job">
        <el-input v-model="list.model.job" />
      </el-form-item>
    </template>

    <!--格式化字段-->
    <template v-slot:col-sex="{ row }">
      <el-tag v-if="row.sex === 0" type="success">男</el-tag>
      <el-tag v-else type="danger">女</el-tag>
    </template>

    <!--操作列-->
    <template v-slot:col-operation>
      <em-button type="text" text="编辑" icon="edit" />
      <em-button-delete type="text" :action="remove" id="1" @success="refresh" />
    </template>

    <!--操作栏-->
    <template v-slot:operatebar="{ total }">
      <em-button type="danger" icon="plus-circle" text="添加" @click="add(total)" />
      <em-button type="primary" icon="edit" text="编辑" @click="edit" />
    </template>
  </em-list>
</template>
<script>
export default {
  data() {
    return {
      currId: '',
      list: {
        title: '列表页-基础用法',
        icon: 'detail',
        action: this.query,
        removeAction: this.remove,
        model: {
          code: '',
          name: '',
          dept: '',
          job: '',
          phone: '',
          createMan: ''
        },
        cols: [
          {
            name: 'id',
            label: 'id',
            show: false
          },
          {
            name: 'code',
            label: '账号'
          },
          {
            name: 'name',
            label: '姓名'
          },
          {
            name: 'job',
            label: '职位'
          },
          {
            name: 'dept',
            label: '所属部门'
          },
          {
            name: 'sex',
            label: '性别'
          },
          {
            name: 'phone',
            label: '手机号码'
          },
          {
            name: 'entryDate',
            label: '入职时间',
            format: 'YYYY-MM-DD'
          },
          {
            name: 'createMan',
            label: '创建人'
          }
        ]
      },
      on: {
        'row-click': this.onRowClick
      }
    }
  },
  methods: {
    query() {
      const rows = [
        { id: 1, code: 'zanmusi', name: '詹姆斯', job: '总监', dept: '系统开发部', sex: 0, phone: '13662970321', entryDate: '2021-1-8 12:22:10', createMan: '管理员' },
        { id: 2, code: 'weide', name: '韦德', job: '经理', dept: '人事行政', sex: 0, phone: '18762970231', entryDate: '2021-2-6 12:22:10', createMan: '管理员' },
        { id: 3, code: 'ouwen', name: '欧文', job: '主管', dept: '总裁办', sex: 1, phone: '19262970388', entryDate: '2021-3-1 12:22:10', createMan: '管理员' }
      ]
      return new Promise((resolve) => {
        resolve({
          rows,
          total: 3
        })
      })
    },
    add(toatal) {
      this._success(`成功添加了${toatal}条数据`)
    },
    edit() {
      if (!this.currId) {
        this._error('请选择一行数据')
        return
      }

      this._success('编辑成功')
    },
    remove(id) {
      return new Promise((resolve) => {
        resolve(id)
      })
    },
    refresh() {
      this.$refs.list.refresh()
    },
    onRowClick(row) {
      this.currId = row.id
    }
  }
}
</script>
