import http from 'src/axios/http'

export function queryList (resData,query) {
  return http({
    url: '/auditchanges/projectBiddingcatalog/list',
    method: 'get',
    params: {'pageNum': resData.pageNum,
      'pageSize': resData.pageSize,
      'projectBiddingCatalog.catProjectId': query.catProjectId,
      'projectBiddingCatalog.ydProjectBiddingCategoryId': query.ydProjectBiddingCategoryId,
      'projectBiddingCatalog.commonName': query.commonName,
      'projectBiddingCatalog.dosageFormGroupId': query.dosageFormGroupName,
      'projectBiddingCatalog.specGroup': query.specGroup
    }
  })
}

export function projectList () {
  return http({
    url: '/auditchanges/projectBiddingcatalog/projectList',
    method: 'get',
  })
}


export function categoryList () {
  return http({
    url: '/auditchanges/projectBiddingcatalog/categoryList',
    method: 'get',
  })
}

export function dosageList () {
  return http({
    url: '/auditchanges/projectBiddingcatalog/dosageList',
    method: 'get',
  })
}

export function drugList (resData) {
  return http({
    url: '/auditchanges/projectBiddingcatalog/drugList',
    method: 'get',
    params:{
      pageSize:resData.pageSize
    }
  })
}

export function insert(dataForm) {
  return http({
    url: '/auditchanges/projectBiddingcatalog/saveCatalog',
    method: 'post',
    params: {
      'catProjectId':dataForm.catProjectId,
      'finalCode':dataForm.finalCode,
      'ydProjectBiddingCategoryId':dataForm.ydProjectBiddingCategoryId,
      'catDrugId':dataForm.catDrugId,
      'dosageFormGroupId':dataForm.dosageFormGroupId,
      'specGroup':dataForm.specGroup,
      'remark':dataForm.remark
    }
  })
}

export function update(dataForm) {
  return http({
    url: '/auditchanges/projectBiddingcatalog/updateCatalog',
    method: 'put',
    params: {
      'catProjectId':dataForm.catProjectId,
      'id':dataForm.id,
      'finalCode':dataForm.finalCode,
      'ydProjectBiddingCategoryId':dataForm.ydProjectBiddingCategoryId,
      'catDrugId':dataForm.catDrugId,
      'dosageFormGroupId':dataForm.dosageFormGroupId,
      'specGroup':dataForm.specGroup,
      'remark':dataForm.remark
    }
  })
}

export function findById (id) {
  return http({
    url: '/auditchanges/projectBiddingcatalog/findCatalogById',
    method: 'get',
    params:{
      'id':id
    }
  })
}

export function remove(id){
  return http({
    url: '/auditchanges/projectBiddingcatalog/deleteCatalogById',
    method: 'delete',
    params: {
      'id':id
    }
  })
}
