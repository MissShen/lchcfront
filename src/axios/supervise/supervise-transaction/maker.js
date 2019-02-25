import http from 'src/axios/http'

/**
 * makerList
 * @param resData
 * @param queryData
 * @returns {*}
 */
export function makerList(resData, queryData) {
  return http({
    url: '/supervision/maker/getlist',
    method: 'get',
    params: {
      'factoryName': queryData.factoryName,
      'beginDate': queryData.beginDate,
      'endDate': queryData.endDate,
      'pageNum': resData.pageNum,
      'pageSize': resData.pageSize
    }
  })
}

/**
 *  产看医院
 * @param resData,queryData
 * @author: YuanJiMin
 * @date: 2018/6/26 11:04
 * @return:
 */
export function getHosplist(resData, queryData) {
  return http({
    url: '/supervision/maker/getHosplist',
    method: 'get',
    params: {
      'factoryId': queryData.id,
      'hospatilName':queryData.hospatilName,
      'beginDate': queryData.beginDate,
      'endDate': queryData.endDate,
      'pageNum': resData.pageNum,
      'pageSize': resData.pageSize
    }
  })
}



/**
 *  产看配送
 * @param resData,queryData
 * @author: YuanJiMin
 * @date: 2018/6/26 11:04
 * @return:
 */
export function getSender(resData, queryData) {
  return http({
    url: '/supervision/maker/getSenderlist',
    method: 'get',
    params: {
      'factoryId': queryData.factoryId,
      'senderName':queryData.senderName,
      'beginDate': queryData.beginDate,
      'endDate': queryData.endDate,
      'pageNum': resData.pageNum,
      'pageSize': resData.pageSize
    }
  })
}



/**
 *  生产企业供应情况 查看产品
 * @param resData,queryData
 * @author: YuanJiMin
 * @date: 2018/6/26 11:04
 * @return:
 */
export function getProductlist(resData, queryData) {
  return http({
    url: '/supervision/maker/getProductlist',
    method: 'get',
    params: {
      'factoryId': queryData.factoryId,
      'productName':queryData.productName,
      'beginDate': queryData.proStartDate,
      'endDate': queryData.proEndDate,
      'pageNum': resData.pageNum,
      'pageSize': resData.pageSize
    }
  })
}
