import http from 'src/axios/http'
import moment from 'moment'

/**
 * 国家基本药物主页列表
 * @returns {*}
 */
export function list(query, resData) {
  return http({
      url: '/yxdDataCenter/countryBaseDrugs/list',
      method: 'GET',
      params: {
        'catAuthCountryBase.countryId': query.countryId,
        searchType: query.searchType,
        searchText: query.searchText,
        'catAuthCountryBase.cnWestFlag': query.cnWestFlag,
        'catAuthCountryBase.useAgency': query.useAgency,
        'catAuthCountryBase.createUserName': query.createUserName,
        beginDate: query.beginDate == undefined ? '' : moment(query.beginDate).format("YYYY-MM-DD"),
        endDate: query.endDate == undefined ? '' : moment(query.endDate).format("YYYY-MM-DD"),
        pageNum: resData.pageNum,
        pageSize: resData.pageSize,
        orderBy: query.orderBy
      }
    }
  )
}

/**
 * 中国及省
 * @returns {*}
 */
export function chnRegions() {
  return http({
      url: '/yxdDataCenter/countryBaseDrugs/chnRegions',
      method: 'GET'
    }
  )
}

/**
 * 查看选择药品
 * @param id
 * @returns {*}
 */
export function findDrugAlias(id) {
  return http({
    url: '/yxdDataCenter/countryBaseDrugs/findDrugAlias',
    method: 'GET',
    params: {
      id: id
    }
  })
}

/**
 * 查看选择剂型
 * @param id
 * @returns {*}
 */
export function findDosageForm(id) {
  return http({
    url: '/yxdDataCenter/countryBaseDrugs/findDosageForm',
    method: 'GET',
    params: {
      id: id
    }
  })
}

/**
 * 查看详情
 * @returns {*}
 */
export function findById(id) {
  return http({
      url: '/yxdDataCenter/countryBaseDrugs/findById',
      method: 'GET',
      params: {
        id: id
      }
    }
  )
}

/**
 * 查看已关联药品信息
 * @returns {*}
 */
export function hasAssDrugs(query, resData, id) {
  return http({
      url: '/yxdDataCenter/countryBaseDrugs/queryHasAssDrugs',
      method: 'GET',
      params: {
        searchType: query.searchType,
        searchText: query.searchText,
        'catAuthCountryBase.id': id,
        pageNum: resData.pageNum,
        pageSize: resData.pageSize,
        orderBy: query.orderBy
      }
    }
  )
}

/**
 * 查看未关联药品信息
 * @returns {*}
 */
export function queryNotAssDrugs(query, resData, data) {
  return http({
      url: '/yxdDataCenter/countryBaseDrugs/queryNotAssDrugs',
      method: 'GET',
      params: {
        searchType: query.searchType,
        searchText: query.searchText,
        'catAuthCountryBase.id': data.id,
        ids8: data.ids8,
        codes: data.codes,
        pageNum: resData.pageNum,
        pageSize: resData.pageSize,
        orderBy: query.orderBy
      }
    }
  )
}

/**
 * 删除与药品关联
 * @param id,drugIds
 * @returns {*}
 */
export function delCountryDrug(id, drugIds) {
  return http({
      url: '/yxdDataCenter/countryBaseDrugs/delCountryDrug',
      method: 'DELETE',
      params: {
        id: id,
        drugIds: drugIds
      }
    }
  )
}

/**
 * 增加与药品关联
 * @param id,drugIds
 * @returns {*}
 */
export function addCountryDrug(id, drugIds) {
  return http({
      url: '/yxdDataCenter/countryBaseDrugs/addCountryDrug',
      method: 'POST',
      params: {
        id: id,
        drugIds: drugIds
      }
    }
  )
}

/**
 * 删除国家基本药物
 * @returns {*}
 */
export function del(ids) {
  return http({
      url: '/yxdDataCenter/countryBaseDrugs/delete',
      method: 'DELETE',
      params: {
        ids: ids
      }
    }
  )
}

/**
 * 添加
 * @param form
 * @returns {*}
 */
