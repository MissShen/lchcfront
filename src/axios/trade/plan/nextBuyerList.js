import http from 'src/axios/http'

/**
 * 代替下级创建采购计划
 * @param resDate
 * @param domain
 * @returns {*}
 */
export function nextBuyerList (resDate,domain) {
  return http({
    url: '/trade/planController/nextBuyerList',
    method: 'get',
    params: {}
  })
}
