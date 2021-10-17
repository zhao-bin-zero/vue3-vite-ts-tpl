import type { Module, Store } from 'vuex'
import { IRootState } from '@/store'
import { getIndexInfo, getAreaCode } from '@/http/modules'

export interface InfoState {
  user: {}
  authList: {}
  authMenu: []
  areaCodeList: []
}

const info: Module<InfoState, IRootState> = {
  namespaced: true,
  state: {
    user: {},
    authList: {}, // JSON.parse(sessionStorage.getItem('authList') || '[]'),
    authMenu: [],
    areaCodeList: JSON.parse(sessionStorage.getItem('areaCodeList') || '[]')
  },
  mutations: {
    SET_USER: (state, user: {}) => {
      state.user = { ...state.user, ...user }
    },
    SET_AREACODE_LIST: (state, list: []) => {
      // 做缓存
      sessionStorage.setItem('areaCodeList', JSON.stringify(list))
      state.areaCodeList = list
    },
    // 权限路由
    SET_AUTH_TREE(state, data) {
      state.authList = data
      // sessionStorage.setItem('authList', JSON.stringify(data))
    },
    // 权限菜单
    SET_AUTH_MENU(state, data) {
      state.authMenu = data
    }
  },
  actions: {
    async getUser({ commit }) {
      const { code, data } = await getIndexInfo()
      if (code === 10000) {
        commit('SET_USER', data)
        // 测试权限数据,后期返回
        const authList = {
          workbench: {
            name: 'workbench',
            meta: {
              title: '工作台'
            }
          }
        }
        commit('SET_AUTH_TREE', authList)
      }
    },
    async getAreaCodeList({ commit, state }) {
      if (state.areaCodeList.length > 0) return
      const { code, data } = await getAreaCode()
      if (code === 10000) {
        commit('SET_AREACODE_LIST', data)
      }
    },
    setAuthMenu({ commit }, data) {
      commit('SET_AUTH_MENU', data)
    }
  },
  getters: {
    user: (state) => state.user,
    authMenu: (state) => state.authMenu,
    areaCodeList: (state) => state.areaCodeList
  }
}
export default info

export type InfoStore<S = InfoState> = Store<S>
