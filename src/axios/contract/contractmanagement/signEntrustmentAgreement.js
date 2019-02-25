import http from 'src/axios/http'

/**
 * 签订委托协议 列表查询
 * @param resDate
 * @param query
 */
export function queryContractList (resDate, query, partyCode) {
  return http({
    url: 'contract/conMainContract/queryContractList',
    method: 'get',
    params: {
      "partyCode": partyCode,
      "orderBy": resDate.orderBy,
      "orgName" : query.orgName,
      "conState" : query.conState,
      "pageNum" : resDate.pageNum,
      "pageSize" : resDate.pageSize
    }
  })
}

/**
 * 签订委托协议 列表查询
 * @param resDate
 * @param query
 */
export function queryContractLogList (contractId, partyCode) {
  return http({
    url: 'contract/conMainContract/queryContractLogList',
    method: 'get',
    params: {
      "partyCode": partyCode,
      "contractId": contractId
    }
  })
}

/**
 *
 * @author: WangHaiBo
 * @date: 2018/5/28 0028
 * @param null
 * @return:
 * @throws:
 */
export function queryContractHistoryList (resData, query, partyCode) {
  return http({
    url: 'contract/conMainContract/queryContractHistoryList',
    method: 'get',
    params: {
      "partyCode" : partyCode,
      "orderBy" : resData.orderBy,
      "conNo" : query.conNo,
      "jiaName" : query.jiaName,
      "yiName" : query.yiName,
      "organizationName" : query.organizationName,
      "conStateName" : query.conStateName,
      "pageNum" : resData.pageNum,
      "pageSize" : resData.pageSize
    }
  })
}

/**
 * 生产申报签订协议
 * @param contractId
 */
export function signContract (contractId, dataForm, partyCode) {
  return http({
    url: 'contract/conMainContract/signContract',
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
 * 解除委托协议
 * @param contractId
 */
export function relieveContract (contractId, dataForm, partyCode) {
  return http({
    url: 'contract/conMainContract/relieveContract',
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
 * 解除委托协议
 * @param contractId
 */
export function queryTradeNum (contractId) {
  return http({
    url: 'contract/conMainContract/queryTradeNum',
    method: 'get',
    params: {
      "contractId" : contractId
    }
  })
}

/**
 * 查询协议详情
 * @param contractId
 */
export function queryInfo (contractId, partyCode) {
  return http({
    url: 'contract/conMainContract/queryContractInfo',
    method: 'get',
    params: {
      "partyCode" : partyCode,
      "contractId" : contractId
    }
  })
}

/**
 * 详情页查询产品列表
 * @param contractId
 */
export function queryProducts (contractId, partyCode, data) {
  return http({
    url: 'contract/conMainContract/queryContractProducts',
    method: 'get',
    params: {
      "partyCode" : partyCode,
      "contractId" : contractId,
      "pageNum" : data.pageNum,
      "pageSize" : data.pageSize
    }
  })
}

/**
 * 查询可追加产品列表
 * @param contractId
 */
export function queryAddProduct (resData, query, contractId) {
  return http({
    url: 'contract/conMainContract/queryAddableProductList',
    method: 'get',
    params: {
      "contractId" : contractId,
      "productName" : query.productName,
      "manufactureName" : query.manufactureName,
      "pageNum" : resData.pageNum,
      "pageSize" : resData.pageSize
    }
  })
}

/**
 * 查询可变更产品列表
 * @param contractId
 */
export function queryChangeProduct (resData, query, contractId) {
  return http({
    url: 'contract/conMainContract/queryChangeableProductList',
    method: 'get',
    params: {
      "contractId" : contractId,
      "productName" : query.productName,
      "manufactureName" : query.manufactureName,
      "pageNum" : resData.pageNum,
      "pageSize" : resData.pageSize
    }
  })
}

/**
 * 追加产品
 * @param contractId
 */
export function addContractProduct (arr, contractId, partyCode) {
  var ids = JSON.stringify(arr);
  return http({
    url: 'contract/conMainContract/addContractProduct',
    method: 'post',
    type:'json',
    data: {
      "partyCode" : partyCode,
      "contractId" : contractId,
      "productIds" : ids
    }
  })
}

/**
 * 变更产品
 * @param contractId
 */
export function changeContractProduct (arr, contractId, partyCode) {
  var ids = JSON.stringify(arr);
  return http({
    url: 'contract/conMainContract/changeContractProduct',
    method: 'post',
    type:'json',
    data: {
      "partyCode" : partyCode,
      "contractId" : contractId,
      "productIds" : ids
    }
  })
}

/**
 * 追加盖章
 * @param contractId
 */
export function addProductStamp (contractId, dataForm, partyCode) {
  return http({
    url: 'contract/conMainContract/addProductStamp',
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
 * 变更盖章
 * @param contractId
 */
export function changeStamp (contractId, dataForm, partyCode) {
  return http({
    url: 'contract/conMainContract/changeProductStamp',
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
 * 重新发起合同
 * @param contractId
 */
export function restartContract (contractId) {
  return http({
    url: 'contract/conMainContract/restartContract',
    method: 'post',
    data: {
      "contractId" : contractId
    }
  })
}

/**
 * 上传合同附件
 */
export function uploadContractFile (res) {
  return http({
    url: 'contract/conMainContract/uploadContractFile',
    method: 'post',
    data: {
      "contractId" : res.refName,
      "fileIds" : res.data
    }
  })
}

/**
 * 查询可变更产品列表
 * @param contractId
 */
export function queryContractFileIds (contractId) {
  return http({
    url: 'contract/conMainContract/queryContractFileIds',
    method: 'get',
    params: {
      "contractId" : contractId
    }
  })
}

/**
 * 删除合同附件
 * @param contractId
 */
export function deleteByFileIds (contractId, fileId) {
  return http({
    url: 'contract/conMainContract/deleteByFileIds',
    method: 'post',
    params: {
      "contractId" : contractId,
      "fileId" : fileId
    }
  })
}

/**
 * 取消合同签订
 * @param contractId
 */
export function cancelContractSign (contractId) {
  return http({
    url: 'contract/conMainContract/cancelContractSign',
    method: 'post',
    params: {
      "contractId" : contractId
    }
  })
}

/**
 * 取消合同解除
 * @param contractId
 */
export function cancelContractRelieve (contractId) {
  return http({
    url: 'contract/conMainContract/cancelContractRelieve',
    method: 'post',
    params: {
      "contractId" : contractId
    }
  })
}

