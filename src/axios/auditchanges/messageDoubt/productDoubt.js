import http from 'src/axios/http'



export function queryList (resData,query) {
  return http({
    url: '/auditchanges/productDoubt/list',
    method: 'get',
    params: {'pageNum': resData.pageNum,
      'pageSize': resData.pageSize,
      'PRODUCT': query.PRODUCT,
      'DOSAGE': query.DOSAGE,
      'SPEC': query.SPEC,
      'MANUFACTURE': query.MANUFACTURE,
      'STATE':query.STATE
    }
  })
}

export function queryListChange (resData,query) {
  return http({
    url: '/auditchanges/productDoubt/changelist',
    method: 'get',
    params: {'pageNum': resData.pageNum,
      'pageSize': resData.pageSize,
      'PRODUCT': query.PRODUCT,
      'DOSAGE': query.DOSAGE,
      'SPEC': query.SPEC,
      'MANUFACTURE': query.MANUFACTURE,
      'STATE':query.STATE
    }
  })
}

export function findDoubtById (id) {
  return http({
    url: '/auditchanges/productDoubt/doubtDetail',
    method: 'get',
    params: {'id': id}
  })
}

export function findProductDetailById (id) {
  return http({
    url: '/auditchanges/productDoubt/detail',
    method: 'get',
    params: {'id': id}
  })
}

export function findValueByField (upProductId,field) {
  return http({
    url: '/auditchanges/productDoubt/findValueByField',
    method:'get',
    params:{"id":upProductId,
            "field":field}
  })
}
