/*
 * @Author: 陈曦
 * @Date: 2021-04-24 17:55:01
 * @Description: 设置标签标题
 */
import { mapActions } from 'vuex'
export default {
  methods: {
    ...mapActions('app/page', ['setTabName'])
  }
}
