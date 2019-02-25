import http from 'src/axios/http'
import { dateFormat } from 'src/axios/auditchanges/common/nestedJson'

/**
 * 服务站采购模板
 * @param resData
 * @param query
 * @returns {*}
 */
export function templateList (resData,query) {
  return http({
    url: '/trade/purchase/templateList',
    method: 'get',
    params: {}
  })
}


/**
 * 服务站采购模板详情
 * @param resData
 * @param query
 * @returns {*}
 */
export function templateItemList (resData,query) {
  return http({
    url: '/trade/purchase/templateItemList',
    method: 'get',
    params: {}
  })
}

/**
 * 临时采购药品列表
 * @param resData
 * @param query
 * @returns {*}
 */
export function queryTemplateList (resData,query) {
  return http({
    url: '/trade/purchase/queryTemplateList',
    method: 'get',
    params: {
      pageNum : resData.pageNum,
      pageSize : resData.pageSize,
      orderBy : resData.orderBy,
      searchBenDate:query.searchBenDate,
      searchEndDate:query.searchEndDate,
      searchByName:query.searchByName,
      searchPurchaseCode:query.searchPurchaseCode,
    }
  })
}

/**
 * 更改买方备注
 * @param purchaseItemId
 * @param buyerRemark
 * @returns {*}
 */
export function updatePurchaseItemRemark (purchaseItemId,buyerRemark) {
  return http({
    url: '/trade/purchase/updatePurchaseCar',
    method: 'post',
    params: {
      purchaseItemId: purchaseItemId,
      purchaseId: null,
      requestQty: null,
      senderId: null,
      buyerRemark: buyerRemark
    }
  })
}

/**
 * 更改买方数量
 * @param requestQty
 * @param purchaseItemId
 * @param purchaseId
 * @returns {*}
 */
export function updatePurchaseItemQty (requestQty,purchaseItemId,purchaseId,repositoryId) {
  return http({
    url: '/trade/purchase/updatePurchaseCar',
    method: 'post',
    params: {
      purchaseItemId: purchaseItemId,
      purchaseId: purchaseId,
      requestQty: requestQty,
      senderId: null,
      buyerRemark: null,
      repositoryId: repositoryId
    }
  })
}


/**
 * 更改买方配送
 * @param senderId
 * @param purchaseItemId
 * @returns {*}
 */
export function updatePurchaseItemSender (senderId,purchaseId,purchaseItemId,repositoryId,productId) {
  return http({
    url: '/trade/purchase/updatePurchaseCar',
    method: 'post',
    params: {
      purchaseItemId: purchaseItemId,
      purchaseId: purchaseId,
      requestQty: null,
      senderId: senderId,
      buyerRemark: null,
      repositoryId: repositoryId,
      productId: productId
    }
  })
}

/**
 * 更改买方配送地址
 * @param senderId
 * @param purchaseItemId
 * @returns {*}
 */
export function updatePurchaseItemAddress (addressId,purchaseId,purchaseItemId,repositoryId,productId) {
  return http({
    url: '/trade/purchase/updatePurchaseCar',
    method: 'post',
    params: {
      purchaseItemId: purchaseItemId,
      purchaseId: purchaseId,
      requestQty: null,
      addressId: addressId,
      buyerRemark: null,
      repositoryId: repositoryId,
      productId : productId
    }
  })
}


/**
 * 服务中心我的采购单
 * @param resData
 * @param query
 * @returns {*}
 */
export function queryFirstPlanList (resData,query) {
  dateFormat(query,['Date']);
  return http({
    url: '/trade/purchase/queryFirstPlanList',
    method: 'get',
    params: {
      'searchBuyerName': query.searchBuyerName,
      'searchPurchaseFlag': query.searchPurchaseFlag,
      'searchPurchaseState': query.searchPurchaseState,
      'searchByName': query.searchByName,
      'searchPurchaseCode': query.searchPurchaseCode,
      'searchBenDate': query.searchBenDate,
      'searchEndDate': query.searchEndDate,
      "pageNum" : resData.pageNum,
      "pageSize" : resData.pageSize,
      "orderBy" : resData.orderBy,
      "dataFlag":query.dataFlag
    }
  })
}


/**
 * 查询角色
 */
export function findRole () {
  return http({
    url: '/trade/purchase/findRole',
    method: 'get',
    params: {}
  })
}

/**
 * 查询有无二审关系
 */
export function findSecondFlag () {
  return http({
    url: '/trade/purchase/findSecondFlag',
    method: 'get',
    params: {}
  })
}


/**
 * 删除采购单
 * @param purchaseId
 * @returns {*}
 */
export function deletePurchase (purchaseId) {
  return http({
    url: '/trade/purchase/deleteFirstPurchase',
    method: 'delete',
    params: {
      'purchaseId': purchaseId
    }
  })
}

/**
 * 复制
 * @param purchaseId
 * @returns {*}
 */
export function copySave (purchaseId) {
  return http({
    url: '/trade/purchase/insertCopyPurchase',
    method: 'get',
    params: {
      'purchaseId': purchaseId
    }
  })
}




/**
 * 服务站我的采购单
 * @param resData
 * @param query
 * @returns {*}
 */
export function queryPlanList (resData,query) {
  return http({
    url: '/trade/purchase/queryPlanList',
    method: 'get',
    params: {
      "pageNum" : resData.pageNum,
      "pageSize" : resData.pageSize
    }
  })
}

/**
 * 本院目录
 * @param resData
 * @param query
 * @returns {*}
 */
export function purchaseTabs (resData,query) {
  return http({
    url: '/trade/purchase/queryBuyerMedicineList',
    method: 'get',
    params: {
      "searchRepositoryId" : query.searchRepositoryId,
      "searchProductName": query.searchProductName,
      "searchMedicalSpec": query.searchMedicalSpec,
      "searchOrgName": query.searchOrgName,
      "searchSenderName": query.searchSenderName,
      "searchBenDate": query.searchBenDate,
      "searchEndDate": query.searchEndDate,
      "pageNum" : resData.pageNum,
      "pageSize" : resData.pageSize
    }
  })
}

