import http from "../../http";

// 信息公示=》转产信息公示
export function productTransferList(resData, query) {
  return http({
    url: '/auditchanges/upProductTransfer/findTransferPublicityList',
    method: 'get',
    params: {
      'pageNum': resData.pageNum,
      'pageSize': resData.pageSize,
      'operatorType': query.operatorType,
      'inOrgName': query.inOrgName,
      'outOrgName': query.outOrgName
    }
  })
}

export function productTransferDetail(resData, query) {
  return http({
    url: '/auditchanges/productTransfer/detail',
    method: 'get',
    params: {
      'pageNum': resData.pageNum,
      'pageSize': resData.pageSize,
      'transferId': query.id
    }
  })
}

export function insertTransferQuestion(reqData) {
  return http({
    url:'/auditchanges/transferQuestion/insertTransferQuestion',
    method:'post',
    data:reqData
  })
}

export function findTransferQuestion(id) {
  return http({
    url:'/auditchanges/transferQuestion/findTransferQuestion',
    method:'get',
    params:{'id':id}
  })
}

export function insertTransferTalkInfo(resData) {
  return http({
    url:'/auditchanges/transferQuestion/insertTransferTalkInfo',
    method:'post',
    data:resData
  })
}

export function findQuestionAndFiles(resData) {
  return http({
    url:'/auditchanges/transferClarify/findQuestionAndFiles',
    method:'get',
    params:{
      'id':resData
    }
  })
}
