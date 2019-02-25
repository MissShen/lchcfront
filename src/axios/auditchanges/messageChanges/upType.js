import http from "../../http";

// 获取转产类型， 下拉属性列表
export function findByOperatorType(resData) {
  return http({
    url: '/auditchanges/upType/findByOperatorType',
    method: 'get',
    params: {
      'operatorType': 3
    }
  })
}
