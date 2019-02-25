import http from 'src/axios/http'


/**
 * 阳光讲堂栏目列表
 *
 * @param pageNum 当前页数
 * @param pageSize 每页页码
 * @param queryData 查询数据封装
 * @author: JiaHaiGang
 * @date: 2018/3/15 10:48
 */
export function leturesTypeList(pageNum, pageSize, queryData) {
  return http({
    url: '/management/letures/type/list',
    method: 'get',
    params: {
      searchLeturesTypeName: queryData.searchLeturesTypeName,
      searchLeturesTypeCode: queryData.searchLeturesTypeCode,
      pageNum: pageNum,
      pageSize: pageSize
    }
  })
}


/**
 * 阳光讲堂栏目不分页全列表
 *
 * @author: JiaHaiGang
 * @date: 2018/3/16 11:39
 */
export function leturesTypeAllList() {
  return http({
    url: '/management/letures/type/all/list',
    method: 'get',
  })
}

/**
 * 查看阳光讲堂栏目详情
 *
 * @param id 阳光讲堂栏目id
 * @author: JiaHaiGang
 * @date: 2018/3/15 10:50
 */
export function leturesTypeView(id) {
  return http({
    url: '/management/letures/type/view',
    method: 'get',
    params: {'id': id}
  })
}


/**
 * 新增阳光讲堂栏目
 *
 * @param sysLeturesType 阳光讲堂栏目
 * @author: JiaHaiGang
 * @date: 2018/3/15 10:51
 * @return:
 */
export function leturesTypeSave(sysLeturesType) {
  return http({
    url: '/management/letures/type/save',
    method: 'post',
    data: sysLeturesType
  })
}


/**
 * 修改阳光讲堂栏目
 *
 * @param sysLeturesType 阳光讲堂栏目
 * @author: JiaHaiGang
 * @date: 2018/3/15 10:51
 * @return:
 */

export function leturesTypeUpdate(sysLeturesType) {
  return http({
    url: '/management/letures/type/update',
    method: 'put',
    data: sysLeturesType
  })
}


/**
 * 批量删除阳光讲堂栏目
 *
 * @param leturesTypeIdList 阳光讲堂栏目列表
 * @author: JiaHaiGang
 * @date: 2018/3/15 11:57
 * @return:
 */
export function leturesTypeDelete(leturesTypeIdList) {
  return http({
    url: '/management/letures/type/delete',
    method: 'post',
    data: {leturesTypeIdList}
  })
}

