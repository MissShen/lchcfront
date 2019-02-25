import http from 'src/axios/http'
import moment from 'moment'

/**
 * 中药保护主页列表
 * @returns {*}
 */
export function list(query, resData) {
  return http({
      url: '/yxdDataCenter/cnProtected/list',
      method: 'GET',
      params: {
        'catAuthDrugCnProtected.drugName': query.drugName,
        'catAuthDrugCnProtected.drugCode': query.drugCode,
        'catAuthDrugCnProtected.proclamationNumber': query.proclamationNumber,
        'catAuthDrugCnProtected.protectionionNumber': query.protectionionNumber,
        'catAuthDrugCnProtected.corpName': query.corpName,
        'catAuthDrugCnProtected.protectStatus': query.protectStatus,
        'catAuthDrugCnProtected.createUserName': query.createUserName,
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
 * 根据IDS删除中药保护
 * @param ids
 * @returns {*}
 */
export function deleteCnProtectedByIds(ids) {
  return http({
      url: '/yxdDataCenter/cnProtected/deleteCnProtectedByIds',
      method: 'DELETE',
      params: {
        ids: ids,
      }
    }
  )
}

/**
 * 根据ID查看中药保护
 * @returns {*}
 */
export function findById(id) {
  return http({
      url: '/yxdDataCenter/cnProtected/findById',
      method: 'GET',
      params: {
        id: id
      }
    }
  )
}

/**
 * 根据ID查看关联的产品信息
 * @returns {*}
 */
export function findAssoProductById(id, query, resData) {
  return http({
      url: '/yxdDataCenter/cnProtected/findAssoProductById',
      method: 'GET',
      params: {
        'catAuthDrugCnProtected.id': id,
        searchType: query.searchType,
        searchText: query.searchText,
        pageNum: resData.pageNum,
        pageSize: resData.pageSize
      }
    }
  )
}

/**
 * 初始化生产企业
 * @returns {*}
 */
export function findFactoryOrg(query, resData) {
  return http({
      url: '/yxdDataCenter/cnProtected/findFactoryOrg',
      method: 'GET',
      params: {
        searchType: query.searchType,
        searchText: query.searchText,
        pageNum: resData.pageNum,
        pageSize: resData.pageSize,
        orderBy: query.orderBy
      }
    }
  )
}

/**
 * 初始化可关联产品信息
 * @returns {*}
 */
export function findAssoProduct(form, query, resData) {
  return http({
      url: '/yxdDataCenter/cnProtected/findAssoProduct',
      method: 'GET',
      params: {
        'codes': form.codes,
        'catDrug.code': form.catDrug.code,
        'catAuthDrugCnProtected.companyId': form.catAuthDrugCnProtected.companyId,
        searchType: query.searchType,
        searchText: query.searchText,
        pageNum: resData.pageNum,
        pageSize: resData.pageSize,
        orderBy:query.orderBy
      }
    }
  )
}

/**
 * 初始化已关联产品信息
 * @returns {*}
 */
export function findHasAssoProduct(form, query, resData) {
  return http({
      url: '/yxdDataCenter/cnProtected/findHasAssoProduct',
      method: 'GET',
      params: {
        'codes': form.codes,
        'catDrug.code': form.catDrug.code,
        'catAuthDrugCnProtected.id': form.catAuthDrugCnProtected.id,
        'catAuthDrugCnProtected.companyId': form.catAuthDrugCnProtected.companyId,
        searchType: query.searchType,
        searchText: query.searchText,
        pageNum: resData.pageNum,
        pageSize: resData.pageSize,
        orderBy:query.orderBy
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
    url: '/yxdDataCenter/cnProtected/add',
    method: 'POST',
    params: {
      codes: form.codes,
      productIds: form.productIds,
      'catAuthDrugCnProtected.drugId': form.catAuthDrugCnProtected.drugId,
      'catAuthDrugCnProtected.drugName': form.catAuthDrugCnProtected.drugName,
      'catAuthDrugCnProtected.dosageForm': form.catAuthDrugCnProtected.dosageForm,
      'catAuthDrugCnProtected.companyId': form.catAuthDrugCnProtected.companyId,
      'catAuthDrugCnProtected.companyCode': form.catAuthDrugCnProtected.companyCode,
      'catAuthDrugCnProtected.companyName': form.catAuthDrugCnProtected.companyName,
      'catAuthDrugCnProtected.corpName': form.catAuthDrugCnProtected.corpName,
      'catAuthDrugCnProtected.province': form.catAuthDrugCnProtected.province,
      'catAuthDrugCnProtected.protectionGrade': form.catAuthDrugCnProtected.protectionGrade,
      'catAuthDrugCnProtected.protectedTime': form.catAuthDrugCnProtected.protectedTime,
      'catAuthDrugCnProtected.protectionionStartDate': form.catAuthDrugCnProtected.protectionionStartDate == undefined ? '' : moment(form.catAuthDrugCnProtected.protectionionStartDate).format("YYYY-MM-DD"),
      'catAuthDrugCnProtected.protectionionExpiryDate': form.catAuthDrugCnProtected.protectionionExpiryDate == undefined ? '' : moment(form.catAuthDrugCnProtected.protectionionExpiryDate).format("YYYY-MM-DD"),
      'catAuthDrugCnProtected.proclamationNumber': form.catAuthDrugCnProtected.proclamationNumber,
      'catAuthDrugCnProtected.protectionionNumber': form.catAuthDrugCnProtected.protectionionNumber,
      'catAuthDrugCnProtected.bulletinDate': form.catAuthDrugCnProtected.bulletinDate == undefined ? '' : moment(form.catAuthDrugCnProtected.bulletinDate).format("YYYY-MM-DD"),
      'catAuthDrugCnProtected.endProclamationNumber': form.catAuthDrugCnProtected.endProclamationNumber,
      'catAuthDrugCnProtected.sameSpeciesFlag': form.catAuthDrugCnProtected.sameSpeciesFlag,
      'catAuthDrugCnProtected.action': form.catAuthDrugCnProtected.action,
      'catAuthDrugCnProtected.certRemark': form.catAuthDrugCnProtected.certRemark
    }
  })
}

/**
 * 根据ID查询关联剂型
 * @returns {*}
 */
export function findAssDosageForm(id) {
  return http({
      url: '/yxdDataCenter/cnProtected/findAssDosageForm',
      method: 'GET',
      params: {
        'id': id
      }
    }
  )
}

/**
 * 修改页面回显
 * @returns {*}
 */
export function findByIdForUpdate(id) {
  return http({
      url: '/yxdDataCenter/cnProtected/findByIdForUpdate',
      method: 'GET',
      params: {
        'id': id
      }
    }
  )
}

/**
 * 修改
 * @param form
 * @returns {*}
 */
export function update(form) {
  return http({
    url: '/yxdDataCenter/cnProtected/update',
    method: 'POST',
    params: {
      codes: form.codes,
      productIds: form.productIds,
      'catAuthDrugCnProtected.id': form.catAuthDrugCnProtected.id,
      'catAuthDrugCnProtected.drugId': form.catAuthDrugCnProtected.drugId,
      'catAuthDrugCnProtected.drugName': form.catAuthDrugCnProtected.drugName,
      'catAuthDrugCnProtected.dosageForm': form.catAuthDrugCnProtected.dosageForm,
      'catAuthDrugCnProtected.companyId': form.catAuthDrugCnProtected.companyId,
      'catAuthDrugCnProtected.companyCode': form.catAuthDrugCnProtected.companyCode,
      'catAuthDrugCnProtected.companyName': form.catAuthDrugCnProtected.companyName,
      'catAuthDrugCnProtected.corpName': form.catAuthDrugCnProtected.corpName,
      'catAuthDrugCnProtected.province': form.catAuthDrugCnProtected.province,
      'catAuthDrugCnProtected.protectionGrade': form.catAuthDrugCnProtected.protectionGrade,
      'catAuthDrugCnProtected.protectedTime': form.catAuthDrugCnProtected.protectedTime,
      'catAuthDrugCnProtected.protectionionStartDate': form.catAuthDrugCnProtected.protectionionStartDate == undefined ? '' : moment(form.catAuthDrugCnProtected.protectionionStartDate).format("YYYY-MM-DD"),
      'catAuthDrugCnProtected.protectionionExpiryDate': form.catAuthDrugCnProtected.protectionionExpiryDate == undefined ? '' : moment(form.catAuthDrugCnProtected.protectionionExpiryDate).format("YYYY-MM-DD"),
      'catAuthDrugCnProtected.proclamationNumber': form.catAuthDrugCnProtected.proclamationNumber,
      'catAuthDrugCnProtected.protectionionNumber': form.catAuthDrugCnProtected.protectionionNumber,
      'catAuthDrugCnProtected.bulletinDate': form.catAuthDrugCnProtected.bulletinDate == undefined ? '' : moment(form.catAuthDrugCnProtected.bulletinDate).format("YYYY-MM-DD"),
      'catAuthDrugCnProtected.endProclamationNumber': form.catAuthDrugCnProtected.endProclamationNumber,
      'catAuthDrugCnProtected.sameSpeciesFlag': form.catAuthDrugCnProtected.sameSpeciesFlag,
      'catAuthDrugCnProtected.action': form.catAuthDrugCnProtected.action,
      'catAuthDrugCnProtected.certRemark': form.catAuthDrugCnProtected.certRemark
    }
  })
}

/**
 * 根据中药保护ID查看关联产品涉及的剂型CODE，产品ID
 * @returns {*}
 */
export function findAllAssProductDosageFormCodeAndId(id) {
  return http({
      url: '/yxdDataCenter/cnProtected/findAllAssProductDosageFormCodeAndId',
      method: 'GET',
      params: {
        'id': id
      }
    }
  )
}

/**
 * 查询保护品种号是否已存在
 * @returns {*}
 */
export function checkProtectNumber(number) {
  return http({
      url: '/yxdDataCenter/cnProtected/checkProtectNumber',
      method: 'GET',
      params: {
        'number': number
      }
    }
  )
}

/**
 * 根据ID查询已关联剂型
 * @returns {*}
 */
export function findAssDosageFormById(id) {
  return http({
      url: '/yxdDataCenter/cnProtected/findAssDosageFormById',
      method: 'GET',
      params: {
        'id': id
      }
    }
  )
}
