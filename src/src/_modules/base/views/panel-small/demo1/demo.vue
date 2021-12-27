<template>
  <em-panel page header title="小面板示例" icon="detail">
    <em-panel-row>
      <em-panel-col :span="6">
        <em-panel-small v-bind="panel" @more="onMore" />
      </em-panel-col>
      <em-panel-col :span="6">
        <em-panel-small v-bind="panel1" @more="onMore" />
      </em-panel-col>
      <em-panel-col :span="6">
        <em-panel-small v-bind="panel2" />
      </em-panel-col>
      <em-panel-col :span="6">
        <em-panel-small v-bind="panel3" />
      </em-panel-col>
    </em-panel-row>
  </em-panel>
</template>
<script>
export default {
  data() {
    return {
      panel: {
        label: '账户总览',
        value: 51211,
        unit: '元',
        icon: 'moneycollect',
        more: true
      },
      panel1: {
        label: '微信转账',
        value: 900,
        unit: '元',
        icon: 'car',
        more: true,
        type: 'primary'
      },
      panel2: {
        label: '支付宝转账',
        value: 562352,
        unit: '元',
        icon: 'flag',
        type: 'blue'
      },
      panel3: {
        label: '美团消费',
        value: 657,
        unit: '元',
        icon: 'fire-fill',
        type: 'danger'
      }
    }
  },
  methods: {
    onMore() {
      this._success('没有更多了~')
    }
  }
}
</script>
