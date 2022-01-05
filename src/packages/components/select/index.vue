<template>
  <div class="em-select">
    <el-select v-bind="select" v-on="on" v-model="value_" v-loading="loading">
      <el-option
        v-for="item in optionList"
        :key="valueKey ? item[valueKey] : item.value"
        :label="labelKeys ? getLabel(item) : item.label"
        :value="valueKey ? item[valueKey] : item.value"
        :disabled="item.disabled"
      >
        <template v-if="labelKeys && labelKeys.length > 0">
          <span v-for="(label, index) in labelKeys.split(',')" :key="index + ''" class="em-select-item">{{ item[label] }}</span>
        </template>
        <span v-else>{{ item.label }}</span>
      </el-option>

      <template v-slot:prefix>
        <slot name="prefix"></slot>
      </template>

      <template v-slot:empty>
        <slot name="empty"></slot>
      </template>
    </el-select>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Select',
  data() {
    return { value_: '', loading: false, optionList: [] }
  },
  props: {
    //值
    value: {
      type: [String, Number, Array],
      default: ''
    },
    //选项
    options: Array,
    //查询方法
    action: Function,
    //选项的值的属性
    valueKey: String,
    //选项的文本的属性（可多个，英文逗号隔开）
    labelKeys: String,
    //尺寸，默认按照框架的字号设置
    size: String,
    // 多选
    multiple: Boolean,
    //多选时用户最多可以选择的项目数，为 0 则不限制
    multipleLimit: {
      type: Number,
      default: 0
    },
    // 可清空
    clearable: {
      type: Boolean,
      default: true
    },
    // 不显示loading
    noLoading: Boolean,
    // 禁用
    disabled: Boolean,
    // 是否可搜索
    filterable: Boolean,
    //自动完成
    autoComplete: Boolean,
    //自动完成模式下激活即获取数据
    triggerOnFocus: {
      type: Boolean,
      default: true
    },
    //创建条目
    allowCreate: {
      type: Boolean,
      default: false
    },
    //占位符
    placeholder: {
      type: String,
      default: '请选择...'
    }
  },
  computed: {
    ...mapState('app/loading', { loadingText: 'text', loadingBackground: 'background', loadingSpinner: 'spinner' }),
    select() {
      return {
        size: this.size || this.fontSize,
        multiple: this.multiple,
        multipleLimit: this.multipleLimit,
        clearable: this.clearable,
        disabled: this.disabled,
        filterable: this.filterable,
        allowCreate: this.allowCreate,
        placeholder: this.placeholder,
        remote: this.autoComplete,
        remoteMethod: this.getData,
        elementLoadingText: this.loadingText,
        elementLoadingBackground: this.loadingBackground,
        elementLoadingSpinner: this.loadingSpinner
      }
    },
    on() {
      return {
        change: this.onChange,
        visibleChange: this.onVisibleChange,
        removeTag: this.onRemoveTag,
        clear: this.onClear,
        blur: this.onClear,
        focus: this.onFocus
      }
    },
    labelKeys_() {
      return this.labelKeys.split(',')
    }
  },
  watch: {
    value: {
      handler(n, o) {
        if (n != o) this.value_ = n
      },
      immediate: true
    }
  },
  methods: {
    /**
     * @description: 获取数据
     * @param {*}
     */
    getData(val) {
      if (this.options) {
        this.optionList = this.options
        return
      }

      if (this.action && typeof this.action === 'function') {
        this.loading = !this.noLoading
        this.action(val)
          .then((data) => {
            this.optionList = data
            this.loading = false
          })
          .catch(() => {
            this.loading = false
          })
      }
    },

    /**
     * @description: 获取label
     * @param {*} data
     */
    getLabel(data) {
      let result = ''
      const arr = this.labelKeys.split(',')
      arr.forEach((m) => {
        result += data[m] + ' '
      })
      return result
    },

    /**
     * @description: 刷新数据
     * @param {*}
     */
    refresh() {
      this.getData()
    },

    /**
     * @description: 选中值发生变化时触发
     * @param {*}
     */
    onChange(val) {
      this.$emit('input', val)

      let valueKey = this.valueKey || 'value'

      let data = new Array()
      if (this.multiple) {
        val.forEach((m) => {
          const item = this.optionList.find((opt) => opt[valueKey] === m)
          if (item) data.push(item)
        })
      } else {
        const item = this.optionList.find((opt) => opt[valueKey] === val)
        if (item) data.push(item)
      }

      this.$emit('change', val, data)
      if (this.allowCreate && data.length === 0) this.$emit('create-item', val)
    },

    /**
     * @description: 下拉框出现/隐藏时触发
     * @param {*}
     */
    onVisibleChange(visible) {
      this.$emit('visibleChange', visible)
    },

    /**
     * @description: 多选模式下移除tag时触发
     * @param {*}
     */
    onRemoveTag(val) {
      this.$emit('removeTag', val)
    },

    /**
     * @description: 可清空的单选模式下用户点击清空按钮时触发
     * @param {*}
     */
    onClear() {
      this.$emit('clear')
    },

    /**
     * @description: 当 input 失去焦点时触发
     * @param {*}
     */
    onBlur(event) {
      this.$emit('blur', event)
    },

    /**
     * @description: 当 input 获得焦点时触发
     * @param {*}
     */
    onFocus(event) {
      if (this.autoComplete && this.triggerOnFocus) this.getData()
      this.$emit('focus', event)
    }
  },
  created() {
    if (!this.autoComplete) this.getData()
  }
}
</script>
