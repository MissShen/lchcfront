import http from 'src/axios/http'

//  医院收货地址列表查询
export function queryHospitalAddressList (resData, query,value) {
  return http({
    url: 'contract/catDeliveryAddress/queryCatDeliveryAddressList',
    method: 'get',
    params: {
      "orderBy": resData.orderBy,
      "pageNum": resData.pageNum,
      "pageSize": resData.pageSize,
      "address" : query.address,
      "buyerId" : value
    }
  })
}

//  医院下级机构收货地址列表查询
export function queryHospitalSubsidiariesAddressList (resData, query) {
  return http({
    url: 'contract/catDeliveryAddress/queryHospitalSubsidiariesAddressList',
    method: 'get',
    params: {
      "orderBy": resData.orderBy,
      "pageNum": resData.pageNum,
      "pageSize": resData.pageSize,
      "orgName" : query.orgName
    }
  })
}

/**
 * 根据Id查询
 * @param resData
 * @param id
 * @returns {*}
 */
export function queryHospitalAddress (id) {
  return http({
    url: 'contract/catDeliveryAddress/findById',
    method: 'get',
    params: {
      "id" : id
    }
  })
}

/**
 * 新增收货地址
 * @param dataForm
 * @returns {*}
 */
export function addHospitalAddress (dataForm,buyerId) {
  return http({
    url: 'contract/catDeliveryAddress/saveCatDeliveryAddress',
    method: 'post',
    params: {
      'receivers' : dataForm.receivers,
      "id" : dataForm.id,
      'city' : dataForm.city,
      'area' : dataForm.area,
      'mobile' : dataForm.mobile,
      'address' : dataForm.address,
      'defaultFlag' : dataForm.defaultFlag,
      'addressAbbr' : dataForm.addressAbbr,
      'buyerId' : buyerId
    }
  })
}

/**
 * 更新收货地址
 * @param dataForm
 * @returns {*}
 */
export function updateHospitalAddress (dataForm,buyerId) {
  return http({
    url: 'contract/catDeliveryAddress/updateCatDeliveryAddress',
    method: 'put',
    params: {
      'id' : dataForm.id,
      'receivers' : dataForm.receivers,
      'city' : dataForm.city,
      'area' : dataForm.area,
      'mobile' : dataForm.mobile,
      'address' : dataForm.address,
      'defaultFlag' : dataForm.defaultFlag,
      'addressAbbr' : dataForm.addressAbbr,
      'buyerId' : buyerId
    }
  })
}

/**
 * 删除收货地址
 * @param dataForm
 * @returns {*}
 */
export function deleteHospitalAddress (id) {
  return http({
    url: 'contract/catDeliveryAddress/deleteCatDeliveryAddress',
    method: 'delete',
    params: {
      'id' : id
    }
  })
}

/**
 * 下拉列表内容查询
 * @param resDate
 * @param query
 * @returns {*}
 */
export function findByParentId (parentId) {
  return http({
    url: 'contract/catSendRegion/findByParentId',
    method: 'get',
    params: {
      "parentId" : parentId
    }
  })
}

/**
 * 查询是否存在上下级
 * @returns {*}
 */
export function queryIsApproveConfig() {
  return http({
    url: 'contract/catDeliveryAddress/findIsApproveConfig',
    method: 'get',
    params: {
    }
  })
}

/**
 * 查询详细地址是否重复
 * @returns {*}
 */
export function checkAddress(address,id,city,area,buyerId) {
  return http({
    url: 'contract/catDeliveryAddress/checkAddress',
    method: 'get',
    params: {
      'id' : id,
      'address' : address,
      'city' : city,
      'region' : area,
      'buyerId' : buyerId
    }
  })
}

/**
 * 查询是否设置默认地址
 * @returns {*}
 */
export function checkDefaultAddress(value,id,buyerId) {
  return http({
    url: 'contract/catDeliveryAddress/checkParam',
    method: 'get',
    params: {
      'id' : id,
      'buyerId' : buyerId,
      'defaultFlag' : value
    }
  })
}

/**
 * 查询地址简称是否重复
 * @returns {*}
 */
export function checkAddressAbbr(addressAbbr,id,buyerId) {
  return http({
    url: 'contract/catDeliveryAddress/checkAddressAbbr',
    method: 'get',
    params: {
      'id' : id,
      'addressAbbr' : addressAbbr,
      'buyerId' : buyerId
    }
  })
}

/**
 * 禁用启用收货地址
 * @param dataForm
 * @returns {*}
 */
export function updateCatDeliveryAddressState(id,state) {
  return http({
    url: 'contract/catDeliveryAddress/updateCatDeliveryAddressState',
    method: 'put',
    params: {
      "id" : id,
      "states" : state
    }
  })
}

