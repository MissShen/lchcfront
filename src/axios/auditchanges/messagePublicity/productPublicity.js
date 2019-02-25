import http from 'src/axios/http'
import {convert, filter} from "../common/nestedJson";
import {clearMetricAndManufacture,dateFormatAndJydate} from "../common/catProduct";



export function queryList (resData,query) {
  return http({
    url: '/auditchanges/productPublicity/list',
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
    url: '/auditchanges/productPublicity/detail',
    method: 'get',
    params: {'id': id}
  })
}

export function findUpProductById (id) {
  return http({
    url: '/auditchanges/productPublicity/upProductField',
    method: 'get',
    params: {'id': id}
  })
}

export function queryListChange (resData,query) {
  return http({
    url: '/auditchanges/productPublicity/changelist',
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

export function declareAdd(form,id,fileForm) {
  clearMetricAndManufacture(form);
  dateFormatAndJydate(form);
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
        questionTargetType: 2,//产品
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

export function deleteQuestion(id){
  return http({
    url: '/auditchanges/productPublicity/deleteQuestion',
    method: "delete",
    params: {"id":id}
  })
}
export function changeAdd(form,id,fileForm) {
  clearMetricAndManufacture(form);
  dateFormatAndJydate(form)
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
        questionTargetType: 2,
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

export function selectFieldById(id) {
  return http({
    url:'/auditchanges/productPublicity/selectFieldById',
    method:'get',
    params:{'id':id}
  })
}

export function findQuestionFileById(id){
  return http({
    url:'/auditchanges/productPublicity/findQuestionFileById',
    method:'get',
    params:{'id':id}
  })
}
