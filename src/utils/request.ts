import axios from 'axios'
import { BASE_URL, ICODE } from '../config/index'
import storage from './storage'
import store from '../store/index'

const TOKEN_INVALID = 'Token认证失败，请重新登录'
const NETWORK_ERROR = '网络请求异常，请稍后重试'

const service = axios.create({
  baseURL: BASE_URL,
  timeout: 5000
})

service.interceptors.request.use((req) => {
  store.commit('setLoading', true)
  const headers = req.headers
  const token = storage.getItem('token') || ''

  if (headers && !headers.Authorization) headers.Authorization = 'Bearer ' + token
  req.params = { ...req.params, icode: ICODE }
  if (req.data instanceof FormData) {
    req.data.append('icode', ICODE)
  } else {
    req.data = { ...req.data, icode: ICODE }
  }
  return req
})

service.interceptors.response.use((res) => {
  const { code, data, msg } = res.data

  // await new Promise(resolve => setTimeout(() => resolve(1), 1000))

  setTimeout(() => store.commit('setLoading'), 500)

  if (code === 0) {
    return data
  } else if (code === 50001) {
    setTimeout(() => {
      // router.push('/login')
    }, 1500)
    return Promise.reject(TOKEN_INVALID)
  } else {
    console.error(msg || NETWORK_ERROR)
    return Promise.reject(msg || NETWORK_ERROR)
  }
})

interface IOptions {
  [x: string]: any
  method: string,
  params: any
}
function request(options:IOptions) {
  if (options.method === 'get') options.params = options.data
  return service(options)
}

interface IParams {
  url: string,
  data: any,
  options?: any
}

request.get = function({ url, data, options }: IParams) {
  return request({
    url,
    data,
    method: 'get',
    ...options
  })
}
request.post = function({ url, data, options }: IParams) {
  return request({
    url,
    data,
    method: 'post',
    ...options
  })
}

export default request
