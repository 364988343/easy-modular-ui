<template>
  <div :class="['em-flex', direction, fixMode]" :style="{ height, width }">
    <template v-if="direction === 'column'">
      <div class="em-flex_top" :style="{ height: fixMode === 'top' ? fix : '' }">
        <slot name="top" />
      </div>
      <div class="em-flex_bottom" :style="{ height: fixMode === 'bottom' ? fix : '', paddingTop: gutter ? gutter + 'px' : 0 }">
        <slot name="bottom" />
      </div>
    </template>
    <template v-else>
      <div class="em-flex_left" :style="{ width: fixMode === 'left' ? fix : '' }">
        <slot name="left" />
      </div>
      <div class="em-flex_right" :style="{ width: fixMode === 'right' ? fix : '', paddingLeft: gutter ? gutter + 'px' : 0 }">
        <slot name="right" />
      </div>
    </template>
  </div>
</template>
<script>
export default {
  name: 'Flex',
  props: {
    // 布局方向，对应flex-direction属性
    direction: {
      type: String,
      validator(value) {
        return value === 'column' || value === 'row'
      },
      default: 'column'
    },
    // 固定宽度或高度
    fix: {
      type: String,
      required: true
    },
    // 固定模式，top、bottom、left、right
    fixMode: {
      type: String,
      validator(value) {
        return ['top', 'bottom', 'left', 'right'].includes(value)
      },
      default: 'top'
    },
    height: {
      type: String,
      default: '100%'
    },
    width: {
      type: String,
      default: '100%'
    },
    /** 间隔 */
    gutter: Number
  }
}
</script>
