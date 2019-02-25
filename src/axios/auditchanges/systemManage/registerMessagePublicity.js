import http from 'src/axios/http'

/**
 * 企业公示管理 - 查询列表
 * @param pageNum 页码, pageSize 条数
 */
export function orgList(resData, query) {
  return http({
    url: '/auditchanges/registerAnnouncement/orgList',
    method: 'get',
    params: {
      'pageNum': resData.pageNum,
      'pageSize': resData.pageSize,
      'orgName': query.orgName,
      'orgCode': query.orgCode,
      'creditCode': query.creditCode,
      'status': query.status
    }
  })
}

/**
 * 企业公示管理 - 公示
 */
export function orgAnnouncement(orgIds) {
  return http({
    url: '/auditchanges/registerAnnouncement/orgAnnouncement',
    method: 'post',
    data: {'orgIds': orgIds}
  })
}

/**
 * 企业公示管理 - 撤销公示
 */
export function orgUnAnnouncement(orgIds) {
  return http({
    url: '/auditchanges/registerAnnouncement/orgUnAnnouncement',
    method: 'post',
    data: {
      'orgIds': orgIds
    }
  })
}

/**
 * 产品公示管理 - 查询列表
 * @param pageNum 页码, pageSize 条数
 */
export function productList(resData, query) {
  return http({
    url: '/auditchanges/registerAnnouncement/productList',
    method: 'get',
    params: {
      'pageNum': resData.pageNum,
      'pageSize': resData.pageSize,
      'name': query.name,
      'dosage': query.dosage,
      'specification': query.specification,
      'manufacture': query.manufacture,
      'status': query.status
    }
  })
}

/**
 * 产品公示管理 - 公示
 */
export function productAnnouncement(productIds) {
  return http({
    url: '/auditchanges/registerAnnouncement/productAnnouncement',
    method: 'post',
    data: {
      'productIds': productIds
    }
  })
}

/**
 * 产品公示管理 - 撤销公示
 */
export function productUnAnnouncement(productIds) {
  return http({
    url: '/auditchanges/registerAnnouncement/productUnAnnouncement',
    method: 'post',
    data: {
      'productIds': productIds
    }
  })
}

