import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import { deepCopy } from '@/common/utils'
import store from '@/store'
import { AuthList } from '@/store/modules/info'
import { AppRouteRecordRaw } from './types'
import { beforEachFunc } from './routerEach'

import Login from '@/views/login/index.vue'
import Layout from '@/components/Layout/index.vue'
// 引入子路由
// import test from './modules/test'

// name值是path路径分割'__'
// 前端路由由后台权限系统配置
const centerRoutes: AppRouteRecordRaw[] = [
  {
    path: 'workbench',
    name: 'workbench',
    meta: {
      title: '工作台'
    },
    component: () => import('@/views/modules/workbench/index.vue')
  }
  // 测试数据
  // test
]
// 生成前端路由映射表
// const componentsMap = new Map() as unknown as { [key: string]: AppRouteRecordRaw }
// function componentsMapFun(list: AppRouteRecordRaw[]) {
//   list.map((item) => {
//     componentsMap[item.name as string] = { ...item }
//     delete componentsMap[item.name as string].children
//     if (item.children) {
//       componentsMapFun(item.children)
//     }
//   })
// }
// componentsMapFun(centerRoutes)
// console.log(centerRoutes, componentsMap)
const initRoutes: AppRouteRecordRaw[] = [
  {
    path: '/login',
    name: 'login',
    component: Login
  }
  // {
  // path: '/',
  // name: 'center',
  // component: Layout,
  // meta: {
  //   title: '中心'
  // },
  // children: centerRoutes
  // }
  // {
  //   path: '/:catchAll(.*)',
  //   name: '404'
  // }
]
// console.log(initRoutes)

const router = createRouter({
  history: createWebHashHistory(),
  routes: initRoutes as RouteRecordRaw[]
})
function navListTraver(authList: AuthList, routes: AppRouteRecordRaw[]): AppRouteRecordRaw[] {
  const list: AppRouteRecordRaw[] = []
  if (Object.keys(authList).length > 0) {
    routes.forEach((item) => {
      const auth = authList[item.name]
      if (auth) {
        const navObj: AppRouteRecordRaw = {
          ...item,
          meta: {
            // 防止前后端字段冲突
            ...item.meta,
            // icon,
            // is_available,
            // is_menu,
            // level,
            // parent_path,
            // pid,
            // sort,
            ...auth,
            title: auth.name
          }
        } as AppRouteRecordRaw

        if (navObj.children) {
          navObj.children = navListTraver(authList, navObj.children)
        }
        list.push(navObj)
      }
    })
  }
  return list
}
// 动态导入路由
export function initRoutesFun(authList: AuthList) {
  const routes = navListTraver(deepCopy(authList), deepCopy(centerRoutes))
  // 因为当前还没有权限系统,所以本地修改路径时临时处理
  // const routes = centerRoutes

  // console.log(routes)
  store.dispatch('info/setAuthMenu', routes)

  // 执行动态添加路由方法，完成动态路由添加
  router.addRoute({
    path: '/',
    name: 'center',
    meta: {
      title: '中心'
    },
    component: Layout,
    children: routes
  } as RouteRecordRaw)

  // 添加404或者在路由拦截时处理
  router.addRoute({
    path: '/:catchAll(.*)',
    name: '404',
    redirect: '/login'
  })

  // console.log(router.getRoutes())
}
router.beforeEach(beforEachFunc)

export default router
