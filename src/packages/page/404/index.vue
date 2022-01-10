<template>
  <div class="em-page">
    <div class="em-page-content">
      <div class="em-page-content-img"><img src="images/404.png" /></div>
      <div class="em-page-content-title">抱歉，您访问的页面出错了</div>
      <div class="em-page-content-subtitle">该网页不存在或正在努力开发中.....</div>
      <router-link class="em-page-content-btn" :to="{ path: '/home' }">返回主页</router-link>
    </div>
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
  &-content {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-top: -50px;
    &-img {
      width: 600px;
      margin: 10px auto;
    }
    &-title {
      font-size: 32px;
      color: #303133;
      text-align: center;
      letter-spacing: 4px;
      margin-top: -30px;
    }
    &-subtitle {
      font-size: 16px;
      color: #606266;
      letter-spacing: 1px;
      text-align: center;
      margin: 18px auto;
    }
    &-btn {
      display: inline-block;
      margin: 10px auto;
      width: 240px;
      height: 56px;
      line-height: 56px;
      text-align: center;
      border-radius: 4px;
      background: #7caced;
      color: #fff;
      letter-spacing: 4px;
      font-size: 18px;
      text-decoration: none;

      transition: all 0.3s;

      &:hover {
        background: #5187d3;
      }
    }
  }
}
</style>
