import http from 'src/axios/http'


/**
 * 获取全部药品atc分页
 * @returns {*}
 */
export function  orgListPage(search,resData) {
  var param = {};
  param.name = search.name;
  param.organizeCode = search.organizeCode;
  param.linkPerson = search.linkPerson;
  param.pageNum = resData.pageNum;
  param.pageSize = resData.pageSize;

  return http({
      url: '/yxdDataCenter/projectFinalOrgBasic/list',
      method: 'GET',
      params : param
    }
  )
}

/**
* 根据id查询企业资质信息
* @returns {*}
*/
export function  findDetailByOrgBasicId(id) {
  return http({
      url: '/yxdDataCenter/projectFinalOrgBasic/findDetailByOrgBasicId',
      method: 'GET',
      params : {
        'id':id
      }
    }
  )
}



