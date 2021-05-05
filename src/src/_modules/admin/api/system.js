/*
 * @Author: 陈曦
 * @Date: 2021-04-22 23:20:42
 * @Description: 系统服务
 */

import userApi from './user'
const get = () => {
  return {
    title: 'easy-modular-ui',
    logo: require('../assets/images/logo.png'),
    home: '/home',
    login: '',
    copyright: '版权所有：陈曦·LR | 用代码改变世界 Powered by EasyModular', //版权声明
  }
}

export default {
  get
}
