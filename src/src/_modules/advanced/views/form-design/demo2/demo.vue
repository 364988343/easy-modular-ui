<template>
  <em-panel page header footer title="表单运行" icon="detail">
    <em-form-design-run ref="design" :design="design"></em-form-design-run>

    <template v-slot:footer>
      <em-button type="success" size="small" @click="onSubmit">提交</em-button>
      <em-button type="info" size="small" @click="closePage">关闭</em-button>
    </template>
  </em-panel>
</template>
<script>
import page from '@packages/mixins/components/page'
export default {
  mixins: [page],
  data() {
    return {
      design: {
        form: {
          colNum: 1,
          size: 'medium',
          labelPosition: 'right',
          labelWidth: 100
        },
        elements: [
          {
            tag: 'el-input',
            name: '单行文本',
            icon: 'detail',
            group: 'base',
            sort: 1,
            required: true,
            span: null,
            label: '单行文本',
            fieldName: 'field_e2ad040bc1554c60a9629c4719b21c8c',
            attributes: {
              placeholder: '请输入',
              disabled: false,
              size: 'small'
            }
          },
          {
            tag: 'el-input',
            name: '多行文本',
            icon: 'detail',
            group: 'base',
            sort: 2,
            required: true,
            span: null,
            label: '多行文本',
            fieldName: 'field_c805fc8b9a2343e283c9c910b2791991',
            attributes: {
              type: 'textarea',
              rows: 3,
              placeholder: '请输入',
              disabled: false,
              size: 'small'
            }
          },
          {
            tag: 'el-select',
            name: '下拉选择',
            icon: 'detail',
            group: 'base',
            sort: 3,
            required: true,
            span: null,
            label: '下拉选择',
            fieldName: 'field_d238cda8efa94e0db77fb5df71e03674',
            attributes: {
              placeholder: '请选择',
              disabled: false,
              size: 'small'
            },
            children: [
              {
                tag: 'el-option',
                attributes: {
                  label: '选项1',
                  value: '选项1'
                }
              }
            ]
          },
          {
            tag: 'em-editor',
            name: '编辑器',
            icon: 'detail',
            group: 'advanced',
            sort: 1,
            required: true,
            span: null,
            label: '编辑器',
            fieldName: 'field_ed6ac9715b4a4c4eb9aa85f172ded70a',
            attributes: {
              placeholder: '请输入',
              disabled: false,
              id: 'editor',
              height: 300
            }
          }
        ]
      }
    }
  },
  methods: {
    /**
     * @description:提交
     * @param {*}
     */
    onSubmit(model) {
      this.$refs.design.$refs.form.validate((valid) => {
        if (valid) {
          console.log(this.$refs.design.model)
          this._success('保存成功')
        }
      })
    }
  }
}
</script>
