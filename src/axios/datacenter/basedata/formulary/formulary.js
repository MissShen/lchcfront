import http from 'src/axios/http'

/**
 * 获取全部处方集分类
 * @returns {*}
 */
export function  catList(search) {
  return http({
      url: '/yxdDataCenter/catformularycategory/getListNoPage',
      method: 'GET',
      params : {
        'parentId':search.parentId,
        'name':search.name
      }
    }
  )
}

/**
 * 根据级别获取处方集分类
 * @returns {*}
 */
export function  getFormualryByLevel(pid,level) {
  return http({
      url: '/yxdDataCenter/catformularycategory/getListNoPage',
      method: 'GET',
      params : {
        'parentId':pid,
        'hierarchy':level
      }
    }
  )
}
/**
 * 获取处方集分类分页
 * @returns {*}
 */
export function  catListPage(search,resData) {
  return http({
      url: '/yxdDataCenter/catformularycategory/list',
      method: 'GET',
      params : {
        'parentId':search.parentId,
        'name':search.name,
        'pageNum': resData.pageNum,
        'pageSize': resData.pageSize
      }
    }
  )
}



/**
* 根据id查询处方集信息
* @returns {*}
*/
export function  findCatFormularyCategoryById(id) {
  return http({
      url: '/yxdDataCenter/catformularycategory/findCatFormularyCategoryById',
      method: 'GET',
      params : {
        'id':id
      }
    }
  )
}

/**
 * 根据id修改处方集信息
 * @returns {*}
 */
export function  updateCatFormularyCategoryById(form) {
  return http({
      url: '/yxdDataCenter/catformularycategory/updateCatFormularyCategory',
      method: 'PUT',
      params : {
        'id':form.id,
        'name':form.name,
        'code':form.code,
        'remark':form.remark
      }
    }
  )
}

/**
 * 获取处方集列表
 * @returns {*}
 */
export function  formularyList(search, resData) {
  return http({
      url: '/yxdDataCenter/catformulary/list',
      method: 'GET',
      params: {
        'drugName': search.drugName,
        'formularyCategoryName': search.formularyCategoryName,
        'startTime': search.startTime,
        'baseDrugFlag': search.baseDrugFlag,
        'medicalInsuranceFlag': search.medicalInsuranceFlag,
        'medicalInsuranceType': search.medicalInsuranceType,
        'createUsername': search.createUsername,
        'pageNum': resData.pageNum,
        'pageSize': resData.pageSize,
        'endTime': search.endTime
      }
    }
  )
}

/**
 * 添加处方集
 * @param from
 * @returns {*}
 */
export function addFormulary(form) {

  return http({
      url: '/yxdDataCenter/catformulary/insertCatFormulary',
      method: 'POST',
      params: form
    }
  )
}
/**
 * 添加处方集分类
 * @param from
 * @returns {*}
 */
export function insertCatFormularyCategory(form) {

  return http({
      url: '/yxdDataCenter/catformularycategory/insertCatFormularyCategory',
      method: 'POST',
      params: form
    }
  )
}

/**
 * 删除处方集分类
 * @param from
 * @returns {*}
 */
export function deleteCatFormularyCategoryByIds(ids) {
  console.log(">>>>>>>>>>>>>."+ids)
  return http({
      url: '/yxdDataCenter/catformularycategory/deleteCatFormularyCategoryByIds',
      method: 'DELETE',
      params: {
        ids:ids
      }
    }
  )
}

/**
 * 删除处方集列表
 * @param from
 * @returns {*}
 */
export function deleteCatFormularyByIds(ids) {
  return http({
      url: '/yxdDataCenter/catformulary/deleteCatFormularyByIds',
      method: 'DELETE',
      params: {
        ids:ids
      }
    }
  )
}



/**
 * 修改处方集
 * @param from
 * @returns {*}
 */
export function editFormulary(form) {

  return http({
      url: '/yxdDataCenter/catformulary/updateCatFormulary',
      method: 'PUT',
      params: {
        "id":form.id,
        "formularyCategoryId":form.formularyCategoryId,
        "drugName":form.drugName,
        "nameEng":form.nameEng,
        "baseDrugFlag":form.baseDrugFlag,
        "baseDrugDate":form.baseDrugDate,
        "medicalInsuranceFlag":form.medicalInsuranceFlag,
        "medicalInsuranceDate":form.medicalInsuranceDate,
        "medicalInsuranceType":form.medicalInsuranceType,
        "indication":form.indication,
        "usageDosage":form.usageDosage,
        "adverseReaction":form.adverseReaction,
        "taboo":form.taboo,
        "attentionMatter":form.attentionMatter,
        "preparationSpecification":form.preparationSpecification,
        "remark":form.remark,
        "drugIds":form.drugIds,
        "drugIdsType":form.drugIdsType,
      }
    }
  )
}
/**
 * 获取药品列表
 * @param query
 * @returns {*}
 */
export function getDrugs(query,resData) {
  return http({
      url: '/yxdDataCenter/catformulary/getDrugList',
      method: 'GET',
      params: {
        'pageNum': resData.pageNum,
        'pageSize': resData.pageSize,
        'searchContent': query.searchContent,
        'searchType': query.searchType,
        'formularyId':query.formularyId
      }
    }
  )
}


/**
 * 修改
 * @param from
 * @returns {*}
 */
export function update(from) {
  return http({
      url: '/yxdDataCenter/catwrap/updateCatWrap',
      method: 'PUT',
      params: {
        'code': from.code,
        'nameChn': from.nameChn,
        'nameEng': from.nameEng,
        'remark': from.remark
      }
    }
  )
}

/**
 * 查看详情
 * @param code
 * @returns {*}
 */
export function info(id) {
  return http({
    url:'/yxdDataCenter/catformulary/findCatFormularyById',
    method: 'GET',
    params: {
      id: id
    }
  })
}

/**
 * 删除
 * @param code
 * @returns {*}
 */
export function remove(codes) {
  return http({
      url: '/yxdDataCenter/catwrap/deleteCatWrapByCodes',
      method: 'DELETE',
      params: {'codes': codes}
    }
  )
}
