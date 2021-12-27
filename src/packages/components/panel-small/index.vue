<template>
  <div :class="class_">
    <div class="em-panel-small-title">
      <div class="em-panel-small-title-icon">
        <em-icon :name="icon" />
      </div>
      <div class="em-panel-small-title-label">{{ label }}</div>
    </div>

    <div class="em-panel-small-value">
      <em-count-up :endVal="value"></em-count-up>
    </div>

    <div class="em-panel-small-bg-icon">
      <em-icon :name="icon" />
    </div>

    <div class="em-panel-small-more" v-if="more" @click="onMore">
      更多
      <em-icon name="doubleright" size="12px" />
    </div>
  </div>
</template>
<script>
export default {
  name: 'panel-small',
  props: {
    //文本
    label: String,
    //值
    value: Number,
    //图标
    icon: String,
    //显示更多
    more: Boolean,
    //类型
    type: {
      type: String,
      default: 'success'
    },
    //自定义样式
    customClass: String
  },
  computed: {
    class_() {
      let classArr = ['em-panel-small']
      if (this.customClass) classArr.push(this.customClass)
      else classArr.push(this.type)
      
      return classArr
    }
  },
  methods: {
    onMore() {
      this.$emit('more')
    }
  }
}
</script>
