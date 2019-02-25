import http from 'src/axios/http'
import {clearNull,dateFormatAndJydate} from 'src/axios/auditchanges/common/catProduct'
export function queryList(resData,query) {
  return http({
    url: "/auditchanges/productDeclareAudit/queryList",
    method: "get",
    params:{
      "pageSize":resData.pageSize,
      "pageNum":resData.pageNum,
      "PRODUCT":query.PRODUCT,
      "DOSAGE":query.DOSAGE,
      "SPEC":query.SPEC,
      "MANUFACTURE":query.MANUFACTURE,
      "CHECKSTATE":query.CHECKSTATE
    }
  });
}

export function queryProjectCheckCount() {
  return http({
    url: "/auditchanges/productDeclareAudit/queryProjectCheckCount",
    method: "get"
  });
}

export function findProductById(id) {
  return http({
    url: "/auditchanges/productDeclareAudit/queryDeclareData",
    method: "get",
    params:{
      "id":id
    }
  });
}

export function queryAuditData(id) {
  return http({
    url: "/auditchanges/productDeclareAudit/queryAuditData",
    method: "get",
    params:{
      "id":id
    }
  });
}

export function findAuditData(id) {
  return http({
    url: "/auditchanges/productDeclareAudit/findAuditData",
    method: "get",
    params:{
      "id":id
    }
  });
}

export function queryQuestionField(id) {
  return http({
    url: "/auditchanges/productDeclareAudit/queryQuestionField",
    method: "get",
    params:{
      "id":id
    }
  });
}


export function queryQuestionInfoByField(id,field) {
  return http({
    url: "/auditchanges/productDeclareAudit/queryQuestionInfoByField",
    method: "get",
    params:{
      "ID":id,
      "FIELD":field
    }
  });
}

export function queryClarifyInfoByField(id,field) {
  return http({
    url: "/auditchanges/productDeclareAudit/queryClarifyInfoByField",
    method: "get",
    params:{
      "ID":id,
      "FIELD":field
    }
  });
}

export function updateReply(dataForm) {
  return http({
    url: "/auditchanges/productDeclareAudit/updateReply",
    method: "put",
    params:{
      "ID":dataForm.ID,
      "REPLYCONTENT":dataForm.REPLYCONTENT,
      "TABLE":dataForm.TABLE
    }
  });
}

export function updateQuestionsReply(dataForm) {
  return http({
    url: "/auditchanges/productDeclareAudit/updateQuestionsReply",
    method: "put",
    params:{
      "ID":dataForm.ID,
      "REPLYCONTENT":dataForm.REPLYCONTENT,
      "TABLE":dataForm.TABLE,
      "FIELD":dataForm.FIELD
    }
  });
}

export function queryReply(id) {
  return http({
    url: "/auditchanges/productDeclareAudit/queryReply",
    method: "get",
    params:{
      "id":id
    }
  });
}


export function submitData(dataForm) {
  dateFormatAndJydate(dataForm)
  clearNull(dataForm);
  return http({
    url: "/auditchanges/productDeclareAudit/submitData",
    method: "post",
    data: dataForm
  });
}

export function queryCheckRecording(id,checkType) {
  return http({
    url: "/auditchanges/productDeclareAudit/queryCheckRecording",
    method: "get",
    params:{
      "ID":id,
      "CHECKTYPE":checkType
    }
  });
}

export function checkData(flagForm,dataForm){
  //全部已回复才能提交
  let key = JSON.parse(JSON.stringify(flagForm));
  for(let i in key){
    if(flagForm[i] != '0') {
      return 1;
    }
  }
  //审核结果必选
  if(dataForm.AUDITSTATE==''||dataForm.AUDITSTATE==undefined){
    return 2;
  }
}

export function queryPriceLibrary(id,changeFlag){
  return http({
    url: "/auditchanges/priceAudit/getProductPrices",
    method: "get",
    params:{
      "productId":id,
      "changeFlag":changeFlag
    }
  });
}
