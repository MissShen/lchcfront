import http from 'src/axios/http'

/**
 * 医院候选目录维护
 * @author liuyanfei
 * @date 2018/3/28
 * @returns {*}
 */
export function queryHosCandidateCatalogListTabJoined (resData,domain) {
  return http({
    url: 'contract/hosCandidateCatalog/queryHosCandidateCatalogList',
    method: 'get',
    params: {
      "pageNum" : resData.pageNum,
      "pageSize" : resData.pageSize,
      "orderBy": resData.orderBy,
      "productName":domain.productName,
      "manufactureName":domain.manufactureName,
      "basicFlag":domain.basicFlag,
      "bargainState":domain.bargainState,
      "spec":domain.spec,
      "catalogArea":domain.catalogArea,
      "resState":domain.resState,
      "twoVote":domain.twoVote
    }
  })
}
/**
 * 选择产品列表
 * @author wanghaibo
 * @date 2018/8/14
 * @returns {*}
 */
export function selectProductList (resData,domain,senderId) {
  return http({
    url: 'contract/hosCandidateCatalog/queryProductList',
    method: 'get',
    params: {
      "pageNum" : resData.pageNum,
      "pageSize" : resData.pageSize,
      "orderBy": resData.orderBy,
      "productName" : domain.productName,
      "manufactureName" : domain.manufactureName,
      "senderId" : senderId
    }
  })
}
/**
 * 删除首选配送
 * @returns {*}
 */
export function cancelFirstSender (productId,senderId) {
  return http({
    url: 'contract/hosCandidateCatalog/updateFirstSender',
    method: 'post',
    params: {
      'productId' : productId,
      'senderId' : senderId
    }
  })
}

/**
 * 导出医院候选目录维护
 * @author liuyanfei
 * @date 2018/3/28
 * @returns {*}
 */
export function queryHosCandidateCatalogListTabJoinedExportExcel (resDate,domain) {
  return http({
    url: 'contract/hosCandidateCatalog/hosCandidateCatalogExportExcel',
    method: 'get',
    responseType: 'blob',// 表明返回服务器返回的数据类型
    use: 'all',
    params: {
      "total" : resDate.total,
      "productName":domain.productName,
      "manufactureName":domain.manufactureName,
      "basicFlag":domain.basicFlag,
      "bargainState":domain.bargainState,
      "spec":domain.spec,
      "catalogArea":domain.catalogArea,
      "resState":domain.resState,
      "twoVote":domain.twoVote
    }
  })
}

export function queryHosCandidateCatalogListTabAlternative (resData,domain) {
  return http({
    url: 'contract/hosCandidateCatalog/queryHosAlternativeBargainingList',
    method: 'get',
    params: {
      "orderBy": resData.orderBy,
      "pageNum": resData.pageNum,
      "pageSize": resData.pageSize,
      "productName": domain.productName,
      "manufactureName": domain.manufactureName,
      "basicFlag": domain.basicFlag
    }
  })
}
  export function queryHosCandidateCatalogListTabAlternativeExportExcel (resDate,domain) {
    return http({
      url: 'contract/hosCandidateCatalog/queryHosAlternativeBargainingListExportExcel',
      method: 'get',
      responseType: 'blob',// 表明返回服务器返回的数据类型
      use: 'all',
      params: {
        "total" : resDate.total,
        "productName":domain.productName,
        "manufactureName":domain.manufactureName,
        "basicFlag":domain.basicFlag
      }
    })
}

// 加入备选议价
export function insertAlternativeBargainingHttp (productIds,AlternativeBargainingText) {
  return http({
      url: 'contract/hosCandidateCatalog/insertAlternativeBargaining',
      method: 'post',
      params: {
        'productIds':productIds.toString(),
        'remarks':AlternativeBargainingText.textarea,
        'time': AlternativeBargainingText.time.toString(),
        'referencePrice':AlternativeBargainingText.referencePrice
      }
    }
  )
}

//删除备选议价
export function delAlternativeBargainingHttp(productIds){
  return http({
      url: 'contract/basicDrugData/delAlternativeBargaining',
      method: 'delete',
      params: {
        'productIds':productIds.toString()
      }
    }
  )
}

export function findSectionPriceHttp (productId) {
  return http({
      url: 'contract/hosCandidateCatalog/findSectionPrice',
      method: 'get',
      params: {
        'productId':productId.toString()
      }
    }
  )
}

/**
 * 交易目录维护
 * @author mayuanyao
 * @date 2018/7/9
 * @returns {*}
 */
export function queryHosCandidateCatalogListTabTradeCatalog (resData,domain) {
  return http({
    url: 'contract/hosCandidateCatalog/queryHosCandidateCatalogTradeCatalogList',
    method: 'get',
    params: {
      "pageNum" : resData.pageNum,
      "pageSize" : resData.pageSize,
      "orderBy": resData.orderBy,
      "productName":domain.productName,
      "manufactureName":domain.manufactureName,
      "basicFlag":domain.basicFlag,
      "bargainState":domain.bargainState
    }
  })
}

/**
 * 查看全国有效中标价格列表
 * @param resData
 * @param productId
 * @returns {*}
 */
export function validPriceHttp (resData,productId) {
  return http({
    url: 'contract/hosCandidateCatalog/queryValidPrice',
    method: 'get',
    params: {
      "pageNum" : resData.pageNum,
      "pageSize" : resData.pageSize,
      "productId": productId
    }
  })
}
/**
 * 价格详情弹窗
 * @author mayuanyao
 * @date 2018/7/23
 * @returns {*}
 */
export function priceDetailsList (resData,domain) {
  return http({
    url: 'contract/hosCandidateCatalog/purchaseItem',
    method: 'get',
    params: {
      "pageNum" : resData.pageNum,
      "pageSize" : resData.pageSize,
      "orderBy": resData.orderBy,
      "productId":domain.productId,
      "searchSenderName":domain.searchSenderName,
      "searchBuyerName":domain.searchBuyerName,
      "searchBenDate":domain.searchBenDate,
      "searchEndDate":domain.searchEndDate

    }
  })
}

export function getAllHospitalLevel() {
  return http({
    url: 'contract/basicDrugData/getHospitalLevelList',
    method: 'get'
  })
}
