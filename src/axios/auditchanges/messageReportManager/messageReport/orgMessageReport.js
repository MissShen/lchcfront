import http from 'src/axios/http'

export function findReportList(reqData, resData) {
  return http({
    url: '/auditchanges/messageReport/findReportList',
    method: 'get',
    params: {
      'pageNum': resData.pageNum,
      'pageSize': resData.pageSize,

      'name': reqData.name,
      'creaditCode': reqData.creaditCode,
      'organizeCode': reqData.organizeCode,
      'states': reqData.states
    }
  })
}

export function findOrgList(reqData, resData) {
  return http({
    url: '/auditchanges/messageReport/findOrgList',
    method: 'get',
    params: {
      'pageNum': resData.pageNum,
      'pageSize': resData.pageSize,

      'name': reqData.name,
      'creaditCode': reqData.creaditCode,
      'organizeCode': reqData.organizeCode,
    }
  })
}

export function insertOrgReport(reqData) {
  console.log(reqData)
  return http({
    url: '/auditchanges/messageReport/insertOrgReport',
    method: 'post',
    data: reqData
  })
}

export function findOrgReportById(resData) {
  return http({
    url: '/auditchanges/messageReport/findOrgReportById',
    method: 'get',
    params: {
      'id': resData
    }
  })
}

export function orgReportAuditList(reqData) {
  return http({
    url: '/auditchanges/messageReport/orgReportAuditList',
    method: 'get',
    params: {
      'startDate': reqData.startDate,
      'endDate': reqData.endDate,
      'name': reqData.name,
      'creaditCode': reqData.creaditCode,
      'organizeCode': reqData.organizeCode,
      'states': reqData.states,
      'flag': reqData.flag,
    }
  })
}

export function updateReportStates(resData) {
  return http({
    url: '/auditchanges/messageReport/updateReportStates',
    method: 'post',
    data: resData
  })
}

export function findOrgCliarifyList(reqData, resData) {
  return http({
    url: '/auditchanges/messageReport/findOrgCliarifyList',
    method: 'get',
    params: {
      'states': reqData.states,
      'flag': reqData.flag,
      'startDate': reqData.startDate,
      'endDate': reqData.endDate,
      'pageSize': resData.pageSize,
      'pageNum': resData.pageNum
    }
  })
}

export function orgReportCliarify(reqData) {
  console.log(reqData)
  return http({
    url: '/auditchanges/messageReport/orgReportCliarify',
    method: 'post',
    data: reqData
  })
}
