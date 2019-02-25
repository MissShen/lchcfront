/**
 * @company 国药国华网络科技有限公司
 * @author  李晓阳
 * @create 2018-05-23 16:29
 * @desc
 **/
import http from "../../http";

//查询医院遴选情况
export function findSelectHospitalInfo(resData, queryData) {
  return http({
    url: '/supervision/select/findSelectHospitalInfo',
    method: 'post',
    data: {
      "pageNum": resData.pageNum,
      "pageSize": resData.pageSize,
      "hosName": queryData.hosName,
      "areaId": queryData.areaId,
      "areaId": queryData.areaId,
      "hosLevel": queryData.hosLevel,
      "hosKind": queryData.hosKind,
      "thisCatalogFilter": queryData.thisCatalogFilter,
      "thisCatalogNum": queryData.thisCatalogNum,
      "selectSendFilter": queryData.selectSendFilter,
      "selectSendNum": queryData.selectSendNum,
      "signContractFilter": queryData.signContractFilter,
      "signContractNum": queryData.signContractNum,
    }
  })
}

export function downloadHospitalSelectInfo(resData, queryData) {
  return http({
    url: '/supervision/select/downloadHospitalSelectInfo',
    method: 'post',
    responseType: 'blob',// 表明返回服务器返回的数据类型
    use: 'all',
    data: {
      "pageNum": resData.pageNum,
      "pageSize": resData.pageSize,
      "hosName": queryData.hosName,
      "areaId": queryData.areaId,
      "areaId": queryData.areaId,
      "hosLevel": queryData.hosLevel,
      "hosKind": queryData.hosKind,
      "thisCatalogFilter": queryData.thisCatalogFilter,
      "thisCatalogNum": queryData.thisCatalogNum,
      "selectSendFilter": queryData.selectSendFilter,
      "selectSendNum": queryData.selectSendNum,
      "signContractFilter": queryData.signContractFilter,
      "signContractNum": queryData.signContractNum,
    }
  })
}

//查询医院遴选查询条件
export function findHospitalQueryCondition() {
  return http({
    url: '/supervision/select/findHospitalQueryCondition',
    method: 'get'
  })
}

//查询配送遴选信息
export function findSelectSendInfo(orgName) {
  return http({
    url: '/supervision/select/findSelectSendInfo',
    method: 'get',
    params: {
      orgName
    }
  })
}

//下载配送遴选情况接口
export function downloadSendSelectInfo(orgName) {
  return http({
    url: '/supervision/select/downloadSendSelectInfo',
    method: 'get',
    responseType: 'blob',// 表明返回服务器返回的数据类型
    use: 'all',
    params: {
      orgName
    }
  })
}

//查询产品遴选信息
export function findSelectProductInfo(resData, queryData) {
  return http({
    url: '/supervision/select/findSelectProductInfo',
    method: 'get',
    params: {
      "pageNum": resData.pageNum,
      "pageSize": resData.pageSize,
      'orgName': queryData.orgName,
      'productName': queryData.productName,
    }
  })
}

//下载产品遴选信息
export function downloadProductSelectInfo(resData, queryData) {
  return http({
    url: '/supervision/select/downloadProductSelectInfo',
    method: 'get',
    responseType: 'blob',// 表明返回服务器返回的数据类型
    use: 'all',
    params: {
      "pageNum": resData.pageNum,
      "pageSize": resData.pageSize,
      'orgName': queryData.orgName,
      'productName': queryData.productName,
    }
  })
}
