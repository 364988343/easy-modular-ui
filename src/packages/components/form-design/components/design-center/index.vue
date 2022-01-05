<template>
  <div class="em-form-design-center">
    <div class="em-form-design-center-toolbar">
      <em-button type="danger" icon="search" size="small" text="预览" @click="onPreview"></em-button>
      <em-button type="success" icon="code" size="small" text="生成JSON" @click="onCreateJson"></em-button>
      <em-button type="primary" icon="save" size="small" text="保存" @click="onSave"></em-button>
      <em-button type="info" icon="close" size="small" text="关闭" @click="closePage"></em-button>
    </div>

    <el-form ref="form" class="em-form-design-center-content" v-bind="formConfig">
      <draggable class="draggable-content" v-model="elements" group="design" chosenClass="drag-chosen" :animation="340">
        <div
          :class="['form-item-drag', `form-col-${item.span ? item.span : form.colNum}`, curIndex === index ? 'active' : '']"
          v-for="(item, index) in elements"
          :key="index"
          @click="onSelect(item, index)"
        >
          <el-form-item
            :label="item.label"
            :prop="item.fieldName"
            :rules="{
              required: item.required,
              trigger: 'submit'
            }"
          >
            <element-render :data="item" v-model="item.defaultVal"></element-render>
          </el-form-item>

          <div class="form-item-drag-toolbar" v-show="curIndex === index">
            <em-button type="warning" icon="copy" @click="onCopy(item, index)"></em-button>
            <em-button type="danger" icon="delete" @click="onDelete(index)"></em-button>
          </div>
        </div>

        <div v-if="elements.length === 0" class="em-form-design-empty">从左侧拖拽来添加字段</div>
      </draggable>
    </el-form>

    <form-preview :visible.sync="formPreviewShow" :design="design"></form-preview>
    <form-data :visible.sync="formDataShow" :data="design"></form-data>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import elementRender from '../../render/element-render'
import formPreview from '../form-preview'
import formData from '../form-data'
import { v4 as uuidv4 } from 'uuid'
import page from '../../../../mixins/components/page'
export default {
  props: { form: Object },
  mixins: [page],
  components: { draggable, elementRender, formPreview, formData },
  data() {
    return {
      curIndex: -1,
      design: {},
      elements: [],
      formPreviewShow: false,
      formDataShow: false
    }
  },
  computed: {
    formConfig() {
      return {
        size: this.form.size,
        labelWidth: `${this.form.labelWidth}px`,
        labelPosition: this.form.labelPosition
      }
    }
  },
  methods: {
    /**
     * @description:获取数据对象
     * @param {*}
     */
    getModel() {
      return {
        form: this.form,
        elements: this.elements
      }
    },

    /**
     * @description: 选择组件
     * @param {*}
     */
    onSelect(item, index) {
      this.curIndex = index
      this.$emit('element-select', item)
    },

    /**
     * @description: 复制组件
     * @param {*}
     */
    onCopy(origin, index) {
      let item = this.$_.cloneDeep(origin)
      item.fieldName = `field_${uuidv4().replaceAll('-', '')}`
      this.elements.splice(index + 1, 0, item)
    },

    /**
     * @description: 删除组件
     * @param {*}
     */
    onDelete(index) {
      this.elements.splice(index, 1)
    },

    /**
     * @description: 预览
     * @param {*}
     */
    onPreview() {
      this.design = {
        form: this.form,
        elements: this.elements
      }
      this.formPreviewShow = true
    },

    /**
     * @description: 生成JSON
     * @param {*}
     */
    onCreateJson() {
      this.design = {
        form: this.form,
        elements: this.elements
      }
      this.formDataShow = true
    },

    /**
     * @description:保存
     * @param {*}
     */
    onSave() {
      this.design = {
        form: this.form,
        elements: this.elements
      }
      this.$emit('save', this.design)
    }
  }
}
</script>
