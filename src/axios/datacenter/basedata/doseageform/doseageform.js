import http from 'src/axios/http'

/**
 * 获取剂型列表
 * @returns {*}
 */
export function  catDoseageList(search, resData) {
  return http({
      url: '/yxdDataCenter/catdoseage/list',
      method: 'GET',
      params: {
        'mergeNum': search.mergeNum,
        'searchType':search.searchType,
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
      url: '/yxdDataCenter/catdoseage/insertCatDoseageForm',
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
      url: '/yxdDataCenter/catdoseage/updateCatDoeage',
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
    url:'/yxdDataCenter/catdoseage/findCatDoseageFormByCode',
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
      url: '/yxdDataCenter/catdoseage/deleteCatDoseageByCodes',
      method: 'DELETE',
      params: {'codes': codes}
    }
  )
}
