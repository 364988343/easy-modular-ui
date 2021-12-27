export default [
  {
    name: 'play',
    desc: '播放回调',
    params: 'event'
  },
  {
    name: 'playerPause',
    desc: '暂停回调',
    params: 'event'
  },
  {
    name: 'playerEnded',
    desc: '视频播完回调',
    params: 'event'
  },
  {
    name: 'playerWaiting',
    desc: 'DOM元素上的readyState更改导致播放停止',
    params: 'event'
  },
  {
    name: 'playerPlaying',
    desc: '已开始播放回调',
    params: 'event'
  },
  {
    name: 'playerLoadeddata',
    desc: '当播放器在当前播放位置下载数据时触发',
    params: 'event'
  },
  {
    name: 'playerTimeupdate',
    desc: '当前播放位置发生变化时触发。',
    params: 'event'
  },
  {
    name: 'playerCanplay',
    desc: '媒体的readyState为HAVE_FUTURE_DATA或更高',
    params: 'event'
  },
  {
    name: 'playerCanplaythrough',
    desc: '媒体的readyState为HAVE_ENOUGH_DATA或更高。这意味着可以在不缓冲的情况下播放整个媒体文件。',
    params: 'event'
  },
  {
    name: 'playerStateChanged',
    desc: '播放状态改变回调',
    params: 'event'
  },
  {
    name: 'playerReady',
    desc: '视频就绪',
    params: 'player'
  }
]
