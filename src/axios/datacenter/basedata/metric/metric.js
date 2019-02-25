import http from 'src/axios/http'

/**
 *剂型单位代码表
 * @returns {*}
 */
export function metric(search, resData) {
  return http({
      url: '/yxdDataCenter/metric/list',
      method: 'GET',
      params: {
        'searchType': search.searchType,
        'searchText': search.searchText,
        'pageNum': resData.pageNum,
        'pageSize': resData.pageSize,
        'orderBy':search.orderBy
      }
    }
  )
}

/**
 * 添加
 * @param form
 * @returns {*}
 */
export function add(form) {
  return http({
      url: '/yxdDataCenter/metric/add',
      method: 'POST',
      params: form
    }
  )
}

/**
 * 查看详情
 * @param id
 * @returns {*}
 */
export function info(id) {
  return http({
    url: '/yxdDataCenter/metric/check',
    method: 'GET',
    params: {
      id: id
    }
  })
}

/**
 * 删除
 * @param ids
 * @returns {*}
 */
export function del(ids) {
  return http({
    url: '/yxdDataCenter/metric/del',
    method: 'DELETE',
    params: {
      ids: ids
    }
  })
}

/**
 * 修改
 * @param form
 * @returns {*}
 */
export function modify(form) {
  return http({
    url: '/yxdDataCenter/metric/modify',
    method: 'PUT',
    params: form
  })
}
