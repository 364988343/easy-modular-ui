<template>
  <div class="em-form-design-right">
    <el-tabs v-model="activeName" stretch>
      <el-tab-pane label="字段设置" name="element"> </el-tab-pane>
      <el-tab-pane label="表单设置" name="form"></el-tab-pane>
    </el-tabs>

    <div class="em-form-design-right-content">
      <attributes-render v-if="activeName === 'element'" :data="element"></attributes-render>
      <form-set v-else :data="form"></form-set>
    </div>
  </div>
</template>

<script>
import attributesRender from '../../render/attributes-render'
import formSet from '../form-set'
export default {
  components: { attributesRender, formSet },
  props: { element: Object, form: Object },
  data() {
    return {
      activeName: 'form'
    }
  },
  watch: {
    element: {
      handler(n, o) {
        if (n) {
          this.activeName = 'element'
        }
      },
      immediate: true
    }
  }
}
</script>
