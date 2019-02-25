import http from 'src/axios/http'

//  议价报价直播列表查询
export function queryBargainQuoteLiveList (resData, query) {
  return http({
    url: 'contract/bargainQuoteLive/getBargainQuoteLiveList',
    method: 'get',
    params: {
      "productName" : query.productName,
      "sourceName" : query.sourceName,
      "manufactureName" : query.manufactureName,
      "orderBy" : resData.orderBy,
      "pageNum" : resData.pageNum,
      "pageSize" : resData.pageSize
    }
  })
}

export function exportExcel (resData, query) {
  return http({
    url: 'contract/bargainQuoteLive/getBargainQuoteLiveListForExcel',
    method: 'get',
    responseType: 'blob',// 表明返回服务器返回的数据类型
    use: 'all',
    params: {
      "total" : resData.total,
      "productName" : query.productName,
      "sourceName" : query.sourceName,
      "manufactureName" : query.manufactureName,
      "pageNum" : resData.pageNum,
      "pageSize" : resData.pageSize
    }
  })
}
