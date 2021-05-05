<template>
  <em-panel v-bind="panel">
    <template v-slot:toolbar-before>
      <el-button size="mini" plain>更多</el-button>
    </template>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="col1" label="车票号码" width="120" align="center"></el-table-column>
      <el-table-column prop="col2" label="违规类型" width="120" align="center"></el-table-column>
      <el-table-column prop="col3" label="累计违规次数" align="center">
        <template slot-scope="scope">
          <el-tag type="danger">{{scope.row.col3}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="col4" label="违规时间" align="center"></el-table-column>
    </el-table>
  </em-panel>
</template>
  <script>
export default {
  data() {
    return {
      panel: {
        title: '违规车辆',
        icon: 'chart-bar',
        header: true,
        page: true,
        noPadding: true,
        titleBold: true
      },
      tableData: [
        {
          col1: '粤XUP637',
          col2: '违规停放',
          col3: 3,
          col4: '2020-11-20'
        },
        {
          col1: '浙A7WF58',
          col2: '违规停放',
          col3: 10,
          col4: '2020-11-19'
        },
        {
          col1: '粤E689JH',
          col2: '违规停放',
          col3: 3,
          col4: '2020-11-15'
        },
        {
          col1: '粤XHS155',
          col2: '违规停放',
          col3: 3,
          col4: '2020-11-01'
        }
      ]
    }
  }
}
</script>