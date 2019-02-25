import http from 'src/axios/http'

/**
 * 配送区域维护-列表
 * @param resDate
 * @param domain
 * @returns {*}
 */
export function queryCatSendRegionRelationList (resDate, query) {
  return http({
    url: 'contract/catSendRegionRelation/queryCatSendRegionRelationList',
    method: 'get',
    params: {
      "district": query.district,
      "city": query.city,
      "region": query.region,
      "pageNum" : resDate.pageNum,
      "pageSize" : resDate.pageSize
    }
  })
}


/**
 * "根据省、市、区 查询配送列表"
 * @discription
 * @author liuyanfei
 * @date 2018/5/2
 */
export function queryByAreaHttp (resData,query) {
  return http({
    url: 'contract/catSendRegionRelation/queryByArea',
    method: 'get',
    params: {
      "orderBy": resData.orderBy,
      "district" : query.district,
      "city":query.city,
      "region":query.region,
      "pageNum" : resData.pageNum,
      "pageSize" : resData.pageSize
    }
  })
}

/**
 *查询省级列表、根据省ID查询市列表
 * @param resDate
 * @param query
 * @returns {*}
 */
export function findByParentId (parentId) {
  return http({
    url: 'contract/catSendRegionRelation/findCityByParentId',
    method: 'get',
    params: {
      "parentId" : parentId
    }
  })
}


/**
 * 根据城市 查询区县列表
 * @param resDate
 * @param query
 * @returns {*}
 */
export function findByParentIds (parentId) {
  return http({
    url: 'contract/catSendRegionRelation/findRegionByParentIds',
    method: 'post',
    params:{"list":parentId}
  })
}

/**
 * 点击保存 对勾选区县进行更新
 * @discription
 * @author liuyanfei
 * @date 2018/4/26
 * * @param districtId 当前省的id,用来删除以前的数据
 * @param regionIds  当前勾选的区县的id数组
 */
export function updateRegion (districtId,regionIds) {
  return http({
    url: 'contract/catSendRegionRelation/updateRegion',
    method: 'post',
    params:{
        "districtId":districtId,
        "regionIds":regionIds.toString()
    }
  })
}
/**
 * 根据id 删除配送区域
 * @discription
 * @author liuyanfei
 * @date 2018/5/2
 */
export function deleteSenderByIdsHttp (Ids) {
  return http({
    url: 'contract/catSendRegionRelation/deleteSenderByIds',
    method: 'delete',
    params:{
      "ids":Ids.toString()
    }
  })
}