/**
 * 编辑采购单
 * @param resData
 * @param query
 * @returns {*}
 */
export function purchaseItemList (resData,query) {
  return http({
    url: '/trade/purchase/purchaseItemList',
    method: 'get',
    params: {}
  })
}


/**
 * 紧急处理多页面
 * @param resData
 * @param query
 * @returns {*}
 */
export function productListTabs (resData,query) {
  return http({
    url: '/trade/purchase/productListTabs',
    method: 'get',
    params: {}
  })
}

/**
 * 打印
 * @param resData
 * @param query
 * @returns {*}
 */
export function printList (resData,query) {
  return http({
    url: '/trade/purchase/printList',
    method: 'get',
    params: {}
  })
}


/**
 * 价格预警详情
 * @param resData
 * @param query
 * @returns {*}
 */
export function priceWarningItem (request,query) {
  return http({
    url: '/trade/purchase/priceWarningItemList',
    method: 'get',
    params: {}
  })
}


/**
 * 服务站价格预警
 * @param resData
 * @param query
 * @returns {*}
 */
export function priceWarning (resData,query) {
  return http({
    url: 'trade/purchase/queryPriceWarningList',
    method: 'get',
    params: {
      "buyerOrgId" : query.buyerOrgId,
      "enableFlag":query.enableFlag,
      "searchProductName":query.searchProductName,
      "searchMedicalSpec":query.searchMedicalSpec,
      "searchOrgName":query.searchOrgName,
      "searchBasicFlag": query.searchBasicFlag,
      "searchTwoVotes": query.searchTwoVotes,
      "pageNum" : resData.pageNum,
      "pageSize" : resData.pageSize,
      "orderBy":resData.orderBy,
    }
  })
}

/**
 * 执行最低价格
 * @param resDate
 * @param domain
 * @returns {*}
 */
export function minPriceBuyer (resData,query) {
  return http({
    url: 'trade/purchase/minPriceBuyer',
    method: 'get',
    params: {
      'pageNum': resData.pageNum,
      'pageSize': resData.pageSize,
      'productId':query.productId,
      'minPrice':query.minTradePrice,
      "orderBy":resData.orderBy,

    }
  })
}

/**
 *
 * @param resData
 * @param query
 * @returns Integer
 */
export function priceWarningCount (productId,minTradePrice) {
  return http({
    url: 'trade/purchase/priceWarningCount',
    method: 'get',
    params: {

      'productId':productId,
      'minPrice':minTradePrice

    }
  })
}

/**
 * 一审代替下级制单
 * @param resData
 * @param query
 * @returns {*}
 */
export function nextBuyerSave (resData,query) {
  return http({
    url: '/trade/purchase/nextBuyerSave',
    method: 'get',
    params: {}
  })
}


/**
 * 候选目录
 * @param resData
 * @param query
 * @returns {*}
 */
export function nextBuyerMedicineList (resData,query) {
  return http({
    url: '/trade/purchase/nextBuyerMedicineList',
    method: 'get',
    params: {}
  })
}


/**
 *
 * 本院购物车
 * @param resData
 * @param query
 * @returns {*}
 */
export function medicineShoppingList (resData,query,purchaseId) {
  return http({
    url: '/trade/purchase/medicineShoppingList',
    method: 'get',
    params: {
      "orderBy":resData.orderBy,
      "purchaseId": purchaseId,
      "searchProductName":query.searchProductName,
      "searchMedicalSpec":query.searchMedicalSpec,
      "pageNum" : resData.pageNum,
      "pageSize" : resData.pageSize,
      "orderBy":resData.orderBy,
      "searchAddress":query.searchAddress,
      "searchSenderName":query.searchSenderName,
      "searchOrgName":query.searchOrgName,
      "searchTwoVotes":query.searchTwoVotes,
      "searchIsRegion":query.searchIsRegion,
      "searchBasicFlag":query.searchBasicFlag
    }
  })
}

/**
 * 购物车中删除药品
 * @returns {*}
 */
export function deleteMedicineShoppingCar(idList,purchaseId){
  return http({
    url: '/trade/purchase/deleteMedicineShoppingCar',
    method: 'delete',
    params: {
      'idList': idList,
      'purchaseId': purchaseId
    }
  })
}

/**
 * 购物车中设置急需
 * @returns {*}
 */
export function updateDegreeSet(idList,purchaseId){
  return http({
    url: '/trade/purchase/updateDegreeSet',
    method: 'get',
    params: {
      "idList": idList,
      "purchaseId": purchaseId
    }
  })
}

/**
 * 购物车中设置整单急需
 * @returns {*}
 */
export function updateAllDegreeSet(purchaseId){
  return http({
    url: '/trade/purchase/updateAllDegreeSet',
    method: 'get',
    params: {
      "purchaseId": purchaseId
    }
  })
}

/**
 * 购物车中取消急需
 * @returns {*}
 */
export function updateDegreeCancel(idList,purchaseId){
  return http({
    url: '/trade/purchase/updateDegreeCancel',
    method: 'get',
    params: {
      "idList": idList,
      "purchaseId": purchaseId
    }
  })
}


/**
 * 购物车中取消整单急需
 * @returns {*}
 */
export function updateAllDegreeCancel(purchaseId){
  return http({
    url: '/trade/purchase/updateAllDegreeCancel',
    method: 'get',
    params: {
      "purchaseId": purchaseId
    }
  })
}


/**
 * 购物车中设置补单
 * @returns {*}
 */
export function updateSuppleSet(purchaseId){
  return http({
    url: '/trade/purchase/updateSuppleSet',
    method: 'get',
    params: {
      "purchaseId": purchaseId
    }
  })
}

/**
 * 购物车中取消补单
 * @returns {*}
 */
