import http from 'src/axios/http'



/**
 * 异常订单公示
 * @param resData
 * @param query
 * @returns {*}
 */
export function queryUnnormalInfoList (resData,query) {
  return http({
    url: '/trade/information/queryUnnormalInfoList',
    method: 'get',
    params: {
      'searchBuyerName': query.searchBuyerName,
    }
  })
}
/**
 * 异常信息列表
 * @param resData
 * @param query
 * @param buyerOrgId
 * @returns {*}
 */
export function queryOrderUnnormalInfoList (resData,query,buyerOrgId) {
  return http({
    url: '/trade/information/queryOrderUnnormalInfoList',
    method: 'get',
    params: {
      'buyerOrgId': buyerOrgId,
      'searchProductName': query.searchProductName,
      'searchMedicalSpec': query.searchMedicalSpec,
      'searchNormalType': query.searchNormalType,
      'searchBenDate': query.searchBenDate,
      'searchEndDate': query.searchEndDate,
    }
  })
}
/**
 * 企业黄页列表
 * @param resDate
 * @param domain
 * @returns {*}
 */
export function getCatEnterpriseList (resData,query) {
  return http({
    url: '/yxdDataCenter/vOrgCommon/list',
    method: 'get',
    params: {'pageNum': resData.pageNum, 'pageSize': resData.pageSize,"name": query.searchKeyWord}
  })
}
/*export function getCatEnterpriseList (resData,query) {
  return http({
    url: '/trade/enterpriseController/getCatEnterpriseList',
    method: 'get',
    params: {'pageNum': resData.pageNum, 'pageSize': resData.pageSize,"name": query.searchKeyWord}
  })
}*/
/**
 * 医院黄页列表
 * @param resDate
 * @param domain
 * @returns {*}
 */
export function getHospitalList (resData,query) {
  return http({
    url: '/yxdDataCenter/dataquery/communityhospital/list',
    method: 'get',
    params: {'pageNum': resData.pageNum,
            'pageSize': resData.pageSize,
             'name': query.name,
            'level': query.level
    }
  })
}
/*export function getHospitalList (resData,query) {
  return http({
    url: '/trade/enterpriseController/selectHospitalInfoList',
    method: 'get',
    params: {'pageNum': resData.pageNum,
      'pageSize': resData.pageSize,
      'name': query.name,
      'level': query.level
    }
  })
}*/

/*
 注意修改
 */
export function findLinkManDetail (resData,query) {
  return http({
    url: '/trade/enterpriseController/findLinkManDetail',
    method: 'get',
    params: {'pageNum': resData.pageNum, 'pageSize': resData.pageSize,"name": query.searchKeyWord}
  })
}



/*
 注意修改
 */
export function queryLinkManList (resData,query) {
  return http({
    url: '/trade/enterpriseController/findLinkManDetail',
    method: 'get',
    params: {'pageNum': resData.pageNum, 'pageSize': resData.pageSize,"name": query.searchKeyWord}
  })
}
/**
 * 企业黄页联系人信息
 * @param resDate
 * @param domain
 * @returns {*}
 */
export function selectEnterpriseContactsInfo (resData,query) {
  return http({
    url: '/trade/enterpriseController/selectEnterpriseContactsInfo',
    method: 'get',
    params: {'pageNum': resData.pageNum,
              "orderBy":resData.orderBy,
              'pageSize': resData.pageSize,
              'linkman': query.searchLinkman,
              'enterprise': query.enterprise,
              'orgId': query.orgId}
  })
}
/**
 * 联系人修改新增
 * @param resDate
 * @param domain
 * @returns {*}
 */
export function selectInfo (query) {
  return http({
    url: '/trade/enterpriseController/selectEnterpriseContactsInfo',
    method: 'get',
    params: {
      'id': query.id,
      'updateAdd':query.updateAdd


    }
  })
}
/**
 * 联系人修改
 * @param resDate
 * @param domain
 * @returns {*}
 */
export function updatePersonInfo (query) {
  return http({
    url: '/trade/enterpriseController/insertEnterpriseContactsInfo',
    method: 'post',
    params: {
      'id': query.id,
      'linkman': query.linkman,
      'linkmanDepartment': query.linkmanDepartment,
      'linkmanJob': query.linkmanJob,
      'telePhone': query.telePhone,
      'mobilePhone': query.mobilePhone,
      'faxNumber': query.faxNumber,
      'qqNumber': query.qqNumber,
      'wechatCode': query.wechatCode,
      'contactAddress': query.contactAddress,
      'postalCode':query.postalCode,
      'not': query.not,
      'comments': query.comments
    }
  })
}
/**
 * 联系人删除
 * @param resDate
 * @param domain
 * @returns {*}
 */
export function deletePersonInfo (id) {
  return http({
    url: '/trade/enterpriseController/deleteEnterpriseContactsInfo',
    method: 'delete',
    params: {
      'id': id
    }
  })
}


