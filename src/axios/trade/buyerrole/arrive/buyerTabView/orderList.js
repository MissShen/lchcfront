import http from 'src/axios/http'
import { dateFormat } from 'src/axios/auditchanges/common/nestedJson'

/**
 *  下级列表
 * @param null
 * @author: HYY
 * @date: 2018/5/11 10:13
 * @return:
 */
export function queryPurchaseSubList (resData,query) {
  return http({
    url: '/trade/receiveController/queryPurchaseSubList',
    method: 'get',
    params: {
      "orderBy":resData.orderBy,
      "searchOrgName": query.searchOrgName,
      "pageNum" : resData.pageNum,
      "pageSize" : resData.pageSize
    }
  })
}

/**
 *  下级列表
 * @param null
 * @author: HYY
 * @date: 2018/5/10 15:13
 * @return:
 */
export function queryRecDetailList (resData,query,buyerOrgId) {
  dateFormat(query,['Date']);
  return http({
    url: '/trade/receiveController/queryRecDetailList',
    method: 'get',
    params: {
      "orderBy":resData.orderBy,
      "searchBenDate": query.searchBenDate,
      "searchEndDate" : query.searchEndDate,
      "buyerOrgId": buyerOrgId,
      "pageSize":resData.pageSize,
      "pageNum":resData.pageNum
    }
  })
}

/**
 *  导出txt
 * @param null
 * @author: HYY
 * @date: 2018/5/11 10:13
 * @return:
 */
export function exportDetailText (query,buyerOrgId) {
  dateFormat(query,['Date']);
  return http({
    url: '/trade/receiveController/exportDetailText',
    method: 'post',
    responseType: 'blob',// 表明返回服务器返回的数据类型
    use: 'all',
    params: {
      "searchBenDate": query.searchBenDate,
      "searchEndDate" : query.searchEndDate,
      "buyerOrgId": buyerOrgId
    }
  })
}

/**
 *  导出excel
 * @param null
 * @author: HYY
 * @date: 2018/5/11 10:13
 * @return:
 */
export function exportDetailExcel (query,buyerOrgId) {
  dateFormat(query,['Date']);
  return http({
    url: '/trade/receiveController/exportDetailExcel',
    method: 'post',
    responseType: 'blob',// 表明返回服务器返回的数据类型
    use: 'all',
    data: {
      "searchBenDate": query.searchBenDate,
      "searchEndDate" : query.searchEndDate,
      "buyerOrgId": buyerOrgId
    }
  })
}



/**
 * 采购管理——订单列表
 * @param resDate
 * @param domain
 * @returns {*}
 */
export function selectOrderList (resData,query) {
  return http({
    url: '/trade/receiveController/orderList',
    method: 'get',
    params: {
      'pageNum': resData.pageNum,
      'pageSize': resData.pageSize,
      'searchBenDate': query.searchBenDate,
      'searchEndDate': query.searchEndDate,
      'bakSenderEasy': query.bakSenderEasy,
      'bakBuyerEasy': query.bakBuyerEasy,
      'searchSenderName': query.searchSenderName,
      'degreeFlag': query.degreeFlag
    }
  })
}

/**
 * 采购管理——待收货
 * @param resDate
 * @param domain
 * @returns {*}
 */
export function selectOrderReceiveList (resData,query) {
  return http({
    url: '/trade/receiveController/orderReceiveList',
    method: 'GET',
    params:{
      'pageNum': resData.pageNum,
      'pageSize': resData.pageSize,
      'searchBenDate': query.searchBenDate,
      'searchEndDate': query.searchEndDate,
      'bakSenderEasy': query.bakSenderEasy,
      'bakBuyerEasy': query.bakBuyerEasy,
      'searchSenderName': query.searchSenderName,
      'degreeFlag': query.degreeFlag
    }


  })
}


/**
 * 采购管理——待评价
 * @param resDate
 * @param domain
 * @returns {*}
 */
export function selectOrderEvaluateList (resData,query) {
  return http({
    url: '/trade/receiveController/orderEvaluateList',
    method: 'get',
    params: {
      'pageNum': resData.pageNum,
      'pageSize': resData.pageSize,
      'searchBenDate': query.searchBenDate,
      'searchEndDate': query.searchEndDate,
      'bakSenderEasy': query.bakSenderEasy,
      'bakBuyerEasy': query.bakBuyerEasy,
      'searchSenderName': query.searchSenderName,
      'degreeFlag': query.degreeFlag
    }
  })
}



/**
 * 订单查询
 * @param resData
 * @param domain
 * @returns {*}
 */
export function list (resData,query) {
  return http({
    url: '/trade/orderController/list',
    method: 'GET',
    params: {
      'pageNum': resData.pageNum,
      'pageSize': resData.pageSize,
      'orderState':query.orderState,
      'degreeFlag':query.degreeFlag,
      'bakBuyerEasy':query.bakBuyerEasy,
      'bakSenderEasy':query.bakSenderEasy,
      'orderCode':query.orderCode,
      'searchBenDate':query.searchBenDate,
      'searchEndDate':query.searchEndDate
    }
  })
}


/**
 * 订单详情
 * @param resData
 * @param domain
 * @returns {*}
 */
export function itemList (orderId) {
  return http({
    url: '/trade/orderController/itemList',
    method: 'GET',
    params: {
      'orderId': orderId
    }
  })
}

/**
 * 订单详情
 * @param resData
 * @param domain
 * @returns {*}
 */
export function invoiceInfo (recordId) {
  return http({
    url: '/trade/orderController/invoiceInfo',
    method: 'GET',
    params: {
      'recordId': recordId
    }
  })
}

