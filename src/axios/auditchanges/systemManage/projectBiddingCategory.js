import http from 'src/axios/http'



export function queryList (resData,query) {
  return http({
    url: '/auditchanges/projectBiddingCategory/list',
    method: 'get',
    params: {'pageNum': resData.pageNum,
             'pageSize': resData.pageSize,
             'searchName': query.searchName,
             'searchProjectId': query.searchProjectId
    }
  })
}

export function projectList () {
  return http({
    url: '/auditchanges/projectBiddingCategory/projectList',
    method: 'get',
  })
}

export function findById(id) {
  return http({
    url: '/auditchanges/projectBiddingCategory/findById',
    method: 'get',
    params: {'id': id}
  })
}

export function insert(dataForm) {
  return http({
    url: '/auditchanges/projectBiddingCategory/insert',
    method: 'post',
    params: {
             'catProjectId':dataForm.catProjectId,
             'categoryName':dataForm.categoryName,
             'remark':dataForm.remark
    }
  })
}

export function update(dataForm) {
  return http({
    url: '/auditchanges/projectBiddingCategory/update',
    method: 'put',
    params: {
      'id': dataForm.id,
      'catProjectId':dataForm.catProjectId,
      'categoryName':dataForm.categoryName,
      'remark':dataForm.remark
    }
  })
}

export function remove(id){
  return http({
    url: '/auditchanges/projectBiddingCategory/delete',
    method: 'delete',
    params: {
      'ids':id
    }
  })
}









/**
 * 用户管理 - 查询列表
 * @param pageNum 页码, pageSize 条数
 */
export function userList (resData, query) {
  return http({
    url: '/management/user/list',
    method: 'get',
    params: {'pageNum': resData.pageNum, 'pageSize': resData.pageSize}
  })
}

/**
 * 用户管理 - 新增用户
 * @param user 'add'新增用户
 */
export function userAdd (user) {
  return http({
    url: '/user/save',
    method: 'post',
    data: user
  })
}

/**
 * 用户管理 - 修改用户
 * @param user 修改用户
 */
export function userUpdate (user) {
  return http({
    url: '/user/update',
    method: 'put',
    data: user
  })
}

/**
 * 用户管理 - 删除用户
 * @param code 删除用户
 */
export function userDel (id) {
  return http({
    url: '/user/delete',
    method: 'delete',
    params: {id}
  })
}
