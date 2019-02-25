import http from 'src/axios/http'

/**
 * 报价公示
 * @author mayuanyao
 * @date 2018/7/17
 * @returns {*}
 */
export function queryQuotationPublicityList (resData,domain) {
  return http({
    url: 'contract/quotationPublicity/quotationPublicityItemList',
    method: 'get',
    params: {
      "orderBy" : resData.orderBy,
      "pageNum" : resData.pageNum,
      "pageSize" : resData.pageSize,
      "productName":domain.productName,
      "spec":domain.spec,
      "doseageFormName":domain.doseageFormName,
      "manufactureName":domain.manufactureName
      // 'confirmFlagState' : domain.confirmFlagState
    }
  })
}
