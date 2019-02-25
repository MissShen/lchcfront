import http from 'src/axios/http'

/**
 * 数据中心待办事项
 */
export function todoOfData() {

  return http({
    url: '/management/todo/data',
    method: 'get',
    timeout: 200000,
  })
}

/**
 * 合同系统 待办事项
 */
export function todoOfContract() {

  return http({
    url: '/management/todo/contract',
    method: 'get',
    timeout: 200000,
  })
}

/**
 * 资审系统 待办事项
 */
export function todoOfAudit() {

  return http({
    url: '/management/todo/audit',
    method: 'get',
    timeout: 200000,
  })
}

/**
 * 交易系统 待办事项
 */
export function todoOfTrade() {

  return http({
    url: '/management/todo/trade',
    method: 'get',
    timeout: 200000,
  })
}

/**
 * 交易当月总额
 * */
export function backlogTotal() {
  return http({
    url: '/management/todo/backlog/total',
    method: 'get',
    timeout: 200000,
  })
}

/**
 * 企业黄页
 * @param orgId 机构ID
 */
export function todoEnterprise(orgId) {

  return http({
    url: '/trade/enterpriseController/enterpriseInfoByOrgId',
    method: 'get',
    timeout: 200000,
    params: {orgId: orgId}
  })
}

/**
 * 交易-评价公示
 * @param orgId 机构ID
 */
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
 * 交易-异常订单公示
 * @param resData
 * @param query
 * @returns {*}
 */
export function queryUnnormalInfoList (resData,query) {
  return http({
    url: '/trade/information/queryUnnormalInfoList',
    method: 'get',
    params: {
      'searchBuyerName': query.searchBuyerName,
    }
  })
}
