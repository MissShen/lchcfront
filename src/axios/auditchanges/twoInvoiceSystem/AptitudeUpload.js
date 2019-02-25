import http from 'src/axios/http'

export function queryList (resData) {
  return http({
    url: '/auditchanges/Aptitudeupload/list',
    method: 'get',
    params: {'pageNum': resData.pageNum,
             'pageSize': resData.pageSize
    }
  })
}


export function findAptitudebyid(id,typeId) {
  return http({
    url: '/auditchanges/Aptitudeupload/finddetail',
    method: 'get',
    params: {'id': id,
    'typeId':typeId}
  })
}

export function submit(id) {
  return http({
    url: '/auditchanges/Aptitudeupload/submit',
    method: 'put',
    data: {'id': id}
  })
}

export function insertOrgBigtype(fileList,typeId) {
  /*
  * typeId 机构类型ID
  */
  return http({
    url: '/auditchanges/Aptitudeupload/insertOrgBigtype',
    method: 'put',
    data: {typeId:typeId,
    fileStr:JSON.stringify(fileList)}
  })
}

export function updateOrgBigtype(fileList,typeId) {
  /*
  * typeId 机构类型ID
  */
  return http({
    url: '/auditchanges/Aptitudeupload/updateOrgBigtype',
    method: 'put',
    data: {typeId:typeId,
      fileStr:JSON.stringify(fileList)}
  })
}

export function checkFileCount(id) {
  return http({
    url: '/auditchanges/Aptitudeupload/checkFileCount',
    method: 'get',
    params: {'id':id}
  })
}

export function findFilesById(id,typeId){
  return http({
    url: '/auditchanges/Aptitudeupload/findFiles',
    method: 'get',
    params: {'id':id,
    'typeId':typeId}
  })
}
