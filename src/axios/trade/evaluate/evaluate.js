import http from 'src/axios/http'
import { dateFormat } from 'src/axios/auditchanges/common/nestedJson'
/**
 * 供应评价列表
 * @param resDate
 * @param domain
 * @returns {*}
 */
export function selectevaluateList (resDate,domain) {
  return http({
    url: '/trade/evaluateController/selectevaluateList',
    method: 'get',
    params: {}
  })
}
export function getRoleCode () {
  return http({
    url: '/trade/evaluateController/getRoleCode',
    method: 'get',
    params: {}
  })
}

/**
 * 投诉待处理
 * @param resDate
 * @param domain
 * @returns {*}
 */
export function queryWaitHandleList (resData,domain) {
  dateFormat(domain,['Date']);
  return http({
    url: '/trade/evaluateController/queryWaitHandleList',
    method: 'get',
    params: {
      'pageNum': resData.pageNum,
      'pageSize': resData.pageSize,
      'beComplainedOrgName': domain.beComplainedOrgName,
      'buyerOrgName': domain.buyerOrgName,
      'searchBenDate': domain.searchBenDate,
      'searchEndDate': domain.searchEndDate,
      "orderBy":resData.orderBy,
    }
  })
}


/**
 * 用户投诉列表
 * @param resDate
 * @param domain
 * @returns {*}
 */
export function queryCustomerComplaintsList (resData,domain) {
  dateFormat(domain,['Date']);
  return http({
    url: '/trade/evaluateController/queryCustomerComplaintsList',
    method: 'get',
    params: {
      'pageNum': resData.pageNum,
      'pageSize': resData.pageSize,
      'beComplainedOrgName': domain.beComplainedOrgName,
      'returnFlag': domain.returnFlag,
      'orderItemId': domain.orderItemId,
      'searchBenDate': domain.searchBenDate,
      'searchEndDate': domain.searchEndDate,
      "orderBy":resData.orderBy,
    }
  })
}
export function queryIndexComplaintsList (resData,domain) {
  dateFormat(domain,['Date']);
  return http({
    url: '/trade/evaluateController/queryIndexComplaintsList',
    method: 'get',
    params: {
      'pageNum': resData.pageNum,
      'pageSize': resData.pageSize,
      'buyerOrgName': domain.buyerOrgName,
      'beComplainedOrgid': domain.beComplainedOrgid,
      'searchBenDate': domain.searchBenDate,
      'searchEndDate': domain.searchEndDate,
      "orderBy":resData.orderBy,
    }
  })
}

/**
 * 新增用户投诉列表（订单）
 * @param resDate
 * @param domain
 * @returns {*}
 */
export function queryOrderComplaintsList (resData,domain) {
  return http({
    url: '/trade/evaluateController/queryOrderComplaintsList',
    method: 'get',
    params: {
      'pageNum': resData.pageNum,
      'pageSize': resData.pageSize,
      'searchOrgType': domain.searchOrgType,
      'searchKeyWord': domain.searchKeyWord,
      'bakMedicalName': domain.bakMedicalName,
      'bakMedicalSpec': domain.bakMedicalSpec,
      "orderBy":resData.orderBy,
    }
  })
}
/**
 * 新增用户投诉列表(企业)
 * @param resDate
 * @param domain
 * @returns {*}
 */
export function queryCompanyComplaintsList (resData,domain) {
  return http({
    url: '/trade/evaluateController/queryCompanyComplaintsList',
    method: 'get',
    params: {
      'pageNum': resData.pageNum,
      'pageSize': resData.pageSize,
      'searchMode': domain.searchMode,
      'searchKeyWord': domain.searchKeyWord,
      "orderBy":resData.orderBy,
    }
  })
}
/**
 * 全部投诉
 * @param resDate
 * @param domain
 * @returns {*}
 */
