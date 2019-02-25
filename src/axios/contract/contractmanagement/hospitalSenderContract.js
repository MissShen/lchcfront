import http from 'src/axios/http'

/**
 * 医院配送签订协议
 * @param contractId
 */
export function signContract (contractId, dataForm) {
  return http({
    url: 'contract/hospitalSenderContract/signContract',
    method: 'post',
    data: {
      "contractId" : contractId,
      "strRandom" : dataForm.strRandom,
      "userCert" : dataForm.userCert,
      "userSignedData" : dataForm.userSignedData,
      "containerName" : dataForm.containerName,
      "imgUrl" : dataForm.imgUrl
    }
  })
}
