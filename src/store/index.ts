import { createStore } from 'vuex'
import storage from '@/utils/storage'
import { objToArr, arrToObj } from '@/utils/utils'
import { getColumns, getPosts, getColumn, login, getUser, getPostDetail, createPost } from '../api/index'
export interface IResponseType<P = Record<string, never>> {
  code: number,
  msg: string,
  data: P
}
export interface IImageProps {
  _id?: string,
  url?: string,
  createAt?: string,
  fitUrl?: string;
}
export interface IUserProps {
  isLogin: boolean,
  nickName?: string;
  _id?: string;
  column?: string;
  email?: string;
  avatar?: IImageProps;
  description?: string;
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
  image?: IImageProps | string;
  createdAt?: string;
  column: string;
  author?: string | IUserProps;
  isHTML?: boolean;
}
export interface IGlobalError {
  msg: string,
  status?: boolean
}
interface IListProps<P> {
  [id: string]: P;
}
export interface IPostProps {
  _id?: string;
  title: string;
  excerpt?: string;
  content?: string;
  image?: IImageProps | string;
  createdAt?: string;
  column: string;
  author?: string | IUserProps;
  isHTML?: boolean;
}
export interface IGlobalDataProps {
  error: IGlobalError,
  isLoading: boolean,
  token: string,
  columns: IColumnProps[],
  posts: { data: IListProps<IPostProps>; loadedColumns: string[] },
  user: IUserProps
}
const store = createStore<IGlobalDataProps>({
  state: {
    error: { msg: '', status: false },
    isLoading: false,
    token: storage.getItem('token') || '',
    posts: { data: {}, loadedColumns: [] },
    columns: [],
    user: { ...storage.getItem('user'), isLogin: !!storage.getItem('token') }
  },
  mutations: {
    login(state, token) {
      state.user = { ...state.user, isLogin: true }
      storage.setItem('token', token)
      state.token = token
    },
    setAuth(state, playload) {
      state.user = { ...state.user, isLogin: playload }
    },
    createPost(state, newPost) {
      // state.posts.push(newPost)
      state.posts.data[newPost._id] = newPost
    },
    getColumns(state, list) {
      state.columns = list
    },
    getColumn(state, data) {
      state.columns = [data]
      // state.columns = [data.data]
    },
    getPosts(state, { list, cid }) {
      // state.posts = list
      state.posts.data = { ...state.posts.data, ...arrToObj(list) }
      state.posts.loadedColumns.push(cid)
      // state.posts = data.data.list
    },
    setUser(state, user) {
      state.user = { isLogin: true, ...user }
      storage.setItem('user', user)
    },
    setLoading(state, payload) {
      state.isLoading = payload
    },
    setError(state, err) {
      state.error = err
    },
    getPostDetail(state, data) {
      state.posts.data[data._id] = data
    }
  },
  getters: {
    getColumnById: (state) => (id: string) => state.columns.find(item => item._id === id),
    getPostByCid: (state) => (cid: string) => objToArr(state.posts.data).filter(post => post.column === cid),
    // getPostByCid: (state) => (cid: string) => state.posts.filter(item => item.column === cid),
    getCurrentPost: (state) => (id: string) => state.posts.data[id]
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
    async fetchPosts({ commit, state }, cid) {
      if (!state.posts.loadedColumns.includes(cid)) {
        const { list } = await getPosts(cid)
        commit('getPosts', { list, cid })
      }
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
      const { token = '' } = await login(params)
      commit('login', token)
      return token
    },
    fetchLoginAndUser({ dispatch }, params) {
      return dispatch('fetchLogin', params).then(() => {
        return dispatch('fetchUser')
      })
    },
    async fetchPostDetail({ commit, state }, id) {
      const currentPost = state.posts.data[id]
      if (!currentPost || !currentPost.content) {
        const res = await getPostDetail(id)
        commit('getPostDetail', res)
        return res
      } else {
        return Promise.resolve({ data: currentPost })
      }
    },
    async fetchCreatePost({ commit }, params) {
      console.log('paramsssssss', params)
      await createPost(params)
    }
    // async fetchLoginAndUser({ dispatch }, params) {
    //   await dispatch('fetchLogin', params)
    //   return dispatch('fetchUser')
    // }
  }
})
/*
const asyncAndCommit = async(url: string, mutationName: string,
  commit: Commit, config: AxiosRequestConfig = { method: 'get' }, extraData?: any) => {
  const { data } = await axios(url, config)
  if (extraData) {
    commit(mutationName, { data, extraData })
  } else {
    commit(mutationName, data)
  }
  return data
}
*/
export default store
