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
 * 产品信息列表查询
 * @returns {*}
 */
export function productList(resData,search) {
  return http({
      url: '/yxdDataCenter/specialmaintain/list',
      method: 'GET',
      params: {
        'pageNum': resData.pageNum,
        'pageSize': resData.pageSize,
          'searchTypeA': search.searchTypeA,
          'searchContentA': search.searchContentA,
          'searchTypeB': search.searchTypeB,
          'searchContentB': search.searchContentB,
          'enableFlag': search.enableFlag,
          'spec':search.spec,
          'checkFlag':search.checkFlag,
          'medicalInsuranceFlag':search.medicalInsuranceFlag,
          'lowestType':search.lowestType,
          'contractType':search.contractType,
          'orderBy':search.orderBy
      }
    })
}
/**
 * 省份列表查询
 * @returns {*}
 */
export function provinceList() {
    return http({
            url: '/yxdDataCenter/specialmaintain/queryProvinceList',
            method: 'GET',
            params: {}
        })
}
/**
 * 保存新增特殊标记
 * @returns {*}
 */
export function saveSpecialMark(form) {
    return http({
        url: '/yxdDataCenter/specialmaintain/insertSpecial',
        method: 'POST',
        params: {
            'productId':form.productId,
            'medicalName':form.medicalName,
            'provinceId':form.provinceId,
            'largeInfusion':form.largeInfusion,
            'antibiosisType':form.antibiosisType,
            'medicalInsuranceFlag':form.medicalInsuranceFlag,
            'medicalInsuranceCode':form.medicalInsuranceCode,
            'lowestType':form.lowestType,
            'contractType':form.contractType,
            'outOfStockFlag':form.outOfStockFlag,
            'jsType':form.jsType,
            'containAnaleptic':form.containAnaleptic
        }
    })
}
/**
 * 根据产品ID查看特殊标记列表
 * @returns {*}
 */
export function specialMarkList(resData,query) {
    return http({
        url: '/yxdDataCenter/specialmaintain/querySpecialList',
        method: 'GET',
        params: {
            'pageNum': resData.pageNum,
            'pageSize': resData.pageSize,
            'id':query.id,
            'provinceId':query.provinceId,
            'medicalInsuranceFlag':query.medicalInsuranceFlag,
            'lowestType':query.lowestType,
            'contractType':query.contractType,
            'orderBy':query.orderBy
        }
    })
}
/**
 * 根据产品ID查看产品基本信息
 * @returns {*}
 */
export function findProductInfo(id) {
    return http({
        url: '/yxdDataCenter/specialmaintain/findProductInfo',
        method: 'GET',
        params: {
            'id':id
        }
    })
}
/**
 * 根据ID查看特殊标记基本信息
 * @returns {*}
 */
export function findSpecialInfo(id) {
    return http({
        url: '/yxdDataCenter/specialmaintain/findSpecialInfo',
        method: 'GET',
        params: {
            'id':id
        }
    })
}
/**
 * 保存修改特殊标记
 * @returns {*}
 */
export function updateSpecial(form) {
    return http({
        url: '/yxdDataCenter/specialmaintain/updateSpecialInfo',
        method: 'PUT',
        params: {
            'id':form.id,
            'productId':form.productId,
            'medicalName':form.medicalName,
            'provinceId':form.provinceId,
            'largeInfusion':form.largeInfusion,
            'antibiosisType':form.antibiosisType,
            'medicalInsuranceFlag':form.medicalInsuranceFlag,
            'medicalInsuranceCode':form.medicalInsuranceCode,
            'lowestType':form.lowestType,
            'contractType':form.contractType,
            'outOfStockFlag':form.outOfStockFlag,
            'jsType':form.jsType,
            'containAnaleptic':form.containAnaleptic
        }
    })
}
/**
 * 删除产品特殊标记记录
 * @returns {*}
 */
export function deleteSpecial(ids) {
    return http({
        url: '/yxdDataCenter/specialmaintain/deleteSpecial',
        method: 'DELETE',
        params: {
            'ids':ids
        }
    })
}