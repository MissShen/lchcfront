import http from 'src/axios/http'

/**
 * 品种采购
 * @param resData
 * @param queryData
 * @returns {*}
 */
export function priceWarning(resData, queryData) {
  return http({
    url: '/supervision/pricewarning/getpricelist',
    method: 'get',
    params: {
      'productName': queryData.productName,
      'orgName': queryData.orgName,
      'beginDate': queryData.beginDate,
      'endDate': queryData.endDate,
      'pageNum': resData.pageNum,
      'pageSize': resData.pageSize
    }
  })
}

export function priceDescById(resData, queryData) {
  return http({
    url: '/supervision/pricewarning/getpriceid',
    method: 'get',
    params: {
      'id': queryData.id,
      'hostName':queryData.hostName,
      'pageNum': resData.pageNum,
      'pageSize': resData.pageSize
    }
  })
}


