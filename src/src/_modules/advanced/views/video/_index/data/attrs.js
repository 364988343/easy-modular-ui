export default [
  {
    name: 'id',
    desc: '视频播放器ID',
    type: 'String',
    opt: '-',
    def: 'videoPlayer'
  },
  {
    name: 'src',
    desc: '视频路径',
    type: 'String',
    opt: '-',
    def: '-'
  },
  {
    name: 'width',
    desc: '视频宽度',
    type: 'String',
    opt: '-',
    def: '100%'
  },
  {
    name: 'height',
    desc: '视频高度',
    type: 'String',
    opt: '-',
    def: '100%'
  },
  {
    name: 'autoplay',
    desc: '自动播放',
    type: 'Boolean',
    opt: '-',
    def: 'true'
  },
  {
    name: 'playbackRates',
    desc: '播放速度',
    type: 'Array',
    opt: '-',
    def: '0.5, 1.0, 1.5, 2.0'
  },
  {
    name: 'muted',
    desc: '是否静音',
    type: 'Boolean',
    opt: '-',
    def: 'false'
  },
  {
    name: 'loop',
    desc: '循环播放',
    type: 'Boolean',
    opt: '-',
    def: 'false'
  },
  {
    name: 'preload',
    desc: '自动预加载',
    type: 'Boolean',
    opt: '-',
    def: '-'
  },
  {
    name: 'language',
    desc: '语言',
    type: 'String',
    opt: 'en, zh-cn, zh-tw',
    def: 'zh-CN'
  },
  {
    name: 'aspectRatio',
    desc: '宽高比例',
    type: 'String',
    opt: '-',
    def: '16:9'
  },
  {
    name: 'fluid',
    desc: '流体（当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器）',
    type: 'Boolean',
    opt: '-',
    def: 'true'
  },
  {
    name: 'videoType',
    desc: '视频类型',
    type: 'String',
    opt: '-',
    def: 'video/mp4'
  },
  {
    name: 'poster',
    desc: '封面',
    type: 'String',
    opt: '-',
    def: '-'
  },
  {
    name: 'notSupportedMessage',
    desc: '播放失败提示',
    type: 'String',
    opt: '-',
    def: '此视频暂无法播放，请稍后再试'
  },
  {
    name: 'timeDivider',
    desc: '是否显示当前时间和持续时间的分隔符，"/"',
    type: 'Boolean',
    opt: '-',
    def: 'false'
  },
  {
    name: 'durationDisplay',
    desc: '是否显示持续时间',
    type: 'Boolean',
    opt: '-',
    def: 'true'
  },
  {
    name: 'remainingTimeDisplay',
    desc: '是否显示剩余时间',
    type: 'Boolean',
    opt: '-',
    def: 'false'
  },
  {
    name: 'fullscreenToggle',
    desc: '是否显示全屏按钮',
    type: 'Boolean',
    opt: '-',
    def: 'true'
  }
]
