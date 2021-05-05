/*
 * @Author: 陈曦
 * @Date: 2021-04-27 00:22:53
 * @Description: 指令注入
 */
import permission from './permission'

const directives = [permission]

const install = {
  install: Vue => {
    directives.forEach(o => {
      Vue.directive(`em-${o.name}`, o.directive)
    })
  }
}
export default install