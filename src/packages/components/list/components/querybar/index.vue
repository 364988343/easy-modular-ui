<template>
  <!--查询栏-->
  <div class="em-list-querybar">
    <div class="em-list-querybar-content">
      <el-form ref="queryForm" class="em-list-querybar-content-form" :model="model" :rules="rules" :label-width="labelWidth" :size="fontSize" inline>
        <slot></slot>
        <template v-if="more">
          <slot name="query-more"> </slot>
        </template>
      </el-form>
    </div>
    <div class="em-list-querybar-btn">
      <slot name="buttons">
        <em-button v-if="!noSearch" type="primary" @click="query" icon="search" text="查询" />
        <em-button v-if="!noReset" type="info" @click="reset" icon="reload" text="重置" />
        <em-button v-if="!noCollapse" :text="more ? '收起' : '展开'" :icon="more ? 'up' : 'down'" icon-position="right" @click="more = !more"></em-button>
      </slot>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 是否显示更多
      more: false
    }
  },
  props: {
    //表单域标签的的宽度
    labelWidth: String,
    //查询模型
    model: {
      type: Object,
      default() {
        return {}
      }
    },
    //验证规则
    rules: {
      type: Object,
      default() {
        return {}
      }
    },
    //不需要查询
    noSearch: Boolean,
    //不显示查询按钮
    noReset: Boolean,
    //不显示折叠按钮
    noCollapse: Boolean
  },
  methods: {
    /**
     * @description:查询
     * @param {*}
     */
    query() {
      this.$parent.page.index = 1
      this.$parent.query()
    },

    /**
     * @description: 表单重置
     * @param {*}
     */
    reset() {
      if (this.$refs.queryForm) {
        this.$refs.queryForm.resetFields()
      }
      this.$emit('reset')
    },

    /**
     * @description: 校验
     * @param {*} action
     */
    validate(action) {
      return this.$refs.queryForm.validate(action)
    },

    /**
     * @description: 添加回车事件
     * @param {*}
     */
    addEnterEvent() {
      this.$refs.queryForm.$el.addEventListener('keydown', (e) => {
        if (e.keyCode === 13) {
          this.query()
        }
      })
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.addEnterEvent()
    })
  }
}
</script>
