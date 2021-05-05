<template>
  <em-panel v-bind="panel">
    <template v-slot:title>
      <div>基本信息</div>
    </template>

    <div class="nm-pmr-home-admin-top-left-top nm-p-5">
      <div class="item">
        <em-panel-small
          label="我的待办"
          :value="model.enterpriseCount"
          unit="条"
          icon="dialog"
          more
          @more="$router.push({ name: 'powermonitor_enterprisemonitoring' })"
        />
      </div>
      <div class="item">
        <em-panel-small
          label="事件快报"
          :value="model.productLineCount"
          unit="条"
          icon="manual"
          bg-color="info"
        />
      </div>
      <div class="item">
        <em-panel-small
          label="消防演习"
          :value="model.dischargePortCount"
          unit="个"
          icon="verifycode"
          bg-color="warning"
        />
      </div>
      <div class="item">
        <em-panel-small
          label="危险作业"
          :value="model.monitorPolluteCount"
          unit="个"
          icon="warning"
          bg-color="danger"
        />
      </div>
      <div class="item">
        <em-panel-small
          label="车辆违规"
          :value="model.monitorDisposalCount"
          unit="辆"
          icon="car"
          bg-color="primary"
        />
      </div>
    </div>
  </em-panel>
</template>
<script>
export default {
  data() {
    return {
      model: {
        enterpriseCount: 33,
        productLineCount: 120,
        dischargePortCount: 200,
        monitorPolluteCount: 321,
        monitorDisposalCount: 433
      },
      panel: {
        icon: 'home',
        header: true,
        titleBold: true,
        padding: 5,
        refresh: true,
        refreshAction: this.query
      }
    }
  }
}
</script>
<style lang="scss">
.nm-pmr-home-admin-top-left-top {
  .item {
    padding-right: 7px;
    display: inline-block;
    width: 20%;
    box-sizing: border-box;
  }
}
</style>
