<template>
  <div class="em-code-preview" :class="{ show: visible }">
    <em-button class="em-code-preview-btn" type="danger" icon="code" @click="onCBtnlick" />
    <em-drawer class="em-code-preview-drawer" v-bind="drawer" :visible.sync="visible">
      <template v-slot:toolbar>
        <em-button icon="transmit" @click="run" />
      </template>
      <pre v-highlightjs="code"><code class="html"></code></pre>
    </em-drawer>
  </div>
</template>
<script>
export default {
  data() {
    return {
      visible: false,
      drawer: {
        header: true,
        title: '代码预览',
        icon: 'search',
        width: '50%',
        draggable: true,
        padding: 0
      },
      timer: null
    }
  },
  props: ['code'],
  methods: {
    onCBtnlick() {
      this.visible = !this.visible
    },
    run() {
      window.addEventListener('message', this.receiveMessage, false)
      const runUrl = window.location.href.split('#')[0] + '#/run'
      const runWindow = window.open(runUrl, '_blank')
      this.timer = setInterval(() => {
        runWindow.postMessage(this.code, runUrl)
      }, 300)
    },
    receiveMessage(event) {
      if (this.timer && event.origin === window.location.origin) {
        clearInterval(this.timer)
      }
    }
  }
}
</script>
<style lang="scss">
.em-code-preview {
  &-btn {
    padding: 0;
    position: absolute;
    right: 10px;
    bottom: 40px;
    width: 44px;
    height: 44px;
    line-height: 44px;
    border-radius: 22px;
    font-size: 1.5rem;
    text-align: center;
    z-index: 9999;
    transition: all 0.3s ease-in-out;
  }

  pre {
    height: 100%;

    code {
      height: 100%;
      overflow: auto;
      box-sizing: border-box;
    }
  }
}
.em-code-preview-drawer {
  .em-drawer-modal,
  .em-drawer-dialog {
    z-index: 10086;
  }
}
</style>
