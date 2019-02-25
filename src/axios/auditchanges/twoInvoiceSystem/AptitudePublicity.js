import http from 'src/axios/http'

export function queryList (resData,query) {
  return http({
    url: '/auditchanges/Aptitudepublicity/list',
    method: 'get',
    params: {'pageNum': resData.pageNum,
      'pageSize': resData.pageSize,
      'orgName': query.orgName
    }
  })
}

export function queryListManage (resData,query) {
  return http({
    url: '/auditchanges/Aptitudepublicity/managelist',
    method: 'get',
    params: {'pageNum': resData.pageNum,
      'pageSize': resData.pageSize,
      'orgName': query.orgName,
      'typeName': query.typeName,
      'searchName': query.searchName,
      'searchId': query.searchId
    }
  })
}

export function updatepublicity(id,num){
  return http({
    url: '/auditchanges/Aptitudepublicity/updatepublicity',
    method: 'put',
    params: {
      'id':id,
      'publicityState':num
    }
  })
}

export function findDetailById(id) {
  return http({
    url: '/auditchanges/Aptitudepublicity/findDetailById',
    method: 'get',
    params: {'id': id}
  })
}
