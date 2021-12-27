<template>
  <div class="em-icon-picker">
    <div class="em-icon-picker-input">
      <el-input :placeholder="placeholder" v-model="icon" @change="onChange" :disabled="disabled">
        <template v-slot:prepend>
          <em-icon :name="icon" />
        </template>
       <el-button slot="append" icon="el-icon-search" @click="selectShow = true"></el-button>
      </el-input>
    </div>
    
    <icon-select :visible.sync="selectShow" @success="onSelect" />
  </div>
</template>
<script>
import iconSelect from './icon-select'
export default {
  name: 'icon-picker',
  components: { iconSelect },
  data() {
    return {
      icon: this.value,
      selectShow: false
    }
  },
  props: {
    //图标值
    value: String,
    //占位符
    placeholder: String,
    //是否禁用
    disabled: Boolean
  },
  methods: {
    /**
     * @description: 文本框变化事件
     * @param {*} val
     */
    onChange(val) {
      this.$emit('input', val)
    },

    /**
     * @description: 选择图标事件
     * @param {*} icon
     */
    onSelect(icon) {
      if (icon !== '') {
        this.icon = icon
        this.onChange(icon)
      }
    }
  },
  watch: {
    value: {
      handler(n, o) {
        if (n != o) this.icon = n
      },
      immediate: true
    }
  }
}
</script>