export function updateSuppleCancel(purchaseId){
  return http({
    url: '/trade/purchase/updateSuppleCancel',
    method: 'get',
    params: {
      "purchaseId": purchaseId
    }
  })
}


/**
 * 一审待审批采购单列表
 * @param resData
 * @param query
 * @returns {*}
 */
export function queryFirstApprovePurchaseList (resData,query) {
  dateFormat(query,['Date']);
  return http({
    url: '/trade/purchase/queryFirstApprovePurchaseList',
    method: 'get',
    params: {
      "searchPurchaseCode":query.searchPurchaseCode,
      "searchBenDate":query.searchEndDate,
      "searchEndDate":query.searchEndDate,
      "pageNum" : resData.pageNum,
      "pageSize" : resData.pageSize,
      "orderBy":resData.orderBy,
    }
  })
}

/**
 * 二审待审批采购单列表
 * @param resData
 * @param query
 * @returns {*}
 */
export function queryCheckApprovePurchaseList (resData,query) {
  dateFormat(query,['Date']);
  return http({
    url: '/trade/purchase/queryCheckApprovePurchaseList',
    method: 'get',
    params: {
      "searchPurchaseCode":query.searchPurchaseCode,
      "searchBenDate":query.searchEndDate,
      "searchEndDate":query.searchEndDate,
      "pageNum" : resData.pageNum,
      "pageSize" : resData.pageSize,
      "orderBy":resData.orderBy,
    }
  })
}

/**
 *
 * 一审待审核采购单明细
 * @param purchaseId
 * @returns {*}
 */
export function findFirstApprovePurchase (purchaseId) {
  return http({
    url: '/trade/purchase/findFirstApprovePurchase',
    method: 'get',
    params: {
      "purchaseId": purchaseId
    }
  })
}
/**
 *
 * @param null
 * @author: YuanJiMin
 * @date: 2018/4/26 15:30
 * @return:
 */
export function queryPlanItemList(resData,query,purchaseId) {
  return http({
    url: '/trade/plan/queryPlanItemList',
    method: 'get',
    params: {
      "purchaseId": purchaseId,
      "searchProductName": query.searchProductName,
      "searchMedicalSpec" : query.searchMedicalSpec,
      "pageSize":resData.pageSize,
      "pageNum":resData.pageNum,
      "orderBy":resData.orderBy,
    }
  })
}

/**
 *
 * @param null
 * @author: YuanJiMin
 * @date: 2018/4/26 15:30
 * @return:
 */
export function deletePlanItemMedical(planItemIds,purchaseId) {
  return http({
    url: '/trade/plan/deletePlanItemMedical',
    method: 'delete',
    params: {
      "purchaseId": purchaseId,
      "planItemIds": planItemIds
    }
  })
}

/**
 *
 * @param null
 * @author: YuanJiMin
 * @date: 2018/4/26 15:30
 * @return:
 */
export function updatePlanItemMedicalDegree(planItemIds,purchaseId,planDegreeFlag) {
  return http({
    url: '/trade/plan/updatePlanItemMedicalDegree',
    method: 'put',
    params: {
      "purchaseId": purchaseId,
      "planItemIds": planItemIds,
      "planDegreeFlag": planDegreeFlag
    }
  })
}


/**
 *
 * 一审通过或拒绝
 * @param purchaseId
 * @returns {*}
 */
export function updatePassOrRefusePurchase (purchaseId,flag) {
  return http({
    url: '/trade/purchase/updatePassOrRefusePurchase',
    method: 'put',
    params: {
      "purchaseId": purchaseId,
      "flag": flag
    }
  })
}

/**
 *
 * 发送拆单前检查议价和禁用
 * @param purchaseId
 * @returns {*}
 */
export function checkPurchaseSend (purchaseId) {
  return http({
    url: '/trade/purchase/checkPurchaseSend',
    method: 'get',
    params: {
      "purchaseId": purchaseId
    }
  })
}
/**
 *
 * 发送修改检查议价和禁用
 * @param purchaseId
 * @returns {*}
 */
export function updateCheckPurchase (purchaseId) {
  return http({
    url: '/trade/purchase/updateCheckPurchase',
    method: 'put',
    params: {
      "purchaseId": purchaseId
    }
  })
}



/**
 *
 * 一审待审核采购单明细
 * @param resData
 * @param query
 * @returns {*}
 */
export function queryFirstApprovePurchaseItemList (resData,query,purchaseId) {
  return http({
    url: '/trade/purchase/queryFirstApprovePurchaseItemList',
    method: 'get',
    params: {
      "purchaseId": purchaseId,
      "searchProductName":query.searchProductName,
      "searchMedicalSpec":query.searchMedicalSpec,
      "orderBy":resData.orderBy,
      "pageNum" : resData.pageNum,
      "pageSize" : resData.pageSize,
      "searchAddress":query.searchAddress,
      "searchSenderName":query.searchSenderName,
      "searchOrgName":query.searchOrgName,
      "searchBasicFlag": query.searchBasicFlag,
      "searchTwoVotes": query.searchTwoVotes,
      "searchIsRegion": query.searchIsRegion
    }
  })
}


/**
 * 一审审批采购单增加药品
 * @param resData
 * @param query
 * @returns {*}
 */
export function medicineOneList (resData,query) {
  return http({
    url: '/trade/purchase/medicineOneList',
    method: 'get',
    params: {}
  })
}


/**
 * 采购单明细查询
 * @param resData
 * @param query
 * @returns {*}
 */
export function itemQueryList (resData,query) {
  return http({
    url: '/trade/purchase/itemQueryList',
    method: 'get',
    params: {}
  })
}

export function queryList (resData,query) {
  return http({
    url: '/trade/purchase/queryList',
    method: 'get',
    params: {}
  })
}

/**
 * 一审采购单审批
 * @param resData
 * @param query
 * @returns {*}
 */
