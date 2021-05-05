<template>
  <em-panel page header no-padding title="产品详情" icon="detail" fullscreen>
    <em-details v-bind="details"></em-details>
  </em-panel>
</template>
<script>
export default {
  data() {
    return {
      details: {
        action() {
          return new Promise(resolve => {
            resolve({
              id: 1,
              title: 'iPhone 12 和 iPhone 12 mini',
              price: 5542,
              store: 7782,
              des: `5G 速度、iPhone 迄今最快的芯片 A14 仿生、
OLED 全面屏、将抗跌落能力提升至四倍的超瓷晶面板，以及遍布每个摄像头的夜间模式。这两款尺寸称手的 iPhone 12，该有的都有了`
            })
          })
        },
        options: [
          [
            {
              label: '编号',
              prop: 'id'
            },
            {
              label: '产品名称',
              prop: 'title'
            }
          ],
          [
            {
              label: '价格',
              prop: 'price'
            },
            {
              label: '库存',
              prop: 'store'
            }
          ],
          [
            {
              label: '介绍',
              prop: 'des'
            }
          ]
        ]
      }
    }
  }
}
</script>
