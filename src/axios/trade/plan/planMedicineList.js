import http from 'src/axios/http'

/**
 * 服务站创建采购计划
 * @param resDate
 * @param domain
 * @returns {*}
 */
export function planMedicineList (resDate,domain) {
  return http({
    url: '/trade/purchaseController/planMedicineList',
    method: 'get',
    params: {}
  })
}