export function itemPrint (resData,query) {
  return http({
    url: '/trade/purchase/itemPrint',
    method: 'get',
    params: {}
  })
}

/**
 * 二审采购单明细查询
 * @param resData
 * @param query
 * @returns {*}
 */
export function itemAllList (resData,query) {
  return http({
    url: '/trade/purchase/itemAllList',
    method: 'get',
    params: {}
  })
}

/**
 * 一审采购模板
 * @param resData
 * @param query
 * @returns {*}
 */
export function firstTemplateList (resData,query) {
  return http({
    url: '/trade/purchase/firstTemplateList',
    method: 'get',
    params: {}
  })
}

/**
 * 一审采购模板详情
 * @param resData
 * @param query
 * @returns {*}
 */
export function firstTemplateItemList (resData,query) {
  return http({
    url: '/trade/purchase/firstTemplateItemList',
    method: 'get',
    params: {}
  })
}

/**
 * 服务中心制定采购单
 * @param resData
 * @param query
 * @returns {*}
 */
export function firstPurchaseTabs (resData,query) {
  return http({
    url: '/trade/purchase/firstPurchaseTabs',
    method: 'get',
    params: {}
  })
}

/**
 * 一审价格预警
 * @param resData
 * @param query
 * @returns {*}
 */
export function firstPriceWarning (request,query) {
  return http({
    url: '/trade/purchase/firstPriceWarning',
    method: 'get',
    params: {}
  })
}

/**
 * 一审采购供应目录
 * @param resData
 * @param query
 * @returns {*}
 */
export function firstMedicineList (resData,query) {
  return http({
    url: '/trade/purchase/firstMedicineList',
    method: 'get',
    params: {}
  })
}

/**
 * 供应目录
 * @param resData
 * @param query
 * @returns {*}
 */
export function medicineList (resData,query) {
 // alert(resData.orderBy)
  // dateFormat(query,['Date']);
  return http({
    url: '/trade/purchase/queryBuyerMedicineList',
    method: 'get',
    params: {
      "searchRepositoryId" : query.searchRepositoryId,
      "searchProductName": query.searchProductName,
      "searchMedicalSpec": query.searchMedicalSpec,
      "searchOrgName": query.searchOrgName,
      "searchSenderName": query.searchSenderName,
      "searchBenDate": query.searchBenDate,
      "searchEndDate": query.searchEndDate,
      "searchBasicFlag": query.searchBasicFlag,
      "searchTwoVotes": query.searchTwoVotes,
      "searchIsRegion": query.searchIsRegion,
      "pageNum" : resData.pageNum,
      "pageSize" : resData.pageSize,
      "orderBy" : resData.orderBy

    }
  })
}

/**
 * 增加药品供应目录
 * @param resData
 * @param query
 * @param purchaseId
 * @returns {*}
 */
export function medicineApproveList (resData,query,purchaseId) {
  dateFormat(query,['Date']);
  return http({
    url: '/trade/purchase/queryApproveBuyerMedicineList',
    method: 'get',
    params: {
      "searchRepositoryId" : query.searchRepositoryId,
      "searchProductName": query.searchProductName,
      "searchMedicalSpec": query.searchMedicalSpec,
      "searchOrgName": query.searchOrgName,
      "searchSenderName": query.searchSenderName,
      "searchBenDate": query.searchBenDate,
      "searchEndDate": query.searchEndDate,
      "searchBasicFlag": query.searchBasicFlag,
      "searchTwoVotes": query.searchTwoVotes,
      "searchIsRegion": query.searchIsRegion,
      "purchaseId": purchaseId,
      "pageNum" : resData.pageNum,
      "pageSize" : resData.pageSize,
      "orderBy":resData.orderBy,
    }
  })
}

export function templateMedicineList (resData,query,purchaseId) {
  dateFormat(query,['Date']);
  return http({
    url: '/trade/purchase/queryTemplateMedicineList',
    method: 'get',
    params: {
      "searchRepositoryId" : query.searchRepositoryId,
      "searchProductName": query.searchProductName,
      "searchMedicalSpec": query.searchMedicalSpec,
      "searchOrgName": query.searchOrgName,
      "searchSenderName": query.searchSenderName,
      "searchBenDate": query.searchBenDate,
      "searchEndDate": query.searchEndDate,
      "searchBasicFlag": query.searchBasicFlag,
      "searchTwoVotes": query.searchTwoVotes,
      "searchIsRegion":query.searchIsRegion,
      "purchaseId": purchaseId,
      "pageNum" : resData.pageNum,
      "pageSize" : resData.pageSize,
      "orderBy":resData.orderBy,
    }
  })
}
/**
 * 增加药品临采目录
 * @param resData
 * @param query
 * @param purchaseId
 * @returns {*}
 */
export function medicineTempList (resData,query,purchaseId) {
  dateFormat(query,['Date']);
  return http({
    url: '/trade/purchase/queryApproveTempMedicineList',
    method: 'get',
    params: {
      "orderBy":resData.orderBy,
      "searchRepositoryId" : query.searchRepositoryId,
      "searchProductName": query.searchProductName,
      "searchMedicalSpec": query.searchMedicalSpec,
      "searchOrgName": query.searchOrgName,
      "searchSenderName": query.searchSenderName,
      "searchBenDate": query.searchBenDate,
      "searchEndDate": query.searchEndDate,
      "searchBasicFlag": query.searchBasicFlag,
      "searchTwoVotes": query.searchTwoVotes,
      "purchaseId": purchaseId,
      "pageNum" : resData.pageNum,
      "pageSize" : resData.pageSize
    }
  })
}

/**
 * 我的购物车
 * @param resData
 * @param query
 * @returns {*}
 */
export function findCarTotal (flag) {
  return http({
    url: '/trade/purchase/findCarTotal',
    method: 'get',
    params: {
      "flag": flag
    }
  })
}

/**
 * 待审核增加药品
 * @param flag
 * @param purchaseId
 * @returns {*}
 */
