import http from 'src/axios/http'


/**
 * 获取全部药品atc分页
 * @returns {*}
 */
export function  catListPage(search,resData) {
  var param = {};
  param.searchType = search.searchType;
  param.searchContent = search.searchContent;
  param.pageNum = resData.pageNum;
  param.pageSize = resData.pageSize;
  param.createUsername = search.createUsername;
  param.lastUpdateUsername = search.lastUpdateUsername;
  param.myCode = search.myCode;
  param.tempCode = search.tempCode;
  if(search.createDate && search.createDate != ''){
    param.createDate = new Date(search.createDate.getTime() + 24 * 60 * 60 * 1000);
  }
  if(search.lastUpdateDate && search.lastUpdateDate != ''){
    param.lastUpdateDate = new Date(search.lastUpdateDate.getTime() + 24 * 60 * 60 * 1000);
  }
  return http({
      url: '/yxdDataCenter/catAtc/list',
      method: 'GET',
      params : param
    }
  )
}

/**
 * 获取全部药品atc分类
 * @returns {*}
 */
export function  catCategoryList(search,resData) {
  return http({
      url: '/yxdDataCenter/catAtcCategory/list',
      method: 'GET',
      params : {
        'parentId':search.parentId,
        'hierarchy':search.hierarchy,
        'pageNum': resData.pageNum,
        'pageSize': resData.pageSize,
      }
    }
  )
}

/**
 * 获取药品列表
 * @param query
 * @returns {*}
 */
export function getDrugs(query,resData) {
  return http({
      url: '/yxdDataCenter/catformulary/getDrugList',
      method: 'GET',
      params: {
        'pageNum': resData.pageNum,
        'pageSize': resData.pageSize,
        'searchContent': query.searchContent,
        'codeType': query.codeType,
        'pharmType':query.pharmType,
        'drugIds8':query.drugIds8,
        'doseageIds':query.doseageIds,
        'atcId':query.atcId
      }
    }
  )
}

/**
 * 获取剂型列表
 * @param query
 * @returns {*}
 */
export function getDoseages(query,resData) {
  return http({
      url: '/yxdDataCenter/catdoseage/list',
      method: 'GET',
      params: {
        'pageNum': resData.pageNum,
        'pageSize': resData.pageSize,
        'searchText': query.searchText,
        'searchType': query.searchType
      }
    }
  )
}

/**
 * 添加药品ATC
 * @param from
 * @returns {*}
 */
export function insertCatAtc(form) {

  return http({
      url: '/yxdDataCenter/catAtc/insertCatAtc',
      method: 'POST',
      params: form
    }
  )
}

/**
 * 修改药品ATC
 * @param from
 * @returns {*}
 */
export function updateCatAtc(form) {
  var param = {};
  param.id = form.id;
  param.code = form.code;
  param.compoundSort = form.compoundSort;
  param.anatomySort = form.anatomySort;
  param.therapeuticsSort = form.therapeuticsSort;
  param.pharmacologySort = form.pharmacologySort;
  param.chemistrySort = form.chemistrySort;
  param.nameChn = form.nameChn;
  param.nameEng = form.nameEng;
  param.remark = form.remark;
  param.tempCode = form.tempCode;
  param.codexJapan = form.codexJapan;
  param.codexEurope = form.codexEurope;
  param.codexEngland = form.codexEngland;
  param.codexChina = form.codexChina;
  param.codexUsa = form.codexUsa;
  param.useMethod = form.useMethod;
  param.utilityCode = form.utilityCode;
  param.ddd = form.ddd;
  param.priorityLevel = form.priorityLevel;
  param.myCode = form.myCode;
  param.drugIds8 = form.drugIds8;
  param.drugIds20 = form.drugIds20;
  param.doseageIds = form.doseageIds;
  param.pharmType = form.pharmType;
  return http({
      url: '/yxdDataCenter/catAtc/updateCatAtc',
      method: 'PUT',
      params: param
    }
  )
}

/**
* 根据id查询药品分类信息
* @returns {*}
*/
export function  findCatAtcById(id) {
  return http({
      url: '/yxdDataCenter/catAtc/findCatAtcById',
      method: 'GET',
      params : {
        'id':id
      }
    }
  )
}

/**
 * 删除药品ATC
 * @param from
 * @returns {*}
 */
export function deleteCatAtcByIds(ids) {
  return http({
      url: '/yxdDataCenter/catAtc/deleteCatAtcByIds',
      method: 'DELETE',
      params: {
        ids:ids
      }
    }
  )
}



