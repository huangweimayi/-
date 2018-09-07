import { Message } from 'element-ui'
import commonApi from '@/api/common'

const COMMON = {
  tip(msg, type) {
    Message({
      message: msg,
      type: type,
      duration: 5 * 1000
    })
  },
  tipSuccess() {
    this.tip('操作成功', 'success')
  },
  setHeader(type) {
    if (type === 1) {
      sessionStorage.setItem('header', 'application/json')
    }
  },
  // 获取字典
  getDictionary(data) {
    return new Promise((resolve, reject) => {
      commonApi.getDictionary(data).then(res => {
        resolve(res.data)
      }).catch(error => {
        reject(error)
      })
    })
  }
}

export default COMMON
