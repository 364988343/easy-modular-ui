export default (name) => {
  const queryAll = () => {
    const data = [
      {
        version: '1.0.3',
        content: '发布内容3',
        releaseTime: '2021-07-21 08:22'
      },
      {
        version: '1.0.2',
        content: '发布内容2',
        releaseTime: '2021-07-20'
      },
      {
        version: '1.0.1',
        content: '发布内容1',
        releaseTime: '2021-07-19'
      }
    ]
    return new Promise((resolve) => {
      resolve(data)
    })
  }

  return { queryAll }
}
