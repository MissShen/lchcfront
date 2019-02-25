import http from 'src/axios/http'

export function queryList (resData,query) {
  return http({
    url: '/auditchanges/orgInfoShow/list',
    method: 'get',
    params: {'pageNum': resData.pageNum,
             'pageSize': resData.pageSize,
             'name': query.name,
             'creditCode': query.creditCode,
             'abbr': query.abbr,
             'organizeCode': query.organizeCode
    }
  })
}

export function queryDistributionList (resData,query) {
  return http({
    url: '/auditchanges/orgInfoShow/distribution',
    method: 'get',
    params: {'pageNum': resData.pageNum,
      'pageSize': resData.pageSize,
      'name': query.name,
      'creditCode': query.creditCode,
      'abbr': query.abbr,
      'organizeCode': query.organizeCode
    }
  })
}

export function query(id) {
  return http({
    url: "/auditchanges/orgInfoShow/findOrgdetail",
    method: "get",
    params: {
      id
    }
  })
}



