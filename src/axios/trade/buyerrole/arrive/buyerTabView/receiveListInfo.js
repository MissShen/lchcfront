import http from 'src/axios/http'
import { dateFormat } from 'src/axios/auditchanges/common/nestedJson'

/**
 * 到货处理
 * @param stockupId
 * @returns {*}
 */
export function updateReceiveStockup (stockupId) {
  return http({
    url: '/trade/receiveController/updateReceiveStockup',
    method: 'put',
    params: {
      'stockupId': stockupId
    }
  })
}

/**
 * 关闭明细
 * @param stockupId
 * @returns {*}
 */
export function deleteCloseStockup (stockUpId) {
  return http({
    url: '/trade/receiveController/deleteCloseStockup',
    method: 'delete',
    params: {
      'stockUpId': stockUpId
    }
  })
}

/**
 * 采购管理——订单列表
 * @param resDate
 * @param domain
 * @returns {*}
 */
export function queryPurchaseItemList (resData,query) {
  dateFormat(query,['Date']);
  return http({
    url: '/trade/purchase/queryPurchaseItemsList',
    method: 'get',
    params: {
      'pageNum': resData.pageNum,
      'pageSize': resData.pageSize,
      'searchPurchaseCode': query.searchPurchaseCode,
      'searchProductName': query.searchProductName,
      'searchMedicalSpec': query.searchMedicalSpec,
      'searchOrgName': query.searchOrgName,
      'searchSenderName': query.searchSenderName,
      'searchOrderState': query.searchOrderState,
      'searchInvoiceNo': query.searchInvoiceNo,
      'searchEndDate': query.searchEndDate,
      'searchBenDate': query.searchBenDate,
      "orderBy":resData.orderBy,
      "dataFlag":query.dataFlag
    }
  })
}
/**
 * 订单作废处理
 * @param resDate
 * @param domain
 * @returns {*}
 */
export function handleCancelList (resData,query) {
  dateFormat(query,['Date']);
  return http({
    url: '/trade/purchase/handleCancelList',
    method: 'get',
    params: {
      'pageNum': resData.pageNum,
      'pageSize': resData.pageSize,
      'searchName': query.searchName,
      'searchSender': query.searchSender,
      'bakBuyerName': query.bakBuyerName,
      'bakMedicalSpec': query.bakMedicalSpec
    }
  })
}
/**
 * 到货list
 * @param query
 * @author: YuanJiMin
 * @date: 2018/4/25 14:46
 * @return:
 */
export  function queryUnSendOrderItemList(resData,query){
  return http({
    url: '/trade/receiveController/queryUnSendOrderItemList',
    method: 'get',
    params: {
      'pageNum': resData.pageNum,
      'pageSize': resData.pageSize,
      'searchPurchaseCode': query.purchaseId,
      'searchProductName': query.purchaseName,
      'searchMedicalSpec': query.purchaseSpec,
      'searchOrgName': query.productionOrg,
      'searchSenderName': query.distributionOrg,
      'searchOrderState': query.orderState,
      'searchInvoiceNo': query.invoiceNumber,
      'orderItemState': query.orderItemState
    }
  })
}

/**
 * 到货list
 * @param query
 * @author: YuanJiMin
 * @date: 2018/4/25 14:46
 * @return:
 */
export  function querySendOrderItemList(resData,query){
  return http({
    url: '/trade/receiveController/querySendOrderItemList',
    method: 'get',
    params: {
      "orderBy":resData.orderBy,
      'pageNum': resData.pageNum,
      'pageSize': resData.pageSize,
      'searchPurchaseCode': query.purchaseId,
      'searchProductName': query.purchaseName,
      'searchMedicalSpec': query.purchaseSpec,
      'searchOrgName': query.productionOrg,
      'searchSenderName': query.distributionOrg,
      'searchOrderState': query.orderState,
      'searchInvoiceNo': query.invoiceNumber,
      'orderItemState':query.orderItemState,
      'searchEndDate': query.searchEndDate,
      'searchBenDate': query.searchBenDate,
      'dataFlag':query.dataFlag
    }
  })
}
export  function querySendOrderItemListCount(){
  return http({
    url: '/trade/receiveController/querySendOrderItemListCount',
    method: 'get',
    params: {}
  })
}


