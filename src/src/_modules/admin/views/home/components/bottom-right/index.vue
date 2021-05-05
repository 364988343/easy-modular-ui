<template>
  <em-panel v-bind="panel">
    <template v-slot:toolbar-before>
      <el-button size="mini" plain>更多</el-button>
    </template>
    <el-table
      :data="tableData2"
      style="width: 100%"
      row-class-name="success-row"
      :show-header="false"
      stripe
    >
      <el-table-column prop="date" label="日期" width="120" align="center">
        <template slot-scope="scope">
          <el-tag>{{scope.row.date}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="标题">
        <template slot-scope="scope">
          <span style="color: #2969ab">{{scope.row.name}}</span>
        </template>
      </el-table-column>
    </el-table>
  </em-panel>
</template>
<script>
export default {
  data() {
    return {
      panel: {
        title: '公司新闻',
        icon: 'chart-pie',
        header: true,
        page: true,
        noPadding: true,
        titleBold: true
      },
      tableData2: [
        {
          date: '2020-11-02',
          name: '五一假期首日，银联网络交易金额达3987亿元'
        },
        {
          date: '2020-10-04',
          name: '不满16岁！她刷新女子200米混合泳世界青年纪录'
        },
        {
          date: '2020-10-01',
          name: '张艺谋：我心中的谍战片一定要特别酷'
        },
        {
          date: '2020-09-03',
          name: '英雄团长”祁发宝再次公开亮相，头上伤痕明显'
        },
        {
          date: '2020-08-03',
          name: '比除掉本·拉登更难的事一直摆在美国人面前'
        }
      ]
    }
  },
  methods: {},
  created() {}
}
</script>

<style>
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}
</style>
