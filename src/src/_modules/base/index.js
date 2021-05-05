import store from './store'
import routes from './routes'
export default {
  module: {
    name: 'em-module-base',
    code: 'base',
    version: '1.0.0',
    description: '基础组件'
  },
  routes,
  store,
  components: []
}
