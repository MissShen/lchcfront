import http from 'src/axios/http'



export function queryList (resData,query) {
  return http({
    url: '/auditchanges/productClarify/list',
    method: 'get',
    params: {'pageNum': resData.pageNum,
             'pageSize': resData.pageSize,
             'PRODUCT': query.PRODUCT,
             'DOSAGE': query.DOSAGE,
             'SPEC': query.SPEC,
             'MANUFACTURE': query.MANUFACTURE,
              'STATE':query.STATE
    }
  })
}

export function findProductDetailById (id) {
  return http({
    url: '/auditchanges/productClarify/detail',
    method: 'get',
    params: {'id': id}
  })
}


export function selectQueryFieldById (id) {
  return http({
    url: '/auditchanges/productClarify/selectQueryFieldById',
    method: 'get',
    params: {'id': id}
  })
}

export function queryListChange (resData,query) {
  return http({
    url: '/auditchanges/productClarify/changelist',
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

export function clarify(foreign_id, id) {
  return http({
    url: "/auditchanges/productClarify/clarify",
    method: "get",
    params: {
      ID: foreign_id,
      FIELD: id,
    }
  });
}



export function selectQueryInfoByField(id,field) {
    return http({
      url: '/auditchanges/productClarify/selectQueryInfoByField',
      method: "get",
      params: {
        ID: id,
        FIELD: field,
      }
    })
}


export function selectClarify(id,field) {
  return http({
    url: '/auditchanges/productClarify/selectClarify',
    method: "get",
    params: {
      ID: id,
      FIELD: field,
    }
  })
}


export function update(id) {
  return http({
    url: '/auditchanges/productClarify/updateClarify',
    method: "Post",
    data:{"ID":id}
  })
}

export function insert(field, content,talkType,id, fileId) {
  return http({
    url: "/auditchanges/talkInfo/clarify",
    method: "post",
    data: {
      questionField: field,
      talkContent: content,
      talkType: talkType,
      foreignId: id,
      fileIds: fileId.join(","),
    }
  });
}
