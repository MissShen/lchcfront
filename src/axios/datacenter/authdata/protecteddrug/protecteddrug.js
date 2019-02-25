import http from 'src/axios/http'


/**
 * 获取行政保护药品分页
 * @returns {*}
 */
export function  proDrugPage(search,resData) {
  var param = {};
  param.applyOrg = search.applyOrg;
  param.drugNameChinese = search.drugNameChinese;
  param.drugNameEnglish = search.drugNameEnglish;
  param.tradeNameChinese = search.tradeNameChinese;
  param.accreditProclamationNumber = search.accreditProclamationNumber;
  param.accreditNumber = search.accreditNumber;
  param.createUserName = search.createUserName;
  if(search.startTime){
    param.startTime = new Date(search.startTime.getTime() + 24 * 60 * 60 * 1000);
  }
  if(search.endTime){
    param.endTime = new Date(search.endTime.getTime() + 24 * 60 * 60 * 1000);
  }
  param.pageNum = resData.pageNum;
  param.pageSize = resData.pageSize;

  return http({
      url: '/yxdDataCenter/catAuthProtectedDrug/list',
      method: 'GET',
      params : param
    }
  )
}

/**
 * 更新行政保护药品
 * @returns {*}
 */
export function  update(form) {
  var param = {};
  param.id = form.id;
  param.drugCode = form.drugCode;
  param.drugName = form.drugName;
  param.drugNameChinese = form.drugNameChinese;
  param.drugNameEnglish = form.drugNameEnglish;
  param.tradeNameChinese = form.tradeNameChinese;
  param.tradeNameEnglish = form.tradeNameEnglish;
  param.orgCode = form.orgCode;
  param.orgName = form.orgName;
  param.applyOrg = form.applyOrg;
  param.countryChinese = form.countryChinese;
  param.countryEnglish = form.countryEnglish;
  param.acceptNumber = form.acceptNumber;
  param.applyNumber = form.applyNumber;
  param.accreditProclamationNumber = form.accreditProclamationNumber;
  param.accreditNumber = form.accreditNumber;
  param.protectionionFlag = form.protectionionFlag;
  param.remark = form.remark;
  param.productIds = form.productIds;
  param.ptype = form.ptype;
  if(form.applyDate && form.applyDate == form.applyD){
    param.applyDate = new Date(form.applyDate);
  }
  if(form.applyDate && form.applyDate != form.applyD){
    param.applyDate = new Date(form.applyDate.getTime() + 24 * 60 * 60 * 1000);
  }
  if(form.accreditDate && form.accreditDate == form.accreditD){
    param.accreditDate = new Date(form.accreditDate);
  }
  if(form.accreditDate && form.accreditDate != form.accreditD){
    param.accreditDate = new Date(form.accreditDate.getTime() + 24 * 60 * 60 * 1000);
  }

  return http({
      url: '/yxdDataCenter/catAuthProtectedDrug/updateCatAuthProtectedDrug',
      method: 'PUT',
      params : param
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
        'searchType': query.searchType,
      }
    }
  )
}

/**
 * 查看详情
 * @param query
 * @returns {*}
 */
export function info(id) {
  return http({
      url: '/yxdDataCenter/catAuthProtectedDrug/findCatAuthProtectedDrugById',
      method: 'GET',
      params: {
        'id':id
      }
    }
  )
}

/**
 * 获取机构列表
 * @param query
 * @returns {*}
 */
export function getOrgs(query,resData) {
  return http({
      url: '/yxdDataCenter/catAuthProtectedDrug/orgList',
      method: 'GET',
      params: {
        'pageNum': resData.pageNum,
        'pageSize': resData.pageSize,
        'searchContent': query.searchContent,
        'searchType': query.searchType,
      }
    }
  )
}

/**
 * 获取产品列表
 * @param query
 * @returns {*}
 */
export function getPros(query,resData) {
  return http({
      url: '/yxdDataCenter/catAuthProtectedDrug/proList',
      method: 'GET',
      params: {
        'pageNum': resData.pageNum,
        'pageSize': resData.pageSize,
        'nameChn': query.nameChn,
        'doseageName': query.doseageName,
        'orgCode':query.orgCode,
        'searchType':query.searchType,
        'productId':query.productId
      }
    }
  )
}

/**
* 批量删除
* @returns {*}
*/
export function  del(ids) {
  return http({
      url: '/yxdDataCenter/catAuthProtectedDrug/deleteCatAuthProtectedDrugByIds',
      method: 'DELETE',
      params : {
        'ids':ids
      }
    }
  )
}

/**
 * 添加行政保护药品
 * @param from
 * @returns {*}
 */
export function add(form) {

  return http({
      url: '/yxdDataCenter/catAuthProtectedDrug/insertCatAuthProtectedDrug',
      method: 'POST',
      params: form
    }
  )
}



