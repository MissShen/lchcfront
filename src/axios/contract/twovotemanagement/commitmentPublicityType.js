import http from 'src/axios/http'

//  查询当前机构列表
export function queryMechanismList (resData, query) {
  return http({
    url: 'contract/commitmentPublicity/queryMechanismList',
    method: 'get',
    params: {
      "orderBy": resData.orderBy,
      'pageNum': resData.pageNum,
      'pageSize': resData.pageSize,
      'mechanismName':query.mechanismName,
      'orgType':query.orgType
    }
  })
}

