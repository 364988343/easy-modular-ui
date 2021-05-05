<template>
  <em-flex :gutter="4" fix="50%">
    <template v-slot:top>
      <top />
    </template>
    <template v-slot:bottom>
      <bottom />
    </template>
  </em-flex>
</template>
<script>
import Top from './components/top'
import Bottom from './components/bottom'
export default {
  components: { Top, Bottom }
}
</script>
