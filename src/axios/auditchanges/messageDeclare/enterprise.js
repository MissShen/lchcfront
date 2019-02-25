import http from 'src/axios/http'
import { dateFormat } from 'src/axios/auditchanges/common/nestedJson'
import moment from 'moment'

/**
 * 查询申报信息
 * @returns {*}
 */
export function query() {
  return http({
    url: '/auditchanges/enterpriseDeclare/query',
    method: "get",
  })
}

export function save(form) {
  form = JSON.parse(JSON.stringify(form));
  dateFormat(form, ['DATE','EXPIRE_S','EXPIRE_E'], 'YYYY-MM-DD')

  form.annex.forEach(x => {
    x.options.forEach(y => {
      if(y.type == "3") {
        y.value = moment(y.value).format("YYYY-MM-DD");
      }
      if(y.type == "5") {
        y.value = JSON.stringify(y.value);
      }
    });
  });

  return http({
    url: '/auditchanges/enterpriseDeclare/save',
    method: "post",
    data: {
      form: JSON.stringify(form)
    }
  });
}

export function revoke(id) {
  return http({
    url: '/auditchanges/toAuditManagement/removeEnterprisesToDeclar',
    method: "get",
    params: {
      dataIdList: id
    }
  });
}
