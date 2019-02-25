import http from 'src/axios/http'

/**
 * 查询项目列表
 * @returns {*}
 */
export function catProjectList() {
  return http({
    url: '/auditchanges/groupDosage/catProject',
    method: 'get',
  });
}

/**
 * 通过id查询用户
 *
 * @param id 用户id
 * @author: sun
 * @date: 2018-03-15 13:24:40
 */
export function dosageView (id) {
  return http({
    url: '/auditchanges/groupDosage/get',
    method: 'get',
    params: {'id': id}
  })
}

/**
 * 查询剂型列表
 * @returns {*}
 */
export function dosageFormList() {
  return http({
    url: '/auditchanges/groupDosage/dosageFormList',
    method: 'get',
  });
}

/**
 * 合并剂型管理 - 查询列表
 * @param pageNum 页码, pageSize 条数
 */
export function dosagelist (resData, queryData) {
  queryData.pageNum = resData.pageNum;
  queryData.pageSize = resData.pageSize;
  return http({
    url: '/auditchanges/groupDosage/list',
    method: 'get',
    params: queryData
  });
}

/**
 * 合并剂型管理 - 新增合并剂型
 * @param dosage 新增合并剂型
 */
export function dosageAdd (dosage) {
  var codes = "", names = "";
  dosage.DOSAGE_FORM_IDS.forEach(x => {
    var temp = x.split("!!");
    codes += "," + temp[0];
    names += "," + temp[1];
  });
  codes = codes == "" ? codes : codes.substr(1);
  names = names == "" ? names : names.substr(1);

  return http({
    url: '/auditchanges/groupDosage/add',
    method: 'post',
    data: {
      groupName: dosage.GROUP_NAME,
      dosageFormIds: codes,
      dosageFormNames: names,
      remark: dosage.REMARK,
      catProjectId: dosage.CAT_PROJECT_ID,
      enableFlag: dosage.ENABLE_FLAG,
    }
  })
}

/**
 * 合并剂型管理 - 修改合并剂型
 * @param dosage 修改合并剂型
 */
export function dosageUpdate (dosage) {
  var codes = "", names = "";
  dosage.DOSAGE_FORM_IDS.forEach(x => {
    var temp = x.split("!!");
    codes += "," + temp[0];
    names += "," + temp[1];
  });
  codes = codes == "" ? codes : codes.substr(1);
  names = names == "" ? names : names.substr(1);

  return http({
    url: '/auditchanges/groupDosage/update',
    method: 'put',
    data: {
      id: dosage.id,
      groupName: dosage.GROUP_NAME,
      dosageFormIds: codes,
      dosageFormNames: names,
      remark: dosage.REMARK,
      catProjectId: dosage.CAT_PROJECT_ID,
      enableFlag: dosage.ENABLE_FLAG,
    }
  })
}

/**
 * 用户管理 - 删除用户
 * @param dosage 删除用户
 */
export function dosageDel (id) {
  return http({
    url: '/auditchanges/groupDosage/delete',
    method: 'delete',
    params: {id}
  })
}
