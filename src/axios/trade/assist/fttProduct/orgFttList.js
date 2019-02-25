import http from 'src/axios/http'

/**
 * 非两票制药品上报
 * @param resDate
 * @param domain
 * @returns {*}
 */
export function selectOrgFttList (resData,query) {
  return http({
    url: '/trade/assistController/orgFttList',
    method: 'get',
    params: {
      "orderBy":resData.orderBy,
      'pageNum': resData.pageNum,
      'pageSize': resData.pageSize,
      'medicalName':query.medicalName,
      'bakMedicalName':query.bakMedicalName,
      'bakProductName':query.bakProductName,
      'searchManufactureName':query.manufactureName
    }
  })
}


/**
 * 删除非两票制药品
 * @param ids
 * @returns {*}
 */
export function deleteFttProduct (ids) {
  return http({
    url: '/trade/assistController/deleteOrgFttList',
    method: 'delete',
    params: {
      'ids':ids
    }
  })
}

/**
 * 增加非两票制药品列表
 * @param resDate
 * @param domain
 * @returns {*}
 */
export function viewFttProductList (resData,query) {
  return http({
    url: '/trade/assistController/getViewFttProductList',
    method: 'get',
    params: {
      "orderBy":resData.orderBy,
      'pageNum': resData.pageNum,
      'pageSize': resData.pageSize,
      'searchproductName':query.searchproductName,
      'orgName':query.orgName,
      'searchDoseFrom':query.searchDoseFrom,
      'searchSpec':query.searchSpec
    }
  })
}

/**
* 增加非两票制药品
* @param ids
* @returns {*}
*/
export function addFttProduct (ids,remarks) {
  return http({
    url: '/trade/assistController/postFttProduct',
    method: 'post',
    data: {
      'ids': ids.toString(),
      'remarks':remarks.toString()
    }
  })
}

/**
 * 导出
 * @param ids
 * @returns {*}
 */
export function exportEXL(resData,query) {
  return http({
    url: '/trade/assistController/exportEXL',
    method: 'get',
    responseType: 'blob',// 表明返回服务器返回的数据类型
    use: 'all',
    data: {
      'searchMedicalName':query.medicalName,
      'searchSpec':query.bakMedicalName,
      'searchStandRate':query.bakProductName,
      'searchManufactureName':query.manufactureName
    }
  })
}


