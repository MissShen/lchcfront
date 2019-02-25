import http from 'src/axios/http'

//  查询当前机构列表
export function queryUnselectedProductList (resData, query) {
  return http({
    url: 'contract/commitmentSigned/queryUnselectedProductList',
    method: 'get',
    params: {
      "orderBy": resData.orderBy,
      'pageNum': resData.pageNum,
      'pageSize': resData.pageSize,
      'mechanismName':query.mechanismName
    }
  })
}

/**
 * 签订
 * @param id
 * @param dataForm
 */
export function insertSigned (dataForm) {
  return http({
    url: 'contract/commitmentSigned/insertSigned',
    method: 'post',
    data: {
      "strRandom" : dataForm.strRandom,
      "userCert" : dataForm.userCert,
      "userSignedData" : dataForm.userSignedData,
      "containerName" : dataForm.containerName,
      "imgUrl" : dataForm.imgUrl
    }
  })

}

//  查询承诺书
export function findCommitmentSignedById (id,orgType) {
  return http({
    url: 'contract/commitmentSigned/findCommitmentSignedById',
    method: 'get',
    params: {
      'id':id,
      'orgType':orgType
    }
  })
}

