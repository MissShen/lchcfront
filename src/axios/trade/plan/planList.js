import http from 'src/axios/http'
import { dateFormat } from 'src/axios/auditchanges/common/nestedJson'


/**
 * 供应目录
 * @param resData
 * @param domain
 * @returns {*}
 */
export function medicineList (resData,domain) {
  dateFormat(domain,['Date']);
  return http({
    url: '/trade/plan/queryBuyerMedicineList',
    method: 'get',
    params: {
      "orderBy":resData.orderBy,
      "searchRepositoryId" : domain.searchRepositoryId,
      "searchProductName": domain.searchProductName,
      "searchMedicalSpec": domain.searchMedicalSpec,
      "searchOrgName": domain.searchOrgName,
      "searchSenderName": domain.searchSenderName,
      "searchBenDate": domain.searchBenDate,
      "searchEndDate": domain.searchEndDate,
      "pageNum" : resData.pageNum,
      "pageSize" : resData.pageSize
    }
  })
}

/**
 * 供应目录
 * @param resData
 * @param domain
 * @returns {*}
 */
export function medicineListExist (resData,domain,purchaseId) {
  dateFormat(domain,['Date']);
  return http({
    url: '/trade/plan/queryBuyerMedicineExistList',
    method: 'get',
    params: {
      "orderBy":resData.orderBy,
      "searchRepositoryId" : domain.searchRepositoryId,
      "searchProductName": domain.searchProductName,
      "searchMedicalSpec": domain.searchMedicalSpec,
      "searchOrgName": domain.searchOrgName,
      "searchSenderName": domain.searchSenderName,
      "searchBenDate": domain.searchBenDate,
      "searchEndDate": domain.searchEndDate,
      "purchaseId": purchaseId,
      "pageNum" : resData.pageNum,
      "pageSize" : resData.pageSize
    }
  })
}

/**
 * 服务站采购计划
 * @param resDate
 * @param domain
 * @returns {*}
 */
export function planList (resDate,domain) {
  return http({
    url: '/trade/purchaseController/planList',
    method: 'get',
    params: {}
  })
}

/**
 * @param null
 * @author: YuanJiMin
 * @date: 2018/4/26 13:22
 * @return:
 */
export function queryPlanList (resData,query) {
  return http({
    url: '/trade/plan/queryPlanList',
    method: 'get',
    params: {
       searchBenDate:query.searchBenDate,
       searchEndDate:query.searchEndDate,
       searchPurchaseCode:query.searchPurchaseCode,
       searchByName:query.searchByName,
       pageNum:resData.pageNum,
       pageSize:resData.pageSize,
      "orderBy":resData.orderBy,
    }
  })
}


/**
 *
 * 生成采购单
 * @param null
 * @author: YuanJiMin
 * @date: 2018/4/26 17:07
 * @return:
 */
export function savePurchase (purchaseId) {
  return http({
    url: '/trade/plan/savePurchase',
    method: 'post',
    params: {
     purchaseId:purchaseId
    }
  })
}
/**
 *
 * 删除采购计划中的详情
 * @param null
 * @author: YuanJiMin
 * @date: 2018/4/26 17:07
 * @return:
 */
export function deletePlanItemMedical (purchaseId) {
  return http({
    url: '/trade/plan/deletePlan',
    method: 'delete',
    params: {
      purchaseId:purchaseId
    }
  })
}

/**
 *
 * 加入采购单
 * @param null
 * @author: YuanJiMin
 * @date: 2018/5/2 10:29
 * @return:
 */
export function insertPlanCar (recordId, senderId,addressId, requestQty,repositoryId,repositoryName) {
  return http({
    url: '/trade/plan/insertPlan',
    method: 'post',
    params: {
      'recordId': recordId,
      'senderId': senderId,
      'addressId' : addressId,
      'requestQty': requestQty,
      'repositoryId': repositoryId,
      'repositoryName': repositoryName
    }
  })
}


/**
 *
 * 加入采购单
 * @param null
 * @author: YuanJiMin
 * @date: 2018/5/2 10:29
 * @return:
 */
export function insertPlanCartExist (recordId, senderId,addressId,purchaseId, requestQty,repositoryId,repositoryName) {
  return http({
    url: '/trade/plan/insertPlanExist',
    method: 'post',
    params: {
      'recordId': recordId,
      'senderId': senderId,
      'addressId' : addressId,
      'purchaseId': purchaseId,
      'requestQty': requestQty,
      'repositoryId': repositoryId,
      'repositoryName': repositoryName
    }
  })
}




/**
 * 统计购物车数量
 * @param null
 * @author: YuanJiMin
 * @date: 2018/5/2 11:57
 * @return:
 */
export function findCarTotal (flag) {
  return http({
    url: '/trade/plan/findCarTotal',
    method: 'get',
    params: {
      "flag": flag
    }
  })
}

