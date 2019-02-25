import http from 'src/axios/http'

/**
 * 医疗机构查询列表
 * @author: JiaHaiGang
 * @date: 2018/5/22 11:13
 */
export function queryMedicalCare(resData,queryData) {
  return http({
    url: '/supervision/sysTransaction/queryMedicalCare',
    method: 'get',
    params: {
      'hosOrgName': queryData.queryName,
      'countyId': queryData.queryAreaId,
      'hosLevel': queryData.queryLevel,
      'hosProperty': queryData.queryProperty,
      'startDate': queryData.queryStartDate,
      'endDate': queryData.queryEndDate,
      'pageNum': resData.pageNum,
      'pageSize': resData.pageSize
    }
  })
}


/**
 *  导出医疗机构列表Excel
 * @author: YuanJiMin
 * @date: 2018/8/14 11:01
 * @return:
 */
export function downloadExcelHospital(resData,queryData) {
  return http({
    url: '/supervision/sysTransaction/downloadExcelHospital',
    method: 'post',
    responseType: 'blob',// 表明返回服务器返回的数据类型
    use: 'all',
    params: {
      'hosOrgName': queryData.queryName,
      'countyId': queryData.queryAreaId,
      'hosLevel': queryData.queryLevel,
      'hosProperty': queryData.queryProperty,
      'startDate': queryData.queryStartDate,
      'endDate': queryData.queryEndDate,
    }
  })
}

/**
 *  根据医疗机构查询配送企业列表
 * @author: YuanJiMin
 * @date: 2018/8/14 10:59
 * @return:
 */
export function queryMedicalSender(resData,queryData) {
  return http({
    url: '/supervision/sysTransaction/querySender',
    method: 'get',
    params: {
      'id': queryData.id,
      'medicalName': queryData.medicalName,
      'sendId': queryData.sendId,
      'senderName': queryData.senderName,
      'startDate': queryData.startDate,
      'endDate': queryData.endDate,
      'pageNum': resData.pageNum,
      'pageSize': resData.pageSize
    }
  })
}

/**
 * 根据医疗机构查询配送企业导出列表
 * @author: YuanJiMin
 * @date: 2018/8/14 11:00
 * @return:
 */
export function downloadExcelSender(resData,queryData) {
  return http({
    url: '/supervision/sysTransaction/downloadExcelSender',
    method: 'post',
    responseType: 'blob',// 表明返回服务器返回的数据类型
    use: 'all',
    params: {
      'id': queryData.id,
      'medicalName': queryData.medicalName,
      'sendId': queryData.sendId,
      'senderName': queryData.senderName,
      'startDate': queryData.startDate,
      'endDate': queryData.endDate,
      'pageNum': resData.pageNum,
      'pageSize': resData.pageSize
    }
  })
}

/**
 * 根据医疗机构下的某个配送企业查看配送的产品信息
 * @author: YuanJiMin
 * @date: 2018/8/15 10:37
 * @return:
 */
export function querySenderProduct(resData,queryData) {
  return http({
    url: '/supervision/sysTransaction/querySenderProduct',
    method: 'get',
    params: {
      'medicalId': queryData.medicalId,
      'sendId': queryData.sendId,
      'senderName': queryData.senderName,
      'productName': queryData.productName,
      'startDate': queryData.startDate,
      'endDate': queryData.endDate,
      'pageNum': resData.pageNum,
      'pageSize': resData.pageSize
    }
  })
}

/**
 * 根据某个医疗机构下某个合作过的配送企业查看配送过哪些产品 导出列表
 * @author: YuanJiMin
 * @date: 2018/8/15 10:37
 * @return:
 */
export function downloadExcelProduct(resData,queryData) {
  return http({
    url: '/supervision/sysTransaction/downloadExcelProduct',
    method: 'post',
    responseType: 'blob',// 表明返回服务器返回的数据类型
    use: 'all',
    params: {
      'medicalId': queryData.medicalId,
      'sendId': queryData.sendId,
      'senderName': queryData.senderName,
      'productName': queryData.productName,
      'startDate': queryData.startDate,
      'endDate': queryData.endDate,
      'pageNum': resData.pageNum,
      'pageSize': resData.pageSize
    }
  })
}

/**
 *  根据医疗机构查看订购产品列表
 * @author: YuanJiMin
 * @date: 2018/8/15 15:10
 * @return:
 */
export function queryMedicalProduct(resData,queryData) {
  return http({
    url: '/supervision/sysTransaction/queryMedicalProduct',
    method: 'get',
    params: {
      'medicalId': queryData.medicalId,
      'medicalName': queryData.medicalName,
      'productName': queryData.productName,
      'startDate': queryData.startDate,
      'endDate': queryData.endDate,
      'pageNum': resData.pageNum,
      'pageSize': resData.pageSize
    }
  })
}

/**
 *  根据医疗机构导出订购产品列表
 * @author: YuanJiMin
 * @date: 2018/8/15 15:10
 * @return:
 */
export function downloadExcelMedicalProduct(resData,queryData) {
  return http({
    url: '/supervision/sysTransaction/downloadExcelMedicalProduct',
    method: 'post',
    responseType: 'blob',// 表明返回服务器返回的数据类型
    use: 'all',
    params: {
      'medicalId': queryData.medicalId,
      'medicalName': queryData.medicalName,
      'productName': queryData.productName,
      'startDate': queryData.startDate,
      'endDate': queryData.endDate,
      'pageNum': resData.pageNum,
      'pageSize': resData.pageSize
    }
  })
}

/**
 *  根据医疗机构某个产品查看配送列表
 * @author: YuanJiMin
 * @date: 2018/8/15 15:10
 * @return:
 */
export function queryMedicalProductSender(resData,queryData) {
  return http({
    url: '/supervision/sysTransaction/queryMedicalProductSender',
    method: 'get',
    params: {
      'id': queryData.id,
      'productId': queryData.productId,
      'senderName': queryData.senderName,
      'startDate': queryData.startDate,
      'endDate': queryData.endDate,
      'pageNum': resData.pageNum,
      'pageSize': resData.pageSize
    }
  })
}
/**
 *  根据医疗机构某个产品导出配送列表
 * @author: YuanJiMin
 * @date: 2018/8/15 15:12
 * @return:
 */
export function downloadProductSenderExcel(resData,queryData) {
  return http({
    url: '/supervision/sysTransaction/downloadProductSenderExcel',
    method: 'post',
    responseType: 'blob',// 表明返回服务器返回的数据类型
    use: 'all',
    params: {
      'id': queryData.id,
      'productId': queryData.productId,
      'productName':queryData.productName,
      'senderName': queryData.senderName,
      'startDate': queryData.startDate,
      'endDate': queryData.endDate,
    }
  })
}
