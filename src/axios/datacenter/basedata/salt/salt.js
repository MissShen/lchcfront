import http from 'src/axios/http'

/**
 *盐类衍生物
 * @returns {*}
 */
export function saltList(search, resData) {
  return http({
      url: '/yxdDataCenter/salt/list',
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
      url: '/yxdDataCenter/salt/add',
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
export function info(code) {
  return http({
    url: '/yxdDataCenter/salt/check',
    method: 'GET',
    params: {
      code: code
    }
  })
}

/**
 * 删除
 * @param ids
 * @returns {*}
 */
export function del(codes) {
  return http({
    url: '/yxdDataCenter/salt/del',
    method: 'DELETE',
    params: {
      codes: codes
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
    url: '/yxdDataCenter/salt/modify',
    method: 'PUT',
    params: form
  })
}

