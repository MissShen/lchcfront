import http from 'src/axios/http'
import { dateFormat } from 'src/axios/auditchanges/common/nestedJson'

/**
 * 备案采购列表
 * @param resDate
 * @param domain
 * @returns {*}
 */
export function queryHospitalList (resData,domain) {
  dateFormat(domain,['Date']);
  return http({
    url: '/trade/backup/queryHospitalList',
    method: 'get',
    params: {
      'pageNum': resData.pageNum,
      'pageSize': resData.pageSize,
      'searchStatus': domain.searchStatus,
      'backupCode': domain.backupCode,
      'wrapName': domain.wrapName,
      'nameChn': domain.nameChn,
      'searchEndDate': domain.searchEndDate,
      'searchBenDate': domain.searchBenDate,
      "orderBy":resData.orderBy,
    }
  })
}
/**
 * 新增备案采购选择列表
 * @param resDate
 * @param domain
 * @returns {*}
 */
export function chooseProductList (resData,domain) {
  dateFormat(domain,['Date']);
  return http({
    url: '/trade/backup/chooseProductList',
    method: 'get',
    params: {
      'pageNum': resData.pageNum,
      'pageSize': resData.pageSize,
     'manufactureName': domain.manufactureName,
      'productName': domain.productName,
    }
  })
}


/**
 * 备案审批已审批列表
 * @param resDate
 * @param domain
 * @returns {*}
 */
export function queryAlreadyBackupList (resDate,domain) {
  dateFormat(domain,['Date']);
  return http({
    url: '/trade/backup/queryAlreadyBackupList',
    method: 'get',
    params: {
      'pageNum': resDate.pageNum,
      'pageSize': resDate.pageSize,
      'searchStatus': domain.searchStatus,
      'backupCode': domain.backupCode,
      'wrapName': domain.wrapName,
      'nameChn': domain.nameChn,
      'searchEndDate': domain.searchEndDate,
      'searchBenDate': domain.searchBenDate,
      "orderBy":resDate.orderBy
    }
  })
}
/**
 * 备案审批已审批列表
 * @param resDate
 * @param domain
 * @returns {*}
 */
export function queryAllAlreadyBackupList (resDate,domain) {
  dateFormat(domain,['Date']);
  return http({
    url: '/trade/backup/queryAllAlreadyBackupList',
    method: 'get',
    params: {
      'pageNum': resDate.pageNum,
      'pageSize': resDate.pageSize,
      'searchStatus': domain.searchStatus,
      'backupOrg': domain.backupOrg,
      'backupCode': domain.backupCode,
      'wrapName': domain.wrapName,
      'nameChn': domain.nameChn,
      'searchEndDate': domain.searchEndDate,
      'searchBenDate': domain.searchBenDate,
      "orderBy":resDate.orderBy
    }
  })
}

/**
 * 备案审批待审批列表
 * @param resDate
 * @param domain
 * @returns {*}
 */
export function queryWaitBackupList (resDate,domain) {
  dateFormat(domain,['Date']);
  return http({
    url: '/trade/backup/queryWaitBackupList',
    method: 'get',
    params: {
      'pageNum': resDate.pageNum,
      'pageSize': resDate.pageSize,
      'searchStatus': domain.searchStatus,
      'backupCode': domain.backupCode,
      'wrapName': domain.wrapName,
      'nameChn': domain.nameChn,
      'searchEndDate': domain.searchEndDate,
      'searchBenDate': domain.searchBenDate,
      "orderBy":resDate.orderBy
    }
  })
}
/**
 * 查询备案采购详情
 * @param resDate
 * @param domain
 * @returns {*}
 */
export function findHospitalByRecordId (recordId) {
  return http({
    url: '/trade/backup/findHospitalByRecordId',
    method: 'get',
    params: {
      'recordId': recordId
    }
  })
}

/**
 * 新增备案采购
 * @param resDate
 * @param domain
 * @returns {*}
 */
export function addHospital (domain) {
  return http({
    url: '/trade/backup/addHospital',
    method: 'post',
    params:{

      'nameChn':domain.nameChn,
      'tradeName':domain.tradeName,
      'modeName':domain.modeName,
      'spec':domain.spec,
      'standRate':domain.standRate,
      'wrapName':domain.wrapName,
      'specUnit':domain.specUnit,
      'permitNumber':domain.permitNumber,
      'bidPrice':domain.bidPrice,
      'purchaseNum':domain.purchaseNum,
      'purchasePrice':domain.purchasePrice,
      'manufactureName':domain.manufactureName,
      'sendOrgname':domain.sendOrgname,
      'useDesc':domain.useDesc,
      'purchaseDesc':domain.purchaseDesc,
      'purchaseDateStr':domain.purchaseDate,
      'useDoctor':domain.useDoctor,
      'zrName':domain.zrName,
      'yzName':domain.yzName,
      'twoToken':domain.twoToken,
      'twoTokenReason':domain.twoTokenReason
    },



  })
}
/**
 * 修改备案采购
 * @param resDate
 * @param domain
 * @returns {*}
 */
