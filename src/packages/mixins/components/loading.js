/*
 * @Author: 陈曦
 * @Date: 2021-05-01 16:12:32
 * @Description: 加载动画
 */

import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState('app/loading', {
      loadingText: 'text',
      loadingBackground: 'background',
      loadingSpinner: 'spinner'
    })
  },
  methods: {
    _loading(text) {
      return this.$loading({
        lock: true,
        text: text || this.loadingText,
        spinner: this.loadingSpinner,
        background: this.loadingBackground
      })
    }
  }
}

