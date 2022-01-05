<template>
  <em-dialog v-bind="dialog" :visible.sync="visible_">
    <template v-slot:toolbar>
      <el-input class="em-icon-picker-panel-filter" v-model="keywords" placeholder="请输入关键字" clearable style="width: 200px;"></el-input>
    </template>
    <div class="em-icon-picker-panel">
      <div class="em-icon-picker-panel-item" v-for="(item, index) in filterList" :key="index" @click="onSelect(item)">
        <div class="em-icon-picker-panel-item-icon"><em-icon :name="item" /></div>
        <div class="em-icon-picker-panel-item-text">{{ item }}</div>
      </div>
    </div>
  </em-dialog>
</template>
<script>
import visible from '../../mixins/components/visible.js'
export default {
  mixins: [visible],
  data() {
    return {
      list: [],
      keywords: '',
      dialog: {
        title: '选择图标',
        icon: 'detail',
        height: '75%',
        width: '820px',
        fullscreen: true
      }
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
    },

    /**
     * @description: 选择图标
     * @param {*} icon
     */
    onSelect(icon) {
      this.$emit('success', icon)
      this.hide()
    }
  },
  created() {
    this.getData()
  }
}
</script>
