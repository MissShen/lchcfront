import http from 'src/axios/http'

/**
 * 一审创建采购计划
 * @param resDate
 * @param domain
 * @returns {*}
 */
export function firstPlanMedicineList (resDate,domain) {
  return http({
    url: '/trade/purchaseController/firstPlanMedicineList',
    method: 'get',
    params: {}
  })
}
