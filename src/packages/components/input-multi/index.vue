<template>
  <div class="input-mutil">
    <div class="input-item" v-for="(item, index) in value_" :key="index">
      <div class="input-item-l">
        <el-input v-model="value_[index]" :disabled="disabled" :size="size || fontSize"></el-input>
      </div>
      <div class="input-item-r" v-if="!disabled">
        <em-icon name="plus-circle" class="input-item-r-icon-add" size="26px" color="#2d8cf0" @click.native="add" />
        <em-icon name="minus-circle" size="26px" color="#ed4014" @click.native="remove(index)" />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'input-multi',
  data() {
    return {
      value_: ['']
    }
  },
  props: {
    //值
    value: Array,
    //是否禁用
    disabled: {
      type: Boolean,
      default: false
    },
    //尺寸
    size: String
  },
  watch: {
    value: {
      handler(n, o) {
        this.value_ = n.length === 0 ? [''] : n
        this.$emit('input', this.value_)
      }
    },
    immediate: true
  },
  methods: {
    /**
     * @description: 添加项目
     * @param {*}
     */
    add() {
      this.value_.push('')
      this.$emit('input', this.value_)
    },

    /**
     * @description: 移除项目
     * @param {*} index
     */
    remove(index) {
      this.value_.splice(index, 1)
      this.$emit('input', this.value_)
    }
  }
}
</script>
