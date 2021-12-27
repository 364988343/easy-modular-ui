<template>
  <em-panel v-bind="panel">
    <el-row>
      <em-button @click="drawer1 = true">简单抽屉</em-button>
      <em-button @click="drawer2 = true">左侧抽屉</em-button>
      <em-button @click="drawer3 = true">在附加到body</em-button>
      <em-button @click="drawer4 = true">可拖拽</em-button>
    </el-row>

    <em-drawer header title="简单抽屉" :visible.sync="drawer1">简单抽屉</em-drawer>
    <em-drawer header title="左侧抽屉" placement="left" :visible.sync="drawer2"></em-drawer>
    <em-drawer header title="在附加到body" append-to-body :visible.sync="drawer3"></em-drawer>
    <em-drawer header title="可拖拽" draggable :visible.sync="drawer4"></em-drawer>
  </em-panel>
</template>
<script>
export default {
  data() {
    return {
      panel: {
        title: '抽屉-基础用法',
        page: true,
        header: true,
        icon: 'detail'
      },
      drawer1: false,
      drawer2: false,
      drawer3: false,
      drawer4: false
    }
  },
  created() {
    this.setTabName(this.panel.title)
  }
}
</script>
