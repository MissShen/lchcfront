import http from 'src/axios/http'


/**
 * 公告类型列表
 *
 * @param resData 返回数据封装
 * @param queryData 查询数据封装
 * @author: JiaHaiGang
 * @date: 2018/3/15 10:48
 */
export function noticeTypeList(resData, queryData) {
  return http({
    url: '/management/notice/type/list',
    method: 'get',
    params: {
      'searchName': queryData.searchName,
      'searchCode': queryData.searchCode,
      'pageNum': resData.pageNum,
      'pageSize': resData.pageSize
    }
  })
}


/**
 * 公告类型不分页全列表
 *
 * @author: JiaHaiGang
 * @date: 2018/3/16 11:39
 */
export function noticeTypeAllList() {
  return http({
    url: '/management/notice/type/all/list',
    method: 'get',
  })
}

/**
 * 查看公告类型详情
 *
 * @param id 公告类型id
 * @author: JiaHaiGang
 * @date: 2018/3/15 10:50
 */
export function noticeTypeView(id) {
  return http({
    url: '/management/notice/type/view',
    method: 'get',
    params: {'id': id}
  })
}


/**
 * 新增公告类型
 *
 * @param sysNoticeType 公告类型
 * @author: JiaHaiGang
 * @date: 2018/3/15 10:51
 * @return:
 */
export function noticeTypeSave(sysNoticeType) {
  return http({
    url: '/management/notice/type/save',
    method: 'post',
    data: sysNoticeType
  })
}


/**
 * 修改公告类型
 *
 * @param sysNoticeType 公告类型
 * @author: JiaHaiGang
 * @date: 2018/3/15 10:51
 * @return:
 */

export function noticeTypeUpdate(sysNoticeType) {
  return http({
    url: '/management/notice/type/update',
    method: 'put',
    data: sysNoticeType
  })
}


/**
 * 批量删除公告类型
 *
 * @param noticeTypeList 公告类型列表
 * @author: JiaHaiGang
 * @date: 2018/3/15 11:57
 * @return:
 */
export function noticeTypeDelete(noticeTypeIdList) {
  return http({
    url: '/management/notice/type/delete',
    method: 'post',
    data: {noticeTypeIdList}
  })
}
