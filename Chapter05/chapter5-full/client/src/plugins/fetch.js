import state from '../state'
import router from '../router'

let baseUrl // let和var的区别是：let的作用范围是enclosing block，即一个大括号内，而var的作用范围是函数内。在这里是等价的。

export async function $fetch (url, options) {
  const finalOptions = Object.assign({}, {
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  }, options)
  
  // 反引号``(backtick)是ECMAScript 2015里的语法，可以支持多行字符串，也可以支持模板字符串， ${变量名}可替换为变量值
  const response = await fetch(`${baseUrl}${url}`, finalOptions)
  if (response.ok) {
    const data = await response.json()
    return data
  } else if (response.status === 403) {
    // If the session is no longer valid
    // We logout
    state.user = null

    // If the route is private
    // We go to the login screen
    if (router.currentRoute.matched.some(r => r.meta.private)) {
      router.replace({ name: 'login', params: {
        wantedRoute: router.currentRoute.fullPath,
      }})
    }
  } else {
    const message = await response.text()
    const error = new Error(message)
    error.response = response
    throw error
  }
}

export default {
  install (Vue, options) {
    console.log('Installed!', options)

    // Plugin options
    baseUrl = options.baseUrl

    // Fetch
    Vue.prototype.$fetch = $fetch
  },
}
