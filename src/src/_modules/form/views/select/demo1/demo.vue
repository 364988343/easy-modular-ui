<template>
  <em-panel page title="下拉示例" icon="profile">
    <em-panel-row height="400px">
      <em-panel-col :span="12">
        <em-panel header title="单选" icon="chrome">
          <em-select v-model="star" filterable :action="getStars" @change="onChange" />
        </em-panel>
      </em-panel-col>
      <em-panel-col :span="12">
        <em-panel header title="多选" icon="chrome">
          <em-select v-model="province" filterable multiple :action="getProvince" @change="onChange" />
        </em-panel>
      </em-panel-col>
    </em-panel-row>

    <em-panel-row height="400px">
      <em-panel-col :span="12">
        <em-panel header title="自动完成" icon="chrome">
          <em-select v-model="fruits" filterable :action="getFruits" @change="onChange" autoComplete placeholder="请输入水果名称" />
        </em-panel>
      </em-panel-col>
      <em-panel-col :span="12">
        <em-panel header title="显示多个文本" icon="chrome">
          <em-select v-model="address" filterable :action="getAddress" value-key="id" label-keys="province,city" />
        </em-panel>
      </em-panel-col>
    </em-panel-row>

    <em-panel-row height="400px">
      <em-panel-col :span="12">
        <em-panel header title="创建条目" icon="chrome">
          <em-select ref="user" v-model="name" filterable :action="getUsers" allow-create @change="onChange" @create-item="onCreateItem" />
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
      province: '',
      fruits: '',
      address: '',
      name: ''
    }
  },
  methods: {
    getStars() {
      return new Promise((resolve) => {
        resolve([
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
        ])
      })
    },
    getProvince() {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve([
            {
              label: '广东省',
              value: '1'
            },
            {
              label: '湖南',
              value: '2'
            },
            {
              label: '黑龙江',
              value: '3'
            }
          ])
        }, 2000)
      })
    },
    getFruits(keywords) {
      const data = [
        {
          label: '苹果',
          value: '1'
        },
        {
          label: '香蕉',
          value: '2'
        },
        {
          label: '芒果',
          value: '3'
        },
        {
          label: '橙子',
          value: '4'
        }
      ]
      return new Promise((resolve) => {
        if (keywords) resolve(data.filter((m) => m.label.indexOf(keywords) >= 0))
        else resolve(data)
      })
    },

    getAddress() {
      return new Promise((resolve) => {
        resolve([
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
        ])
      })
    },

    getUsers() {
      return new Promise((resolve) => {
        resolve([
          {
            label: '张三',
            value: '1'
          },
          {
            label: '李四',
            value: '2'
          },
          {
            label: '陈曦',
            value: '3'
          }
        ])
      })
    },
    onChange(val, data) {
      console.log(`val:${val}；data:${JSON.stringify(data)}`)
    },
    onCreateItem(val) {
      console.log(`val:${val}`)
      //后台新增数据，刷新下拉数据
      this.$refs.user.refresh()
    }
  }
}
</script>
