import http from 'src/axios/http'
import { dateFormat,convert } from 'src/axios/auditchanges/common/nestedJson'



export function queryList (resData,query) {
  return http({
    url: '/auditchanges/ProductInfoRegister/queryList',
    method: 'get',
    params: {'pageNum': resData.pageNum,
             'pageSize': resData.pageSize,
             'searchName': query.searchName,
             'searchDosageForm': query.searchDosageForm,
             'searchSpec': query.searchSpec,
             'searchOrg': query.searchOrg,
             'searchState': query.searchState
    }
  })
}

export function remove (id) {
  return http({
    url: '/auditchanges/ProductInfoRegister/delete',
    method: 'delete',
    params: {'ids': id}
  })
}

export function rollback (id) {
  return http({
    url: '/auditchanges/ProductInfoRegister/rollbackProduct',
    method: 'post',
    params: {'ids': id}
  })
}

export function submit (id) {
  return http({
    url: '/auditchanges/ProductInfoRegister/submitProduct',
    method: 'post',
    params: {'ids': id}
  })
}

export function queryProduct(id){
  return http({
    url: '/auditchanges/ProductInfoRegister/queryProduct',
    method: 'post',
    params: {'id': id}
  })
}

export function findById (id,istemp) {
  return http({
    url: '/auditchanges/ProductInfoRegister/findProduct',
    method: 'get',
    params: {'id': id,
             'istemp':istemp}
  })
}


export function queryGmpList () {
  return http({
    url: '/auditchanges/ProductInfoRegister/queryGmpList',
    method: 'get'
  })
}

export function insert (resData,fileList) {
  dateFormat(resData,['DATE'],'YYYY-MM-DD')
  return http({
    url: '/auditchanges/ProductInfoRegister/insert',
    method: 'post',
    data:{dataJson:JSON.stringify(resData),fileJson:JSON.stringify(fileList)}
  })
}

export function update (resData,fileList) {
  dateFormat(resData,['DATE'],'YYYY-MM-DD')
  return http({
    url: '/auditchanges/ProductInfoRegister/update',
    method: 'put',
    data:{dataJson:JSON.stringify(resData),fileJson:JSON.stringify(fileList)}
  })
}


export function findOrgName () {
  return http({
    url: '/auditchanges/ProductInfoRegister/findOrgName',
    method: 'get',
  })
}

export function submitQueryInfo(id,value,file) {
  let json = {};
  json.foreignId = id;
  json.content = [];
  json.content.push({
    fileId: file,
    value: value,
    questionTargetType: 2,//产品
    questionType: 0,//注册
  });
  return http({
    url: '/auditchanges/questionTypeInfo/question',
    method: "post",
    data: convert(json)
  });
}

export function findQueryInfo(id){
  return http({
    url:'/auditchanges/ProductInfoRegister/findQueryInfo',
    method:'get',
    params:{'id':id}
  })
}
