import http from 'src/axios/http'
/**
 * @discription 查询药品基础数据库
 * @author liuyanfei
 * @date 2018/3/21
 */
export function queryBasicDrugDataList (resData,domain) {
  return http({
    url: 'contract/basicDrugData/queryBasicDrugDataList',
    method: 'get',
    params: {
      "pageNum" : resData.pageNum,
      "pageSize" : resData.pageSize,
      "orderBy": resData.orderBy,
      "productName":domain.productName,
      "manufactureName":domain.manufactureName,
      "basicFlag":domain.basicFlag,
      "resState":domain.resState,
      "twoVote":domain.twoVote,
      "purchaseState":domain.purchaseState,
      "doseageFormName":domain.doseageFormName,
      "spec":domain.spec,
      "catalogArea":domain.catalogArea,
      "reportState":domain.reportState
    }
  })
}

export function showSettingHttp() {
  return http({
    url: 'contract/basicDrugData/isAdmin',
    method: 'get'
  })
}

export function querySysCatalog () {
  return http({
    url: 'contract/basicDrugData/querySysCatalog',
    method: 'get'
  })
}

export function deleteBatchPurchaseList(ids) {
  return http({
      url: 'contract/basicDrugData/deleteBatchPurchaseList',
      method: 'delete',
      params: {'ids': ids.toString()}
    }
  )
}

export function findSelectionHos(id,showHosDataQuery,showHosData,flag) {
  return http({
      url: 'contract/basicDrugData/getHospitalListById',
      method: 'get',
      params: {
        id: id,
        hosName:showHosDataQuery.name,
        hosLevel:showHosDataQuery.level,
        pageNum : showHosData.pageNum,
        pageSize : showHosData.pageSize,
        flag:flag
      }
    }
  )
}

export function findSendCompany(id,showCompanyDataQuery,showCompany) {
  return http({
      url: 'contract/basicDrugData/getSenderListById',
      method: 'get',
      params: {
        id: id,
        senderName:showCompanyDataQuery.name,
        pageNum : showCompany.pageNum,
        pageSize : showCompany.pageSize

      }
    }
  )
}

export function addPurchaseListHttp(ids){
  return http({
      url: 'contract/basicDrugData/insertBatchPurchaseList',
      method: 'post',
      params: {'ids':ids.toString()}
    }
  )
}
//插入加入备选议价
export function insertAlternativeBargainingHttp(productIds,AlternativeBargainingText){
  return http({
      url: 'contract/basicDrugData/insertAlternativeBargaining',
      method: 'post',
      params: {
        'productIds':productIds.toString(),
        'remarks':AlternativeBargainingText.textarea
      }
    }
  )
}
//删除备选议价
export function delAlternativeBargainingHttp(productIds){
  return http({
      url: 'contract/basicDrugData/delAlternativeBargaining',
      method: 'delete',
      params: {
        'productIds':productIds.toString()
      }
    }
  )
}
//客观分详细
export function scoreDetailedHttp(productId){
  return http({
      url: 'contract/basicDrugData/findScoreDetailed',
      method: 'get',
      params: {
        'productId':productId
      }
    }
  )
}

//议价详情
export function bargainingDetailsHttp(productId,bargainingDetailsData,domain){
  return http({
      url: 'contract/basicDrugData/findBargainingDetails',
      method: 'get',
      params: {
        'productId':productId,
        orderBy: bargainingDetailsData.orderBy,
        pageNum : bargainingDetailsData.pageNum,
        pageSize : bargainingDetailsData.pageSize,
        name : domain.name,
        ordCount : domain.ordCount
      }
    }
  )
}

export function BasicDrugDataExportExcel (resDate,domain) {
  return http({
    url: 'contract/basicDrugData/BasicDrugDataExportExcel',
    responseType: 'blob',// 表明返回服务器返回的数据类型
    use: 'all',
    method: 'get',
    params: {
      "total" : resDate.total,
      "productName":domain.productName,
      "manufactureName":domain.manufactureName,
      "basicFlag":domain.basicFlag
    }
  })
}

export function checkAgreementSignedHttp () {
  return http({
      url: 'contract/basicDrugData/checkAgreementSigned',
      method: 'get',
      params: {
      }
    }
  )
}


/**
 * 签订
 * @param id
 * @param dataForm
 */
export function insertSigned (id, dataForm) {
  return http({
    url: 'contract/basicDrugData/signedCommitment',
    method: 'post',
    data: {
      "id": id,
      "strRandom" : dataForm.strRandom,
      "userCert" : dataForm.userCert,
      "userSignedData" : dataForm.userSignedData,
      "containerName" : dataForm.containerName,
      "imgUrl" : dataForm.imgUrl
    }
  })

}