/**
 * 统计采购计划数量
 * @param null
 * @author: YuanJiMin
 * @date: 2018/5/2 11:57
 * @return:
 */
export function findCarTotalExist (flag,purchaseId) {
  return http({
    url: '/trade/plan/findCarTotalExist',
    method: 'get',
    params: {
      "flag": flag,
      "purchaseId": purchaseId
    }
  })
}

/**
 * @param null
 * @author: YuanJiMin
 * @date: 2018/5/2 11:57
 * @return:
 */
export function planShoppingList (resData,query,purchaseId) {
  return http({
    url: '/trade/plan/medicineShoppingList',
    method: 'get',
    params: {
      "purchaseId": purchaseId,
      "searchProductName":query.searchProductName,
      "searchMedicalSpec":query.searchMedicalSpec,
      "pageNum" : resData.pageNum,
      "pageSize" : resData.pageSize
    }
  })
}

/**
 *
 * @param null
 * @author: YuanJiMin
 * @date: 2018/5/2 13:41
 * @return:
 */
export function updatePurchaseItemRemark (planItemId,buyerRemark) {
  return http({
    url: '/trade/plan/updatePlanItemDetail',
    method: 'post',
    params: {
      planItemId: planItemId,
      purchaseId: null,
      requestQty: null,
      senderId: null,
      remark: buyerRemark
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
export function updatePurchaseItemQty (requestQty,planItemId,purchaseId,repositoryId) {
  return http({
    url: '/trade/plan/updatePlanItemDetail',
    method: 'post',
    params: {
      planItemId: planItemId,
      purchaseId: purchaseId,
      requestQty: requestQty,
      senderId: null,
      buyerRemark: null,
      repositoryId: repositoryId
    }
  })
}

/**
 * 更改采购计划名称
 * @param byName
 * @param purchaseId
 * @returns {*}
 */
export function updatePlanByName (byName,purchaseId) {
  return http({
    url: '/trade/plan/updatePlanByName',
    method: 'get',
    params: {
      byName: byName,
      purchaseId: purchaseId
    }
  })
}

/**
 * 更改买方配送
 * @param senderId
 * @param purchaseItemId
 * @returns {*}
 */
export function updatePurchaseItemSender (senderId,purchaseId,planItemId,productId) {
  return http({
    url: '/trade/plan/updatePlanItemDetail',
    method: 'post',
    params: {
      planItemId: planItemId,
      purchaseId: purchaseId,
      requestQty: null,
      senderOrgId: senderId,
      buyerRemark: null,
      productId: productId
    }
  })
}
/**
 * 购物车中删除药品
 * @returns {*}
 */
export function deleteMedicineShoppingCar(idList,purchaseId){
  return http({
    url: '/trade/plan/deletePlanItemMedical',
    method: 'delete',
    params: {
      'planItemIds': idList,
      'purchaseId': purchaseId
    }
  })
}
/**
 * 购物车中设置急需
 * @returns {*}
 */
export function updateDegreeSet(purchaseId,idList,planDegreeFlag){
  return http({
    url: '/trade/plan/updatePlanItemMedicalDegree',
    method: 'put',
    params: {
      "idList":idList,
      //"planItemId": planItemId,
      "purchaseId": purchaseId,
      "planDegreeFlag": planDegreeFlag

    }
  })
}

/**
 * 购物车中取消急需
 * @returns {*}
 */
export function updateDegreeCancel(idList,purchaseId,planDegreeFlag){
  return http({
    url: '/trade/purchase/updateDegreeCancel',
    method: 'get',
    params: {
      "idList": idList,
      "purchaseId": purchaseId,
      "planDegreeFlag": planDegreeFlag
    }
  })
}

/**
 * 创建采购计划
 * @param null
 * @author: YuanJiMin
 * @date: 2018/5/2 16:58
 * @return:
 */
export function savePlan(purchaseId){
  return http({
    url: '/trade/plan/savePlan',
    method: 'post',
    params: {
      "purchaseId": purchaseId
    }
  })
}

/**
 * @param null
 * @author: YuanJiMin
 * @date: 2018/4/26 13:22
 * @return:
 */
export function queryTemplateList (resDate,query) {
  return http({
    url: '/trade/purchase/queryTemplateList',
    method: 'get',
    params: {
      searchBenDate:query.searchBenDate,
      searchEndDate:query.searchEndDate,
      searchByName:query.searchByName
    }
  })
}

/**
 *  代替下级创建采购单
 * @param null
 * @author: YuanJiMin
 * @date: 2018/5/4 10:32
 * @return:
 */
export function saveSubPlan(purchaseId,buyerOrgId) {
  return http({
    url: '/trade/plan/saveSubPlan',
    method: 'post',
    params: {
      purchaseId: purchaseId,
      buyerOrgId: buyerOrgId
    }
  })
}