export function findApproveCarTotal (flag,purchaseId) {
  return http({
    url: '/trade/purchase/findApproveCarTotal',
    method: 'get',
    params: {
      "flag": flag,
      "purchaseId": purchaseId
    }
  })
}


/**
 * 创建采购单
 * @returns {*}
 */
export function savePurchase (purchaseId) {
  return http({
    url: '/trade/purchase/savePurchase',
    method: 'post',
    params: {
      "purchaseId": purchaseId
    }
  })
}

/**
 * 创建准备状态采购单
 * @returns {*}
 */
export function savePurchaseReady (purchaseId) {
  return http({
    url: '/trade/purchase/savePurchaseReady',
    method: 'post',
    params: {
      "purchaseId": purchaseId
    }
  })
}

/**
 * 一审采购单明细查询
 * @param resData
 * @param query
 * @returns {*}
 */
export function firstItemList (resData,query) {
  return http({
    url: '/trade/purchase/firstItemList',
    method: 'get',
    params: {}
  })
}

/**
 * 一审审批采购单
 * @param resData
 * @param query
 * @returns {*}
 */
export function firstApprovalTabs (resData,query) {
  return http({
    url: '/trade/purchase/firstApprovalTabs',
    method: 'get',
    params: {}
  })
}

/**
 * 一审临时采购药品列表
 * @param resData
 * @param query
 * @returns {*}
 */
export function firstAllMedicineList (resData,query) {
  return http({
    url: '/trade/purchase/firstAllMedicineList',
    method: 'get',
    params: {}
  })
}

/**
 * 按社区机构汇总
 * @param resData
 * @param query
 * @returns {*}
 */
export function checkTotalPriList (resData,query) {
  return http({
    url: '/trade/purchase/checkTotalList',
    method: 'get',
    params: {}
  })
}

/**
 * 按社区机构汇总
 * @param resData
 * @param query
 * @returns {*}
 */
export function checkTotalList (resData,query) {
  return http({
    url: '/trade/purchase/checkTotalList',
    method: 'get',
    params: {}
  })
}


/**
 * 审核查看采购单
 * @param resData
 * @param query
 * @returns {*}
 */
export function checkTotalDetailList (resData,query) {
  return http({
    url: '/trade/purchase/checkTotalDetailList',
    method: 'get',
    params: {}
  })
}

/**
 * 二审采购单查询
 * @param resData
 * @param query
 * @returns {*}
 */
export function checkRolePurchaseList (resData,query) {
  return http({
    url: '/trade/purchase/checkRolePurchaseList',
    method: 'get',
    params: {}
  })
}

/**
 * 服务站候选目录
 * @param resData
 * @param query
 * @returns {*}
 */
export function queryTempMedicineList (resData,query) {
  return http({
    url: '/trade/purchase/queryTempMedicineList',
    method: 'get',
    params: {
      "searchRepositoryId" : query.searchRepositoryId,
      "searchProductName": query.searchProductName,
      "searchMedicalSpec": query.searchMedicalSpec,
      "searchOrgName": query.searchOrgName,
      "searchSenderName": query.searchSenderName,
      "searchBenDate": query.searchBenDate,
      "searchEndDate": query.searchEndDate,
      "searchBasicFlag": query.searchBasicFlag,
      "searchTwoVotes": query.searchTwoVotes,
      "pageNum" : resData.pageNum,
      "pageSize" : resData.pageSize,
      "orderBy":resData.orderBy,
    }
  })
}

/**
 * 加入本院购物车
 * @param resData
 * @param query
 * @returns {*}
 */
export function insertPurchaseCar(recordId, senderId, addressId ,requestQty,repositoryId,repositoryName) {
  return http({
    url: '/trade/purchase/insertPurchaseCar',
    method: 'post',
    params: {'recordId': recordId,
              'senderId': senderId,
               'addressId': addressId,
              'requestQty': requestQty,
              'repositoryId': repositoryId,
              'repositoryName': repositoryName
    }
  })
}


/**
 * 移除本院购物车明细
 * @param resData
 * @param query
 * @returns {*}
 */
export function deletePurchaseItemCar(recordId,repositoryId) {
  return http({
    url: '/trade/purchase/deletePurchaseItemCar',
    method: 'delete',
    params: {'recordId': recordId,'repositoryId': repositoryId}
  })
}

/**
 * 移除增加药品页面明细
 * @param resData
 * @param query
 * @returns {*}
 */
export function deleteAddPurchaseItemCar(recordId,purchaseId) {
  return http({
    url: '/trade/purchase/deleteAddPurchaseItemCar',
    method: 'delete',
    params: {'recordId': recordId,'purchaseId': purchaseId}
  })
}

/**
 * 移除增加临采药品页面明细
 * @param resData
 * @param query
 * @returns {*}
 */
export function deleteAddTempPurchaseItemCar(productId,purchaseId) {
  return http({
    url: '/trade/purchase/deleteAddTempPurchaseItemCar',
    method: 'delete',
    params: {'productId': productId,'purchaseId': purchaseId}
  })
}



/**
 * 移除临采购物车明细
 * @param resData
 * @param query
 * @returns {*}
 */
export function deleteTempPurchaseItemCar(productId) {
  return http({
    url: '/trade/purchase/deleteTempPurchaseItemCar',
    method: 'delete',
    params: {'productId': productId}
  })
}

/**
 * 加入本院购物车
 * @param resData
 * @param query
 * @returns {*}
 */
export function insertTempPurchaseCar(productId, senderId,addressId, requestQty) {
  return http({
    url: '/trade/purchase/insertTempPurchaseCar',
    method: 'post',
    params: {'productId': productId,'senderId': senderId,'addressId': addressId,'requestQty': requestQty}
  })
}

/**
 * 临采购物车
 * @param resData
 * @param query
 * @returns {*}
 */
