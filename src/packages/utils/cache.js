/*
 * @Author: 陈曦
 * @Date: 2021-04-18 16:18:52
 * @Description: 基于浏览器的本地存储的缓存管理
 */

import store from 'store'
const prefix = 'em-'

export default {
  /**
   * @description: 设置缓存
   * @param {String} key
   * @param {String} value
   */
  set(key, value) {
    store.set(`${prefix}${key}`, value)
  },

  /**
   * @description: 获取缓存
   * @param {String} key
   */
  get(key) {
    return store.get(`${prefix}${key}`)
  },

  /**
   * @description: 删除缓存
   * @param {String} key
   */
  remove(key) {
    store.remove(`${prefix}${key}`)
  },

  /**
   * @description: 删除所有缓存（指定前缀）
   */
  clearAll() {
    store.each(function (value, key) {
      if (key.startsWith(prefix)) {
        store.remove(key)
      }
    })
  },
}
