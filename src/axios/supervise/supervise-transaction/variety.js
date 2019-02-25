import http from 'src/axios/http'

/**
 * 品种采购
 * @param resData
 * @param queryData
 * @returns {*}
 */
export function varietyPurchase(resData, queryData) {
  return http({
    url: '/supervision/tansact/varietyPurchase',
    method: 'get',
    params: {
      'medicalName': queryData.medicalName,
      'factoryName': queryData.factoryName,
      'beginDate': queryData.beginDate,
      'endDate': queryData.endDate,
      'pageNum': resData.pageNum,
      'pageSize': resData.pageSize
    }
  })
}


/**
 * 品种采购情况查看医院
 * @param resData
 * @param queryData
 * @returns {*}
 */
export function findHospitalt(resData, queryData) {
  return http({
    url: '/supervision/tansact/findHospitalt',
    method: 'get',
    params: {
      'productId':queryData.productId,
      'orgName': queryData.orgName,
      'beginDate': queryData.beginDate,
      'endDate': queryData.endDate,
      'pageNum': resData.pageNum,
      'pageSize': resData.pageSize
    }
  })
}

/**
 * 品种采购情况查看配送
 * @param resData
 * @param queryData
 * @returns {*}
 */
export function findSender(resData, queryData) {
  return http({
    url: '/supervision/tansact/findSender',
    method: 'get',
    params: {
      'productId':queryData.productId,
      'orgName': queryData.orgName,
      'beginDate': queryData.beginDate,
      'endDate': queryData.endDate,
      'pageNum': resData.pageNum,
      'pageSize': resData.pageSize
    }
  })
}

/**
 * 品种采购情况采购汇总
 * @param resData
 * @param queryData
 * @returns {*}
 */
export function findVarietySummarys(resData, queryData) {
  return http({
    url: '/supervision/tansact/findVarietySummary',
    method: 'get',
    params: {
      'productId':queryData.productId,
      'hosName': queryData.hosName,
      'senderName': queryData.senderName,
      'beginDate': queryData.beginDate,
      'endDate': queryData.endDate,
      'pageNum': resData.pageNum,
      'pageSize': resData.pageSize
    }
  })
}
