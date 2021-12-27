<template>
  <em-panel page header title="数字滚动示例" icon="detail">
    <div class="count-up"><em-count-up :endVal="value"></em-count-up></div>
  </em-panel>
</template>
<script>
export default {
  data() {
    return {
      value: 465
    }
  }
}
</script>

<style lang="scss" scoped>
.count-up {
  width: 500px;
  height: 200px;
  line-height: 200px;
  text-align: center;
  font-size: 50px;
  border: 1px solid #ccc;
  margin: 30px auto;
}
</style>
