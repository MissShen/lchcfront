import http from 'src/axios/http'

/**
 * 代送货订单明细查询
 * @param resData
 * @param domain
 * @returns {*}
 */
export function salerItemList (resData,domain) {
  return http({
    url: '/trade/orderController/getSalerItemList',
    method: 'get',
    params: {'pageNum': resData.pageNum,
            'pageSize': resData.pageSize,
            'searchName':domain.name,
            'bakMedicalSpec':domain.specification,
            'pageSign':domain.pageSign,
            'bakFactoryEasy':domain.bakFactoryEasy,
            'searchSender':domain.searchSender,
            'searchOrderState':domain.searchOrderState,
            'purchaseCode':domain.purchaseCode,
            'beginTime':domain.beginTime,
            'endTime':domain.endTime,
            'bakBuyerName':domain.bakBuyerName,
            "orderBy":resData.orderBy,
            "id":domain.id,
            "affectButtonState":domain.affectButtonState }
  })
}

/**
 * 断货状态更改
 * @param domain
 * @returns {*}
 */
export function breakReason (domain) {
  return http({
    url: '/trade/orderController/putBreakReason',
    method: 'put',
    params: {
      'orderId':domain.orderId,
      'orderItemId':domain.itemId,
      'oosReason':domain.breakReason,
    }
  })
}

/**
 * 取消断货状态
 * @param oderItemId
 * @param orderId
 * @returns {*}
 */
export function removeBreakById (oderItemId,orderId) {
  return http({
    url: '/trade/orderController/putBreakReason',
    method: 'put',
    params: {
      'orderId':orderId,
      'orderItemId':oderItemId,
      'removeState':'10',
      'oosReason':'',
      'projectId':''
    }
  })
}


/**
 * 缺货状态更改
 * @param orderId
 * @returns {*}
 */
export function oosReason (domain) {
  return http({
    url: '/trade/orderController/putOosReason',
    method: 'put',
    params: {
      'orderId':domain.orderId,
      'orderItemId':domain.itemId,
      'oosReason':domain.evalReason,
      'otherReason':domain.otherReason
    }
  })
}

/**
 * 取消缺货状态
 * @param oderItemId
 * @param orderId
 * @returns {*}
 */
export function removeEvaluateById (oderItemId,orderId) {
  return http({
    url: '/trade/orderController/putOosReason',
    method: 'put',
    params: {
      'orderId':orderId,
      'orderItemId':oderItemId,
      'removeState':'10',
      'oosReason':'',
      'oosReason':''
    }
  })
}

/**
 * 查询订单明细信息准备备货
 * @param oderItemId
 * @param orderId
 * @returns {*}
 */
export function getStockInfo (oderItemId) {
  return http({
    url: '/trade/orderController/getStockInfo',
    method: 'get',
    params: {
      'orderItemId':oderItemId
    }
  })
}


/**
 * 代送货订单相关信息查询
 * @param orderId
 * @returns {*}
 */
export function selectOrdInfo (orderId) {
  return http({
    url: '/trade/orderController/getOrderInfo',
    method: 'get',
    params: {
      'orderId':orderId
    }
  })
}


/**
 * 备货及已到货查询
 * @param orderId
 * @returns {*}
 */
export function salerItemListReceive (resData,domain) {
  return http({
    url: '/trade/orderController/getsalerItemListReceive',
    method: 'get',
    params: {'pageNum': resData.pageNum,
      'pageSize': resData.pageSize,
      'searchName':domain.name,
      'bakMedicalSpec':domain.specification,
      'pageSign':domain.pageSign,
      'bakFactoryEasy':domain.bakFactoryEasy,
      'searchSender':domain.searchSender,
      'searchOrderState':domain.searchOrderState,
      'purchaseCode':domain.purchaseCode,
      'bakBuyerName':domain.bakBuyerName,
      "orderBy":resData.orderBy,
      'beginTime':domain.beginTime,
      'endTime':domain.endTime,
      'readyFlag':domain.readyFlag,
      'enabled':domain.enabled,
      'id':domain.id
    }
  })
}


/**
 * 备货
 * @param domain
 * @param isFinish
 * @param itemId
 * @param orderId
 * @returns {*}
 */
export function Stocking (domain,itemId,orderId) {
  return http({
    url: '/trade/orderController/postStocking',
    method: 'post',
    params: {
      'orderItemId':itemId,
      'orderId':orderId,
      'stockListStr':JSON.stringify(domain)
    }
  })
}

/**
 * 修改备货
 * @param domain
 * @returns {*}
 */
export function updateStocking (domain) {
  return http({
    url: '/trade/orderController/putStocking',
    method: 'put',
    params: {
      'id':domain.id,
      'lotNo':domain.lotNo,
      'medicalExpiredDateStr':new Date(domain.medicalExpiredDate),
      'invoiceNo':domain.invoiceNo,
      'amount':Number(domain.amount),
      'orderItemId':domain.recordId,
      'orderId':domain.orderId
    }
  })
}

/**
 * 发货及批量发货操作
 * @param ids
 * @param itemId
 * @param orderId
 * @returns {*}
 */
export function sendOrder (ids) {
  return http({
    url: '/trade/orderController/putStockUp',
    method: 'post',
    data: {
      'ids':JSON.stringify(ids)
    }
  })
}

