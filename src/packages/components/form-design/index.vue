<template>
  <div class="em-form-design">
    <design-left :elements="design.elements" @change="onLeftChange"></design-left>
    <design-center ref="designCenter" :form="design.form" @element-select="onElementSelect" @save="onSave"></design-center>
    <design-right :element="curElement" :form="design.form"></design-right>

    <form-col-num :visible.sync="formColsShow" @success="onFormColNumSet"></form-col-num>
  </div>
</template>

<script>
import designLeft from './components/design-left'
import designCenter from './components/design-center'
import designRight from './components/design-right'
import formColNum from './components/form-col-num'
import { getElements } from './design'
export default {
  name: 'form-design',
  components: { designLeft, designCenter, designRight, formColNum },
  props: {
    //表单设计数据对象
    model: Object,
    //自定义组件
    customElements: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      //当前元件
      curElement: null,
      //表单设计
      design: {
        form: {
          //列数
          colNum: 1,
          //大小
          size: 'medium',
          //表单域标签的位置，如果值为 left 或者 right
          labelPosition: 'right',
          //表单域标签的宽度
          labelWidth: 100
        },
        elements: []
      },
      //表单列数设置
      formColsShow: false
    }
  },
  methods: {
    /**
     * @description: 初始化
     * @param {*}
     */
    init() {
      if (this.model && Object.keys(this.model).length > 0) this.design = this.model

      let elements = getElements()
      this.design.elements = elements.concat(this.customElements).sort((a, b) => {
        return a.sort - b.sort
      })

      if (!this.design.form.colNum) {
        this.$nextTick(() => {
          this.formColsShow = true
        })
      }
    },

    /**
     * @description:获取数据对象
     * @param {*}
     */
    getModel() {
      return this.$refs.designCenter.getModel()
    },

    /**
     * @description:拖动左边组件变化事件
     * @param {*}
     */
    onLeftChange(ele) {
      this.curElement = ele
    },

    /**
     * @description: 组件选择事件
     * @param {*}
     */
    onElementSelect(ele) {
      this.curElement = ele
    },

    /**
     * @description: 设置表单列数
     * @param {*}
     */
    onFormColNumSet(colNum) {
      this.design.form.colNum = colNum
    },

    /**
     * @description: 保存
     * @param {*}
     */
    onSave(model) {
      this.$emit('save', model)
    }
  },
  watch: {
    model: {
      handler(n, o) {
        if (n) this.init()
      },
      immediate: true
    }
  },
  created() {
    this.init()
  }
}
</script>