export function updateHospital (domain) {
  return http({
    url: '/trade/backup/updateHospital',
    method: 'put',
    params:{

      'purchaseDateStr':domain.purchaseDate,
      'recordId':domain.recordId,
      'nameChn':domain.nameChn,
      'tradeName':domain.tradeName,
      'modeName':domain.modeName,
      'spec':domain.spec,
      'standRate':domain.standRate,
      'wrapName':domain.wrapName,
      'specUnit':domain.specUnit,
      'permitNumber':domain.permitNumber,
      'bidPrice':domain.bidPrice,
      'purchaseNum':domain.purchaseNum,
      'purchasePrice':domain.purchasePrice,
      'manufactureName':domain.manufactureName,
      'sendOrgname':domain.sendOrgname,
      'useDesc':domain.useDesc,
      'purchaseDesc':domain.purchaseDesc,
      'useDoctor':domain.useDoctor,
      'zrName':domain.zrName,
      'yzName':domain.yzName,
      'twoToken':domain.twoToken,
      'twoTokenReason':domain.twoTokenReason,
    },
  })
}
/**
 *  删除选中库存商品信息
 * @param recordId
 * @returns {*}
 */
export function deleteHospitalBackUpByRecordId (recordId) {
  return http({
    url: '/trade/backup/deleteHospitalBackUpByRecordId',
    method: 'delete',
    params: {
      'recordId':recordId
    }
  })
}

/**
 *  提交备案采购
 * @param recordId
 * @returns {*}
 */
export function submitToNext (recordId) {
  return http({
    url: '/trade/backup/submitToNext',
    method: 'put',
    params:{
      'recordId':recordId
    }
  })
}

/**
 *  申请作废备案采购
 * @param domain
 * @returns {*}
 */
export function backUpApplyDel (domain) {
  return http({
    url: '/trade/backup/backUpApplyDel',
    method: 'put',
    data: domain
  })
}

/**
 *  备案采购审批通过
 * @param recordId
 * @returns {*}
 */
export function checkOkUpdate (recordId,handleDesc) {
  return http({
    url: '/trade/backup/checkOkUpdate',
    method: 'put',
    params:{
      'recordId':recordId,
      'handleDesc':handleDesc
    }
  })
}

/**
 *  备案采购审批拒绝
 * @param recordId
 * @returns {*}
 */
export function checkUpdateNo (recordId,handleDesc) {
  return http({
    url: '/trade/backup/checkUpdateNo',
    method: 'put',
    params:{
      'recordId':recordId,
      'handleDesc':handleDesc
    }
  })
}

/**
 *  备案采购同意作废
 * @param recordId
 * @returns {*}
 */
export function govDelOk (recordId,handleDesc) {
  return http({
    url: '/trade/backup/govDelOk',
    method: 'put',
    params:{
      'recordId':recordId,
      'handleDesc':handleDesc
    }
  })
}

/**
 *  备案采购拒绝作废
 * @param recordId
 * @returns {*}
 */
export function govDelNo (recordId,handleDesc) {
  return http({
    url: '/trade/backup/govDelNo',
    method: 'put',
    params:{
      'recordId':recordId,
      'handleDesc':handleDesc
    }
  })
}


/**
 * 导出
 * @param ids
 * @returns {*}
 */
export function exportEXL(domain) {
  return http({
    url: '/trade/backup/exportEXL',
    method: 'get',
    responseType: 'blob',// 表明返回服务器返回的数据类型
    use: 'all',
    params: {
      'searchStatus': domain.searchStatus,
      'wrapName': domain.wrapName,
      'nameChn': domain.nameChn,
      'searchEndDate': domain.searchEndDate,
      'searchBenDate': domain.searchBenDate
    }
  })
}


/**
 * 导出待审批
 * @param ids
 * @returns {*}
 */
export function exportWaitEXL(domain) {
  return http({
    url: '/trade/backup/exportWaitEXL',
    method: 'get',
    responseType: 'blob',// 表明返回服务器返回的数据类型
    use: 'all',
    params: {
      'searchStatus': domain.searchStatus,
      'backupCode': domain.backupCode,
      'wrapName': domain.wrapName,
      'nameChn': domain.nameChn,
      'searchEndDate': domain.searchEndDate,
      'searchBenDate': domain.searchBenDate,

    }
  })
}


/**
 * 备案审批已审批列表导出
 * @param resDate
 * @param domain
 * @returns {*}
 */
export function exportQueryAllAlreadyBackupList (resDate,domain) {
  dateFormat(domain,['Date']);
  return http({
    url: '/trade/backup/exportQueryAllAlreadyBackupList',
    method: 'get',
    responseType: 'blob',// 表明返回服务器返回的数据类型
    use: 'all',
    params: {
      'pageNum': resDate.pageNum,
      'pageSize': resDate.pageSize,
      'backupOrg': domain.backupOrg,
      'wrapName': domain.wrapName,
      'nameChn': domain.nameChn,
      'searchEndDate': domain.searchEndDate,
      'searchBenDate': domain.searchBenDate,
      "orderBy":resDate.orderBy
    }
  })
}
export function getRoleCode () {
  return http({
    url: '/trade/evaluateController/getRoleCode',
    method: 'get',
    params: {}
  })
}
export function downloadBackupWord (id) {
  return http({
    url: '/trade/backup/downloadBackupWord',
    method: 'get',
    responseType: 'blob',// 表明返回服务器返回的数据类型
    use: 'all',
    params: {
      'recordId':id ,
    }
  })
}

