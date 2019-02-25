import http from 'src/axios/http'

/**
 * 获得产品列表
 *
 */
export function getProductList(resData, queryData) {
  return http({
    url: '/management/unLogin/shoppingGuide/getProductList',
    method: 'get',
    params: {
      'productName': queryData.name,
      'pageNum': resData.pageNum,
      'pageSize': resData.pageSize
    }
  })
}

/**
 * 获得医院列表
 *
 */
export function getHosList(resData, queryData) {
  return http({
    url: '/management/unLogin/shoppingGuide/getHosList',
    method: 'get',
    params: {
      'productId': queryData.productId,
      'hosName': queryData.hosName,
      'pageNum': resData.pageNum,
      'pageSize': resData.pageSize
    }
  })
}

/**
 * 获取图片id
 *
 */
export function findImageIdByProductId(productId) {
  return http({
    url: '/management/unLogin/shoppingGuide/findImageIdByProductId',
    method: 'get',
    params: {
      productId
    }
  })
}

/**
 * 获取图片base64编码
 *
 */
export function findBase64Code(fileId) {
  return http({
    url: '/auditchanges/filemanagement/downloadBase64File',
    method: 'get',
    params: {
      fileId
    }
  })
}

/**
 * 互动答疑列表
 */
export function unLoginFaqList() {
  return http({
    url: '/management/unLogin/faq/list',
    method: 'get',
  })
}
