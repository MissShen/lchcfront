import http from 'src/axios/http'



export function queryList (resData,query) {
  return http({
    url: '/auditchanges/priceAffirm/list',
    method: 'get',
    params: {'pageNum': resData.pageNum,
             'pageSize': resData.pageSize,
             'product': query.product,
             'dosage': query.dosage,
             'spec': query.spec,
             'manufacture': query.manufacture
    }
  })
}

export function affirm (id) {
  return http({
    url: '/auditchanges/priceAffirm/affirm',
    method: 'post',
    data: {'id': id}
  })
}

export function refuse (id) {
  return http({
    url: '/auditchanges/priceAffirm/refuse',
    method: 'post',
    data: {'id': id}
  })
}
