<template>
  <em-panel v-bind="panel">
    <em-details v-bind="details"></em-details>
  </em-panel>
</template>
<script>
export default {
  data() {
    return {
      panel: {
        title: 'NBA球星',
        page: true,
        header: true,
        icon: 'detail'
      },
      details: {
        action: this.getData,
        cols: [
          { name: 'chineseName', label: '中文名' },
          { name: 'englishName', label: '外文名' },
          { name: 'nationality', label: '国    籍' },
          { name: 'birthPlace', label: '出生地' },
          { name: 'birthDate', label: '出生日期' },
          { name: 'gradschool', label: '毕业院校' },
          { name: 'team', label: '所属运动队' }
        ]
      }
    }
  },
  methods: {
    getData() {
      return new Promise((resolve) => {
        resolve({
          chineseName: '凯里·欧文',
          englishName: 'Kyrie Irving',
          nationality: '美国/澳大利亚',
          birthPlace: '澳大利亚墨尔本',
          birthDate: '1992年3月23日',
          gradschool: '杜克大学',
          team: '布鲁克林篮网队'
        })
      })
    }
  }
}
</script>
<style>
.label {
  width: 300px !important;
  background: #e1f3d8;
}
</style>
