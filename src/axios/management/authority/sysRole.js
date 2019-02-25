import http from 'src/axios/http'


/**
 * 角色列表
 *
 * @param resData  分页数据
 * @param queryData 查询数据
 * @author: JiaHaiGang
 * @date: 2018/3/13 14:39
 */
export function roleList(resData, queryData) {
  return http({
    url: '/management/role/list',
    method: 'get',
    params: {
      'searchNameCode': queryData.searchNameCode,
      'beginDate': queryData.beginDate,
      'endDate': queryData.endDate,
      'pageNum': resData.pageNum,
      'pageSize': resData.pageSize
    }
  })
}


/**
 * 查看角色
 *
 * @param id 角色id
 * @author: JiaHaiGang
 * @date: 2018/3/13 14:53
 */
export function roleView(id) {
  return http({
      url: '/management/role/view',
      method: 'get',
      params: {'id': id}
    }
  )
}


/**
 *  新增角色
 *
 * @param sysRole 角色
 * @author: JiaHaiGang
 * @date: 2018/3/13 14:53
 * @return:
 */
export function roleSave(sysRole) {
  return http({
      url: '/management/role/save',
      method: 'post',
      data: sysRole
    }
  )
}


/**
 * 修改角色
 *
 * @param sysRole 角色
 * @author: JiaHaiGang
 * @date: 2018/3/13 14:53
 */
export function roleUpdate(sysRole) {
  return http({
      url: '/management/role/update',
      method: 'put',
      data: sysRole
    }
  )
}


/**
 * 删除角色
 *
 * @param id 角色id
 * @author: JiaHaiGang
 * @date: 2018/3/13 14:39
 */
export function roleDelete(id) {
  return http({
      url: '/management/role/delete',
      method: 'delete',
      params: {'id': id}
    }
  )
}


/**
 * 角色类型枚举列表
 *
 * @author: JiaHaiGang
 * @date: 2018/3/20 15:32
 */
export function enumRoleTypeList() {
  return http({
      url: '/management/common/enumRoleType',
      method: 'get',
    }
  )
}


// ------------------------------------- 角色 资源 ---------------------------------------------


/**
 * 获取操作用户的资源列表
 *
 * @author: JiaHaiGang
 * @date: 2018/3/22 13:46
 */
export function userResourceList() {
  return http({
      url: '/management/role/resource/list',
      method: 'get',
    }
  )
}


/**
 * 角色拥有的资源id列表
 *
 * @param id 角色id
 * @author: JiaHaiGang
 * @date: 2018/3/22 13:46
 * @return:
 */
export function roleResourceList(id) {
  return http({
      url: '/management/role/resource/has/list',
      method: 'get',
      params: {'id': id}
    }
  )
}

/**
 * 角色分配菜单
 *
 * @param rid 角色id
 * @param idStr 资源id使用逗号拼接的字符串
 * @author: JiaHaiGang
 * @date: 2018/3/21 13:21
 */
export function roleResourceSave(idStr, rid) {
  return http({
      url: '/management/role/resource/save',
      method: 'post',
      data: {'idStr': idStr, 'rid': rid}
    }
  )
}

// ------------------------------------ 角色类型   - 消息类型 -----------------------------------------

export function roleTypeMsgTypeDefaultList(roleType) {
  return http({
      url: '/management/role/type/messageType/default/list',
      method: 'get',
      params: {roleType: roleType}
    }
  )
}

export function roleTypeMsgTypeHasList(roleType) {
  return http({
      url: '/management/role/type/messageType/has/list',
      method: 'get',
      params: {roleType: roleType}
    }
  )
}

export function roleTypeMessageTypeSave(idStr, roleType) {
  return http({
      url: '/management/role/type/messageType/save',
      method: 'post',
      data: {idStr: idStr, roleType: roleType}
    }
  )
}// ------------------------------------ 角色  -   消息类型 -----------------------------------------

export function roleMsgTypeDefaultList(rid) {
  return http({
      url: '/management/role/messageType/default/list',
      method: 'get',
      params: {rid: rid}
    }
  )
}

export function roleMsgTypeHasList(rid) {
  return http({
      url: '/management/role/messageType/has/list',
      method: 'get',
      params: {rid: rid}
    }
  )
}

export function roleMessageTypeSave(idStr, rid) {
  return http({
      url: '/management/role/messageType/save',
      method: 'post',
      data: {idStr: idStr, rid: rid}
    }
  )
}
