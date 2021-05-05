<template>
  <em-panel page>
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
        value: 51211.22,
        unit: '元',
        icon: 'money',
        more: true
      },
      panel1: {
        label: '微信转账',
        value: 900.34,
        unit: '元',
        icon: 'money',
        more: true,
        bgColor: 'warning'
      },
      panel2: {
        label: '支付宝转账',
        value: 562352.11,
        unit: '元',
        icon: 'money',
        bgColor: 'primary'
      },
      panel3: {
        label: '美团消费',
        value: 657.33,
        unit: '元',
        icon: 'money',
        bgColor: 'danger'
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
