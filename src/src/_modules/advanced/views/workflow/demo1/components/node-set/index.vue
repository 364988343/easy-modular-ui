<template>
  <em-drawer class="em-workflow-node-set" v-bind="drawer" :visible.sync="visible_">
    <el-tabs v-model="activeName" stretch>
      <el-tab-pane label="审批人设置" name="approval">
        <el-row>
          <el-input v-model="node.name"></el-input>
        </el-row>
        <el-row>
          <el-radio-group v-model="approval.type" @change="onTypeChange">
            <el-radio :label="-1" v-if="node.type === 'start'">所有人</el-radio>
            <el-radio :label="0">指定成员</el-radio>
            <el-radio :label="1">指定部门负责人</el-radio>
            <el-radio :label="2">指定角色</el-radio>
            <el-radio :label="3">指定标签</el-radio>
            <el-radio :label="4">申请人本人</el-radio>
            <el-radio :label="5">申请人自选</el-radio>
          </el-radio-group>
        </el-row>
        <el-divider></el-divider>

        <div v-if="typeName" class="em-workflow-node-set-title">{{ typeName }}</div>
        <user-set v-if="approval.type === 0 || approval.type === 5"></user-set>

        <el-divider></el-divider>
        <div class="em-workflow-node-set-title">审批方式</div>
        <div class="em-workflow-node-set-approval-mode">
          <el-radio-group v-model="approval.mode">
            <el-radio :label="0">会签</el-radio>
            <el-radio :label="1">或签</el-radio>
          </el-radio-group>
        </div>

        <el-divider></el-divider>
        <div class="em-workflow-node-set-title">消息通知</div>
        <div class="em-workflow-node-set-approval-notice">
          <el-checkbox-group v-model="approval.notice">
            <el-checkbox :label="0">企业微信</el-checkbox>
            <el-checkbox :label="1">邮件</el-checkbox>
            <el-checkbox :label="2">短信</el-checkbox>
          </el-checkbox-group>
        </div>
      </el-tab-pane>
      <el-tab-pane label="权限设置" name="power">
        <power-set :approval="approval" :type="node.type"></power-set>
      </el-tab-pane>
    </el-tabs>
    <template v-slot:footer>
      <em-button type="success" size="small" @click="onConfirm">确定</em-button>
      <em-button type="info" size="small" @click="visible_ = false">关闭</em-button>
    </template>
  </em-drawer>
</template>

<script>
import visible from '@packages/mixins/components/visible'
import userSet from '../user-set'
import powerSet from '../power-set'
export default {
  mixins: [visible],
  props: { node: Object },
  components: { userSet, powerSet },
  data() {
    return {
      activeName: 'approval',
      typeName: '添加成员',
      drawer: {
        header: false,
        footer: true,
        draggable: true,
        width: '600px'
      },
      approval: {
        type: 0,
        mode: 0,
        notice: [],
        power: [0, 1, 2, 3, 4]
      }
    }
  },
  methods: {
    /**
     * @description: 初始化
     * @param {*}
     */
    init() {},

    /**
     * @description: 确认
     * @param {*}
     */
    onConfirm() {
      //TODO
      this._success('保存成功')
      this.hide()
    },

    /**
     * @description: 审批人类别变化触发事件
     * @param {*}
     */
    onTypeChange(val) {
      switch (val) {
        case -1:
          this.typeName = ''
          break
        case 0:
          this.typeName = '添加成员'
          break
        case 1:
          this.typeName = '添加部门负责人'
          break
        case 2:
          this.typeName = '添加角色'
          break
        case 3:
          this.typeName = '添加标签'
          break
        case 4:
          this.typeName = ''
          break
        case 5:
          this.typeName = '自选'
          break
      }
    }
  },
  created() {
    this.init()
  }
}
</script>
<style lang="scss">
.em-workflow-node-set {
  &-title {
    font-size: 14px;
    color: #333;
    margin-right: 6px;
    font-weight: 700;
  }

  &-approval-mode,
  &-approval-notice {
    margin-top: 20px;
  }
  .el-row {
    margin-bottom: 20px;
  }
  .el-radio {
    margin-bottom: 20px;
    min-width: 120px;
  }
  .el-tabs__content {
    padding: 20px;
  }
}
</style>
