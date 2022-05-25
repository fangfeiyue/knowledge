import { createStore } from 'vuex'
import { getColumns, getPosts, getColumn } from '../api/index'
export interface IUserProps {
  isLogin: boolean,
  name?: string,
  id?: number,
  columnId?: number
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
  columns: IColumnProps[],
  posts: IPostsProps[],
  user: IUserProps
}
const store = createStore<IGlobalDataProps>({
  state: {
    posts: [],
    columns: [],
    user: {
      name: 'f',
      columnId: 1,
      isLogin: true
    }
  },
  mutations: {
    login(state) {
      state.user = { ...state.user, isLogin: true, name: 'f' }
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
    }
  },
  getters: {
    getColumnById: (state) => (id: string) => state.columns.find(item => item._id === id),
    getPostByCid: (state) => (cid: string) => state.posts.filter(item => item.column === cid)
  },
  actions: {
    fetchColumns({ commit }) {
      getColumns().then(res => {
        const { list } = res
        commit('getColumns', list)
      })
    },
    fetchColum({ commit }, cid) {
      getColumn(cid).then(res => {
        commit('getColumn', res)
      })
    },
    fetchPosts({ commit }, cid) {
      getPosts(cid).then(res => {
        const list = res.list
        commit('getPosts', list)
      })
    }
  }
})
export default store
