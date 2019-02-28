import http from 'src/axios/http'

/**
 * 业务系统列表
 *
 * @author:
 * @date: 2018/5/21 10:25
 */
export function busSysList() {
  return http(
    {
      url: '/management/sys/list',
      method: 'get',
    }
  )
}

/**
 * 　获取系统详情
 *
 * @param id 系统ID
 * @author:
 * @date: 2018/5/21 10:24
 */
export function busSysView(id) {
  return http(
    {
      url: '/management/sys/view',
      method: 'get',
      params: {id: id}
    }
  )
}

/**
 * 项目列表
 *
 * @author:
 * @date: 2018/5/21 10:24
 */
export function projectList() {
  return http(
    {
      url: '/management/project/list',
      method: 'get',
    }
  )
}

/**
 * 用户选择项目
 *
 * @param projectId 项目ID
 * @param projectName 项目名称
 * @author:
 * @date: 2018/5/21 10:23
 */
export function projectSave(projectId, projectName) {
  return http(
    {
      url: '/management/project/save',
      method: 'post',
      data: {
        projectId: projectId,
        projectName: projectName
      }
    }
  )
}

/**
 * 操作日志
 *
 * @param pageNum 当前页码
 * @param pageSize 每页条数
 * @author:
 * @date: 2018/6/8 14:45
 */
export function operationLogList(pageNum, pageSize) {
  return http(
    {
      url: '/management/log/list',
      method: 'get',
      params: {
        pageNum: pageNum,
        pageSize: pageSize
      }
    }
  )
}
