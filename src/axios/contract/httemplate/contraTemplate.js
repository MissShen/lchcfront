import http from 'src/axios/http'

/**
 * 查询合同模板列表
 * @param resDate
 * @param domain
 * @returns {*}
 */
export function selectTemplateList (resData,domain) {
  return http({
    url: 'contract/htTemplate/queryHtTemplateList',
    method: 'get',
    params: {
      "orderBy" : resData.orderBy,
      "pageNum" : resData.pageNum,
      "pageSize" : resData.pageSize,
      "title" : domain.title,
      "type" : domain.type,
      "typeId" : domain.typeId
    }
  })
}

//查询合同模板是否被选择
export function queryIfTheSelectedTemplate (id) {
  return http({
    url: 'contract/htTemplate/queryIfTheSelectedTemplateById',
    method: 'get',
    params: {
        'id': id
    }
  })
}

/**
 * 根据Id查询回显
 * @param resData
 * @param id
 * @returns {*}
 */
export function queryTemplateById (id) {
  return http({
    url: 'contract/htTemplate/queryTemplateInfo',
    method: 'get',
    params: {
      "id" : id
    }
  })
}

/**
 * 查询模板类型
 * @returns {*}
 */
export function queryTemplateType (parentId) {
  return http({
    url: 'contract/htTemplate/queryTemplateType',
    method: 'get',
    params: {
      "parentId" : parentId
    }
  })
}

/**
 * 查询签约方式
 * @returns {*}
 */
export function queryTemplateTypeOptions() {
  return http({
    url: 'contract/htTemplate/queryTemplateOptions',
    method: 'get',
    params: {

    }
  })
}


/**
 * 新增合同模板
 * @param dataForm
 * @returns {*}
 */
export function addTemplate(dataForm) {
  return http({
    url: 'contract/htTemplate/saveHtTemplate',
    method: 'post',
    data: {
      'title' : dataForm.title,
      'type': dataForm.type,
      'typeId' : dataForm.typeId,
      'content' : dataForm.content
    }
  })
}

/**
 * 更新合同模板
 * @param dataForm
 * @returns {*}
 */
export function updateTemplate (dataForm) {
  return http({
    url: 'contract/htTemplate/updateHtTemplate',
    method: 'put',
    data: {
      'id' : dataForm.id,
      'title' : dataForm.title,
      'typeId' : dataForm.typeId,
      'content' : dataForm.content
    }
  })
}


/**
 * 删除合同模板
 * @param dataForm
 * @returns {*}
 */
export function deleteTemplate (id) {
  return http({
    url: 'contract/htTemplate/deleteHtTemplate',
    method: 'delete',
    params: {
      'id' : id
    }
  })
}
