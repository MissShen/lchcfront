import http from 'src/axios/http'

/**
 * 消息分页列表
 */
export function messageList(pageNum, pageSize, queryData) {
  return http({
    url: '/management/message/list',
    method: 'get',
    params: {
      pageNum: pageNum,
      pageSize: pageSize,
      searchContent: queryData.searchContent,
      searchSystemCode: queryData.searchSystemCode,
      searchBeginDate: queryData.searchBeginDate,
      searchEndDate: queryData.searchEndDate,
      searchReadFlag: queryData.searchReadFlag,
      receiveOrgId: queryData.orgId,
      receiveRoleIdList: queryData.roleIdList
    }
  })
}

export function messageChangeList(pageNum) {
  return http({
    url: '/management/message/change/list',
    method: 'get',
    loading: false,
    params: {
      pageNum: pageNum,
      pageSize: 4,
    }
  })
}


/**
 * 管理中心首页消息列表
 */
export function userMessageList(pageNum, pageSize, queryData) {
  return http({
    url: '/management/message/user/list',
    method: 'get',
    params: {
      pageNum: pageNum,
      pageSize: pageSize,
      searchSystemName: queryData.searchSystemName,
      searchReadFlag: queryData.searchReadFlag,
    }
  })
}

/**
 * 管理中心首页公示消息列表
 * @param day 展示最近的天数
 */
export function noticeMessageList(day) {
  return http({
    url: '/management/message/notice/list',
    method: 'get',
    params: {
      day: day
    }
  })
}

/**
 *  根据ID删除消息
 * @param id
 */
export function messageDelete(id) {
  return http({
    url: '/management/message/delete',
    method: 'delete',
    params: {
      id: id
    }
  })
}

/**
 * 更新消息为已读状态
 * @param messageId
 * @param roleIds
 * @param receiveOrgId
 * @returns {*}
 */
export function updateMessageIsRead(messageId, roleIds, receiveOrgId) {
  return http({
    url: '/rabbitmq/message/updateReadFlag',
    method: 'get',
    params: {
      messageId,
      roleIds,
      receiveOrgId
    }
  })
}

/**
 * 获取ip地址与端口号
 * @returns {*}
 */
export function getIpAndPort() {
  return http({
    url: '/rabbitmq/message/getIpAndPort',
    method: 'get',
  })
}

/**
 * 分页查询
 * @param resData
 * @param queryData
 * @returns {*}
 */
export function messageTypeList(resData, queryData) {
  return http({
    url: '/management/sysMessageType/list',
    method: 'get',
    params: {
      'msgTypeName': queryData.searchName,
      'msgTypeCode': queryData.searchCode,
      'systemCode': queryData.systemUnicode,
      'pageNum': resData.pageNum,
      'pageSize': resData.pageSize
    }
  })
}

export function findMessageTypeByTypeId(id) {
  return http({
    url: '/management/sysMessageType/findById',
    method: 'get',
    params: {
      id
    }
  })
}

export function messageTypeAdd(dataForm) {
  return http({
    url: '/management/sysMessageType/insertSysMessageType',
    method: 'put',
    params: {
      ...dataForm
    }
  })
}

export function messageTypeEdit(dataForm) {
  return http({
    url: '/management/sysMessageType/updateSysMessageType',
    method: 'put',
    params: {
      ...dataForm
    }
  })
}

export function messageTypeDelete(ids) {
  return http({
    url: '/management/sysMessageType/deleteSysMessageTypeByIds',
    method: 'delete',
    params: {
      ids
    }
  })
}
