/**
 * @description: 获取所有元件
 * @param {*}
 */
export const getElements = () => {
  let elements = []

  const context = require.context('./elements', true, /.config.js$/)
  context.keys().forEach((m) => {
    elements.push(context(m).default)
  })

  return elements
}
