import http from 'src/axios/http'

/**
 * 查询合同列表
 * @param resDate
 * @param domain
 */
export function queryContractList (resDate, query, relieveSendId) {
  return http({
    url: 'contract/hospitalSenderContract/queryContractList',
    method: 'get',
    params: {
      "orderBy": resDate.orderBy,
      "conState" : query.conState,
      "orgName" : query.orgName,
      "pageNum" : resDate.pageNum,
      "pageSize" : resDate.pageSize,
      "senderId" : relieveSendId
    }
  })
}

/**
 * 查询合同状态列表
 */
export function findContractType () {
  return http({
    url: 'contract/conMainContract/getVaildStateDownList',
    method: 'get',
  })
}

/**
 * 查询产品明细
 */
export function queryProductDetail(id,resData,query) {
  return http({
    url: 'contract/hospitalSenderContract/getProductDetail',
    method: 'get',
    params:{
      "id": id,
      "pageSize": resData.pageSize,
      "pageNum":resData.pageNum,
      "productName": query.productName,
      "manufactureName": query.manufactureName
    }
  });
}

/**
 * 查询合同历史列表
 * @param resDate
 * @param domain
 */
export function selectContractHistoryList (resData, query, partyCode) {
  return http({
    url: 'contract/hospitalSenderContract/selectContractHistoryList',
    method: 'get',
    params: {
      "conState" : query.conState,
      "jiaName" : query.jiaName,
      "yiName" : query.yiName,
      "organizationName" : query.organizationName,
      "orderBy" : resData.orderBy,
      "pageNum" : resData.pageNum,
      "pageSize" : resData.pageSize
    }
  })
}

/**
 * 解除委托协议
 * @param contractId
 */
export function relieveContract (contractId, dataForm) {
  console.log("######relieveContract_contractId: ", contractId)
  return http({
    url: 'contract/hospitalSenderContract/relieveContract',
    method: 'post',
    data: {
      "contractId" : contractId,
      "strRandom" : dataForm.strRandom,
      "userCert" : dataForm.userCert,
      "userSignedData" : dataForm.userSignedData,
      "containerName" : dataForm.containerName,
      "imgUrl" : dataForm.imgUrl
    }
  })
}

/**
 * 下载PDF
 * @param contractId
 */
export function downLoadPdf (contractId) {
  return http({
    url: 'contract/conMainContract/downLoadContractPdf',
    responseType: 'blob',// 表明返回服务器返回的数据类型
    use: 'all',
    method: 'post',
    data: {
      "contractId" : contractId
    }
  })
}

/**
 * 下载Log PDF
 * @param contractId
 */
export function downLoadLogPdf (logId) {
  return http({
    url: 'contract/conMainContract/downLoadContractLogPdf',
    responseType: 'blob',// 表明返回服务器返回的数据类型
    use: 'all',
    method: 'post',
    data: {
      "logId" : logId
    }
  })
}

/**
 * 下载Zip
 * @param contractId
 */
export function downLoadZip (contractId) {
  return http({
    url: 'contract/conMainContract/downLoadZipFile',
    responseType: 'blob',// 表明返回服务器返回的数据类型
    use: 'all',
    method: 'post',
    data: {
      "contractId" : contractId
    }
  })
}

/**
 * 拒绝合同
 * @param contractId
 * @param dataForm
 */
export function rejectContract (contractId, dataForm, partyCode) {
  return http({
    url: 'contract/conMainContract/rejectContract',
    method: 'post',
    data: {
      "partyCode" : partyCode,
      "contractId" : contractId,
      "strRandom" : dataForm.strRandom,
      "userCert" : dataForm.userCert,
      "userSignedData" : dataForm.userSignedData,
      "containerName" : dataForm.containerName,
      "imgUrl" : dataForm.imgUrl
    }
  })
}

/**
 * 查询廉洁合同详情
 * @param contractId
 */
export function queryHonestInfo (contractId) {
  console.log("contractId: ", contractId);
  return http({
    url: 'contract/conHonestContract/queryContractInfo',
    method: 'get',
    params: {
      "mainContractId" : contractId
    }
  })
}
