import http from 'src/axios/http'
import {convert, dateFormat} from "../common/nestedJson";

// 当前页列表查询
export function enterprisesToDeclareList(resData) {
  return http({
    url: '/auditchanges/toAuditManagement/enterprisesToDeclare',
    method: 'get',
    params: {
      'pageSize': resData.pageSize,
      'pageNum': resData.pageNum,
    },
  })
}

// 新建企业申请列表
export function enterprisesToDeclareBatchAdd(resData,paramsForm) {
  paramsForm.pageNum = resData.pageNum;
  paramsForm.pageSize = resData.pageSize;
  console.log(paramsForm,'paramsForm')
  paramsForm = JSON.parse(JSON.stringify(paramsForm));
  paramsForm = convert(paramsForm);
  dateFormat(paramsForm, ["Date"], "YYYY/MM/DD HH:mm:ss");
  return http({
    url: '/auditchanges/toAuditManagement/enterprisesToDeclareBatch',
    method: 'post',
    data:paramsForm,
  })
}

// 选择创建批次
export function enterprisesToDeclareInsert(paramsForm) {
  return http({
    url: '/auditchanges/toAuditManagement/enterprisesToDeclareInsert',
    method: 'post',
    data:paramsForm,
  })
}


// 全部选择创建批次数量判断
export function enterprisesToDeclareCount() {
  return http({
    url: '/auditchanges/toAuditManagement/enterprisesToDeclareCount',
    method: 'get',
    params: {},
  })
}

// 全部选择创建批次
export function enterprisesToDeclareInsertAll() {
  return http({
    url: '/auditchanges/toAuditManagement/enterprisesToDeclareInsertAll',
    method: 'get',
    params: {},
  })
}

// 全部选择创建批次
export function queryBaseinfoauditList(paramsForm) {
  return http({
    url: '/auditchanges/userRole/queryBaseinfoauditList',
    method: 'post',
    data:paramsForm,
  })
}

// 分配审核员列表查询
export function enterprisesToDeclareAuditorList(projectCtrlId,checkFlag) {
  return http({
    url: '/auditchanges/toAuditManagement/enterprisesToDeclareAuditorList',
    method: 'get',
    params: {
      'projectCtrlId': projectCtrlId,
      'checkFlag': checkFlag,
    },
  })
}

// 企业申报选择创建列表
export function enterprisesToDeclareBatchList(paramsForm) {
  paramsForm = JSON.parse(JSON.stringify(paramsForm));
  paramsForm = convert(paramsForm);
  dateFormat(paramsForm, ["Date"], "YYYY/MM/DD HH:mm:ss");
  return http({
    url: '/auditchanges/toAuditManagement/enterprisesToDeclareBatchList',
    method: 'post',
    data: paramsForm
  })
}


// 企业申报移入批次
export function addEnterprisesToDeclareBatch(paramsForm) {
  // paramsForm = convert(paramsForm);
  return http({
    url: '/auditchanges/toAuditManagement/addEnterprisesToDeclareBatch',
    method: 'post',
    data: paramsForm
  })
}
