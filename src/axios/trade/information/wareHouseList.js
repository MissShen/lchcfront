import http from 'src/axios/http'

/**
 * 药库维护
 * @param resDate
 * @param domain
 * @returns {*}
 */
export function selectWareHouseList (resDate,domain) {
    return http({
      url: '/trade/information/selectWareHouseList',
      method: 'get',
    params: {
      "orderBy":resDate.orderBy,
      'pageNum': resDate.pageNum,
      'pageSize': resDate.pageSize,
      'warehouseCode': domain.warehouseCode,
      'warehouseName': domain.warehouseName
    }
  })
}
/**
 * 根据id查药库详情
 * @param resDate
 * @param domain
 * @returns {*}
 */
export function findOrdWarehouseByWarehouseId (warehouseId) {
    return http({
      url: '/trade/information/findOrdWarehouseByWarehouseId',
      method: 'get',
    params: {
      'warehouseId':warehouseId
    }
  })
}

/**
 *  修改药库信息
 * @param resDate
 * @param domain
 * @returns {*}
 */
export function updateWarehouse (domain,warehouseId) {
  return http({
    url: '/trade/information/updateWarehouse',
    method: 'put',
    params:{
      'warehouseId':warehouseId
    },
    data:domain
  })
}
/**
 *  修改药库状态
 * @param id
 * @param flag
 * @returns {*}
 */
export function changeState (warehouseId,enableFlag) {
  return http({
    url: '/trade/information/changeState',
    method: 'put',
    params:{
      'warehouseId':warehouseId,
      'enableFlag':enableFlag
    }
  })
}
/**
 *  修改药库商品配送
 * @param id
 * @param flag
 * @returns {*}
 */
export function updateWareHouseProductByIds (idList,senderOrgids) {
  return http({
    url: '/trade/information/updateWareHouseProductByIds',
    method: 'put',
    params:{
      'idList':idList.toString(),
      'senderOrgids':senderOrgids.toString()
    }
  })
}

/**
 *  新增药库信息
 * @param resDate
 * @param domain
 * @returns {*}
 */
export function insertWarehouse (domain) {
  return http({
    url: '/trade/information/insertWarehouse',
    method: 'post',
    data:domain
  })
}

/**
 *  库存商品信息
 * @param resDate
 * @param domain
 * @returns {*}
 */
export function queryWareHouseProductList (resDate,domain) {
  return http({
    url: '/trade/information/queryWareHouseProductList',
    method: 'get',
    params: {
      "orderBy":resDate.orderBy,
      'pageNum': resDate.pageNum,
      'pageSize': resDate.pageSize,
      'category': domain.category,
      'warehouseId': domain.warehouseId,
      'searchSimpleName': domain.searchSimpleName,
      'searchKey1': domain.searchKey1,
      'manufactureName': domain.manufactureName
    }
  })
}
/**
 *  新增库存商品信息
 * @param resDate
 * @param domain
 * @returns {*}
 */
export function queryWareHouseProductAddList (resDate,domain) {
  return http({
    url: '/trade/information/queryWareHouseProductAddList',
    method: 'get',
    params: {
      "orderBy":resDate.orderBy,
      'pageNum': resDate.pageNum,
      'pageSize': resDate.pageSize,
      'category': domain.category,
      'warehouseId': domain.warehouseId,
      'searchKey2': domain.searchKey2,
      'searchKey': domain.searchKey,
      'manufactureName': domain.manufactureName
    }
  })
}
/**
 *  药库管理员信息
 * @param resDate
 * @param domain
 * @returns {*}
 */
export function queryWareHouseBuyerList (resDate,domain) {
  return http({
    url: '/trade/information/queryWareHouseBuyerList',
    method: 'get',
    params: {
      'pageNum': resDate.pageNum,
      "orderBy":resDate.orderBy,
      'pageSize': resDate.pageSize,
      'warehouseId': domain.warehouseId,
      'searchKeyUserCode': domain.searchKeyUserCode,
      'searchKey1': domain.searchKey1
    }
  })
}

/**
 *  新增药库管理员列表
 * @param resDate
 * @param domain
 * @returns {*}
 */
