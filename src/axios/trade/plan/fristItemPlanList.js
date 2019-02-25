import http from 'src/axios/http'

/**
 * 一审采购计划详情
 * @param resDate
 * @param domain
 * @returns {*}
 */
export function firstItemPlanList (resDate,domain) {
  return http({
    url: '/trade/purchaseController/firstItemList',
    method: 'get',
    params: {}
  })
}
