/*
 * @Author:陈曦
 * @Date: 2021-04-23 23:11:24
 * @Description: 用户服务
 */
import loadMenus from '../../../mock/menus-loader'

const url = {
  login: 'api/admin/auth/login'
}
const login = (params) => {
  //return $emHttp.post(url.login, params)
  return new Promise((resolve, reject) => {
    if (params.userCode === 'admin' && params.password === 'admin') {
      resolve({
        msg: 'success',
        code: '0',
        data: {
          accessToken:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijk3NDg1YTg1LTQzYzctNDU3MS1iZWJlLWNmOThkMjBmYjhiNiIsInVjIjoiYWRtaW4iLCJ1biI6IueuoeeQhuWRmCIsIm9jIjoiMDEiLCJvbiI6IjAxIiwibHQiOiIxNjE5MjU0NzczIiwibmJmIjoxNjE5MjU0NzczLCJleHAiOjE2MTkyNjE5NzMsImlzcyI6ImRvb3JkaWUiLCJhdWQiOiJkb29yZGllIn0.0EEd6FBBznzQ1x34QxoinHaUJ1orgEKPyWH8DC4SJXE',
          refreshToken: 'aa90f9cc-5bd7-4ff7-a9ff-00de5a708431',
          expiresIn: 7200
        }
      })
    } else {
      resolve({
        msg: '密码错误',
        code: '-1',
        data: null
      })
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

/**
 * @description 获取用户信息
 */
const get = () => {
  return {
    id: 1,
    userCode: 'admin',
    userName: '管理员',
    menus: loadMenus(),
    permissions: []
  }
}

export default {
  login,
  get,
  updatePassword
}
