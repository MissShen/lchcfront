import http from 'src/axios/http'

/**
 * 配送企业查看
 * @param resDate
 * @param query
 * @returns {*}
 */
export function queryDistributionEnterpriseList (resData, query) {
  return http({
    url: 'contract/distributionEnterprise/queryDistributionEnterpriseList',
    method: 'get',
    params: {
      "orderBy": resData.orderBy,
      "pageNum" : resData.pageNum,
      "pageSize" : resData.pageSize,
      "name" : query.name,
      "twoVote" : query.twoVote,
      "complainedCount" : query.complainedCount,
      "serviceState" : query.serviceState

    }
  })
}
