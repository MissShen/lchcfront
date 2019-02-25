import http from 'src/axios/http'

export function queryList(resData,reqData) {
  return http({
    url:'/auditchanges/productPriceDownPublicity/list',
    method:'get',
    params:{
      'pageNum': resData.pageNum,
      'pageSize': resData.pageSize,

      'companyName': reqData.companyName,
      'productName':reqData.productName,
      'doseageName':reqData.doseageName,
      'specName':reqData.specName
    }
  })
}
