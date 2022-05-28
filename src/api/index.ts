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
export function login(params?: any) {
  return ajax.post({
    url: '/user/login',
    data: params
  })
}
export function getUser(params?: any) {
  return ajax.get({
    url: '/user/current',
    data: params
  })
}
