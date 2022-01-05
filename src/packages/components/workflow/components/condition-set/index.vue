<template>
  <em-drawer class="em-workflow-condition-set" v-bind="drawer" :visible.sync="visible_">
    <el-alert title="当审批单同时满足以下条件时进入此流程" type="warning" show-icon> </el-alert>
    <el-table :data="params" style="width: 100%" align="center">
      <el-table-column prop="name" label="参数名称" width="120" align="center">
        <template slot-scope="scope">
          <el-input v-model="scope.row.name"></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="label" label="参数说明" align="center">
        <template slot-scope="scope">
          <el-input v-model="scope.row.label"></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="key" label="参数键名" align="center">
        <template slot-scope="scope">
          <el-input v-model="scope.row.key"></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="type" label="参数类别" align="center">
        <template slot-scope="scope">
          <condition-type v-model="scope.row.type"></condition-type>
        </template>
      </el-table-column>
      <el-table-column label="参数值" align="center">
        <template slot-scope="scope">
          <el-input v-if="scope.row.type != 'between'" v-model="scope.row.value"></el-input>
          <el-row v-else :gutter="20">
            <el-col :span="12">
              <el-input v-model="scope.row.min"></el-input>
            </el-col>

            <el-col :span="12">
              <el-input v-model="scope.row.max"></el-input>
            </el-col>
          </el-row>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" width="120">
        <template v-slot:default="{ row }">
          <em-button type="text" icon="delete" text="移除" @click="onRemoveParams(row)" />
        </template>
      </el-table-column>
    </el-table>

    <div class="em-workflow-condition-set-toolbar">
      <em-button type="primary" icon="add" size="mini" @click="onAddParams">新增</em-button>
    </div>

    <template v-slot:footer>
      <em-button type="success" size="small" @click="onConfirm">确定</em-button>
      <em-button type="info" size="small" @click="visible_ = false">关闭</em-button>
    </template>
  </em-drawer>
</template>

<script>
import visible from '../../../../mixins/components/visible'
import conditionType from '../condition-type'
import { conditionTypes } from '../../process'
export default {
  mixins: [visible],
  props: { node: Object },
  components: { conditionType },
  data() {
    return {
      params: [],
      drawer: {
        title: this.node.name,
        header: true,
        footer: true,
        draggable: true,
        width: '900px'
      }
    }
  },
  methods: {
    /**
     * @description: 添加参数
     * @param {*}
     */
    onAddParams() {
      const item = {
        name: `参数${this.node.params.length + 1}`,
        label: '',
        key: '',
        value: '',
        type: '',
        min: null,
        max: null
      }
      this.params.push(item)
    },

    /**
     * @description: 移除参数
     * @param {*} row
     */
    onRemoveParams(row) {
      const index = this.params.findIndex((m) => m.name === row.name)
      this.params.splice(index, 1)
    },

    /**
     * @description:确定
     * @param {*}
     */
    onConfirm() {
      this.node.params = this.params
      this.node.desc = this.node.params
        .map((m) => {
          const type = conditionTypes.find((v) => v.value === m.type)
          return `${m.label}${type ? type.label : ''}${m.value}`
        })
        .join('且')

      this.hide()
    }
  },
  mounted() {
    if (this.node.params) this.params = this.node.params
  }
}
</script>
