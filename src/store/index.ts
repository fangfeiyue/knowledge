import { createStore } from 'vuex'
import { testData, testPosts, ColumnProps, PostProps } from '../mock/data'
interface IUserProps {
  isLogin: boolean,
  name?: string,
  id?: number
}
export interface IGlobalDataProps {
  columns: ColumnProps[],
  posts: PostProps[],
  user: IUserProps
}
const store = createStore<IGlobalDataProps>({
  state: {
    posts: testPosts,
    columns: testData,
    user: {
      isLogin: false
    }
  },
  mutations: {
    login(state) {
      state.user = { ...state.user, isLogin: true, name: 'f' }
    }
  },
  getters: {
    getColumnById: (state) => (id: number) => state.columns.find(item => item.id === id),
    getPostByCid: (state) => (cid: number) => state.posts.filter(item => item.id === cid)
  }
})
export default store
