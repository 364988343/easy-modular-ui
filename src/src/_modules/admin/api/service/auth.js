import loadMenus from '../../../../mock/menus-loader'

export default (name) => {
  const url = {
    login: 'api/admin/auth/login'
  }

  const login = (params) => {
    return new Promise((resolve, reject) => {
      if (params.userCode === 'admin' && params.password === '123') {
        resolve({
          accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
          refreshToken: ''
        })
      } else {
        reject(new Error('密码错误'))
      }
    })
  }

  const updatePassword = (params) => {
    return new Promise((resolve) => {
      resolve({
        msg: 'success',
        code: '0'
      })
    })
  }

  const getAuthInfo = () => {
    return {
      userId: '101',
      userCode: 'admin',
      userName: '管理员',
      tenantId: '',
      tenantName: '',
      menus: loadMenus(),
      permissions: [],
      skin: {
        themeMode: 'dark',
        themeColor: 'theme1',
        fontSize: 'small',
        maxOpenCount: 20,
        uniqueOpened: true
      }
    }
  }

  return {
    login,
    getAuthInfo,
    updatePassword
  }
}
