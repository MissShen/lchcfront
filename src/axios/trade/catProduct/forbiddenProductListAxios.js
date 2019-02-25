import http from 'src/axios/http'

/**
 * 禁用药品目录
 * @param resDate
 * @param domain
 * @returns {*}
 */
export function forbiddenProductList (resData,query) {
  return http({
    url: '/trade/drugDirectory/selectDrugDirectoryList',
    method: 'get',
    params: {'pageNum': resData.pageNum, 'pageSize': resData.pageSize, 'orgName': query.orgName, 'bakMedicalName': query.bakMedicalName, 'bakMedicalSpec': query.bakMedicalSpec}
  })
}

/**
 * 启用
 * @param resDate
 * @param domain
 * @returns {*}
 */
export function deleteOrSaveDrug (productId,flag) {
  return http({
    url: '/trade/drugDirectory/deleteOrSaveDrug',
    method: 'put',
    params: {'productId': productId , 'flag' : flag}
  })
}

