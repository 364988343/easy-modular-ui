<template>
  <div class="em-form-item-tip">
    <div class="em-form-item-tip-label">{{ label }}</div>
    <el-popover :placement="placement" :title="title" :width="width" :trigger="trigger" :content="content">
      <em-icon class="em-form-item-tip-icon" slot="reference" :name="icon" size="14px" :color="iconColor"></em-icon>
    </el-popover>
  </div>
</template>

<script>
export default {
  name: 'form-item-tip',
  props: {
    //标签
    label: String,
    //标题
    title: String,
    //显示的内容
    content: String,
    //宽度
    width: {
      type: [String, Number],
      default: 200
    },
    //出现位置(top/top-start/top-end/bottom/bottom-start/bottom-end/left/left-start/left-end/right/right-start/right-end)
    placement: {
      type: String,
      default: 'right-start'
    },
    //触发方式(click/focus/hover/manual)
    trigger: {
      type: String,
      default: 'hover'
    },
    //图标
    icon: {
      type: String,
      default: 'question-circle-fill'
    },
    //图标颜色
    iconColor: {
      type: String,
      default: '#909399'
    }
  }
}
</script>
