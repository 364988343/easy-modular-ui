const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: '/ui',
  lintOnSave: false,
  runtimeCompiler: true,

  configureWebpack: (config) => {
    config.devtool = process.env.NODE_ENV === 'development' ? 'source-map' : undefined
  },
  chainWebpack: (config) => {
    config.resolve.alias.set('@', resolve('./src')).set('@packages', resolve('./packages'))
  }
}
