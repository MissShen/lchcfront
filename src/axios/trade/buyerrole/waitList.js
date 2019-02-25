import http from 'src/axios/http'

/**
 * 创建退货列表
 * @param resDate
 * @param domain
 * @returns {*}
 */
export function queryNewReturnList (resDate,domain) {
  return http({
    url: '/trade/buyerRole/queryNewReturnList',
    method: 'get',
    params: {}
  })
}

/**
 *  创建退货产品详情
 * @param id
 * @returns {*}
 */
export function findNewReturnDetails (id) {
  return http({
    url: '/trade/buyerRole/findNewReturnDetails',
    method: 'get',
    params: {'id': id}
  })
}
/**
 * 待处理退货单
 * @param resDate
 * @param domain
 * @returns {*}
 */
export function queryWaitList (resDate,domain) {
    return http({
      url: '/trade/buyerRole/queryWaitList',
      method: 'get',
    params: {}
  })
}

/**
 *  待处理退货单详情
 * @param id
 * @returns {*}
 */
export function findWaitReturn (id) {
  return http({
    url: '/trade/buyerRole/findWaitReturn',
    method: 'post',
    params: {'id': id}
  })
}



/**
 * 待审批退货列表
 * @param resData
 * @param domain
 * @returns {*}
 */
export function firstUnSendList (resData,query) {
  return http({
    url: '/trade/returnController/firstUnSendList',
    method: 'get',
    params: {
      'pageNum': resData.pageNum,
      "orderBy":resData.orderBy,
      'pageSize': resData.pageSize,
      'returnState':query.returnState,
      'strNameKind':query.strNameKind,
      'bakProductName':query.bakProductName,
      'returnCode':query.returnCode,
      'createBenDate':query.createBenDate,
      'createEenDate':query.createEenDate,
      'bakFactoryEasy':query.factoryEasy,
      'buyerName':query.buyerName,
      'purchaseCode':query.purchaseCode,
      'senderName':query.senderName

    }
  })
}


/**
 * 待审批退货列表导出
 * @param resData
 * @param domain
 * @returns {*}
 */
export function exportEXL (resData,query) {
  return http({
    url: '/trade/returnController/exportFirstUnSendList',
    method: 'get',
    responseType: 'blob',// 表明返回服务器返回的数据类型
    use: 'all',
    params: {
      "orderBy":resData.orderBy,
      'pageNum': resData.pageNum,
      'pageSize': resData.pageSize,
      'returnState':query.returnState,
      'strNameKind':query.strNameKind,
      'bakProductName':query.bakProductName,
      'returnCode':query.returnCode,
      'createBenDate':query.createBenDate,
      'createEenDate':query.createEenDate,
      'bakFactoryEasy':query.factoryEasy,
      'buyerName':query.buyerName,
      'purchaseCode':query.purchaseCode,
      'dataFlag':query.dataFlag,
      'senderName':query.senderName

    }
  })
}

/**
 * 待审批退货列表
 * @param resData
 * @param domain
 * @returns {*}
 */
export function senderFirstApproval (query) {
  return http({
    url: '/trade/returnController/senderFirstApproval',
    method: 'get',
    params: {
      'ids': query.ids,
      'keys': query.keys,
      'approvalState':query.approvalState
    }
  })
}

/**
 * 待审批退货单条审批
 * @param resData
 * @param domain
 * @returns {*}
 */
export function approvalTheOne (query) {
  return http({
    url: '/trade/returnController/approvalTheOne',
    method: 'post',
    params: {
      'idApproval': query.id,
      'keyApproval': query.key,
      'returnSaveQtyApproval': query.returnSaveQty,
      'approvalRemarkApproval': query.approvalRemark,
      'buyerRemarkApproval': query.buyerRemark,
      'approvalStateApproval':query.approvalState
    }
  })
}

