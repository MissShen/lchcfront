import http from 'src/axios/http'

/**
 * 服务站采购计划详情
 * @param resDate
 * @param domain
 * @returns {*}
 */
export function itemPlanList (resDate,domain) {
  return http({
    url: '/trade/purchaseController/itemList',
    method: 'get',
    params: {}
  })
}
