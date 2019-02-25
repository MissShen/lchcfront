import http from 'src/axios/http'
import moment from 'moment'

export function list(query, resData) {
  return http({
    url: '/auditchanges/productDeclareConfig/queryList',
    method: 'get',
    params: {
      PRODUCT_NAME: query.PRODUCT_NAME,
      DOSAGE_NAME: query.DOSAGE_NAME,
      SPEC: query.SPEC,
      ORG_NAME: query.ORG_NAME,
      BEGIN_DATE: query.BEGIN_DATE == undefined ? '' : moment(query.BEGIN_DATE).format("YYYY-MM-DD"),
      END_DATE: query.END_DATE == undefined ? '' : moment(query.END_DATE).format("YYYY-MM-DD"),
      STATE: query.STATE,
      pageNum: resData.pageNum,
      pageSize: resData.pageSize,
      orderBy:query.orderBy
    }
  })
}

export function updateAllStatus(state) {
  return http({
    url: '/auditchanges/productDeclareConfig/updateAllStatus',
    method: 'post',
    params: {
      state: state
    }
  })
}

export function updateStatusByIds(ids, state) {
  return http({
    url: '/auditchanges/productDeclareConfig/updateStatusByIds',
    method: 'post',
    params: {
      ids: ids,
      state: state
    }
  })
}

export function declareAll() {
  return http({
    url: '/auditchanges/productDeclareConfig/declareAll',
    method: 'post',
    params: {}
  })
}

