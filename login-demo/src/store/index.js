import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import getters from './getters';
import mutations from './mutations';

export default new Vuex.Store({
  state: {
    token: 'fdfgf',
    user: null
  },
  getters,
  mutations,
  actions: {
    checkLocalStorageForUser({ commit }) {
      const storedUser = localStorage.getItem('user')
      const token = localStorage.getItem('token')
      let user = null
      try {
        user = JSON.parse(storedUser)
      } catch (error) {
        return null
      }
      if (user && token) {
        commit({ type: 'setUser', user })
      }
    }
  },
  modules: {
  }
})
