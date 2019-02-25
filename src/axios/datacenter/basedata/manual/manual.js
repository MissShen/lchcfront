import http from 'src/axios/http'
import moment from 'moment'

/**
 *药品说明书
 * @returns {*}
 */
export function list(query, resData) {
  return http({
      url: '/yxdDataCenter/manual/list',
      method: 'GET',
      params: {
        'catDrug.nameChn': query.catDrug.nameChn,
        'catDrug.spec': query.catDrug.spec,
        'catOrg.name': query.catOrg.name,
        'catManual.permitNumber': query.catManual.permitNumber,
        'pageNum': resData.pageNum,
        'pageSize': resData.pageSize,
        'orderBy':query.orderBy
      }
    }
  )
}

/**
 * 查看详情
 * @param id
 * @returns {*}
 */
export function info(id) {
  return http({
    url: '/yxdDataCenter/manual/check',
    method: 'GET',
    params: {
      id: id
    }
  })
}

/**
 * 选择关联产品信息
 */
export function showProducts(name, id, resData, searchNameOrCode,orderBy) {
  return http({
    url: '/yxdDataCenter/manual/queryGeneralNameList',
    method: 'GET',
    params: {
      'catOrg.name': name,
      'productId': id,
      'searchNameOrCode': searchNameOrCode,
      'pageNum': resData.pageNum,
      'pageSize': resData.pageSize,
      'orderBy':orderBy
    }
  })
}

/**
 * 查看已关联产品信息
 */
export function assoProduct(id, resData,orderBy) {
  return http({
    url: '/yxdDataCenter/manual/queryRelatedProducts',
    method: 'GET',
    params: {
      'id': id,
      'pageNum': resData.pageNum,
      'pageSize': resData.pageSize,
      'orderBy':orderBy
    }
  })
}

/**
 * 查看未关联产品信息
 * @param id
 * @returns {*}
 */
export function notAsso(name, id, resData, searchNameOrCode,orderBy) {
  return http({
    url: '/yxdDataCenter/manual/queryUnRelatedProducts',
    method: 'GET',
    params: {
      'catManual.id': id,
      'catOrg.name': name,
      'searchNameOrCode': searchNameOrCode,
      'pageNum': resData.pageNum,
      'pageSize': resData.pageSize,
      'orderBy':orderBy
    }
  })
}

/**
 * 查看通用名称
 * @returns {*}
 */
