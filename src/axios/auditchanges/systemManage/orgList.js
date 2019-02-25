import http from 'src/axios/http'

/**
 * 请求后台 转出确认列表 参数详见 params
 * @param resData 分页
 * @param queryData 表单数据
 * @returns {*}
 */
export function getAllBuyer(resData, queryData) {

  console.log(resData.pageSize+"------"+resData.pageNum)
  return http({
    url: '/auditchanges/audingManage/getAllBuyer',
    method: 'get',
    params: {'pageNum': resData.pageNum,
            'pageSize': resData.pageSize,
             'name':queryData.name,
      'createCode':queryData.createCode,
      'organizeCode':queryData.organizeCode
  }
  })
}

export function getAllSender(resData, queryData) {

  console.log(resData.pageSize+"------"+resData.pageNum)
  return http({
    url: '/auditchanges/audingManage/getAllSender',
    method: 'get',
    params: {'pageNum': resData.pageNum,
      'pageSize': resData.pageSize,
      'name':queryData.name,
      'createCode':queryData.createCode,
      'organizeCode':queryData.organizeCode
    }
  })
}
