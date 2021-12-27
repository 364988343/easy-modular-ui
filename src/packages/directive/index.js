import permission from './permission'
import dialogDrag from './dialog-drag'

const directives = [permission,dialogDrag]

const install = {
  install: Vue => {
    directives.forEach(o => {
      Vue.directive(`em-${o.name}`, o.directive)
    })
  }
}
export default install