/*
 * @Author: 陈曦
 * @Date: 2021-05-02 16:01:22
 * @Description:加载菜单(演示用的)
 */

const cretaeMenu = (params) => {
  return {
    type: params.type !== 0 ? 1 : 0,
    name: params.name,
    routeName: params.routeName || '',
    icon: params.icon || '',
    iconColor: params.iconColor || '',
    url: params.url || '',
    level: params.level || 3,
    show: params.show || true,
    sort: params.sort || 0,
    children: params.children || [],
    rootId: params.rootId || 0
  }
}

const setMenuId = (menus, parentId) => {
  menus.map((m, i) => {
    if (parentId) {
      m.id = parentId + '-' + i
    } else {
      m.id = i + ''
    }
    if (m.children) {
      setMenuId(m.children, m.id)
    }
  })
}

const loadMenus = () => {
  // 基础组件菜单
  const propertyPath = '_index/page.js'
  let componentMenus = [
    {
      name: '基础组件',
      type: 0,
      icon: 'redis',
      level: 1,
      show: true,
      children: []
    },
    {
      name: '表单组件',
      type: 0,
      icon: 'property',
      level: 1,
      show: true,
      children: []
    },
    {
      name: '高级组件',
      type: 0,
      icon: 'chrome',
      level: 1,
      show: true,
      children: []
    },
    {
      name: 'GitHup',
      type: 2,
      icon: 'github',
      level: 1,
      show: true,
      url: 'https://github.com/doordie1991/EasyModular'
    }
  ]

  const requireComponent = require.context('../_modules', true, /\page.js$/)
  requireComponent
    .keys()
    .filter((m) => m.endsWith(propertyPath))
    .sort((a, b) => {
      const pageA = requireComponent(a).default.page
      const pageB = requireComponent(b).default.page
      return pageA.sort > pageB.sort ? 1 : -1
    })
    .map((fileName) => {
      const page = requireComponent(fileName).default.page
      const group = page.group || 0
      const indexMenu = cretaeMenu({
        type: 0,
        name: page.title,
        icon: page.icon,
        level: 2,
        show: true,
        rootId: group,
        children: []
      })
      const parentPath = fileName.replace(propertyPath, '')
      requireComponent
        .keys()
        .filter((f) => f.indexOf(parentPath) > -1)
        .map((subFile) => {
          let page = requireComponent(subFile).default.page
          let menu = cretaeMenu({
            name: page.title,
            routeName: page.name,
            icon: page.icon,
            level: 3,
            rootId: group
          })
          if (subFile.endsWith(propertyPath)) {
            menu.name = '基础属性'
            menu.icon = 'order'
          }
          indexMenu.children.push(menu)
        })

      componentMenus[group].children.push(indexMenu)
    })
  setMenuId(componentMenus)
  return componentMenus
}

export default loadMenus
