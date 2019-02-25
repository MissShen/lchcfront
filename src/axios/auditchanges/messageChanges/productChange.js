import http from 'src/axios/http'
import { clearNull,dateFormatAndJydate } from "src/axios/auditchanges/common/catProduct";

export function queryList(resData,query) {
  return http({
    url: "/auditchanges/productChange/queryList",
    method: "get",
    params:{
      "pageSize":resData.pageSize,
      "pageNum":resData.pageNum,
      "PRODUCT":query.PRODUCT,
      "DOSAGE":query.DOSAGE,
      "SPEC":query.SPEC,
      "MANUFACTURE":query.MANUFACTURE,
      "ID":query.ID,
      "STATE":query.STATE
    }
  });
}

export function queryShowProductList(resData,query) {
  return http({
    url: "/auditchanges/productChange/queryShowProductList",
    method: "get",
    params:{
      "pageSize":resData.pageSize,
      "pageNum":resData.pageNum,
      "PRODUCT":query.PRODUCT,
      "DOSAGE":query.DOSAGE,
      "SPEC":query.SPEC,
      "MANUFACTURE":query.MANUFACTURE,
    }
  });
}

export function submitChange(id) {
  return http({
    url: "/auditchanges/productChange/submitChange",
    method: "put",
    params:{"ids":id}
  });
}

export function rollbackChange(id) {
  // return http({
  //   url: "/auditchanges/productChange/rollbackChange",
  //   method: "put",
  //   params:{"id":id}
  // });
  return http({
    url: "/auditchanges/toAuditManagement/removeProductChange",
    method: "post",
    params:{"dataIdList":id}
  });
}

export function deleteProductChange(id) {
  return http({
    url: "/auditchanges/productChange/deleteProductChange",
    method: "delete",
    params:{"id":id}
  });
}

export function findProductById(id) {
  return http({
    url: "/auditchanges/productChange/findProductById",
    method: "get",
    params:{"id":id}
  });
}

export function queryProductChange(id) {
  return http({
    url: "/auditchanges/productChange/queryProductChange",
    method: "get",
    params:{"id":id}
  });
}

export function queryProductChangeAfter(id) {
  return http({
    url: "/auditchanges/productChange/queryProductChangeAfter",
    method: "get",
    params:{"id":id}
  });
}

export function insertProductChange(dataForm,changeFileForm,att,attFile) {
  dateFormatAndJydate(dataForm);
  clearNull(dataForm)
  return http({
    url: "/auditchanges/productChange/insertProductChange",
    method: "post",
    data:{dataStr:JSON.stringify(dataForm),fileStr:JSON.stringify(changeFileForm),att:JSON.stringify(att),attFileJson:JSON.stringify(attFile)}
  });
}

export function updateProductChange(dataForm,changeFileForm,att,attFile) {
  dateFormatAndJydate(dataForm)
  clearNull(dataForm)
  return http({
    url: "/auditchanges/productChange/updateProductChange",
    method: "put",
    data: {
      dataStr: JSON.stringify(dataForm),
      fileStr: JSON.stringify(changeFileForm),
      att: JSON.stringify(att),
      attFileJson: JSON.stringify(attFile)
    }
  })
}

export function findChangeFiles(id) {
  return http({
    url: "/auditchanges/productChange/findChangeFiles",
    method: "get",
    params:{"id":id}
  });
}

export function findAttachedFiles(id) {
  return http({
    url: "/auditchanges/productChange/findAttachedFile",
    method: "get",
    params:{"id":id}
  });
}

export function findChangeAttachedFile(id) {
  return http({
    url: "/auditchanges/productChange/findChangeAttachedFile",
    method: "get",
    params:{"id":id}
  });
}

export function checkProductChange(id){
  return http({
    url:"/auditchanges/productChange/checkProductChange",
    method: "get",
    params:{"id":id}
  })
}

export function queryShowGmp(id){
  return http({
    url:"/auditchanges/productChange/queryShowGmp",
    method: "get",
    params:{"id":id}
  })
}


