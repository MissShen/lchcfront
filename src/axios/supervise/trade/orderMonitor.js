import http from 'src/axios/http'

/**
 * 订单实时监控列表
 *
 * @author: JiaHaiGang
 * @date: 2018/5/22 11:13
 */
export function orderMonitorList(resData) {
  return http({
    url: '/supervision/order/monitor/list',
    method: 'get',
    params: {
      'pageNum': resData.pageNum,
      'pageSize': resData.pageSize
    }
  })
}

export function orderReceiveList(resData, queryData) {
  return http({
    url: '/supervision/order/receive/list',
    method: 'get',
    params: {
      searchOrderCode: queryData.searchOrderCode,
      searchMedicalName: queryData.searchMedicalName,
      searchBuyerName: queryData.searchBuyerName,
      searchFactoryName: queryData.searchFactoryName,
      searchSenderName: queryData.searchSenderName,
      searchOrderState: queryData.searchOrderState,
      pageNum: resData.pageNum,
      pageSize: resData.pageSize
    }
  })
}

export function orderReceiveSateEnumList() {
  return http({
    url: '/supervision/common/orderReceiveSateEnumList',
    method: 'get',
  })
}
export function orderReturnSateEnumList() {
  return http({
    url: '/supervision/common/orderReturnSateEnumList',
    method: 'get',
  })
}


export function orderReturnList(pageNum, pageSize, queryData) {
  return http({
    url: '/supervision/order/return/list',
    method: 'get',
    params: {
      searchReturnCode: queryData.searchReturnCode,
      searchMedicalName: queryData.searchMedicalName,
      searchBuyerName: queryData.searchBuyerName,
      searchFactoryName: queryData.searchFactoryName,
      searchBeginDate: queryData.searchBeginDate,
      searchEndDate: queryData.searchEndDate,
      pageNum: pageNum,
      pageSize: pageSize
    }
  })
}

export function getIpAndPort() {
  return http({
    url: '/supervision/order/monitor/getIpAndPort',
    method: 'get',
  })
}
