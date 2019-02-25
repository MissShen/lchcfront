import http from 'src/axios/http'
import { dateFormat } from 'src/axios/auditchanges/common/nestedJson'
/**
 * 短缺货列表
 * @param resDate
 * @param domain
 * @returns {*}
 */
export function selectOrdItemStaticList (resData,domain) {
  return http({
    url: '/trade/IssueController/getItemStaticList',
    method: 'get',
    params: {
             'bakMedicalName':domain.bakMedicalName,
             'proportion':domain.proportion,
             'buyerOrgName':domain.buyerOrgName,
             'begin':domain.begin,
             'end':domain.end,
             'pageSize':resData.pageSize,
             'pageNum':resData.pageNum,
              "orderBy":resData.orderBy,
            }
  })
}

/**
 * 短缺货列表
 * @param resDate
 * @param domain
 * @returns {*}
 */
export function queryDqyOrgShortageList (resDate,domain) {
  return http({
    url: '/trade/IssueController/queryDqyOrgShortageList',
    method: 'get',
    params: {
             'pageNum': resDate.pageNum,
              "orderBy":resDate.orderBy,
             'pageSize': resDate.pageSize,
             'searchMedicalName':domain.searchMedicalName,
             'id':domain.id,
             'searchDaseageFormName':domain.searchDaseageFormName,
             'searchSpec':domain.searchSpec,
             'searchStandRate':domain.searchStandRate,
             'searchManufactureName':domain.searchManufactureName,
             'searchState':domain.searchState
            }
  })
}

/**
 * 短缺货列表
 * @param resDate
 * @param domain
 * @returns {*}
 */
export function viewProductList (resDate,domain) {
  return http({
    url: '/trade/IssueController/viewProductList',
    method: 'get',
    params: {
      'orderBy':resDate.orderBy,
      'pageNum': resDate.pageNum,
      'pageSize': resDate.pageSize,
      'id':domain.id,
      'searchAllproductName':domain.searchAllproductName,
      'searchName':domain.searchName,
      'orgAllName':domain.orgAllName
            }
  })
}

/**
 * 短缺货列表
 * @param resDate
 * @param domain
 * @returns {*}
 */
export function getProductInfo (productId) {
  return http({
    url: '/trade/IssueController/getProductInfo',
    method: 'get',
    params: {
             'productId': productId,
            }
  })
}

/**
 * 上报列表药品信息
 * @param productId
 * @returns {*}
 */
export function getShortageById (productId) {
  return http({
    url: '/trade/IssueController/getShortageById',
    method: 'get',
    params: {
             'productId': productId,
            }
  })
}

/**
 * 配送企业列表
 * @param resDate
 * @param domain
 * @returns {*}
 */
export function selectSenderList (resDate,domain) {
  return http({
    url: '/trade/IssueController/selectSenderList',
    method: 'get',
    params: {
             'pageNum': resDate.pageNum,
             'pageSize': resDate.pageSize,
             'productId':domain.productId,
             'senderEasy':domain.senderEasy
            }
  })
}

/**
 * 期号列表
 * @param resDate
 * @param domain
 * @returns {*}
 */
export function issueList (resData,domain) {
  dateFormat(domain,['Date']);
  return http({
    url: '/trade/IssueController/firstTemplateItemList',
    method: 'get',
    params: {
             'pageNum': resData.pageNum,
             'pageSize': resData.pageSize,
             'searchIssueName':domain.searchIssueName,
             'searchIssueState':domain.searchIssueState,
             'searchBenDate':domain.searchBenDate,
             'searchEndDate':domain.searchEndDate,
              "orderBy":resData.orderBy,
    }
  })
}
/**
 * 短缺药上报卫生局
 * @param resDate
 * @param domain
 * @returns {*}
 */
export function shortageUpList (resDate,domain) {
  return http({
    url: '/trade/IssueController/shortageUpList',
    method: 'get',
    params: {
             "orderBy":resDate.orderBy,
             'pageNum': resDate.pageNum,
             'pageSize': resDate.pageSize,
             'searchIssueName':domain.searchIssueName,
             'searchIssueState':domain.searchIssueState
            }
  })
}
/**
 * 卫生局-根据产品汇总短缺药上报
 * @param resDate
 * @param domain
 * @returns {*}
 */
export function wsjProductList (resDate,domain) {
  return http({
    url: '/trade/IssueController/wsjProductList',
    method: 'get',
    params: {
             'pageNum': resDate.pageNum,
             'pageSize': resDate.pageSize,
             'id':domain.id,
             'searchMedicalName':domain.searchMedicalName,
             'searchDaseageFormName':domain.searchDaseageFormName,
             'searchSpec':domain.searchSpec,
             'searchStandRate':domain.searchStandRate,
             'searchManufactureName':domain.searchManufactureName,
             'searchOrgBy':domain.searchOrgBy
            }
  })
}
/**
 * 卫生局-汇总短缺要品机构列表
 * @param resDate
 * @param domain
 * @returns {*}
 */
