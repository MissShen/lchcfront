import http from 'src/axios/http'

/**
 * 替换产品目录内列表
 * @param resDate
 * @param domaina
 * @returns {*}
 */
export function selectReplaceProductCatalogInsideList (resData,domain,obj) {
  return http({
    url: 'contract/reportDrugsCatalog/getReplaceProductCatalogInsideList',
    method: 'get',
    params: {
      "orderBy": resData.orderBy,
      "pageNum": resData.pageNum,
      "pageSize": resData.pageSize,
      "productId": obj.productId,
      "drugId": obj.drugId,
      "pId": obj.pid,
      "productCode": domain.productCode,
      "productName": domain.productName,
      "manufactureName": domain.manufactureName,
      "spec": domain.spec
    }
  })
}

/**
 * 替换产品目录外列表
 * @author: WangHaiBo
 * @date: 2018/4/20 0020
 * @param null
 * @return:
 * @throws:
 */
export function selectReplaceProductCatalogOutsideList (resData,domain,obj) {
  return http({
    url: 'contract/reportDrugsCatalog/getReplaceProductCatalogOutsideList',
    method: 'get',
    params: {
      "orderBy": resData.orderBy,
      "pageNum": resData.pageNum,
      "pageSize": resData.pageSize,
      "productId": obj.productId,
      "drugId": obj.drugId,
      "productCode": domain.productCode,
      "productName": domain.productName,
      "manufactureName": domain.manufactureName,
      "spec": domain.spec
    }
  })
}

/**
 * 加入采购目录
 * @param productId
 * @returns {*}
 */
export function insertPurchaseCatalog(row,pId) {
  return http({
    url: 'contract/reportDrugsCatalog/postCatalogInsidePurchaseCatalog',
    method: 'post',
    params: {
      "productId": row.productId,
      "pId": pId
    }
  })
}
