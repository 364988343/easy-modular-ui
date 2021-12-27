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
    icon: 'appstore',
    level: 1,
    show: true,
    children: []
  },
  {
    name: '高级组件',
    type: 0,
    icon: 'googleplus',
    level: 1,
    show: true,
    children: []
  },
  {
    name: 'GitHup',
    type: 2,
    icon: 'github-fill',
    level: 1,
    show: true,
    url: 'https://github.com/doordie1991/EasyModular'
  },
  {
    name: 'Gitee',
    type: 2,
    icon: 'gitee',
    level: 1,
    show: true,
    url: 'https://github.com/doordie1991/EasyModular'
  }
]

let errorPages = {
  type: 0,
  name: '错误页面',
  icon: 'detail',
  level: 2,
  show: true,
  rootId: 2,
  children: [
    {
      id:'error403',
      type: 1,
      name: '403',
      routeName: 'error403',
      icon: 'detail',
      level: 3,
      show: true,
      sort: 1,
      rootId: 2
    },
    {
      id:'error404',
      type: 1,
      name: '404',
      routeName: 'error404',
      icon: 'detail',
      level: 3,
      show: true,
      sort: 2,
      rootId: 2
    },
    {
      id:'sponsor',
      type: 1,
      name: 'sponsor',
      routeName: 'sponsor',
      icon: 'detail',
      level: 3,
      show: false,
      sort: 3,
      rootId: 2
    }
  ]
}

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

  const requireComponent = require.context('../_modules', true, /\page.js$/)
  requireComponent
    .keys()
    .filter((m) => m.endsWith(propertyPath))
    .sort((a, b) => {
      const pageA = requireComponent(a).default
      const pageB = requireComponent(b).default
      return pageA.sort - pageB.sort
    })
    .map((fileName) => {
      const page = requireComponent(fileName).default
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
          let page = requireComponent(subFile).default
          let menu = cretaeMenu({
            name: page.title,
            routeName: page.name,
            icon: page.icon,
            level: 3,
            rootId: group
          })
          if (subFile.endsWith(propertyPath)) {
            menu.name = '基础属性'
            menu.icon = 'tags'
          }
          indexMenu.children.push(menu)
        })

      componentMenus[group].children.push(indexMenu)
    })

  setMenuId(componentMenus)
  componentMenus[2].children.push(errorPages)
  return componentMenus
}

export default loadMenus
