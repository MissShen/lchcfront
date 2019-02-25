import http from 'src/axios/http'

/**
 * 退货列表
 * @param resData
 * @param domain
 * @returns {*}
 */
export function queryReturnSenderList (resData,query) {
  return http({
    url: '/trade/returnController/queryReturnSenderList',
    method: 'get',
    params: {'pageNum': resData.pageNum,
              'pageSize': resData.pageSize,
              'bakProductName':query.bakProductName,
              'returnCode':query.returnCode,
              'enterpriseState':query.enterpriseState,
              'searchName':query.searchName,
              'searchBenDate':query.searchBenDate,
              'searchEndDate':query.searchEndDate,
              'factoryEasy':query.factoryEasy,
              'searchState':query.searchState,
              'pageType':query.pageType,
              'buyerEasy':query.buyerEasy,
              'bakFactoryName': query.bakFactoryName,
              "orderBy":resData.orderBy,


    },
    data:{'obj':query}
  })
}
/**
 * 退货操作
 * @param resData
 * @param domain
 * @returns {*}
 */
export function updateReturn (arr,whether) {
  var param = JSON.stringify(arr);
  return http({
    url: '/trade/returnController/updateReturn',
    method: 'put',
    params: {'arr': param,'whether': whether},
    type: 'json'
  })
}

/**
 * 订单管理-退货明细
 * @param resData
 * @param domain
 * @returns {*}
 */
export function handleList (resData,query) {
  return http({
    url: '/trade/returnController/handleList',
    method: 'get',
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
 * 审批管理-待审批退货单
 * @param resData
 * @param domain
 * @returns {*}
 */
export function handleListToCheck (resData,query) {
  return http({
    url: '/trade/returnController/handleListToCheck',
    method: 'get',
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
 * 获取药库
 * @param resData
 * @param domain
 * @returns {*}
 */
export function getRepositoryFlag () {
  return http({
    url: '/trade/returnController/getRepositoryFlag',
    method: 'get',
    params: {

    }
  })
}

/**
 * 退货详情
 * * @param resData
 * @param domain
 * @returns {*}
 */
export function returnDetail (id) {
  return http({
    url: '/trade/returnController/returnDetail',
    method: 'get',
    params: {
      'id': id
    }
  })
}

/**
 * 审批退货详情
 * * @param resData
 * @param domain
 * @returns {*}
 */
export function returnDetailX (id) {
  return http({
    url: '/trade/returnController/returnDetailX',
    method: 'get',
    params: {
      'id': id
    }
  })
}

/**
 * 审批退货详情
 * * @param resData
 * @param domain
 * @returns {*}
 */
export function returnDetailCreate (receiveId) {
  return http({
    url: '/trade/returnController/returnDetailCreate',
    method: 'get',
    params: {
      'id': receiveId
    }
  })
}




/**
 * 创建退货列表
 * @param resData
 * @param domain
 * @returns {*}
 */
export function chooseNewList (resData,query) {
  return http({
    url: '/trade/returnController/chooseNewList',
    method: 'get',
    params: {
      'pageNum': resData.pageNum,
      'pageSize': resData.pageSize,
      'bakFactoryEasy': query.bakFactoryEasy,
      'buyerName': query.buyerName,
      'bakProductName': query.bakProductName,
      'lotNo': query.lotNo,
      'orderCode': query.orderCode,
      'createBenDate': query.createBenDate,
      'createEenDate': query.createEenDate,
      'purchaseCode':query.purchaseCode,
      "orderBy":resData.orderBy,
      'dataFlag':query.dataFlag,
      'senderName':query.senderName
    }
  })
}

/**
 * 创建退货列表
 * @param resData
 * @param domain
 * @returns {*}
 */
export function chooseDomain (query) {
  return http({
    url: '/trade/returnController/chooseDomain',
    method: 'get',
    params: {
      'bakFactoryEasy': query.bakFactoryEasy,
      'buyerName': query.buyerName,
      'bakProductName': query.bakProductName,
      'lotNo': query.lotNo,
      'orderCode': query.orderCode,
      'createBenDate': query.createBenDate,
      'createEenDate': query.createEenDate,
      'purchaseCode':query.purchaseCode
    }
  })
}

/**
 * 创建退货列表详情
 * @param resData
 * @param domain
 * @returns {*}
 */
export function findNewReturnDetails (id) {
  return http({
    url: '/trade/returnController/findNewReturnDetails',
    method: 'get',
    params: {
    'id':id
    }
  })
}
/**
 * 确认退货
 * @param resData
 * @param domain
 * @returns {*}
 */
export function saveConfirm (query) {
  return http({
    url: '/trade/returnController/saveConfirm',
    method: 'get',
    params: {
      'ids': query.ids,
      'returnSaveQty': query.returnSaveQty,
      'remarks': query.remarks,
      'keys': query.keys,
      'returnReason':query.returnReason
    }
  })
}

/**
 * 导出
 * @param ids
 * @returns {*}
 */
export function exportEXL(query) {
  return http({
    url: '/trade/returnController/exportReturnSenderList',
    method: 'get',
    responseType: 'blob',// 表明返回服务器返回的数据类型
    use: 'all',
    params: {
      'bakProductName':query.bakProductName,
      'returnCode':query.returnCode,
      'enterpriseState':query.enterpriseState,
      'searchName':query.searchName,
      'searchBenDate':query.searchBenDate,
      'searchEndDate':query.searchEndDate,
      'factoryEasy':query.factoryEasy,
      'searchState':query.searchState,
      'pageType':query.pageType,
      'buyerEasy':query.buyerEasy,
      'bakFactoryName': query.bakFactoryName
    }
  })
}


/**
 * 全部退货列表导出
 * @param resData
 * @param domain
 * @returns {*}
 */
export function exportHandleList (resData,query) {
  return http({
    url: '/trade/returnController/exportHandleList',
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
 * 审批通过
 * @param resData
 * @param domain
 * @returns {*}
 */
export function sbmitReturn (domain) {
  return http({
   /* url: '/trade/returnController/saveConfirm',
    method: 'get',
    params: {
      'ids': query.ids,
      'returnSaveQty': query.returnSaveQty,
      'remarks': query.remarks,
      'keys': query.keys
    }*/
  })
}
