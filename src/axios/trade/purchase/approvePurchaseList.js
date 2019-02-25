import http from 'src/axios/http'

/**
 * 审批采购单
 * @param resDate
 * @param domain
 * @returns {*}
 */
export function approvePurchaseList (resDate,domain) {
  return http({
    url: '/trade/purchaseController/approvePurchaseList',
    method: 'get',
    params: {}
  })
}
