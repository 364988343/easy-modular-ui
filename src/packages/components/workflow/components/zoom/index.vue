<template>
  <div class="em-workflow-zoom">
    <div class="em-workflow-zoom-l" @click="onMinus">
      <em-icon name="minus"></em-icon>
    </div>
    <div class="em-workflow-zoom-c">{{ zoom }}%</div>
    <div class="em-workflow-zoom-r" @click="onAdd">
      <em-icon name="plus"></em-icon>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      zoom: 100,
      skip: 10
    }
  },
  methods: {
    /**
     * @description: 递减
     * @param {*}
     */
    onMinus() {
      this.zoom = this.zoom - this.skip
      this.$emit('change', this.zoom)
    },

    /**
     * @description: 递增
     * @param {*}
     */
    onAdd() {
      this.zoom = this.zoom + this.skip
      this.$emit('change', this.zoom)
    }
  }
}
</script>
