/**
 * @company 国药国华网络科技有限公司
 * @author  李晓阳
 * @create 2018-05-21 16:07
 * @desc 药品流向js
 **/

import http from "../../http";

//根据产品名称模糊查询产品列表
export function findByProductName(productName) {
  return http({
    url: '/supervision/drugFlow/findByProductName',
    method: 'get',
    params: {
      productName
    }
  })
}

//根据产品名称模糊查询产品名称列表
export function findProductNamesByProductName(productName) {
  return http({
    url: '/supervision/drugFlow/findProductNamesByProductName',
    method: 'get',
    params: {
      productName
    }
  })
}

//根据Id查询产品信息
export function findProductInfoById(productId) {
  return http({
    url: '/supervision/drugFlow/findProductInfoById',
    method: 'get',
    params: {
      productId
    }
  })
}

//根据产品Id查询资审信息
export function findQualificationInfoByProductId(productId) {
  return http({
    url: '/supervision/drugFlow/findQualificationInfoByProductId',
    method: 'get',
    params: {
      productId
    }
  })
}

//根据产品Id查询遴选信息
export function findSelectInfoByProductId(productId) {
  return http({
    url: '/supervision/drugFlow/findSelectInfoByProductId',
    method: 'get',
    params: {
      productId
    }
  })
}

//根据产品Id查询采购交易信息
export function findPurchaseTradeInfoByProductId(productId,type) {
  return http({
    url: '/supervision/drugFlow/findPurchaseTradeInfoByProductId',
    method: 'get',
    params: {
      productId,
      type
    }
  })
}

//根据产品Id查询采购交易信息
export function findRequestAndSendOrgNumByProductId(productId) {
  return http({
    url: '/supervision/drugFlow/findRequestAndSendOrgNumByProductId',
    method: 'get',
    params: {
      productId
    }
  })
}
