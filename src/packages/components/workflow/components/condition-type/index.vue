<template>
  <div class="workflow-condition-type">
    <el-select v-model="value_" placeholder="请选择" @change="onChange">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
    </el-select>
  </div>
</template>

<script>
import { conditionTypes } from '../../process'
export default {
  props: { value: String },
  data() {
    return {
      value_: '',
      options: conditionTypes
    }
  },
  watch: {
    value: {
      handler(n, o) {
        if (n != o) this.value_ = n
      },
      immediate: true
    }
  },
  methods: {
    onChange(val) {
      this.$emit('input', val)
    }
  }
}
</script>
