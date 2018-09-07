import request from '@/utils/request'

const userApi = {
  // 消费者查询列表
  getUserList(params) {
    return request({
      url: '/getUsers',
      method: 'get',
      params
    })
  },
  // 装修管理查询列表
  DecorateteamList(params) {
    return request({
      url: '/getGroupUsers',
      method: 'get',
      params
    })
  },
  // 推荐人列表
  showDetail(params) {
    return request({
      url: '/getRecommends',
      method: 'post',
      params
    })
  },
  // 查询接口
  queryPhone(params) {
    return request({
      url: '/getRecommends',
      method: 'post',
      params
    })
  },
  // 查询供应商接口
  getSupplyUsers(params) {
    return request({
      url: '/getSupplyUsers',
      method: 'GET',
      params
    })
  },
  // 新增接口
  addUsers(params) {
    return request({
      url: '/addUsers',
      method: 'post',
      params
    })
  }
}

export default userApi
