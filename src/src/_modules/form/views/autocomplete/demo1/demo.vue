<template>
  <em-panel page title="自动完成示例" icon="profile">
    <em-panel-row height="400px">
      <em-panel-col :span="12">
        <em-panel header title="简单示例" icon="chrome">
          <em-autocomplete v-model="star" value-key="label" label-keys="label" :action="getStars" @select="onSelect" />
        </em-panel>
      </em-panel-col>
      <em-panel-col :span="12">
        <em-panel header title="多文本" icon="chrome">
          <em-autocomplete v-model="address" value-key="city" label-keys="province,city" :action="getAddress" @select="onSelect" />
        </em-panel>
      </em-panel-col>
    </em-panel-row>

    <em-panel-row height="400px">
      <em-panel-col :span="12">
        <em-panel header title="自定义" icon="chrome">
          <em-autocomplete v-model="star" value-key="label" label-keys="label" :action="getStars" @select="onSelect">
            <template v-slot:suffix>
              <i class="el-icon-search el-input__icon"></i>
            </template>
          </em-autocomplete>
        </em-panel>
      </em-panel-col>
    </em-panel-row>
  </em-panel>
</template>
<script>
export default {
  data() {
    return {
      star: '',
      address: ''
    }
  },
  methods: {
    getStars(queryString) {
      return new Promise((resolve) => {
        resolve(
          [
            {
              label: '詹姆斯',
              value: '1'
            },
            {
              label: '韦德',
              value: '2'
            },
            {
              label: '杜兰特',
              value: '3'
            }
          ].filter((m) => m.label.indexOf(queryString) >= 0)
        )
      })
    },
    getAddress(queryString) {
      return new Promise((resolve) => {
        resolve(
          [
            {
              id: '1',
              province: '广东省',
              city: '广州市'
            },
            {
              id: '2',
              province: '湖南省',
              city: '长沙市'
            },
            {
              id: '3',
              province: '湖北省',
              city: '武汉市'
            }
          ].filter((m) => m.province.indexOf(queryString) >= 0 || m.city.indexOf(queryString) >= 0)
        )
      })
    },

    onSelect(data) {
      console.log(`data:${JSON.stringify(data)}`)
    }
  }
}
</script>
