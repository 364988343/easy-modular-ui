<template>
  <div class="em-workflow-branch-wrapper">
    <div class="em-workflow-branch">
      <div ref="branchList" class="em-workflow-branch-list">
        <branch-item v-for="(item, index) in node.conditionNodes" :node="item" :key="item.id" :index="index" :total="node.conditionNodes.length" @del-condition="onDelCondition"></branch-item>
      </div>
      <div class="em-workflow-branch-add-btn" @click="onAddCondition">添加条件</div>
    </div>

    <node-add-btn @add-node="onAddNode" :node="node"></node-add-btn>
  </div>
</template>

<script>
import branchItem from '../branch-item'
import nodeAddBtn from '../node-add-btn'
import { v4 as uuidv4 } from 'uuid'
export default {
  name: 'branch',
  props: { node: Object },
  components: { branchItem, nodeAddBtn },
  methods: {
    /**
     * @description: 添加节点
     * @param {*} type
     */
    onAddNode(node) {
      this.$emit('add-node', node)
    },
    /**
     * @description:添加条件
     * @param {*}
     */
    onAddCondition() {
      const index = this.node.conditionNodes.length
      const condition = { id: uuidv4().replaceAll('-', ''), name: `条件${index}`, type: 'condition', preId: this.node.id, condition: {}, nodes: [] }
      this.node.conditionNodes.splice(index - 1, 0, condition)
    },

    /**
     * @description: 删除条件
     * @param {*}
     */
    onDelCondition(condition) {
      const index = this.node.conditionNodes.findIndex((m) => m.id === condition.id)
      if (index >= 0) this.node.conditionNodes.splice(index, 1)
      //条件个数小于2则删除该节点
      if (this.node.conditionNodes.length < 2) this.$emit('del-node', this.node)
    }
  }
}
</script>
