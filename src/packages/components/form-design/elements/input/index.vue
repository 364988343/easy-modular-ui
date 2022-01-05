<template>
  <attributes :data="data">
  </attributes>
</template>

<script>
import attributes from '../attributes'
export default {
  name: 'el-input-attr',
  components: { attributes },
  props: { data: Object }
}
</script>
