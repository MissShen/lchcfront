import http from 'src/axios/http'

export function queryPriceDownAuditList(resData,reqData) {
  console.log(reqData)
  return http({
    url:'/auditchanges/productPriceDownAudit/list',
    method:'get',
    params:{
      'pageNum': resData.pageNum,
      'pageSize': resData.pageSize,

      'id':reqData.id,
      'startDate':reqData.startDate,
      'endDate':reqData.endDate,
      'publicity':reqData.publicity,
      'statesAudit':reqData.statesAudit
    }
  })
}

export function findPriceDownAuditDetails(reqData) {
  return http({
    url:'/auditchanges/productPriceDownAudit/findPriceDownAuditDetails',
    method:'get',
    params:{
      'id':reqData
    }
  })
}

export function priceDownAudit(reqData) {
  return http({
    url:'/auditchanges/productPriceDownAudit/priceDownAudit',
    method:'post',
    data:reqData
  })
}

export function productDownPublicity(reqData, flag) {
  console.log(reqData)
  return http({
    url:'/auditchanges/productPriceDownAudit/productDownPublicity',
    method:'post',
    data:{
      'ids':reqData,
      'flag':flag
    }
  })
}
