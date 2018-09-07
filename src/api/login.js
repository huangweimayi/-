import request from '@/utils/request'

export function login(params) {
  return request({
    url: '/doLogin',
    method: 'post',
    data: params
  })
}

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/doLogout',
    method: 'post'
  })
}
