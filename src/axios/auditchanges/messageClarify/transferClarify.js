import http from 'src/axios/http'

export function findTransferClarifyList(query,resData) {
  return http({
    url:'/auditchanges/transferClarify/findTransferClarifyList',
    method:'get',
    params:{
      'pageNum':resData.pageNum,
      'pageSize':resData.pageSize,
      'startDate':query.startDate,
      'endDate':query.endDate,
      'transferType':query.transferType,
      'outOrgName':query.outOrgName
    }
  })
}
