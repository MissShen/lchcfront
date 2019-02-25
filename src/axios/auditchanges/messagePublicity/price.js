import http from "../../http";
import {dateFormat,filter,convert} from 'src/axios/auditchanges/common/nestedJson'
// 信息公示=》价格信息公示
export function findProjectProducts(resData, query) {
  return http({
    url: '/auditchanges/price/findProjectProducts',
    method: 'get',
    params: {
      'pageNum': resData.pageNum,
      'pageSize': resData.pageSize,
      'productName': query.name,
      'dosage': query.dosage,
      'specification': query.specification,
      'manufacture': query.manufacture
    }
  })
}

// 信息公示=》变更价格信息公示
export function findUpProjectProducts(resData, query) {
  return http({
    url: '/auditchanges/price/findUpProjectProducts',
    method: 'get',
    params: {
      'pageNum': resData.pageNum,
      'pageSize': resData.pageSize,
      'productName': query.name,
      'dosage': query.dosage,
      'specification': query.specification,
      'manufacture': query.manufacture
    }
  })
}

//查询申报产品基础信息
export function findProductBasic(projectProdectId) {
  return http({
    url: '/auditchanges/price/findProductBasic',
    method: 'get',
    params: {
      'projectProdectId': projectProdectId
    }
  })
}

//查询挂网产品基础信息
export function findShowProductBasic(productId){
  return http({
    url: '/auditchanges/price/findShowProductBasic',
    method: 'get',
    params:{
      'id':productId
    }
  })
}

//查询申报价格信息
export function findProjectProductPrice(projectProdectId) {
  return http({
    url: '/auditchanges/price/findProjectProductPrice',
    method: 'get',
    params: {
      'projectProdectId': projectProdectId
    }
  })
}

//查询挂网价格信息
export function findShowPriceByProductId(projectProdectId) {
  return http({
    url: '/auditchanges/price/findShowPriceByProductId',
    method: 'get',
    params: {
      'projectProdectId': projectProdectId
    }
  })
}

//查询变更价格信息
export function findUpProjectProductById(upProductPriceId) {
  return http({
    url: '/auditchanges/price/findUpProjectProductById',
    method: 'get',
    params: {
      'upProductPriceId': upProductPriceId
    }
  })
}

//查询质疑信息

//查询质疑文件

//提交质疑
export function declareAdd(form,id,fileForm) {
  dateFormat(form,['Date'], 'YYYY-MM-DD');
  form = JSON.parse(JSON.stringify(form));
  filter(form);

  let json = {};
  json.foreignId = id;
  json.content = [];

  delete form.id;
  for(let key in form) {
    if(form[key]) {
      json.content.push({
        field:key,
        fileId: fileForm[key],
        value: form[key],
        questionTargetType: 3,//价格
        questionType: 1,
      });
    }
  }
  return http({
    url: '/auditchanges/questionTypeInfo/question',
    method: "post",
    data: convert(json)
  });
}

export function changeAdd(form,id,fileForm) {
  dateFormat(form,['Date'], 'YYYY-MM-DD');
  form = JSON.parse(JSON.stringify(form));
  filter(form);

  let json = {};
  json.foreignId = id;
  json.content = [];

  delete form.id;
  for(let key in form) {
    if(form[key]) {
      json.content.push({
        field:key,
        fileId: fileForm[key],
        value: form[key],
        questionTargetType: 3,//价格
        questionType: 2,
      });
    }
  }
  return http({
    url: '/auditchanges/questionTypeInfo/question',
    method: "post",
    data: convert(json)
  });
}
