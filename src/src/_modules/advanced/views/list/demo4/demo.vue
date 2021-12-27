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
    </template>

    <!--格式化字段-->
    <template v-slot:col-sex="{ row }">
      <el-tag v-if="row.sex === 0" type="success">男</el-tag>
      <el-tag v-else type="danger">女</el-tag>
    </template>
  </em-list>
</template>
<script>
export default {
  data() {
    return {
      currId: '',
      list: {
        title: '列表页-复杂表头',
        icon: 'detail',
        noOperateCol: true,
        noOperateBar: true,
        action: this.query,
        model: {
          code: '',
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
            label: '账号'
          },
          {
            name: 'name',
            label: '姓名'
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
            label: '地址',
            children: [
              {
                name: 'province',
                label: '省份'
              },
              {
                name: 'city',
                label: '城市'
              },
              {
                name: 'address',
                label: '地址'
              }
            ]
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
        { id: 1, code: 'zanmusi', name: '詹姆斯', sex: 0, phone: '13662970321', province: '广东', city: '佛山市', address: '广东省佛山市禅城区工业路102' },
        { id: 2, code: 'weide', name: '韦德', sex: 0, phone: '18762970231', province: '湖南', city: '长沙市', address: '湖南省长沙市工业路108' },
        { id: 3, code: 'ouwen', name: '欧文', sex: 1, phone: '19262970388', province: '黑龙江', city: '哈尔滨市', address: '黑龙江哈尔滨市工业路1204' }
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
