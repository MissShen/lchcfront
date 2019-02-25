import http from "../../http";

export function queryList(resData, query) {
  return http({
    url: '/auditchanges/priceManage/queryList',
    method: 'get',
    params: {
      'pageNum': resData.pageNum,
      'pageSize': resData.pageSize,
      'CATALOGAREA': query.CATALOGAREA,
      'PRODUCT': query.PRODUCT,
      'DOSAGE': query.DOSAGE,
      'SPEC': query.SPEC,
      'MANUFACTURE': query.MANUFACTURE,
      'STATE': query.STATE,
    }
  })
}

//确定
export function confirmPrices(ids) {
  console.log(ids)
  return http({
    url: '/auditchanges/priceManage/confirmPrices',
    method: "post",
    data:{
      "id":JSON.stringify(ids)
    }
  })
}
// 申报数据回显
export function declareDataShow(id) {
  return http({
    url: '/auditchanges/priceManage/declareDataShow',
    method: "get",
    params:{
      "id":id
    }
  })
}

// 提交报价数据接口
export function submitDeclareData(dataForm,fileIds) {
  return http({
    url: '/auditchanges/priceManage/submitDeclareData',
    method: "put",
    data:{
      "data":JSON.stringify(dataForm),
      'fileId':JSON.stringify(fileIds)
    }
  })
}

//文件回显
export function getShowPriceFiles(id) {
  return http({
    url: '/auditchanges/priceManage/getShowPriceFiles',
    method: "get",
    params:{
      "id":id
    }
  })
}

//导出 exportPriceManage
export function exportPriceManage(query) {
  return http({
    url: '/auditchanges/priceManage/exportPriceManage',
    method: "post",
    responseType: 'blob',// 表明返回服务器返回的数据类型
    use: 'all',
    params: {
      'CATALOGAREA': query.CATALOGAREA,
      'PRODUCT': query.PRODUCT,
      'DOSAGE': query.DOSAGE,
      'SPEC': query.SPEC,
      'MANUFACTURE': query.MANUFACTURE,
      'STATE': query.STATE,
    }
  });
}
