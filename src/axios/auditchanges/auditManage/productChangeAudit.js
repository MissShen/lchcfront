import http from 'src/axios/http'
import {clearNull} from 'src/axios/auditchanges/common/catProduct'
import {dateFormat} from 'src/axios/auditchanges/common/nestedJson'
export function queryList(resData,query) {
  return http({
    url: "/auditchanges/productChangeAudit/queryList",
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
export function submitData(dataForm) {
  dateFormat(dataForm,['DATE'],'YYYY-MM-DD');
  clearNull(dataForm);
  if(dataForm.JYYJ !=undefined){
    if(dataForm.JYYJ){
      dataForm.JYYJ = '1'
    }else{
      dataForm.JYYJ = '0'
    }
  }
  return http({
    url: "/auditchanges/productChangeAudit/submitData",
    method: "post",
    data: dataForm
  });
}
