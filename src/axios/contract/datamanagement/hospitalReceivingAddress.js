import http from 'src/axios/http'

//  医院收货地址列表查询
export function queryHospitalReceivingAddressList (resData, query) {
  return http({
    url: 'contract/hospitalReceivingAddress/queryHospitalReceivingAddressList',
    method: 'get',
    params: {
      "orderBy": resData.orderBy,
      "pageNum" : resData.pageNum,
      "pageSize" : resData.pageSize,
      "city": query.city,
      "region": query.region,
      "address" : query.address,
      "hosName" : query.hosName
    }
  })
}
