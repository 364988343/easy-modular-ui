/**
 * @description: 添加节点
 * @param {*}
 */
export const addNewNode = (tree, nodes, newNode) => {
  const index = nodes.findIndex((m) => m.id === newNode.preNodeId)
  if (index >= 0) nodes.splice(index + 1, 0, newNode)

  resetTree(tree, newNode)
}

/**
 * @description: 删除节点
 * @param {*}
 */
export const deleteNode = (tree, nodes, delNode) => {
  const index = nodes.findIndex((m) => m.id === delNode.id)
  nodes.splice(index, 1)
  resetTreeForDel(tree, delNode)
}

/**
 * @description: 分解树
 * @param {*}
 */
export const resolveTree = (tree, result) => {
  let all = [tree]
  while (all.length > 0) {
    const temp = all.pop()
    if (temp.type === 'branch') {
      result.push(temp)
    } else {
      result.push({
        id: temp.id,
        name: temp.name,
        type: temp.type,
        desc: temp.desc,
        properties: temp.properties,
        params: temp.params
      })
    }

    if (!isNull(temp.childNode)) {
      all.push(temp.childNode)
    }
  }
}

/**
 * @description: 重置树结构
 * @param {*}
 */
export const resetTree = (tree, newNode) => {
  if (tree.id === newNode.preNodeId) {
    if (!isNull(tree.childNode)) {
      tree.childNode.preNodeId = newNode.id
      newNode.childNode = tree.childNode
    }
    tree.childNode = newNode
    return
  }

  if (!isNull(tree.childNode)) {
    return resetTree(tree.childNode, newNode)
  }
}

/**
 * @description: 更新树结构
 * @param {*}
 */
export const updateTree = (tree, node) => {
  if (tree.id === node.id) {
    tree.id = node.id
    tree.name = node.name
    tree.type = node.type
    tree.desc = node.desc
    tree.properties = node.properties
    tree.params = node.params
    return
  }

  if (!isNull(tree.childNode)) {
    return updateTree(tree.childNode, node)
  }
}

/**
 * @description: 删除后重置树结构
 * @param {*}
 */
export const resetTreeForDel = (tree, delNode) => {
  while (!isNull(tree)) {
    //将删除的的字节点指向父节点
    if (tree.id === delNode.preNodeId) {
      if (isNull(delNode.childNode)) {
        tree.childNode = null
        return
      }

      delNode.childNode.preNodeId = tree.id
      tree.childNode = delNode.childNode
      return
    }

    if (!isNull(tree.childNode)) tree = tree.childNode
  }
}

/**
 * @description:对象是否为空
 * @param {*}
 */
export const isNull = (obj) => {
  return !obj || (Object.keys(obj).length === 0 && obj.constructor === Object)
}

/**
 * @description: 条件参数类别
 * @param {*}
 */
export const conditionTypes = [
  {
    value: 'equal',
    label: '等于'
  },
  {
    value: 'lessThan',
    label: '小于'
  },
  {
    value: 'lessThanOrEqual',
    label: '小于等于'
  },
  {
    value: 'greaterThan',
    label: '大于'
  },
  {
    value: 'greaterThanOrEqual',
    label: '大于等于'
  },
  {
    value: 'between',
    label: '两者之间'
  }
]
