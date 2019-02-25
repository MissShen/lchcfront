import http from 'src/axios/http'

/**
 * 卫生局申报管理
 * @param resDate
 * @param domain
 * @returns {*}
 */
export function selectAssistList (resData,query) {
  return http({
    url: '/trade/assistController/assistList',
    method: 'get',
    params: {
      'pageNum': resData.pageNum,
      'pageSize': resData.pageSize,
      'searchDeclareName': query.searchDeclareName,
      'searchBenDate': query.searchBenDate,
      'searchEndDate': query.searchEndDate,
      'searchDeclareState': query.searchDeclareState,
      "orderBy":resData.orderBy,
    }
  })
}


/**
 * 卫生局查找修改页面
 * @param resDate
 * @param domain
 * @returns {*}
 */
export function updateInit (assistId) {
  return http({
    url: '/trade/assistController/updateaDeclare',
    method: 'get',
    params: {
      'declareId': assistId
    }
  })
}


/**
 * 卫生局保存修改
 * @param resDate
 * @param domain
 * @returns {*}
 */
export function update (query) {
  return http({
    url: '/trade/assistController/update',
    method: 'get',
    params: {
      'declareName': query.declareName,
      'declareState': query.declareState,
      'createDate': query.createDate,
      'comments': query.comments,
      'id': query.id
    }
  })
}


/**
 * 卫生局查看上报医院
 * @param resDate
 * @param domain
 * @returns {*}
 */
export function showDeclareBuyer (resData,query) {
  return http({
    url: '/trade/assistController/showDeclareBuyer',
    method: 'get',
    params: {
      'pageNum': resData.pageNum,
      'pageSize': resData.pageSize,
      'searchDeclareName': query.searchDeclareName,
      'searchDaseageFormName': query.searchDaseageFormName,
      'searchSpec': query.searchSpec,
      'searchStandRate': query.searchStandRate,
      'searchManufactureName': query.searchManufactureName,
      'declareId': query.declareId,
      "orderBy":resData.orderBy,
    }
  })
}

/**
 * 医院端申报管理
 * @param resDate
 * @param domain
 * @returns {*}
 */
export function selectDeclareList (resData,query) {
  return http({
    url: '/trade/assistController/declareList',
    method: 'get',
    params: {
      "orderBy":resData.orderBy,
      'pageNum': resData.pageNum,
      'pageSize': resData.pageSize,
      'searchDeclareName': query.searchDeclareName,
      'searchDeclareState': query.searchDeclareState
    }
  })
}




/**
 * 医院端进入申报 和 查看
 * @param resDate
 * @param domain
 * @returns {*}
 */
export function selectOrgDeclareList (resData,query) {
  return http({
    url: '/trade/assistController/orgDeclareList',
    method: 'get',
    params: {
      'pageNum': resData.pageNum,
      "orderBy":resData.orderBy,
      'pageSize': resData.pageSize,
      'searchDaseageFormName': query.searchDaseageFormName,
      'searchSpec': query.searchSpec,
      'searchStandRate': query.searchStandRate,
      'searchManufactureName': query.searchManufactureName,
      'declareId': query.declareId
    }
  })
}

/**
 * 删除监控药品
 * @param resData
 * @param domain
 * @returns {*}
 */
export function deleteOrgDeclare(query) {
  return http({
    url: '/trade/assistController/deleteOrgDeclare',
    method: 'get',
    params: {
      'keys': query.keys.toString(),
      'ids': query.ids.toString()
    }
  })
}


/**
 * 医院端进入申报基础数据库列表
 * @param resDate
 * @param domain
 * @returns {*}
 */
export function viewZBidProductList (resData,query) {
  return http({
    url: '/trade/assistController/viewZBidProductList',
    method: 'get',
    params: {
      "orderBy":resData.orderBy,
      'pageNum': resData.pageNum,
      'pageSize': resData.pageSize,
      'manufactureEasy': query.manufactureEasy,
      'nameChn': query.nameChn,
      'tradeName':query.tradeName,
      'declareId': query.declareId
    }
  })
}


/**
 * 医院端进入申报本院采购目录列表
 * @param resDate
 * @param domain
 * @returns {*}
 */
