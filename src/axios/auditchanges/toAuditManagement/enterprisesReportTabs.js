import http from 'src/axios/http'
import {convert, dateFormat} from "../common/nestedJson";

// 企业举报列表
export function reportEnterprisesList(resData,paramsForm) {
  paramsForm.pageNum = resData.pageNum;
  paramsForm.pageSize = resData.pageSize;
  paramsForm = JSON.parse(JSON.stringify(paramsForm));
  paramsForm = convert(paramsForm);
  dateFormat(paramsForm, ["Date"], "YYYY/MM/DD");
  console.log(paramsForm,'paramsForm');
  return http({
    url: '/auditchanges/toAuditManagement/reportEnterprisesList',
    method: 'post',
    data:paramsForm,
  })
}

// 企业举报列表
export function reportEnterprisesAuditorList(dataType) {
  return http({
    url: '/auditchanges/toAuditManagement/reportEnterprisesAuditorList',
    method: 'get',
    params: {
      'dataType': dataType
    },
  })
}

