<template>
  <div ref="details" class="em-details" v-loading="loading" :element-loading-text="loadingText" :element-loading-background="loadingBackground" :element-loading-spinner="loadingSpinner">
    <el-descriptions v-bind="descriptions">
      <template v-for="(col, i) in cols">
        <el-descriptions-item :key="i" :labelStyle="{ width: labelWidth, 'text-align': 'right' }">
          <template slot="label">
            <slot :name="'col-label-' + col.name" :label="col.label">
              {{ col.label }}
            </slot>
          </template>
          <slot :name="'col-content-' + col.name" :value="model_[col.name]">
            {{ model_[col.name] }}
          </slot>
        </el-descriptions-item>
      </template>
    </el-descriptions>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'Details',
  data() {
    return {
      model_: {},
      loading_: false,
      descriptions: {
        title: this.title,
        border: !this.noBorder,
        column: this.column,
        direction: this.direction,
        size: this.size || this.fontSize,
        colon: this.colon
      }
    }
  },
  props: {
    // 标题文本，显示在左上方
    title: String,
    //一行 Descriptions Item 的数量
    column: {
      type: Number,
      default: 2
    },
    //标签的宽度
    labelWidth: {
      type: String,
      default: '160px'
    },
    //排列的方向 vertical / horizontal
    direction: {
      type: String,
      default: 'horizontal'
    },
    //列表的尺寸 medium / small / mini
    size: String,
    //是否显示冒号
    colon: {
      type: Boolean,
      default: true
    },
    // 查询方法
    action: Function,
    // 模型数据
    model: Object,
    // 栏位
    cols: {
      type: Array,
      default() {
        return []
      }
    },
    // 不显示loading
    noLoading: Boolean,
    // 不包含外边框
    noBorder: Boolean,
    // 是否创建时查询一次
    queryOnCreated: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    ...mapState('app/loading', { loadingText: 'text', loadingBackground: 'background', loadingSpinner: 'spinner' }),
    loading() {
      return !this.noLoading && this.loading_
    }
  },
  methods: {
    /**
     * @description: 查询数据
     * @param {*}
     */
    query() {
      if (this.action && typeof this.action === 'function') {
        this.loading_ = true
        this.action()
          .then((data) => {
            this.model_ = data
            this.loading_ = false
          })
          .catch(() => {
            this.loading_ = false
          })
      }
    }
  },
  mounted() {
    if (this.queryOnCreated) this.query()
    if (this.model) this.model_ = this.model
  },
  watch: {
    model(val) {
      if (val) this.model_ = val
    }
  }
}
</script>

<style>
.my-label {
  width: 120px !important;
}

.my-content {
}
</style>
