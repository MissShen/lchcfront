import http from 'src/axios/http'
import {dateFormat} from 'src/axios/auditchanges/common/nestedJson'

/**
 * 查询申报信息
 * @returns {*}
 */
export function queryList(resData, query) {
  return http({
    url: '/auditchanges/productDeclare/queryList',
    method: "get",
    params: {
      'pageNum': resData.pageNum,
      'pageSize': resData.pageSize,
      'PRODUCT': query.searchName,
      'DOSAGE': query.searchDosageForm,
      'SPEC': query.searchSpec,
      'MANUFACTURE': query.searchOrg,
      'STATE': query.searchState
    }
  })
}

export function selectProductList(resData, query) {
  return http({
    url: '/auditchanges/productDeclare/selectProductList',
    method: "get",
    params: {
      'pageNum': resData.pageNum,
      'pageSize': resData.pageSize,
      'PRODUCT': query.searchName,
      'DOSAGE': query.searchDosageForm,
      'SPEC': query.searchSpec,
      'MANUFACTURE': query.searchOrg
    }
  })
}


export function addDeclareProductById(id) {
  return http({
    url: '/auditchanges/productDeclare/addDeclareProductById',
    method: "post",
    params: {
      'ID': id
    }
  })
}
export function findOrg() {
  return http({
    url: '/auditchanges/productDeclare/findOrg',
    method: "get",
  })
}

export function checkProduct(dataForm) {
  return http({
    url: '/auditchanges/productDeclare/addProductCheckCode',
    method: "get",
    params: {
      "CDID": dataForm.CDID,
      "ORGID": dataForm.ORGID
    }
  })
}

export function selectDrug(resData, query) {
  return http({
    url: '/auditchanges/productDeclare/queryDrug',
    method: "get",
    params: {
      "pageSize": resData.pageSize,
      "pageNum": resData.pageNum,
      'DRUG': query.DRUG,
      'DOSAGE': query.DOSAGE,
      'SPEC': query.SPEC,
      'WRAP': query.WRAP
    }
  })
}

export function selectMetric(resData, query) {
  return http({
    url: '/auditchanges/productDeclare/queryMetric',
    method: "get",
    params: {
      "pageSize": resData.pageSize,
      "pageNum": resData.pageNum,
      "NAME": query.name
    }
  })
}

export function selectOrg(resData, query) {
  return http({
    url: '/auditchanges/productDeclare/queryOrg',
    method: "get",
    params: {
      "pageSize": resData.pageSize,
      "pageNum": resData.pageNum,
      "NAME": query.NAME,
      "ABBR": query.ABBR,
      "CREDIT": query.CREDIT,
      "ORGANIZE": query.ORGANIZE
    }
  })
}

export function findProductById(id) {
  return http({
    url: '/auditchanges/productDeclare/findSelectProductById',
    method: "get",
    params: {
      "id": id
    }
  })
}

export function findProductInfoById(id) {
  return http({
    url: '/auditchanges/productDeclare/findProductInfoById',
    method: "get",
    params: {
      "id": id
    }
  })
}

export function submit(ids) {
  return http({
    url: '/auditchanges/productDeclare/submitProduct',
    method: "put",
    params: {
      "ids": ids
    }
  })
}

export function rollback(id) {
  // return http({
  //   url: '/auditchanges/productDeclare/rollbackProduct',
  //   method: "put",
  //   params: {
  //     "id": id
  //   }
  // })
  return http({
    url: '/auditchanges/toAuditManagement/removeProductDeclaration',
    method: "post",
    params: {
      "dataIdList": id
    }
  })
}


export function queryDrugByDrugId(id) {
  return http({
    url: '/auditchanges/productDeclare/queryDrugByDrugId',
    method: "get",
    params: {
      "id": id
    }
  })
}

export function remove(id) {
  return http({
    url: '/auditchanges/productDeclare/delete',
    method: "Delete",
    params: {
      "ids": id
    }
  })
}

export function copy(resData, fileList, att, attFileList,thrPP) {
  dateFormat(resData, ['DATE'], 'YYYY-MM-DD');
  return http({
    url: '/auditchanges/productDeclare/copyDeclareProduct',
    method: "PUT",
    data: {
      dataJson: JSON.stringify(resData),
      fileJson: JSON.stringify(fileList),
      attJson: JSON.stringify(att),
      attFileJson: JSON.stringify(attFileList),
      priceList: JSON.stringify(thrPP)
    }
  })
}

export function update(resData, fileList, att, attFileList,thrPP) {
  dateFormat(resData, ['DATE'], 'YYYY-MM-DD')
  return http({
    url: '/auditchanges/productDeclare/updateDeclareProduct',
    method: "Put",
    data: {
      dataJson: JSON.stringify(resData),
      fileJson: JSON.stringify(fileList),
      attJson: JSON.stringify(att),
      attFileJson: JSON.stringify(attFileList),
      priceList: JSON.stringify(thrPP)
    }
  })
}


export function insert(resData, fileList, att, attFileList,thrPP) {
  dateFormat(resData, ['DATE'], 'YYYY-MM-DD')
  return http({
    url: '/auditchanges/productDeclare/addDeclareProduct',
    method: "Post",
    data: {
      dataJson: JSON.stringify(resData),
      fileJson: JSON.stringify(fileList),
      attJson: JSON.stringify(att),
      attFileJson: JSON.stringify(attFileList),
      priceList: JSON.stringify(thrPP)
    }
  })
}

export function queryPROVINCE() {
  return http({
    url: '/auditchanges/productDeclare/queryPROVINCE',
    method: "get",
  })
}


export function queryDeclareGmp(id) {
  return http({
    url: '/auditchanges/productDeclare/queryDeclareGmp',
    method: "get",
    params: {"id": id}
  })
}

export function queryGmpList(useType) {
  return http({
    url: '/auditchanges/productDeclare/queryGmp',
    method: "get",
    params: {"useType": useType}
  })
}

export function queryGmpListById(id) {
  return http({
    url: '/auditchanges/productDeclare/queryGmpById',
    method: "get",
    params: {"id": id}
  })
}

export function queryGmpListByUpId(id) {
  return http({
    url: '/auditchanges/productDeclare/queryGmpByUpId',
    method: "get",
    params: {"id": id}
  })
}


export function findAttachedFiles(id) {
  return http({
    url: '/auditchanges/productDeclare/findAttachedFiles',
    method: "get",
    params: {"id": id}
  })
}

export function findDeclareMessageByCode(code) {
  return http({
    url: '/auditchanges/productDeclare/findDeclareMessageByCode',
    method: "get",
    params: {"code": code}
  })
}

export function addFilingProductDeclare(resData, fileList, att, attFileList) {
  dateFormat(resData, ['DATE'], 'YYYY-MM-DD');
  return http({
    url: '/auditchanges/productDeclare/addFilingProductDeclare',
    method: "POST",
    data: {
      dataJson: JSON.stringify(resData),
      fileJson: JSON.stringify(fileList),
      attJson: JSON.stringify(att),
      attFileJson: JSON.stringify(attFileList)
    }
  })
}

export function checkFilingNumber(code) {
  return http({
    url: '/auditchanges/productDeclare/checkFilingNumber',
    method: "get",
    params: {"code": code}
  })
}

export function checkOrg() {
  return http({
    url: '/auditchanges/productDeclare/checkOrg',
    method: "get"
  })
}

export function checkProductDeclare(id) {
  return http({
    url: '/auditchanges/productDeclare/checkProductDeclare',
    method: "get",
    params:{'id':id}
  })
}
