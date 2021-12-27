<template>
  <div class="em-container">
    <em-main-header />
    <div class="em-main">
      <em-main-sidebar />
      <em-main-content />
    </div>
  </div>
</template>

<script>
import EmMainHeader from './components/header'
import EmMainContent from './components/content'
import EmMainSidebar from './components/sidebar'
export default {
  components: { EmMainHeader, EmMainContent, EmMainSidebar },
}
</script>

