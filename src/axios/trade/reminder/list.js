import http from 'src/axios/http'

/**
 * 订单催促列表
 * @param resDate
 * @param domain
 * @returns {*}
 */
export function queryReminderList (resData,query) {
  return http({
    url: '/trade/reminderController/queryReminderList',
    method: 'get',
    params: {
      "searchBenDate" : query.searchBenDate,
      "searchEndDate": query.searchEndDate,
      "senderOrgEasy": query.senderOrgEasy,
      "buyerOrgEasy": query.buyerOrgEasy,
      "userName": query.userName,
      "ordItemState": query.ordItemState,
      "intHours": query.intHours,
      "hours": query.hours,
      "pageNum" : resData.pageNum,
      "pageSize" : resData.pageSize,
      "orderBy":resData.orderBy
    }
  })
}

/**
 * 添加
 * @param resDate
 * @param domain
 * @returns {*}
 */
export function addReminder (recordId,remark) {
  debugger
  return http({
    url: '/trade/reminderController/addReminder',
    method: 'get',
    params: {
      "remark" : remark,
      "recordId": recordId
    }
  })
}



/**
 * 导出
 * @param query
 * @returns {*}
 */
export function exportEXL(query) {
  return http({
    url: '/trade/reminderController/exportEXL',
    method: 'get',
    responseType: 'blob',// 表明返回服务器返回的数据类型
    use: 'all',
    params: {
      "searchBenDate": query.searchBenDate,
      "searchEndDate": query.searchEndDate,
      "senderOrgEasy": query.senderOrgEasy,
      "buyerOrgEasy": query.buyerOrgEasy,
      "userName": query.userName,
      "ordItemState": query.ordItemState,
      "intHours": query.intHours,
      "hours": query.hours
    }
  })
}



