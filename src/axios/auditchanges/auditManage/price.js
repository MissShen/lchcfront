import http from 'src/axios/http'
import {dateFormat} from 'src/axios/auditchanges/common/nestedJson'
import {clearNull} from 'src/axios/auditchanges/common/catProduct'
export function queryProjectCheckCount() {
  return http({
    url: "/auditchanges/productDeclareAudit/queryProjectCheckCount",
    method: "get",
  });
}

export function declareAudits(resData, query) {
  return http({
    url: '/auditchanges/priceAudit/declareAudits',
    method: "get",
    params: {
      'pageNum': resData.pageNum,
      'pageSize': resData.pageSize,
      'productName': query.name,
      'dosage': query.dosage,
      'specification': query.specification,
      'manufacture': query.manufacture,
      'auditStep': query.auditStep
    }
  });
}

export function declareExport(query) {
  return http({
    url: '/auditchanges/priceAudit/declareExport',
    method: "post",
    responseType: 'blob',// 表明返回服务器返回的数据类型
    use: 'all',
    params: {
      'productName': query.name,
      'dosage': query.dosage,
      'specification': query.specification,
      'manufacture': query.manufacture,
      'auditStep': query.auditStep
    }
  });
}

export function changesAudits(resData, query) {
  return http({
    url: '/auditchanges/priceAudit/changesAudits',
    method: "get",
    params: {
      'pageNum': resData.pageNum,
      'pageSize': resData.pageSize,
      'productName': query.name,
      'dosage': query.dosage,
      'specification': query.specification,
      'manufacture': query.manufacture,
      'auditStep': query.auditStep
    }
  });
}

export function changeExport(query) {
  return http({
    url: '/auditchanges/priceAudit/changeExport',
    method: "post",
    responseType: 'blob',// 表明返回服务器返回的数据类型
    use: 'all',
    params: {
      'productName': query.name,
      'dosage': query.dosage,
      'specification': query.specification,
      'manufacture': query.manufacture,
      'auditStep': query.auditStep
    }
  });
}

export function audit(foreignId,checkType,checkMark,checkResult,explain,dataForm) {
  dateFormat(dataForm,['Date'],'YYYY-MM-DD')
  clearNull(dataForm);
  return http({
    url: '/auditchanges/priceAudit/audit',
    method: "post",
    data: {
      'foreignId': foreignId,
      'checkType':checkType,
      'checkMark':checkMark,
      'checkResult':checkResult,
     ' explain':explain,
      'dataForm':JSON.stringify(dataForm)
    }
  })
}

export function upAudit(foreignId,checkType,checkMark,checkResult,explain,dataForm) {
  dateFormat(dataForm,['Date'],'YYYY-MM-DD')
  clearNull(dataForm);
  return http({
    url: '/auditchanges/priceAudit/upAudit',
    method: "post",
    data: {
      'foreignId': foreignId,
      'checkType':checkType,
      'checkMark':checkMark,
      'checkResult':checkResult,
      ' explain':explain,
      'dataForm':JSON.stringify(dataForm)
    }
  })
}

export function getCheckProductRecordings(foreignId,checkType) {
  return http({
    url: "/auditchanges/priceAudit/getCheckProductRecordings",
    method: "get",
    params: {
      'foreignId':foreignId,
      'checkType':checkType
    }
  });
}

export function getProductPrices(productId) {
  return http({
    url: "/auditchanges/priceAudit/getProductPrices",
    method: "get",
    data: {
      'productId':productId
    }
  });
}

export function uploadExcel(files) {
  return http({
    url: '/auditchanges/priceAudit/uploadExcel',
    method: 'post',
    data: files,
    type:'json'
  })
}

export function queryAuditData(id){
  return http({
    url: "/auditchanges/priceAudit/queryAuditData",
    method: "get",
    params: {
      'id':id
    }
  });
}

export function queryQuestionField(id){
  return http({
    url: "/auditchanges/priceAudit/queryQuestionField",
    method: "get",
    params: {
      'id':id
    }
  });
}

export function queryChangeAuditData(id){
  return http({
    url: "/auditchanges/priceAudit/queryChangeAuditData",
    method: "get",
    params: {
      'id':id
    }
  });
}

export function queryChangeQuestionField(id){
  return http({
    url: "/auditchanges/priceAudit/queryChangeQuestionField",
    method: "get",
    params: {
      'id':id
    }
  });
}
