import http from 'src/axios/http'


/**
 * 查询资源列表
 *
 * @param resData 分页数据封装
 * @param queryData 查询数据封装
 * @param parentId  资源父ID，
 *      资源类型=MENU,parentId=null则查询一级菜单,
 *      资源类型=MENU,parentId!=null则查询二级菜单
 * @param resourceType 资源类型, 菜单:'MENU'  按钮:'BUTTON'
 *      资源类型=BUTTON, parentId!=null则查询子按钮
 * @author: JiaHaiGang
 * @date: 2018/3/22 10:27
 * @return:
 */
export function resourceList(resData, queryData, parentId, resourceType) {
  return http({
    url: '/management/resource/list',
    method: 'get',
    params: {
      'parentId': parentId,
      'resourceType': resourceType,
      'systemId': queryData.systemId,
      'searchName': queryData.searchName,
      'beginDate': queryData.beginDate,
      'endDate': queryData.endDate,
      'pageNum': resData.pageNum,
      'pageSize': resData.pageSize
    }
  })
}


/**
 * 查看指定资源
 *
 * @param id 资源id
 * @author: JiaHaiGang
 * @date: 2018/3/22 10:46
 * @return:
 */
export function resourceView(id) {
  return http({
    url: '/management/resource/view',
    method: 'get',
    params: {'id': id}
  })
}

/**
 * 新增资源
 *
 * @param sysResource 资源类型
 * @author: JiaHaiGang
 * @date: 2018/3/22 10:44
 * @return:
 */
export function resourceSave(sysResource) {
  return http({
    url: '/management/resource/save',
    method: 'post',
    data: sysResource
  })
}


/**
 * 修改资源
 *
 * @param sysResource 资源
 * @author: JiaHaiGang
 * @date: 2018/3/22 10:44
 * @return:
 */
export function resourceUpdate(sysResource) {
  return http({
    url: '/management/resource/update',
    method: 'put',
    data: sysResource
  })
}


/**
 *  删除指定资源
 *
 * @param id 资源id
 * @author: JiaHaiGang
 * @date: 2018/3/22 11:08
 * @return:
 */
export function resourceDelete(id) {
  return http({
    url: '/management/resource/delete',
    method: 'delete',
    params: {'id': id}
  })
}
