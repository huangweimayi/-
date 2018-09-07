import request from '@/utils/request'

const commonApi = {
  // 上传图片
  uploadImg(params) {
    return request({
      url: '/upload',
      method: 'get',
      params
    })
  },
  // 获取字典
  getDictionary(params) {
    return request({
      url: '/getDictionarys',
      method: 'POST',
      params
    })
  }
}

export default commonApi
