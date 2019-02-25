import http from 'src/axios/http'


/**
 * 机构类型枚举列表
 *
 * @author: JiaHaiGang
 * @date: 2018/3/20 15:31
 */
export function enumOrgTypeList() {
  return http({
      url: '/management/common/enumOrgType',
      method: 'get',
    }
  )
}


/**
 * 业务系统枚举列表
 *
 * @author: JiaHaiGang
 * @date: 2018/3/20 15:32
 */
export function enumBusSysList() {
  return http({
      url: '/management/common/enumBusSys',
      method: 'get',
    }
  )
}

/**
 * 机构列表
 *
 * @param resData 翻页数据
 * @param queryData 查询条件数据
 * @author: JiaHaiGang
 * @date: 2018/4/16 10:45
 */
export function catOrgList(resData, queryData) {
  return http({
      url: '/management/catOrg/list',
      method: 'get',
      params: {
        'pageNum': resData.pageNum,
        'pageSize': resData.pageSize,
        'name': queryData.searchName,
        'code': queryData.searchCode,
      }
    }
  )
}
