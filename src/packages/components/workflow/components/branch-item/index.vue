<template>
  <div class="em-workflow-branch-item">
    <div v-if="index == 0" class="left-top cover-line" />
    <div v-if="index == 0" class="left-bottom cover-line" />
    <div v-if="index == total - 1" class="right-top cover-line" />
    <div v-if="index == total - 1" class="right-bottom cover-line" />

    <em-workflow-node-list :nodes="nodes" @add-node="onAddNode" @del-condition="onDelCondition"></em-workflow-node-list>
  </div>
</template>

<script>
import { resolveTree, addNewNode } from '../../process'
export default {
  name: 'branch-item',
  props: { node: Object, index: Number, total: Number },
  data() {
    return {
      nodes: []
    }
  },
  methods: {
    /**
     * @description: 初始化
     * @param {*}
     */
    init() {
      this.nodes = []
      resolveTree(this.node, this.nodes)
    },

    /**
     * @description: 添加节点
     * @param {*}
     */
    onAddNode(node) {
      addNewNode(this.node, this.nodes, node)
    },

    /**
     * @description: 删除条件
     * @param {*}
     */
    onDelCondition(condition) {
      this.$emit('del-condition', condition)
    }
  },
  mounted() {
    this.init()
  }
}
</script>
