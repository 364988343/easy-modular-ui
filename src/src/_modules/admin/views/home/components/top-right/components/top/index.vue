<template>
  <em-panel v-bind="panel">
    <template v-slot:toolbar-before>
      <el-button-group>
        <el-button size="mini" plain @click="btnClick(1)">今日</el-button>
        <el-button size="mini" plain @click="btnClick(2)">本周</el-button>
        <el-button size="mini" plain @click="btnClick(3)">本月</el-button>
        <el-button size="mini" plain @click="btnClick(4)">全年</el-button>
      </el-button-group>
    </template>
    <ve-pie :data="chartData" :extend="chartExtend" height="100%"></ve-pie>
  </em-panel>
</template>
<script>
export default {
  data() {
    return {
      panel: {
        title: '督察问题点类别占比-TOP5',
        icon: 'chart-pie',
        header: true,
        page: true,
        noPadding: true,
        titleBold: true
      },
      questionType: ['5s', '仓库安全', '公共区域管理', '化学品安全', '环境保护'],
      date: [],
      chartExtend: {
        legend: {
          orient: 'horizontal',
          bottom: '30',
          itemHeight: 10,
          itemWidth: 10,
          data: []
        },
        series: {
          radius: '60%',
          center: ['50%', '35%'],
          label: {
            show: false
          },
          labelLine: {
            show: false
          }
        }
      },
      chartData: {
        columns: ['问题类别', '次数'],
        rows: []
      }
    }
  },
  created() {
    this.getData()
    setTimeout(this.refresh, 1000)
  },
  methods: {
    getData() {
      this.chartExtend.legend.data = []
      this.chartData.rows = []
      for (let index = 0; index < 5; index++) {
        this.chartData.rows.push({ 问题类别: this.questionType[index], 次数: Math.floor(Math.random() * (10 - 100)) + 100 })
        this.chartExtend.legend.data.push({
          name: this.questionType[index],
          // 强制设置图形为圆。
          icon: 'circle'
        })
      }
    },
    refresh() {
      this.getData()
    }
  }
}
</script>
