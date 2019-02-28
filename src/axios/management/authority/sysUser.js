import http from 'src/axios/http'


/**
 * 获取用户列表
 *
 * @param resData 分页数据
 * @param queryData 查询数据
 * @author:
 * @date: 2018/3/27 20:15
 * @return:
 */
export function userList(resData, queryData) {
  return http({
    url: '/management/user/list',
    method: 'get',
    params: {
      'searchNameCode': queryData.searchNameCode,
      'searchOrgName': queryData.searchOrgName,
      'searchOpenId': queryData.searchOpenId,
      'searchCaKey': queryData.searchCaKey,
      'beginDate': queryData.beginDate,
      'endDate': queryData.endDate,
      'pageNum': resData.pageNum,
      'pageSize': resData.pageSize
    }
  })
}

/**
 * 查看用户
 *
 * @param id 用户id
 * @author:
 * @date: 2018/3/13 19:05
 * @return:
 */
export function userView(id) {
  return http({
    url: '/management/user/view',
    method: 'get',
    params: {'id': id}
  })
}


/**
 * 新增用户
 *
 * @param sysUser 用户
 * @author:
 * @date: 2018/3/13 19:05
 */
export function userSave(sysUser) {
  return http({
    url: '/management/user/save',
    method: 'post',
    data: sysUser
  })
}

export function userAdd(sysUser) {
  return http({
    url: '/management/user/save',
    method: 'post',
    data: sysUser
  })
}

/**
 * 修改用户
 *
 * @param sysUser 用户
 * @author:
 * @date: 2018/3/13 19:06
 */
export function userUpdate(sysUser) {
  return http({
    url: '/management/user/update',
    method: 'put',
    data: sysUser
  })
}


/**
 * 删除用户
 *
 * @param id 用户id
 * @author:
 * @date: 2018/3/13 19:02
 */
export function userDel(id) {
  return http({
    url: '/management/user/delete',
    method: 'delete',
    params: {'id': id}
  })
}


//------------------------------------- 用户 角色 --------------------------------------------------

/**
 * 查询用户的角色列表
 *
 * @param id 用户id
 * @author:
 * @date: 2018/3/14 9:50
 */
export function userRoleList(id) {
  return http({
    url: '/management/user/role/list',
    method: 'get',
    params: {'id': id}
  })
}

/**
 * 获取用户分配角色默认列表
 *
 * @param id 用户id
 * @param resData 分页数据
 * @author:
 * @date: 2018/3/19 19:13
 * @return:
 */
export function userRoleDefaultList(resData, id) {
  return http({
    url: '/management/user/role/default/list',
    method: 'get',
    params: {
      'id': id,
      'pageNum': resData.pageNum,
      'pageSize': resData.pageSize
    }
  })
}


/**
 * 保存用户角色
 *
 * @param ridStr 角色id使用逗号拼接的字符串
 * @param uid 用id
 * @author:
 * @date: 2018/3/21 9:54
 */
export function userRoleSave(ridStr, uid) {
  return http({
    url: '/management/user/role/save',
    method: 'post',
    data: {'ridStr': ridStr, 'uid': uid}
  })
}

// -------------------------------------------------- 用户个人 ----------------------------------------------------------

/**
 * 登录用户个人信息
 *
 * @author:
 * @date: 2018/4/16 9:49
 */
export function userInfo() {
  return http({
    url: '/management/user/info',
    method: 'get',
  })
}

/**
 * 查看图像
 *
 * @author:
 * @date: 2018/5/8 9:49
 */
export function userPhoto(dataForm) {
  return http({
    url: '/management/user/findPhoto',
    method: 'post',
    params: {
      'userId': dataForm.id,
    }
  })
}

/**
 *  用户重置密码
 *
 * @param dataForm 表单
 * @author:
 * @date: 2018/4/16 9:50
 * @return:
 */
export function changePwd(dataForm) {
  return http({
    url: '/management/user/pwd',
    method: 'post',
    params: {
      'password': dataForm.password,
      'newPwd': dataForm.newPwd
    }
  })
}
