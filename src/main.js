import Vue from 'vue'
import App from './App.vue'
// import axios from 'axios'

Vue.config.productionTip = false

// 导入less，webpack会让 main.js 这个入口文件和 .less 建立依赖关系
// import '@/styles/base.less'
import router from '@/router'

// 导入element.js
import '@/plugins/element.js'

// 导入 request(封装axios)
import '@/utils/request.js'

// 全局注册(哪需要这个组件，直接用就行。我们这个项目不需要全局注册)
// import userEdit from '@/views/layout/user/user-add-or-updata'
// Vue.component('vue-edit',userEdit)

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
