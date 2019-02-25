import http from 'src/axios/http'
import moment from 'moment'

/**
 * OTC药品主页数据
 * @returns {*}
 */
export function list(query, resData) {
  return http({
      url: '/yxdDataCenter/catOtc/list',
      method: 'GET',
      params: {
        searchType: query.searchType,
        searchText: query.searchText,
        otcFlag: query.otcFlag,
        userName: query.userName,
        enableFlag: query.enableFlag,
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
 * 删除
 * @param ids
 * @returns {*}
 */
export function del(ids) {
  return http({
    url: '/yxdDataCenter/catOtc/delete',
    method: 'DELETE',
    params: {
      ids: ids
    }
  })
}

/**
 * 查看详情
 * @param id
 * @returns {*}
 */
export function info(id) {
  return http({
    url: '/yxdDataCenter/catOtc/findById',
    method: 'GET',
    params: {
      id: id
    }
  })
}

/**
 * 查看选择药品
 * @param id
 * @returns {*}
 */
export function findDrugAlias(id) {
  return http({
    url: '/yxdDataCenter/catOtc/findDrugAlias',
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
export function findDoseageForm(id) {
  return http({
    url: '/yxdDataCenter/catOtc/findDoseageForm',
    method: 'GET',
    params: {
      id: id
    }
  })
}

/**
 * 查看已关联药品信息
 * @returns {*}
 */
export function hasAsso(query, resData, id) {
  return http({
      url: '/yxdDataCenter/catOtc/queryHasAssDrugs',
      method: 'GET',
      params: {
        searchType: query.searchType,
        searchText: query.searchText,
        'catOtc.id': id,
        pageNum: resData.pageNum,
        pageSize: resData.pageSize,
        orderBy:query.orderBy
      }
    }
  )
}

/**
 * 查看未关联药品信息
 * @returns {*}
 */
export function notAsso(query, resData, data) {
  return http({
      url: '/yxdDataCenter/catOtc/queryNotAssDrugs',
      method: 'GET',
      params: {
        searchType: query.searchType,
        searchText: query.searchText,
        'catOtc.id': data.id,
        ids8: data.ids8,
        codes: data.codes,
        pageNum: resData.pageNum,
        pageSize: resData.pageSize,
        orderBy:query.orderBy
      }
    }
  )
}

/**
 * 8位编码药品
 * @param 摘除的IDS
 * @returns {*}
 */
export function query8Drugs(query, resData, ids) {
  return http({
      url: '/yxdDataCenter/catOtc/query8Drugs',
      method: 'GET',
      params: {
        searchType: query.searchType,
        searchText: query.searchText,
        drugIds: ids,
        pageNum: resData.pageNum,
        pageSize: resData.pageSize,
        orderBy: query.orderBy
      }
    }
  )
}

/**
 * 剂型信息
 * @param 摘除的codes
 * @returns {*}
 */
export function queryDosageForm(query, resData, codes) {
  return http({
      url: '/yxdDataCenter/catOtc/queryDosageForm',
      method: 'GET',
      params: {
        searchType: query.searchType,
        searchText: query.searchText,
        dosageFormCodes: codes,
        pageNum: resData.pageNum,
        pageSize: resData.pageSize,
        orderBy: query.orderBy
      }
    }
  )
}

/**
 * 根据8位药品和剂型查询标准药品信息
 * @returns {*}
 */
export function queryAssDrugs(query, resData, data) {
  return http({
      url: '/yxdDataCenter/catOtc/queryAssDrugs',
      method: 'GET',
      params: {
        searchType: query.searchType,
        searchText: query.searchText,
        ids: data.ids,
        ids8: data.ids8,
        codes: data.codes,
        codeLength: data.codeLength,
        pageNum: resData.pageNum,
        pageSize: resData.pageSize,
        orderBy:query.orderBy
      }
    }
  )
}

/**
 * 增加OTC与药品关联
 * @param otcId,drugIds
 * @returns {*}
 */
export function addOtcDrug(otcId, drugIds) {
  return http({
      url: '/yxdDataCenter/catOtc/addOtcDrug',
      method: 'POST',
      params: {
        otcId: otcId,
        drugIds: drugIds
      }
    }
  )
}

/**
 * 删除OTC与药品关联
 * @param otcId,drugIds
 * @returns {*}
 */
export function delOtcDrug(otcId, drugIds, codes) {
  return http({
      url: '/yxdDataCenter/catOtc/delOtcDrug',
      method: 'DELETE',
      params: {
        otcId: otcId,
        drugIds: drugIds,
        codes: codes
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
    url: '/yxdDataCenter/catOtc/insert',
    method: 'POST',
    params: {
      'catOtc.id': form.catOtc.id,
      'catOtc.drugId': form.catOtc.drugId,
      'catOtc.drugName': form.catOtc.drugName,
      'catOtc.bulletinDrug': form.catOtc.bulletinDrug,
      'catOtc.drugCategory': form.catOtc.drugCategory,
      'catOtc.englishName': form.catOtc.englishName,
      'catOtc.ingredient': form.catOtc.ingredient,
      'catOtc.indication': form.catOtc.indication,
      'catOtc.proclamationNumber': form.catOtc.proclamationNumber,
      'catOtc.untowardReaction': form.catOtc.untowardReaction,
      'catOtc.tabooCrun': form.catOtc.tabooCrun,
      'catOtc.otcType': form.catOtc.otcType,
      'catOtc.otcFlag': form.catOtc.otcFlag,
      'catOtc.factoryName': form.catOtc.factoryName,
      'catOtc.remark': form.catOtc.remark,
      'catOtc.bulletinDoseageName': form.catOtc.bulletinDoseageName,
      'catOtc.enableFlag': form.catOtc.enableFlag,
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
    url: '/yxdDataCenter/catOtc/update',
    method: 'POST',
    params: {
      'catOtc.id': form.catOtc.id,
      'catOtc.drugId': form.catOtc.drugId,
      'catOtc.drugName': form.catOtc.drugName,
      'catOtc.bulletinDrug': form.catOtc.bulletinDrug,
      'catOtc.drugCategory': form.catOtc.drugCategory,
      'catOtc.englishName': form.catOtc.englishName,
      'catOtc.ingredient': form.catOtc.ingredient,
      'catOtc.indication': form.catOtc.indication,
      'catOtc.proclamationNumber': form.catOtc.proclamationNumber,
      'catOtc.untowardReaction': form.catOtc.untowardReaction,
      'catOtc.tabooCrun': form.catOtc.tabooCrun,
      'catOtc.otcType': form.catOtc.otcType,
      'catOtc.otcFlag': form.catOtc.otcFlag,
      'catOtc.factoryName': form.catOtc.factoryName,
      'catOtc.remark': form.catOtc.remark,
      'catOtc.bulletinDoseageName': form.catOtc.bulletinDoseageName,
      'catOtc.enableFlag': form.catOtc.enableFlag,
      ids: data.ids,
      ids8: data.ids8,
      codes: data.codes
    }
  })
}
