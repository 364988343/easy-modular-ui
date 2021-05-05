<template>
  <em-container>
    <div>
      <slot />
    </div>
    <em-panel class="em-tmpl" page header :title="title" :icon="icon">
      <el-tabs v-model="activeName">
        <el-tab-pane label="属性(Attributes)" name="attrs"> <em-attributes v-if="attrs" :data="attrs" /></el-tab-pane>
        <el-tab-pane label="方法(Method)" name="methods"> <em-methods v-if="methods" :data="methods" /></el-tab-pane>
        <el-tab-pane label="事件(Event)" name="events"> <em-events v-if="events" :data="events" /></el-tab-pane>
        <el-tab-pane label="插槽(Slot)" name="slots"> <em-slots v-if="slots" :data="slots" /></el-tab-pane>
      </el-tabs>
    </em-panel>
  </em-container>
</template>
<script>
import EmAttributes from './components/attributes'
import EmMethods from './components/methods'
import EmEvents from './components/events'
import EmSlots from './components/slots'
export default {
  name: 'Tmpl',
  components: { EmAttributes, EmMethods, EmEvents, EmSlots },
  data() {
    return {
      activeName: 'attrs'
    }
  },
  props: {
    title: {
      type: String
    },
    icon: {
      type: String
    },
    attrs: {
      type: Array
    },
    slots: {
      type: Array
    },
    methods: {
      type: Array
    },
    events: {
      type: Array
    }
  }
}
</script>
