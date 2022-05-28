import { createStore } from 'vuex'
import storage from '@/utils/storage'
import { getColumns, getPosts, getColumn, login, getUser } from '../api/index'
export interface IUserProps {
  isLogin: boolean,
  nickName?: string,
  _id?: number,
  column?: number,
  email?: string,
  description?: string
}
export interface IImageProps {
  _id?: string,
  url?: string,
  createAt?: string,
  fitUrl?: string;
}
export interface IColumnProps {
  _id: string,
  title: string,
  avatar?: IImageProps,
  description: string
}
export interface IPostsProps {
  _id?: string;
  title: string;
  excerpt?: string;
  content?: string;
  image?: IImageProps;
  createdAt?: string;
  column: string;
  author?: string | IUserProps;
  isHTML?: boolean;
}
export interface IGlobalDataProps {
  isLoading: boolean,
  token: string,
  columns: IColumnProps[],
  posts: IPostsProps[],
  user: IUserProps
}
const store = createStore<IGlobalDataProps>({
  state: {
    isLoading: false,
    token: storage.getItem('token') || '',
    posts: [],
    columns: [],
    user: { isLogin: false }
  },
  mutations: {
    login(state, token) {
      // state.user = { ...state.user, isLogin: true, name: 'f' }
      storage.setItem('token', token)
      state.token = token
    },
    createPost(state, newPost) {
      state.posts.push(newPost)
    },
    getColumns(state, list) {
      state.columns = list
    },
    getColumn(state, data) {
      state.columns = [data]
      // state.columns = [data.data]
    },
    getPosts(state, data) {
      state.posts = data
      // state.posts = data.data.list
    },
    setUser(state, user) {
      state.user = { isLogin: true, ...user }
    },
    setLoading(state, payload) {
      state.isLoading = payload
    }
  },
  getters: {
    getColumnById: (state) => (id: string) => state.columns.find(item => item._id === id),
    getPostByCid: (state) => (cid: string) => state.posts.filter(item => item.column === cid)
  },
  actions: {
    async fetchColumns({ commit }) {
      const { list } = await getColumns()
      commit('getColumns', list)
      // getColumns().then(res => {
      //   const { list } = res
      //   commit('getColumns', list)
      // })
    },
    async fetchColum({ commit }, cid) {
      const data = await getColumn(cid)
      commit('getColumn', data)
      // getColumn(cid).then(res => {
      //   commit('getColumn', res)
      // })
    },
    async fetchPosts({ commit }, cid) {
      const { list } = await getPosts(cid)
      commit('getPosts', list)
      // getPosts(cid).then(res => {
      //   const list = res.list
      //   commit('getPosts', list)
      // })
    },
    async fetchUser({ commit }) {
      const res = await getUser()
      commit('setUser', res)
      return res
    },
    async fetchLogin({ commit }, params) {
      const { token } = await login(params)
      commit('login', token)
      return token
    },
    fetchLoginAndUser({ dispatch }, params) {
      return dispatch('fetchLogin', params).then(() => {
        return dispatch('fetchUser')
      })
    }
    // async fetchLoginAndUser({ dispatch }, params) {
    //   await dispatch('fetchLogin', params)
    //   return dispatch('fetchUser')
    // }
  }
})
export default store
