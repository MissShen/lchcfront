import http from 'src/axios/http'

/**
 * 议价结果公示
 * @author zhangchen
 * @date 2018/4/08
 * @returns {*}
 */
export function queryBargainingResultList (resData,domain) {
  return http({
    url: 'contract/bargainingResult/bargainResultItemList',
    method: 'get',
    params: {
      "orderBy" : resData.orderBy,
      "pageNum" : resData.pageNum,
      "pageSize" : resData.pageSize,
      "hospitalName":domain.hospitalName,
      "productName":domain.productName,
      "spec":domain.spec,
      "doseageFormName":domain.doseageFormName,
      "manufactureName":domain.manufactureName,
      "basicFlag":domain.basicFlag,
      "bidFlagOp" : domain.bidFlagOp,
      "twoVote":domain.twoVote,
      'confirmFlagState' : domain.confirmFlagState
    }
  })
}
