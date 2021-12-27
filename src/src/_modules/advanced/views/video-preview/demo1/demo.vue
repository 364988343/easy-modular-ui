<template>
  <em-panel page header title="视频预览" icon="detail"> <em-video-preview :src="src"></em-video-preview> </em-panel>
</template>
<script>
export default {
  data() {
    return {
      src: 'http://qiniu.90doordie.com/test1.mp4'
    }
  }
}
</script>
