<template>
  <em-panel v-bind="panel">
    <el-row>
      <em-button type="success" text="简单对话框" @click="dialog.visible = true" />
      <em-button type="primary" text="自定义高度" @click="dialog1.visible = true" />
      <em-button type="warning" text="可全屏" @click="dialog2.visible = true" />
      <em-button text="点击模态框关闭" @click="dialog3.visible = true" />
      <em-button text="可拖拽" @click="dialog4.visible = true" />
    </el-row>

    <em-dialog v-bind="dialog" :visible.sync="dialog.visible">
      <el-alert title="简单对话框" type="success"></el-alert>
      <el-alert title="简单对话框" type="success"></el-alert>
      <el-alert title="简单对话框" type="success"></el-alert>
      <el-alert title="简单对话框" type="success"></el-alert>
    </em-dialog>

    <em-dialog v-bind="dialog1" :visible.sync="dialog1.visible">
      <el-alert title="通过 height 属性可自定义高度，超出会有滚动条" type="success"></el-alert>
    </em-dialog>

    <em-dialog v-bind="dialog2" :visible.sync="dialog2.visible">
      <el-alert title="通过 fullscreen 属性可启用全屏功能" type="success"></el-alert>
    </em-dialog>

    <em-dialog v-bind="dialog3" :visible.sync="dialog3.visible">
      <el-alert title="通过 closeOnClickModal 属性可启用点击模态框关闭" type="success"></el-alert>
    </em-dialog>

    <em-dialog v-bind="dialog4" :visible.sync="dialog4.visible">
      <el-alert title="通过 draggable 属性可启用拖拽功能" type="success"></el-alert>
    </em-dialog>
  </em-panel>
</template>
<script>
export default {
  data() {
    return {
      panel: {
        title: '对话框-基础用法',
        page: true,
        header: true,
        icon: 'detail'
      },
      dialog: {
        title: '简单对话框',
        icon: 'tags',
        visible: false
      },
      dialog1: {
        title: '自定义高度',
        icon: 'tags',
        height: '500px',
        visible: false
      },
      dialog2: {
        title: '全屏功能',
        icon: 'tags',
        height: '500px',
        fullscreen: true,
        visible: false
      },
      dialog3: {
        title: '点击模态框关闭',
        icon: 'tags',
        height: '500px',
        fullscreen: true,
        closeOnClickModal: true,
        visible: false
      },
      dialog4: {
        title: '可拖拽',
        icon: 'tags',
        height: '500px',
        fullscreen: true,
        draggable: true,
        visible: false
      }
    }
  },
  created() {
    this.setTabName(this.panel.title)
  }
}
</script>
<style></style>
