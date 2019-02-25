import http from 'src/axios/http'
import { dateFormat } from 'src/axios/auditchanges/common/nestedJson'

/**
 * 获取药品异名列表
 * @param search
 * @param resData
 */
export function queryDrugSynonymList(search, resData) {

  return http({
    url: '/yxdDataCenter/drugSynonymInfo/list',
    method: 'GET',
    params: {
      'pageNum': resData.pageNum,
      'pageSize': resData.pageSize,
      'searchType': search.searchType,
      'searchText': search.searchText == undefined? '': search.searchText,
    }
  })
}

/**
 * 异名详情
 * @param id
 */
export function findDrugSynonymInfo(id) {

  return http({
    url: '/yxdDataCenter/drugSynonymInfo/findDrugSynonymInfo',
    method: 'GET',
    params: {
      'id': id
    }
  })
}

/**
 * 获取药品列表
 * @param search
 * @param resData
 */
export function queryDrugList(search, resData) {

  return http({
    url: '/yxdDataCenter/drugSynonymInfo/queryDrugList',
    method: 'GET',
    params: {
      'pageNum': resData.pageNum,
      'pageSize': resData.pageSize,
      'text': search.text,
    }
  })
}

/**
 * 新增
 * @param search
 * @param resData
 */
export function insertDrugSynonymInfo(obj) {

  return http({
    url: '/yxdDataCenter/drugSynonymInfo/insertDrugSynonymInfo',
    method: 'POST',
    params: obj
  })
}

/**
 * 修改
 * @param obj
 */
export function updateDrugSynonymInfo(obj) {
  return http({
    url: '/yxdDataCenter/drugSynonymInfo/updateDrugSynonymInfo',
    method: 'PUT',
    params: obj
  })
}
