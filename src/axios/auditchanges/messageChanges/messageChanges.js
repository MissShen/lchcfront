import http from 'src/axios/http'

/**
 * 请求后台 转出确认列表 参数详见 params
 * @param resData 分页
 * @param queryData 表单数据
 * @returns {*}
 */
export function messageList(resData, queryData) {
  return http({
    url: '/auditchanges/messageChanges/getMessageListByQuery',
    method: 'get',
    params: {
      'pageNum': resData.pageNum,
      'pageSize': resData.pageSize,
      'requestCode': queryData.requestCode,
      'UpTypeId': queryData.UpTypeId
    }
  })
}

export function getUpdateType() {
  return http({
    url: '/auditchanges/upType/getUpdateType',
    method: 'get',

  })
}

export function getProduct() {
  return http({
    url: '/auditchanges/upProductTransferInfo/list',
    method: 'get',
    params: {
      'pageNum': resData.pageNum,
      'pageSize': resData.pageSize,
      'requestCode': queryData.requestCode,
      'UpTypeId': queryData.UpTypeId
    }
  })
}
