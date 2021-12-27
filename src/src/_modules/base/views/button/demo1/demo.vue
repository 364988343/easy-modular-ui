<template>
  <em-panel v-bind="panel" class="button-demo">
    <el-row>
      <em-button text="默认按钮"></em-button>
      <em-button type="primary" text="主要按钮"></em-button>
      <em-button type="success" text="成功按钮"></em-button>
      <em-button type="info" text="信息按钮"></em-button>
      <em-button type="warning" text="警告按钮"></em-button>
      <em-button type="danger" text="危险按钮"></em-button>
    </el-row>

    <el-row>
      <em-button plain text="朴素按钮"></em-button>
      <em-button type="primary" plain text="主要按钮"></em-button>
      <em-button type="success" plain text="成功按钮"></em-button>
      <em-button type="info" plain text="信息按钮"></em-button>
      <em-button type="warning" plain text="警告按钮"></em-button>
      <em-button type="danger" plain text="危险按钮"></em-button>
    </el-row>

    <el-row>
      <em-button round text="圆角按钮"></em-button>
      <em-button type="primary" round text="主要按钮"></em-button>
      <em-button type="success" round text="成功按钮"></em-button>
      <em-button type="info" round text="信息按钮"></em-button>
      <em-button type="warning" round text="警告按钮"></em-button>
      <em-button type="danger" round text="危险按钮"></em-button>
    </el-row>

    <el-row>
      <em-button icon="search" circle></em-button>
      <em-button type="primary" icon="edit" circle></em-button>
      <em-button type="success" icon="select" circle></em-button>
      <em-button type="info" icon="permission" circle></em-button>
      <em-button type="warning" icon="reload" circle></em-button>
      <em-button type="danger" icon="delete" circle></em-button>
    </el-row>
    <el-row>
      <em-button type="text" text="文字按钮"></em-button>
      <em-button type="text" text="文字按钮" disabled></em-button>
    </el-row>
    <el-row>
      <em-button type="primary" icon="edit"></em-button>
      <em-button type="primary" icon="search" text="搜索"></em-button>
      <em-button type="primary" icon="reload" icon-position="right" text="刷新"> </em-button>
    </el-row>
    <el-row>
      <el-button-group>
        <em-button type="primary" icon="arrowleft" text="上一页"></em-button>
        <em-button type="primary">
          下一页
          <em-icon name="arrowright"></em-icon>
        </em-button>
      </el-button-group>
      <el-button-group>
        <em-button type="primary" icon="edit"></em-button>
        <em-button type="primary" icon="explorer"></em-button>
        <em-button type="primary" icon="delete"></em-button>
      </el-button-group>
    </el-row>
    <el-row>
      <em-button type="primary" :loading="true" text="加载中"></em-button>
    </el-row>
    <el-row>
      <el-alert title="按钮尺寸" type="warning" description="按钮默认尺寸根据系统的字号大小设置" show-icon :closable="false"></el-alert>
      <em-button text="默认按钮"></em-button>
      <em-button text="中等按钮" size="medium"></em-button>
      <em-button text="小型按钮" size="small"></em-button>
      <em-button text="超小按钮" size="mini"></em-button>
    </el-row>
  </em-panel>
</template>
<script>
export default {
  data() {
    return {
      panel: {
        title: '按钮-基础用法',
        page: true,
        header: true,
        icon: 'detail'
      }
    }
  },
  created() {
    this.setTabName(this.panel.title)
  }
}
</script>
<style lang="scss">
.button-demo {
  .el-row {
    margin: 24px;
  }
}
</style>
