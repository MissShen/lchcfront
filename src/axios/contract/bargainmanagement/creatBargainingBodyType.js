import http from 'src/axios/http'

//  创建议价主体
export function queryBargainingBodyList (resData, query) {
  return http({
    url: 'contract/bargainingBody/queryBargainingBodyList',
    method: 'get',
    params: {
      'pageNum': resData.pageNum,
      'pageSize': resData.pageSize,
      'name':query.name,
      "orderBy" : resData.orderBy
    }
  })
}

//  新增保存
export function insertBargainingBodyHttp (name) {
  return http({
    url: 'contract/bargainingBody/insertBargainingBody',
    method: 'post',
    params: {'name': name}
  })
}

//  修改保存
export function updateBargainingBodyHttp (name,id) {
  return http({
    url: 'contract/bargainingBody/updateBargainingBody',
    method: 'post',
    params: {'name': name,'id':id}
  })
}


//议价主体批量删除
export function deleteBatchBargainingBodyHttp (ids) {
  return http({
    url: 'contract/bargainingBody/deleteBargainingBody',
    method: 'delete',
    params: {'ids': ids.toString()}
  })
}
//可选医院列表
export function canChooseHttp (objId,tab,canChooseData) {
  return http({
    url: 'contract/bargainingBody/queryCanChoose',
    method: 'get',
    params: {
      'objId': objId,
      'hosName':tab.hosName,
      'pageNum': canChooseData.pageNum,
      'pageSize': canChooseData.pageSize,
      "orderBy" : canChooseData.orderBy
    }
  })
}
//已选医院列表
export function readChooseHttp (objId,tab,readChooseData) {
  return http({
    url: 'contract/bargainingBody/queryReadChoose',
    method: 'get',
    params: {
      'objId': objId,
      'hosName':tab.hosName,
      'pageNum': readChooseData.pageNum,
      'pageSize': readChooseData.pageSize,
      "orderBy" : readChooseData.orderBy
    }
  })
}

//添加医院
export function insertChooseHttp(objId,hosId){
  return http({
    url:'contract/bargainingBody/insertChoose',
    method: 'post',
    params: {'objId': objId,'hosId': hosId.toString()}
  })
}


//移除选择医院
export function deleteChooseHttp (ids) {
  return http({
    url:'contract/bargainingBody/deleteChoose',
    method: 'delete',
    params: {'ids': ids.toString()}
  })
}
