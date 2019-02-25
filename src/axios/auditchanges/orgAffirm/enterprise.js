import http from 'src/axios/http'
import { dateFormat } from "../common/nestedJson";

/**
 * 申报详细信息
 * @param id
 * @returns {*}
 */
export function declare() {
  return http({
    url: '/auditchanges/enterpriseAffirm/declare',
    method: "get",
  });
}

export function audit(foreign_id) {
  return http({
    url: '/auditchanges/enterpriseAffirm/audit',
    method: "get",
    params: {
      id: foreign_id,
    }
  })
}

export function affirm(id, changeId, state, json) {
  dateFormat(json, ['DATE', "EXPIRE_S", "EXPIRE_E"])
  return http({
    url: "/auditchanges/enterpriseAffirm/affirm",
    method: "post",
    data: {
      ID: id,
      CHANGE_ID: changeId,
      STATE: state,
      json: JSON.stringify(json),
    }
  });
}

export function changeList(resData, query) {
  return http({
    url: "/auditchanges/enterpriseAffirm/changeList",
    method: "get",
    params: Object.assign(query, resData),
  })
}

/**
 * 变更详细信息
 * @param id
 * @returns {*}
 */
export function finalOrg(id) {
  return http({
    url: '/auditchanges/enterpriseAffirm/finalOrg',
    method: "get",
    params: {
      id: id
    }
  });
}

/**
 * 变更后信息
 * @param id
 * @returns {*}
 */
export function queryKeyValue(id) {
  return http({
    url: '/auditchanges/enterpriseAffirm/queryKeyValue',
    method: "get",
    params: {
      ID: id
    }
  });
}
