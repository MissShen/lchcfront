import http from 'src/axios/http'

/**
 * 采购单详情(详情列表页)
 * @param resDate
 * @param domain
 * @returns {*}
 */
export function buyerPlanList (resDate,domain) {
  return http({
    url: '/trade/purchaseController/buyerPlanList',
    method: 'get',
    params: {}
  })
}
