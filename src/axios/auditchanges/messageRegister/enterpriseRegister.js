import http from 'src/axios/http'
import { convert, dateFormat } from 'src/axios/auditchanges/common/nestedJson'
import moment from 'moment'

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
    url: '/auditchanges/entReg/insert',
    method: 'post',
    data: form,
  });
}

/**
 * 企业注册
 * @param form
 * @returns {*}
 */
export function edit(form) {
  form = JSON.parse(JSON.stringify(form));
  form = convert(form);
  dateFormat(form, ["Date", "regExpireS", "regExpireE"], "YYYY/MM/DD");

  form["catEnterpriseOrgDomain.factoryFlag"] = form["catEnterpriseOrgDomain.factoryFlag"] ? 1 : 0;
  form["catEnterpriseOrgDomain.salerFlag"] = form["catEnterpriseOrgDomain.salerFlag"] ? 1 : 0;
  form["catEnterpriseOrgDomain.sendFlag"] = form["catEnterpriseOrgDomain.sendFlag"] ? 1 : 0;
  form["catEnterpriseRegDomain.regExpireY"] = form["catEnterpriseRegDomain.regExpireY"] ? 1 : 0;

  console.log(form);
  return http({
    url: '/auditchanges/entReg/edit',
    method: 'post',
    data: form,
  });
}

/**
 * 查询企业信息
 * @param id
 * @returns {*}
 */
export function get(id) {
  return http({
    url: "/auditchanges/entReg/getEnterpriseDomainByOrgId",
    method: 'get',
    params: {
      orgId: id
    },
  });
}

export function findPacking(name, res) {
  return http({
    url: "/auditchanges/entReg/findPacking",
    method: 'get',
    params: {
      name,
      pageNum: res.pageNum,
      pageSize: res.pageSize,
    }
  })
}

export function addDoubt(id, content, fileList) {
  let json = {};
  json.foreignId = id;
  json.content = [];

  if(!fileList) {
    return {
      message: "没有上传质疑文件"
    }
  }

  json.content.push({
    fileId: fileList,
    value: content,
    questionTargetType: 1,
    questionType: 0,
  });

  console.log(id)
  console.log(content)
  console.log(fileList)
  console.log(JSON.stringify(json))

  return http({
    url: '/auditchanges/entReg/question',
    method: "post",
    data: convert(json)
  });
}

export function queryDoubt(foreignId) {
  return http({
    url: '/auditchanges/entReg/doubt',
    method: "get",
    params: {
      ID: foreignId
    }
  });
}
