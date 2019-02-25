import http from 'src/axios/http'
/**
 * @discription 查询禁用品种
 * @author zhangchen
 * @date 2018/4/16
 */
export function queryDisableProduct (resData,domain) {
  return http({
    url: 'contract/disableProduct/queryDisableProductList',
    method: 'get',
    params: {
      "orderBy": resData.orderBy,
      "pageNum" : resData.pageNum,
      "pageSize" : resData.pageSize,
      "nameChn" :domain.nameChn,
      "productName":domain.productName,
      "manufactureName":domain.manufactureName,
      "catalogId" :domain.catalogId,
      "basicFlag" : domain.basicFlag,
      "enableFlag" : domain.enableFlag,
      "twoVoteId" : domain.twoVoteId
    }
  })
}

export function queryCatalogOptions () {
  return http({
    url: 'contract/disableProduct/queryCatalogOptions',
    method: 'get',
    params: {
    }
  })
}
/**
 * @discription 禁用产品
 * @author zhangchen
 * @date 2018/4/17
 */
export function insertDisableInfo (formData) {
  return http({
    url: 'contract/disableProduct/insertDisableInfo',
    method: 'post',
    data: {
      productId : formData.productId,
      comments : formData.comments,
      id : formData.id
    }
  })
}

/**
 * @discription 启用禁用的产品
 * @author zhangchen
 * @date 2018/4/18
 */
export function updateDisableInfo (formData) {
  return http({
    url: 'contract/disableProduct/updateDisableInfo',
    method: 'put',
    data: {
      productId : formData.productId,
      comments : formData.comments,
      id : formData.id
    }
  })
}


export function queryDisableInfoList (resData,domain,productId) {
  return http({
    url: 'contract/disableProduct/queryDisableInfoList',
    method: 'get',
    params: {
      "orderBy": resData.orderBy,
      "pageNum" : resData.pageNum,
      "pageSize" : resData.pageSize,
      productId : productId,
      createUserName : domain.createUserName
    }
  })
}

export function queryProductInfo (productId) {
  return http({
    url: 'contract/disableProduct/queryProductInfo',
    method: 'get',
    params: {
      productId : productId
    }
  })
}

