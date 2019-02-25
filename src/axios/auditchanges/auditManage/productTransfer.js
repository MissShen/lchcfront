import http from 'src/axios/http'

export function auditList(transferInfoId) {
  return http({
    url: '/auditchanges/upProductTransferAudit/list',
    method: 'get',
    params: {
      'transferInfoId': transferInfoId
    }
  })
}
//
// export function add(dataForm) {
//   return http({
//     url: '/auditchanges/upProductTransferAudit/add',
//     method: 'post',
//     data: {
//       'upProductTransferId': dataForm.transferId,
//       'upProductTransferInfoId': dataForm.transferInfoId,
//       'stateAudit':dataForm.stateAudit,
//       'remark':dataForm.remark
//     }
//   })
// }

export function insertProductTransferAudit(resData){
  return http({
    url:'/auditchanges/productTransferAudit/insertProductTransferAudit',
    method:'post',
    data:{
      'auditState':resData.auditState,
      'explain':resData.explain,
      'transferId':resData.transferId,
      'transferInfoId':resData.transferInfoId
    }
  })
}
