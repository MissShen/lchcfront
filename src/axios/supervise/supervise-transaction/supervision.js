import http from 'src/axios/http'

/**
 * 交易监管首页
 * @param null
 * @author: YuanJiMin
 * @date: 2018/4/19 13:26
 * @return:
 */
export function transactionCount(resData, queryData) {
  return http({
    url: '/supervision/transaction/queryTransactionInfo',
    method: 'get',
    params: {
      queryDate: queryData.queryDate,
      queryDateUnit:queryData.queryDateUnit,
      queryQuarter: queryData.queryQuarter,
      queryAreaId:queryData.queryId,
      queryAreaUnit: queryData.queryUnit,
      queryStartDate:queryData.queryStartDate,
      queryEndDate:queryData.queryEndDate
    }
  })
}

/**
 * 交易监管首页
 * @param null
 * @author: YuanJiMin
 * @date: 2018/4/19 13:26
 * @return:
 */
export function queryTransactionCount(resData, queryData) {
  return http({
    url: '/supervision/transaction/queryTransactionCount',
    method: 'get',
    params: {
      queryDate: queryData.queryDate,
      queryDateUnit:queryData.queryDateUnit,
      queryQuarter: queryData.queryQuarter,
      queryAreaId:queryData.queryId,
      queryAreaUnit: queryData.queryUnit,
      queryStartDate:queryData.queryStartDate,
      queryEndDate:queryData.queryEndDate
    }
  })
}


/**
 * 交易监管首页订单
 * @param null
 * @author: YuanJiMin
 * @date: 2018/4/19 13:26
 * @return:
 */
export function transactionOrderList(resData, queryData) {
  return http({
    url: '/supervision/transaction/queryTransactionOrderInfo',
    method: 'get',
    params: {
      queryDate: queryData.queryDate,
      queryDateUnit:queryData.queryDateUnit,
      queryQuarter: queryData.queryQuarter,
      queryAreaId:queryData.queryId,
      queryAreaUnit: queryData.queryUnit,
      queryStartDate:queryData.queryStartDate,
      queryEndDate:queryData.queryEndDate
    }
  })
}

/**
 * 获取医疗机构采购情况列表
 * @author: YuanJiMin
 * @date: 2018/5/22 11:11
 * @return:
 */
export function queryPurchase(resData,queryData) {
  return http({
    url: '/supervision/transaction/queryPurchase',
    method: 'get',
    params: {
      'hospitalName': queryData.name,
      'startDate': queryData.startDate,
      'endDate': queryData.endDate,
      'areaId': queryData.areaId,
      'hospitalLevel': queryData.level,
      'hospitalNature': queryData.nature,
      'pageNum': resData.pageNum,
      'pageSize': resData.pageSize
    }
  })
}

/**
 * 医疗机构采购情况中查看配送
 * @author: YuanJiMin
 * @date: 2018/5/22 11:11
 * @return:
 */
export function queryDistributionByOrgId(resData,queryData) {
  return http({
    url: '/supervision/transaction/queryDistributionByOrgId',
    method: 'get',
    params: {
      'id':queryData.id,
      'sendName': queryData.sendName,
      'startDate': queryData.sendStartDate,
      'endDate': queryData.sendEndDate,
      'pageNum': resData.pageNum,
      'pageSize': resData.pageSize
    }
  })
}

/**
 * 医疗机构采购情况中查看产品
 * @author: YuanJiMin
 * @date: 2018/5/22 11:11
 * @return:
 */
