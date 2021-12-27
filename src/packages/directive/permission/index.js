/*
 * @Author: 陈曦
 * @Date: 2021-04-27 00:22:53
 * @Description: 按钮权限指令
 */
import { store } from '../../store'

// 按钮权限指令
const permission = {
  inserted: (el, binding) => {
    // 如果编码为空则始终显示
    if (!binding.value) return

    var permissions = store.state.app.user.permissions
    const code = binding.value
    if (!permissions.find((m) => m.permissionCode.toLowerCase() === code.toLowerCase())) {
      el.parentNode.removeChild(el)
    }
  }
}

export default {
  name: 'permission',
  directive: permission
}
