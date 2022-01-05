<template>
  <attributes :data="data">
  </attributes>
</template>

<script>
import attributes from '../attributes'
export default {
  name: 'em-icon-picker-attr',
  components: { attributes },
  props: { data: Object }
}
</script>
