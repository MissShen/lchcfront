import http from 'src/axios/http'
import moment from 'moment'
/**
 * 日期格式转换
 * @param data
 * @returns {*}
 */
function dateChange(data){
  var result;
  if(typeof (data)!='undefined'&& data!=null ){
    result=moment(data).format("YYYY-MM-DD");
  }
  return result;
}
/**
 * 基本医疗保险药品主页数据
 * @returns {*}
 */
export function medicareDrugsList(query, resData) {
  return http({
      url: '/yxdDataCenter/basicmedicaredrugs/medicareDrugsList',
      method: 'GET',
      params: {
        'pageNum': resData.pageNum,
        'pageSize': resData.pageSize,
        'areaId': query.areaId,
        'searchType': query.searchType,
        'searchContent': query.searchContent,
        'limitFlag': query.limitFlag,
        'medicareType': query.medicareType,
        'loadUserName': query.loadUserName,
        'loadDateBegin': dateChange(query.loadDateBegin),
        'loadDateEnd': dateChange(query.loadDateEnd),
        'orderBy':query.orderBy
      }
  })
}
/**
 * 查询地区
 * @returns {*}
 */
export function areaList() {
  return http({
    url: '/yxdDataCenter/basicmedicaredrugs/areaList',
    method: 'GET',
    params: { }
  })
}
/**
 * 查看基本医疗保险信息
 * @returns {*}
 */
export function findMedicareDrug(id){
  return http({
    url: '/yxdDataCenter/basicmedicaredrugs/findMedicare',
    method: 'GET',
    params: {
      'id':id
    }
  })
}
/**
 * 查看已关联药品信息信息
 * @returns {*}
 */
export function queryRelateDrugList(resData,id,query){
  return http({
    url: '/yxdDataCenter/basicmedicaredrugs/queryRelateDrugList',
    method: 'GET',
    params: {
      'pageNum': resData.pageNum,
      'pageSize': resData.pageSize,
      'id':id,
      'searchType': query.searchNameOrCode,
      'searchContent': query.searchContent,
      'orderBy':query.orderBy
    }
  })
}
/**
 * 查看全部已关联药品信息信息
 * @returns {*}
 */
export function queryAllRelateDrugList(id,query){
  return http({
    url: '/yxdDataCenter/basicmedicaredrugs/queryAllRelateDrugList',
    method: 'GET',
    params: {
      'id':id,
      'searchType': query.searchNameOrCode,
      'searchContent': query.searchContent,
    }
  })
}

/**
 * 查看未关联（全部）药品信息
 * @returns {*}
 */
export function queryDrugList(resData,query){
  return http({
    url: '/yxdDataCenter/basicmedicaredrugs/queryDrugList',
    method: 'GET',
    params: {
      'pageNum': resData.pageNum,
      'pageSize': resData.pageSize,
      'searchType': query.searchNameOrCode,
      'searchContent': query.searchContent,
      'orderBy':query.orderBy
    }
  })
}
/**
 * 查看未关联（全部）药品信息
 * @returns {*}
 */
export function queryUnRelateDrugList(resData,query,){
  return http({
    url: '/yxdDataCenter/basicmedicaredrugs/queryUnRelateDrugList',
    method: 'GET',
    params: {
      'pageNum': resData.pageNum,
      'pageSize': resData.pageSize,
      'chooseDrugsId':query.chooseDrugsId,
      'chooseDosagesCode':query.chooseDosagesCode,
      'searchType': query.searchType,
      'searchContent': query.searchContent,
      'orderBy':query.orderBy
    }
  })
}
/**
 * 保存新增医保信息
 * @returns {*}
 */
export function insertMedicare(form){
  return http({
    url: '/yxdDataCenter/basicmedicaredrugs/insertMedicare',
    method: 'POST',
    params: {
      'insuredNationNubmer':form.insuredNationNubmer,
      'insuredDrugNubmer':form.insuredDrugNubmer,
      'drugCategory':form.drugCategory,
      'middleCategory':form.middleCategory,
      'smallCategory':form.smallCategory,
      'fourthCategory':form.fourthCategory,
      'drugCategoryId':form.drugCategoryId,
      'middleCategoryId':form.middleCategoryId,
      'smallCategoryId':form.smallCategoryId,
      'fourthCategoryId':form.fourthCategoryId,
      'englishName':form.englishName,
      /*'englishName':form.categoryCode,*/
      'insuredDrugType':form.insuredDrugType,
      'bulletinDrugName':form.bulletinDrugName,
      'bulletinDoseageName':form.bulletinDoseageName,
      'drugIds':form.chooseDrugsId,
      'drugCodes':form.chooseDrugsCode,
      'doseageCodes':form.chooseDosagesCode,
      'westernOrCn':form.westernOrCn,
      'permitFlag':form.permitFlag,
      'limitedFlag':form.limitedFlag,
      'provinceId':form.provinceId,
      'fileRemark':form.fileRemark,
      'remark':form.remark,
      'relatedDrugIds':form.chooseRelateDrugsId,
    }
  })
}
/**
 * 查看未关联（全部）药品信息
 * @returns {*}
 */
