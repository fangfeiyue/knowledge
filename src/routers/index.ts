import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import CreatePost from '../views/CreatePost.vue'
import ColumnDetail from '../views/ColumnDetail.vue'
import Signup from '@/views/Signup.vue'
import PostDetail from '@/views/PostDetail.vue'
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
      path: '/signup',
      name: 'signup',
      component: Signup
    },
    {
      path: '/create',
      name: 'create',
      component: CreatePost,
      meta: { isAuth: true }
    },
    {
      path: '/column/:id',
      name: 'column',
      component: ColumnDetail,
      meta: { isAuth: true }
    },
    {
      path: '/posts/:id',
      name: 'postDetail',
      component: PostDetail
    }
  ]
})

router.beforeEach((to, from, next) => {
  const { meta: { isAuth, isLoginPage } } = to
  const { user: { isLogin } } = store.state
  const redirect = from.query.redirect as string

  // 需要登录但是没有登录，跳转登录页
  if ((isAuth && !isLogin)) {
    // next('/login')
    next({
      path: '/login',
      query: { redirect: to.fullPath }
    })
    // next({ name: 'login' })
  } else if (isLogin && redirect) { // 已经登录，但需要重定向
    if (to.path === redirect) next()
    else next({ path: redirect })
  } else if (isLoginPage && isLogin) { // 已经登录，如果跳转的是登录页就跳转到首页
    next('/')
  } else {
    next()
  }
})

export default router
