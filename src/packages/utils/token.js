import cache from './cache'
const TokenKey = 'token'

export default {
  /**
   * 获取令牌
   */
  get() {
    return cache.get(TokenKey)
  },
  /**
   * 设置令牌
   * @param {String} token 令牌
   */
  set(token) {
    cache.set(TokenKey, token)
  },
  /**
   * 删除令牌
   */
  remove() {
    cache.set(TokenKey)
  }
}
