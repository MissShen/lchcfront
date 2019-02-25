import http from 'src/axios/http'

export function declareList(resData, query) {
  query.pageNum = resData.pageNum;
  query.pageSize = resData.pageSize;
  return http({
    url: '/auditchanges/enterpriseClarify/declareList',
    method: "get",
    params: query
  });
}

export function declare(id) {
  return http({
    url: '/auditchanges/enterpriseClarify/declare',
    method: "get",
    params: {
      ID: id
    }
  });
}

export function changeList(resData, query) {
  query.pageNum = resData.pageNum;
  query.pageSize = resData.pageSize;
  return http({
    url: '/auditchanges/enterpriseClarify/changeList',
    method: "get",
    params: query
  });
}

/**
 * 变更详细信息
 * @param id
 * @returns {*}
 */
export function finalOrg(id) {
  return http({
    url: '/auditchanges/enterprisePublicity/finalOrg',
    method: "get",
    params: {
      id: id
    }
  });
}

/**
 * 变更后信息
 * @param id
 * @returns {*}
 */
export function queryKeyValue(id) {
  return http({
    url: '/auditchanges/enterprisePublicity/queryKeyValue',
    method: "get",
    params: {
      ID: id
    }
  });
}

export function doubt(foreign_id, id) {
  if(id){
    return http({
      url: '/auditchanges/enterpriseClarify/doubtList',
      method: "get",
      params: {
        ID: foreign_id,
        FIELD: id,
      }
    })
  }
  return http({
    url: '/auditchanges/enterpriseClarify/doubt',
    method: "get",
    params: {
      ID: foreign_id
    }
  })
}

export function clarifySave(field, content, id, fileIds) {
  return http({
    url: "/auditchanges/talkInfo/clarify",
    method: "post",
    data: {
      questionField: field,
      talkContent: content,
      talkType: 1,
      foreignId: id,
      fileIds: fileIds.join(","),
    }
  });
}

export function clarify(foreign_id) {
  return http({
    url: "/auditchanges/enterpriseClarify/clarify",
    method: "get",
    params: {
      ID: foreign_id,
    }
  });
}
