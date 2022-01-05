<template>
  <div class="em-workflow-node-wrapper">
    <div :class="['em-workflow-node', node.type === 'start' ? 'start' : '']">
      <div class="em-workflow-node-header">
        <div class="em-workflow-node-header-title" @click="onEditTitle">
          <em-icon :name="node.type === 'start' ? 'notification' : 'user'" />
          <input ref="titleEdit" v-if="titleEdit" v-model="node.name" @blur="onCloseTitleEdit" @keydown.enter="onCloseTitleEdit" />
          <label v-else> {{ node.name }}</label>

          <em-icon v-if="!titleEdit" class="em-workflow-node-header-title-edit" name="edit" size="13px" />
        </div>
        <div class="em-workflow-node-header-close" @click="onDelNode" v-if="node.type !== 'start'">
          <em-icon name="close" size="12px"></em-icon>
        </div>
      </div>
      <div class="em-workflow-node-content" @click="onSetNode">
        <div class="em-workflow-node-content-desc">{{ desc }}</div>
        <div class="em-workflow-node-content-icon">
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
  name: 'node',
  components: { nodeAddBtn },
  props: { node: Object },
  data() {
    return {
      titleEdit: false
    }
  },
  computed: {
    desc() {
      return this.node.desc ? this.node.desc : this.node.type === 'start' ? '设置发起人' : '设置审批人'
    }
  },
  methods: {
    /**
     * @description: 添加节点
     * @param {*} node
     */
    onAddNode(node) {
      this.$emit('add-node', node)
    },

    /**
     * @description: 设置节点
     * @param {*}
     */
    onSetNode() {
      this.$emit('set-node', this.node)
    },

    /**
     * @description: 删除节点
     * @param {*}
     */
    onDelNode() {
      this.$emit('del-node', this.node)
    },

    /**
     * @description: 编辑节点标题
     * @param {*}
     */
    onEditTitle() {
      this.titleEdit = true
      this.$nextTick(function () {
        this.$refs.titleEdit.focus()
      })
    },

    /**
     * @description:关闭标题编辑
     * @param {*}
     */
    onCloseTitleEdit() {
      this.titleEdit = false
    }
  }
}
</script>
