import http from 'src/axios/http'

/**
 * 获取全部药品分类
 * @returns {*}
 */
export function  catList(search) {
  return http({
      url: '/yxdDataCenter/catCategory/listAll',
      method: 'GET',
      params : {
        'parentId':search.parentId,
        'name':search.name,
        'hierarchy':search.hierarchy
      }
    }
  )
}
/**
 * 获取全部药品分类分页
 * @returns {*}
 */
export function  catListPage(search,resData) {
  return http({
      url: '/yxdDataCenter/catCategory/list',
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
* 根据id查询药品分类信息
* @returns {*}
*/
export function  findCatCategoryById(id) {
  return http({
      url: '/yxdDataCenter/catCategory/findCatCategoryById',
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
export function  updateCatCategory(form) {
  return http({
      url: '/yxdDataCenter/catCategory/updateCatCategory',
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
 * 添加药品分类
 * @param from
 * @returns {*}
 */
export function insertCatCategory(form) {

  return http({
      url: '/yxdDataCenter/catCategory/insertCatCategory',
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
export function deleteCatCategoryByIds(ids) {
  return http({
      url: '/yxdDataCenter/catCategory/deleteCatCategoryByIds',
      method: 'DELETE',
      params: {
        ids:ids
      }
    }
  )
}



