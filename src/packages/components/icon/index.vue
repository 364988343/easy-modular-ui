<template>
  <svg class="em-icon" :class="iconClass" aria-hidden="true">
    <use :xlink:href="`#icon-${this.name}`" />
  </svg>
</template>

<script>
export default {
  name: 'icon',
  props: {
    iconClass: String,
    name: String
  }
}
</script>