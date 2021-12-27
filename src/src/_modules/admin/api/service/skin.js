export default (name) => {
  const save = (params) => {
    return new Promise((resolve) => {
      resolve({
        msg: 'success',
        code: '0'
      })
    })
  }

  return { save }
}
