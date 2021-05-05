<template>
  <em-container scrollbar>
    <div class="em-pmr-home">
      <em-panel-row height="65%">
        <em-panel-col :span="15">
          <top-left />
        </em-panel-col>
        <em-panel-col :span="9">
          <top-right />
        </em-panel-col>
      </em-panel-row>
      <em-panel-row height="35%" class="em-m-b-0">
        <em-panel-col :span="15">
          <bottom-left />
        </em-panel-col>
        <em-panel-col :span="9">
          <bottom-right />
        </em-panel-col>
      </em-panel-row>
    </div>
  </em-container>
</template>
<script>
import TopLeft from './components/top-left'
import TopRight from './components/top-right'
import BottomLeft from './components/bottom-left'
import BottomRight from './components/bottom-right'
export default {
  components: {
    TopLeft,
    TopRight,
    BottomLeft,
    BottomRight
  },
  data() {
    return {
      task: null,
      minute: 10
    }
  }
}
</script>
<style lang="scss">
.em-pmr-home {
  height: 100%;
  min-height: 800px;

  .em-pmr-home-card {
    height: 60px;
    line-height: 60px;
    span {
      font-size: 25px;
      font-weight: 600;
    }
  }
}
</style>
