import Vue from 'vue'
import VueRouter from 'vue-router'
// 导入组件
// 默认login下面的index.vue  @ === src
// import Login from '@/views/login/index.vue'
// import Layout from '@/views/layout/index.vue'
// import Chart from '@/views/layout/chart'
// import User from '@/views/layout/user'
// import Enterprise from '@/views/layout/enterprise'
// import Question from '@/views/layout/question'
// import Subject from '@/views/layout/subject'
// import Welcome from '@/views/layout/welcome/welcome'


// vue路由懒加载：
// 当打包构建应用时，JavaScript 包会变得非常大(把所有文件放到一个包里，打开一个组件(页面)就会加载所有组件)，影响页面加载。
// 如果我们能把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应组件，这样就更加高效了。
const Login = () => import('@/views/login')
const Layout = () => import('@/views/layout/index.vue')
const Chart = () => import('@/views/layout/chart')
const User = () => import('@/views/layout/user')
const Enterprise = () => import('@/views/layout/enterprise')
const Question = () => import('@/views/layout/question')
const Subject = () => import('@/views/layout/subject')
const Welcome = () => import('@/views/layout/welcome/welcome')

// 测试路由
// import Parent from '@/test/parent-child-bother/parent'
// import Slot1 from '@/test/slot1/parent'
// import Slot2 from '@/test/slot2/parent'
// import Slot3 from '@/test/slot3'
// import VModel from '@/test/v-model'
// import vModelParent from '@/test/v-model/parent'


// 按需导入
import { getToken } from '@/utils/token.js'
// 全局注册
Vue.use(VueRouter)

// 实例化与配置
let router = new VueRouter({
    routes: [
        // 重定向
        { path: '/', redirect: '/login' },
        { path: '/login', component: Login, meta: { title: '登录' } },
        {
            path: '/layout', component: Layout, meta: { roles: ["超级管理员", "管理员", "老师", "学生"] }, children: [
                // 嵌套路由：path不需要写'/chart', 以 / 开头的嵌套路径会被当作根路径
                {
                    path: 'welcome', component: Welcome, meta: {
                        roles: ["超级管理员", "管理员", "老师", "学生"], icon: "el-icon-date",
                        fullPath: "/layout/welcome",
                        title: "个人信息",
                    }
                },
                {
                    path: 'chart', component: Chart, meta: {
                        roles: ["超级管理员", "管理员", "老师"], icon: "el-icon-pie-chart",
                        fullPath: "/layout/chart",
                        title: "数据预览",
                    }
                },
                {
                    path: 'user', component: User, meta: {
                        roles: ["超级管理员", "管理员", "老师"], icon: "el-icon-user",
                        fullPath: "/layout/user",
                        title: "用户列表",
                    }
                },
                {
                    path: 'enterprise', component: Enterprise, meta: {
                        roles: ["超级管理员", "管理员", "老师"], icon: "el-icon-office-building",
                        fullPath: "/layout/enterprise",
                        title: "企业列表",
                    }
                },
                {
                    path: 'question', component: Question, meta: {
                        roles: ["超级管理员", "管理员", "老师", "学生"], icon: "el-icon-edit-outline",
                        fullPath: "/layout/question",
                        title: "题库列表",
                    }
                },
                {
                    path: 'subject', component: Subject, meta: {
                        roles: ["超级管理员", "管理员", "老师"], icon: "el-icon-notebook-2",
                        fullPath: "/layout/subject",
                        title: "学科列表",
                    }
                }
            ]
        },
        // 下面是测试的路由
        // { path: "/slot1", component: Slot1 },
        // { path: "/slot2", component: Slot2 },
        // { path: "/parent", component: Parent },
        // { path: "/slot3", component: Slot3 },
        // { path: "/vModel", component: VModel },
        // { path: "/vModelParent", component: vModelParent },
    ]
})

// 全局前置守卫(监控路由跳转，设置登录权限)
/*
    在vue中，只要发生了路由跳转，他都会来到这个方法中
    相当于拦截了所有的路由跳转，然后我们再根据实际情况处理
*/
// 
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

// 全局后置钩子(进入页面后做的一些事情)
// 利用路由元信息和导航守卫来动态更改标题
router.afterEach((to, from) => {
    // console.log(to);
    document.title = to.meta.title;
})


export default router;
