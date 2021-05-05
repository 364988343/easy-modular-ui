<template>
  <em-panel v-bind="panel">
    <template v-slot:toolbar-before>
      <el-button-group>
        <el-button size="mini" plain @click="btnClick(1)">今日</el-button>
        <el-button size="mini" plain @click="btnClick(2)">本周</el-button>
        <el-button size="mini" plain @click="btnClick(3)">本月</el-button>
        <el-button size="mini" plain @click="btnClick(4)">全年</el-button>
      </el-button-group>&nbsp;&nbsp;
      <el-date-picker
        size="mini"
        v-model="date"
        valueFormat="yyyy-MM-dd"
        style="width: 221px !important;"
        type="daterange"
        range-separator="-"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      ></el-date-picker>
    </template>
    <ve-histogram :data="chartData" :extend="chartExtend" height="100%"></ve-histogram>
  </em-panel>
</template>
<script>
export default {
  data() {
    return {
      panel: {
        title: '事件快报',
        icon: 'chart-bar',
        header: true,
        page: true,
        noPadding: true,
        titleBold: true
      },
      date: [],
      chartData: {
        columns: ['省份', '快报数'],
        rows: []
      },
      chartExtend: {
        legend: {
          show: false
        },
        grid: {
          bottom: 30
        },
        color: ['#e6a23c']
      }
    }
  },
  created() {
    this.getData()
    setTimeout(this.refresh, 1000)
  },
  methods: {
    getData() {
      this.chartData.rows = []
      this.chartData.rows.push({ 省份: '广东', 快报数: 100 })
      this.chartData.rows.push({ 省份: '广西', 快报数: 110 })
      this.chartData.rows.push({ 省份: '福建', 快报数: 200 })
      this.chartData.rows.push({ 省份: '江西', 快报数: 130 })
      this.chartData.rows.push({ 省份: '云南', 快报数: 300 })
      this.chartData.rows.push({ 省份: '浙江', 快报数: 90 })
      this.chartData.rows.push({ 省份: '江苏', 快报数: 220 })
      this.chartData.rows.push({ 省份: '湖南', 快报数: 160 })
      this.chartData.rows.push({ 省份: '湖北', 快报数: 70 })
      this.chartData.rows.push({ 省份: '安徽', 快报数: 320 })
      this.chartData.rows.push({ 省份: '河北', 快报数: 190 })
      this.chartData.rows.push({ 省份: '河南', 快报数: 50 })
      this.chartData.rows.push({ 省份: '其它', 快报数: 230 })
    },
    refresh() {
      this.getData()
    },
    btnClick(type) {
      this.date = []
      let day = this.$dayjs()
      let weekNumber = parseInt(this.$dayjs().format('d'))
      let firstDay = ''
      let lastDay = ''
      switch (type) {
        case 1: // 今日
          firstDay = day
          lastDay = day
          break
        case 2: // 本周
          if (weekNumber > 0) {
            firstDay = this.$dayjs().add(1 - weekNumber, 'day')
            lastDay = this.$dayjs().add(7 - weekNumber, 'day')
          } else {
            firstDay = this.$dayjs().add(-6, 'day')
            lastDay = this.$dayjs()
          }
          break
        case 3: // 本月
          firstDay = this.$dayjs().startOf('month')
          lastDay = this.$dayjs().endOf('month')

          break
        case 4: // 全年
          firstDay = this.$dayjs().startOf('year')
          lastDay = this.$dayjs().endOf('year')
          break
      }
      this.date.push(this.$dayjs(firstDay).format('YYYY-MM-DD'))
      this.date.push(this.$dayjs(lastDay).format('YYYY-MM-DD'))
    }
  }
}
</script>
<style lang="scss">
.date-toolbar {
  padding-right: 10px;
}
</style>
