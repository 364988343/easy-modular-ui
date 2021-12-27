<template>
  <em-panel page header title="多文本框" icon="edit">
    <em-input-multi v-model="area" :disabled="false"></em-input-multi>
  </em-panel>
</template>
<script>
export default {
  data() {
    return {
      area: []
    }
  }
}
</script>
