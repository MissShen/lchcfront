import http from 'src/axios/http'

/**
 * 参数设置列表
 * @param resDate
 * @param domain
 * @returns {*}
 */
export function selectParameterSettingList (resData,query) {
  return http({
    url: '/trade/auditController/selectParameterSettingList',
    method: 'get',
    params: {
      'pageNum': resData.pageNum,
      'pageSize': resData.pageSize,
      'name': query.searchRealName,
      "orderBy":resData.orderBy,

    }
  })
}
/**
 * 删除参数设置
 * @param resDate
 * @param domain
 * @returns {*}
 */
export function deleteParameterSettingInfo (id) {
  return http({
    url: '/trade/auditController/deleteParameterSettingInfo',
    method: 'delete',
    params: {'regionId': id}
  })
}
/**
 * 插入参数设置
 * @param resDate
 * @param domain
 * @returns {*}
 */
export function insertParameterSettingInfo (id) {
  return http({
    url: '/trade/auditController/insertParameterSettingInfo',
    method: 'post',
    params: {'regionId': id}
  })
}
  /**
   * 到货查询
   * @param resDate
   * @param domain
   * @returns {*}
   */
  export function selectReceiveList (resData,query){
    return http({
      url: '/trade/receiveController/receiveList',
      method: 'get',
      params: {'pageNum': resData.pageNum,
        'pageSize': resData.pageSize,
        'bakBuyerEasy':query.bakBuyerEasy,
        'bakProductName':query.bakProductName,
        'bakMedicalSpecSpell':query.bakMedicalSpecSpell,
        'bakFactoryEasy':query.bakFactoryEasy,
        'searchBenDate':query.searchBenDate,
        'searchEndDate':query.searchEndDate,
        "orderBy":resData.orderBy
      }
    })
}


/**
 * 导出到货查询列表
 * @param query
 * @returns {*}
 */
export function exportDeleteEXL(query) {
  return http({
    url: '/trade/receiveController/exportReceiveListEXL',
    method: 'get',
    responseType: 'blob',// 表明返回服务器返回的数据类型
    use: 'all',
    params: {
      'bakBuyerEasy':query.bakBuyerEasy,
      'bakProductName':query.bakProductName,
      'bakFactoryEasy':query.bakFactoryEasy,
      'searchBenDate':query.searchBenDate,
      'searchEndDate':query.searchEndDate
    }
  })
}
