<template>
  <attributes :data="data">
    <el-form-item label="数据源">
      <select-option v-for="(item, index) in data.children" :data="item" :index="index" :key="index" @delete="onDelOption"></select-option>
      <a class="select-option-add" @click="onAddOption">添加选项</a>
    </el-form-item>
  </attributes>
</template>

<script>
import attributes from '../attributes'
import selectOption from './option'
export default {
  name: 'el-radio-group-attr',
  components: { attributes, selectOption },
  props: { data: Object },
  methods: {
    /**
     * @description: 添加选项
     * @param {*}
     */
    onAddOption() {
      this.data.children.push({
        tag: 'el-radio',
        attributes: { lable: '' },
        children: ''
      })
    },

    /**
     * @description: 删除选项
     * @param {*}
     */
    onDelOption(index) {
      this.data.children.splice(index, 1)
    }
  }
}
</script>

<style lang="scss" scoped>
.select-option-add {
  font-size: 12px;
  color: #409eff;
  cursor: pointer;
}
</style>