/**
 * 撤销备货
 * @param ids
 * @param itemId
 * @param orderId
 * @returns {*}
 */
export function deleteSendOrder (ids,itemId,orderId) {
  return http({
    url: '/trade/orderController/deleteStockUp',
    method: 'delete',
    params: {
      'ids':ids.toString(),
      'orderItemId':itemId,
      'orderId':orderId
    }
  })
}


/**
 * 关闭明细列表
 * @param resData
 * @param domain
 * @returns {*}
 */
export function salerCloseList (resData,domain) {
  return http({
    url: '/trade/orderController/getSalerCloseList',
    method: 'get',
    params: {
      'pageNum': resData.pageNum,
      'pageSize': resData.pageSize,
      'searchName':domain.name,
      'bakMedicalSpec':domain.specification,
      'bakFactoryEasy':domain.bakFactoryEasy,
      'searchOrderState':domain.searchOrderState,
      'purchaseCode':domain.purchaseCode,
      'bakBuyerName':domain.bakBuyerName,
      'readyFlag':domain.readyFlag,
      "orderBy":resData.orderBy,
      'beginTime':domain.beginTime,
      'endTime':domain.endTime
    }
  })
}


/**
 * 确认关闭明细
 * @param ids
 * @returns {*}
 */
export function confirmCloseItem (ids) {
  return http({
    url: '/trade/orderController/putCloseItem',
    method: 'put',
    params: {
      'ids': ids.toString(),
      'readyFlag':'4'
    }
  })
}

/**
 * 拒绝关闭明细
 * @param ids
 * @returns {*}
 */
export function refuseCloseItem (ids) {
  return http({
    url: '/trade/orderController/putCloseItem',
    method: 'put',
    params: {
      'ids': ids.toString(),
      'readyFlag':'3'
    }
  })
}



/**
 * 设置为已备完
 * @param recordId
 * @returns {*}
 */
export function completeStockUp (recordId) {
  return http({
    url: '/trade/orderController/putStockUpState',
    method: 'put',
    params: {
      'orderItemId': recordId
    }
  })
}

/**
 * 阅读订单
 * @param ids
 * @returns {*}
 */
export function readItem (ids) {
  return http({
    url: '/trade/orderController/putReadItem',
    method: 'put',
    params: {
      'recordIds': ids.toString()
    }
  })
}

/**
 *全部列表 >>导出Excel
 * @param domain
 * @returns {*}
 */
export function exportEXL(resData,domain) {
  return http({
    url: '/trade/orderController/exportSalerItemList',
    method: 'get',
    responseType: 'blob',// 表明返回服务器返回的数据类型
    use: 'all',
    params: {'pageNum': resData.pageNum,
      'pageSize': resData.pageSize,
      'searchName':domain.name,
      'bakMedicalSpec':domain.specification,
      'pageSign':domain.pageSign,
      'bakFactoryEasy':domain.bakFactoryEasy,
      'searchSender':domain.searchSender,
      'searchOrderState':domain.searchOrderState,
      'purchaseCode':domain.purchaseCode,
      'beginTime':domain.beginTime,
      'endTime':domain.endTime,
      'bakBuyerName':domain.bakBuyerName,
      "orderBy":resData.orderBy
    }
  })
}

/**
 * 备货及已到货列表 导出Excel
 * @param resData
 * @param domain
 * @returns {*}
 */
export function exportItemListReceive (resData,domain) {
  return http({
    url: '/trade/orderController/exportItemListReceive',
    method: 'get',
    responseType: 'blob',// 表明返回服务器返回的数据类型
    use: 'all',
    params: {'pageNum': resData.pageNum,
      'pageSize': resData.pageSize,
      'searchName':domain.name,
      'bakMedicalSpec':domain.specification,
      'pageSign':domain.pageSign,
      'bakFactoryEasy':domain.bakFactoryEasy,
      'searchSender':domain.searchSender,
      'searchOrderState':domain.searchOrderState,
      'purchaseCode':domain.purchaseCode,
      'bakBuyerName':domain.bakBuyerName,
      "orderBy":resData.orderBy,
      'beginTime':domain.beginTime,
      'endTime':domain.endTime
    }
  })
}


/**
 * 初始单条备货
 * @param domain
 * @returns {*}
 */
export function saveStockUp (domain) {
  return http({
    url: '/trade/orderController/postStockUp',
    method: 'post',
    data: {
      'orderItemId':domain.recordId,
      'orderId':domain.orderId,
      'invoiceNo':domain.invoiceNo,
      'medicalExpiredDate':domain.medicalExpiredDate,
      'lotNo':domain.lotNo,
      'amount':domain.amount
    }
  })
}

/**
 * 单条备货修改
 * @param domain
 * @returns {*}
 */
export function updateOrSave (domain) {
  return http({
    url: '/trade/orderController/putSaveStockUp',
    method: 'put',
    data: {
      'orderItemId':domain.recordId,
      'orderId':domain.orderId,
      'invoiceNo':domain.invoiceNo,
      'medicalExpiredDate':domain.medicalExpiredDate,
      'lotNo':domain.lotNo,
      'amount':domain.amount,
      'id':domain.id
    }
  })
}
