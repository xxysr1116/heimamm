import Vue from 'vue'
import VueRouter from 'vue-router'
// 导入组件
// 默认login下面的index.vue
import Login from '@/views/login/index.vue'
import Layout from '@/views/layout/index.vue'
// import Login from '../views/login/index.vue'
// import Layout from '../views/layout/index.vue'

// 全局注册
Vue.use(VueRouter)

// 实例化与配置
let router = new VueRouter({
    routes:[
        // 重定向
        {path:'/',redirect:'/login'},
        {path:'/login',component:Login},
        {path:'/layout',component:Layout}
    ]
})

export default router;