export function queryALlComplaintList (resData,domain) {
  dateFormat(domain,['Date']);
  return http({
    url: '/trade/evaluateController/queryAllComplaintList',
    method: 'get',
    params: {
      'pageNum': resData.pageNum,
      'pageSize': resData.pageSize,
      'beComplainedOrgName': domain.beComplainedOrgName,
      'buyerOrgName': domain.buyerOrgName,
      'searchBenDate': domain.searchBenDate,
      'searchEndDate': domain.searchEndDate,
      "orderBy":resData.orderBy,
    }
  })
}

/**
 * 企业投诉汇总
 * @param resDate
 * @param domain
 * @returns {*}
 */
export function queryCompanyComplaintList (resData,domain) {
  dateFormat(domain,['Date']);
  return http({
    url: '/trade/evaluateController/queryCompanyComplaintList',
    method: 'get',
    params: {
      'pageNum': resData.pageNum,
      'pageSize': resData.pageSize,
      'beComplainedOrgName': domain.beComplainedOrgName,
      'searchBenDate': domain.searchBenDate,
      'searchEndDate': domain.searchEndDate,
      "orderBy":resData.orderBy,
    }
  })
}
export function getAllComplaint (resDate,name) {
  return http({
    url: '/trade/evaluateController/getAllComplaint',
    method: 'get',
    params: {
      'pageNum': resDate.pageNum,
      'pageSize':resDate.pageSize,
      'beComplainedOrgName': name,
      "orderBy":resDate.orderBy,
    }
  })
}
/**
 * 投诉原因管理
 * @param resDate
 * @param domain
 * @returns {*}
 */
export function complaintReasonManageList (resDate,domain) {
  return http({
    url: '/trade/evaluateController/queryComplaintReasonManageList',
    method: 'get',
    params: {
      'pageNum': resDate.pageNum,
      'pageSize': resDate.pageSize,
      'searchKey': domain.searchKey,
      'description': domain.description,

    }
  })
}

/**
 * 关闭启用
 * @param resDate
 * @param domain
 * @returns {*}
 */
export function changeEnableFlag (id,enableFlag) {
  return http({
    url: '/trade/evaluateController/changeEnableFlag',
    method: 'put',
    params: {
      'id': id,
      'enableFlag': enableFlag
    }
  })
}

/**
 * 上报卫生局
 * @param resDate
 * @param domain
 * @returns {*}
 */
export function upToHealthBureau (id) {
  return http({
    url: '/trade/evaluateController/upToHealthBureau',
    method: 'put',
    params: {
      'id': id
    }
  })
}

/**
 * 撤销投诉
 * @param resDate
 * @param domain
 * @returns {*}
 */
export function revokeComplaint (id) {
  return http({
    url: '/trade/evaluateController/revokeComplaint',
    method: 'put',
    params: {
      'id': id
    }
  })
}

/**
 * 修改用户投诉
 * @param resDate
 * @param domain
 * @returns {*}
 */
export function updateComplaint (domain) {
  return http({
    url: '/trade/evaluateController/updateComplaint',
    method: 'put',
    params: {
      'beComplainedOrgid': domain.beComplainedOrgid,
      'complaintExplain': domain.complaintExplain,
      'reasonTypeId': domain.reasonTypeId,
      'orderItemId': domain.orderItemId,
      'id': domain.id,
    }
  })
}

/**
 * 查询投诉原因详情
 * @param id
 * @returns {*}
 */
export function findReasonById (id) {
  return http({
    url: '/trade/evaluateController/findReasonById',
    method: 'get',
    params: {
      'id': id
    }
  })
}

/**
 * 查询所有投诉原因
 * @param id
 * @returns {*}
 */
export function queryAllComplaintReason (beComplainedOrgType) {
  return http({
    url: '/trade/evaluateController/queryAllComplaintReason',
    method: 'get',
    params: {
      'searchKey': beComplainedOrgType
    }
  })
}

/**
 * 查询投诉详情
 * @param id
 * @returns {*}
 */
export function queryComplaintById (id) {
  return http({
    url: '/trade/evaluateController/queryComplaintById',
    method: 'get',
    params: {
      'id': id
    }
  })
}

