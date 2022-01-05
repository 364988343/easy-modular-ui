<template>
  <div class="em-workflow-condition-wrapper">
    <div class="em-workflow-condition">
      <div class="em-workflow-condition-header">
        <div class="em-workflow-condition-header-title">{{ node.name }}</div>
        <div class="em-workflow-condition-header-close" @click="onDelCondition">
          <em-icon name="close" size="12px"></em-icon>
        </div>
      </div>
      <div class="em-workflow-condition-content" @click="conditionSet">
        <div class="em-workflow-condition-content-txt">{{ node.desc || '设置条件' }}</div>
        <div class="em-workflow-condition-content-icon">
          <em-icon name="right" color="#c0c4cc"></em-icon>
        </div>
      </div>
    </div>

    <node-add-btn @add-node="onAddNode" :node="node"></node-add-btn>
  </div>
</template>

<script>
import nodeAddBtn from '../node-add-btn'
export default {
  components: { nodeAddBtn },
  props: { node: Object },
  methods: {
    /**
     * @description: 添加节点
     * @param {*} node
     */
    onAddNode(node) {
      this.$emit('add-node', node)
    },

    /**
     * @description: 删除条件
     * @param {*}
     */
    onDelCondition() {
      this.$emit('del-condition', this.node)
    },

    /**
     * @description: 条件设置
     * @param {*}
     */
    conditionSet() {
      this.$emit('condition-set', this.node)
    }
  }
}
</script>
