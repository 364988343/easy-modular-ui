<template>
  <em-dialog v-bind="dialog" :visible.sync="visible_" @opened="onOpened">
    <form-run ref="form" :design="design"> </form-run>

    <template v-slot:footer>
      <em-button type="success" size="small" @click="getData">获取数据</em-button>
      <em-button type="info" size="small" @click="visible_ = false">关闭</em-button>
    </template>

    <form-data :visible.sync="formDataShow" :data="formData"></form-data>
  </em-dialog>
</template>

<script>
import visible from '../../../../mixins/components/visible'
import formRun from '../form-run'
import formData from '../form-data'
export default {
  props: { design: Object },
  mixins: [visible],
  components: { formRun, formData },
  data() {
    return {
      active: 0,
      cols: [1, 2, 3, 4],
      dialog: {
        title: '表单预览',
        icon: 'tags',
        header: true,
        footer: true,
        width: '86%',
        height: '80%',
        padding: 20
      },
      formData: {},
      formDataShow: false
    }
  },
  methods: {
    /**
     * @description: 获取数据
     * @param {*}
     */
    getData() {
      this.formData = this.$refs.form.model
      this.formDataShow = true
    },
    /**
     * @description: Dialog 打开动画结束时的回调
     */
    onOpened() {
      this.$refs.form.init()
    }
  }
}
</script>