/**
 * 确认到货操作
 * @param query
 * @author: joey
 * @date: 2018/5/9 14:46
 * @return:
 */
export  function updateDisabled(orderItemId){
  return http({
    url: '/trade/receiveController/updateDisabled',
    method: 'put',
    params: {
      'orderItemId': orderItemId
    }
  })
}



/**
 * 确认到货操作
 * @param query
 * @author: YuanJiMin
 * @date: 2018/4/25 14:46
 * @return:
 */
export  function autoArrival(resData,query){
  return http({
    url: '/trade/receiveController/autoArrival',
    method: 'put',
    params: {
      'invoiceNos': query.invoiceNos,
      'purchaseInvoiceNos': query.purchaseInvoiceNos,
      'lotNos': query.lotNos,
      'invoiceExpireDates': query.medicalExpiredDates,
      'receiveQtys': query.stockupQtys,
      'orderItemIds': query.orderItemIds,
      'orderIds': query.orderIds,
      'planStockQtys': query.planStockQtys,
      'stockupIds': query.stockupIds
    }
  })
}


/**
 * 确认到货操作
 * @param query
 * @author: YuanJiMin
 * @date: 2018/4/25 14:46
 * @return:
 */
export  function commintReceiveQuery(resData,query){
  return http({
    url: '/trade/receiveController/saveOrderReceive',
    method: 'get',
    params: {
      'invoiceNos': query.invoiceNos,
      'purchaseInvoiceNos': query.purchaseInvoiceNos,
      'lotNos': query.lotNos,
      'invoiceExpireDates': query.medicalExpiredDates,
      'receiveQtys': query.stockupQtys,
      'orderItemIds': query.orderItemIds,
      'orderIds': query.orderIds,
      'planStockQtys': query.planStockQtys,
      'stockupIds': query.stockupIds
    }
  })
}

/**
 * 待评价list
 * @param query
 */
export  function queryEvaluatedOrderItemList(resData,query){
  return http({
    url: '/trade/evaluateController/queryEvaluatedOrderItemList',
    method: 'get',
    params: {
      "orderBy":resData.orderBy,
      'pageNum': resData.pageNum,
      'pageSize': resData.pageSize,
      'purchaseCode': query.purchaseCode,
      'bakBuyerEasy': query.bakBuyerEasy,
      'bakMedicalSpec': query.bakMedicalSpec,
      'bakFactoryName': query.bakFactoryName,
      'bakSenderEasy': query.bakSenderEasy,
      'dataFlag':query.dataFlag
    }
  })
}
export  function queryEvaluatedOrderItemListCount(){
  return http({
    url: '/trade/evaluateController/queryEvaluatedOrderItemListCount',
    method: 'get',
    params: {}
  })
}

/**
 * 订单评价填报
 * @param dormain
 * @returns {*}
 */
export function evaFill (dormain,ids) {
  return http({
    url: '/trade/evaluateController/insertEvalueateFill',
    method: 'post',
    params: {
      speedState:dormain.speedState,
      serviceState:dormain.serviceState,
      stockInfoState:dormain.stockInfoState,
      productPack:dormain.productPack,
      evaluate:dormain.evaluate,
      ids:ids.toString()
    }
  })
}
/**
 * 到货修改列表
 * @param resData
 * @param query
 * @returns {*}
 */
export  function queryOrdOrderItem(resData,query){
  return http({
    url: '/trade/receiveController/queryOrdOrderItem',
    method: 'get',
    params: {
      'pageNum': resData.pageNum,
      "orderBy":resData.orderBy,
      'pageSize': resData.pageSize,
      'searchName': query.searchName,
      'searchBenDate': query.searchBenDate,
      'searchEndDate': query.searchEndDate,
      'bakProductSpec': query.bakProductSpec,
      'searchSender': query.searchSender,
      'bakBuyerName': query.bakBuyerName
    }
  })
}
/**
 * 设置修改
 * @param resData
 * @param query
 * @returns {*}
 */
export  function changeOrderState(receiveId){
  return http({
    url: '/trade/receiveController/changeOrderItemState',
    method: 'put',
    params: {
      'id': receiveId
    }
  })
}

/**
 * 生成补单
 * @param recordId
 * @returns {*}
 */
