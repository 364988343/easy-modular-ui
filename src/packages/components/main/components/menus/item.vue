<template>
  <!--节点菜单-->
  <el-submenu v-if="menu.type === 0" :index="menu.id + ''">
    <template v-slot:title>
      <em-icon :name="menu.icon" class="em-menus-icon" :style="{ color: menu.iconColor }" />
      <span>{{ menu.name }}</span>
    </template>
    <template v-for="item in menu.children">
      <menu-item v-if="item.show" :key="item.id" :menu="item" :parent-index="menu.id" />
    </template>
  </el-submenu>

  <!--链接菜单-->
  <el-menu-item v-else :index="menu.id + ''" :parent-index="parentIndex" @click="go(menu)">
    <em-icon :name="menu.icon" class="em-menus-icon" :style="{ color: menu.iconColor }" />
    <span>{{ menu.name }}</span>
  </el-menu-item>
</template>
<script>
import { open } from '../../../../utils/menu'
export default {
  name: 'MenuItem',
  data() {
    return {}
  },
  props: {
    parentIndex: {
      type: String,
      default: ''
    },
    menu: {}
  },
  methods: {
    go(menu) {
      open(this.$router, menu)
    }
  }
}
</script>
