<template>
  <div :class="classes">
    <div class="em-split-trigger-bar-con">
      <i class="em-split-trigger-bar" v-once v-for="i in 8" :key="`trigger-${i}`"></i>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    mode: String
  },
  data() {
    return {
      initOffset: 0
    }
  },
  computed: {
    isVertical() {
      return this.mode === 'vertical'
    },
    classes() {
      return ['em-split-trigger', this.isVertical ? `em-split-trigger-vertical` : `em-split-trigger-horizontal`]
    }
  }
}
</script>
