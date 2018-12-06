import Vue from 'vue'
import VueRouter from 'vue-router'
import state from './state'

// .vue文件是一些html模板，import语法是JS的标准语法，但是JS语法本身并不支持引用html，这个功能归功于
// Babel(https://babeljs.io/)模块，让我们可以使用最新的JS语法，以及
// Webpack打包工具让模块可以独立定义在一个单独的文件中，参考：https://vuejs.org/v2/guide/single-file-components.html
// 可以认为，我们不再是在写纯JS代码，而是写另外一种语言的代码，然后通过编译器编译成JS代码
import Home from './components/Home.vue'
import FAQ from './components/FAQ.vue'
import Login from './components/Login.vue'
import TicketsLayout from './components/TicketsLayout.vue'
import Tickets from './components/Tickets.vue'
import NewTicket from './components/NewTicket.vue'
import Ticket from './components/Ticket.vue'
import NotFound from './components/NotFound.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', name: 'home', component: Home },
  { path: '/faq', name: 'faq', component: FAQ },
  { path: '/login', name: 'login', component: Login, meta: { guest: true } },
  { path: '/tickets', component: TicketsLayout, meta: { private: true }, children: [
    { path: '', name: 'tickets', component: Tickets },
    { path: 'new', name: 'new-ticket', component: NewTicket },
    { path: ':id', name: 'ticket', component: Ticket, props: true },
  ] },
  { path: '*', component: NotFound },
]

const router = new VueRouter({
  routes,
  // 路由有3中模式：hash, history, abstract。
  // hash是通过#实现的
  // history是通过HTML5 history.pushState API实现的。不过在普通服务器中，如果打开一个单页应用的非首页的URL会返回404。
  // 不过webpack server可以处理history模式，返回正确的页面。
  // abstract可以被所有JS支持，在上面两种模式不支持的情况下会使用abstract模式。
  mode: 'history',
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    if (to.hash) {
      return { selector: to.hash }
    }
    return { x: 0, y: 0 }
  },
})

router.beforeEach((to, from, next) => {
  console.log('to', to.name)
  // if (to.meta.private && !state.user) {
  if (to.matched.some(r => r.meta.private) && !state.user) {
    next({
      name: 'login',
      params: {
        wantedRoute: to.fullPath,
      },
    })
    return
  }
  // if (to.meta.guest && state.user) {
  if (to.matched.some(r => r.meta.guest) && state.user) {
    next({ name: 'home' })
    return
  }
  next()
})

export default router
