<template>
  <div ref="outerWrapper" :class="wrapperClasses" v-loading="loading" :element-loading-text="loadingText" :element-loading-background="loadingBackground" :element-loading-spinner="loadingSpinner">
    <!--水平割分-->
    <div v-if="isHorizontal" class="em-split-horizontal">
      <div :style="{ right: `${anotherOffset}%` }" class="left-panel" :class="panelClasses">
        <slot name="left" />
      </div>
      <div class="em-split-trigger-con" :style="{ left: `${offset}%` }" @mousedown="handleMousedown">
        <slot name="trigger">
          <trigger mode="vertical" />
        </slot>
      </div>
      <div :style="{ left: `${offset}%` }" class="right-panel" :class="panelClasses">
        <slot name="right" />
      </div>
    </div>
    <!--垂直割分-->
    <div v-else class="em-split-vertical">
      <div :style="{ bottom: `${anotherOffset}%` }" class="top-panel" :class="panelClasses">
        <slot name="top" />
      </div>
      <div class="em-split-trigger-con" :style="{ top: `${offset}%` }" @mousedown="handleMousedown">
        <slot name="trigger">
          <trigger mode="horizontal" />
        </slot>
      </div>
      <div :style="{ top: `${offset}%` }" class="bottom-panel" :class="panelClasses">
        <slot name="bottom" />
      </div>
    </div>
  </div>
</template>

<script>
// 从iView迁移
import { mapState } from 'vuex'
import trigger from './trigger.vue'
export default {
  name: 'split',
  components: { trigger },
  data() {
    return {
      offset: 0,
      oldOffset: 0,
      isMoving: false
    }
  },
  props: {
    //分割比例
    value: {
      type: [Number, String],
      default: 0.5
    },
    //分割模式，水平/垂直
    mode: {
      validator(value) {
        return value === 'horizontal' || value === 'vertical'
      },
      default: 'horizontal'
    },
    //最小值
    min: {
      type: [Number, String],
      default: '40px'
    },
    //最大值
    max: {
      type: [Number, String],
      default: '40px'
    },
    //显示加载动画
    loading: Boolean
  },
  computed: {
    ...mapState('app/loading', { loadingText: 'text', loadingBackground: 'background', loadingSpinner: 'spinner' }),
    wrapperClasses() {
      return ['em-split-wrapper', this.isMoving ? 'no-select' : '']
    },
    panelClasses() {
      return [
        'em-split-panel',
        {
          ['em-split-panel-moving']: this.isMoving
        }
      ]
    },
    isHorizontal() {
      return this.mode === 'horizontal'
    },
    anotherOffset() {
      return 100 - this.offset
    },
    valueIsPx() {
      return typeof this.value === 'string'
    },
    offsetSize() {
      return this.isHorizontal ? 'offsetWidth' : 'offsetHeight'
    },
    computedMin() {
      return this.getComputedThresholdValue('min')
    },
    computedMax() {
      return this.getComputedThresholdValue('max')
    }
  },
  methods: {
    /**
     * @description: px转化百分比
     * @param {*} numerator 分子
     * @param {*} denominator 分母
     */
    px2percent(numerator, denominator) {
      return parseFloat(numerator) / parseFloat(denominator)
    },

    /**
     * @description: 获取分割的阈值
     * @param {*} type
     */
    getComputedThresholdValue(type) {
      let size = this.$refs.outerWrapper[this.offsetSize]
      if (this.valueIsPx) return typeof this[type] === 'string' ? this[type] : size * this[type]
      else return typeof this[type] === 'string' ? this.px2percent(this[type], size) : this[type]
    },

    /**
     * @description: 获取最小值
     * @param {*} value1
     * @param {*} value2
     */
    getMin(value1, value2) {
      if (this.valueIsPx) return `${Math.min(parseFloat(value1), parseFloat(value2))}px`
      else return Math.min(value1, value2)
    },

    /**
     * @description: 获取最大值
     * @param {*} value1
     * @param {*} value2
     */
    getMax(value1, value2) {
      if (this.valueIsPx) return `${Math.max(parseFloat(value1), parseFloat(value2))}px`
      else return Math.max(value1, value2)
    },

    /**
     * @description: 获取剩余大小
     * @param {*} value
     */
    getAnotherOffset(value) {
      let res = 0
      if (this.valueIsPx) res = `${this.$refs.outerWrapper[this.offsetSize] - parseFloat(value)}px`
      else res = 1 - value
      return res
    },

    /**
     * @description: 处理拖动事件
     * @param {*} e
     */
    handleMove(e) {
      let pageOffset = this.isHorizontal ? e.pageX : e.pageY
      let offset = pageOffset - this.initOffset
      let outerWidth = this.$refs.outerWrapper[this.offsetSize]
      let value = this.valueIsPx ? `${parseFloat(this.oldOffset) + offset}px` : this.px2percent(outerWidth * this.oldOffset + offset, outerWidth)
      let anotherValue = this.getAnotherOffset(value)
      if (parseFloat(value) <= parseFloat(this.computedMin)) value = this.getMax(value, this.computedMin)
      if (parseFloat(anotherValue) <= parseFloat(this.computedMax)) value = this.getAnotherOffset(this.getMax(anotherValue, this.computedMax))
      e.atMin = this.value === this.computedMin
      e.atMax = this.valueIsPx ? this.getAnotherOffset(this.value) === this.computedMax : this.getAnotherOffset(this.value).toFixed(5) === this.computedMax.toFixed(5)
      this.$emit('input', value)
      this.$emit('on-moving', e)
    },

    /**
     * @description: 鼠标释放触发的事件
     * @param {*}
     */
    handleUp() {
      this.isMoving = false
      document.removeEventListener('mousemove', this.handleMove, false)
      document.removeEventListener('mouseup', this.handleUp, false)
      this.$emit('on-move-end')
    },

    /**
     * @description: 按下鼠标键时触发的事件
     * @param {*} e
     */
    handleMousedown(e) {
      this.initOffset = this.isHorizontal ? e.pageX : e.pageY
      this.oldOffset = this.value
      this.isMoving = true
      document.addEventListener('mousemove', this.handleMove, false)
      document.addEventListener('mouseup', this.handleUp, false)
      this.$emit('on-move-start')
    },
    computeOffset() {
      this.offset = ((this.valueIsPx ? this.px2percent(this.value, this.$refs.outerWrapper[this.offsetSize]) : this.value) * 10000) / 100
    }
  },
  watch: {
    value() {
      this.computeOffset()
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.computeOffset()
    })

    window.addEventListener('resize', () => {
      this.computeOffset()
    })
  }
}
</script>
