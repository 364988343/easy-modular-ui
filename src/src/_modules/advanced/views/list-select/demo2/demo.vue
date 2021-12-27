<template>
   <em-panel page>
    <em-list-select ref="listSel" v-bind="listSel" @change="onChange">
      <template v-slot:querybar>
        <el-form-item label="账号：" prop="code">
          <el-input v-model="listSel.list.model.code" />
        </el-form-item>
        <el-form-item label="姓名：" prop="name">
          <el-input v-model="listSel.list.model.name" />
        </el-form-item>
      </template>
    </em-list-select>

    <h3>返回结果</h3>
    <el-input type="textarea" :rows="10" placeholder="列表选择器返回结果" v-model="result"> </el-input>
  </em-panel>
</template>
<script>
export default {
  data() {
    return {
      show: false,
      result: '',
      listSel: {
        title: '列表选择器-多选',
        btnText: '多选',
        multiple: true,
        list: {
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
              name: 'job',
              label: '职位'
            },
            {
              name: 'dept',
              label: '所属部门'
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
        }
      }
    }
  },
  methods: {
    query() {
      const rows = [
        { id: 1, code: 'zanmusi', name: '詹姆斯', job: '总监', dept: '系统开发部', phone: '13662970321', entryDate: '2021-1-8 12:22:10', createMan: '管理员' },
        { id: 2, code: 'weide', name: '韦德', job: '经理', dept: '人事行政', phone: '18762970231', entryDate: '2021-2-6 12:22:10', createMan: '管理员' },
        { id: 3, code: 'ouwen', name: '欧文', job: '主管', dept: '总裁办', phone: '19262970388', entryDate: '2021-3-1 12:22:10', createMan: '管理员' }
      ]
      return new Promise((resolve) => {
        resolve({
          rows,
          total: 3
        })
      })
    },
    onChange(rows) {
      this.result = JSON.stringify(rows)
    }
  }
}
</script>
