import http from 'src/axios/http'

/**
 * 待处理订单列表查询
 * @param resData
 * @param domain
 * @returns {*}
 */
export function selectTodoList (resData,domain) {
  return http({
    url: '/trade/orderController/getTodoList',
    method: 'get',
    params: {
      searchOrderState:domain.searchOrderState,
      commHospital:domain.commHospital,
      degreeFlag:domain.degreeFlag,
      searchName:domain.searchName,
      searchCode:domain.searchCode,
      beginTime:domain.beginTime,
      endTime:domain.endTime
    }
  })
}

