<template>
  <em-panel page no-padding>
    <em-form-design :model="design" @save="onSave"></em-form-design>
  </em-panel>
</template>
<script>
export default {
  data() {
    return {
      design: {}
    }
  },
  methods: {
    /**
     * @description:保存
     * @param {*}
     */
    onSave(model) {
      this._success('保存成功')
    }
  }
}
</script>
