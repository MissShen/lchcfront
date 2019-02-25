import http from 'src/axios/http'
import { dateFormat, convert } from 'src/axios/auditchanges/common/nestedJson'

/**
 * 获取机构列表
 * @param search
 * @param resData
 */
export function sellOrgList(search, resData) {
  return http({
    url: '/yxdDataCenter/sellOrg/list',
    method: 'GET',
    params: {
      'pageNum': resData.pageNum,
      'pageSize': resData.pageSize,
      'searchType': search.searchType,
      'searchText': search.searchText == undefined? '': search.searchText,
      'wholesale': search.wholesale,
      'distribution': search.distribution,
      'produce': search.produce,
      'review': search.review,
      'reviewer': search.reviewer,
      'reviewTimeStart': search.reviewTimeStart,
      'reviewTimeEnd': search.reviewTimeEnd,
      'standard': search.standard,
      'orderBy':search.orderBy
    }
  })
}

/**
 * 删除
 * @param code
 * @returns {*}
 */
export function remove(ids) {
  return http({
      url: '/yxdDataCenter/sellOrg/deleteSellOrg',
      method: 'DELETE',
      params: {
        'ids': ids
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
    url:'/yxdDataCenter/sellOrg/sellOrgInfo',
    method: 'GET',
    params: {
      id: id
    }
  })
}

/**
 * 获取所有审核人
 * @param id
 * @returns {*}
 */
export function queryReviewerList() {
  return http({
    url:'/yxdDataCenter/sellOrg/queryReviewerList',
    method: 'GET',
    params: {}
  })
}

/**
 * 获取所有关联企业
 * @param id
 * @returns {*}
 */
export function queryRelatedOrg(id, search, resData) {
  return http({
    url:'/yxdDataCenter/sellOrg/queryRelatedOrg',
    method: 'GET',
    params: {
      id: id,
      'searchType': search.searchType,
      'searchText': search.searchText == undefined? '': search.searchText,
      'pageNum': resData.pageNum,
      'pageSize': resData.pageSize
    }
  })
}

/**
 * 获取所有未关联企业
 * @param id
 * @returns {*}
 */
export function queryNoRelatedOrg(id, search, resData) {
  return http({
    url:'/yxdDataCenter/sellOrg/queryNoRelatedOrg',
    method: 'GET',
    params: {
      id: id,
      'searchType': search.searchType,
      'searchText': search.searchText == undefined? '': search.searchText,
      'pageNum': resData.pageNum,
      'pageSize': resData.pageSize
    }
  })
}

/**
 * 新增关联
 * @param oldIds
 * @param newId
 */
export function insertRelatedOrg(oldIds, newId) {
  return http({
      url: '/yxdDataCenter/sellOrg/insertRelatedOrg',
      method: 'POST',
      params: {
        ids: oldIds,
        newId, newId
      }
    }
  )
}

/**
 * 取消关联
 * @param oldIds
 * @param newId
 */
export function deleteRelatedOrg(oldIds, newId) {
  return http({
      url: '/yxdDataCenter/sellOrg/deleteRelatedOrg',
      method: 'DELETE',
      params: {
        ids: oldIds,
        id: newId
      }
    }
  )
}

/**
 * 获取假冒药列表
 * @param id
 * @returns {*}
 */
export function queryCounterfeitMedicineRecording(id) {
  return http({
    url:'/yxdDataCenter/sellOrg/queryCounterfeitMedicineRecording',
    method: 'GET',
    params: {
      id: id,
      'pageNum': 0,
      'pageSize': 999999
    }
  })
}

/**
 * 获取伪劣药列表
 * @param id
 * @returns {*}
 */
export function queryCounterfeitRecording(id) {
  return http({
    url:'/yxdDataCenter/sellOrg/queryCounterfeitRecording',
    method: 'GET',
    params: {
      id: id,
      'pageNum': 0,
      'pageSize': 999999
    }
  })
}

/**
 * 获取GMP列表
 * @param id
 * @returns {*}
 */
export function queryGmpList(id,resData) {
  return http({
    url:'/yxdDataCenter/sellOrg/queryGmpList',
    method: 'GET',
    params: {
      id: id,
      'pageNum': resData.pageNum,
      'pageSize': resData.pageSize,
    }
  })
}

/**
 * 获取分装企业
 * @param search
 * @param resData
 */
export function queryDisList(search, resData) {
  return http({
    url:'/yxdDataCenter/sellOrg/queryDisList',
    method: 'GET',
    params: {
      'searchType': search.searchType,
      'searchText': search.searchText == undefined? '': search.searchText,
      'pageNum': resData.pageNum,
      'pageSize': resData.pageSize
    }
  })
}

/**
 * 删除GMP
 * @param oldIds
 * @param newId
 */
export function deleteGmp(gmpId) {
  console.log(gmpId);
  return http({
      url: '/yxdDataCenter/sellOrg/deleteGmp',
      method: 'DELETE',
      params: {
        gmpId: gmpId
      }
    }
  )
}

/**
 * 获取卖方机构回收站列表
 * @param id
 * @returns {*}
 */
export function recycleBinList(search, resData) {
  return http({
    url:'/yxdDataCenter/sellOrg/recycleBinList',
    method: 'GET',
    params: {
      'searchType': search.searchType,
      'searchText': search.searchText == undefined? '': search.searchText,
      'pageNum': resData.pageNum,
      'pageSize': resData.pageSize,
      'orderBy':search.orderBy
    }
  })
}
/**
 * 获取卖方机构质疑信息列表
 * @param id
 * @returns {*}
 */
export function queryQuestions(search, resData) {
  return http({
    url:'/yxdDataCenter/questionTypeInfo/list',
    method: 'GET',
    params: {
      'foreignId':search.id,
      'questionTargetType':'1',
      'pageNum': resData.pageNum,
      'pageSize': resData.pageSize,
      'orderBy':search.orderBy
    }
  })
}


/**
 * 还原
 * @param id
 */
export function revert(id) {
  return http({
      url: '/yxdDataCenter/sellOrg/revertSellOrg',
      method: 'PUT',
      params: {
        id: id
      }
    }
  )
}

/**
 * 标准化 保存
 * @param from
 */
export function saveEdit(from, other) {
  dateFormat(from, ['DATE'])
  dateFormat(other, ['DATE'])
  return http({
      url: '/yxdDataCenter/sellOrg/updateSellOrg',
      method: 'PUT',
      params: Object.assign(from, other)
      // params: {
      //   from,
      //   other
      // }
    }
  )
}

/**
 * 标准化 回复质疑信息
 * @param from
 */
export function saveReply(form) {
  return http({
      url: '/yxdDataCenter/questionTypeInfo/updateQuestionTypeInfo',
      method: 'PUT',
      params: {
        'id':form.replyId,
        'replyContent':form.replyContent
      }
    }
  )
}

/**
 * 获取GMP详细信息
 * @param gmpId
 */
export function findGmp(gmpId) {
  return http({
    url: '/yxdDataCenter/sellOrg/findGmp',
    method: 'GET',
    params: {
      gmpId: gmpId
    }
  })
}

/**
 * 修改GMP
 * @param id
 */
export function updateGmp(obj) {
  dateFormat(obj, ['DATE'])
  return http({
      url: '/yxdDataCenter/sellOrg/updateGmp',
      method: 'PUT',
      params: obj
    }
  )
}

/**
 * 企业注册
 * @param form
 * @returns {*}
 */
export function insert(form) {
  form = JSON.parse(JSON.stringify(form));
  form = convert(form);
  dateFormat(form, ["Date", "regExpireS", "regExpireE"], "YYYY/MM/DD");

  form["catEnterpriseOrgDomain.factoryFlag"] = form["catEnterpriseOrgDomain.factoryFlag"] ? 1 : 0;
  form["catEnterpriseOrgDomain.salerFlag"] = form["catEnterpriseOrgDomain.salerFlag"] ? 1 : 0;
  form["catEnterpriseOrgDomain.sendFlag"] = form["catEnterpriseOrgDomain.sendFlag"] ? 1 : 0;
  form["catEnterpriseRegDomain.regExpireY"] = form["catEnterpriseRegDomain.regExpireY"] ? 1 : 0;

  console.log(form);
  return http({
    url: '/yxdDataCenter/sellOrg/insertSellOrg',
    method: 'post',
    data: form,
  });
}

/**
 * 获取一个org_id
 */
export function getOrgId() {
  return http({
      url: '/yxdDataCenter/sellOrg/getOrgId',
      method: 'GET',
      params: {}
    }
  )
}
