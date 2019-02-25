import http from 'src/axios/http'
import {convert, dateFormat} from "../common/nestedJson";

// 当前页列表查询
export function enterpriseChangeList(resData) {
  return http({
    url: '/auditchanges/toAuditManagement/enterpriseChange',
    method: 'get',
    params: {
      'pageSize': resData.pageSize,
      'pageNum': resData.pageNum,
    },
  })
}

// 新建企业申请列表
export function enterpriseChangeBatchAdd(resData,paramsForm) {
  paramsForm.pageNum = resData.pageNum;
  paramsForm.pageSize = resData.pageSize;
  paramsForm = JSON.parse(JSON.stringify(paramsForm));
  paramsForm = convert(paramsForm);
  dateFormat(paramsForm, ["Date"], "YYYY/MM/DD HH:mm:ss");
  return http({
    url: '/auditchanges/toAuditManagement/enterpriseChangeBatch',
    method: 'post',
    data:paramsForm,
  })
}


// 选择创建批次
export function enterpriseChangeInsert(paramsForm) {
  return http({
    url: '/auditchanges/toAuditManagement/enterpriseChangeInsert',
    method: 'post',
    data:paramsForm,
  })
}


// 全部选择创建批次数量判断
export function enterpriseChangeCount() {
  return http({
    url: '/auditchanges/toAuditManagement/enterpriseChangeCount',
    method: 'get',
    params: {},
  })
}


// 全部选择创建批次
export function enterpriseChangeInsertAll() {
  return http({
    url: '/auditchanges/toAuditManagement/enterpriseChangeInsertAll',
    method: 'get',
    params: {},
  })
}



// 分配审核员列表查询
export function enterprisesChangeAuditorList(projectCtrlId,checkFlag) {
  return http({
    url: '/auditchanges/toAuditManagement/enterprisesChangeAuditorList',
    method: 'get',
    params: {
      'projectCtrlId': projectCtrlId,
      'checkFlag': checkFlag,
    },
  })
}


// 企业变更选择创建列表
export function enterpriseChangeBatchList(paramsForm) {
  paramsForm = JSON.parse(JSON.stringify(paramsForm));
  paramsForm = convert(paramsForm);
  dateFormat(paramsForm, ["Date"], "YYYY/MM/DD HH:mm:ss");
  return http({
    url: '/auditchanges/toAuditManagement/enterpriseChangeBatchList',
    method: 'post',
    data: paramsForm
  })
}

// 企业变更移入批次
export function addEnterprisesChangeBatch(paramsForm) {
  // paramsForm = convert(paramsForm);
  return http({
    url: '/auditchanges/toAuditManagement/addEnterprisesChangeBatch',
    method: 'post',
    data: paramsForm
  })
}
