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
 * 剂型打包列表主页数据
 * @returns {*}
 */
export function dosageDroupList(resData, query) {
  return http({
      url: '/yxdDataCenter/dosagegroup/queryDosageGroupList',
      method: 'GET',
      params: {
        'pageNum': resData.pageNum,
        'pageSize': resData.pageSize,
        'name': query.name,
        'code': query.code,
        'orderBy':query.orderBy
      }
  })
}
/**
 * 剂型列表查询
 * @return {*}
 */
export function dosageFormList(resData,dataForm){
    return http({
        url: '/yxdDataCenter/dosagegroup/queryDosageFormList',
        method: 'GET',
        params: {
            'pageNum': resData.pageNum,
            'pageSize': resData.pageSize,
            'searchType': dataForm.searchType,
            'searchContent': dataForm.searchContent,
            'orderBy':dataForm.orderBy
        }
    })
}

/**
 * 保存新增剂型打包记录
 * @return {*}
 */
export function saveDosageGroup(form){
    return http({
        url: '/yxdDataCenter/dosagegroup/insertDosageGroup',
        method: 'POST',
        params: {
            'name':form.name,
            'dosageName':form.dosageName,
            'dosageCode':form.dosageCode
        }
    })
}
/**
 * 查看增剂型打包记录
 * @return {*}
 */
export function findDosageGroup(id){
    return http({
        url: '/yxdDataCenter/dosagegroup/findDosageGroup',
        method: 'GET',
        params: {
            'id':id
        }
    })
}
/**
 * 保存新增剂型打包记录
 * @return {*}
 */
export function updateDosageGroup(form){
    return http({
        url: '/yxdDataCenter/dosagegroup/updateDosageGroup',
        method: 'PUT',
        params: {
            'id':form.id,
            'name':form.name,
            'dosageName':form.dosageName,
            'dosageCode':form.dosageCode
        }
    })
}
/**
 * 查看增剂型打包记录
 * @return {*}
 */
export function deleteDosageGroup(ids){
    return http({
        url: '/yxdDataCenter/dosagegroup/deleteDosageGroup',
        method: 'DELETE',
        params: {
            'ids':ids
        }
    })
}