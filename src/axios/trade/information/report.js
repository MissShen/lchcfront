import http from 'src/axios/http'

/**
 * 采购分析
 * @param resDate
 * @param domain
 * @returns {*}
 */
export function buyerOrgRequestReport (resData,query) {
  return http({
    url: '/trade/information/buyerOrgRequestReport',
    method: 'get',
    params: {
      id: query.id,
      'name': query.name,
      'buyerOrgId':query.buyerOrgId,
      'searchBenDate': query.searchBenDate,
      'searchEndDate': query.searchEndDate,
      'pageSize': resData.pageSize,
      'pageNum': resData.pageNum,
      "orderBy":resData.orderBy,
    }
  })
}
/**
 * 产品信息明细
 * @param resDate
 * @param domain
 * @returns {*}
 */
export function reportProductList (resData,query) {
  return http({
    url: '/trade/information/reportProductList',
    method: 'get',
    params: {
      'medicalName': query.medicalName,
      'searchBenDate': query.searchBenDate,
      'searchEndDate': query.searchEndDate,
      'pageSize': resData.pageSize,
      "orderBy":resData.orderBy,
      'pageNum': resData.pageNum
    }
  })
}
/**
 * 产品明细
 * @param resDate
 * @param domain
 * @returns {*}
 */
export function showOrgInfoList (resData,query) {
  return http({
    url: '/trade/information/showOrgInfoList',
    method: 'get',
    params: {
      "orderBy":resData.orderBy,
      'buyerOrg': query.buyerOrg,
      'medicalName': query.medicalName,
      'productId': query.productId,
      'searchBenDate': query.searchBenDate,
      'searchEndDate': query.searchEndDate,
      'pageSize':resData.pageSize,
      'pageNum':resData.pageNum
    }
  })
}
/**
 * 采购明细
 * @param resDate
 * @param domain
 * @returns {*}
 */
export function reportOrderList (resData,query) {
  return http({
    url: '/trade/information/reportOrderList',
    method: 'get',
    params: {
      "orderBy":resData.orderBy,
      'buyerOrgId': query.buyerOrgId,
      'medicalName': query.medicalName,
      'infoFlag': query.infoFlag,
      'approveOrg': query.approveOrg,
      'senderOrg': query.senderOrg,
      'pageSize':resData.pageSize,
      'pageNum':resData.pageNum
    }
  })
}
