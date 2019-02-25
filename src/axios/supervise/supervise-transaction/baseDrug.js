import http from 'src/axios/http'

export function getBaseDrugPurchaseList(resData, queryData) {
  return http({
    url: '/supervision/baseDrug/getBaseDrugPurchaseList',
    method: 'get',
    timeout:0,
    params: {
      'hospName': queryData.hospName,
      'orgName': queryData.orgName,
      'orgLevel': queryData.orgLevel,
      'hosKind': queryData.hosKind,
      'beginDate': queryData.beginDate,
      'endDate': queryData.endDate,
      'pageNum': resData.pageNum,
      'pageSize': resData.pageSize
    }
  })
}


export function GetProDetail(resData, queryData) {
  return http({
    url: '/supervision/baseDrug/GetProDetail',
    method: 'get',
    params: {
      'buyerOrgid': queryData.id,
      'productName':queryData.productName,
      'pageNum': resData.pageNum,
      'pageSize': resData.pageSize
    }
  })
}


export function getArealist(resData, queryData) {
  return http({
    url: '/supervision/baseDrug/queryArea',
    method: 'get',
  })
}




