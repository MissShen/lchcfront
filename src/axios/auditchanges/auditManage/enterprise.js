import http from 'src/axios/http'
import { filter_x, convertQuestion, dateFormat } from 'src/axios/auditchanges/common/nestedJson'

/**
 * 获取审核轮次
 * @returns {*}
 */
export function project() {
  return http({
    url: "/auditchanges/enterpriseAudit/project",
    method: "get",
  });
}

export function declareList(resData, query) {
  query.pageNum = resData.pageNum;
  query.pageSize = resData.pageSize;
  return http({
    url: '/auditchanges/enterpriseAudit/declareList',
    method: "get",
    params: query
  });
}

export function declare(id) {
  return http({
    url: '/auditchanges/enterpriseAudit/declare',
    method: "get",
    params: {
      ID: id
    }
  });
}

export function changeList(resData, query) {
  query.pageNum = resData.pageNum;
  query.pageSize = resData.pageSize;
  return http({
    url: '/auditchanges/enterpriseAudit/changeList',
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

export function doubt(foreign_id) {
  return http({
    url: '/auditchanges/enterpriseAudit/doubt',
    method: "get",
    params: {
      ID: foreign_id
    }
  })
}

export function audit(foreign_id) {
  return http({
    url: '/auditchanges/enterpriseAudit/audit',
    method: "get",
    params: {
      ID: foreign_id,
    }
  })
}

export function clarify(foreign_id) {
  return http({
    url: "/auditchanges/enterpriseAudit/clarify",
    method: "get",
    params: {
      ID: foreign_id,
    }
  });
}

export function updateQuestion(id, content) {
  return http({
    url: "/auditchanges/enterpriseAudit/updateQuestion",
    method: "post",
    data: {
      ID: id,
      REPLY_CONTENT: content,
    }
  });
}

export function updateTalk(id, field, content) {
  return http({
    url: "/auditchanges/enterpriseAudit/updateTalk",
    method: "post",
    data: {
      ID: id,
      REPLY_CONTENT: content,
      QUESTION_FIELD: field,
    }
  });
}

export function declareSave(form, show, audit, count) {
  // 克隆数据
  form = JSON.parse(JSON.stringify(form));
  show = JSON.parse(JSON.stringify(show));
  audit = JSON.parse(JSON.stringify(audit));

  let json = {};
  json.content = [];

  // 过滤掉没选中的数据
  filter_x(form, show);
  // 转换为质疑特有格式
  convertQuestion(form);

  json.CHECK_TYPE = 1;
  json.FOREIGN_ID = form.id;
  json.CHECK_COUNT = form.CHECK_COUNT;
  if(count == json.CHECK_COUNT) {
    json.ID = form.id;
    json.AUDIT_RESULT = audit.CHECK_RESULT == 1 ? 1 : 3;
  }

  delete form.id;
  delete form.CHECK_COUNT;

  for(let key in form) {
    if(form[key]) {
      json.content.push({
        FOREIGN_ID: json.FOREIGN_ID,
        QUESTION_FIELD: key,
        QUESTION_EDITVAL: form[key],
        QUESTION_TARGET_TYPE: 1,
        QUESTION_TYPE: 1,
        CHECK_FLAG: 1,
      });
    }
  }

  delete form.id;
  json = Object.assign(json, audit);
  dateFormat(json);

  return http({
    url: "/auditchanges/enterpriseAudit/save",
    method: "post",
    data: {
      json: JSON.stringify(json)
    },
  })
}

export function changeSave(form, show, audit, count) {
  // 克隆数据
  form = JSON.parse(JSON.stringify(form));
  show = JSON.parse(JSON.stringify(show));
  audit = JSON.parse(JSON.stringify(audit));

  let json = {};
  json.content = [];

  // 过滤掉没选中的数据
  filter_x(form, show);
  // 转换为质疑特有格式
  convertQuestion(form);

  json.CHECK_TYPE = 1;
  json.FOREIGN_ID = form.id;
  json.CHECK_COUNT = form.CHECK_COUNT;
  if(count == json.CHECK_COUNT) {
    json.ID = form.id;
    json.AUDIT_RESULT = audit.CHECK_RESULT == 1 ? 1 : 3;
  }

  delete form.id;
  delete form.CHECK_COUNT;

  for(let key in form) {
    if(form[key]) {
      json.content.push({
        FOREIGN_ID: json.FOREIGN_ID,
        QUESTION_FIELD: key,
        QUESTION_EDITVAL: form[key],
        QUESTION_TARGET_TYPE: 1,
        QUESTION_TYPE: 2,
        CHECK_FLAG: 1,
      });
    }
  }

  delete form.id;

  return http({
    url: "/auditchanges/enterpriseAudit/save",
    method: "post",
    data: {
      json: JSON.stringify(Object.assign(json, audit))
    },
  })
}

export function recording(id) {
  return http({
    url: "/auditchanges/enterpriseAudit/recording",
    method: "get",
    params: {
      FOREIGN_ID: id
    }
  });
}
