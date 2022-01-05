<template>
  <div class="em-video" :style="style_">
    <video-player :ref="id" class="video-player vjs-custom-skin" :options="options" v-on="on"></video-player>
  </div>
</template>

<script>
export default {
  name: 'Video',
  data() {
    return {
      player: {},
      options: {
        autoplay: this.autoplay,
        playbackRates: this.playbackRates,
        muted: this.muted,
        loop: this.loop,
        preload: this.preload,
        language: this.language,
        aspectRatio: this.aspectRatio,
        fluid: this.fluid,
        poster: this.poster,
        notSupportedMessage: this.notSupportedMessage,
        controlBar: {
          timeDivider: this.timeDivider,
          durationDisplay: this.durationDisplay,
          remainingTimeDisplay: this.remainingTimeDisplay,
          fullscreenToggle: this.fullscreenToggle
        },
        sources: [
          {
            src: this.src,
            type: this.videoType
          }
        ]
      },
      on: {
        play: this.onPlayerPlay,
        pause: this.onPlayerPause,
        ended: this.onPlayerEnded,
        waiting: this.onPlayerWaiting,
        playing: this.onPlayerPlaying,
        loadeddata: this.onPlayerLoadeddata,
        timeupdate: this.onPlayerTimeupdate,
        canplay: this.onPlayerCanplay,
        canplaythrough: this.onPlayerCanplaythrough,
        statechanged: this.onPlayerStateChanged,
        ready: this.onPlayerReady
      }
    }
  },
  props: {
    //视频播放器ID
    id: {
      type: String,
      default: 'videoPlayer'
    },
    //视频路径
    src: {
      type: String,
      require: true
    },
    //宽度
    width: {
      type: String,
      default: '100%'
    },
    //高度
    height: {
      type: String,
      default: '100%'
    },
    //自动播放
    autoplay: {
      type: Boolean,
      default: true
    },
    //播放速度
    playbackRates: {
      type: Array,
      default: () => [0.5, 1.0, 1.5, 2.0]
    },
    // 是否静音
    muted: Boolean,
    //循环播放
    loop: Boolean,
    //自动预加载
    preload: Boolean,
    //语言('en', 'zh-cn', 'zh-tw')
    language: {
      type: String,
      default: 'zh-CN'
    },
    //宽高比例(16:9、4:3)
    aspectRatio: {
      type: String,
      default: '16:9'
    },
    //流体（当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器）
    fluid: {
      type: Boolean,
      default: true
    },
    //视频类型
    videoType: {
      type: String,
      default: 'video/mp4'
    },
    //封面
    poster: String,
    //播放失败提示
    notSupportedMessage: {
      type: String,
      default: '此视频暂无法播放，请稍后再试'
    },
    //是否显示当前时间和持续时间的分隔符，"/"
    timeDivider: {
      type: Boolean,
      default: false
    },
    //是否显示持续时间
    durationDisplay: {
      type: Boolean,
      default: true
    },
    //是否显示剩余时间
    remainingTimeDisplay: {
      type: Boolean,
      default: false
    },
    // 是否显示全屏按钮
    fullscreenToggle: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    style_() {
      return { width: this.width, height: this.height }
    }
  },
  watch: {
    src: {
      handler(n, o) {
        if (n != o) {
          this.options.sources[0].src = n
        }
      },
      immediate: true
    }
  },
  methods: {
    /**
     * @description:播放回调
     * @param {*} event
     */
    onPlayerPlay(e) {
      this.$emit('play', e)
    },

    /**
     * @description: 暂停回调
     * @param {*} event
     */
    onPlayerPause(e) {
      this.$emit('playerPause', e)
    },

    /**
     * @description: 视频播完回调
     * @param {*} event
     */
    onPlayerEnded(e) {
      this.$emit('playerEnded', e)
    },

    /**
     * @description: DOM元素上的readyState更改导致播放停止
     * @param {*} event
     */
    onPlayerWaiting(e) {
      this.$emit('playerWaiting', e)
    },

    /**
     * @description: 已开始播放回调
     * @param {*} event
     */
    onPlayerPlaying(e) {
      this.$emit('playerPlaying', e)
    },

    /**
     * @description: 当播放器在当前播放位置下载数据时触发
     * @param {*} event
     */
    onPlayerLoadeddata(e) {
      this.$emit('playerLoadeddata', e)
    },

    /**
     * @description: 当前播放位置发生变化时触发。
     * @param {*} event
     */
    onPlayerTimeupdate(e) {
      this.$emit('playerTimeupdate', e)
    },

    /**
     * @description: 媒体的readyState为HAVE_FUTURE_DATA或更高
     * @param {*} event
     */
    onPlayerCanplay(e) {
      this.$emit('playerCanplay', e)
    },

    /**
     * @description: 媒体的readyState为HAVE_ENOUGH_DATA或更高。这意味着可以在不缓冲的情况下播放整个媒体文件。
     * @param {*} event
     */
    onPlayerCanplaythrough(e) {
      this.$emit('playerCanplaythrough', e)
    },

    /**
     * @description:播放状态改变回调
     * @param {*} event
     */
    onPlayerStateChanged(e) {
      this.$emit('playerStateChanged', e)
    },

    /**
     * @description:视频就绪
     * @param {*}
     */
    onPlayerReady(player) {
      this.player = player
      this.$emit('playerReady', player)
    },

    /**
     * @description:停止
     * @param {*}
     */
    stop() {
      this.player.pause()
      this.player.currentTime(0)
    }
  }
}
</script>
