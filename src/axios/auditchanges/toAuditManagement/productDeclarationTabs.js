import http from 'src/axios/http'
import {convert, dateFormat} from "../common/nestedJson";

// 当前页列表查询
export function productDeclarationTabsList(resData) {
  return http({
    url: '/auditchanges/toAuditManagement/productDeclaration',
    method: 'get',
    params: {
      'pageSize': resData.pageSize,
      'pageNum': resData.pageNum,
    },
  })
}

// 新建产品申报列表
export function productDeclarationBatchAdd(resData, paramsForm) {
  paramsForm.pageNum = resData.pageNum;
  paramsForm.pageSize = resData.pageSize;
  paramsForm = JSON.parse(JSON.stringify(paramsForm));
  paramsForm = convert(paramsForm);
  dateFormat(paramsForm, ["Date"], "YYYY/MM/DD HH:mm:ss");
  return http({
    url: '/auditchanges/toAuditManagement/productDeclarationBatch',
    method: 'post',
    data: paramsForm
  })
}


// 选择创建批次
export function productDeclarationInsert(paramsForm) {
  return http({
    url: '/auditchanges/toAuditManagement/productDeclarationInsert',
    method: 'post',
    data: paramsForm,
  })
}



// 全部创建批次数量判断
export function productDeclarationCount() {
  return http({
    url: '/auditchanges/toAuditManagement/productDeclarationCount',
    method: 'get',
    params: {
    },
  })
}


// 全部创建批次
export function productDeclarationInsertAll() {
  return http({
    url: '/auditchanges/toAuditManagement/productDeclarationInsertAll',
    method: 'get',
    params: {
    },
  })
}


// 分配审核员列表查询
export function productToDeclareAuditorList(projectCtrlId,checkFlag) {
  return http({
    url: '/auditchanges/toAuditManagement/productToDeclareAuditorList',
    method: 'get',
    params: {
      'projectCtrlId': projectCtrlId,
      'checkFlag': checkFlag,
    },
  })
}



// 新增审核员列表查询
export function queryBaseinfoauditList(paramsForm) {
  return http({
    url: '/auditchanges/userRole/queryBaseinfoauditList',
    method: 'post',
    data:paramsForm
  })
}



// 保存新增审核员
export function saveAuditor(paramsForm) {
  // console.log(JSON.stringify(paramsForm));
  paramsForm = JSON.parse(JSON.stringify(paramsForm));
  paramsForm = convert(paramsForm);
  return http({
    url: '/auditchanges/toAuditManagement/saveAuditor',
    method: 'post',
    data:paramsForm
  })
}


// 产品申报选择创建列表
export function productDeclarationBatchList(paramsForm) {
  paramsForm = JSON.parse(JSON.stringify(paramsForm));
  paramsForm = convert(paramsForm);
  dateFormat(paramsForm, ["Date"], "YYYY/MM/DD HH:mm:ss");
  console.log(paramsForm,'paramsForm')
  return http({
    url: '/auditchanges/toAuditManagement/productDeclarationBatchList',
    method: 'post',
    data: paramsForm
  })
}

// 产品申报移入批次
export function addProductToDeclareBatch(paramsForm) {
  // paramsForm = convert(paramsForm);
  return http({
    url: '/auditchanges/toAuditManagement/addProductToDeclareBatch',
    method: 'post',
    data: paramsForm
  })
}

// 移出批次
export function removeBatch(paramsForm) {
  // paramsForm = convert(paramsForm);
  // console.log(paramsForm,'paramsForm');
  return http({
    url: '/auditchanges/toAuditManagement/removeBatch',
    method: 'post',
    data: paramsForm
  })
}



// 删除审核员
export function reomveAudit(paramsForm) {
  // paramsForm = convert(paramsForm);
  return http({
    url: '/auditchanges/toAuditManagement/reomveAudit',
    method: 'post',
    data: paramsForm
  })
}


// 初始化分配审核员数据
export function getcheckCountAndUserId(projectCtrlId) {
  return http({
    url: '/auditchanges/toAuditManagement/getcheckCountAndUserId',
    method: 'get',
    params: {
      'projectCtrlId': projectCtrlId
    },
  })
}


//设置状态提示
export function setUpPrompt(projectCtrlId,processType) {
  return http({
    url: '/auditchanges/toAuditManagement/setUpPrompt',
    method: 'get',
    params: {
      'projectCtrlId': projectCtrlId,
      'processType':processType
    },
  })
}


//设置状态
export function setUp(projectCtrlId,processType) {
  return http({
    url: '/auditchanges/toAuditManagement/setUp',
    method: 'get',
    params: {
      'projectCtrlId': projectCtrlId,
      'processType':processType
    },
  })
}
