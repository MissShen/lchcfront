import http from 'src/axios/http'

/**
 * 企业变更
 * @author: YuanJiMin
 * @date: 2018/6/2 11:43
 * @return:
 */
export function queryOrgChange(resData, queryData) {
  return http({
    url: '/supervision/publicityNotice/queryOrgChange',
    method: 'get',
    params: {
      'orgName': queryData.orgName,
      'pageNum': resData.pageNum,
      'pageSize': resData.pageSize
    }
  })
}

/**
 * 产品变更
 * @author: YuanJiMin
 * @date: 2018/6/2 11:43
 * @return:
 */
export function queryProductChange(resData, queryData) {
  return http({
    url: '/supervision/publicityNotice/queryProductChange',
    method: 'get',
    params: {
      'orgName': queryData.orgName,
      'productionOrg':queryData.productionOrg,
      'productName': queryData.productName,
      'pageNum': resData.pageNum,
      'pageSize': resData.pageSize
    }
  })
}

/**
 * 价格变更
 * @author: YuanJiMin
 * @date: 2018/6/2 11:43
 * @return:
 */
export function queryPriceChange(resData, queryData) {
  return http({
    url: '/supervision/publicityNotice/queryPriceChange',
    method: 'get',
    params: {
      'orgName': queryData.orgName,
      'productionOrg':queryData.productionOrg,
      'productName': queryData.productName,
      'pageNum': resData.pageNum,
      'pageSize': resData.pageSize
    }
  })
}

/**
 * 医院谈判结果公示
 * @author: YuanJiMin
 * @date: 2018/6/2 11:43
 * @return:
 */
export function queryTalks(resData, queryData) {
  return http({
    url: '/supervision/publicityNotice/queryTalks',
    method: 'get',
    params: {
      'productId':queryData.productId,
      'orgName': queryData.orgName,
      'productName': queryData.productName,
      'productionOrg':queryData.productionOrg,
      'pageNum': resData.pageNum,
      'pageSize': resData.pageSize
    }
  })
}

/**
 * 医院谈判项目列表
 * @author: YuanJiMin
 * @date: 2018/6/2 11:43
 * @return:
 */
export function queryProject(resData, queryData) {
  return http({
    url: '/supervision/publicityNotice/queryProject',
    method: 'get',
    params: {
    }
  })
}

/**
 * 查询北京区域列表
 * @author: YuanJiMin
 * @date: 2018/5/22 11:11
 * @return:
 */
export function queryCityArea() {
  return http({
    url: '/supervision/transaction/queryArea',
    method: 'get'
  })
}


/**
 * 医疗机构采购目录
 * @author: YuanJiMin
 * @date: 2018/6/2 11:43
 * @return:
 */
export function queryPurchaseRecord(resData, queryData) {
  return http({
    url: '/supervision/publicityNotice/queryPurchaseRecord',
    method: 'get',
    params: {
      'orgName': queryData.orgName,
      'level': queryData.level,
      'areaId':queryData.areaId,
      'nature':queryData.nature,
      'pageNum': resData.pageNum,
      'pageSize': resData.pageSize
    }
  })
}

/**
 * 医疗机构采购目录查看产品
 * @author: YuanJiMin
 * @date: 2018/6/2 11:43
 * @return:
 */
export function queryProduct(resData, queryData) {
  return http({
    url: '/supervision/publicityNotice/queryProduct',
    method: 'get',
    params: {
      'id':queryData.id,
      'productionOrg': queryData.productionOrg,
      'productName': queryData.productName,
      'pesc':queryData.pesc,
      'drugForm':queryData.drugForm,
      'pageNum': resData.pageNum,
      'pageSize': resData.pageSize
    }
  })
}

/**
 * 医疗机构采购目录查看产品
 * @author: YuanJiMin
 * @date: 2018/6/2 11:43
 * @return:
 */
export function queryCataLog(resData, queryData) {
  return http({
    url: '/supervision/publicityNotice/queryCataLog',
    method: 'get',
    params: {
      'orgName': queryData.orgName,
      'productName': queryData.productName,
      'productionOrg': queryData.productionOrg,
      'startDate':queryData.startDate,
      'endDate':queryData.endDate,
      'pageNum': resData.pageNum,
      'pageSize': resData.pageSize
    }
  })
}
