import http from 'src/axios/http'

/**
 * 服务站编辑采购计划
 * @param resDate
 * @param domain
 * @returns {*}
 */
export function itemUpdateInit (resDate,domain) {
  return http({
    url: '/trade/planController/itemUpdateInit',
    method: 'get',
    params: {}
  })
}
