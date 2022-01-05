<template>
  <em-dialog v-bind="dialog" :visible.sync="visible_" @close="onClose">
    <div class="release-log">
      <el-timeline>
        <el-timeline-item v-for="(item, index) in list" :key="index" :timestamp="item.version" placement="top" :icon="item.icon" :color="item.color">
          <el-card>
            <div class="content"><em-icon class="release-log-icon" name="flag" /> {{ item.content }}</div>
            <div class="time"><em-icon class="release-log-icon" name="timer" /> {{ item.releaseTime }}</div>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </div>
  </em-dialog>
</template>

<script>
import { mapState } from 'vuex'
import cache from '../../utils/cache'
import visible from '../../mixins/components/visible'
export default {
  name: 'release-log',
  mixins: [visible],
  data() {
    return {
      list: [],
      dialog: {
        title: '系统信息',
        icon: 'app',
        width: '700px',
        height: '500px',
        footer: false,
        padding: 16
      }
    }
  },
  computed: {
    ...mapState('app/system', { actions: (s) => s.actions, version: (s) => s.config.version })
  },
  methods: {
    onClose() {
      const key = `view-release-${this.user.id}`
      cache.remove(key)
      cache.set(key, this.version)
    }
  },
  async created() {
    const result = await this.actions.getreleaseLog()
    const data = result.map((m) => {
      return {
        version: m.version,
        content: m.content,
        releaseTime: this.$dayjs(m.releaseTime).format('YYYY-MM-DD'),
        icon: 'el-icon-more',
        color: '#E4E7ED'
      }
    })
    if (data && data.length > 0) {
      data[0].icon = 'el-icon-loading'
      data[0].color = '#00a29a'
    }

    this.list = data
  }
}
</script>
<style lang="scss" scoped>
.release-log-icon {
  color: #00a29a;
}
.content {
  margin-bottom: 12px;
}
.time {
  color: #ccc9c9;
  font-size: 12px;
}
</style>
