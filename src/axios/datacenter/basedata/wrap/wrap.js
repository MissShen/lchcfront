import http from 'src/axios/http'

/**
 * 获取包材列表
 * @returns {*}
 */
export function  wrapList(search, resData) {
  return http({
      url: '/yxdDataCenter/catwrap/list',
      method: 'GET',
      params: {
        'searchType': search.searchType,
        'searchText': search.searchText,
        'pageNum': resData.pageNum,
        'pageSize': resData.pageSize
      }
    }
  )
}

/**
 * 添加
 * @param from
 * @returns {*}
 */
export function add(from) {
  return http({
      url: '/yxdDataCenter/catwrap/insertCatWrap',
      method: 'POST',
      params: from
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
export function info(code) {
  return http({
    url:'/yxdDataCenter/catwrap/findCatWrapByCode',
    method: 'GET',
    params: {
      code: code
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
