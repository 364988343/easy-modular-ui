/*
 * @Author: 陈曦
 * @Date: 2021-04-18 15:50:59
 * @Description: 组件批量注册
 */
let components = []
const requireComponent = require.context('../components', true, /index\.(vue|js)$/)
requireComponent
  .keys()
  .filter(item => item !== './index.js')
  .forEach(fileName => {
    const componentConfig = requireComponent(fileName)
    if (componentConfig.default && componentConfig.default.name) {
      components.push(componentConfig.default)
    }
  })
export default function(Vue) {
  components.forEach(component => {
    Vue.component(`em-${component.name.toLowerCase()}`, component)
  })
}