import ajax from '../utils/request'

export function getColumns(params?: any) {
  return ajax.get({
    url: '/columns',
    data: params
  })
}
export function getPosts(params?: any) {
  // '/columns/${cid}/posts'
  return ajax.get({
    url: `/columns/${params}/posts`,
    data: params
  })
}
export function getColumn(params?: any) {
  // '/columns/${cid}'
  return ajax.get({
    url: `/columns/${params}`,
    data: null
  })
}
type Login = {
  email: string,
  password: string
}
export function login(params?: Login):Promise<any> {
  return ajax.post({
    url: '/user/login',
    data: params
  })
}
export function getUser(params?: void):Promise<any> {
  return ajax.get({
    url: '/user/current',
    data: params
  })
}

type RegisterType = {
  'email': string,
  'nickName': string,
  'password': string
}
export function register(params?:RegisterType):Promise<any> {
  return ajax.post({
    url: '/users',
    data: params
  })
}
export function upload(params?: any):Promise<any> {
  return ajax.post({
    url: '/upload',
    data: params
  })
}

export function getPostDetail(params?:any):Promise<any> {
  return ajax.get({
    url: `/posts/${params}`,
    data: null
  })
}

export function createPost(params?: any) {
  return ajax.post({
    url: '/posts',
    data: params
  })
}
