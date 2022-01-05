<template>
  <attributes :data="data">
    <el-form-item label="显示类型">
      <el-select v-model="data.attributes.type" placeholder="请选择">
        <el-option v-for="item in types" :key="item.value" :label="item.label" :value="item.value"> </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="数据格式">
      <el-input v-model="data.attributes.format"></el-input>
    </el-form-item>
  </attributes>
</template>

<script>
import attributes from '../attributes'
export default {
  name: 'el-date-picker-attr',
  components: { attributes },
  props: { data: Object },
  data() {
    return {
      types: [
        {
          value: 'year',
          label: 'year'
        },
        {
          value: 'month',
          label: 'month'
        },
        {
          value: 'date',
          label: 'date'
        },
        {
          value: 'dates',
          label: 'dates'
        },
        {
          value: 'week',
          label: 'week'
        },
        {
          value: 'datetime',
          label: 'datetime'
        },
        {
          value: 'datetimerange',
          label: 'datetimerange'
        },
        {
          value: 'daterange',
          label: 'daterange'
        },
        {
          value: 'monthrange',
          label: 'monthrange'
        }
      ]
    }
  }
}
</script>
