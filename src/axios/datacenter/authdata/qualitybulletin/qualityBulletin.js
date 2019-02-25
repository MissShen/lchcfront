import http from 'src/axios/http'
import moment from 'moment'

/**
 * 劣质药品主页数据
 * @returns {*}
 */
export function badDrugList(query, resData) {
  return http({
      url: '/yxdDataCenter/qualityBulletin/badDrugList',
      method: 'GET',
      params: {
        searchType: query.searchType,
        searchText: query.searchText,
        createUserName: query.createUserName,
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
 * 假冒药品主页数据
 * @returns {*}
 */
export function shamDrugList(query, resData) {
  return http({
      url: '/yxdDataCenter/qualityBulletin/shamDrugList',
      method: 'GET',
      params: {
        searchType: query.searchType,
        searchText: query.searchText,
        createUserName: query.createUserName,
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
 * 删除劣质药
 * @param ids
 * @returns {*}
 */
export function del(ids) {
  return http({
    url: '/yxdDataCenter/qualityBulletin/deleteBadDrug',
    method: 'DELETE',
    params: {
      ids: ids
    }
  })
}

/**
 * 删除假冒药
 * @param ids
 * @returns {*}
 */
export function delShamDrug(ids) {
  return http({
    url: '/yxdDataCenter/qualityBulletin/deleteShamDrug',
    method: 'DELETE',
    params: {
      ids: ids
    }
  })
}

/**
 * 根据ID查看劣质药
 * @returns {*}
 */
export function findBadDrugById(id) {
  return http({
      url: '/yxdDataCenter/qualityBulletin/findBadDrugById',
      method: 'GET',
      params: {
        id: id
      }
    }
  )
}

/**
 * 根据ID查看假冒药
 * @returns {*}
 */
export function findShamDrugById(id) {
  return http({
      url: '/yxdDataCenter/qualityBulletin/findShamDrugById',
      method: 'GET',
      params: {
        id: id
      }
    }
  )
}

/**
 * 初始化生产企业
 * @returns {*}
 */
export function queryFactoryOrg(query, resData) {
  return http({
      url: '/yxdDataCenter/qualityBulletin/queryFactoryOrg',
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
 * 初始化经营企业
 * @returns {*}
 */
export function queryManageOrg(query, resData) {
  return http({
      url: '/yxdDataCenter/qualityBulletin/queryManageOrg',
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
 * 初始化全部企业
 * @returns {*}
 */
export function queryAllOrg(query, resData) {
  return http({
      url: '/yxdDataCenter/qualityBulletin/queryAllOrg',
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
 * 添加劣质药
 * @param form
 * @returns {*}
 */
export function addBadDrug(form) {
  return http({
    url: '/yxdDataCenter/qualityBulletin/addBadDrug',
    method: 'POST',
    params: {
      'sampledOrgType': form.catAuthBadDrug.sampledOrgType,
      'sampledOrgName': form.catAuthBadDrug.sampledOrgName,
      'drugName': form.catAuthBadDrug.drugName,
      'drugSpec': form.catAuthBadDrug.drugSpec,
      'manufacturerId': form.catAuthBadDrug.manufacturerId,
      'manufacturerName': form.catAuthBadDrug.manufacturerName,
      'supplierId': form.catAuthBadDrug.supplierId,
      'supplierName': form.catAuthBadDrug.supplierName,
      'permitNumber': form.catAuthBadDrug.permitNumber,
      'disqualificationItem': form.catAuthBadDrug.disqualificationItem,
      'proclamationNumber': form.catAuthBadDrug.proclamationNumber,
      'proclamationTotal': form.catAuthBadDrug.proclamationTotal,
      'proclamationDate': form.catAuthBadDrug.proclamationDate,
      'testAccouting': form.catAuthBadDrug.testAccouting,
      'processResult': form.catAuthBadDrug.processResult,
      'testOffice': form.catAuthBadDrug.testOffice,
      'permitState': form.catAuthBadDrug.permitState,
      'remark': form.catAuthBadDrug.remark,
      'checkFlag': form.catAuthBadDrug.checkFlag
    }
  })
}

/**
 * 修改劣质药
 * @param form
 * @returns {*}
 */
export function updateBadDrug(form) {
  return http({
    url: '/yxdDataCenter/qualityBulletin/updateBadDrug',
    method: 'POST',
    params: {
      'id': form.id,
      'sampledOrgType': form.sampledOrgType,
      'sampledOrgName': form.sampledOrgName,
      'drugName': form.drugName,
      'drugSpec': form.drugSpec,
      'manufacturerId': form.manufacturerId,
      'manufacturerName': form.manufacturerName,
      'supplierId': form.supplierId,
      'supplierName': form.supplierName,
      'permitNumber': form.permitNumber,
      'disqualificationItem': form.disqualificationItem,
      'proclamationNumber': form.proclamationNumber,
      'proclamationTotal': form.proclamationTotal,
      'proclamationDate': form.proclamationDate,
      'testAccouting': form.testAccouting,
      'processResult': form.processResult,
      'testOffice': form.testOffice,
      'permitState': form.permitState,
      'remark': form.remark,
      'checkFlag': form.checkFlag
    }
  })
}

/**
 * 添加假冒药
 * @param form
 * @returns {*}
 */
export function addShamDrug(form) {
  return http({
    url: '/yxdDataCenter/qualityBulletin/addShamDrug',
    method: 'POST',
    params: {
      'drugName': form.catAuthShamDrug.drugName,
      'drugSpecification': form.catAuthShamDrug.drugSpecification,
      'permitNumber': form.catAuthShamDrug.permitNumber,
      'manufacturer': form.catAuthShamDrug.manufacturer,
      'sampledOrg': form.catAuthShamDrug.sampledOrg,
      'tradeDesc': form.catAuthShamDrug.tradeDesc,
      'saleOrgCode': form.catAuthShamDrug.saleOrgId,
      'saleOrgName': form.catAuthShamDrug.saleOrgName,
      'inspectionResult': form.catAuthShamDrug.inspectionResult,
      'proclamationNumber': form.catAuthShamDrug.proclamationNumber,
      'proclamationDate': form.catAuthShamDrug.proclamationDate,
      'remark': form.catAuthShamDrug.remark
    }
  })
}

/**
 * 修改假冒药
 * @param form
 * @returns {*}
 */
export function updateShamDrug(form) {
  return http({
    url: '/yxdDataCenter/qualityBulletin/updateShamDrug',
    method: 'POST',
    params: {
      'id': form.id,
      'drugName': form.drugName,
      'drugSpecification': form.drugSpecification,
      'permitNumber': form.permitNumber,
      'manufacturer': form.manufacturer,
      'sampledOrg': form.sampledOrg,
      'tradeDesc': form.tradeDesc,
      'saleOrgCode': form.saleOrgId,
      'saleOrgName': form.saleOrgName,
      'inspectionResult': form.inspectionResult,
      'proclamationNumber': form.proclamationNumber,
      'proclamationDate': form.proclamationDate,
      'remark': form.remark
    }
  })
}
