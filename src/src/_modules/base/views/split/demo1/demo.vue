<template>
  <em-split v-model="split">
    <template v-slot:left>
       <em-panel page noPadding noBorder>左侧面板</em-panel>
    </template>
    <template v-slot:right>
      <em-split v-model="split1" mode="vertical">
        <template v-slot:top>
           <em-panel page noPadding noBorder>上方面板</em-panel>
        </template>
        <template v-slot:bottom>
           <em-panel page noPadding noBorder>下方面板</em-panel>
        </template>
      </em-split>
    </template>
  </em-split>
</template>
<script>
export default {
  data() {
    return {
      split: 0.3,
      split1: 0.3
    }
  }
}
</script>
