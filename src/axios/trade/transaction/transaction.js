import http from 'src/axios/http'

/**
 * 行政关系维护列表
 * @param resDate
 * @param domain
 * @returns {*}
 */
export function selectAdministrationList (resData,query) {
  return http({
    url: '/trade/transactionController/selectAdministrationList',
    method: 'get',
    params: {'pageNum': resData.pageNum,
      "orderBy":resData.orderBy,
              'pageSize': resData.pageSize,
              'orgName': query.orgName,
              'parentOrgName': query.parentOrgName


    }
  })
}
/**
 * 删除行政关系
 * @param resDate
 * @param domain
 * @returns {*}
 */
export function deleteTransactionById (ids) {
  return http({
    url: '/trade/transactionController/deleteTransactionById',
    method: 'delete',
    params: {'ids': ids.toString()}
  })
}

/**
 * 新增行政关系
 * @param
 * @param
 * @return
 */
export function insertOrdGovRelation(form) {
  return http({
    url:'/trade/transactionController/insertOrdGovRelation',
    method:'post',
    params:{'orgId': form.orgId,'parentOrgId': form.parentOrgId}
  })
}
/**
 * 机构名称列表
 * @param
 * @param
 * @return
 */
export function getCatOrgList(resData,query) {
  return http({
    url:'/trade/transactionController/getCatOrgList',
    method:'get',
    params:{'pageNum': resData.pageNum,
            'pageSize': resData.pageSize,
            'code': query.code,
            'name': query.name
            }
  })
}


