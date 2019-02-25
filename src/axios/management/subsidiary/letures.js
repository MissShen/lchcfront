import http from 'src/axios/http'


/**
 * 阳光讲堂列表
 *
 * @param pageNum 当前页数
 * @param pageSize 每页页码
 * @param queryData 查询数据封装
 * @author: JiaHaiGang
 * @date: 2018/3/15 10:48
 */
export function leturesList(pageNum, pageSize, queryData) {
  return http({
    url: '/management/letures/list',
    method: 'get',
    params: {
      searchTypeId: queryData.searchTypeId,
      searchBeginDate: queryData.searchBeginDate,
      searchEndDate: queryData.searchEndDate,
      pageNum: pageNum,
      pageSize: pageSize
    }
  })
}


/**
 * 阳光讲堂数据新增
 *
 * @param formData 数据封装
 * @author: JiaHaiGang
 * @date: 2018/3/15 10:48
 */
export function leturesSave(formData) {
  return http({
    url: '/management/letures/save',
    method: 'post',
    headers: {
      'Authorization': sessionStorage.getItem('token'),
    },
    type: 'json',
    data: formData

  })
}

/**
 * 阳光讲堂数据修改
 *
 * @param formData 数据封装
 * @author: JiaHaiGang
 * @date: 2018/3/15 10:48
 */
export function leturesUpdate(formData) {
  return http({
    url: '/management/letures/update',
    method: 'post',
    headers: {
      'Authorization': sessionStorage.getItem('token'),
    },
    type: 'json',
    data: formData

  })
}

/**
 * 阳光讲堂数据删除
 *
 * @param id ID
 * @author: JiaHaiGang
 * @date: 2018/3/15 10:48
 */
export function leturesDelete(id) {
  return http({
    url: '/management/letures/delete',
    method: 'delete',
    params: {id: id}
  })
}

/**
 * 阳光讲堂数据附件删除
 *
 * @param id ID
 * @author: JiaHaiGang
 * @date: 2018/3/15 10:48
 */
export function leturesDeleteFile(id) {
  return http({
    url: '/management/letures/delete/file',
    method: 'delete',
    params: {id: id}
  })
}

// ----------------------------------未登录页-------------------------------

/**
 * 阳光讲堂-全栏目数据列表
 *
 * @author: JiaHaiGang
 * @date: 2018/6/7 14:54
 */
export function unLoginLeturesVoList() {
  return http({
    url: '/management/unLogin/letures/vo/list',
    method: 'get',
  })
}

/**
 * 阳光讲堂-栏目列表
 *
 * @param pageNum 当前页数
 * @param pageSize 每页页码
 * @param typeId 栏目ID
 * @author: JiaHaiGang
 * @date: 2018/6/7 14:58
 * @return:
 */
export function unLoginLeturesList(pageNum, pageSize, typeId) {
  return http({
    url: '/management/unLogin/letures/list',
    method: 'get',
    params: {
      searchTypeId: typeId,
      pageNum: pageNum,
      pageSize: pageSize
    }
  })
}

/**
 *  下载附件
 *
 * @param id 数据ID
 * @author: JiaHaiGang
 * @date: 2018/6/7 11:48
 */
export function unLoginDownloadLeturesFile(id) {
  return http({
    url: '/management/unLogin/letures/download/file',
    method: 'get',
    params: {id: id},
    responseType: 'blob',
    use: 'all'
  })
}

/**
 * 阳光讲堂-数据详情
 *
 * @param id ID
 * @author: JiaHaiGang
 * @date: 2018/3/15 10:48
 */
export function unLoginLeturesView(id) {
  return http({
    url: '/management/unLogin/letures/view',
    method: 'get',
    params: {id: id}
  })
}
