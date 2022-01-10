import axios from 'axios'
import qs from 'qs'
import dayjs from 'dayjs'
import token from './token'
import { Message, MessageBox } from 'element-ui'
import { store } from '../store'
import { router } from '../router'

axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.headers.put['Content-Type'] = 'application/json'

function Http() {
  this.axios = axios
}

// 序列化参数为Url形式
Http.prototype.stringify = (params) => {
  return qs.stringify(params, {
    allowDots: true
  })
}

Http.prototype.post = (url, params, config) => {
  return axios.post(url, params, config)
}

Http.prototype.get = (url, params, config) => {
  const config_ = Object.assign({}, config, {
    // 参数
    params,
    // 修改参数序列化方法
    paramsSerializer: (p) => {
      // 使用逗号分隔参数
      return qs.stringify(p, {
        allowDots: true
      })
    }
  })
  return axios.get(url, config_)
}

Http.prototype.delete = (url, params, config) => {
  const config_ = Object.assign({}, config, {
    // 参数
    params,
    // 修改参数序列化方法
    paramsSerializer: (p) => {
      // 使用逗号分隔参数
      return qs.stringify(p, {
        allowDots: true
      })
    }
  })
  return axios.delete(url, config_)
}

Http.prototype.put = (url, params, config) => {
  return axios.put(url, params, config)
}

Http.prototype.download = (url, params, config) => {
  const config_ = Object.assign({ responseType: 'blob' }, config, {
    // 参数
    params,
    // 修改参数序列化方法
    paramsSerializer: (p) => {
      // 使用逗号分隔参数
      return qs.stringify(p, {
        allowDots: true
      })
    }
  })
  return axios.get(url, config_)
}

Http.prototype.preview = (url, params, config) => {
  const config_ = Object.assign({ responseType: 'blob', headers: { preview: true } }, config, {
    // 参数
    params,
    // 修改参数序列化方法
    paramsSerializer: (p) => {
      // 使用逗号分隔参数
      return qs.stringify(p, {
        allowDots: true
      })
    }
  })
  return axios.get(url, config_)
}

Http.prototype.export = (url, params, config) => {
  return axios.post(url, params, Object.assign({ responseType: 'blob' }, config))
}

// 通用CRUD接口地址
Http.prototype.crud = (root) => {
  if (!root.endsWith('/')) {
    root += '/'
  }
  return {
    query(params) {
      return $emHttp.get(`${root}query`, params)
    },
    add(params) {
      return $emHttp.post(`${root}add`, params)
    },
    remove(id) {
      return $emHttp.delete(`${root}delete`, { id })
    },
    edit(id) {
      return $emHttp.get(`${root}edit`, { id })
    },
    update(params) {
      return $emHttp.post(`${root}update`, params)
    }
  }
}

// 设为全局属性$emHttp
if (!window.$emHttp) window.$emHttp = new Http()

// 消息提醒显示时长(ms)
const messageDuration = 1500

//处理文件下载请求
const handleDownload = (response) => {
  //如果返回的是application/json，则表示返回的是json，没有要下载的问题，可能是逻辑处理失败
  if (response.data.type === 'application/json') {
    var reader = new FileReader()
    reader.readAsText(response.data)
    reader.onload = (e) => {
      Message.error({
        message: data.msg,
        showClose: true,
        center: true,
        duration: messageDuration
      })
    }

    return Promise.reject('下载文件失败')
  }

  const url = window.URL.createObjectURL(response.data)

  // 如果是预览直接返回
  if (response.config.headers['preview']) return url

  let fileName = ''
  if (response.config.params && response.config.params.exportTitle) {
    fileName = `${response.config.params.exportTitle}${dayjs().format('YYYYMMDD')}.xls`
  } else {
    // 如果响应头包含'content-disposition'属性，则从该属性中获取文件名称
    if (response.headers['content-disposition']) {
      fileName = decodeURI(
        response.headers['content-disposition']
          .split(';')
          .find((m) => m.trim().startsWith('filename='))
          .split('=')[1]
      )
        .replace('"', '')
        .replace('"', '')
    }
  }

  //如果文件名不存在，则使用时间戳
  if (!fileName) {
    fileName = dayjs().format('YYYYMMDDHHMMSSS')
  }

  //通过模拟a标签点击事件下载文件
  const link = document.createElement('a')
  link.href = url
  link.setAttribute('download', fileName)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

//刷新令牌
const refreshToken = () => {
  let t = token.get()
  if (t && t.refreshToken) {
    return store.state.app.system.actions.auth.refreshToken(t.refreshToken)
  }

  Promise.reject('refresh token error')
}

// 初始化
export default baseUrl => {
  // 接口根路径
  axios.defaults.baseURL = baseUrl
  // 拦截请求
  axios.interceptors.request.use(
    (config) => {
      let t = token.get()
      if (t && t.accessToken) {
        config.headers.Authorization = 'Bearer ' + t.accessToken
      }
      return config
    },
    function (error) {
      return Promise.reject(error)
    }
  )

  // 响应前拦截器
  axios.interceptors.response.use(
    (response) => {
      const { config } = response
      // 文件下载/预览
      if (config.responseType && config.responseType === 'blob') {
        return handleDownload(response)
      }

      //关闭遮罩层
      if (window.$loading) window.$loading.close()

      if (response.data.code === '0') {
        return response.data.data || '0'
      } else if (response.data.code === '-1') {
        Message.error({
          message: response.data.msg,
          showClose: true,
          center: true,
          duration: messageDuration
        })
        return Promise.reject(response.data.msg)
      } else {
        return response
      }
    },
    (error) => {
      let currentRoute = router.currentRoute
      let redirect = currentRoute.name !== 'login' ? currentRoute.fullPath : '/' // 跳转页面

      //关闭遮罩层
      if (window.$loading) window.$loading.close()

      if (error && error.response) {
        switch (error.response.status) {
          case 401:
            console.log(401)
            return refreshToken()
              .then((data) => {
                //重新初始化令牌
                store.commit('app/token/init', data)
                //重新发一起一次上次的的请求
                error.config.headers.Authorization = 'Bearer ' + data.accessToken
                return axios.request(error.config)
              })
              .catch(() => {
                // 如果刷新失败，需要删除token并跳转到登录页面
                token.remove()
                router.push({
                  name: 'login',
                  query: {
                    redirect
                  }
                })
              })
          case 403:
            store.dispatch(
              'app/page/close',
              {
                fullPath: currentRoute.path,
                router: router,
                to: {
                  name: 'error403'
                }
              },
              { root: true }
            )
            break
          default:
            console.error(error.response.data.msg)
            Message.error({
              message: '系统异常，请联系管理员~',
              duration: messageDuration
            })
            break
        }
      } else {
        if (currentRoute.name === 'login') {
          Message.error({
            message: '无法连接网络~',
            duration: messageDuration
          })
        } else {
          token.remove()
          router.push({ name: 'login', query: { redirect } })
        }
      }

      return Promise.reject(error)
    }
  )
}
