<template>
  <em-panel page header title="视频示例" icon="video"> <em-video v-bind="video"></em-video> </em-panel>
</template>
<script>
export default {
  data() {
    return {
      video: {
        src: 'http://qiniu.90doordie.com/test1.mp4',
        width: '500px',
        height: '500px'
      }
    }
  }
}
</script>
