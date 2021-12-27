import './api'
import store from './store'
import routes from './routes'
import passwordUpdate from '../admin/views/password-update'
export default {
  module: {
    name: 'em-module-admin',
    code: 'admin',
    version: '1.0.0',
    description: '系统管理'
  },
  routes,
  store,
  components: [
    { name: 'em-password-update', component: passwordUpdate },
  ]
}
