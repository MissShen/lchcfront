import http from 'src/axios/http'
import {convert, dateFormat} from "../common/nestedJson";

// 产品举报列表
export function reportProductList(resData,paramsForm) {
  paramsForm.pageNum = resData.pageNum;
  paramsForm.pageSize = resData.pageSize;
  paramsForm = JSON.parse(JSON.stringify(paramsForm));
  paramsForm = convert(paramsForm);
  dateFormat(paramsForm, ["Date"], "YYYY/MM/DD");
  console.log(paramsForm,'paramsForm');
  return http({
    url: '/auditchanges/toAuditManagement/reportProductList',
    method: 'post',
    data:paramsForm,
  })
}


// 产品举报列表
export function reportProductAuditorList(dataType) {
  return http({
    url: '/auditchanges/toAuditManagement/reportProductAuditorList',
    method: 'get',
    params: {
      'dataType': dataType
    },
  })
}

// 添加审核员
export function addAuditor(paramsForm) {
  console.log(paramsForm,'paramsForm');
  return http({
    url: '/auditchanges/toAuditManagement/addAuditor',
    method: 'post',
    data:paramsForm,
  })
}

// 删除审核员
export function removeAuditor(paramsForm) {
  console.log(paramsForm,'paramsForm');
  return http({
    url: '/auditchanges/toAuditManagement/removeAuditor',
    method: 'post',
    data:paramsForm,
  })
}
