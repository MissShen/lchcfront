import http from 'src/axios/http'

/**
 * 测试新增/修改
 * @param resData
 * @param query
 * @returns {*}
 */
export function testSave (resData,query) {
  return http({
    url: '/trade/test/insertTest',
    method: 'get',
    params: {'pageNum': resData.pageNum, 'pageSize': resData.pageSize}
  })
}

/**
 * 测试列表
 * @param resData
 * @param query
 * @returns {*}
 */
export function testList (resData,query) {
  return http({
    url: '/trade/test/queryTestList',
    method: 'get',
    params: {
      'id' : query.id,
      'name': query.name,
      'pageNum': resData.pageNum,
      'pageSize': resData.pageSize
    }
  })
}


export function testDelete(id) {
  return http({
    url: '/trade/test/deleteTestById',
    method: 'delete',
    params: {'id': id}
  })
}


export function testUpdate(test) {
  return http({
    url: '/trade/test/updateTest',
    method: 'put',
    data: test
  })
}

/**
 * 测试新增/修改
 * @param resData
 * @param query
 * @returns {*}
 */
export function testInfo (id) {
  return http({
    url: '/trade/test/findTestById',
    method: 'get',
    params: {'id': id}
  })
}

/**
 * 测试新增/修改
 * @param resData
 * @param query
 * @returns {*}
 */
export function testEdit (id) {
  return http({
    url: '/trade/test/queryTestEdit',
    method: 'get',
    params: {'id': id}
  })
}


export function testView(id) {
  return http({
    url: '/trade/test/findTestById',
    method: 'get',
    params: {'id': id}
  })
}
