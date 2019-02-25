import http from 'src/axios/http'

// 价格申报澄清列表
export function priceDeclareList(resData,query) {
  return http({
    url: "/auditchanges/priceClarify/declareList",
    method: "get",
    params: {
      productName: query.productName,
      dosage: query.dosage,
      specification: query.specification,
      manufacture: query.manufacture,
      requestCode: query.requestCode,
      status: query.status,
      pageSize:resData.pageSize,
      pageNum:resData.pageNum,
    }
  });
}


// 价格变更澄清列表
export function priceChangeList(resData,query) {
  return http({
    url: "/auditchanges/priceClarify/changeList",
    method: "get",
    params: {
      productName: query.productName,
      dosage: query.dosage,
      specification: query.specification,
      manufacture: query.manufacture,
      requestCode: query.requestCode,
      status: query.status,
      pageSize:resData.pageSize,
      pageNum:resData.pageNum,
    }
  });
}


export function selectQueryFieldById(id) {
  return http({
    url: "/auditchanges/priceClarify/selectQueryFieldById",
    method: "get",
    params: {
      'id':id
    }
  });
}

export function selectChangeQueryFieldById(id) {
  return http({
    url: "/auditchanges/priceClarify/selectChangeQueryFieldById",
    method: "get",
    params: {
      'id':id
    }
  });
}
