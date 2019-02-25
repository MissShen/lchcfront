import http from 'src/axios/http'
import {dateFormat} from "../common/nestedJson";



export function queryList (resData,query) {
  return http({
    url: '/auditchanges/productAffirm/list',
    method: 'get',
    params: {'pageNum': resData.pageNum,
             'pageSize': resData.pageSize,
             'PRODUCT': query.PRODUCT,
             'DOSAGE': query.DOSAGE,
             'SPEC': query.SPEC,
             'MANUFACTURE': query.MANUFACTURE
    }
  })
}

export function queryListChange (resData,query) {
  return http({
    url: '/auditchanges/productAffirm/changelist',
    method: 'get',
    params: {'pageNum': resData.pageNum,
      'pageSize': resData.pageSize,
      'PRODUCT': query.PRODUCT,
      'DOSAGE': query.DOSAGE,
      'SPEC': query.SPEC,
      'MANUFACTURE': query.MANUFACTURE
    }
  })
}

export function findProductDetailById (id) {
  return http({
    url: '/auditchanges/productAffirm/detail',
    method: 'get',
    params: {'id': id}
  })
}

export function selectQueryFieldById (id) {
  return http({
    url: '/auditchanges/productAffirm/selectQueryFieldById',
    method: 'get',
    params: {'id': id}
  })
}

export function updaterefuse(id) {
  return http({
    url: '/auditchanges/productAffirm/updatestate',
    method: 'put',
    data: {'id': id}
  })
}

export function insert(id) {
  return http({
    url: '/auditchanges/productAffirm/addProduct',
    method: "Post",
    data:{"ID":id}
  })
}


export function insertChange(id,upProductId) {
  return http({
    url: '/auditchanges/productAffirm/insertChangeProductBasic',
    method: "Post",
    data:{"ID":id,
    "UPID":upProductId}
  })
}


export function changerefuse(id) {
  return http({
    url: '/auditchanges/productAffirm/changerefuse',
    method: 'put',
    data: {'id': id}
  })
}
