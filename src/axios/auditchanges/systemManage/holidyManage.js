import http from 'src/axios/http'

export function insert(date,content) {
  return http({
    url: '/auditchanges/sysHoliday/insert',
    method: 'post',
    data: {
      date: date,
      content:content
    }
  });
}

export function deleteByDate(date) {
  return http({
    url: '/auditchanges/sysHoliday/delete',
    method: 'delete',
    params: {'date': date}
  });
}

export function list(resData, queryData) {
  return http({
    url: '/auditchanges/sysHoliday/list',
    method: 'get',
    params: {'date': queryData}
  });
}
