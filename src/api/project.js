import request from '@/utils/request'

const projectApi = {
  // 消费者查询列表
  getProjectList(params) {
    return request({
      url: '/project/list',
      method: 'GET',
      params
    })
  },
  // 获取需求详情
  roomRequireDetail(params) {
    return request({
      url: '/project/roomRequirement/detail',
      method: 'GET',
      params
    })
  },
  // 获取消费者
  getCustomer(params) {
    return request({
      url: '/project/customerContract/getCustomer',
      method: 'GET',
      params
    })
  },
  // 获取合同详情
  getCustomerContract(params) {
    return request({
      url: '/project/customerContract/getCustomerContract',
      method: 'GET',
      params
    })
  },
  // 新增合同
  insertContract(params) {
    return request({
      url: '/project/customerContract/insert',
      method: 'POST',
      data: params
    })
  },
  // 服务合同列表
  serviceContractList(params) {
    return request({
      url: '/project/serviceContract/list',
      method: 'GET',
      params
    })
  },
  // 获取服务商
  getServiceProvider(params) {
    return request({
      url: '/project/serviceContract/getServiceProvider',
      method: 'GET',
      params
    })
  },
  // 新增服务商合同
  serviceContractInsert(params) {
    return request({
      url: '/project/serviceContract/insert',
      method: 'POST',
      data: params
    })
  },
  // 获取结算列表
  getSettlementInfos(params) {
    return request({
      url: '/project/settlement/getSettlementInfos',
      method: 'GET',
      params
    })
  },
  // 结算
  doSettlement(params) {
    return request({
      url: '/project/settlement/doSettlement',
      method: 'POST',
      data: params
    })
  },
  // 订单列表
  getOrderInfs(params) {
    return request({
      url: '/getOrderInfs',
      method: 'GET',
      params
    })
  },
  // 订单结算
  updateOrderInf(params) {
    return request({
      url: '/updateOrderInf',
      method: 'POST',
      data: params
    })
  },
  // 订单发货
  updateSend(params) {
    return request({
      url: '/updateSend',
      method: 'POST',
      data: params
    })
  },
  // 更新项目进度
  updateProjectProgress(params) {
    return request({
      url: '/project/updateProjectProgress',
      method: 'POST',
      data: params
    })
  },

}

export default projectApi