export function allMedicineShoppingList(resData,query,purchaseId) {
  return http({
    url: '/trade/purchase/allMedicineShoppingList',
    method: 'get',
    params: {
      "purchaseId": purchaseId,
      "searchProductName":query.searchProductName,
      "searchMedicalSpec":query.searchMedicalSpec,
      "pageNum" : resData.pageNum,
      "pageSize" : resData.pageSize,
      "orderBy":resData.orderBy,
      "searchAddress":query.searchAddress,
      "searchSenderName":query.searchSenderName,
      "searchOrgName":query.searchOrgName,
      "searchBasicFlag":query.searchBasicFlag,
      "searchTwoVotes":query.searchTwoVotes
    }
  })
}


/**
 * 审批采购单
 * @param resData
 * @param query
 * @returns {*}
 */
export function approvePurchaseList (resData,query) {
  return http({
    url: '/trade/purchase/approvePurchaseList',
    method: 'get',
    params: {}
  })
}

/**
 * 采购单明细查询
 * @param resData
 * @param query
 * @returns {*}
 */
export function buyerRoleItemList (resData,query) {
  return http({
    url: '/trade/purchase/buyerRoleItemList',
    method: 'get',
    params: {}
  })
}


/**
 * 候选目录
 * @param resData
 * @param query
 * @returns {*}
 */
export function checkAllList (resData,query) {
  return http({
    url: '/trade/purchase/checkAllList',
    method: 'get',
    params: {}
  })
}

/**
 * 一审采购单审批
 * @param resData
 * @param query
 * @returns {*}
 */
export function checkOne (resData,query) {
  return http({
    url: '/trade/purchase/checkOne',
    method: 'get',
    params: {}
  })
}

export function checkRolePurchaselist (resData,query) {
  return http({
    url: '/trade/purchase/purchaseList',
    method: 'get',
    params: {
      "searchPurchaseState" : query.searchPurchaseState,
      "searchPurchaseCode":query.searchPurchaseCode,
      "searchBakBuyerEasy":query.searchBakBuyerEasy,
      "searchApproveOrgEasy":query.searchApproveOrgEasy,
      "searchBenDate":query.searchBenDate,
      "searchEndDate":query.searchEndDate,
      "searchDateType":query.searchDateType,
      "pageNum" : resData.pageNum,
      "pageSize" : resData.pageSize,
      "orderBy":resData.orderBy,
    }
  })
}

/**
 *  审计
 * @param resData
 * @param query
 * @returns {*}
 */
export function getApprovalAll (resData,query,purchaseId) {
  return http({
    url: '/trade/purchase/getApprovalAll',
    method: 'get',
    params: {
      "purchaseId": purchaseId,
      "pageNum" : resData.pageNum,
      "pageSize" : resData.pageSize,
      "orderBy":resData.orderBy,
    }
  })
}

/**
 * 不用了
 * 采购单查询 >>订单
 */
export function queryOrderList (resData,query) {
  return http({
    url: '/trade/purchase/queryOrderList',
    method: 'get',
    params: {
      "searchPurchaseCode":query.searchPurchaseCode,
      "pageNum" : resData.pageNum,
      "pageSize" : resData.pageSize,
      "orderBy":resData.orderBy,
    }
  })
}

/**
 * 采购单查询 >>订单
 */
export function queryOrderItemList (resData,query,purchaseId) {
  return http({
    url: '/trade/purchase/queryOrderItemList',
    method: 'get',
    params: {
      "purchaseId":purchaseId,
      "searchPurchaseCode":query.searchPurchaseCode,
      "searchProductName":query.searchProductName,
      "searchSenderName":query.searchSenderName,
      "pageNum" : resData.pageNum,
      "pageSize" : resData.pageSize,
      "orderBy":resData.orderBy,
    }
  })
}
/**
 * 按采购单审核
 * @param resData
 * @param query
 * @returns {*}
 */
export function checkPurchasePriList (resData,query) {
  return http({
    url: '/trade/purchase/checkPurchaseList',
    method: 'get',
    params: {}
  })
}

/**
 * 撤销
 * @param purchaseId
 * @author: YuanJiMin
 * @date: 2018/4/23 16:13
 * @return:
 */
export function updatePurchaseState (purchaseId) {
  return http({
    url: '/trade/purchase/updatePurchaseState',
    method: 'delete',
    params: {
      'purchaseId': purchaseId
    }
  })
}

/**
* 撤销
* @param purchaseId
* @author: hyy
* @date: 2018/6/5 15:13
* @return:
*/
export function sendbackPurchase (purchaseId,purchaseItemIds) {
  return http({
    url: '/trade/purchase/sendBack',
    method: 'delete',
    params: {
      'purchaseId': purchaseId,
      'purchaseItemIds': purchaseItemIds
    }
  })
}



/**
 * 设置模板
 * @author: YuanJiMin
 * @date: 2018/4/23 15:57
 * @return:
 */
export function updateTemplateSave (resData,query) {
  return http({
    url: '/trade/purchase/updateTemplateSave',
    method: 'get',
    params: {
      "purchaseId": query.purchaseId,
      "byName": query.byName,
      "isAddTemplate":query.status
    }
  })
}

/**
 *  下级列表
 * @param null
 * @author: YuanJiMin
 * @date: 2018/5/3 15:13
 * @return:
 */
export function queryPurchaseSubList (gridData,query) {
  return http({
    url: '/trade/purchase/queryPurchaseSubList',
    method: 'get',
    params: {
      "pageNum" : gridData.pageNum,
      "pageSize" : gridData.pageSize
    }
  })
}


/**
 * 替下级制定采购单
 *
 * @param null
 * @author: YuanJiMin
 * @date: 2018/5/3 17:04
 * @return:
 */
export function saveSubPurchase( purchaseId, subOrgId){
  return http({
    url: '/trade/purchase/saveSubPurchase',
    method: 'post',
    params: {
      "purchaseId" : purchaseId,
      "subOrgId" : subOrgId
    }
  })
}

