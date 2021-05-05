<template>
  <em-panel ref="page" page header class="em-list-panel" :icon="icon">
    <template v-slot:header>
      <div class="em-panel-header-icon">
        <em-icon v-if="icon" :name="icon" />
      </div>
      <div class="em-panel-header-text">{{ title }}</div>
      <span v-if="!noCount" class="em-list-panel-count">已选 {{ value.length }} 个</span>
    </template>

    <ul v-if="value && value.length > 0" class="em-list-panel-list">
      <li class="em-list-panel-item" v-for="item in value_" :key="item.value" :title="item.label">
        <slot :item="item">
          <span class="em-list-panel-item-text">{{ item.label }}</span>
          <em-button class="em-list-panel-delete" circle type="danger" icon="delete" @click="remove(item.value)" />
        </slot>
      </li>
    </ul>
    <p v-else class="no-data">无</p>
  </em-panel>
</template>
<script>
export default {
  name: 'list-panel',
  data() {
    return {
      value_: this.value,
      resizeing: false
    }
  },
  props: {
    value: {
      type: Array,
      required: true
    },
    // 标题
    title: {
      type: String,
      default: '列表'
    },
    // 左侧图标
    icon: {
      type: String,
      default: 'select'
    },
    /** 不显示数量 */
    noCount: Boolean
  },
  methods: {
    remove(v) {
      this.value_.splice(
        this.value_.findIndex(item => item.value === v),
        1
      )
      this.$emit('input', this.value_)
      this.$emit('remove', v, this.value_)
    },
    scrollbarResize() {
      if (!this.resizeing) {
        this.resizeing = true
        setTimeout(() => {
          this.$nextTick(() => {
            this.$refs.page.scrollbarResize()
            this.resizeing = false
          })
        }, 300)
      }
    }
  },
  watch: {
    value(val) {
      this.value_ = val
      this.scrollbarResize()
    }
  }
}
</script>