export function aliasData(search, id, resData) {
  return http({
    url: '/yxdDataCenter/manual/queryGeneralNameList',
    method: 'GET',
    params: {
      'catOrg.code': search.catOrg.code,
      'productId': id,
      'searchNameOrCode': search.searchNameOrCode,
      'pageNum': resData.pageNum,
      'pageSize': resData.pageSize,
      'orderBy':search.orderBy
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
      url: '/yxdDataCenter/manual/add',
      method: 'POST',
      params: {
        'catManual.component': form.catManual.component,
        'catManual.traits': form.catManual.traits,
        'catManual.indication': form.catManual.indication,
        'catManual.attending': form.catManual.attending,
        'catManual.usageDosage': form.catManual.usageDosage,
        'catManual.adverseReaction': form.catManual.adverseReaction,
        'catManual.taboo': form.catManual.taboo,
        'catManual.attentionMatter': form.catManual.attentionMatter,
        'catManual.drugInteraction': form.catManual.drugInteraction,
        'catManual.drugOverdose': form.catManual.drugOverdose,
        'catManual.permitNumber': form.catProduct.permitNumber,
        'catManual.pharmacologyToxicology': form.catManual.pharmacologyToxicology,
        'catManual.pharmacokinetics': form.catManual.pharmacokinetics,
        'catManual.drugStorage': form.catManual.drugStorage,
        'catManual.wrap': form.catManual.wrap,
        'catManual.validDate': form.catManual.validDate,
        'catManual.executionStandard': form.catManual.executionStandard,
        'catManual.address': form.catManual.address,
        'catManual.registerAddress': form.catManual.registerAddress,
        'catManual.specialFlag': form.catManual.specialFlag,
        'catManual.gravidaMedicine': form.catManual.gravidaMedicine,
        'catManual.childrenMedicine': form.catManual.childrenMedicine,
        'catManual.geriatricMedicine': form.catManual.geriatricMedicine,
        'catManual.consignFlag': form.catManual.consignFlag,
        'catManual.entrustedManufactureName': form.catManual.entrustedManufactureName,
        'catManual.entrustedAddress': form.catManual.entrustedAddress,
        'catManual.packOrgFlag': form.catManual.packOrgFlag,
        'catManual.actualManufacture': form.catManual.actualManufacture,
        'catManual.packManufactureName': form.catManual.packManufactureName,
        'catManual.packAddress': form.catManual.packAddress,
        'catManual.remark': form.catManual.remark,
        'catManual.postCode': form.catManual.postCode,
        'catManual.tel': form.catManual.tel,
        'catManual.fax': form.catManual.fax,
        'catManual.website': form.catManual.website,
        'catManual.serviceHotline': form.catManual.serviceHotline,
        'catManual.approvalDate': dateChange(form.catManual.approvalDate),
        'manualRevisionDate': dateChange(form.manualRevisionDate),
        'ids': form.ids,
        'productCount': form.productCount,
        'productId': form.productId,
        'flag': form.flag,
        'content': form.content
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
    url: '/yxdDataCenter/manual/del',
    method: 'DELETE',
    params: {
      ids: ids
    }
  })
}

/**
 * 取消关联产品
 * @param ids
 * @returns {*}
 */
export function delRP(manualId, ids) {
  return http({
    url: '/yxdDataCenter/manual/deleteRelatedProducts',
    method: 'DELETE',
    params: {
      'id': manualId,
      'ids': ids
    }
  })
}

/**
 * 修改
 * @param form
 * @returns {*}
 */
export function modify(form) {
  return http({
    url: '/yxdDataCenter/manual/modify',
    method: 'POST',
    params: {
      'catManual.id': form.catManual.id,
      'catManual.component': form.catManual.component,
      'catManual.traits': form.catManual.traits,
      'catManual.indication': form.catManual.indication,
      'catManual.attending': form.catManual.attending,
      'catManual.usageDosage': form.catManual.usageDosage,
      'catManual.adverseReaction': form.catManual.adverseReaction,
      'catManual.taboo': form.catManual.taboo,
      'catManual.attentionMatter': form.catManual.attentionMatter,
      'catManual.drugInteraction': form.catManual.drugInteraction,
      'catManual.drugOverdose': form.catManual.drugOverdose,
      'catManual.permitNumber': form.catManual.permitNumber,
      'catManual.pharmacologyToxicology': form.catManual.pharmacologyToxicology,
      'catManual.pharmacokinetics': form.catManual.pharmacokinetics,
      'catManual.drugStorage': form.catManual.drugStorage,
      'catManual.wrap': form.catManual.wrap,
      'catManual.validDate': form.catManual.validDate,
      'catManual.executionStandard': form.catManual.executionStandard,
      'catManual.address': form.catManual.address,
      'catManual.registerAddress': form.catManual.registerAddress,
      'catManual.specialFlag': form.catManual.specialFlag,
      'catManual.gravidaMedicine': form.catManual.gravidaMedicine,
      'catManual.childrenMedicine': form.catManual.childrenMedicine,
      'catManual.geriatricMedicine': form.catManual.geriatricMedicine,
      'catManual.consignFlag': form.catManual.consignFlag,
      'catManual.entrustedManufactureName': form.catManual.entrustedManufactureName,
      'catManual.entrustedAddress': form.catManual.entrustedAddress,
      'catManual.packOrgFlag': form.catManual.packOrgFlag,
      'catManual.actualManufacture': form.catManual.actualManufacture,
      'catManual.packManufactureName': form.catManual.packManufactureName,
      'catManual.packAddress': form.catManual.packAddress,
      'catManual.remark': form.catManual.remark,
      'catManual.postCode': form.catManual.postCode,
      'catManual.tel': form.catManual.tel,
      'catManual.fax': form.catManual.fax,
      'catManual.updateDateHis': form.catManual.updateDateHis,
      'catManual.website': form.catManual.website,
      'catManual.serviceHotline': form.catManual.serviceHotline,
      'catManual.approvalDate': dateChange(form.catManual.approvalDate),
      'manualRevisionDate': dateChange(form.manualRevisionDate),
      'ids': form.ids,
      'productCount': form.productCount,
      'productId': form.productId,
      'flag': form.flag,
      'content': form.content
    }
  })
}
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

