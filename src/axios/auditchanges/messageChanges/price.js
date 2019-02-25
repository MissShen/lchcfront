import http from "../../http";
import {dateFormat} from "../common/nestedJson";

// 信息变更=》价格信息变更
export function findUpProductPriceChanges(resData, query) {
  return http({
    url: '/auditchanges/upProductPrice/findUpProductPriceChanges',
    method: 'get',
    params: {
      'pageNum': resData.pageNum,
      'pageSize': resData.pageSize,
      'productName': query.name,
      'dosage': query.dosage,
      'specification': query.spec,
      'manufacture': query.manufacture,
      'requestCode': query.requestCode,
      'status': query.status
    }
  })
}

// 信息变更=》价格信息变更
export function queryShowProductList(resData, query) {
  return http({
    url: '/auditchanges/upProductPrice/queryShowProductList',
    method: 'get',
    params: {
      'pageNum': resData.pageNum,
      'pageSize': resData.pageSize,
      'productName': query.productName,
      'dosage': query.dosage,
      'specification': query.specification,
      'manufacture': query.manufacture
    }
  })
}

export function submitChanges(ids) {
  return http({
    url: '/auditchanges/upProductPrice/submitChanges',
    method: "put",
    params:{
      "ids":JSON.stringify(ids)
    }
  })
}

export function revocation(id) {
  // return http({
  //   url: '/auditchanges/upProductPrice/revocation',
  //   method: "post",
  //   params:{
  //     "id":id
  //   }
  // })
  return http({
    url: '/auditchanges/toAuditManagement/removePriceChange',
    method: "post",
    params:{
      "dataIdList":id
    }
  })
}

export function deleteById(id) {
  return http({
    url: '/auditchanges/upProductPrice/delete',
    method: "delete",
    params:{
      "id":id
    }
  })
}

//查询提交的变更后数据
export function findById(id) {
  return http({
    url: '/auditchanges/upProductPrice/findById',
    method: "get",
    params:{
      "id":id
    }
  })
}

//查询变更前的价格数据
export function findFinalBasicPrice(id) {
  return http({
    url: '/auditchanges/upProductPrice/findFinalBasicPrice',
    method: "get",
    params:{
      "id":id
    }
  })
}


//查询挂网产品数据
export function findShowProduct(id) {
  return http({
    url: '/auditchanges/upProductPrice/findShowProduct',
    method: "get",
    params:{
      "id":id
    }
  })
}

//查询挂网产品数据
export function submitData(dataForm) {
  return http({
    url: '/auditchanges/upProductPrice/insert',
    method: "post",
    data:{
      'dataForm':JSON.stringify(dataForm)
    }
    // data:{
    //   "id":dataForm.id,
    //   "priceType":dataForm.priceType,
    //   "yearId":dataForm.yearId,
    //   "projectName":dataForm.projectName,
    //   "inPrice":dataForm.inPrice,
    //   "provinceId":dataForm.provinceId,
    //   "executionDate":dataForm.executionDate,
    //   "remark":dataForm.remark,
    //   "computationalMethod":dataForm.computationalMethod,
    //   "representativePackaging":dataForm.representativePackaging,
    //   "representativePrice":dataForm.representativePrice,
    //   "calculatePrice":dataForm.calculatePrice,
    //   "projectProductId":dataForm.projectProductId,
    //   "representativeSpec":dataForm.representativeSpec
    // }
  })
}
