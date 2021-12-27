export default (name) => {
  const get = () => {
    return {
      title: 'easy-modular-ui',
      logo: require('../../assets/images/logo.png'),
      home: '/home',
      login: '',
      version: '1.0.6',
      copyright: '版权所有：陈曦·LR | 大龄落魄中年大叔 Powered by EasyModular'
    }
  }

  return { get }
}
