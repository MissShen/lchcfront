import http from "../../http";
import {convert, dateFormat} from 'src/axios/auditchanges/common/nestedJson'

export function getProjectList(resData, paramsForm) {
  // console.log(resData.pageNum,'resData.pageNum');
  // console.log(resData.pageSize,'resData.pageSize');
  return http({
    url: "/auditchanges/audingManage/getProjectListByOrgId",
    method: 'get',
    params: {
      pageNum: resData.pageNum,
      pageSize: resData.pageSize,
      projectCode: paramsForm.projectCode,
      projectName: paramsForm.projectName,
      state: paramsForm.state
    },
  });
}

/**
 * 删除表单
 */
export function projectDel(id) {
  return http({
    url: '/auditchanges/audingManage/delete',
    method: 'get',
    params: {
      'id': id
    }
  })
}


/**
 * 查看表单
 */
export function projectView(id) {
  return http({
    url: '/auditchanges/audingManage/echoFrom',
    method: 'get',
    params: {
      'id': id
    }
  })
}

/**
 * 修改表单
 */
export function projectUpdate(paramsForm) {
  // paramsForm = JSON.parse(JSON.stringify(paramsForm));
  // paramsForm = convert(paramsForm);
  dateFormat(paramsForm, ["Date"], "YYYY-MM-DD");
  return http({
    url: '/auditchanges/audingManage/updateFrom',
    method: 'post',
    type: 'json',
    data:paramsForm,
  })
}


/**
 * 提交表单
 * @returns {*}
 */
export function submitFrom(paramsForm) {
  // paramsForm = JSON.parse(JSON.stringify(paramsForm));
  // paramsForm = convert(paramsForm);
  dateFormat(paramsForm, ["Date"], "YYYY-MM-DD");
  return http({
    url: "/auditchanges/audingManage/submitFrom",
    method: 'post',
    type:'json',
    data: paramsForm,
  });
}

export function validationProjectName(projectName) {
  return http({
    url: "/auditchanges/audingManage/validationProjectName",
    method: 'get',
    params: {
      projectName: projectName
    },
  });
}

export function validationProjectCode(projectCode) {
  return http({
    url: "/auditchanges/audingManage/validationProjectCode",
    method: 'get',
    params: {
      projectCode: projectCode
    },
  });
}