export function viewProductList (resData,query) {
  return http({
    url: '/trade/assistController/viewProductList',
    method: 'get',
    params: {
      "orderBy":resData.orderBy,
      'pageNum': resData.pageNum,
      'pageSize': resData.pageSize,
      'manufactureEasy': query.manufactureEasy,
      'nameChn': query.nameChn,
      'tradeName':query.tradeName,
      'declareId': query.declareId
    }
  })
}


/**
 * 医院端进入申报 基础数据库 加入重点药品监控
 * @param resDate
 * @param domain
 * @returns {*}
 */
export function zbidSave(query){
  return http({
    url: '/trade/assistController/zbidSave',
    method: 'post',
    params: {
      'declareId':query.declareId,
      'hitCommIds': query.hitCommIds.toString(),
      'keys': query.keys.toString(),
      'remarks': query.remarks.toString()
    }
  })
}


/**
 * 医院端进入申报 本院采购 加入重点药品监控
 * @param resDate
 * @param domain
 * @returns {*}
 */
export function addPurchase(query){
  return http({
    url: '/trade/assistController/addPurchase',
    method: 'post',
    params: {
      'declareId':query.declareId,
      'hitCommIds': query.hitCommIds.toString(),
      'keys': query.keys.toString(),
      'remarks': query.remarks.toString()
    }
  })
}

/**
 * 北京卫生局申报管理-->查看非两票制药品列表
 * @param resDate
 * @param domain
 * @returns {*}
 */
export function showFttBuyer(resData,query) {
  return http({
    url: '/trade/assistController/showFttBuyer',
    method: 'get',
    params: {
      'pageNum': resData.pageNum,
      'pageSize': resData.pageSize,
      'searchBuyerName': query.searchBuyerName,
      'searchSpec': query.searchSpec,
      'searchStandRate': query.searchStandRate,
      'searchManufactureName': query.searchManufactureName,
      "orderBy":resData.orderBy,
    }
  })
}


/**
 * 管理端--》非两票制药品删除记录列表
 * @param resDate
 * @param domain
 * @returns {*}
 */
export function viewFttDeleteList(resData,query) {
  return http({
    url: '/trade/assistController/viewFttDeleteList',
    method: 'get',
    params: {
      'pageNum': resData.pageNum,
      'pageSize': resData.pageSize,
      'searchBuyerName': query.searchBuyerName,
      'searchSpec': query.searchSpec,
      'searchStandRate': query.searchStandRate,
      'searchManufactureName': query.searchManufactureName,
      "orderBy":resData.orderBy,
    }
  })
}


/**
 * 导出重点药品监控
 * @param ids
 * @returns {*}
 */
export function exportEXL(query) {
  return http({
    url: '/trade/assistController/exportEXLDeclareBuyer',
    method: 'get',
    responseType: 'blob',// 表明返回服务器返回的数据类型
    use: 'all',
    params: {
      'searchDeclareName': query.searchDeclareName,
      'searchDaseageFormName': query.searchDaseageFormName,
      'searchSpec': query.searchSpec,
      'searchStandRate': query.searchStandRate,
      'searchManufactureName': query.searchManufactureName,
      'declareId': query.declareId
    }
  })
}



/**
 * 导出非两票制药品列表
 * @param query
 * @returns {*}
 */
export function exportFttEXL(query) {
  return http({
    url: '/trade/assistController/exportFttEXL',
    method: 'get',
    responseType: 'blob',// 表明返回服务器返回的数据类型
    use: 'all',
    data: {
      'searchBuyerName': query.searchBuyerName,
      'searchSpec': query.searchSpec,
      'searchStandRate': query.searchStandRate,
      'searchManufactureName': query.searchManufactureName
    }
  })
}

/**
 * 导出非两票制历史删除列表
 * @param query
 * @returns {*}
 */
export function exportDeleteEXL(query) {
  return http({
    url: '/trade/assistController/exportDeleteEXL',
    method: 'get',
    responseType: 'blob',// 表明返回服务器返回的数据类型
    use: 'all',
    params: {
      'searchBuyerName': query.searchBuyerName,
      'searchSpec': query.searchSpec,
      'searchStandRate': query.searchStandRate,
      'searchManufactureName': query.searchManufactureName
    }
  })
}

