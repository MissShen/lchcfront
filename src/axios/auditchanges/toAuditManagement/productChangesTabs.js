import http from 'src/axios/http'
import {convert, dateFormat} from "../common/nestedJson";

// 当前页列表查询
export function productChangeList(resData) {
  return http({
    url: '/auditchanges/toAuditManagement/productChange',
    method: 'get',
    params: {
      'pageSize': resData.pageSize,
      'pageNum': resData.pageNum,
    },
  })
}


// 新建产品变更列表
export function productChangeBatchAdd(resData,paramsForm) {
  paramsForm.pageSize = resData.pageSize;
  paramsForm.pageNum = resData.pageNum;
  paramsForm = JSON.parse(JSON.stringify(paramsForm));
  paramsForm = convert(paramsForm);
  dateFormat(paramsForm, ["Date"], "YYYY/MM/DD HH:mm:ss");
  return http({
    url: '/auditchanges/toAuditManagement/productChangeBatch',
    method: 'post',
    data:paramsForm,
  })
}


// 选择创建批次
export function productChangeInsert(paramsForm) {
  return http({
    url: '/auditchanges/toAuditManagement/productChangeInsert',
    method: 'post',
    data:paramsForm,
  })
}

// 全部选择创建批次数量判断
export function productChangeCount() {
  return http({
    url: '/auditchanges/toAuditManagement/productChangeCount',
    method: 'get',
    params: {},
  })
}


// 全部选择创建批次
export function productChangeInsertAll() {
  return http({
    url: '/auditchanges/toAuditManagement/productChangeInsertAll',
    method: 'get',
    params: {},
  })
}


// 分配审核员列表查询
export function productChangeAuditorList(projectCtrlId,checkFlag) {
  return http({
    url: '/auditchanges/toAuditManagement/productChangeAuditorList',
    method: 'get',
    params: {
      'projectCtrlId': projectCtrlId,
      'checkFlag': checkFlag,
    },
  })
}


// 产品变更选择创建列表
export function productChangeBatchList(paramsForm) {
  paramsForm = JSON.parse(JSON.stringify(paramsForm));
  paramsForm = convert(paramsForm);
  dateFormat(paramsForm, ["Date"], "YYYY/MM/DD HH:mm:ss");
  return http({
    url: '/auditchanges/toAuditManagement/productChangeBatchList',
    method: 'post',
    data: paramsForm
  })
}

// 产品变更移入批次
export function addProductChangeBatch(paramsForm) {
  // paramsForm = convert(paramsForm);
  return http({
    url: '/auditchanges/toAuditManagement/addProductChangeBatch',
    method: 'post',
    data: paramsForm
  })
}
