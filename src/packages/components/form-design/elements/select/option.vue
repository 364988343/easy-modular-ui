<template>
  <div class="select-option">
    <div class="select-option-label">
      <el-input v-model="data.label" placeholder="label"></el-input>
    </div>
    <div class="select-option-value">
      <el-input v-model="data.value" placeholder="value"></el-input>
    </div>
    <div class="select-option-delete" @click="onDel">
      <em-icon name="minus-circle" size="26px" color="#F56C6C"></em-icon>
    </div>
  </div>
</template>

<script>
export default {
  props: { data: Object, index: Number },
  methods: {
    /**
     * @description: 删除
     * @param {*}
     */
    onDel() {
      this.$emit('delete', this.index)
    }
  }
}
</script>

<style lang="scss" scoped>
.select-option {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;

  &-label,
  &-value {
    flex: 1;
    margin-right: 12px;
  }

  &-delete {
    width: 30px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
}
</style>
