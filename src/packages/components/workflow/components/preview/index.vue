<template>
  <em-drawer class="em-workflow-preview" header footer title="流程预览" icon="search" draggable :visible.sync="visible_" width="900px" :padding="0">
    <pre v-highlightjs="JSON.stringify(this.workflow, null, 4)"><code class="json"></code></pre>
    
    <template v-slot:footer>
      <em-button type="info" size="small" @click="visible_ = false">关闭</em-button>
    </template>
  </em-drawer>
</template>

<script>
import visible from '../../../../mixins/components/visible'
export default {
  mixins: [visible],
  props: { workflow: Object }
}
</script>
