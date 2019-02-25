import http from 'src/axios/http'
import moment from 'moment'

/**
 * 查询区域信息
 *
 * @returns {*}
 */
export function regions() {
  return http({
      url: '/yxdDataCenter/catBuyer/regions',
      method: 'GET'
    }
  )
}

/**
 * 根据ID查询区域CODE
 *
 * @returns {*}
 */
export function findRegionCode(id) {
  return http({
      url: '/yxdDataCenter/catBuyer/findRegionCode',
      method: 'GET',
      params: {
        id: id
      }
    }
  )
}

/**
 * 根据省级ID查询市信息
 * @param 省ID
 * @returns {*}
 */
export function city(provinceId) {
  return http({
      url: '/yxdDataCenter/catBuyer/city',
      method: 'GET',
      params: {
        provinceId: provinceId
      }
    }
  )
}

/**
 * 根据市级ID查询县信息
 * @param 市ID
 * @returns {*}
 */
export function county(cityId) {
  return http({
      url: '/yxdDataCenter/catBuyer/county',
      method: 'GET',
      params: {
        cityId: cityId
      }
    }
  )
}

/**
 * 买方机构主页数据
 * @returns {*}
 */
export function list(query, resData) {
  return http({
      url: '/yxdDataCenter/catBuyer/list',
      method: 'GET',
      params: {
        provinceId: query.province,
        cityId: query.city,
        userId: query.user,
        searchType: query.searchType,
        searchText: query.searchText,
        medicareFlag: query.medicareFlag,
        beginDate: query.beginDate == undefined ? '' : moment(query.beginDate).format("YYYY-MM-DD"),
        endDate: query.endDate == undefined ? '' : moment(query.endDate).format("YYYY-MM-DD"),
        pageNum: resData.pageNum,
        pageSize: resData.pageSize,
        orderBy: query.orderBy
      }
    }
  )
}

/**
 * 买方机构回收站主页
 * @returns {*}
 */
export function recycle(query, resData) {
  return http({
      url: '/yxdDataCenter/catBuyer/recycle',
      method: 'GET',
      params: {
        searchType: query.searchType,
        searchText: query.searchText,
        pageNum: resData.pageNum,
        pageSize: resData.pageSize,
        orderBy: query.orderBy
      }
    }
  )
}

/**
 * 删除
 * @param ids
 * @returns {*}
 */
export function del(ids) {
  return http({
    url: '/yxdDataCenter/catBuyer/deleteById',
    method: 'DELETE',
    params: {
      ids: ids
    }
  })
}

/**
 * 还原
 * @param ids
 * @returns {*}
 */
export function restore(ids) {
  return http({
    url: '/yxdDataCenter/catBuyer/restore',
    method: 'DELETE',
    params: {
      ids: ids
    }
  })
}

/**
 * 查看详情
 * @param id
 * @returns {*}
 */
export function info(id) {
  return http({
    url: '/yxdDataCenter/catBuyer/detail',
    method: 'GET',
    params: {
      id: id
    }
  })
}

/**
 * 添加
 * @param form
 * @returns {*}
 */
export function add(form) {
  return http({
    url: '/yxdDataCenter/catBuyer/add',
    method: 'POST',
    params: {
      'catOrg.creditCode': form.catOrg.creditCode,
      'catOrg.organizeCode': form.catOrg.organizeCode,
      'catOrg.name': form.catOrg.name,
      'catOrg.code': form.catOrg.code,
      'catOrg.abbr': form.catOrg.abbr,
      'catOrg.spellAbbr': form.catOrg.spellAbbr,
      'catOrg.nameWb': form.catOrg.nameWb,
      'catBuyer.orgKind': form.catBuyer.orgKind,
      'catBuyer.medicareFlag': form.catBuyer.medicareFlag,
      'catBuyer.gradeNo': form.catBuyer.gradeNo,
      'catBuyer.orgType': form.catBuyer.orgType,
      'catBuyer.buyerKind': form.catBuyer.buyerKind,
      'catBuyer.subjectFlag': form.catBuyer.subjectFlag,
      'catBuyer.orgPresider': form.catBuyer.orgPresider,
      'catBuyer.orgAddress': form.catBuyer.orgAddress,
      'catBuyer.provinceId': form.catBuyer.provinceId,
      'catBuyer.cityId': form.catBuyer.cityId,
      'catBuyer.countyId': form.catBuyer.countyId,
      'catBuyer.bedNumber': form.catBuyer.bedNumber,
      'catBuyer.proprietorship': form.catBuyer.proprietorship,
      'catBuyer.outpatientPerDay': form.catBuyer.outpatientPerDay,
      'catBuyer.sumPerPerson': form.catBuyer.sumPerPerson,
      'catBuyer.salesumPerYear': form.catBuyer.salesumPerYear,
      'catBuyer.featureClinic': form.catBuyer.featureClinic,
      'catBuyer.doctorNum': form.catBuyer.doctorNum,
      'catBuyer.clinicMedicalMoney': form.catBuyer.clinicMedicalMoney,
      'catBuyer.inpatientNum': form.catBuyer.inpatientNum,
      'catBuyer.orgDesc': form.catBuyer.orgDesc,
      'catBuyer.linkPerson': form.catBuyer.linkPerson,
      'catBuyer.linkPhone': form.catBuyer.linkPhone,
      'catBuyer.linkEmail': form.catBuyer.linkEmail,
      'catBuyer.orgAccountName': form.catBuyer.orgAccountName,
      'catBuyer.orgBank': form.catBuyer.orgBank,
      'catBuyer.orgAccount': form.catBuyer.orgAccount,
      'catBuyer.taxCode': form.catBuyer.taxCode,
      'catBuyer.postCode': form.catBuyer.postCode,
      'catBuyer.orgPhone': form.catBuyer.orgPhone,
      'catBuyer.orgUrl': form.catBuyer.orgUrl,
      'catBuyer.orgFaxe': form.catBuyer.orgFaxe
    }
  })
}

