import http from 'src/axios/http'

/**
 * 国家列表
 * @param search
 * @param resData
 * @returns {*}
 */
export function countryList(search, resData) {
  return http({
      url: '/yxdDataCenter/catregion/list',
      method: 'GET',
      params: {
        //区域层级（国家:0、省:1、市:2、县:3）
        'hierarchy': 0,
        'searchType':search.searchType,
        'searchText': search.searchText,
        'pageNum': resData.pageNum,
        'pageSize': resData.pageSize,
        'orderBy':search.orderBy
      }
    }
  )
}

/**
 * 国家列表(所有)
 * @param search
 * @param resData
 * @returns {*}
 */
export function countryAllList(search, resData) {
  return http({
      url: '/yxdDataCenter/catregion/getReturnRegionList',
      method: 'GET',
      params: {
        //区域层级（国家:0、省:1、市:2、县:3）
        'hierarchy': 0
      }
    }
  )
}

/**
 * 省列表
 * @param search
 * @param resData
 * @returns {*}
 */
export function provinceList(search, resData) {
  return http({
      url: '/yxdDataCenter/catregion/list',
      method: 'GET',
      params: {
        //区域层级（国家:0、省:1、市:2、县:3）
        'hierarchy': 1,
        'searchType':search.searchType,
        'searchText': search.searchText,
        'pageNum': resData.pageNum,
        'pageSize': resData.pageSize,
        'orderBy':search.orderBy
      }
    }
  )
}

/**
 * 省列表(所有)
 * @param search
 * @param resData
 * @returns {*}
 */
export function provinceAllList(search, resData) {
  return http({
      url: '/yxdDataCenter/catregion/getReturnRegionList',
      method: 'GET',
      params: {
        //区域层级（国家:0、省:1、市:2、县:3）
        'hierarchy': 1
      }
    }
  )
}

/**
 * 市列表
 * @param search
 * @param resData
 * @returns {*}
 */
export function cityList(search, resData) {
  return http({
      url: '/yxdDataCenter/catregion/list',
      method: 'GET',
      params: {
        //区域层级（国家:0、省:1、市:2、县:3）
        'hierarchy': 2,
        'searchType':search.searchType,
        'searchText': search.searchText,
        'pageNum': resData.pageNum,
        'pageSize': resData.pageSize,
        'orderBy':search.orderBy
      }
    }
  )
}

/**
 * 市列表(所有)
 * @param search
 * @param resData
 * @returns {*}
 */
export function cityAllList(search, resData) {
  return http({
      url: '/yxdDataCenter/catregion/getReturnRegionList',
      method: 'GET',
      params: {
        //区域层级（国家:0、省:1、市:2、县:3）
        'hierarchy': 2
      }
    }
  )
}

/**
 * 县列表
 * @param search
 * @param resData
 * @returns {*}
 */
export function countyList(search, resData) {
  return http({
      url: '/yxdDataCenter/catregion/list',
      method: 'GET',
      params: {
        //区域层级（国家:0、省:1、市:2、县:3）
        'hierarchy': 3,
        'searchType':search.searchType,
        'searchText': search.searchText,
        'pageNum': resData.pageNum,
        'pageSize': resData.pageSize,
        'orderBy':search.orderBy
      }
    }
  )
}

/**
 * 市列表(根据code查询一个省)
 * @param search
 * @param resData
 * @returns {*}
 */
export function cityAllListOfCode(parentCode) {
  return http({
      url: '/yxdDataCenter/catregion/getReturnRegionList',
      method: 'GET',
      params: {
        //区域层级（国家:0、省:1、市:2、县:3）
        'hierarchy': 2,
        'parentCode': parentCode
      }
    }
  )
}

/**
 * 添加国家
 * @param from
 * @returns {*}
 */
export function addCountry(from) {
  //区域层级（国家:0、省:1、市:2、县:3）
  from.hierarchy = 0;
  return http({
      url: '/yxdDataCenter/catregion/insertCatRegion',
      method: 'POST',
      params: from
    }
  )
}

/**
 * 添加省
 * @param from
 * @returns {*}
 */
export function addProvince(from) {

  from.parentId = from.county

  //区域层级（国家:0、省:1、市:2、县:3）
  from.hierarchy = 1;

  return http({
      url: '/yxdDataCenter/catregion/insertCatRegion',
      method: 'POST',
      params: from
    }
  )
}

/**
 * 添加市
 * @param from
 * @returns {*}
 */
export function addCity(from) {

  from.code = from.province + from.code;
  from.parentId = from.province

  //区域层级（国家:0、省:1、市:2、县:3）
  from.hierarchy = 2;

  return http({
      url: '/yxdDataCenter/catregion/insertCatRegion',
      method: 'POST',
      params: from
    }
  )
}

/**
 * 添加县
 * @param from
 * @returns {*}
 */
export function addCounty(from) {

  from.code = from.twoCode+from.code
  from.parentId = from.city

  //区域层级（国家:0、省:1、市:2、县:3）
  from.hierarchy = 3;

  return http({
      url: '/yxdDataCenter/catregion/insertCatRegion',
      method: 'POST',
      params: from
    }
  )
}

/**
 * 删除国家
 * @param ids
 * @returns {*}
 */
export function remove(ids) {
  return http({
      url: '/yxdDataCenter/catregion/deleteCatRegionByIds',
      method: 'DELETE',
      params: {'ids': ids}
    }
  )
}

/**
 * 查看详情
 * @param code
 * @returns {*}
 */
export function info(id) {
  return http({
    url:'/yxdDataCenter/catregion/findCatRegionVoById',
    method: 'GET',
    params: {
      id: id
    }
  })
}

/**
 * 修改
 * @param from
 * @returns {*}
 */
export function update(from) {
  return http({
      url: '/yxdDataCenter/catregion/updateCatRegion',
      method: 'PUT',
      params: {
        'id': from.id,
        'code': from.code,
        'nameChn': from.nameChn,
        'nameEng': from.nameEng,
        'abbr': from.abbr,
        'letterCode': from.letterCode,
        'remark': from.remark,
        'parentId': from.parentId,
        'parentCode': from.parentCode

      }
    }
  )
}
