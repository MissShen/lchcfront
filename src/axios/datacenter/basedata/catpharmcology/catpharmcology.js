import http from 'src/axios/http'

/**
 * 获取全部新编药学分类
 * @returns {*}
 */
export function  catList(search) {
  return http({
      url: '/yxdDataCenter/catPharmacology/listAll',
      method: 'GET',
      params : {
        'pId':search.pId,
        'pLevel':search.pLevel
      }
    }
  )
}
/**
 * 获取全部新编药学分类分页
 * @returns {*}
 */
export function  catListPage(search,resData) {
  return http({
      url: '/yxdDataCenter/catPharmacology/list',
      method: 'GET',
      params : {
        'searchType':search.searchType,
        'searchContent':search.searchContent,
        'pageNum': resData.pageNum,
        'pageSize': resData.pageSize
      }
    }
  )
}



/**
* 根据id查询新编药学信息
* @returns {*}
*/
export function  findCatPharmacologyById(id) {
  return http({
      url: '/yxdDataCenter/catPharmacology/findCatPharmacologyById',
      method: 'GET',
      params : {
        'id':id
      }
    }
  )
}

/**
 * 修改新编药学信息
 * @returns {*}
 */
export function  updateCatPharmacology(form) {
  console.log("..............")
  console.log(form.pid)
  console.log(form.pname)
  return http({
      url: '/yxdDataCenter/catPharmacology/updateCatPharmacology',
      method: 'PUT',
      params : {
        'pId':form.pid,
        'pName':form.pname
      }
    }
  )
}


/**
 * 添加新编药学分类
 * @param from
 * @returns {*}
 */
export function insertCatPharmacology(form) {
console.log("............")
  console.log(form)

  return http({
      url: '/yxdDataCenter/catPharmacology/insertCatPharmacology',
      method: 'POST',
      params: {
        'code':form.code,
        'parentCode':form.parentCode,
        'pName':form.pname,
        'pLevel':form.plevel
      }
    }
  )
}

/**
 * 删除新编药学分类
 * @param from
 * @returns {*}
 */
export function deleteCatPharmacologyByIds(ids) {
  return http({
      url: '/yxdDataCenter/catPharmacology/deleteCatPharmacologyByIds',
      method: 'DELETE',
      params: {
        ids:ids
      }
    }
  )
}



