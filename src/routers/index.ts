import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import ColumnDetail from '../views/ColumnDetail.vue'
import store from '../store/index'

const routerHistory = createWebHistory()
const router = createRouter({
  history: routerHistory,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: { isLoginPage: true }
    },
    {
      path: '/column/:id',
      name: 'column',
      component: ColumnDetail,
      meta: { isAuth: true }
    }
  ]
})

router.beforeEach((to, from, next) => {
  const { meta: { isAuth, isLoginPage } } = to
  const { user: { isLogin } } = store.state
  if (isAuth && !isLogin) {
    next('/login')
    // next({ name: 'login' })
  } else if (isLoginPage && isLogin) {
    next('/')
  } else {
    next()
  }
})

export default router
