<template>
  <div class="em-page">
    <div class="em-page-title">开源不易，如果项目对您有所帮助，欢迎star和赞助！</div>
    <div class="em-page-subtitle">大龄单身落魄coder需要您的支持</div>
    <div class="em-page-pay"><img src="images/pay.jpg" /></div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.em-page {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  &-title {
    font-size: 32px;
    color: #303133;
    text-align: center;
    letter-spacing: 4px;
    margin: 20px auto;
  }
  &-subtitle {
    font-size: 20px;
    color: #606266;
    letter-spacing: 1px;
    text-align: center;
    margin: 18px auto;
    background: yellow;
  }
  &-pay {
    width: 800px;
    margin: 12px auto;
    display: flex;
    img {
      width: 100%;
    }
  }
}
</style>
