<template>
  <div class="em-icon-picker">
    <div class="em-icon-picker-input">
      <el-input :placeholder="placeholder" v-model="icon" @change="onChange">
        <template v-slot:prepend>
          <em-icon :name="icon" />
        </template>
      </el-input>
    </div>
    <div class="em-icon-picker-button">
      <em-button icon="search" @click="panelVisible = true" />
    </div>
    <panel :visible.sync="panelVisible" @success="onSelect" />
  </div>
</template>
<script>
import Panel from './panel'
export default {
  name: 'icon-picker',
  components: { Panel },
  data() {
    return {
      icon: this.value,
      panelVisible: false
    }
  },
  props: {
    value: String,
    placeholder: String
  },
  methods: {
    onChange(val) {
      this.$emit('input', val)
    },
    onSelect(icon) {
      if (icon !== '') {
        this.icon = icon
        this.onChange(icon)
      }
    },
    reset() {
      this.icon = ''
      this.onChange('')
    }
  },
  watch: {
    value() {
      this.icon = this.value
    }
  }
}
</script>
