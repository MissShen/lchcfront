import http from 'src/axios/http'

/**
 * 获取全部药品atc分类
 * @returns {*}
 */
export function  catList(search) {
  return http({
      url: '/yxdDataCenter/catAtcCategory/listAll',
      method: 'GET',
      params : {
        'parentId':search.parentId,
        'hierarchy':search.hierarchy
      }
    }
  )
}
/**
 * 获取全部药品atc分类分页
 * @returns {*}
 */
export function  catListPage(search,resData) {
  return http({
      url: '/yxdDataCenter/catAtcCategory/list',
      method: 'GET',
      params : {
        'parentId':search.parentId,
        'name':search.name,
        'searchType':search.searchType,
        'searchContent':search.searchContent,
        'pageNum': resData.pageNum,
        'pageSize': resData.pageSize
      }
    }
  )
}



/**
* 根据id查询药品分类信息
* @returns {*}
*/
export function  findCatAtcCategoryById(id) {
  return http({
      url: '/yxdDataCenter/catAtcCategory/findCatAtcCategoryById',
      method: 'GET',
      params : {
        'id':id
      }
    }
  )
}

/**
 * 修改药品分类信息
 * @returns {*}
 */
export function  updateCatAtcCategory(form) {
  return http({
      url: '/yxdDataCenter/catAtcCategory/updateCatAtcCategory',
      method: 'PUT',
      params : {
        'id':form.id,
        'nameChn':form.nameChn,
        'nameEng':form.nameEng,
        'code':form.code,
        'tempCodeFlag':form.tempCodeFlag,
        'remark':form.remark
      }
    }
  )
}


/**
 * 添加药品分类
 * @param from
 * @returns {*}
 */
export function insertCatAtcCategory(form) {

  return http({
      url: '/yxdDataCenter/catAtcCategory/insertCatAtcCategory',
      method: 'POST',
      params: form
    }
  )
}

/**
 * 删除药品分类
 * @param from
 * @returns {*}
 */
export function deleteCatAtcCategoryByIds(ids) {
  return http({
      url: '/yxdDataCenter/catAtcCategory/deleteCatAtcCategoryByIds',
      method: 'DELETE',
      params: {
        ids:ids
      }
    }
  )
}



