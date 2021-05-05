import store from './store'
import routes from './routes'
import UserInfo from '../admin/views/user-info'
import PasswordUpdate from '../admin/views/password-update'
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
    { name: 'em-user-info', component: UserInfo },
    { name: 'em-password-update', component: PasswordUpdate }
  ]
}