export function deleteMedicare(ids){
  return http({
    url: '/yxdDataCenter/basicmedicaredrugs/deleteMedicare',
    method: 'DELETE',
    params: {
      'ids': ids,
    }
  })
}
/**
 * 查看基本医疗保险信息，修改、拷贝用
 * @returns {*}
 */
export function findMedicareDrug2(id){
  return http({
    url: '/yxdDataCenter/basicmedicaredrugs/findMedicare2',
    method: 'GET',
    params: {
      'id':id
    }
  })
}
/**
 * 查看已关联药品信息信息(删除、拷贝用)
 * @returns {*}
 */
export function queryRelateDrugList2(resData,id,query,ids){
  return http({
    url: '/yxdDataCenter/basicmedicaredrugs/queryRelateDrugList2',
    method: 'GET',
    params: {
      'pageNum': resData.pageNum,
      'pageSize': resData.pageSize,
      'id':id,
      'searchType': query.searchNameOrCode,
      'searchContent': query.searchContent,
      'ids':ids,
      'orderBy':query.orderBy
    }
  })
}
/**
 * 保存修改医保信息
 * @returns {*}
 */
export function updateMedicare(form){
  return http({
    url: '/yxdDataCenter/basicmedicaredrugs/updateMedicare',
    method: 'PUT',
    params: {
      'id':form.id,
      'insuredNationNubmer':form.insuredNationNubmer,
      'insuredDrugNubmer':form.insuredDrugNubmer,
      'drugCategory':form.drugCategory,
      'middleCategory':form.middleCategory,
      'smallCategory':form.smallCategory,
      'fourthCategory':form.fourthCategory,
      'drugCategoryId':form.drugCategoryId,
      'middleCategoryId':form.middleCategoryId,
      'smallCategoryId':form.smallCategoryId,
      'fourthCategoryId':form.fourthCategoryId,
      'englishName':form.englishName,
      /*'englishName':form.categoryCode,*/
      'insuredDrugType':form.insuredDrugType,
      'bulletinDrugName':form.bulletinDrugName,
      'bulletinDoseageName':form.bulletinDoseageName,
      'drugIds':form.chooseDrugsId,
      'drugCodes':form.chooseDrugsCode,
      'doseageCodes':form.chooseDosagesCode,
      'westernOrCn':form.westernOrCn,
      'permitFlag':form.permitFlag,
      'limitedFlag':form.limitedFlag,
      'provinceId':form.provinceId,
      'fileRemark':form.fileRemark,
      'remark':form.remark,
      'relatedDrugIds':form.chooseRelateDrugsId,
    }
  })
}
/**
 * 导出EXCEL
 * @returns {*}
 */
export function exportExcel(query) {
  return http({
        url: '/yxdDataCenter/basicmedicaredrugs/export',
        method: 'POST',
        responseType: 'blob',// 表明返回服务器返回的数据类型
        use: 'all',
        params: {
          'areaId': query.areaId,
          'searchType': query.searchType,
          'searchContent': query.searchContent,
          'limitFlag': query.limitFlag,
          'medicareType': query.medicareType,
          'loadUserName': query.loadUserName,
          'loadDateBegin': dateChange(query.loadDateBegin),
          'loadDateEnd': dateChange(query.loadDateEnd)
        }
      }
  )
}

/**
 * 导入数据
 * @returns {*}
 */
export function importData(files) {
  return http({
        url: '/yxdDataCenter/basicmedicaredrugs/import',
        method: 'POST',
        data: files,
        type: 'json'
      }
  )
}

/**
 * 下载模板
 * @returns {*}
 */
export function downloadExcel() {
  return http({
        url: '/yxdDataCenter/basicmedicaredrugs/downloadExcel',
        method: 'POST',
        responseType: 'blob',
        use: 'all',
      }
  )
}