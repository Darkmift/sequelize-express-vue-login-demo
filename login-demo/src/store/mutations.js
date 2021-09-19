import router from '../router'

export default {
  logout(state) {
    state.user = null
    localStorage.removeItem('token')
    router.push("/login");
  },
  setUser(state, { user }) {
    state.user = user
    localStorage.setItem('user', JSON.stringify(user))
  },
};