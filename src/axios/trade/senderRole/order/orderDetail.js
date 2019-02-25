import http from 'src/axios/http'

/**
 * 交易明细查询
 * @param resData
 * @param domain
 * @returns {*}
 */
export function orderDetail (resData,domain) {
  return http({
    url: '/trade/orderController/orderDetail',
    method: 'get',
    params: {'pageNum': resData.pageNum, 'pageSize': resData.pageSize}
  })
}

