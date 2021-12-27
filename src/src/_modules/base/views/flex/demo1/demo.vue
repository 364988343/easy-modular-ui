<template>
  <em-panel page>
    <em-split v-model="split">
      <template v-slot:left>
        <em-panel page noPadding noBorder>
          <em-flex direction="row" fix-mode="left" height="500px" fix="150px">
            <template v-slot:left>
              <div class="page em-bg-success">
                <p class="em-text-whrite">这里宽度是固定的</p>
              </div>
            </template>
            <template v-slot:right>
              <div class="page em-bg-warning">
                <p class="em-text-whrite">这里宽度是弹性的</p>
              </div>
            </template>
          </em-flex>
        </em-panel>
      </template>
      <template v-slot:right>
        <em-split v-model="split1" mode="vertical">
          <template v-slot:top>
            <em-panel page>
              <em-flex fix-mode="top" fix="150px">
                <template v-slot:top>
                  <div class="page em-bg-success">
                    <p class="em-text-whrite">这里高度是固定的</p>
                  </div>
                </template>
                <template v-slot:bottom>
                  <div class="page em-bg-warning">
                    <p class="em-text-whrite">这里高度是弹性的</p>
                  </div>
                </template>
              </em-flex>
            </em-panel>
          </template>
          <template v-slot:bottom>
            <em-panel page />
          </template>
        </em-split>
      </template>
    </em-split>
  </em-panel>
</template>
<script>
export default {
  data() {
    return {
      split: 0.5,
      split1: 0.5
    }
  }
}
</script>
