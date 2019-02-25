import http from 'src/axios/http'

/**
 * 订单查询
 * @param resData
 * @param domain
 * @returns {*}
 */
export function list (resData,domain) {
  return http({
    url: '/trade/orderController/list',
    method: 'get',
    params: {'pageNum': resData.pageNum, 'pageSize': resData.pageSize}
  })
}

