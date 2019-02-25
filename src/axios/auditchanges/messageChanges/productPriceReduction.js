import http from 'src/axios/http'

export function queryList(resData,reqData) {
  return http({
    url:'/auditchanges/productPriceReduction/list',
    method:'get',
    params:{
      'pageNum': resData.pageNum,
      'pageSize': resData.pageSize,
      'id':reqData.id,
      'startDate':reqData.startDate,
      'endDate':reqData.endDate,
    }
  })
}

export function queryProductList(resData,reqData) {
  return http({
    url:'/auditchanges/productPriceReduction/queryProductList',
    method:'get',
    params:{
      'pageNum': resData.pageNum,
      'pageSize': resData.pageSize,
      'name':reqData.name,
    }
  })
}

export function getProductByProductId(reqData) {
  console.log(reqData)
  return http({
    url:'/auditchanges/productPriceReduction/getProductByProductId',
    method:'get',
    params:{
      'productId':reqData
    }
  })
}

export function findProductDetailsById(reqData) {
  console.log(reqData)
  return http({
    url:'/auditchanges/productPriceReduction/findProductDetailsById',
    method:'get',
    params:{
      'id':reqData
    }
  })
}

export function insertPriceDown(reqData) {
  console.log(reqData)
  return http({
    url:'/auditchanges/productPriceReduction/insertPriceDown',
    method:'post',
    data:reqData
  })
}

export function submitProduct(reqData) {
  console.log(reqData)
  return http({
    url:'/auditchanges/productPriceReduction/submitProduct',
    method:'post',
    params:{
      'id':reqData
    }
  })
}

export function delProduct(reqData) {
  console.log(reqData)
  return http({
    url:'/auditchanges/productPriceReduction/delProduct',
    method:'delete',
    params:{
      'id':reqData
    }
  })
}
