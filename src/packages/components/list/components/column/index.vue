<template>
  <el-table-column
    v-if="col.show"
    :prop="col.name"
    :width="col.width"
    :sortable="col.sortable"
    :type="col.type"
    :fixed="col.fixed"
    :align="col.align"
    :header-align="col.headerAlign"
    :show-overflow-tooltip="col.showOverflowTooltip"
  >
    <template v-slot:header>
      <slot :name="`col-${col.name}-header`">
        <em-icon v-if="col.icon" :name="col.icon" />
        {{ col.label }}
      </slot>
    </template>

    <template slot-scope="{ row }">
       <slot :name="'col-' + col.name" :row="row">{{ col.format ? $dayjs(row[col.name]).format(col.format) : row[col.name] }}</slot>
    </template>

    <template v-if="hasChild">
      <list-column v-for="(item, index) in col.children" :col="item" :key="index"></list-column>
    </template>
  </el-table-column>
</template>

<script>
export default {
  name: 'listColumn',
  props: ['col'],
  computed: {
    hasChild() {
      return this.col.children && this.col.children.length
    }
  }
}
</script>
