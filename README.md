## easy-modular-ui是一个基于vue2.0模块化前端框架，简单易用、架构清晰，降低程序的耦合性，框架同时基于element-ui封装了多个实用的组件，大大提高开发效率。
<div align=center>
	<img src="https://cdn.jsdelivr.net/gh/doordie1991/PicBed@main/picture/20210505112148.png" width="300" />
</div>

## 安装
    npm install easy-modular-ui

## 模块架构
![20210505113558](https://cdn.jsdelivr.net/gh/doordie1991/PicBed@main/picture/20210505113558.png)  
![20210505114016](https://cdn.jsdelivr.net/gh/doordie1991/PicBed@main/picture/20210505114016.png)

## 模块构造
每个模块都有各自的模块构造器，构造模块的视图、路由、状态管理器、全局组件。
``` js
import store from './store'
import routes from './routes'
import UserInfo from '../admin/views/user-info'
import PasswordUpdate from '../admin/views/password-update'
export default {
  module: {
    name: 'em-module-admin',
    code: 'admin',
    version: '1.0.0',
    description: '系统管理'
  },
  routes,
  store,
  components: [
    { name: 'em-user-info', component: UserInfo },
    { name: 'em-password-update', component: PasswordUpdate }
  ]
}

```
## 模块集成

``` js
//导入模块
import Admin from './_modules/admin'
//注入模块
const system = systemService.get()
system.modules = [Admin, ...]
EasyModularUI.use({ system })
```
## 框架截图
![20210505114816](https://cdn.jsdelivr.net/gh/doordie1991/PicBed@main/picture/20210505114816.png)

![20210505114848](https://cdn.jsdelivr.net/gh/doordie1991/PicBed@main/picture/20210505114848.png)

![20210505114921](https://cdn.jsdelivr.net/gh/doordie1991/PicBed@main/picture/20210505114921.png)

![20210505114945](https://cdn.jsdelivr.net/gh/doordie1991/PicBed@main/picture/20210505114945.png)