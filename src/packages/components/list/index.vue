<template>
  <div :class="class_" v-loading="showLoading" :element-loading-text="loadingText || loadingText_" :element-loading-background="loadingBackground" :element-loading-spinner="loadingSpinner">
    <!--头部-->
    <list-header v-if="!noHeader" v-bind="header">
      <template v-slot:toolbar>
        <slot name="header-toolbar" :total="total" :selection="selection" />
      </template>
    </list-header>

    <!--查询栏-->
    <querybar ref="querybar" v-if="!noQuerybar" v-bind="querybar" @reset="onQueryBarReset">
      <template v-slot>
        <slot name="querybar" />
      </template>
      <template v-slot:query-more>
        <slot name="querybar-more" />
      </template>
      <template v-slot:buttons>
        <slot name="querybar-buttons" :total="total" :selection="selection" />
      </template>
    </querybar>

    <!--操作栏-->
    <div class="em-list-operatebar" v-if="!noOperateBar">
      <slot name="operatebar" :total="total"></slot>
    </div>

    <!--表格-->
    <div class="em-list-body">
      <div class="em-list-body-table">
        <el-table ref="table" v-bind="table" v-on="tableOn" :data="rows">
          <!-- 多选 -->
          <el-table-column v-if="multiple" fixed="left" align="center" type="selection" width="55" />

          <!-- 序号 -->
          <el-table-column v-if="showNo" fixed="left" align="center" type="index" :index="getNo" label="#">
            <template slot-scope="{ row, $index }">
              <div class="em-list-no">
                <slot name="col-no" :row="row">{{ getNo($index) }}</slot>
              </div>
            </template>
          </el-table-column>

          <!-- 租户 -->
          <el-table-column label="租户" :prop="tenantCol" v-if="tenantShow" header-align="center" align="left" width="200" />

          <!-- 自动生成列 -->
          <template v-for="(col, i) in cols">
            <list-column :col="col" :key="i">
              <template v-slot:[`col-${col.name}-header`]>
                <slot :name="`col-${col.name}-header`">
                  <em-icon v-if="col.icon" :name="col.icon" />
                  {{ col.label }}
                </slot>
              </template>

              <template v-slot:[`col-${col.name}`]="{ row }">
                <slot :name="'col-' + col.name" :row="row"></slot>
              </template>
            </list-column>
          </template>

          <!-- 操作列 -->
          <el-table-column v-if="!noOperateCol" :width="operationWidth" fixed="right" align="center" label="操作">
            <template v-slot:header>
              <slot name="col-operation-header">操作</slot>
            </template>
            <template slot-scope="{ row }">
              <div class="em-list-operation">
                <slot name="col-operation" :row="row" :rows="rows" />
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>

    <!--底部-->
    <list-footer v-if="!noFooter" v-model="page" :page-sizes="pageSizes" :total="total" :columns.sync="cols" :no-select-column="noSelectColumn">
      <slot name="footer" :total="total" :selection="selection" :data="data" />
    </list-footer>
    <slot />
  </div>
</template>
<script>
import { mapState } from 'vuex'
import def from './default.js'
import listHeader from './components/header'
import listColumn from './components/column'
import listFooter from './components/footer'
import querybar from './components/querybar'

