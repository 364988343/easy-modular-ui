/*
 * @Author: 陈曦
 * @Date: 2021-04-24 17:49:32
 * @Description: 加载
 */
export default {
    methods: {
      /**
       * @description: 打开加载
       * @param {*} msg
       * @return {*}
       */  
      _openLoading(msg) {
        window.$loading = this.$loading({
          lock: true,
          text: msg || '正在努力加载...',
          background: 'rgba(255, 255, 255, 0.6)',
          spinner: 'el-icon-loading'
        })
      },

      /**
       * @description: 关闭加载
       * @param {*}
       * @return {*}
       */
      _closeLoading() {
        window.$loading.close()
      }
    }
  }
  
