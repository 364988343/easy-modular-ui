<template>
   <em-panel page noPadding noBorder>
    <em-panel page header  title="图标库" icon="profile">
      <template v-slot:toolbar>
        <el-input class="em-icon-store-filter" v-model="keywords" :size="fontSize" placeholder="请输入关键字" clearable style="width: 200px"></el-input>
      </template>
      <div class="em-icon-store">
        <div class="em-icon-store-item" v-for="(item, index) in filterList" :key="index" @click="onSelect(icon)">
          <div class="em-icon-store-item-icon"><em-icon :name="item" /></div>
          <div class="em-icon-store-item-text">{{ item }}</div>
        </div>
      </div>
    </em-panel>
  </em-panel>
</template>
<script>
export default {
  data() {
    return {
      list: [],
      keywords: ''
    }
  },
  computed: {
    filterList() {
      if (!this.keywords) {
        return this.list
      }

      return this.list.filter((m) => m.indexOf(this.keywords) >= 0)
    }
  },
  methods: {
    /**
     * @description: 获取数据
     * @param {*}
     */
    getData() {
      let symbols = document.querySelectorAll('body>svg>symbol')
      symbols.forEach((m) => {
        this.list.push(m.id.replace('icon-', ''))
      })
    }
  },
  created() {
    this.getData()
  }
}
</script>

<style lang="scss" scoped>
.em-icon-store {
  display: flex;
  flex-wrap: wrap;
  &-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 10%;
    height: 120px;
    cursor: pointer;
    border: 1px solid #c0c4cc;
    box-sizing: border-box;

    &-icon {
      width: 60px;
      height: 60px;
      line-height: 60px;
      font-size: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
      transition: transform 0.3s;
    }

    &-text {
      width: 100%;
      height: 30px;
      line-height: 30px;
      text-align: center;
      color: #606266;
    }

    &:hover {
      .em-icon-store-item-icon {
        background: #282828;
        color: #fff;
        transform: scale(1.1);
      }
    }
  }
}
</style>
