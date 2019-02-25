import http from 'src/axios/http'

/**
 * 合同列表
 * @param resDate
 * @param domain
 * @returns {*}
 */
export function selectContractList (resData,domain) {
  return http({
    url: 'contract/contractSignatureController/selectContractList',
    method: 'get',
    params: {
      "orderBy" : resData.orderBy,
      "pageNum" : resData.pageNum,
      "pageSize" : resData.pageSize,
      "conType" : domain.conType,
      "jiaName" : domain.jiaName,
      "yiName" : domain.yiName,
      "conState" : domain.conState
    }
  })
}

/**
 * 合同列表历史数据
 * @param resDate
 * @param domain
 * @returns {*}
 */
export function selectContractHistoryList (resData,domain) {
  return http({
    url: 'contract/contractSignatureController/selectContractHistoryList',
    method: 'get',
    params: {
      "orderBy" : resData.orderBy,
      "pageNum" : resData.pageNum,
      "pageSize" : resData.pageSize,
      "conType" : domain.conType,
      "jiaName" : domain.jiaName,
      "yiName" : domain.yiName,
      "conState" : domain.conState
    }
  })
}



/**
 *  合同状态下拉列表
 * @param resDate
 * @param domain
 * @returns {*}
 */
export function getContractSignatureMainState () {
  return http({
    url: 'contract/conMainContract/getContractMainState',
    method: 'get',
    params: {
    }
  })
}





