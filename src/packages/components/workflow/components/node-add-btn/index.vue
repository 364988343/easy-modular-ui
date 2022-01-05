<template>
  <div class="em-workflow-node-add-btn">
    <el-popover v-model="visible" placement="right-start" trigger="click">
      <div class="node-add-popover">
        <div class="node-add-popover-item" @click="onClick('approval')">
          <div class="node-add-popover-item-icon"><em-icon name="appstoreadd" size="32px" color="#ff943e" /></div>
          <div class="node-add-popover-item-txt">审批</div>
        </div>
        <div class="node-add-popover-item" @click="onClick('branch')">
          <div class="node-add-popover-item-icon"><em-icon name="cluster" size="32px" color="#3296fa" /></div>
          <div class="node-add-popover-item-txt">分支</div>
        </div>
      </div>
      <div slot="reference" class="node-add-btn">
        <em-icon name="plus" />
      </div>
    </el-popover>
  </div>
</template>

<script>
import { v4 as uuidv4 } from 'uuid'
export default {
  props: { node: Object },
  data() {
    return {
      visible: false
    }
  },
  methods: {
    /**
     * @description: 添加节点
     * @param {*} type
     */
    onClick(type) {
      const newNode = type === 'approval' ? this.createNewNode() : this.createNewBranch()
      this.$emit('add-node', newNode)
      this.visible = false
    },

    /**
     * @description: 创建新的审批节点
     * @param {*}
     */
    createNewNode() {
      return {
        id: uuidv4().replaceAll('-', ''),
        name: '审批',
        preNodeId: this.node.id,
        type: 'approval'
      }
    },

    /**
     * @description: 创建新的分支
     * @param {*}
     */
    createNewBranch() {
      const branchId = uuidv4().replaceAll('-', '')
      const branch = {
        id: branchId,
        name: '分支',
        preNodeId: this.node.id,
        type: 'branch',
        conditionNodes: [
          {
            id: uuidv4().replaceAll('-', ''),
            name: '条件1',
            type: 'condition',
            preId: branchId,
            params: []
          },
          {
            id: uuidv4().replaceAll('-', ''),
            name: '默认条件',
            type: 'condition',
            preId: branchId,
            params: []
          }
        ]
      }

      return branch
    }
  }
}
</script>

<style lang="scss" scoped>
.node-add-popover {
  width: 220px;
  height: 120px;
  display: flex;
  justify-content: center;

  &-item {
    flex: 1;
    height: 100%;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    &-icon {
      width: 70px;
      height: 70px;

      border: 1px solid #ebeef5;
      border-radius: 50%;

      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      &:hover {
        background: rgba(50, 150, 250, 0.1);
      }
    }

    &-txt {
      margin-top: 8px;
      font-size: 12px;
    }
  }
}
</style>
