import Vue from 'vue'
import VueRouter from 'vue-router'
// 导入组件
// 默认login下面的index.vue  @ === src
import Login from '@/views/login/index.vue'
import Layout from '@/views/layout/index.vue'
// import Login from '../views/login/index.vue'
// import Layout from '../views/layout/index.vue'

import Chart from '@/views/layout/chart'
import User from '@/views/layout/user'
import Enterprise from '@/views/layout/enterprise'
import Question from '@/views/layout/question'
import Subject from '@/views/layout/subject'
import Welcome from '@/views/layout/welcome/welcome'
// import Welcome from '../views/layout/welcome/welcome.vue'

// 测试路由
import Parent from '@/test/parent-child-bother/parent'


// 按需导入
import { getToken } from '@/utils/token.js'
// 全局注册
Vue.use(VueRouter)

// 实例化与配置
let router = new VueRouter({
    routes: [
        // 重定向
        { path: '/', redirect: '/login' },
        { path: '/login', component: Login },
        {
            path: '/layout', component: Layout, children: [
                // 嵌套路由：path不需要写'/chart', 以 / 开头的嵌套路径会被当作根路径
                { path: 'chart', component: Chart },
                { path: 'user', component: User },
                { path: 'enterprise', component: Enterprise },
                { path: 'question', component: Question },
                { path: 'subject', component: Subject },
                { path: 'welcome', component: Welcome }
            ]
        },
        // 下面是测试的路由
        // { path: "/slot1", component: Slot1 },
        // { path: "/slot2", component: Slot2 },
        { path: "/parent", component: Parent },
    ]
})

// 全局前置守卫(监控路由跳转，设置登录权限)
/*
    在vue中，只要发生了路由跳转，他都会来到这个方法中
    相当于拦截了所有的路由跳转，然后我们再根据实际情况处理
*/
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
