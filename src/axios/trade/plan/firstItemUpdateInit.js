import http from 'src/axios/http'

/**
 * 一审编辑采购计划
 * @param resDate
 * @param domain
 * @returns {*}
 */
export function firstItemUpdateInit (resDate,domain) {
  return http({
    url: '/trade/planController/firstItemUpdateInit',
    method: 'get',
    params: {}
  })
}
