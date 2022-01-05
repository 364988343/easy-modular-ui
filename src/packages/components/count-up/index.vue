<template>
  <div class="em-count-up">
    <count-to :startVal="startVal" :endVal="endVal" :duration="duration"></count-to>
  </div>
</template>

<script>
import countTo from 'vue-count-to'
export default {
  name: 'count-up',
  components: { countTo },
  props: {
    //开始值(默认0)
    startVal: {
      type: Number,
      default: 0
    },
    //结束值
    endVal: {
      type: Number,
      require: true
    },
    //持续时间，以毫秒为单位(默认3000)
    duration: {
      type: Number,
      default: 3000
    }
  }
}
</script>
