import http from 'src/axios/http'

/**
 * 查询
 * @param
 * @param query
 * @returns {*}
 */
export function selectTradeSetting () {
  return http({
    url: '/trade/tradingController/selectTradeSetting',
    method: 'get',
    params: {}
  })
}
/**
 * 修改
 * @param
 * @param query
 * @returns {*}
 */
export function updateTradeSetting (query) {
  return http({
    url: '/trade/tradingController/updateTradeSetting',
    method: 'put',
    params: {
      'needAuditDoctorPurchase': query.needAuditDoctorPurchase,
      'isMultiRepository': query.isMultiRepository,
      'isAutoReceive': query.isAutoReceive,
      'autoReceiveTime': query.autoReceiveTime,
      'creatorId': query.creatorId,
      'orgId': query.orgId,
      'id': query.id
    }
  })
}
