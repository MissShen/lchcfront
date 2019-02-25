import http from "../../http";


/**
 * 根据cifyId 查询区县列表
 * @discription
 * @author liuyanfei
 * @date 2018/4/26
 */
export function selectRegionsHttp (cityIds) {
  return http({
    url: 'contract/catSendRegionRelation/findRegionByParentIds',
    method: 'post',
    params:{"list":cityIds}
  })
}

export function findSenderByRegionsHttp (regions,productId,resData,formQuery) {
  return http({
    url: 'contract/factorySenderRelation/findSenderByRegions',
    method: 'get',
    params:{
      "orderBy": resData.orderBy,
      regions:regions.toString(),
      productId:productId,
      "pageNum" : resData.pageNum,
      "pageSize" : resData.pageSize,
      "senderName" : formQuery.senderName
    }
  })
}

export function insertSenderForFactoryHttp (productId,senders,regions) {
  return http({
    url: 'contract/factorySenderRelation/insertSenderForFactory',
    method: 'get',
    params:{
      senders:senders.toString(),//选择的配送企业
      productId:productId,//为哪个产品添加配送
      regions:regions.toString()//往哪里添加配送
    }
  })

}
