import http from 'src/axios/http'


/**
 * 公告列表
 *
 * @author: JiaHaiGang
 * @date: 2018/3/16 11:14
 */
export function noticeList(resData, queryData) {
  return http({
    url: '/management/notice/list',
    method: 'get',
    params: {
      'queryType': queryData.queryType,
      'queryContent': queryData.queryContent,
      'beginDate': queryData.beginDate,
      'endDate': queryData.endDate,
      'pageNum': resData.pageNum,
      'pageSize': resData.pageSize
    }
  })
}

/**
 * 登录用户的公告列表
 *
 * @author: JiaHaiGang
 * @date: 2018/5/15 11:21
 */
export function userNoticeInitList(menuCode, resData, queryData) {
  return http({
    url: '/management/notice/user/list',
    method: 'get',
    params: {
      'menuCode': menuCode,
      'queryType': queryData.queryType,
      'queryContent': queryData.queryContent,
      'beginDate': queryData.beginDate,
      'endDate': queryData.endDate,
      'pageNum': resData.pageNum,
      'pageSize': resData.pageSize
    }
  })
}

export function queryBulletinList(pageNum) {
  return http({
    url: '/management/notice/queryBulletinList',
    method: 'get',
    loading: false,
    params: {
      pageSize: 4,
      pageNum: pageNum,
    }
  })
}

/**
 * 查看公告
 *
 * @param id 公告id
 * @author: JiaHaiGang
 * @date: 2018/3/16 11:18
 * @return:
 */
export function noticeView(id) {
  return http({
    url: '/management/notice/view',
    method: 'get',
    params: {'id': id}
  })
}


/**
 * 新增公告
 *
 * @param formData  上传数据
 * @author: JiaHaiGang
 * @date: 2018/3/16 11:19
 */
export function noticeSave(formData) {
  return http({
    url: '/management/notice/save',
    method: 'post',
    headers: {
      'Authorization': sessionStorage.getItem('token'),
    },
    type: 'json',
    data: formData
  });
}

/**
 * 修改公告
 *
 * @param formData  上传数据
 * @author: JiaHaiGang
 * @date: 2018/3/16 11:20
 * @return:
 */
export function noticeUpdate(formData) {
  return http({
    url: '/management/notice/update',
    method: 'post',
    headers: {
      'Authorization': sessionStorage.getItem('token'),
    },
    type: 'json',
    data: formData
  })
}

/**
 * 公告交替置顶/取消置顶
 *
 * @param id 公告id
 * @author: JiaHaiGang
 * @date: 2018/3/19 14:29
 */
export function noticeTop(id) {
  return http({
    url: '/management/notice/top',
    method: 'put',
    data: {'id': id}
  })
}


/**
 * 批量删除公告
 *
 * @param noticeIdList 公告
 * @author: JiaHaiGang
 * @date: 2018/3/16 11:21
 * @return:
 */
export function noticeDelete(noticeIdList) {
  return http({
    url: '/management/notice/delete',
    method: 'post',
    data: {noticeIdList}
  })
}

export function noticeFileDelete(id) {
  return http({
    url: '/management/notice/file/delete',
    method: 'delete',
    params: {'id': id}
  })
}

/**
 * 获取公告的附件列表
 *
 * @param id 公告ID
 * @author: JiaHaiGang
 * @date: 2018/4/10 16:50
 * @return:
 */
export function noticeFileList(id) {
  return http({
    url: '/management/notice/file/list',
    method: 'get',
    params: {'id': id}
  })
}

/**
 * 导出
 * @param queryData
 * @param fileds
 * @returns {*}
 */
export function exportExcel(queryData, fileds, callback1, callback2) {

  return http({
    url: '/management/notice/export/excel',
    method: 'post',
    responseType: 'blob',// 表明返回服务器返回的数据类型
    use: 'all',
    data: {
      'queryType': queryData.queryType,
      'queryContent': queryData.queryContent,
      'beginDate': queryData.beginDate,
      'endDate': queryData.endDate,
      'fileds': fileds
    },
    onDownloadProgress: function (progressEvent) {
      if (progressEvent.lengthComputable) {
        // 对原生进度事件的处理
        console.info("progressEvent", progressEvent)
        var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        console.info("percentCompleted", percentCompleted)
        callback1(progressEvent);
      }
    }

  }).then(res => {
    callback2(res.data);
  })
}

/**
 * 下载指定ID的附件
 *
 * @param id 附件id
 * @author: JiaHaiGang
 * @date: 2018/4/23 13:13
 */
export function downloadNoticeFile(id) {
  return http({
    url: '/management/notice/file/upload',
    method: 'get',
    params: {id: id},
    headers: {
      "Authorization": sessionStorage.getItem('token')
    },
    responseType: 'blob',
    use: 'all'
  })
}

// ----------------------- 未登录请求接口--------------------------

/**
 * 公告-列表
 *
 * @param pageNum 当前页码
 * @param pageSize 每页条数
 * @author: JiaHaiGang
 * @date: 2018/6/8 9:46
 */
export function unLoginNoticeList(pageNum, pageSize) {
  return http({
    url: '/management/unLogin/notice/list',
    method: 'get',
    loading: false,
    params: {
      'pageNum': pageNum,
      'pageSize': pageSize
    }
  })
}

/**
 * 公告列表-默认limit条
 *
 * @author: JiaHaiGang
 * @date: 2018/6/8 9:47
 */
export function unLoginNoticeLimitList() {
  return http({
    url: '/management/unLogin/notice/list',
    method: 'get',
    loading: false,
    params: {
      'pageNum': 1,
      'pageSize': 3
    }
  })
}


/**
 *  公告-附件下载
 *
 * @param id 附件ID
 */
export function unLoginDownloadFile(id) {
  return http({
    url: '/management/unLogin/notice/download/file',
    method: 'get',
    params: {id: id},
    responseType: 'blob',
    use: 'all'
  })
}

/**
 *  公告-详情
 *
 * @param id 公告ID
 * @author: JiaHaiGang
 * @date: 2018/6/8 9:43
 */
export function unLoginNoticeView(id) {
  return http({
    url: '/management/unLogin/notice/view',
    loading: false,
    method: 'get',
    params: {'id': id}
  })
}