export function add(form, data) {
  return http({
    url: '/yxdDataCenter/countryBaseDrugs/insert',
    method: 'POST',
    params: {
      'catAuthCountryBase.cnWestFlag': form.catAuthCountryBase.cnWestFlag,
      'catAuthCountryBase.drugNo': form.catAuthCountryBase.drugNo,
      'catAuthCountryBase.englishName': form.catAuthCountryBase.englishName,
      'catAuthCountryBase.bulletinDrug': form.catAuthCountryBase.bulletinDrug,
      'catAuthCountryBase.bulletinDoseageName': form.catAuthCountryBase.bulletinDoseageName,
      'catAuthCountryBase.bulletinSpecName': form.catAuthCountryBase.bulletinSpecName,
      'catAuthCountryBase.drugCategory': form.catAuthCountryBase.drugCategory,
      'catAuthCountryBase.middleCategory': form.catAuthCountryBase.middleCategory,
      'catAuthCountryBase.smallCategory': form.catAuthCountryBase.smallCategory,
      'catAuthCountryBase.useAgency': form.catAuthCountryBase.useAgency,
      'catAuthCountryBase.countryId': form.catAuthCountryBase.countryId,
      'catAuthCountryBase.remark': form.catAuthCountryBase.remark,
      ids: data.ids,
      ids8: data.ids8,
      codes: data.codes
    }
  })
}

/**
 * 修改
 * @param form
 * @returns {*}
 */
export function update(form, data) {
  return http({
    url: '/yxdDataCenter/countryBaseDrugs/update',
    method: 'POST',
    params: {
      'catAuthCountryBase.id': form.catAuthCountryBase.id,
      'catAuthCountryBase.cnWestFlag': form.catAuthCountryBase.cnWestFlag,
      'catAuthCountryBase.drugNo': form.catAuthCountryBase.drugNo,
      'catAuthCountryBase.englishName': form.catAuthCountryBase.englishName,
      'catAuthCountryBase.bulletinDrug': form.catAuthCountryBase.bulletinDrug,
      'catAuthCountryBase.bulletinDoseageName': form.catAuthCountryBase.bulletinDoseageName,
      'catAuthCountryBase.bulletinSpecName': form.catAuthCountryBase.bulletinSpecName,
      'catAuthCountryBase.drugCategory': form.catAuthCountryBase.drugCategory,
      'catAuthCountryBase.middleCategory': form.catAuthCountryBase.middleCategory,
      'catAuthCountryBase.smallCategory': form.catAuthCountryBase.smallCategory,
      'catAuthCountryBase.useAgency': form.catAuthCountryBase.useAgency,
      'catAuthCountryBase.countryId': form.catAuthCountryBase.countryId,
      'catAuthCountryBase.remark': form.catAuthCountryBase.remark,
      ids8: data.ids8,
      codes: data.codes
    }
  })
}

/**
 * 导出EXCEL
 * @returns {*}
 */
export function exportExcel(query) {
  return http({
      url: '/yxdDataCenter/countryBaseDrugs/export',
      method: 'POST',
      responseType: 'blob',// 表明返回服务器返回的数据类型
      use: 'all',
      params: {
        'catAuthCountryBase.countryId': query.countryId,
        searchType: query.searchType,
        searchText: query.searchText,
        'catAuthCountryBase.cnWestFlag': query.cnWestFlag,
        'catAuthCountryBase.useAgency': query.useAgency,
        'catAuthCountryBase.createUserName': query.createUserName,
        beginDate: query.beginDate == undefined ? '' : moment(query.beginDate).format("YYYY-MM-DD"),
        endDate: query.endDate == undefined ? '' : moment(query.endDate).format("YYYY-MM-DD"),
      }
    }
  )
}

/**
 * 导入数据
 * @returns {*}
 */
export function importData(files) {
  return http({
      url: '/yxdDataCenter/countryBaseDrugs/import',
      method: 'POST',
      data: files,
      type: 'json'
    }
  )
}

/**
 * 下载模板
 * @returns {*}
 */
export function downloadExcel() {
  return http({
      url: '/yxdDataCenter/countryBaseDrugs/downloadExcel',
      method: 'POST',
      responseType: 'blob',
      use: 'all',
    }
  )
}
