import http from 'src/axios/http'

/**
 * 查询配送企业列表
 * @param resDate
 * @param query
 * @returns {*}
 */
export function querySenderForHospitalList (resData, query) {
  return http({
    url: 'contract/senderForHospitalList/querySenderForHospitalList',
    method: 'get',
    params: {
      "orderBy": resData.orderBy,
      "senderName" : query.senderName,
      "contractState" : query.contractState,
      "complainedCount":query.complainedCount,
      "serviceState":query.serviceState,
      "pageNum" : resData.pageNum,
      "pageSize" : resData.pageSize
    }
  })
}

