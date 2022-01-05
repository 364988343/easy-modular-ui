<template>
  <div class="em-container">
    <div class="em-container-title">开源不易，如果项目对您有所帮助，欢迎star和赞助！</div>
    <div class="em-container-subtitle">大龄单身落魄coder需要您的支持</div>
    <div class="em-container-pay"><img src="images/wxzf.jpg" /><img src="images/zfbzf.jpg" /></div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.em-container {
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
      width: 300px;
      margin-right: 20px;
    }
  }
}
</style>
