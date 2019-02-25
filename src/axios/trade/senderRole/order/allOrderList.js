import http from 'src/axios/http'

/**
 * 订单列表(订单处理)查询
 * @param resData
 * @param domain
 * @returns {*}
 */
export function selectSalerlist (resData, domain) {
  return http({
    url: '/trade/orderController/getSalerList',
    method: 'get',
    params: {
      searchOrderState: domain.searchOrderState,
      commHospital: domain.commHospital,
      degreeFlag: domain.degreeFlag,
      searchName: domain.searchName,
      searchCode: domain.searchCode,
      beginTime: domain.beginTime,
      endTime: domain.endTime
    }
  })
}

/**
 * 交易明细查询
 * @param resData
 * @param domain
 * @returns {*}
 */
export function getOrderDetailList (resData, domain) {
  return http({
    url: '/trade/orderController/getOrderDetailList',
    method: 'get',
    params: {
      'pageNum': resData.pageNum,
      'pageSize': resData.pageSize,
      'orderItemState':domain.orderItemState,
      'searchBenDate': domain.searchBenDate,
      'searchEndDate': domain.searchEndDate,
      'searchProductName': domain.searchProductName,
      'searchBuyerOrgName': domain.searchBuyerOrgName,
      'searchSenderOrgName': domain.searchSenderOrgName,
      'searchBakFactoryName': domain.searchBakFactoryName,
      "orderBy":resData.orderBy
    }
  })
}

/**
 *  导出excel
 * @param null
 * @author: zwp
 * @date: 2018/7/24
 * @return:
 */
export function exportExcel (domain) {
  return http({
    url: '/trade/orderController/exportExcel',
    method: 'post',
    responseType: 'blob',// 表明返回服务器返回的数据类型
    use: 'all',
    data: {
      'orderItemState':domain.orderItemState,
      'searchBenDate': domain.searchBenDate,
      'searchEndDate': domain.searchEndDate,
      'searchProductName': domain.searchProductName,
      'searchBuyerOrgName': domain.searchBuyerOrgName,
      'searchSenderOrgName': domain.searchSenderOrgName,
      'searchBakFactoryName': domain.searchBakFactoryName
    }
  })
}

