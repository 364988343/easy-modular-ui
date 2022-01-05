<template>
  <div class="em-workflow-node-list">
    <div :class="['em-workflow-node-list-item', item.nodes ? 'branch-flex' : '']" v-for="item in nodes" :key="item.id">
      <workflow-node v-if="item.type === 'start' || item.type === 'approval'" :node="item" @add-node="onAddNode" @del-node="onDelNode" @set-node="onSetNode"></workflow-node>
      <workflow-condition v-if="item.type === 'condition'" :node="item" @add-node="onAddNode" @del-condition="onDelCondition" @condition-set="onConditionSet"></workflow-condition>
      <workflow-branch v-if="item.type === 'branch'" :node="item" @add-node="onAddNode" @del-node="onDelNode"></workflow-branch>
    </div>

    <workflow-condition-set :visible.sync="conditionSetShow" :node="curNode"></workflow-condition-set>
  </div>
</template>

<script>
import workflowNode from '../node'
import workflowNodeAddBtn from '../node-add-btn'
import workflowBranch from '../branch'
import workflowCondition from '../condition'
import workflowConditionSet from '../condition-set'
import { v4 as uuidv4 } from 'uuid'
export default {
  name: 'node-list',
  components: { workflowNode, workflowBranch, workflowCondition, workflowNodeAddBtn, workflowConditionSet },
  data() {
    return {
      curNode: {},
      conditionSetShow: false
    }
  },
  props: {
    nodes: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    /**
     * @description: 添加节点
     * @param {*} type
     * @param {*} curNode
     */
    onAddNode(node) {
      this.$emit('add-node', node)
    },

    /**
     * @description: 删除节点
     * @param {*}
     */
    onDelNode(node) {
      this.$emit('del-node', node)
    },

    /**
     * @description: 设置节点
     * @param {*}
     */
    onSetNode(node) {
      this.$emit('set-node', node)
    },

    /**
     * @description: 删除条件
     * @param {*}
     */
    onDelCondition(condition) {
      this.$emit('del-condition', condition)
    },

    /**
     * @description: 设置条件
     * @param {*}
     */
    onConditionSet(node) {
      this.curNode = node
      this.conditionSetShow = true
    }
  }
}
</script>

<style></style>