export function queryProductByOrgId(resData,queryData) {
  return http({
    url: '/supervision/transaction/queryProductByOrgId',
    method: 'get',
    params: {
      'id':queryData.id,
      'productName': queryData.productName,
      'startDate': queryData.proStartDate,
      'endDate': queryData.proEndDate,
      'pageNum': resData.pageNum,
      'pageSize': resData.pageSize
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
 * 医疗机构采购备案情况列表
 * @author: YuanJiMin
 * @date: 2018/5/22 11:11
 * @return:
 */
export function queryPurchaseBackUp(resData,queryData) {
  return http({
    url: '/supervision/transaction/queryPurchaseBackUp',
    method: 'get',
    params: {
      'hospitalName': queryData.hospitalName,
      'startDate': queryData.startDate,
      'endDate': queryData.endDate,
      'pageNum': resData.pageNum,
      'pageSize': resData.pageSize
    }
  })
}

/**
 * 医疗机构采购备案明细
 * @author: YuanJiMin
 * @date: 2018/5/22 11:11
 * @return:
 */
export function queryPurchaseBackUpInfo(resData,queryData) {
  return http({
    url: '/supervision/transaction/queryPurchaseBackUpInfo',
    method: 'get',
    params: {
      'id':queryData.id,
      'productName': queryData.productName,
      'pageNum': resData.pageNum,
      'pageSize': resData.pageSize
    }
  })
}

/**
 *  配送企业库存情况
 *
 * @param pageNum
 * @param pageSize
 * @param queryData
 * @author: JiaHaiGang
 * @date: 2018/5/23 20:06
 */
export function querySenderStockList(pageNum, pageSize, queryData) {
  return http({
    url: '/supervision/transaction/senderStock',
    method: 'get',
    params: {
      searchNameChn: queryData.searchNameChn,
      searchManufactureName: queryData.searchManufactureName,
      searchSendName: queryData.searchSendName,
      searchCatalogArea: queryData.searchCatalogArea,
      searchSenderStockState: queryData.searchSenderStockState,
      searchModifyDate: queryData.searchModifyDate,
      pageNum: pageNum,
      pageSize: pageSize
    }
  })
}

/**
 *  候选目录列表
 *
 * @author: JiaHaiGang
 * @date: 2018/5/23 20:05
 */
export function queryCatalogAreaList() {
  return http({
    url: '/supervision/transaction/catalogAreaList',
    method: 'get',
  })
}

/**
 * 产品的配送列表
 *
 * @author: JiaHaiGang
 * @date: 2018/5/24 9:36
 */
export function querySenderListByProduceId(productId,pageNum, pageSize, queryData) {
  return http({
    url: '/supervision/transaction/senderProduct',
    method: 'get',
    params: {
      productId: productId,
      senderName: queryData.searchSenderName,
      pageNum: pageNum,
      pageSize: pageSize
    }
  })
}


/**
 * 医疗机构采购临采情况列表
 * @author: YuanJiMin
 * @date: 2018/5/22 11:11
 * @return:
 */
export function queryPurchaseFace(resData,queryData) {
  return http({
    url: '/supervision/transaction/queryPurchaseFace',
    method: 'get',
    params: {
      'hospitalName': queryData.hospitalName,
      'startDate': queryData.startDate,
      'endDate': queryData.endDate,
      'pageNum': resData.pageNum,
      'pageSize': resData.pageSize
    }
  })
}


/**
 * 配送企业配送情况列表
 * @author: YuanJiMin
 * @date: 2018/5/22 11:11
 * @return:
 */
export function querySendInfo(resData,queryData) {
  return http({
    url: '/supervision/transaction/querySendInfo',
    method: 'get',
    params: {
      'sendName': queryData.orgName,
      'startDate': queryData.startDate,
      'endDate': queryData.endDate,
      'pageNum': resData.pageNum,
      'pageSize': resData.pageSize
    }
  })
}


/**
 * 配送情况列表查看产品
 * @author: YuanJiMin
 * @date: 2018/5/22 11:11
 * @return:
 */
export function queryProductInfo(resData,queryData) {
  return http({
    url: '/supervision/transaction/queryProductInfo',
    method: 'get',
    params: {
      'id':queryData.id,
      'factoryId':queryData.factoryId,
      'productName': queryData.productName,
      'startDate': queryData.proStartDate,
      'endDate': queryData.proEndDate,
      'pageNum': resData.pageNum,
      'pageSize': resData.pageSize
    }
  })
}


/**
 * 配送情况列表查看医院
 * @author: YuanJiMin
 * @date: 2018/5/22 11:11
 * @return:
 */
export function queryHospatilBySender(resData,queryData) {
  return http({
    url: '/supervision/transaction/queryHospatilBySender',
    method: 'get',
    params: {
      'id':queryData.id,
      'orgName': queryData.orgHosName,
      'startDate': queryData.startHosDate,
      'endDate': queryData.endHosDate,
      'pageNum': resData.pageNum,
      'pageSize': resData.pageSize
    }
  })
}
