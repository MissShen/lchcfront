import http from 'src/axios/http'

/**
 * 采购目录查询
 * @param resDate
 * @param domain
 * @returns {*}
 */
export function selectHitCommList (resDate,domain) {
  return http({
    url: '/trade/information/queryHitCommList',
    method: 'get',
    params: {

      "orderBy":resDate.orderBy,
      'state': domain.state,
      'manufactureName': domain.manufactureName,
      'searchProductName':domain.searchProductName,
      'searchMedicalSpec':domain.searchMedicalSpec,
      'pageSize':resDate.pageSize,
      'pageNum':resDate.pageNum
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
    url: '/trade/information/exportEXL',
    method: 'get',
    responseType: 'blob',// 表明返回服务器返回的数据类型
    use: 'all',
    data: {
      'state': domain.state,
      'manufactureName': domain.manufactureName,
      'searchProductName':domain.searchProductName,
      'searchMedicalSpec':domain.searchMedicalSpec
    }
  })
}

