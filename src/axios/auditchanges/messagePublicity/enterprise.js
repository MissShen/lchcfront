import http from 'src/axios/http'
import { convert, filter_x, convertQuestion } from 'src/axios/auditchanges/common/nestedJson'

/**
 * 申报列表
 * @param resData
 * @param query
 * @returns {*}
 */
export function declareList(resData, query) {
  query.pageNum = resData.pageNum;
  query.pageSize = resData.pageSize;
  return http({
    url: '/auditchanges/enterprisePublicity/declareList',
    method: "get",
    params: query
  });
}

/**
 * 申报详细信息
 * @param id
 * @returns {*}
 */
export function declare(id) {
  return http({
    url: '/auditchanges/enterprisePublicity/declare',
    method: "get",
    params: {
      ID: id
    }
  });
}

/**
 * 保存申报质疑
 * @param form
 * @param show
 * @returns {*}
 */
export function declareAdd(form, show, fileList) {
  // 克隆数据
  form = JSON.parse(JSON.stringify(form));
  show = JSON.parse(JSON.stringify(show));

  // 过滤掉没选中的数据
  filter_x(form, show);
  // 转换为质疑特有格式
  convertQuestion(form);

  let json = {};
  json.foreignId = form.id;
  json.content = [];

  delete form.id;

  if(!fileList) {
    return {
      message: "没有上传质疑文件"
    }
  }

  for(let key in form) {
    console.log(key);
    if(form[key]) {
      if(!fileList[key]) {
        return {
          message: "请上传所有质疑文件"
        }
      }
      json.content.push({
        field: key,
        fileId: fileList[key],
        value: form[key],
        questionTargetType: 1,
        questionType: 1,
      });
    }
  }

  return http({
    url: '/auditchanges/questionTypeInfo/question',
    method: "post",
    data: convert(json)
  });
}

/**
 * 变更列表
 * @param resData
 * @param query
 * @returns {*}
 */
export function changeList(resData, query) {
  query.pageNum = resData.pageNum;
  query.pageSize = resData.pageSize;
  return http({
    url: '/auditchanges/enterprisePublicity/changeList',
    method: "get",
    params: query
  });
}

/**
 * 变更详细信息
 * @param id
 * @returns {*}
 */
export function finalOrg(id) {
  return http({
    url: '/auditchanges/enterprisePublicity/finalOrg',
    method: "get",
    params: {
      id: id
    }
  });
}

/**
 * 变更后信息
 * @param id
 * @returns {*}
 */
export function queryKeyValue(id) {
  return http({
    url: '/auditchanges/enterprisePublicity/queryKeyValue',
    method: "get",
    params: {
      ID: id
    }
  });
}

/**
 * 保存变更质疑
 * @param form
 * @param show
 * @returns {*}
 */
export function changeAdd(form, show, fileList) {
  // 克隆数据
  form = JSON.parse(JSON.stringify(form));
  show = JSON.parse(JSON.stringify(show));

  // 过滤掉没选中的数据
  filter_x(form, show);
  // 转换为质疑特有格式
  convertQuestion(form);

  let json = {};
  json.foreignId = form.id;
  json.content = [];

  delete form.id;

  if(!fileList) {
    return {
      message: "没有上传质疑文件"
    }
  }

  for(let key in form) {
    if(form[key]) {
      console.log(fileList[key]);
      if(!fileList[key]) {
        return {
          message: "请上传所有质疑文件"
        }
      }
      json.content.push({
        field: key,
        fileId: fileList[key],
        value: form[key],
        questionTargetType: 1,
        questionType: 2,
      });
    }
  }

  console.log(convert(json));
  return http({
    url: '/auditchanges/questionTypeInfo/question',
    method: "post",
    data: convert(json)
  });
}

export function queryDoubt(id) {
  return http({
    url: '/auditchanges/enterprisePublicity/queryDoubt',
    method: "post",
    data: {
      ID: id
    }
  });
}

/**
 * 企业信用列表
 * @param resData
 * @param query
 * @returns {*}
 */
export function creditList(resData, query) {
  query.pageNum = resData.pageNum;
  query.pageSize = resData.pageSize;
  return http({
    url: '/auditchanges/enterprisePublicity/creditList',
    method: "get",
    params: query
  });
}
