import http from 'src/axios/http'
import moment from 'moment'


export function list(query, resData) {
  return http({
    url: '/auditchanges/orgDeclareConfig/queryOrg',
    method: 'get',
    params: {
      NAME: query.NAME,
      CREDITCODE: query.CREDITCODE,
      ORGANIZECODE: query.ORGANIZECODE,
      BEGINDATE: query.BEGINDATE == undefined ? '' : moment(query.BEGINDATE).format("YYYY-MM-DD"),
      ENDDATE: query.ENDDATE == undefined ? '' : moment(query.ENDDATE).format("YYYY-MM-DD"),
      STATE: query.STATE,
      pageNum: resData.pageNum,
      pageSize: resData.pageSize,
      orderBy: query.orderBy
    }
  })
}

export function updateAllStatus(state) {
  return http({
    url: '/auditchanges/orgDeclareConfig/updateAllStatus',
    method: 'post',
    params: {
      state: state
    }
  })
}

export function updateStatusByIds(ids, state) {
  return http({
    url: '/auditchanges/orgDeclareConfig/updateStatusByIds',
    method: 'post',
    params: {
      ids: ids,
      state: state
    }
  })
}

export function declareAll() {
  return http({
    url: '/auditchanges/orgDeclareConfig/declareAll',
    method: 'post',
    params: {}
  })
}

