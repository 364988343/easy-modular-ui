<template>
  <div class="em-admin-home">
    <home-header></home-header>
    <home-body></home-body>
  </div>
</template>
<script>
import homeHeader from './components/header'
import homeBody from './components/body'

export default {
  components: { homeHeader, homeBody },
  data() {
    return {
      task: null,
      minute: 10
    }
  }
}
</script>
<style lang="scss">
.em-admin-home {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 16px;
  box-sizing: border-box;
  overflow: auto;
}
</style>