export  function generateSupplementPurchase(stockupId){
  return http({
    url: '/trade/receiveController/generateSupplementPurchase',
    method: 'put',
    params: {
      'stockupId': stockupId
    }
  })
}
/**
 * 设置修改
 * @param resData
 * @param query
 * @returns {*}
 */
export  function changeCancelOrderItemState(recordId,orderItemState){
  return http({
    url: '/trade/receiveController/changeCancelOrderItemState',
    method: 'put',
    params: {
      'orderItemId': recordId,
      'orderItemState': orderItemState
    }
  })
}
/**
 * 保存修改
 * @param resData
 * @param query
 * @returns {*}
 */
export  function saveReceiveOrder(domain){
  dateFormat(domain,['Date']);
  return http({
    url: '/trade/receiveController/saveReceiveOrder',
    method: 'put',
    params: {
      'id': domain.receiveId,                                  //receive            id
      'lotNo': domain.receiveLotNo,                            //receive
      'receiveQty': domain.receiveQty,                         //receive
      'medicalExpiredDateString':domain.medicalExpiredDate,    //receive
      'stockupId': domain.stockupId,                           //ord_order_stockup  id
      'invoiceNo': domain.invoiceNo,                           //ord_order_stockup
      'orderItemId': domain.recordId                           //orderItem          id
    }
  })
}

/**
 * 订单导入功能
 * @param domain
 * @returns {*}
 */
export function uploadFileToAttachMent (formData) {
  return http({
    url: '/trade/receiveController/applyDisable',
    method: 'post',
    type:'json',
    data: formData
  })
}


/**
 * 导出待收货列表
 * @param ids
 * @returns {*}
 */
export function exportEXL(domain) {
  console.log(domain);
  return http({
    url: '/trade/receiveController/exportSendOrderItemList',
    method: 'get',
    responseType: 'blob',// 表明返回服务器返回的数据类型
    use: 'all',
    params: {
      'searchPurchaseCode': domain.purchaseId,
      'searchProductName': domain.purchaseName,
      'searchMedicalSpec': domain.purchaseSpec,
      'searchOrgName': domain.productionOrg,
      'searchSenderName': domain.distributionOrg,
      'searchOrderState': domain.orderState,
      'searchInvoiceNo': domain.invoiceNumber,
      'orderItemState':domain.orderItemState,
      'dataFlag':domain.dataFlag
    }
  })
}


/**
 * 导出订单
 * @param query
 * @returns {*}
 */
export function exportData(query) {
  return http({
    url: '/trade/receiveController/exportData',
    method: 'get',
    responseType: 'blob',// 表明返回服务器返回的数据类型
    use: 'all',
    params: {
      'searchPurchaseCode': query.searchPurchaseCode,
      'searchProductName': query.searchProductName,
      'searchMedicalSpec': query.searchMedicalSpec,
      'searchOrgName': query.searchOrgName,
      'searchSenderName': query.searchSenderName,
      'searchOrderState': query.searchOrderState,
      'searchInvoiceNo': query.searchInvoiceNo,
      'searchEndDate': query.searchEndDate,
      'searchBenDate': query.searchBenDate,
      "dataFlag":query.dataFlag
    }
  })
}


/**
 * 导出到货
 * @param query
 * @returns {*}
 */
export function exportArriveData(query) {
  return http({
    url: '/trade/receiveController/exportArriveData',
    method: 'get',
    responseType: 'blob',// 表明返回服务器返回的数据类型
    use: 'all',
    params: {
      'searchPurchaseCode': query.searchPurchaseCode,
      'searchProductName': query.searchProductName,
      'searchMedicalSpec': query.searchMedicalSpec,
      'searchOrgName': query.searchOrgName,
      'searchSenderName': query.searchSenderName,
      'searchOrderState': query.searchOrderState,
      'searchInvoiceNo': query.searchInvoiceNo,
      'searchEndDate': query.searchEndDate,
      'searchBenDate': query.searchBenDate,
      "dataFlag":query.dataFlag
    }
  })
}


/**
 * 导出到货
 * @param query
 * @returns {*}
 */
export function checkCanReturn(receiveId,receiveQty) {
  return http({
    url: '/trade/returnController/checkCanReturn',
    method: 'get',
    params: {
      'receiveId': receiveId,
      'receiveQty': receiveQty
    }
  })
}
