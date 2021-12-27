<template>
  <em-panel page no-padding>
    <em-workflow :model="workflow" @save="onSave" @set-node="onSetNode"></em-workflow>
    <node-set :visible.sync="nodeSetShow" :node="curNode"></node-set>
  </em-panel>
</template>
<script>
import nodeSet from './components/node-set'
export default {
  components: { nodeSet },
  data() {
    return {
      nodeSetShow: false,
      workflow: {},
      curNode: {}
    }
  },
  methods: {
    /**
     * @description: 保存
     * @param {*}
     */
    onSave(data) {
      //TODO
      this._success('保存成功')
    },

    /**
     * @description: 设置节点
     * @param {*}
     */
    onSetNode(node) {
      this.curNode = node
      this.nodeSetShow = true
    }
  }
}
</script>
