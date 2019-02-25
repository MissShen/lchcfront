import http from 'src/axios/http'

/**
 * 导入订单列表
 * @param resDate
 * @param domain
 * @returns {*}
 */
export function selectDoImportList (resData,domain) {
  return http({
    url: '/trade/purchase/getImportList',
    method: 'get',
    params: {
      "orderBy":resData.orderBy,
      'pageNum': resData.pageNum,
      'pageSize': resData.pageSize,
      'beginTime': domain.beginTime,
      'endTime': domain.endTime,
    }
  })
}
/**
 * 导入订单明细列表
 * @param resDate
 * @param domain
 * @returns {*}
 */
export function getImportItem (resData,domain) {
  return http({
    url: '/trade/purchase/getImportItemList',
    method: 'get',
    params: {
      'pageNum': resData.pageNum,
      'pageSize': resData.pageSize,
      'orderId':domain.orderId,
      'searchName':domain.searchName,
      'bakMedicalSpec':domain.bakProductSpec
    }
  })
}
/**
 * 导入订单明细列表表头
 * @param orderId
 * @returns {*}
 */
export function getImportInfo (orderId) {
  return http({
    url: '/trade/purchase/getImportInfo',
    method: 'get',
    params: {
      'orderId':orderId
    }
  })
}

/**
 * 订单导入功能
 * @param domain
 * @returns {*}
 */
export function newExp (formData) {
  return http({
    url: '/trade/purchase/importFile',
    method: 'post',
    type:'json',
    data: formData
  })
}
