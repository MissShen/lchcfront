import http from 'src/axios/http'

  /**
   * 查询合同模板项目列表
   * @author WangHaiBo
   * @date 2018.4.12
   */

  export function templateProjectList (resData) {
    return http({
      url: 'contract/selectHtTemplate/getTemplateProjectList',
      method: 'get',
      params: {
        "orderBy" : resData.orderBy,
        "pageNum": resData.pageNum,
        "pageSize": resData.pageSize
      }
    })
  }

  /**
   * 查询选择合同模板列表
   * @author WangHaiBo
   * @date 2018.4.12
   */

  export function selectTemplateList (resData,query,templateTypeId) {
    return http({
      url: 'contract/selectHtTemplate/getHtTemplateList',
      method: 'get',
      params: {
        "title" : query.title,
        "typeId" : query.typeId,
        "templateTypeId" : templateTypeId,
        "orderBy" : resData.orderBy,
        "pageNum" : resData.pageNum,
        "pageSize" : resData.pageSize
      }
    })
  }

  /**
   * 查询类型名称列表列表
   * @author WangHaiBo
   * @date 2018.4.12
   */

  export function selectTemplateTypeList () {
    return http({
      url: 'contract/selectHtTemplate/getHtTemplateTypeNameList',
      method: 'get'
    })
  }


  /**
   * 修改templateId
   * @author WangHaiBo
   * @date 2018.4.15
   */

  export function updateTemplateId (id,templateId) {
    return http({
      url: 'contract/selectHtTemplate/putTemplateIdById',
      method: 'put',
      data: {
        "id": id,
        "templateId": templateId
      }
    })
  }

  /**
   * 规则字典列表
   * @param resDate
   * @param domain
   * @returns {*}
   */
  export function selectSysRuleList () {
    return http({
      url: 'contract/selectHtTemplate/getRuleList',
      method: 'get'
    })
  }

  export function updateRuleIds(id,ruleId,ruleName){
    return http({
      url: "contract/selectHtTemplate/postRuleIdsById",
      method: "post",
      data: {
        "id": id,
        "ruleId": ruleId,
        "ruleName": ruleName
      }
    })
  }

