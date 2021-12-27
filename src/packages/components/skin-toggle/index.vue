<template>
  <em-drawer header footer title="系统皮肤" icon="skin" :visible.sync="visible_">
    <el-divider>主题模式</el-divider>
    <div class="theme-mode">
      <el-radio-group v-model="skin.themeMode">
        <el-radio-button label="dark">深色（dark）</el-radio-button>
        <el-radio-button label="light">浅色（light）</el-radio-button>
      </el-radio-group>
    </div>
    <el-divider>主题颜色</el-divider>
    <div class="theme-list">
      <div
        v-for="item in themes"
        :class="['theme-list-item', skin.themeColor === item.name ? 'active' : '']"
        :key="item.name"
        :style="{ backgroundColor: item.value }"
        @click="onThemeChange(item)"
      ></div>
    </div>
    <el-divider>字号</el-divider>
    <div class="fontsize-list">
      <el-radio v-model="skin.fontSize" label="default" border>默认</el-radio>
      <el-radio v-model="skin.fontSize" label="medium" border>中号</el-radio>
      <el-radio v-model="skin.fontSize" label="small" border>小号</el-radio>
      <el-radio v-model="skin.fontSize" label="mini" border>超小</el-radio>
    </div>
    <el-divider>组件</el-divider>
    <el-form label-width="200px">
      <el-form-item label="最大窗口数量">
        <el-input-number v-model="skin.maxOpenCount" controls-position="right" />
      </el-form-item>
      <el-form-item label="只保持一个子菜单的展开">
        <el-switch v-model="skin.uniqueOpened" />
      </el-form-item>
      <el-form-item label="祭奠模式">
        <el-switch v-model="skin.memorial" />
      </el-form-item>
    </el-form>
    <template v-slot:footer>
      <em-button type="success" text="保存" @click="onSave" />
    </template>
  </em-drawer>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import visible from '../../mixins/components/visible'
import cache from '../../utils/cache'
export default {
  name: 'skin-toggle',
  mixins: [visible],
  data() {
    return {
      //主题列表
      themes: [
        { name: 'theme1', value: '#191a23' },
        { name: 'theme2', value: '#00A29A' },
        { name: 'theme3', value: '#2969ab' },
        { name: 'theme4', value: '#EB7347' },
        { name: 'theme5', value: '#84AF9B' },
        { name: 'theme6', value: '#00CCFF' }
      ]
    }
  },
  computed: {
    ...mapState('app/skins', { skin: (s) => s }),
    ...mapState('app/system', { actions: (s) => s.actions })
  },
  methods: {
    ...mapMutations('app/skins', ['init', 'setTheme']),
    /**
     * @description: 切换主题
     * @param {*} theme 主题名称
     */
    onThemeChange(theme) {
      this.setTheme(theme.name)
    },

    /**
     * @description: 保存
     */
    async onSave() {
      const result = await this.actions.saveSkin(this.skin)
      this.init(this.skin)
      this._success('保存成功')
      this.hide()
    }
  }
}
</script>
