import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    // 仓库中要操作的数据
    state: {
        // 定义将来仓库中要操作的数据
        count: 0,
        myCar: {
            name: "兰博基尼",
            pricd: 200000000
        }
    },
    // mutations: {
    //   increment (state) {
    //     state.count++
    //   }
    // }
})

// 导入
export default store


