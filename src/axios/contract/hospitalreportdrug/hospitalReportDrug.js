import http from 'src/axios/http'

/**
 * 本院上报药品目录
 * @param resDate
 * @param domain
 * @returns {*}
 */
export function selectHospitalReportDrugList(resData, domain) {
  return http({
    url: 'contract/reportDrugsCatalog/getReportDrugsCatalogList',
    method: 'get',
    params: {
      "orderBy": resData.orderBy,
      "pageNum": resData.pageNum,
      "pageSize": resData.pageSize,
      "productName": domain.productName,
      "manufactureName": domain.manufactureName,
      "isCompanyDeclare": domain.isCompanyDeclare,
      "purchaseMode": domain.purchaseMode,
      "matchingDegree": domain.matchingDegree
    }
  })
}

/**
 * 加入采购目录
 * @param productId
 * @returns {*}
 */
export function insertPurchaseCatalog(productId) {
  return http({
    url: 'contract/reportDrugsCatalog/postPurchaseCatalog',
    method: 'post',
    params: {
      "productId": productId
    }
  })
}

/**
 * 删除采购目录
 * @param productId
 * @returns {*}
 */
export function deletePurchaseCatalog(productId) {
  return http({
      url: 'contract/reportDrugsCatalog/deletePurchaseCatalog',
      method: 'delete',
      params: {
        'productId': productId
      }
    }
  )
}

/**
 * 不再使用
 * @param productId
 * @returns {*}
 */
export function anymoreUse(id) {
  return http({
    url: 'contract/reportDrugsCatalog/putIsEnableAnymoreUseById',
    method: 'put',
    params: {
      "id": id
    }
  })
}

/**
 * 查询不再使用目录
 * @param resData
 * @param domain
 * @returns {*}
 */
export function selectHospitalReportDrugNoUseList(resData, domain) {
  return http({
    url: 'contract/reportDrugsCatalog/getReportDrugsCatalogNoUseList',
    method: 'get',
    params: {
      "orderBy":resData.orderBy,
      "pageNum": resData.pageNum,
      "pageSize": resData.pageSize,
      "productName": domain.productName,
      "manufactureName": domain.manufactureName,
      "isCompanyDeclare": domain.isCompanyDeclare,
      "purchaseMode": domain.purchaseMode,
      "matchingDegree": domain.matchingDegree
    }
  })
}


/**
 * 加入备选议价 ------ (这里使用的接口来自药品基础数据库的接口)
 * @param productId
 * @param AlternativeBargainingText
 * @returns {*}
 */
export function insertAlternativeBargainingHttp(productId,AlternativeBargainingText){
  return http({
      url: 'contract/basicDrugData/insertAlternativeBargaining',
      method: 'post',
      params: {
        'productIds':productId,
        'remarks':AlternativeBargainingText.textarea
      }
    }
  )
}

/**
 * 删除备选议价 ------ (这里使用的接口来自药品基础数据库的接口)
 * @param productId
 * @returns {*}
 */
export function deleteAlternativeBargainingHttp(productId){
  return http({
      url: 'contract/basicDrugData/delAlternativeBargaining',
      method: 'delete',
      params: {
        'productIds':productId
      }
    }
  )
}


/**
 * 恢复使用
 * @param productId
 * @returns {*}
 */
export function recoverUse(id) {
  return http({
    url: 'contract/reportDrugsCatalog/putIsEnableRecoverUseById',
    method: 'put',
    params: {
      "id": id
    }
  })
}

/**
 * 替换产品
 * @author: WangHaiBo
 * @date: 2018/4/19 0019
 * @param null
 * @return:
 * @throws:
 */
export function replaceProduct(resData,domain) {
  return http({
    url: 'contract/reportDrugsCatalog/getReplaceProductList',
    method: 'get',
    params: {
      "pageNum": resData.pageNum,
      "pageSize": resData.pageSize,
      "productId": domain.productId
    }
  })
}
