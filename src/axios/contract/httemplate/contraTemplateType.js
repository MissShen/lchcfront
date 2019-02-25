import http from 'src/axios/http'

/**
 * 模板类型
 * @param resDate
 * @param domain
 * @returns {*}
 */
  export function selectTemplateTypeList (resData,domain) {
  return http({
    url: 'contract/htTemplateType/queryHtTemplateTypeList',
    method: 'get',
    params: {
      "orderBy" : resData.orderBy,
      "pageNum" : resData.pageNum,
      "pageSize" : resData.pageSize,
      "name":domain.name
    }
  })
}

/**
 * 新增模板类型
 * @param templateType 模板类型
 * @author: JiaHaiGang
 * @date: 2018/3/13 19:05
 */
export function templateTypeAdd(templateType) {
  console.log(templateType);
  return http({
    url: 'contract/htTemplateType/saveHtTemplateType',
    method: 'post',
    data: templateType
  })
}
/**
 * 修改模板类型
 *
 * @author: wanghaibo
 * @date: 2018/4/10 0010
 * @param templateType
 */
export function templateTypeUpdate(templateType) {
  return http({
    url: 'contract/htTemplateType/updateHtTemplateType',
    method: 'put',
    data: templateType
  })
}

/**
 * 根据id删除模板类型
 *
 * @author: wanghaibo
 * @date: 2018/4/10 0010
 * @param templateType
 */
export function templateTypeDelete(id) {
  return http({
    url: 'contract/htTemplateType/deleteHtTemplateType',
    method: 'delete',
    params: {
      'id' : id
    }
  })
}
