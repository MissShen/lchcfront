import http from 'src/axios/http'

/**
 * 议价报价列表查询
 * @param resData
 * @param query
 */
export function queryBargainQuoteList (resData, query) {
  return http({
    url: 'contract/bargainQuote/queryBargainQuoteList',
    method: 'get',
    params: {
      "orderBy" : resData.orderBy,
      "productName" : query.productName,
      "manufactureName" : query.manufactureName,
      "bargainObject" : query.bargainObject,

      "spec":query.spec,
      "basicFlag":query.basicFlag,
      "twoVoteId":query.twoVoteId,
      'state' : query.state,
      "pageNum" : resData.pageNum,
      "pageSize" : resData.pageSize
    }
  })
}

/**
 * 提交报价议价价格
 * @param resData
 * @param query
 */
export function saveBargainQuotePrice(id, bidPrice,refuseRemark) {
  return http({
    url: 'contract/bargainQuote/saveBargainQuotePrice',
    method: 'put',
    params: {
      "id" : id,
      "bidPrice" : bidPrice,
      "refuseRemark" : refuseRemark
    }
  })
}

/**
 * 修改报价议价状态
 * @param id
 * @param flag
 */
export function updateBargainFlag(id,refuseRemark) {
  return http({
    url: 'contract/bargainQuote/updateBidFlag',
    method: 'put',
    params: {
      "id" : id,
      "refuseRemark" : refuseRemark
    }
  })
}

export function selectRemarkInfoHttp(id) {
  return http({
    url: 'contract/bargainQuote/findSelectRemark',
    method: 'get',
    params: {
      'id': id
    }
  })
}
