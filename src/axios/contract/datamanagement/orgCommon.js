import http from 'src/axios/http'

/**
 * 机构信息查询
 * @returns {*}
 */
export function queryOrg (buyerId) {
  return http({
    url: 'contract/orgCommon/findByLogin',
    method: 'get',
    params: {
      "buyerId" : buyerId
    }
  })
}
