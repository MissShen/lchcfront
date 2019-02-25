import http from 'src/axios/http'

/**
 * 查询
 * @param
 * @param query
 * @returns {*}
 */
export function queryStockList (resData,query) {
  return http({
    url: '/trade/stockController/queryStockList',
    method: 'get',
    params: {'pageNum': resData.pageNum,
             'pageSize': resData.pageSize,
             'sendStockState': query.sendStockState,
             'manufactureName':query.manufactureName,
             'productName':query.productName,
              "orderBy":resData.orderBy,

    }
  })
}
/**
 * 库存维护查询
 * @param
 * @param productId
 * @returns {*}
 */
export function queryStockMaintain (productId) {
  return http({
    url: '/trade/stockController/queryStockList',
    method: 'get',
    params: {'productId': productId
    }
  })
}
/**
 * 库存维护修改
 * @param
 * @param productId
 * @returns {*}
 */
export function updateStock (query) {
  return http({
    url: '/trade/stockController/updateStock',
    method: 'put',
    params: {
        'sendStockState': query.maintainState,
      'middleStandRate': query.bakMiddleStandRate,
      'bigMiddleRate': query.bakBigMiddleRate,
      'productId': query.productId,
      'comments': query.comments
    }
  })
}
/**
 * 配送药品查询
 * @param
 * @param query
 * @returns {*}
 */
export function querySenderMedicineList(resData,query) {
  return http({
    url:'/trade/stockController/querySenderMedicineList',
    method: 'get',
    params: {
      'pageNum': resData.pageNum,
      'pageSize': resData.pageSize,
      'orgName': query.orgName,
      'searchProductName' : query.searchProductName,
      "orderBy":resData.orderBy,
    }
  })
}
/**
 * 导出可配送药品查询
 * @param query
 * @returns {*}
 */
export function exportSenderMedicineList(query) {
  return http({
    url: '/trade/stockController/exportSenderMedicineList',
    method: 'get',
    responseType: 'blob',// 表明返回服务器返回的数据类型
    use: 'all',
    params: {
      'orgName': query.orgName,
      'searchProductName' : query.searchProductName
    }
  })
}
