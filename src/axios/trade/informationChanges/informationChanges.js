import http from 'src/axios/http'

/**
 * 药品变更信息公示——》企业变更
 * @param resDate
 * @param domain
 * @returns {*}
 */
export function orgChangeList (resDate,domain) {
  return http({
    url: '/trade/informationChangesController/orgChangeList',
    method: 'get',
    params: {
      "orderBy":resDate.orderBy,
      'pageNum': resDate.pageNum,
      'pageSize': resDate.pageSize,
      'searchOrgName': domain.searchOrgName,
      'searchBenDate':domain.searchBenDate,
      'searchEndDate':domain.searchEndDate
    }
  })
}



/**
 * 药品变更信息公示——》产品变更
 * @param resDate
 * @param domain
 * @returns {*}
 */
export function productChangeList (resDate,domain) {
  return http({
    url: '/trade/informationChangesController/productChangeList',
    method: 'get',
    params: {
      "orderBy":resDate.orderBy,
      'pageNum': resDate.pageNum,
      'pageSize': resDate.pageSize,
      'searchProductName': domain.searchProductName,
      'searchManufactureName': domain.searchManufactureName,
      'searchBenProductDate': domain.searchBenProductDate,
      'searchEndProductDate': domain.searchEndProductDate
    }
  })
}

/**
 * 药品变更信息公示——》产品变更
 * @param resDate
 * @param domain
 * @returns {*}
 */
export function historyChangeList (resDate,domain) {
  return http({
    url: '/trade/informationChangesController/historyChangeList',
    method: 'get',
    params: {
      'pageNum': resDate.pageNum,
      'pageSize': resDate.pageSize,
      'searchProductName': domain.searchProductName,
      'searchManufactureName': domain.searchManufactureName,
      'productId': domain.productId
    }
  })
}
