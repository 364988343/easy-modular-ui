<template>
  <div class="em-workflow">
    <div class="em-workflow-header">
      <div class="em-workflow-header-title">
        <input ref="titleEdit" v-if="titleEdit" v-model="workflow.title" @blur="onCloseTitleEdit" @keydown.enter="onCloseTitleEdit" />
        <label v-else @click="onEditTitle">
          {{ workflow.title }}
          <em-icon v-if="!titleEdit" class="em-workflow-header-title-edit" name="edit" size="13px" @click="onEditTitle" />
        </label>
      </div>

      <div class="em-workflow-header-btn">
        <em-button type="danger" size="small" icon="search" text="预览" @click="onPreview"></em-button>
        <em-button type="primary" size="small" icon="edit" text="保存" @click="onSave"></em-button>
        <em-button type="info" size="small" icon="close" text="关闭" @click="closePage"></em-button>
      </div>
    </div>
    <div class="em-workflow-toolbar">
      <workflow-zoom @change="onZoom"></workflow-zoom>
    </div>
    <div ref="workflowDesign" class="em-workflow-design">
      <div class="em-workflow-design-content">
        <em-workflow-node-list :nodes="nodes" @add-node="onAddNode" @del-node="onDelNode" @set-node="onSetNode"></em-workflow-node-list>
        <workflow-node-end></workflow-node-end>
      </div>
    </div>

    <workflow-preview :workflow="workflow" :visible.sync="previewShow"></workflow-preview>
  </div>
</template>

<script>
import workflowZoom from './components/zoom'
import workflowNodeEnd from './components/node-end'
import workflowPreview from './components/preview'
import { resolveTree, updateTree, addNewNode, deleteNode } from './process'
import { v4 as uuidv4 } from 'uuid'
import page from '../../mixins/components/page'
export default {
  name: 'workflow',
  mixins:[page],
  components: { workflowZoom, workflowNodeEnd, workflowPreview },
  props: {
    //流程设计数据对象
    model: Object
  },
  data() {
    return {
      titleEdit: false,
      previewShow: false,
      nodes: [],
      workflow: {
        id: uuidv4().replaceAll('-', ''),
        title: '测试',
        node: {
          id: uuidv4().replaceAll('-', ''),
          name: '发起',
          type: 'start',
          preId: '0',
          childNode: {}
        }
      }
    }
  },
  methods: {
    /**
     * @description: 初始化
     * @param {*}
     */
    init() {
      if (this.model && Object.keys(this.model).length > 0) this.workflow = this.model
      this.nodes = []
      resolveTree(this.workflow.node, this.nodes)
    },

    /**
     * @description: 添加节点
     * @param {*}
     */
    onAddNode(node) {
      addNewNode(this.workflow.node, this.nodes, node)
    },

    /**
     * @description: 删除节点
     * @param {*}
     */
    onDelNode(node) {
      deleteNode(this.workflow.node, this.nodes, node)
    },

    /**
     * @description: 设置节点
     * @param {*}
     */
    onSetNode(node) {
      this.$emit('set-node', node)
    },

    /**
     * @description: 编辑标题
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
    },

    /**
     * @description:预览
     * @param {*}
     */
    onPreview() {
      this.updateTreeNode()
      this.previewShow = true
    },

    /**
     * @description:保存
     * @param {*}
     */
    onSave() {
      this.updateTreeNode()
      this.$emit('save', this.workflow)
    },

    /**
     * @description: 更新树节点
     * @param {*}
     */
    updateTreeNode() {
      this.nodes.forEach((m) => {
        updateTree(this.workflow.node, m)
      })
    },

    /**
     * @description: 缩小放大
     * @param {*} zoom
     */
    onZoom(zoom) {
      this.$refs.workflowDesign.style.transform = `scale(${zoom / 100})`
    }
  },
  watch: {
    model: {
      handler(n, o) {
        if (n) this.init()
      },
      immediate: true
    }
  },
  mounted() {
    this.init()
  }
}
</script>