export default {
  name: 'List',
  components: { listHeader, listColumn, listFooter, querybar },
  data() {
    return {
      loading_: false,
      fullscreen: false,
      // 分页数据
      page: {
        index: 1,
        size: 15,
        sort: []
      },
      // 数据列表
      rows: [],
      // 扩展数据
      data: '',
      // 总数量
      total: 0,
      selection: []
    }
  },
  props: {
    //标题
    title: String,
    //图标
    icon: String,
    // 查询方法
    action: {
      type: Function,
      required: true
    },
    // 模型
    model: Object,
    //模型验证规则
    rules: Object,
    //表格高度
    height: {
      type: String,
      default: '100%'
    },
    // 列数组
    cols: {
      type: Array,
      default() {
        return []
      }
    },
    //多选
    multiple: Boolean,
    //显示序号
    showNo: {
      type: Boolean,
      default: true
    },
    //不显示操作列
    noOperateCol: Boolean,
    //操作列宽度
    operationWidth: [String, Number],
    //不显示选择列按钮
    noSelectColumn: Boolean,
    //不显示查询栏
    noQuerybar: Boolean,
    //查询表单标签宽度
    queryBarLabelWidth: String,
    //不显示全屏按钮
    noFullscreen: Boolean,
    //不显示刷新按钮
    noRefresh: Boolean,
    //不显示头部
    noHeader: Boolean,
    //不显示操作栏
    noOperateBar: Boolean,
    //不显示底部
    noFooter: Boolean,
    //不包含搜索功能
    noSearch: Boolean,
    //不显示重置按钮
    noReset: Boolean,
    //不显示折叠按钮
    noCollapse: Boolean,
    //合并行列的方法
    spanMethod: {
      type: Function,
      default: function ({ row, column, rowIndex, columnIndex }) {
        const span = column['property'] + '-span'
        if (row[span]) {
          return row[span]
        }
      }
    },
    //加载中动画
    loading: Boolean,
    //加载中文本
    loadingText: String,
    //创建后执行一次查询
    queryOnCreated: {
      type: Boolean,
      default: true
    },
    //页数选择项
    pageSizes: {
      type: Array,
      default() {
        return [10, 15, 50, 100]
      }
    },
    //渲染嵌套数据的配置选项
    treeProps: Object,
    //行数据的 Key
    rowKey: [Function, String],
    //是否懒加载子节点数据
    lazy: Boolean,
    //加载子节点数据的函数，lazy 为 true 时生效，函数第二个参数包含了节点的层级信息
    load: Function,
    //是否默认展开所有行，当 Table 包含展开行存在或者为树形表格时有效
    defaultExpandAll: Boolean,
    //合并行的列
    mergeRowCols: {
      type: Array,
      default() {
        return []
      }
    },
    //租户字段
    tenantCol: {
      type: String,
      default: 'tenantName'
    },
    //租户显示
    tenantShow: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapState('app/loading', { loadingText_: 'text', loadingBackground: 'background', loadingSpinner: 'spinner' }),
    class_() {
      let classArr = ['em-list']
      if (this.fontSize) classArr.push(`em-list-${this.fontSize}`)
      if (this.fullscreen) classArr.push('fullscreen')
      return classArr
    },
    header() {
      return { title: this.title, icon: this.icon, noFullscreen: this.noFullscreen, noRefresh: this.noRefresh, fullscreen: this.fullscreen }
    },
    querybar() {
      return {
        model: this.model,
        rules: this.rules,
        labelWidth: this.queryBarLabelWidth,
        noSearch: this.noSearch,
        noReset: this.noReset,
        noCollapse: this.noCollapse,
        noBottomBorder: this.queryBarNoBottomBorder
      }
    },
    table() {
      return {
        border: true,
        stripe: true,
        highlightCurrentRow: true,
        size: this.fontSize,
        height: this.height,
        headerRowClassName: 'em-list-body-table-header',
        data: this.rows,
        treeProps: this.treeProps,
        rowKey: this.rowKey,
        lazy: this.lazy,
        load: this.load,
        defaultExpandAll: this.defaultExpandAll,
        spanMethod: this.spanMethod
      }
    },
    tableOn() {
      return {
        select: this.onSelect,
        'select-all': this.onSelectAll,
        'selection-change': this.onSelectionChange,
        'cell-mouse-enter': this.onCellMouseEnter,
        'cell-mouse-leave': this.onCellMouseLeave,
        'cell-click': this.onCellClick,
        'cell-dblclick': this.onCellDblclick,
        'row-click': this.onRowClick,
        'row-contextmenu': this.onRowContextmenu,
        'row-dblclick': this.onRowDblclick,
        'header-click': this.onHeaderClick,
        'header-contextmenu': this.onHeaderContextmenu,
        'sort-change': this.onSortChange,
        'current-change': this.onCurrentChange,
        'expand-change': this.onExpandChange
      }
    },
    showLoading() {
      return this.loading || this.loading_
    }
  },
  methods: {
    /**
     * @description: 查询
     * @param {*}
     */
    query() {
      if (this.$refs.querybar) {
        this.$refs.querybar.validate(async (valid) => {
          if (!valid) return
          this.getData()
        })
      } else {
        this.getData()
      }
    },

    /**
     * @description: 获取数据
     * @param {*}
     */
    getData() {
      if (this.loading_) {
        return
      }

      this.loading_ = true
      let fullModel = Object.assign({}, this.model)

      // 设置分页
      fullModel.page = this.page

      this.action(fullModel)
        .then((data) => {
          this.rows = data.rows
          this.total = data.total
          if (this.mergeRowCols.length > 0) this.rows = this.mergeTableRow(this.rows, this.mergeRowCols)

          // 回到顶部
          this.$refs.table.scrollTop()
          // 重新绘制布局
          this.$refs.table.doLayout()
          this.loading_ = false

          // 查询事件
          this.$emit('query', data)
        })
        .catch(() => {
          this.loading_ = false
        })
    },

    /**
     * @description: 刷新
     * @param {*}
     */
    refresh() {
      this.page.index = 1
      this.query()
    },

    /**
     * @description: 查询表单重置
     * @param {*}
     */
    reset() {
      this.$refs.querybar.reset()
    },

    /**
     * @description: 获取序号
     * @param {*} index
     */
    getNo(index) {
      return (this.page.index - 1) * this.page.size + index + 1
    },

    /**
     * @description:滚动到顶部
     * @param {*}
     */
    scrollTop() {
      this.$nextTick(() => {
        this.$el.querySelector('.el-table__body-wrapper').scrollTop = 0
      })
    },

    /**
     * @description: 当用户手动勾选数据行的 Checkbox 时触发的事件
     * @param {*}
     */
    onSelect(selection, row) {
      this.$emit('select', selection, row)
    },

    /**
     * @description: 当用户手动勾选全选 Checkbox 时触发的事件
     * @param {*}
     */
    onSelectAll(selection) {
      this.$emit('select-all', selection)
    },

    /**
     * @description: 当选择项发生变化时会触发该事件
     * @param {*} selection
     */
    onSelectionChange(selection) {
      this.selection = selection
      this.$emit('selection-change', selection)
    },

    /**
     * @description:当单元格 hover 进入时会触发该事件
     * @param {*}
     */
    onCellMouseEnter(row, column, cell, event) {
      this.$emit('cell-mouse-enter', row, column, cell, event)
    },

    /**
     * @description: 当单元格 hover 退出时会触发该事件
     * @param {*} row
     * @param {*} column
     * @param {*} cell
     * @param {*} event
     */
    onCellMouseLeave(row, column, cell, event) {
      this.$emit('cell-mouse-leave', row, column, cell, event)
    },

    /**
     * @description: 当某个单元格被点击时会触发该事件
     * @param {*} row
     * @param {*} column
     * @param {*} cell
     * @param {*} event
     */
    onCellClick(row, column, cell, event) {
      this.$emit('cell-click', row, column, cell, event)
    },

    /**
     * @description: 当某个单元格被双击击时会触发该事件
     * @param {*} row
     * @param {*} column
     * @param {*} cell
     * @param {*} event
     */
    onCellDblclick(row, column, cell, event) {
      this.$emit('cell-dblclick', row, column, cell, event)
    },

    /**
     * @description: 当某一行被点击时会触发该事件
     * @param {*} row
     * @param {*} event
     * @param {*} column
     */
    onRowClick(row, event, column) {
      this.$emit('row-click', row, event, column)
    },

    /**
     * @description: 当某一行被鼠标右键点击时会触发该事件
     * @param {*} row
     * @param {*} event
     */
    onRowContextmenu(row, event) {
      this.$emit('row-contextmenu', row, event)
    },

    /**
     * @description:当某一行被双击时会触发该事件
     * @param {*} row
     * @param {*} event
     */
    onRowDblclick(row, event) {
      this.$emit('row-dblclick', row, event)
    },

    /**
     * @description: 当某一列的表头被点击时会触发该事件
     * @param {*} column
     * @param {*} event
     */
    onHeaderClick(column, event) {
      this.$emit('header-click', column, event)
    },

    /**
     * @description: 当某一列的表头被鼠标右键点击时触发该事件
     * @param {*} column
     * @param {*} event
     */
    onHeaderContextmenu(column, event) {
      this.$emit('header-contextmenu', column, event)
    },

    /**
     * @description:当表格的排序条件发生变化的时候会触发该事件
     * @param {*} val
     */
    onSortChange(val) {
      this.page.sort = []
      // 将排序信息转化成后端的格式
      if (val.prop !== null) {
        this.page.sort.push({ field: val.prop, type: val.order === 'ascending' ? 0 : 1 })
      }

      this.refresh()

      this.$emit('sort-change', this.page.sort, val)
    },

    /**
     * @description: 当表格的当前行发生变化的时候会触发该事件
     * @param {*} currentRow
     * @param {*} oldCurrentRow
     */
    onCurrentChange(currentRow, oldCurrentRow) {
      this.$emit('current-change', currentRow, oldCurrentRow)
    },

    /**
     * @description: 当用户对某一行展开或者关闭的时候会触发该事件
     * @param {*} currentRow
     * @param {*} expandedRows
     */
    onExpandChange(currentRow, expandedRows) {
      this.$emit('expand-change', currentRow, expandedRows)
    },

    /**
     * @description: 重新绘制布局
     * @param {*}
     */
    doLayout() {
      this.$refs.table.doLayout()
    },

    /**
     * @description: 全屏切换
     * @param {*}
     */
    triggerFullscreen() {
      this.fullscreen ? this.closeFullscreen() : this.openFullscreen()
      this.doLayout()
    },

    /**
     * @description: 开启全屏
     * @param {*}
     */
    /**  */
    openFullscreen() {
      this.fullscreen = true
      this.$emit('fullscreen-change', this.fullscreen)
    },

    /**
     * @description: 关闭全屏
     * @param {*}
     */
    closeFullscreen() {
      this.fullscreen = false
      this.$emit('fullscreen-change', this.fullscreen)
    },

    /**
     * @description: 查询栏重置事件
     * @param {*}
     */
    onQueryBarReset() {
      this.$refs.table.clearSort()
      this.$emit('reset')
    },

    /**
     * @description: 合并行
     * @param {*} row
     */
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      const span = column['property'] + '-span'
      if (row[span]) {
        return row[span]
      }
    },

    /**
     * @description: table合并行通用
     * @param {*}
     */
    mergeTableRow(data, merge) {
      if (!merge || merge.length === 0) {
        return data
      }
      merge.forEach((m) => {
        const mList = {}
        data = data.map((v, index) => {
          const rowVal = v[m]
          if (mList[rowVal] && mList[rowVal].newIndex === index) {
            mList[rowVal]['num']++
            mList[rowVal]['newIndex']++
            data[mList[rowVal]['index']][m + '-span'].rowspan++
            v[m + '-span'] = {
              rowspan: 0,
              colspan: 0
            }
          } else {
            mList[rowVal] = { num: 1, index: index, newIndex: index + 1 }
            v[m + '-span'] = {
              rowspan: 1,
              colspan: 1
            }
          }
          return v
        })
      })
      return data
    },

    /**
     * @description: 设置列的值
     * @param {*} data
     */
    setColumns(data) {
      data.forEach((m) => {
        this.$_.defaults(m, def.columnInfo)
        if (m.children && m.children.length > 0) this.setColumns(m.children)
      })
    }
  },
  mounted() {
    this.$nextTick(() => {
      if (this.queryOnCreated) {
        this.query()
      }
    })
  },
  created() {
    this.setColumns(this.cols)
  },
  activated() {
    this.doLayout()
  }
}
</script>
