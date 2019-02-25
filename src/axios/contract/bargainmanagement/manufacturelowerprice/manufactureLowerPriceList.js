import http from 'src/axios/http'

/**
 * 主动降价议价
 * @author zhangchen
 * @date 2018/4/25
 * @returns {*}
 */
export function manufactureLowerPriceList (resData,domain) {
  return http({
    url: 'contract/manufactureLowerPriceResult/manufactureLowerPriceList',
    method: 'get',
    params: {
      "orderBy" : resData.orderBy,
      "pageNum" : resData.pageNum,
      "pageSize" : resData.pageSize,
      "doseageFormName" : domain.doseageFormName,
      "productName" : domain.productName,
      "spec" : domain.spec
    }
  })
}

/**
 * 查询降价产品列表
 * @author zhangchen
 * @date 2018/4/26
 * @returns {*}
 */
export function queryReducedPriceList (resData,domain) {
  return http({
    url: 'contract/manufactureLowerPriceResult/queryReducedPriceList',
    method: 'get',
    params: {
      "orderBy" : resData.orderBy,
      "pageNum" : resData.pageNum,
      "pageSize" : resData.pageSize,
      "doseageFormName" : domain.doseageFormName,
      "productName" : domain.productName,
      "spec" : domain.spec
    }
  })
}

//插入加入备选议价
export function insertReducedPriceHttp(productIds,upIds,reducedPriceDate){
  return http({
      url: 'contract/manufactureLowerPriceResult/insertReducedPrice',
      method: 'post',
      data: {
        'productIds':productIds.toString(),
        'upIds':upIds.toString(),
        'executeDate':reducedPriceDate.executeDate
      }
    }
  )
}

export function queryLowerPriceList (resData,domain) {
  return http({
    url: 'contract/manufactureLowerPriceResult/queryLowerPriceList',
    method: 'get',
    params: {
      "orderBy" : resData.orderBy,
      "pageNum" : resData.pageNum,
      "pageSize" : resData.pageSize,
      "doseageFormName" : domain.doseageFormName,
      "productName" : domain.productName,
      "spec" : domain.spec
    }
  })
}

//执行降价
export function insertPriceReductionHttp(priceReductionFrom){
  return http({
      url: 'contract/manufactureLowerPriceResult/insertPriceReduction',
      method: 'post',
      data: {
        'productId':priceReductionFrom.productId,
        'explain':priceReductionFrom.explain,
        'executeDate':priceReductionFrom.executeDate,
        'lastPrice' : priceReductionFrom.lastPrice
      }
    }
  )
}


//插入加入备选议价
export function insertBargainPriceReduction(bOrgIds,productIds){
  return http({
      url: 'contract/manufactureLowerPriceResult/insertBargainPriceReduction',
      method: 'post',
      data: {
        'productIds':productIds.toString(),
        'bOrgIds':bOrgIds.toString()
      }
    }
  )
}
