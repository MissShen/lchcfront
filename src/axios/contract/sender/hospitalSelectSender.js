import http from 'src/axios/http'

/**
 * 查询配送企业列表
 * @param resDate
 * @param query
 * @returns {*}
 */
export function querySenderList (resData, query) {
  return http({
    url: 'contract/hospitalSender/querySenderList',
    method: 'get',
    params: {
      "orderBy": resData.orderBy,
      "pageNum" : resData.pageNum,
      "pageSize" : resData.pageSize,
      "name" : query.name,
      "conState" : query.conState,
      "twoVote" : query.twoVote,
      "complainedCount" : query.complainedCount,
      "serviceState":query.serviceState
    }
  })
}
export function querySelectSenderList(resData, query) {
  return http({
    url: 'contract/hospitalSender/querySelectSenderList',
    method: 'get',
    params: {
      "orderBy": resData.orderBy,
      "pageNum" : resData.pageNum,
      "pageSize" : resData.pageSize,
      "name" : query.name,
      "conState" : query.conState,
      "twoVote" : query.twoVote,
      "complainedCount" : query.complainedCount,
      "serviceState":query.serviceState
    }
  })
}

/**
 * 查询已选产品列表
 * @param res
 * @param query
 * @returns {*}
 */
export function querySelectedProductList (selectedData, query, hospitalId, senderId) {
  return http({
    url: 'contract/hospitalSender/querySelectedProductList',
    method: 'get',
    params: {
      "orderBy": selectedData.orderBy,
      "hospitalId" : hospitalId,
      "senderId" : senderId,
      "manufactureName" : query.manufactureName,
      "productName" : query.productName,
      "pageNum" : selectedData.pageNum,
      "pageSize" : selectedData.pageSize
    }
  })
}

/**
 * 查询所有产品列表
 * @param selectedData
 * @param query
 * @param senderId
 * @returns {*}
 */
export function queryAllProductList (resData, query, senderId) {
  return http({
    url: 'contract/hospitalSender/queryAllProductList',
    method: 'get',
    params: {
      "orderBy": resData.orderBy,
      "senderId" : senderId,
      "manufactureName" : query.manufactureName,
      "productName" : query.productName,
      "pageNum" : resData.pageNum,
      "pageSize" : resData.pageSize
    }
  })
}

export function queryRelevantList(resData, query, senderId) {
  return http({
    url: 'contract/hospitalSender/queryRelevantList',
    method: 'get',
    params: {
      "orderBy": resData.orderBy,
      "senderId" : senderId,
      "manufactureName" : query.manufactureName,
      "productName" : query.productName,
      "pageNum" : resData.pageNum,
      "pageSize" : resData.pageSize
    }
  })
}

export function deleteCurrentSend(conId,sendId) {
  return http({
    url: 'contract/hospitalSender/deleteCurrentSend',
    method: 'delete',
    params: {
      "conId":conId,
      "sendId":sendId
    }
  })
}

export function addProduct(selectProducts, unSelectProducts, senderId, type) {
  return http({
    url: 'contract/hospitalSender/postSelectProduct',
    method: 'post',
    data: {
      'selectProducts': selectProducts,
      'unSelectProducts': unSelectProducts,
      'senderId': senderId,
      "type": type
    }
  })
}

//不良记录列表
export function complainedTableQueryHttp (senderId,resData) {
  return http({
    url: 'contract/hospitalSender/findComplainedTableBySenderId',
    method: 'get',
    params:{
      "senderId" : senderId,
      "pageNum" : resData.pageNum,
      "pageSize" : resData.pageSize
    }
  })
}
export function complainedDetailsHttp (reasonTypeId) {
  return http({
    url: 'contract/hospitalSender/findComplainedDetails',
    method: 'get',
    params:{
      reasonTypeId:reasonTypeId
    }
  })
}

export function deleteHosSendContract(conId) {
  return http({
    url: 'contract/hospitalSender/deleteHosSendContract',
    method: 'post',
    data:{
      conId:conId
    }
  })
}