/**
 * 修改
 * @param form
 * @returns {*}
 */
export function update(form) {
  return http({
    url: '/yxdDataCenter/catBuyer/update',
    method: 'POST',
    params: {
      'catOrg.id': form.catOrg.id,
      'catOrg.creditCode': form.catOrg.creditCode,
      'catOrg.organizeCode': form.catOrg.organizeCode,
      'catOrg.name': form.catOrg.name,
      'catOrg.code': form.catOrg.code,
      'catOrg.abbr': form.catOrg.abbr,
      'catOrg.spellAbbr': form.catOrg.spellAbbr,
      'catOrg.nameWb': form.catOrg.nameWb,
      'catBuyer.id': form.catBuyer.id,
      'catBuyer.orgKind': form.catBuyer.orgKind,
      'catBuyer.medicareFlag': form.catBuyer.medicareFlag,
      'catBuyer.gradeNo': form.catBuyer.gradeNo,
      'catBuyer.orgType': form.catBuyer.orgType,
      'catBuyer.buyerKind': form.catBuyer.buyerKind,
      'catBuyer.subjectFlag': form.catBuyer.subjectFlag,
      'catBuyer.orgPresider': form.catBuyer.orgPresider,
      'catBuyer.orgAddress': form.catBuyer.orgAddress,
      'catBuyer.provinceId': form.catBuyer.provinceId,
      'catBuyer.cityId': form.catBuyer.cityId,
      'catBuyer.countyId': form.catBuyer.countyId,
      'catBuyer.bedNumber': form.catBuyer.bedNumber,
      'catBuyer.proprietorship': form.catBuyer.proprietorship,
      'catBuyer.outpatientPerDay': form.catBuyer.outpatientPerDay,
      'catBuyer.sumPerPerson': form.catBuyer.sumPerPerson,
      'catBuyer.salesumPerYear': form.catBuyer.salesumPerYear,
      'catBuyer.featureClinic': form.catBuyer.featureClinic,
      'catBuyer.doctorNum': form.catBuyer.doctorNum,
      'catBuyer.clinicMedicalMoney': form.catBuyer.clinicMedicalMoney,
      'catBuyer.inpatientNum': form.catBuyer.inpatientNum,
      'catBuyer.orgDesc': form.catBuyer.orgDesc,
      'catBuyer.linkPerson': form.catBuyer.linkPerson,
      'catBuyer.linkPhone': form.catBuyer.linkPhone,
      'catBuyer.linkEmail': form.catBuyer.linkEmail,
      'catBuyer.orgAccountName': form.catBuyer.orgAccountName,
      'catBuyer.orgBank': form.catBuyer.orgBank,
      'catBuyer.orgAccount': form.catBuyer.orgAccount,
      'catBuyer.taxCode': form.catBuyer.taxCode,
      'catBuyer.postCode': form.catBuyer.postCode,
      'catBuyer.orgPhone': form.catBuyer.orgPhone,
      'catBuyer.orgUrl': form.catBuyer.orgUrl,
      'catBuyer.orgFaxe': form.catBuyer.orgFaxe
    }
  })
}

/**
 * 初始化录入人信息
 * @returns {*}
 */
export function user() {
  return http({
    url: '/yxdDataCenter/catBuyer/queryUser',
    method: 'GET'
  })
}

/**
 * 生产单位代码
 * @param code
 * @returns {*}
 */
export function generateCode(code) {
  return http({
    url: '/yxdDataCenter/catBuyer/generateCode',
    method: 'GET',
    params: {
      code: code
    }
  })
}

/**
 * 初始化医疗机构类别
 * @returns {*}
 */
export function initBuyerKind() {
  return http({
    url: '/yxdDataCenter/catBuyer/initBuyerKind',
    method: 'GET'
  })
}
