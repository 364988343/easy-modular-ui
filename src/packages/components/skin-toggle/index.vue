<template>
  <em-dialog v-bind="dialog" :visible.sync="visible_">
    <el-divider>主题</el-divider>
    <div class="theme-list">
      <div v-for="item in themes" :class="['theme-list-item', model.theme === item.name ? 'active' : '']" :key="item.name" :style="{ backgroundColor: item.value }" @click="onThemeChange(item)"></div>
    </div>
    <el-divider>字号</el-divider>
    <div class="fontsize-list">
      <el-radio v-model="model.fontSize" label="default" border>默认</el-radio>
      <el-radio v-model="model.fontSize" label="medium" border>中号</el-radio>
      <el-radio v-model="model.fontSize" label="small" border>小号</el-radio>
      <el-radio v-model="model.fontSize" label="mini" border>超小</el-radio>
    </div>
    <el-divider>组件</el-divider>
    <el-row type="flex" class="row-bg" justify="center" :gutter="20">
      <el-col :span="8"><label>最大窗口数量 </label><el-input-number v-model="model.maxOpenCount" size="mini"></el-input-number></el-col>
      <el-col :span="8" style="line-height:30px"><label>是否只保持一个子菜单的展开 </label><el-switch v-model="model.uniqueOpened" size="mini"> </el-switch></el-col>
    </el-row>
    <template v-slot:footer>
      <em-button type="success" text="保存" @click="onSave" />
    </template>
  </em-dialog>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import visible from '../../mixins/components/visible'
import cache from '../../utils/cache'
export default {
  mixins: [visible],
  data() {
    return {
      //主题列表
      themes: [
        { name: 'theme', value: '#2969ab' },
        { name: 'theme1', value: '#00A29A' },
        { name: 'theme2', value: '#EB7347' },
        { name: 'theme3', value: '#84AF9B' },
        { name: 'theme4', value: '#00CCFF' }
      ],
      model: {
        theme: this.setCurrentTheme,
        fontSize: this.fontSize,
        maxOpenCount: this.maxOpenCount,
        uniqueOpened: this.uniqueOpened
      },
      dialog: {
        title: '主题切换',
        icon: 'skin',
        height: 450,
        footer: true,
        footerCloseButton: true
      }
    }
  },
  computed: {
    ...mapState('app/skins', ['theme', 'fontSize', 'maxOpenCount', 'uniqueOpened'])
  },
  methods: {
    ...mapMutations('app/skins', ['setTheme', 'setFontSize', 'setMaxOpenCount', 'setUniqueOpened']),
    /**
     * @description: 切换主题
     * @param {*} theme 主题名称
     */
    onThemeChange(theme) {
      this.model.theme = theme.name
    },

    /**
     * @description: 保存
     */
    onSave() {
      window.document.documentElement.setAttribute('data-theme', this.model.theme)
      this.setTheme(this.model.theme)
      this.setFontSize(this.model.fontSize)
      this.setMaxOpenCount(this.model.maxOpenCount)
      this.setUniqueOpened(this.model.uniqueOpened)
      this.hide()
    }
  },
  created() {
    this.$nextTick(() => {
      this.model.theme = this.theme
      this.model.fontSize = this.fontSize
      this.model.maxOpenCount = this.maxOpenCount
      this.model.uniqueOpened = this.uniqueOpened
    })
  }
}
</script>
