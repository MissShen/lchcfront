import http from 'src/axios/http'

/**
 * 医院-产品-配送-列表查询
 * @param resDate
 * @param query
 * @returns {*}
 */
export function queryProductList (resData, query) {
  return http({
    url: 'contract/hospitalProductSender/queryProductList',
    method: 'get',
    params: {
      "orderBy" : resData.orderBy,
      "pageNum" : resData.pageNum,
      "pageSize" : resData.pageSize,
      "productName" : query.productName,
      "spec" : query.spec,
      "doseageFormName" : query.doseageFormName,
      "manufactureName" : query.manufactureName,
      "regionalDrug" : query.regionalDrug,
      "basicFlag" : query.basicFlag,
      "twoVoteId" : query.twoVoteId,
      "isTrade" : query.isTrade,
      "firstSender" : query.firstSender
    }
  })
}

/**
 * 查询已选配送企业列表
 * @param resDate
 * @param query
 * @param productId
 * @returns {*}
 */
export function querySelectedSenderList (resData, query, productId) {
  return http({
    url: 'contract/hospitalProductSender/querySelectedSenderList',
    method: 'get',
    params: {
      "orderBy": resData.orderBy,
      "productId" : productId,
      "senderName" : query.senderName,
      "complainedCount" : query.complainedCount,
      "serviceState":query.serviceState,
      "pageNum" : resData.pageNum,
      "pageSize" : resData.pageSize
    }
  })
}

/**
 * 查询可选配送企业列表
 * @param resDate
 * @param query
 * @param productId
 * @returns {*}
 */
export function queryUnselectedSenderList (resData, query, productId) {
  return http({
    url: 'contract/hospitalProductSender/queryUnselectedSenderList',
    method: 'get',
    params: {
      "orderBy": resData.orderBy,
      "productId" : productId,
      "senderName" : query.senderName,
      "complainedCount" : query.complainedCount,
      "serviceState":query.serviceState,
      "pageNum" : resData.pageNum,
      "pageSize" : resData.pageSize
    }
  })
}

/**
 * 查询进入交易配送企业列表
 * @param resDate
 * @param query
 * @param productId
 * @returns {*}
 */
export function queryIntoTradeSenderList (resData, query, productId) {
  return http({
    url: 'contract/hospitalProductSender/queryIntoTradeSenderList',
    method: 'get',
    params: {
      "orderBy": resData.orderBy,
      "twoVote" : query.twoVote,
      "complainedCount" : query.complainedCount,
      "serviceState":query.serviceState,
      "productId" : productId,
      "senderName" : query.senderName,
      "pageNum" : resData.pageNum,
      "pageSize" : resData.pageSize
    }
  })
}

/**
 * 添加配送
 * @param resDate
 * @param query
 * @param productId
 * @returns {*}
 */
export function addSender2Product (productId, firstSenderId, selectSenderIds, unSelectSenderIds, dealPrice) {
  return http({
    url: 'contract/hospitalProductSender/addSender2Product',
    method: 'post',
    params: {
      "productId" : productId,
      "firstSenderId" : firstSenderId,
      "selectSenderIds" : selectSenderIds,
      "unSelectSenderIds" : unSelectSenderIds,
      "dealPrice" : dealPrice
    }
  })
}
export function updateSenderForProduct (productId, firstSenderId, selectSenderIds, unSelectSenderIds, dealPrice) {
  return http({
    url: 'contract/hospitalProductSender/updateSenderForProduct',
    method: 'post',
    params: {
      "productId" : productId,
      "firstSenderId" : firstSenderId,
      "selectSenderIds" : selectSenderIds,
      "unSelectSenderIds" : unSelectSenderIds,
      "dealPrice" : dealPrice
    }
  })
}

/**
 * 删除已选配送
 * @param productId
 * @param firstSenderId
 * @param senderIds
 * @returns {*}
 */
export function deleteSender (senderId,productIds) {
  return http({
    url: 'contract/hospitalProductSender/deleteProductSender',
    method: 'delete',
    params: {
      "senderId":senderId,
      "productIds":productIds.toString()
    }
  })
}

/**
 * 删除已选配送
 * @param id
 * @returns {*}
 */
export function cancelFirstSender (id) {
  return http({
    url: 'contract/hospitalProductSender/cancelFirstSender',
    method: 'post',
    params: {
      "id" : id
    }
  })
}

/**
 * 预生成合同
 */
export function generateContract (senderIdAndNameList) {
  return http({
    url: 'contract/hospitalProductSender/generateContract',
    method: 'post',
    params: {
      "senderIdAndNameList": senderIdAndNameList
    }
  })
}

/**
 * 生成合同产品明细
 * @param senderIdList
 */
export function generateProductDetail(senderIdList) {
  return http({
    url: 'contract/hospitalSender/postSelectProduct',
    method: 'post',
    params: {
      "senderIdList": senderIdList
    }
  })
}

/**
 * 全选功能
 * @param senderId
 */
export function selectAllProduct(senderId) {
  return http({
    url: 'contract/hospitalProductSender/generateContract',
    method: 'post',
    params: {
      "senderId": senderId
    }
  })
}

/**
 * 导出已选择的配送企业
 * @returns {*}
 */
export function hospitalSelectProductSenderExcel (resData, query) {
  return http({
    url: 'contract/hospitalProductSender/queryProductListExcel',
    responseType: 'blob',// 表明返回服务器返回的数据类型
    use: 'all',
    method: 'get',
    params: {
      "total" : resData.total,
      "orderBy" : resData.orderBy,
      "productName" : query.productName,
      "spec" : query.spec,
      "doseageFormName" : query.doseageFormName,
      "manufactureName" : query.manufactureName,
      "regionalDrug" : query.regionalDrug,
      "basicFlag" : query.basicFlag,
      "twoVoteId" : query.twoVoteId,
      "isTrade" : query.isTrade,
      "firstSender" : query.firstSender
    }
  })
}
