import request from '@/utils/request'

const decorateApi = {
  // 消费者查询列表
  getUserList(params) {
    return request({
      url: '/searchUsers',
      method: 'post',
      params
    })
  }
}

export default decorateApi
