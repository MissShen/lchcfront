import http from 'src/axios/http'

/**
 * 生产企业选择配送-列表
 * @param resData
 * @param domain
 * @returns {*}
 */
export function queryFactorySenderRelationList (resData, query) {
  return http({
    url: 'contract/factorySenderRelation/queryFactorySenderRelationList',
    method: 'get',
    params: {
      "orderBy": resData.orderBy,
      "province" : query.district,
      "city" : query.city,
      "area" : query.area,
      "productName" : query.productName,
      "pageNum" : resData.pageNum,
      "pageSize" : resData.pageSize
    }
  })
}

/**
 * 查询已选配送列表
 * @param resData
 * @param query
 * @returns {*}
 */
export function querySelectedList (resData, query, productId) {
  return http({
    url: 'contract/factorySenderRelation/selectedSenderList',
    method: 'get',
    params: {
      "orderBy": resData.orderBy,
      "productId" : productId,
      "senderName" : query.senderName,
      "province":query.district,
      "city":query.city,
      "area":query.region,
      "complainedCount":query.complainedCount,
      "serviceState":query.serviceState,
      "pageNum" : resData.pageNum,
      "pageSize" : resData.pageSize
    }
  })
}

/**
 * 查询可选配送列表
 * @param resData
 * @param query
 * @returns {*}
 */
export function queryUnselectedList (resData, query, productId) {
  return http({
    url: 'contract/factorySenderRelation/selectableSenderList',
    method: 'get',
    params: {
      "productId" : productId,
      "senderName" : query.senderName,
      "pageNum" : resData.pageNum,
      "pageSize" : resData.pageSize
    }
  })
}

/**
 * 删除已选配送
 * @param resData
 * @param query
 * @param productId
 * @returns {*}
 */
export function deleteSender (id) {
  return http({
    url: 'contract/factorySenderRelation/deleteFactorySenderRelation',
    method: 'delete',
    params: {
      "id" : id
    }
  })
}

/**
 * 添加配送
 * @param arr
 * @param productId
 */
export function addSender(ids, productId) {
  // http.defaults.headers.post['Content-Type']= 'application/json;charset=utf-8';
  var param = JSON.stringify(ids);
  console.log("######addSender_param: ", param);
  return http({
    url: 'contract/factorySenderRelation/saveFactorySenderRelation',
    method: 'post',
    data: {
      "paramList" : param,
      "productId" : productId
    },
    type:'json'
  })
}

/**
 * 查看全部配送
 * @param resData
 * @param senderName
 */
export function queryAllSenderList(resData, query) {
  return http({
    url: 'contract/factorySenderRelation/queryAllSenderList',
    method: 'get',
    params: {
      "orderBy": resData.orderBy,
      "senderName" : query.senderName,
      "twoVote" : query.twoVote,
      "complainedCount":query.complainedCount,
      "serviceState":query.serviceState,
      "pageNum" : resData.pageNum,
      "pageSize" : resData.pageSize
    }
  })
}

/**
 * 生成委托协议
 * @param ids
 */
export function createAgreement() {
  return http({
    url: 'contract/factorySenderRelation/createEntrustAgreement',
    method: 'post',
    type:'json'
  })
}

/**
 * 查询详情列表
 * @author: WangHaiBo
 * @date: 2018/5/3 0003
 * @param senderId
 * @return:
 * @throws:
 */
export function queryDetailList(resData, query, senderId) {
  return http({
    url: 'contract/factorySenderRelation/getDetailList',
    method: 'get',
    params: {
      "orderBy": resData.orderBy,
      'pageNum': resData.pageNum,
      'pageSize': resData.pageSize,
      'productName': query.productName,
      'manufactureName': query.manufactureName,
      'senderId': senderId
    }
  })
}
