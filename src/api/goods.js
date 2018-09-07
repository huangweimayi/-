import request from '@/utils/request'

const goodsApi = {
  // 商品查询列表
  getGoodsList(params) {
    return request({
      url: '/product/queryPageList',
      method: 'GET',
      params
    })
  },
  // 上架
  putaway(id) {
    return request({
      url: '/product/putaway/' + id,
      method: 'PUT'
    })
  },
  // 下架
  soldOut(id) {
    return request({
      url: '/product/soldOut/' + id,
      method: 'PUT'
    })
  },
  // 发布
  release(id) {
    return request({
      url: '/product/release/' + id,
      method: 'PUT'
    })
  },
  // 取消发布
  cancelRelease(id) {
    return request({
      url: '/product/cancelRelease/' + id,
      method: 'PUT'
    })
  },
  // 根据商品Id获取商品详情
  queryById(id) {
    return request({
      url: '/product/queryById/' + id,
      method: 'GET'
    })
  },
  // 获取商品类型tree
  queryListTree() {
    return request({
      url: '/productCatgory/queryListTree',
      method: 'GET'
    })
  },
  // 新增商品
  addProduct(param) {
    return request({
      url: '/product/add',
      method: 'POST',
      data: param
    })
  },
  // 修改商品
  updateProduct(param) {
    return request({
      url: '/product/updateById',
      method: 'PUT',
      data: param
    })
  },
  // 上传商品图片集合
  addProductImg(id, param) {
    return request({
      url: '/product/addProductImg/' + id,
      method: 'POST',
      data: param
    })
  },
  // 获取图片列表
  productImgList(id) {
    return request({
      url: '/product/productImgList/' + id,
      method: 'GET'
    })
  },
  // 删除图片
  productImgDelete(id) {
    return request({
      url: '/product/productImgDelete/' + id,
      method: 'POST'
    })
  },
  // 价格列表
  productPriceList(id) {
    return request({
      url: '/productPriceSetting/queryById/' + id,
      method: 'POST'
    })
  },
  // 价格设置
  productPriceSetting(param) {
    return request({
      url: '/productPriceSetting/settingPic',
      method: 'POST',
      data: param
    })
  }

}

export default goodsApi