export function wsjOrgInfoList (resDate,domain) {
  return http({
    url: '/trade/IssueController/wsjOrgInfoList',
    method: 'get',
    params: {
             'pageNum': resDate.pageNum,
             'pageSize': resDate.pageSize,
             'searchBuyerOrgName':domain.searchBuyerOrgName,
             'issueId':domain.issueId,
             'productId':domain.productId
            }
  })
}
/**
 * 期号详情
 * @param id
 * @returns {*}
 */
export function findIssueById (id) {
  return http({
    url: '/trade/IssueController/findIssueById',
    method: 'get',
    params: {
      'id': id
    }
  })
}
/**
 * 新增shortage
 * @param id
 * @returns {*}
 */
export function doAddShortage (domain,reasonType) {
  return http({
    url: '/trade/IssueController/doAddShortage',
    method: 'post',
    params: {
      'senderName': domain.senderName,
      'issueId': domain.issueId,
      'senderId': domain.senderId,
      'supplyQuantity': domain.supplyQuantity,
      'demandQuantity': domain.demandQuantity,
      'price': domain.price,
      'procurementType': domain.procurementType,
      'shortageType': domain.shortageType,
      'shortageDate': domain.shortageDate,
      'reasonType': reasonType.toString(),
      'productId': domain.productId,
      'reasonComments': domain.reasonComments,
      'isAlternative': domain.isAlternative,
      'createUser': domain.createUser,
      'telephone': domain.telephone
    }
  })
}
/**
 * 修改shortage
 * @param id
 * @returns {*}
 */
export function doUpdateShortage (domain,reasonType) {
  return http({
    url: '/trade/IssueController/doUpdateShortage',
    method: 'put',
    params: {
      'id': domain.id,
      'senderName': domain.senderName,
      'senderId': domain.senderId,
      'supplyQuantity': domain.supplyQuantity,
      'demandQuantity': domain.demandQuantity,
      'price': domain.price,
      'procurementType': domain.procurementType,
      'shortageType': domain.shortageType,
      'shortageDate': domain.shortageDate,
      'reasonType': reasonType.toString(),
      'productId': domain.productId,
      'reasonComments': domain.reasonComments,
      'isAlternative': domain.isAlternative,
      'createUser': domain.createUser,
      'telephone': domain.telephone
    }
  })
}
/**
 * 修改期号信息
 * @param domain
 * @returns {*}
 */
export function updateIssue (entity) {
  return http({
    url: '/trade/IssueController/updateIssue',
    method: 'put',
    params: {
      'id': entity.id,
      'issueName': entity.issueName,
      'issueState': entity.issueState,
      'comments': entity.comments,
    }
  })
}
/**
 * 短缺药提交
 * @param idList
 * @returns {*}
 */
export function submitShortageByIds (idList) {
  return http({
    url: '/trade/IssueController/submitShortageByIds',
    method: 'put',
    params: {
      'idList': idList.toString(),

    }
  })
}
/**
 * 短缺药删除
 * @param idList
 * @returns {*}
 */
export function deleteShortageByIds (idList) {
  return http({
    url: '/trade/IssueController/deleteShortageByIds',
    method: 'delete',
    params: {
      'idList': idList.toString(),
    }
  })
}
/**
 * 新增期号信息
 * @param domain
 * @returns {*}
 */
export function addIssue (entity) {
  return http({
    url: '/trade/IssueController/insertIssue',
    method: 'post',
    params: {
      'id': entity.id,
      'issueName': entity.issueName,
      'issueState': entity.issueState,
      'comments': entity.comments,
    }
  })
}

/**
 * EXL导出
 * @param domain
 * @returns {*}
 */
export function exportEXL (domain) {
  return http({
    url: '/trade/IssueController/getItemStaticListPOI',
    method: 'get',
    responseType: 'blob',// 表明返回服务器返回的数据类型
    use: 'all',
    params: {
            'bakMedicalName':domain.bakMedicalName,
            'proportion':domain.proportion,
            'buyerOrgName':domain.buyerOrgName,
            'begin':domain.begin,
            'end':domain.end
    }
  })
}

/**
 * EXL导出
 * @param domain
 * @returns {*}
 */
export function exportRoleEXL (domain) {
  return http({
    url: '/trade/IssueController/exportRoleEXL',
    method: 'get',
    responseType: 'blob',// 表明返回服务器返回的数据类型
    use: 'all',
    params: {
      'id':domain.id,
      'searchMedicalName':domain.searchMedicalName,
      'searchDaseageFormName':domain.searchDaseageFormName,
      'searchSpec':domain.searchSpec,
      'searchStandRate':domain.searchStandRate,
      'searchManufactureName':domain.searchManufactureName,
      'searchOrgBy':domain.searchOrgBy
    }
  })
}


