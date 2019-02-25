import http from 'src/axios/http'

/**
 * 可配送医院查询
 * @param resDate
 * @param domain
 * @returns {*}
 */
export function selectHostInfo (resData,domain) {
  return http({
    url: '/trade/information/queryHospInfo',
    method: 'get',
    params: {
      id: domain.id,
      searchOrgName: domain.searchOrgName,
      searchOrgNameAbbr: domain.searchOrgNameAbbr,
      searchOrgAddress: domain.searchOrgAddress,
      'pageSize':resData.pageSize,
      'pageNum':resData.pageNum,
      "orderBy":resData.orderBy,
    }
  })
}

/**
 * 导出
 * @param ids
 * @returns {*}
 */
export function exportEXL(domain) {
  return http({
    url: '/trade/information/exportHospInfoEXL',
    method: 'get',
    responseType: 'blob',// 表明返回服务器返回的数据类型
    use: 'all',
    data: {
      id: domain.id,
      searchOrgName: domain.searchOrgName,
      searchOrgNameAbbr: domain.searchOrgNameAbbr,
      searchOrgAddress: domain.searchOrgAddress,
    }
  })
}

