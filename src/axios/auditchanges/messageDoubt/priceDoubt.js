import http from 'src/axios/http'



export function findProjectProductPrices (resData,query) {
  return http({
    url: '/auditchanges/priceQuestion/findProjectProductPrices',
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
    url: '/auditchanges/priceQuestion/changelist',
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


export function findProductDetailById (id) {
  return http({
    url: '/auditchanges/priceQuestion/detail',
    method: 'get',
    params: {'id': id}
  })
}

export function findChangeValue (upProductId) {
  return http({
    url: '/auditchanges/priceDoubt/findChangeValue',
    method:'get',
    params:{"id":upProductId}
  })
}
