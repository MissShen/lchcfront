import http from 'src/axios/http'

//  维护议价目录列表
export function queryMaintainBargainListHttp (resData, query) {
  return http({
    url: 'contract/maintainBargainList/queryMaintainBargainList',
    method: 'get',
    params: {
      "orderBy" : resData.orderBy,
      "pageNum": resData.pageNum,
      "pageSize": resData.pageSize,
      "productName":query.productName,
      "manufactureName":query.manufactureName,
      "bidFlag":query.sources
    }
  })
}

//  设定议价时间
export function updateBargainTimeHttp (time) {
  return http({
    url: 'contract/maintainBargainList/updateBargainTime',
    method: 'put',
    params: {'time': time.toString()}
  })
}
//移除
export function removeBargainHttp (id) {
  return http({
    url: 'contract/maintainBargainList/updateObjectId',
    method: 'put',
    params: {'id': id}
  })
}

export function insertBargainHttp () {
  return http({
    url: 'contract/maintainBargainList/updateJoinObjectId',
    method: 'put',
    params: {}
  })
}

export function deleteBargainHttp (id) {
  return http({
    url: 'contract/maintainBargainList/deleteBargainById',
    method: 'delete',
    params: {'id': id}
  })
}

export function updateRenewBargain (id,time) {
  return http({
    url: 'contract/maintainBargainList/updateRenewBargain',
    method: 'put',
    params: {
      'id': id,
      'time': time.toString()
    }
  })
}
  export function confirmHttp (id) {
    return http({
      url: 'contract/maintainBargainList/confirm',
      method: 'put',
      params: {
        'id': id
      }
    })
  }

  export function refuseHttp (id) {
    return http({
      url: 'contract/maintainBargainList/refuse',
      method: 'put',
      params: {
        'id': id
      }
    })
  }

/**
 * 维护议价目录列表
 * @author liuyanfei
 * @date 2018/6/29
 * @returns {*}
 */
export function bargainExcel (resData, query) {
  return http({
    url: 'contract/maintainBargainList/queryMaintainBargainListExcel',
    method: 'get',
    responseType: 'blob',// 表明返回服务器返回的数据类型
    use: 'all',
    params: {
      "total" : resData.total,
      "productName":query.productName,
      "manufactureName":query.manufactureName,
      "bidFlag":query.sources
    }
  })
}

export function invalidProductHttp(id) {
  return http({
    url: 'contract/maintainBargainList/updateInvalidProduct',
    method: 'put',
    params: {
      'id': id
    }
  })
}

export function selectRemarkHttp(id) {
  return http({
    url: 'contract/maintainBargainList/findSelectRemark',
    method: 'get',
    params: {
      'id': id
    }
  })
}

export function queryBasicModelList(resData,domain) {
  return http({
    url: 'contract/maintainBargainList/queryBasicModelList',
    method: 'get',
    params: {
      "pageNum" : resData.pageNum,
      "pageSize" : resData.pageSize,
      "orderBy": resData.orderBy,
      "productName":domain.productName,
      "spec":domain.spec,
      "doseageFormName":domain.doseageFormName,
      "manufactureName":domain.manufactureName,
      "catalogArea":domain.catalogArea,
      "twoVote":domain.twoVote,
      "healthFlag":domain.healthFlag,
      "basicFlag":domain.basicFlag,
      "hosCon":domain.hosCon
      /*"purchaseState":domain.purchaseState*/
    }
  })
}

export function renegotiationHttp(id) {
  return http({
    url: 'contract/maintainBargainList/renegotiation',
    method: 'post',
    params: {
      'id': id
    }
  })
}

export function bargainHospitalPrice(productId) {
  return http({
    url: 'contract/maintainBargainList/findBargainHospitalPriceById',
    method: 'get',
    params: {
      'productId': productId
    }
  })
}

export function bargainCueHttp(productId) {
  return http({
    url: 'contract/maintainBargainList/bargainCue',
    method: 'get',
    params: {
      'productId': productId
    }
  })
}
