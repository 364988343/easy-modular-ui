<template>
  <div class="file-list">
    <el-table :data="data" border size="mini" height="100%" style="width: 100%">
      <el-table-column align="center" type="index" width="50"></el-table-column>
      <el-table-column align="center" prop="name" label="名称"></el-table-column>
      <el-table-column align="center" prop="size" label="大小" width="180"></el-table-column>
      <el-table-column align="center" prop="ext" label="扩展" width="180"></el-table-column>
      <el-table-column align="center" label="操作">
        <template v-slot:default="{ row }">
          <em-icon class="status-success" v-if="row.status === 1" name="select" />
          <em-icon class="status-error" v-else-if="row.status === 2" name="close" />
          <em-button type="text" icon="delete" text="删除" @click="onRemove(row)" />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    /**
     * @description: 删除
     * @param {*} row
     */
    onRemove(row) {
      this.$emit('file-delete', row)
    }
  }
}
</script>
