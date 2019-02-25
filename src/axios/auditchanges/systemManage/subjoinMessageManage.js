import http from 'src/axios/http'

//获取项目附加信息列表
export function subjoinmessagelist (resData, queryData) {
  return http({
    url: '/auditchanges/projectSubjoinMessage/list',
    method: 'get',
    params: {
      'pageNum': resData.pageNum,
      'pageSize': resData.pageSize,
      'attachedType':queryData.attachedType,
      'proId':queryData.proId,
      'dicName':queryData.dicName
    }
  })
}

//添加项目附加信息
export function AddSubjoinMessage(addData, dataList) {
  console.log(addData);
  console.log(JSON.stringify(dataList))
  return http({
    url:'/auditchanges/projectSubjoinMessage/insert',
    method:'post',
    params:{
      'dicName':addData.dicName,
      'catProjectId':addData.catProjectId,
      'attachedType':addData.attachedType,
      'json':JSON.stringify(dataList)
    }
  })
}

export function updateSubjoinMessage(addData, dataList) {
  console.log(addData);
  return http({
    url:'/auditchanges/projectSubjoinMessage/update',
    method:'post',
    params:{
      'id':addData.id,
      'dicName':addData.dicName,
      'catProjectId':addData.catProjectId,
      'attachedType':addData.attachedType,
      'json':JSON.stringify(dataList)
    }
  })
}

//项目列表（下拉框用）
export function proList() {
  return http({
    url: '/auditchanges/projectSubjoinMessage/getProjectOption',
    method: 'get'
  })
}

//图片类型列表
export function imageTypeList(reqData) {
  console.log(reqData)
  return http({
    url: '/auditchanges/projectSubjoinMessage/getImageTypeList',
    method: 'get',
    params:{
      fileClass:reqData
    }
  })
}


export function getProjectSubjoinMessage(resData) {
  return http({
    url: '/auditchanges/projectSubjoinMessage/getProjectSubjoinMessageListByProject',
    method: 'get',
    params:{
      'attachedType':resData.attachedType,
      'projectId':resData.projectId
    }
  })
}

export function delProjectSubjoinMessage(resData) {
  return http({
    url: '/auditchanges/projectSubjoinMessage/delProjectMessage',
    method: 'delete',
    params:{
      'ids':resData,
    }
  })
}

export function messageGoback(reqData) {
  return http({
    url:'/auditchanges/projectSubjoinMessage/messageGoback',
    method:'get',
    params:{
      'id':reqData
    }
  })
}

export function updateProductSubjoinMessageSort(id,sort,flag,orgId) {
  console.log(sort)
  return http({
    url:'/auditchanges/projectSubjoinMessage/updateProductSubjoinMessageSort',
    method:'post',
    params:{
      'sort':sort,
      'id':id,
      'flag':flag,
      'orgId':orgId
    }
  })
}
