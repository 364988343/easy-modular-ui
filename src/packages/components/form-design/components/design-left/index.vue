<template>
  <div class="em-form-design-left">
    <template v-for="group in groups">
      <div class="component-group" :key="group.code">
        <div class="component-group-title">{{ group.name }}</div>
        <draggable class="component-list" :group="{ name: 'design', pull: 'clone', put: false }" :list="elements.filter((m) => m.group == group.code)" :clone="cloneElement" @end="onEnd">
          <div class="component-item" v-for="ele in elements.filter((m) => m.group == group.code)" :key="ele.name" @click="onClick(ele)" @mouseover="onClick(ele)">
            <div class="component-item-icon">
              <em-icon :name="ele.icon"></em-icon>
            </div>
            <div class="component-item-txt">{{ ele.name }}</div>
          </div>
        </draggable>
      </div>
    </template>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import { v4 as uuidv4 } from 'uuid'
export default {
  props: {
    elements: {
      type: Array,
      default: () => []
    }
  },
  components: { draggable },
  data() {
    return {
      curElement: {},
      groups: [
        { code: 'base', name: '基础组件' },
        { code: 'advanced', name: '高级组件' }
      ]
    }
  },
  methods: {
    /**
     * @description: 拖拉结束
     * @param {*}
     */
    onEnd(e) {
      if (e.from !== e.to) {
        this.$emit('change', this.curElement)
      }
    },

    /**
     * @description:复制组件
     * @param {*} origin
     */
    cloneElement(origin) {
      let target = this.$_.cloneDeep(origin)
      target.fieldName = `field_${uuidv4().replaceAll('-', '')}`
      this.curElement = target
      return target
    },

    /**
     * @description: 点击事件
     * @param {*}
     */
    onClick(ele) {}
  }
}
</script>
