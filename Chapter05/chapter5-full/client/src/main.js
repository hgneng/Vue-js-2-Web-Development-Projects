import 'babel-polyfill'
import Vue from 'vue'
import AppLayout from './components/AppLayout.vue'
import router from './router'
import state from './state'
import VueFetch, { $fetch } from './plugins/fetch'
import VueState from './plugins/state'
import './global-components'
import * as filters from './filters'

Vue.use(VueFetch, {
  baseUrl: 'http://localhost:3000/',
})

Vue.use(VueState, state)

for (const key in filters) {
  Vue.filter(key, filters[key])
}

// async function, await是ECMA 2017里定义的，用在这里可以作为Web服务器异步响应多个请求。下面是async文档：
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
async function main () {
  // Get user info
  try {
    // state和fetch是Vue的两个插件库，fetch的运行是异步阻塞的，加上await可以是逻辑暂停等待结果
    state.user = await $fetch('user')
  } catch (e) {
    console.warn(e)
  }
  // Launch app
  new Vue({
    el: '#app',
    data: state,
    router,
    render: h => h(AppLayout), // 这一句定义了HTML模板代码的入口位置在components/AppLayout.vue
  })
}

main()
