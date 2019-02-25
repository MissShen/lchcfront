import http from 'src/axios/http'
import {convert, dateFormat} from "../common/nestedJson";

// 当前页列表查询
export function upProductTransferToDeclare(resData) {
  return http({
    url: '/auditchanges/toAuditManagement/upProductTransferToDeclare',
    method: 'get',
    params: {
      'pageSize': resData.pageSize,
      'pageNum': resData.pageNum,
    },
  })
}


// 新建企业申请列表
export function productChangeBatchAdd(resData,paramsForm) {
  paramsForm.pageNum = resData.pageNum;
  paramsForm.pageSize = resData.pageSize;
  paramsForm = JSON.parse(JSON.stringify(paramsForm));
  paramsForm = convert(paramsForm);
  dateFormat(paramsForm, ["Date"], "YYYY/MM/DD HH:mm:ss");
  console.log("jinlaile")
  return http({
    url: '/auditchanges/toAuditManagement/upProductTransferToDeclareBatch',
    method: 'post',
    data:paramsForm,
  })
}


// 选择创建批次
export function upProductTransferInsert(paramsForm) {
  return http({
    url: '/auditchanges/toAuditManagement/upProductTransferInsert',
    method: 'post',
    data:paramsForm,
  })
}


// 全部选择创建批次数量判断
export function upProductTransferCount() {
  return http({
    url: '/auditchanges/toAuditManagement/upProductTransferCount',
    method: 'get',
    params: {},
  })
}

// 全部选择创建批次
export function upProductTransferInsertAll() {
  return http({
    url: '/auditchanges/toAuditManagement/upProductTransferInsertAll',
    method: 'get',
    params: {},
  })
}


// 分配审核员列表查询
export function priceChangeAuditorList(projectCtrlId,checkFlag) {
  return http({
    url: '/auditchanges/toAuditManagement/upProductTransferList',
    method: 'get',
    params: {
      'projectCtrlId': projectCtrlId,
      'checkFlag': checkFlag,
    },
  })
}


// 价格变更选择创建列表
export function upProductTransferList(paramsForm) {
  paramsForm = JSON.parse(JSON.stringify(paramsForm));
  paramsForm = convert(paramsForm);
  dateFormat(paramsForm, ["Date"], "YYYY/MM/DD HH:mm:ss");
  return http({
    url: '/auditchanges/toAuditManagement/upProductTransferBatchList',
    method: 'post',
    data: paramsForm
  })
}

// 价格变更移入批次
export function addPriceChangeBatch(paramsForm) {
  // paramsForm = convert(paramsForm);
  return http({
    url: '/auditchanges/toAuditManagement/addUpProductTransferBatch',
    method: 'post',
    data: paramsForm
  })
}



