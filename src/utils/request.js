import Vue from 'vue'
import axios from 'axios'
import { getToken ,removeToken} from '@/utils/token'
import router from '@/router'

// 设置基础路径
axios.defaults.baseURL = process.env.VUE_APP_BASEURL

// 允许携带cookie
axios.defaults.withCredentials = true

// Add a request interceptor
// 请求拦截器(http://www.axios-js.com/docs/#Interceptors)
axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    const token = getToken()
    if (token) {
        config.headers.token = token
    }

    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// 响应拦截器(http://www.axios-js.com/docs/#Interceptors)
// Add a response interceptor
axios.interceptors.response.use(
    function (response) {
        // console.log(response);
        // Do something with response data
        if (response.data.code === 206) { // token 过期了 或者 token 没有值
            // 移除token
            removeToken()
            // 跳转到登录页面
            router.push('/login')
            // 如果token过期了，就阻止代码继续往下面执行
            return
        }
        return response;
    },
    function (error) {
        // Do something with response error
        return Promise.reject(error);
    }
);



// 把axios挂载到vue实例原型上
Vue.prototype.$axios = axios;