/**
 * 投诉订单详情
 * @param id
 * @returns {*}
 */
export function queryOrderByRecordId (orderItemId) {
  return http({
    url: '/trade/evaluateController/queryOrderByRecordId',
    method: 'get',
    params: {
      'orderItemId': orderItemId
    }
  })
}

/**
 * 企业详情
 * @param id
 * @returns {*}
 */
export function queryEnterpriseById (id) {
  return http({
    url: '/trade/evaluateController/queryEnterpriseById',
    method: 'get',
    params: {
      'id': id
    }
  })
}

/**
 * 新增投诉原因
 * @param domain
 * @returns {*}
 */
export function addReason (domain) {
  return http({
    url: '/trade/evaluateController/addReason',
    method: 'post',
    params: {
      'beComplainedOrgType': domain.beComplainedOrgType,
      'deductionScore': domain.deductionScore,
      'description': domain.description
    }
  })
}
/**
 * 新增投诉
 * @param domain
 * @returns {*}
 */
export function addComplaint (domain) {
  return http({
    url: '/trade/evaluateController/addComplaint',
    method: 'post',
    params: {
      'beComplainedOrgid': domain.beComplainedOrgid,
      'complaintExplain': domain.complaintExplain,
      'reasonTypeId': domain.reasonTypeId,
      'orderItemId': domain.orderItemId
    }
  })
}
/**
 * 修改投诉原因
 * @param domain
 * @returns {*}
 */
export function updateReason (domain) {
  return http({
    url: '/trade/evaluateController/updateReason',
    method: 'put',
    params: {
      'id':domain.id,
      'beComplainedOrgType': domain.beComplainedOrgType,
      'deductionScore': domain.deductionScore,
      'description': domain.description
    }
  })
}
/**
 * 修改投诉详情
 * @param domain
 * @returns {*}
 */
export function handleComplaint (domain) {
  return http({
    url: '/trade/evaluateController/handleComplaint',
    method: 'put',
    params: {
      'yesOrNo':domain.yesOrNo,
      'id': domain.id,
      'processRemark': domain.processRemark
    }
  })
}
/**
 * 订单评价
 * @param domain
 * @returns {*}
 */
export function firmCheckOrderList (resData,query) {
  return http({
    url: '/trade/evaluateController/firmCheckOrderList',
    method: 'get',
    params: {
      'pageNum': resData.pageNum,
      'pageSize': resData.pageSize,
      'orgName':query.orgName,
      'searchBenDate': query.searchBenDate,
      'searchEndDate': query.searchEndDate,
      "orderBy":resData.orderBy,

    }
  })
}



/**
 * 买方订单评价列表
 * @param domain
 * @returns {*}
 */
export function BuyerEvaluateList (resData,query) {
  return http({
    url: '/trade/evaluateController/getBuyerEvaluateList',
    method: 'get',
    params: {
      'pageNum': resData.pageNum,
      'pageSize': resData.pageSize,
      'orgName':query.orgName,
      'searchBenDate': query.searchBenDate,
      'searchEndDate': query.searchEndDate,
      'bakSenderEasy': query.bakSenderEasy,
      "orderBy":resData.orderBy,
      'evaluateFlag':query.evaluateFlag,
      'purchaseCode':query.purchaseCode

    }
  })
}
/**
 * 订单评价回显
 * @param id
 * @returns {*}
 */
export function getItemEvaluate (id) {
  return http({
    url: '/trade/evaluateController/getItemEvaluate',
    method: 'get',
    params: {
     'id':id
    }
  })
}


/**
 * 修改订单评价
 * @param domain
 * @returns {*}
 */
export function evaluateUpdate (domain) {
  return http({
    url: '/trade/evaluateController/putItemEvaluate',
    method: 'put',
    params: {
      speedState:domain.speedState,
      id:domain.id,
      serviceState:domain.serviceState,
      productPack:domain.productPack,
      stockInfoState:domain.stockInfoState,
      evaluate:domain.evaluate,
      orderItemId:domain.orderItemId
    }
  })
}



