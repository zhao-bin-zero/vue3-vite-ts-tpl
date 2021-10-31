import store from '@/store'
import { initRoutesFun } from '@/router' // 按需引入路由的动态注入方法
import { getCookie } from '@/common/utils'
import type { RouteLocationNormalized, NavigationGuardNext } from 'vue-router'

export const beforEachFunc = async (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
  console.log(from, to)
  if (to.name === 'login') {
    next()
  } else {
    const token = getCookie('token')
    if (!token) {
      // token不存在,直接跳转登录
      next('/login')
    } else {
      // 用户信息已请求
      if (Object.keys(store.state.info.user).length > 0) {
        // 动态路由已导入
        // if (store.state.info.authMenu.length > 0) {
        // 默认重定向到第一个子路由to.matched.length===0为404;children.length > 0表示有下一级路由
        if (to.matched.length > 0 && to.matched[to.matched.length - 1].children.length > 0) {
          next({ name: to.matched[to.matched.length - 1].children[0].name })
        } else {
          next()
        }
        // } else {
        //   initRoutesFun(store.state.info.authTree)
        //   next({ ...to, replace: true })
        // }
      } else {
        // 请求用户信息
        await store.dispatch('info/getUser')
        initRoutesFun(store.getters['info/authList'])
        // 重走拦截逻辑
        next({ ...to, replace: true })
      }
    }
  }
}

export const afterEachFunc = () => {
  // do ...
}