/**
 *  审批页面加入采购单
 * @param null
 * @author: YuanJiMin
 * @date: 2018/5/3 20:29
 * @return:
 */
export function insertApprovePurchase(purchaseId,recordId, senderId, addressId, requestQty,repositoryId,repositoryName){
  return http({
    url: '/trade/purchase/insertApprovePurchase',
    method: 'post',
    params: {
      "purchaseId": purchaseId,
      "recordId" : recordId,
      "senderId" : senderId,
      "addressId": addressId,
      "requestQty": requestQty,
      "repositoryId": repositoryId,
      "repositoryName": repositoryName
    }
  })
}

/**
 * 采购模板 增加药品
 * @param purchaseId
 * @param recordId
 * @param senderId
 * @param addressId
 * @param requestQty
 * @param repositoryId
 * @param repositoryName
 * @returns {*}
 */
export function addMedicineTemplate(purchaseId,recordId, senderId, addressId, requestQty,repositoryId,repositoryName,priceSource,productId){
  return http({
    url: '/trade/purchase/addMedicineTemplate',
    method: 'post',
    params: {
      "purchaseId": purchaseId,
      "recordId" : recordId,
      "senderId" : senderId,
      "addressId": addressId,
      "requestQty": requestQty,
      "repositoryId": repositoryId,
      "repositoryName": repositoryName,
      "priceSource":priceSource,
      "productId":productId
    }
  })
}



/**
 *  审批页面加入临采采购单
 * @param null
 * @author: YuanJiMin
 * @date: 2018/5/3 20:29
 * @return:
 */
export function insertApproveTempPurchase(purchaseId,productId, senderId, addressId, requestQty,repositoryId,repositoryName){
  return http({
    url: '/trade/purchase/insertApproveTempPurchase',
    method: 'post',
    params: {
      "purchaseId": purchaseId,
      "productId" : productId,
      "senderId" : senderId,
      "addressId": addressId,
      "requestQty": requestQty,
      "repositoryId": repositoryId,
      "repositoryName": repositoryName
    }
  })
}

/**
 *  模板创建采购单
 * @param null
 * @author: YuanJiMin
 * @date: 2018/5/4 11:46
 * @return:
 */
export function saveTemplatePurchase(purchaseId){
  return http({
    url: '/trade/purchase/saveTemplatePurchase',
    method: 'get',
    params: {
      "purchaseId": purchaseId
    }
  })
}

/**
 *  修改采购模板备注
 * @param id
 * @param remark
 * @param purchaseId
 * @returns {*}
 */
export function updateTemplateItemRemark (id,remark,purchaseId) {
  return http({
    url: '/trade/purchase/updateTemplate',
    method: 'post',
    params: {
      id: id,
      purchaseId: purchaseId,
      requestQty: null,
      senderId: null,
      remark: remark
    }
  })
}

/**
 *  修改采购模板配送地址
 * @param id
 * @param remark
 * @param purchaseId
 * @returns {*}
 */
export function updateTemplateItemAddress (senderId,addressId,purchaseId,productId,repositoryId) {
  return http({
    url: '/trade/purchase/updateTemplate',
    method: 'post',
    params: {
      senderId:senderId,
      addressId: addressId,
      purchaseId: purchaseId,
      productId: productId,
      repositoryId: repositoryId,

    }
  })
}

/**
 *  修改采购模板配送企业
 * @param id
 * @param remark
 * @param purchaseId
 * @returns {*}
 */
export function updateTemplateItemSender (senderId,purchaseId,productId,repositoryId,addressId) {
  return http({
    url: '/trade/purchase/updateTemplate',
    method: 'post',
    params: {
      senderId: senderId,
      purchaseId: purchaseId,
      repositoryId: repositoryId,
      addressId:addressId,
      productId:productId

    }
  })
}

/**
 *  修改采购模板药品数量
 * @param id
 * @param remark
 * @param purchaseId
 * @returns {*}
 */
export function updateTemplateItemQty (productId,requestQty,purchaseId) {
  return http({
    url: '/trade/purchase/updateTemplate',
    method: 'post',
    params: {
      productId: productId,
      purchaseId: purchaseId,
      requestQty: requestQty,
      senderId: null,
    }
  })
}

/**
 *  修改模板名称
 * @param id
 * @param remark
 * @param purchaseId
 * @returns {*}
 */
export function updateTemplateByName (purchaseId,byName) {
  return http({
    url: '/trade/purchase/updateTemplateByName',
    method: 'post',
    params: {
      purchaseId: purchaseId,
      byName:byName
    }
  })
}
/**
 * 删除模板信息
 * @param null
 * @author: YuanJiMin
 * @date: 2018/5/4 11:46
 * @return:
 */
export function deleteTemplate(purchaseId){
  return http({
    url: '/trade/purchase/deleteTemplate',
    method: 'delete',
    params: {
      "purchaseId": purchaseId
    }
  })
}

/**
 *  采购模板详情中描述
 * @param null
 * @author: YuanJiMin
 * @date: 2018/5/4 13:07
 * @return:
 */
export function findTemplateDetail(purchaseId) {
  return http({
    url: '/trade/purchase/findTemplateDetail',
    method: 'get',
    params: {
      "purchaseId": purchaseId
    }
  })
}

export function priceHistoryList(resData,query) {
  return http({
    url: '/trade/purchase/getAllPriceHistoryList',
    method: 'get',
    params: {
      "orderBy":resData.orderBy,
      'pageSize':resData.pageSize,
      'pageNum':resData.pageNum,
      "productId": query.productId,
      "buyerName": query.buyerName,
      "senderName": query.senderName,
      "searchBenDate": query.searchBenDate,
      "searchEndDate": query.searchEndDate,
    }
  })
}

/**
 *  采购模板详情中列表
 * @param null
 * @author: YuanJiMin
 * @date: 2018/5/4 13:08
 * @return:
 */
