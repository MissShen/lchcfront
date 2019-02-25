import http from 'src/axios/http'
/**
 * @discription 查询药品基础数据库
 * @author liuyanfei
 * @date 2018/6/11
 */
export function queryCandidateDirectoryPublicityList (resData,domain) {
  return http({
    url: 'contract/candidateDirectoryPublicity/queryCandidateDirectoryPublicityList',
    method: 'get',
    params: {
      "pageNum" : resData.pageNum,
      "pageSize" : resData.pageSize,
      "orderBy": resData.orderBy,
      "productName":domain.productName,
      "manufactureName":domain.manufactureName,
      "resState":domain.resState,
      "catalogArea":domain.catalogArea
    }
  })
}

