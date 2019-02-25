import http from 'src/axios/http'

/**
 * 区目录管理
 * @param resDate
 * @param domain
 * @returns {*}
 */
export function selectAll (resData,query,msgState) {
  return http({
    /*url: '/contract/resultBidItem/selectAll',*/
    url: '/trade/information/purchaseResultBitItem',
    method: 'get',
    params: {
      'pageNum': resData.pageNum,
      'pageSize': resData.pageSize,
      'catalogId': query.catalogState,
      'resState': query.resState,
      'catalogArea': query.catalogArea,
      'productName': query.productName,
      'manufactureName': query.manufactureName,
      'basicFlag': query.basicFlag,
      'msgState': msgState,
      "orderBy":resData.orderBy,
    }
  })
}

/**
 * 区目录下拉框
 * @param resDate
 * @param domain
 * @returns {*}
 */
export function selectSysCatalog (resDate,query) {
  return http({
    url: '/trade/information/selectSysCatalog',
    method: 'get',
    params: {
      'pageNum': resDate.pageNum,
      'pageSize': resDate.pageSize,

      'resState': query.resState,
      'catalogArea': query.catalogArea,
      'productName': query.productName,
      'manufactureName': query.manufactureName,
      'basicFlag': query.basicFlag
    }
  })
}
/**
 * 删除or修改
 * @param resDate
 * @param domain
 * @returns {*}
 */
export function saveOrDeleteCatalog (messageState,drugIdList) {
  return http({
    url: '/trade/information/saveOrDeleteCatalog',
    method: 'delete',
    params: {
      'messageState': messageState,
      'ids': drugIdList.toString()
    }
  })
}


/**
 * 导出
 * @param ids
 * @returns {*}
 */
export function exportEXL(query,state) {
  return http({
    url: '/trade/information/exportMedicineEXL',
    method: 'get',
    responseType: 'blob',// 表明返回服务器返回的数据类型
    use: 'all',
    data: {
      'catalogId': query.catalogState,
      'resState': query.resState,
      'catalogArea': query.catalogArea,
      'productName': query.productName,
      'manufactureName': query.manufactureName,
      'basicFlag': query.basicFlag,
      'msgState': state
    }
  })
}


