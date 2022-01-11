<template>
  <div class="em-autocomplete">
    <el-autocomplete class="inline-input" v-model="value_" v-bind="autocomplete" v-on="on" v-loading="loading" style="width: 100%">
      <template slot-scope="{ item }">
        <template v-if="labelKeys && labelKeys.length > 0">
          <span v-for="(label, index) in labelKeys.split(',')" :key="index + ''" class="em-autocomplete-item">{{ item[label] }}</span>
        </template>
        <span v-else>{{ item[valueKey] }}</span>
      </template>

      <template v-slot:prefix>
        <slot name="prefix"></slot>
      </template>

      <template v-slot:suffix>
        <slot name="suffix"></slot>
      </template>

      <template v-slot:prepend>
        <slot name="prepend"></slot>
      </template>

      <template v-slot:append>
        <slot name="append"></slot>
      </template>
    </el-autocomplete>
  </div>
</template>

<script>
export default {
  name: 'autocomplete',
  data() {
    return {
      value_: '',
      loading: false
    }
  },
  props: {
    //值
    value: String,
    //查询方法
    action: Function,
    //自动完成模式下激活即获取数据
    triggerOnFocus: {
      type: Boolean,
      default: true
    },
    //选项的值的键名
    valueKey: {
      type: String,
      default: 'value'
    },
    //选项的文本的键名（可多个，英文逗号隔开）
    labelKeys: {
      type: String,
      default: 'value'
    },
    //尺寸，默认按照框架的字号设置
    size: String,
    // 不显示loading
    noLoading: Boolean,
    // 禁用
    disabled: Boolean,
    //获取输入建议的去抖延时
    debounce: {
      type: Number,
      default: 300
    },
    //菜单弹出位置
    placement: {
      type: String,
      default: 'bottom-start'
    },
    //占位符
    placeholder: {
      type: String,
      default: '请输入关键字'
    }
  },
  computed: {
    autocomplete() {
      return {
        size: this.size || this.fontSize,
        triggerOnFocus: this.triggerOnFocus,
        valueKey: this.valueKey,
        disabled: this.disabled,
        debounce: this.debounce,
        placeholder: this.placeholder,
        placement: this.placement,
        hideLoading: false,
        fetchSuggestions: this.query
      }
    },
    on() {
      return {
        select: this.onSelect,
        change: this.onChange
      }
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
     * @description: 查询
     * @param {*} params
     */
    query(queryString, cb) {
      if (this.action && typeof this.action === 'function') {
        this.loading = !this.noLoading
        this.action(queryString)
          .then((data) => {
            cb(data)
            this.loading = false
          })
          .catch(() => {
            this.loading = false
          })
      }
    },

    /**
     * @description: 点击选中建议项时触发
     * @param {*}
     */
    onSelect(data) {
      this.$emit('select', data)
    },

    /**
     * @description: 在 Input 值改变时触发
     * @param {*}
     */
    onChange(data) {
     this.$emit('change', data)
    }
  }
}
</script>
