<template>
   <em-panel page header title='时间范围选择示例' icon='detail'>
  <em-date-range-picker size="mini" :start.sync="model.startDate" :end.sync="model.endDate"  />
  </em-panel>
</template>
<script>
export default {
  data() {
    return {
      model: {
        startDate: '',
        endDate: ''
      }
    }
  }
}
</script>
<style></style>
