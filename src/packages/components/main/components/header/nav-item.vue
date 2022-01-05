<template>
  <div :class="['em-main-header-nav-item', active ? 'active' : '']" @click="onClick">
    <div class="em-main-header-nav-item-icon"><em-icon class="em-main-header-nav-item-icon" :name="data.icon" :style="{ color: data.iconColor }" /></div>
    <div class="em-main-header-nav-item-text">{{ data.name }}</div>
  </div>
</template>

<script>
export default {
  props: { data: Object, active: Boolean },
  data() {
    return {}
  },
  methods: {
    onClick() {
      this.$emit('click', this.data)
    }
  }
}
</script>
