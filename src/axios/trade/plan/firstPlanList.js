import http from 'src/axios/http'

/**
 * 一审采购计划
 * @param resDate
 * @param domain
 * @returns {*}
 */
export function firstPlanList (resDate,domain) {
  return http({
    url: '/trade/purchaseController/firstPlanList',
    method: 'get',
    params: {}
  })
}
