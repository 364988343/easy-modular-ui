<template>
  <em-panel-row style="height:400px">
    <em-panel-col :span="12">
      <em-form-page v-bind="form">
        <el-form-item label="城市：" prop="area">
          <em-select v-model="form.model.area" v-bind="select" />
        </el-form-item>
        <el-form-item label="城市：" prop="area1">
          <em-select v-model="form.model.area1" disabled v-bind="select" />
        </el-form-item>
      </em-form-page>
    </em-panel-col>
    <em-panel-col :span="12"></em-panel-col>
  </em-panel-row>
</template>
<script>
export default {
  data() {
    return {
      form: {
        title: '简单下拉列表',
        icon: 'list',
        model: {
          area: '',
          area1: ''
        },
        action: this.submit
      },
      select: {
        method: this.queryOptions
      }
    }
  },
  methods: {
    queryOptions() {
      return new Promise(resolve => {
        resolve([
          {
            label: '南京',
            value: 1
          },
          {
            label: '北京',
            value: 2
          },
          {
            label: '上海',
            value: 3,
            disabled: true
          }
        ])
      })
    },
    submit() {
      return new Promise(resolve => {
        resolve()
      })
    }
  }
}
</script>
