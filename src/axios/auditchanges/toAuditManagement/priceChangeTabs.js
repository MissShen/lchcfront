import http from 'src/axios/http'
import {convert, dateFormat} from "../common/nestedJson";

// 当前页列表查询
export function priceToChangeList(resData) {
  return http({
    url: '/auditchanges/toAuditManagement/priceToChange',
    method: 'get',
    params: {
      'pageSize': resData.pageSize,
      'pageNum': resData.pageNum,
    },
  })
}


// 新建企业申请列表
export function priceChangeBatchAdd(resData,paramsForm) {
  paramsForm.pageNum = resData.pageNum;
  paramsForm.pageSize = resData.pageSize;
  paramsForm = JSON.parse(JSON.stringify(paramsForm));
  paramsForm = convert(paramsForm);
  dateFormat(paramsForm, ["Date"], "YYYY/MM/DD HH:mm:ss");
  return http({
    url: '/auditchanges/toAuditManagement/priceChangeBatch',
    method: 'post',
    data:paramsForm,
  })
}


// 选择创建批次
export function priceToChangeInsert(paramsForm) {
  return http({
    url: '/auditchanges/toAuditManagement/priceToChangeInsert',
    method: 'post',
    data:paramsForm,
  })
}


// 全部选择创建批次数量判断
export function priceToChangeCount() {
  return http({
    url: '/auditchanges/toAuditManagement/priceToChangeCount',
    method: 'get',
    params: {},
  })
}

// 全部选择创建批次
export function priceToChangeInsertAll() {
  return http({
    url: '/auditchanges/toAuditManagement/priceToChangeInsertAll',
    method: 'get',
    params: {},
  })
}


// 分配审核员列表查询
export function priceChangeAuditorList(projectCtrlId,checkFlag) {
  return http({
    url: '/auditchanges/toAuditManagement/priceChangeAuditorList',
    method: 'get',
    params: {
      'projectCtrlId': projectCtrlId,
      'checkFlag': checkFlag,
    },
  })
}


// 价格变更选择创建列表
export function priceChangeBatchList(paramsForm) {
  paramsForm = JSON.parse(JSON.stringify(paramsForm));
  paramsForm = convert(paramsForm);
  dateFormat(paramsForm, ["Date"], "YYYY/MM/DD HH:mm:ss");
  return http({
    url: '/auditchanges/toAuditManagement/priceChangeBatchList',
    method: 'post',
    data: paramsForm
  })
}

// 价格变更移入批次
export function addPriceChangeBatch(paramsForm) {
  // paramsForm = convert(paramsForm);
  return http({
    url: '/auditchanges/toAuditManagement/addPriceChangeBatch',
    method: 'post',
    data: paramsForm
  })
}



