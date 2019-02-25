import http from 'src/axios/http'


/**
 * 获取全部药品atc分页
 * @returns {*}
 */
export function  proListPage(search,resData) {
  var param = {};
  param.tradeName = search.tradeName;
  param.productCode = search.productCode;
  param.manufactureName = search.manufactureName;
  param.permitNumber = search.permitNumber;
  param.pageNum = resData.pageNum;
  param.pageSize = resData.pageSize;

  return http({
      url: '/yxdDataCenter/projectFinalProductBasic/list',
      method: 'GET',
      params : param
    }
  )
}

/**
* 根据id查询企业资质信息
* @returns {*}
*/
export function  findDetailById(id) {
  return http({
      url: '/yxdDataCenter/projectFinalProductBasic/findProjectProductVoById',
      method: 'GET',
      params : {
        'id':id
      }
    }
  )
}



