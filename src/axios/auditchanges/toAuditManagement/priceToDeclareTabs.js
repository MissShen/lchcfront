import http from 'src/axios/http'
import {convert, dateFormat} from "../common/nestedJson";

// 当前页列表查询
export function priceToDeclareList(resData) {
  return http({
    url: '/auditchanges/toAuditManagement/priceToDeclare',
    method: 'get',
    params: {
      'pageSize': resData.pageSize,
      'pageNum': resData.pageNum,
    },
  })
}


// 新建价格申请列表
export function priceToDeclareBatchAdd(resData,paramsForm) {
  paramsForm.pageNum = resData.pageNum;
  paramsForm.pageSize = resData.pageSize;
  paramsForm = JSON.parse(JSON.stringify(paramsForm));
  paramsForm = convert(paramsForm);
  dateFormat(paramsForm, ["Date"], "YYYY/MM/DD HH:mm:ss");
  return http({
    url: '/auditchanges/toAuditManagement/priceToDeclareBatch',
    method: 'post',
    data:paramsForm,
  })
}


// 选择创建批次
export function priceToDeclareInsert(paramsForm) {
  return http({
    url: '/auditchanges/toAuditManagement/priceToDeclareInsert',
    method: 'post',
    data:paramsForm,
  })
}

// 全部选择创建批次数量判断
export function priceToDeclareCount() {
  return http({
    url: '/auditchanges/toAuditManagement/priceToDeclareCount',
    method: 'get',
    params: {},
  })
}


// 全部选择创建批次
export function priceToDeclareInsertAll() {
  return http({
    url: '/auditchanges/toAuditManagement/priceToDeclareInsertAll',
    method: 'get',
    params: {},
  })
}


// 分配审核员列表查询
export function priceToDeclareAuditorList(projectCtrlId,checkFlag) {
  return http({
    url: '/auditchanges/toAuditManagement/priceToDeclareAuditorList',
    method: 'get',
    params: {
      'projectCtrlId': projectCtrlId,
      'checkFlag': checkFlag,
    },
  })
}


// 新增审核员列表查询
export function queryPriceauditList(paramsForm) {
  return http({
    url: '/auditchanges/userRole/queryBaseinfoauditList',
    method: 'post',
    data:paramsForm
  })
}


// 价格申报选择创建列表
export function priceToDeclareBatchList(paramsForm) {
  paramsForm = JSON.parse(JSON.stringify(paramsForm));
  paramsForm = convert(paramsForm);
  dateFormat(paramsForm, ["Date"], "YYYY/MM/DD HH:mm:ss");
  return http({
    url: '/auditchanges/toAuditManagement/priceToDeclareBatchList',
    method: 'post',
    data: paramsForm
  })
}

// 产品申报移入批次
export function addPriceToDeclareBatch(paramsForm) {
  // paramsForm = convert(paramsForm);
  return http({
    url: '/auditchanges/toAuditManagement/addPriceToDeclareBatch',
    method: 'post',
    data: paramsForm
  })
}
