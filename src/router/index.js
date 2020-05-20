import Vue from 'vue'
import VueRouter from 'vue-router'
// 导入组件
// 默认login下面的index.vue
import Login from '@/views/login/index.vue'
import Layout from '@/views/layout/index.vue'
// import Login from '../views/login/index.vue'
// import Layout from '../views/layout/index.vue'


// 按需导入
import {getToken} from '@/utils/token.js'
// 全局注册
Vue.use(VueRouter)

// 实例化与配置
let router = new VueRouter({
    routes: [
        // 重定向
        { path: '*', redirect: '/login' },
        { path: '/login', component: Login },
        { path: '/layout', component: Layout }
    ]
})

// 全局前置守卫(监控路由跳转，设置登录权限)
router.beforeEach((to, from, next) => {
    // console.log('to', to);
    // console.log('from', from);
    // next()  //必须要有next函数，不然啥也没有

    if (to.fullPath == '/login') {
        // 如果去到登录页，可以直接去
        next()
    } else {
        const token = getToken()
        if (token) { //token有值，代表登录了，可以去你想去的页面
            next()
        } else {
            // 如果没有token，也就是没有登录，跳转到登录页
            console.log('token没有值');
            next('/login')
        }
    }
})


export default router;
