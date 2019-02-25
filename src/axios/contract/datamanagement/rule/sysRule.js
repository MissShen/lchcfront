import http from 'src/axios/http'

/**
 * 规则字典列表
 * @param resDate
 * @param domain
 * @returns {*}
 */
export function selectSysRuleList (resData,domain) {
  return http({
    url: 'contract/sysRule/queryRuleList',
    method: 'get',
    params: {
      "orderBy": resData.orderBy,
      "pageNum" : resData.pageNum,
      "pageSize" : resData.pageSize,
      "orderBy":resData.orderBy,
      "ruleName":domain.ruleName
    }
  })
}

/**
 * 根据id查询
 * @param resData
 * @param id
 * @returns {*}
 */
export function queryRuleName (id) {
  return http({
    url: 'contract/sysRule/findById',
    method: 'get',
    params: {
      "id" : id
    }
  })
}

/**
 * 更新规则字典
 * @param dataForm
 * @returns {*}
 */
export function updateRuleName (ruleForm) {
  return http({
    url: 'contract/sysRule/updateSysRule',
    method: 'put',
    params: {
      "id" : ruleForm.id,
      "ruleName" : ruleForm.ruleName
    }
  })
}

