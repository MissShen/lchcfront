import http from 'src/axios/http'

/**
 * 市基药列表
 * @param resDate
 * @param domain
 * @returns {*}
 */
export function selectCityBasedDrugList (resData,query) {
  return http({
    url: '/trade/basedDrugController/selectCityBasedDrugList',
    method: 'get',
    params: {'pageNum': resData.pageNum,
      'pageSize': resData.pageSize,
      'senderName': query.senderName,
      'senderAbbr': query.senderAbbr,
      "orderBy":resData.orderBy,

    }
  })
}
/**
 *  市基药移除目录
 * @param resDate
 * @param domain
 * @returns {*}
 */
export function removeDrugCatalog (drugIdList) {
  return http({
    url: '/trade/basedDrugController/addDistrictBasedDrugList',
    method: 'delete',
    params:{'ids' : drugIdList.toString()}
  })
}
/**
 * 区基药列表
 * @param resDate
 * @param domain
 * @returns {*}
 */
export function selectDistrictBasedDrugList (resData,query) {
  return http({
    url: '/trade/basedDrugController/selectDistrictBasedDrugList',
    method: 'get',
    params: {'pageNum': resData.pageNum,
      'pageSize': resData.pageSize,
      'senderName': query.senderName,
      'senderAbbr': query.senderAbbr,
      "orderBy":resData.orderBy,
    }
  })
}
/**
 *  区基药移除目录
 * @param resDate
 * @param domain
 * @returns {*}
 */
export function districtRemoveDrugCatalog (ids) {
  return http({
    url: '/trade/basedDrugController/deleteDistrictBasedDrugList',
    method: 'delete',
    params:{'ids' : ids.toString()}
  })
}