export function queryTemplateItemList(purchaseId,query,resData){
  return http({
    url: '/trade/purchase/queryTemplateItemList',
    method: 'get',
    params: {
      "purchaseId": purchaseId,
      "searchProductName": query.searchProductName,
      "searchMedicalSpec" : query.searchMedicalSpec,
      "searchOrgName": query.searchOrgName,
      "searchSenderName": query.searchSenderName,
      "searchBasicFlag": query.searchBasicFlag,
      "searchTwoVotes": query.searchTwoVotes,
      "searchIsRegion":query.searchIsRegion,
      "searchAddress":query.searchAddress,
      'pageSize':resData.pageSize,
      'pageNum':resData.pageNum,
      "orderBy":resData.orderBy,

    }
  })
}

/**
 * 采购模板中删除药品
 * @returns {*}
 */
export function deleteMedicineTemplate(idList,purchaseId){
  return http({
    url: '/trade/purchase/deleteMedicineTemplate',
    method: 'delete',
    params: {
      'idList': idList,
      'purchaseId': purchaseId
    }
  })
}
/**
 *  采购计划详情描述
 * @param null
 * @author: YuanJiMin
 * @date: 2018/5/4 15:17
 * @return:
 */
export function findPlanDetail(purchaseId){
  return http({
    url: '/trade/plan/findPlanDetail',
    method: 'get',
    params: {
      "purchaseId": purchaseId
    }
  })
}

export function updateRemark(approveRemark,orderRemark,byName,purchaseId) {
  return http({
    url: '/trade/purchase/updateRemark',
    method: 'put',
    params: {
      "approveRemark":approveRemark,
      "orderRemark":orderRemark,
      "byName":byName,
      "purchaseId": purchaseId
    }
  })
}
/**
 * 采购单明细
 * @param resData
 * @param query
 * @returns {*}
 */
export function purchaseItemAllList (resData,query) {
  return http({
    url: '/trade/purchase/purchaseItemAllList',
    method: 'get',
    params: {
      "orderBy":resData.orderBy,
      "purchaseState" : query.purchaseState,
      "bakProductName": query.bakProductName,
      "bakBuyerEasy": query.bakBuyerEasy,
      "producerName": query.producerName,
      "senderAbbr": query.senderAbbr,
      "searchBenDate": query.searchBenDate,
      "searchEndDate": query.searchEndDate,
      'pageSize':resData.pageSize,
      'pageNum':resData.pageNum
    }
  })
}


/**
 * 导出
 * @param domain
 * @param checked
 * @returns {*}
 */
export function exportEXL(query,checked) {
  return http({
    url: '/trade/purchase/exportEXL',
    method: 'get',
    responseType: 'blob',// 表明返回服务器返回的数据类型
    use: 'all',
    params: {
      'searchPurchaseState': query.searchPurchaseState,
      'searchByName': query.searchByName,
      'searchPurchaseCode': query.searchPurchaseCode,
      'searchBenDate': query.searchBenDate,
      'searchEndDate': query.searchEndDate,
      'checked':checked,
      'searchBuyerName': query.searchBuyerName,
      'searchPurchaseFlag': query.searchPurchaseFlag,
      "dataFlag":query.dataFlag
    }
  })
}


/**
 * 导出采购单明细列表
 * @param domain
 * @param checked
 * @returns {*}
 */
export function exportCommEXL(query) {
  return http({
    url: '/trade/purchase/exportCommEXL',
    method: 'get',
    responseType: 'blob',// 表明返回服务器返回的数据类型
    use: 'all',
    params: {
      "purchaseState" : query.purchaseState,
      "bakProductName": query.bakProductName,
      "bakBuyerEasy": query.bakBuyerEasy,
      "producerName": query.producerName,
      "senderAbbr": query.senderAbbr,
      "searchBenDate": query.searchBenDate,
      "searchEndDate": query.searchEndDate
    }
  })
}

/**
 * 采购单详情导出
 * @param resData
 * @param query
 * @param purchaseId
 * @returns {*}
 */
export function exportShowInfoEXL (resData,query,purchaseId) {
  return http({
    url: '/trade/purchase/exportShowInfoEXL',
    method: 'get',
    responseType: 'blob',// 表明返回服务器返回的数据类型
    use: 'all',
    params: {
      "purchaseId": purchaseId,
      "searchProductName":query.searchProductName,
      "searchMedicalSpec":query.searchMedicalSpec,
      "orderBy":resData.orderBy,
      "pageNum" : resData.pageNum,
      "pageSize" : resData.pageSize,
      "searchAddress":query.searchAddress,
      "searchSenderName":query.searchSenderName,
      "searchOrgName":query.searchOrgName,
      "searchBasicFlag": query.searchBasicFlag,
      "searchTwoVotes": query.searchTwoVotes,
      "searchIsRegion": query.searchIsRegion
    }
  })
}

/**
 * 采购单查询导出
 * @param resData
 * @param query
 * @param purchaseId
 * @returns {*}
 */
export function exportPurchaseListEXL (resData,query) {
  return http({
    url: '/trade/purchase/exportPurchaseListEXL',
    method: 'get',
    responseType: 'blob',// 表明返回服务器返回的数据类型
    use: 'all',
    params: {
      "searchPurchaseState" : query.searchPurchaseState,
      "searchPurchaseCode":query.searchPurchaseCode,
      "searchBakBuyerEasy":query.searchBakBuyerEasy,
      "searchApproveOrgEasy":query.searchApproveOrgEasy,
      "searchBenDate":query.searchBenDate,
      "searchEndDate":query.searchEndDate,
      "searchDateType":query.searchDateType

    }
  })
}


/**
 * 根据配送企业查看是否为两票制
 * @param resData
 * @param query
 * @param purchaseId
 * @returns {*}
 */
export function selectLiang (senderId) {
  return http({
    url: '/trade/purchase/selectLiang',
    method: 'get',
    params: {
      "senderId": senderId
    }
  })
}

