import nodeList from './workflow/components/node-list'
import formRun from './form-design/components/form-run'

let components = []
const requireComponent = require.context('../components', true, /index\.(vue|js)$/)
requireComponent
  .keys()
  .filter((item) => item !== './index.js')
  .forEach((fileName) => {
    const componentConfig = requireComponent(fileName)
    if (componentConfig.default && componentConfig.default.name) {
      components.push(componentConfig.default)
    }
  })

export default function (Vue) {
  components.forEach((component) => {
    Vue.component(`em-${component.name.toLowerCase()}`, component)
  })
 
  Vue.component('em-workflow-node-list', nodeList)
  Vue.component('em-form-design-run', formRun)
}
