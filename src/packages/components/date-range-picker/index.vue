<template>
  <el-date-picker v-model="value" v-bind="options" @change="onChange" />
</template>
<script>
export default {
  name: 'date-range-picker',
  data() {
    return {
      value: []
    }
  },
  props: {
    //日期格式化
    format: {
      type: String,
      default: 'yyyy-MM-dd'
    },
    //开始日期，默认当前月1号
    start: [String, Date],
    //结束日期，默认今日
    end: [String, Date],
    //尺寸
    size: String,
    //可清空的
    clearable: Boolean
  },
  computed: {
    options() {
      return {
        size: this.size || this.fontSize,
        type: 'daterange',
        rangeSeparator: '至',
        startPlaceholder: '开始日期',
        endPlaceholder: '结束日期',
        valueFormat: this.format,
        clearable: this.clearable
      }
    }
  },
  methods: {
    onChange(val) {
      if (!val || val.length < 2) {
        var date = new Date()
        this.value = [date, date]
      }
      this.$emit('update:start', val[0])
      this.$emit('update:end', val[1])
      this.$emit('change', val)
    }
  },
  watch: {
    start: {
      immediate: true,
      handler(newVal) {
        if (newVal && this.end) this.value = [newVal, this.end]
        else this.value = ''
      }
    },
    end: {
      immediate: true,
      handler(newVal) {
        if (newVal && this.start) this.value = [this.start, newVal]
        else this.value = ''
      }
    }
  }
}
</script>
