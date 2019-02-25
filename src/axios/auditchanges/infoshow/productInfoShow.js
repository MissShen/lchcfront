import http from 'src/axios/http'



export function queryList (resData,query) {
  return http({
    url: '/auditchanges/productInfoShow/list',
    method: 'get',
    params: {'pageNum': resData.pageNum,
             'pageSize': resData.pageSize,
             'productName': query.productName,
             'doseageFormCode': query.doseageFormCode,
             'spec': query.spec,
             'manufactureName': query.manufactureName
    }
  })
}

export function findProductDetailById (id) {
  return http({
    url: '/auditchanges/productInfoShow/findProductdetail',
    method: 'get',
    params: {'id': id}
  })
}

