import http from 'src/axios/http'

/**
 * 审核关系维护
 * @param resDate
 * @param domain
 * @returns {*}
 */
export function selectAuditRelationList (resData,query) {
  return http({
    url: '/trade/auditRelationController/selectAuditRelationList',
    method: 'get',
    params: {'pageNum': resData.pageNum, 'pageSize': resData.pageSize,"orderBy":resData.orderBy,
      'searchKeyCode': query.searchKeyCode,
      'searchKeyWord': query.searchKeyWord,
      'searchCode': query.searchCode,
      'searchMode': query.searchMode,
      'buyerCode': query.buyerCode,
      'approveCode': query.approveCode,
      'buyerAbbr': query.buyerAbbr,
      'approveAbbr': query.approveAbbr
    }
  })
}

/**
 * 删除审核关系
 * @param
 * @param
 * @return
 */
export function deleteAuditRelationList(ids) {
  return http({
    url:'/trade/auditRelationController/deleteAuditRelationList',
    method:'delete',
    params:{'ids': ids}
  })
}
/**
 * 新增审核关系
 * @param
 * @param
 * @return
 */
export function addAuditRelation(resData,form) {
  return http({
    url:'/trade/auditRelationController/addAuditRelation',
    method:'post',
    params:{'buyerOrgid': form.buyerOrgid,'approveOrgid': form.approveOrgid}
  })
}

