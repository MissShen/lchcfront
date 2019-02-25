import http from 'src/axios/http'

// 信息变更=》产品转产，获取首页列表
export function findUpProductTransfers(resData, query) {
  return http({
    url: '/auditchanges/upProductTransfer/findUpProductTransfers',
    method: 'get',
    params: {
      'pageNum': resData.pageNum,
      'pageSize': resData.pageSize,
      'requestCode': query.requestCode,
      'operatorType': query.operatorType,
      'outOrgName': query.outOrgName
    }
  })
}

export function productTransAuditList(resData, query) {
  return http({
    url: '/auditchanges/upProductTransfer/auditList',
    method: 'get',
    params: {
      'pageNum': resData.pageNum,
      'pageSize': resData.pageSize,
      'requestCode': query.code,
      'inOrgName': query.inOrgName,
      'outOrgName': query.outOrgName,
      'upTypeId': query.upType
    }
  })
}


export function findById(id) {
  return http({
    url: '/auditchanges/upProductTransfer/findById',
    method: 'get',
    params: {
      'id': id,
    }
  })
}

export function add(dataForm) {
  return http({
    url: '/auditchanges/upProductTransfer/insert',
    method: 'put',
    data: {
      'outOrgId': dataForm.orgId,
      'outOrgName': dataForm.orgName,
      'upTypeId': dataForm.upTypeId,
      'isConfirm': dataForm.isConfirm
    }
  })
}

// 删除
export function del(id) {
  return http({
    url: '/auditchanges/upProductTransfer/delete',
    method: 'delete',
    params: {'id': id}
  })
}

/**
 * 提交
 */
export function commit(id) {
  return http({
    url: '/auditchanges/upProductTransfer/commit',
    method: 'post',
    data: {'id': id}
  })
}

/**
 * 撤回
 */
export function withdraw(dataIdLists) {
  return http({
    url: '/auditchanges/toAuditManagement/removeProductTransfer',
    method: 'post',
    data: {'removeEnterprisesToDeclarDomain': dataIdLists}
  })
}

export function queryOrgProducts(outOrgId,flag) {
  return http({
    url: '/auditchanges/upProductTransfer/queryOrgProducts',
    method: 'get',
    params: {
      'outOrgId': outOrgId,
      'flag':flag
    }
  })
}

export function getUpProductTransferById(outOrgId, upTypeId) {
  return http({
    url: '/auditchanges/upProductTransfer/getUpProductTransferById',
    method: 'get',
    params: {
      'outOrgId': outOrgId,
      'upTypeId': upTypeId
    }
  })
}

export function findFileTypeList(reqData) {
  return http({
    url: '/auditchanges/upProductTransferInfo/findFileTypeList',
    method: 'get',
    params: {
      'type': reqData.type,
    }
  })
}

export function insertFile(resData) {
  return http({
    url: '/auditchanges/upProductTransferInfo/insertFile',
    method: 'post',
    data: resData
  })
}

export function findQualificationList(reqData) {
  return http({
    url:'/auditchanges/upProductTransferInfo/findQualificationList',
    method:'get',
    params:{
      'orgId':reqData
    }
  })
}

export function findAuditList(reqData) {
  return http({
    url:'/auditchanges/productTransferAudit/findAuditList',
    method:'get',
    params:{
      'requsertCode':reqData.requsertCode,
      'inOrgName':reqData.inOrgName,
      'outOrgName':reqData.outOrgName,
      'upTypeId':reqData.upTypeId
    }
  })
}


export function publicityTransfer(reqData, flag) {
  console.log(reqData)
  return http({
    url:'/auditchanges/upProductTransfer/publicityTransfer',
    method:'post',
    data:{
      'idStr':reqData,
      'flag':flag
    }
  })
}

export function findAgencyStateByid(transferId) {
  return http({
    url:'/auditchanges/upProductTransfer/findAgencyStateByid',
    method:'get',
    params:{
      'transferId':transferId
    }
  })
}

export function findImageIdListById(transferId) {
  return http({
    url:'/auditchanges/upProductTransfer/findImageIdListById',
    method:'get',
    params:{
      'transferId':transferId
    }
  })
}

export function listCount(transferId) {
  return http({
    url:'/auditchanges/upProductTransferInfo/listCount',
    method:'get',
    params:{
      'transferId':transferId
    }
  })
}

export function findProjectOrgByid() {
  return http({
    url:'/auditchanges/upProductTransferInfo/findProjectOrgByid',
    method:'get',
  })
}

export function findTransferQuestionList(resData){
  return http({
    url:'/auditchanges/transferClarify/findTransferQuestionList',
    method:'get',
    params:{
      'orgId':resData.orgId,
      'upTypeId':resData.upTypeId,
      'startDate':resData.startDate,
      'endDate':resData.endDate
    }
  })
}

export function findTransferQuestion(id) {
  console.log(id)
  return http({
    url:'/auditchanges/transferClarify/findTransferQuestion',
    method:'get',
    params:{
      'transferId':id
    }
  })
}

export  function transferReply(resData){
  console.log(resData)
  return http({
    url :'/auditchanges/transferClarify/transferReply',
    method:'post',
    data:{
      'questionId':resData.questionId,
      'replyContent':resData.replyContent
    }
  })
}
