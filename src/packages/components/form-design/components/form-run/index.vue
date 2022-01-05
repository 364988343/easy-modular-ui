<template>
  <div class="em-form-run">
    <el-form ref="form" v-bind="formConfig" :model="model" :rules="rules">
      <el-form-item :label="item.label" :prop="item.fieldName" v-for="(item, index) in design.elements" :key="index">
        <element-render :data="item" v-model="model[item.fieldName]"></element-render>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import elementRender from '../../render/element-render'
export default {
  props: { design: Object },
  components: { elementRender },
  data() {
    return {
      model: {},
      rules: {}
    }
  },
  computed: {
    formConfig() {
      return {
        size: this.design.form.size,
        labelWidth: `${this.design.form.labelWidth}px`,
        labelPosition: this.design.form.labelPosition
      }
    }
  },
  methods: {
    /**
     * @description: 初始化
     * @param {*}
     */
    init() {
      this.model = {}
      this.design.elements.forEach((m) => {
        this.$set(this.model, m.fieldName, m.defaultVal)
        if (m.required) {
          this.rules[m.fieldName] = [{ required: true, message: `${m.label}必填` }]
        }
      })
    }
  },
  created() {
    this.init()
  }
}
</script>