export function queryWareHouseBuyerAddList (resDate,domain) {
  return http({
    url: '/trade/information/queryWareHouseBuyerAddList',
    method: 'get',
    params: {
      "orderBy":resDate.orderBy,
      'pageNum': resDate.pageNum,
      'pageSize': resDate.pageSize,
      'warehouseId': domain.warehouseId,
      'searchKeyUserCode': domain.searchKeyUserCode,
      'searchKey1': domain.searchKey1
    }
  })
}

/**
 *  删除选中库存商品信息
 * @param idList
 * @returns {*}
 */
export function deleteWareHouseProductByIds (idList) {
  return http({
    url: '/trade/information/deleteWareHouseProductByIds',
    method: 'delete',
    params: {
          'idList':idList.toString()
    }
  })
}
/**
 *  删除选中药库管理员信息
 * @param idList
 * @returns {*}
 */
export function deleteWareHouseBuyerByIds (idList,warehouseId) {
  return http({
    url: '/trade/information/deleteWareHouseBuyerByIds',
    method: 'delete',
    params: {
      'idList':idList.toString(),
      'warehouseId':warehouseId
    }
  })
}
/**
 *  新增选中用户信息
 * @param idList
 * @returns {*}
 */
export function addWareHouseBuyerByIds (idList,warehouseId) {
  return http({
    url: '/trade/information/addWareHouseBuyerByIds',
    method: 'post',
    params: {
      'idList':idList.toString(),
      'warehouseId':warehouseId
    }

  })
}
/**
 *  新增选中库存商品信息
 * @param idList
 * @returns {*}
 */
export function saveWareHouseProductByIds (idList,warehouseId,senderOrgids) {
  return http({
    url: '/trade/information/saveWareHouseProductByIds',
    method: 'post',
    params: {
      'idList':idList.toString(),
      'senderOrgids':senderOrgids.toString(),
      'warehouseId':warehouseId
    }

  })
}

/**
 * 医疗机构采购分析列表
 * @param resDate
 * @param domain
 * @returns {*}
 */
export function queryBuyerList (resDate,domain) {
  return http({
    url: '/trade/information/queryBuyerList',
    method: 'get',
    params: {
      'pageNum': resDate.pageNum,
      'pageSize': resDate.pageSize,
    }
  })
}

/**
 *  订单明细列表
 * @param resDate
 * @param domain
 * @returns {*}
 */
export function queryBuyerOrderList (resDate,domain) {
  return http({
    url: '/trade/information/queryBuyerOrderList',
    method: 'get',
    params: {
      'pageNum': resDate.pageNum,
      'pageSize': resDate.pageSize,
    }
  })
}

/**
 *  品种明细列表
 * @param resDate
 * @param domain
 * @returns {*}
 */
export function queryProductList (resDate,domain) {
  return http({
    url: '/trade/information/queryProductList',
    method: 'get',
    params: {
      'pageNum': resDate.pageNum,
      'pageSize': resDate.pageSize,
    }
  })
}

/**
 *  订单明细》订单详情
 * @param resDate
 * @param domain
 * @returns {*}
 */
export function findBuyerOrderDetails (orderCode) {
  return http({
    url: '/trade/information/findBuyerOrderDetails',
    method: 'get',
    params: {'orderCode':orderCode}
  })
}
/**
 * 异步验证仓库名称是否存在
 * @param resDate
 * @param domain
 * @returns {*}
 */
export function toCheckNameExists (warehouseName,warehouseId) {
  return http({
    url: '/trade/information/toCheckCodeNameExists',
    method: 'get',
    params: {
      'warehouseName':warehouseName,
      'warehouseId':warehouseId,
    }
  })
}
/**
 *  异步验证仓库编码是否存在
 * @param resDate
 * @param domain
 * @returns {*}
 */
export function toCheckCodeExists (warehouseCode,warehouseId) {
  return http({
    url: '/trade/information/toCheckCodeNameExists',
    method: 'get',
    params: {
      'warehouseCode':warehouseCode,
      'warehouseId':warehouseId,
    }
  })
}
