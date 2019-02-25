import http from 'src/axios/http'

/**
 * 企业主动降价确认列表查询
 * @author: WangHaiBo
 * @date: 2018/4/26 0026
 */
export function queryManufacturePriceConfirmationList (resData, query) {

  return http({
    url: 'contract/manufacturePriceConfirmation/getManufacturePriceConfirmationList',
    method: 'get',
    params: {
      "bidOrgName" : query.bidOrgName,
      "productName" : query.productName,
      "confirmFlag" : query.confirmFlag,
      "disableProductId" : query.disableProductId,
      'doseageFormName' : query.doseageFormName,
      'spec' : query.spec,
      'basicFlag' :query.basicFlag,
      'twoVoteId' : query.twoVoteId,
      "orderBy" : resData.orderBy,
      "pageNum" : resData.pageNum,
      "pageSize" : resData.pageSize
    }
  })
}

export function queryManufacturePriceListAll (resData, query) {
  return http({
    url: 'contract/manufacturePriceConfirmation/getManufacturePriceListAll',
    method: 'get',
    params: {
      "bidOrgName" : query.bidOrgName,
      "productName" : query.productName,
      "doseageFormName" : query.doseageFormName,
      "spec" : query.spec,
      'basicFlag' :query.basicFlag,
      'twoVoteId' : query.twoVoteId,
      'regionalDrug' : query.regionalDrug,
      "orderBy" : resData.orderBy,
      "pageNum" : resData.pageNum,
      "pageSize" : resData.pageSize
    }
  })
}

export function insertPurchaseCatalog(productId,id) {
  return http({
    url: 'contract/manufacturePriceConfirmation/postPurchaseCatalog',
    method: 'post',
    data: {
      "productId": productId,
      "id" : id
    }
  })
}

/**
 * 拒绝议价
 * @author: WangHaiBo
 * @date: 2018/5/7 0007
 * @param null
 * @return:
 * @throws:
 */
export function saveAlternativeBargaining(id,productId,AlternativeBargainingText) {
  return http({
    url: 'contract/manufacturePriceConfirmation/postAlternativeBargaining',
    method: 'post',
    params: {
      "id": id,
      "productId": productId,
      "refuseRemark": AlternativeBargainingText.textarea
    }
  })
}
