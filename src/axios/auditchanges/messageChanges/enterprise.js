import http from 'src/axios/http'
import { filter_x, convertQuestion, dateFormat } from 'src/axios/auditchanges/common/nestedJson'
import moment from "moment"

/**
 * 查询挂网信息(变更前)，用于变更申报
 * @returns {*}
 */
export function queryFinalOrg() {
  return http({
    url: "/auditchanges/enterpriseChange/queryFinalOrg",
    method: "get",
  });
}

/**
 * 查询挂网信息(变更前)，用于变更修改
 * @returns {*}
 */
export function queryFinalOrgById(id) {
  return http({
    url: "/auditchanges/enterpriseChange/queryFinalOrgById",
    method: "get",
    params: {
      id: id,
    }
  })
}

/**
 * 保存变更信息，申报和修改都调用这个接口
 * @param old
 * @param form
 * @param show
 * @returns {*}
 */
export function save(old, form, show) {
  // 克隆数据
  old = JSON.parse(JSON.stringify(old));
  form = JSON.parse(JSON.stringify(form));
  show = JSON.parse(JSON.stringify(show));

  let json = {};
  json.COMPANY_ID = form.id;
  json.ID = form.ID;
  json.list = [];

  delete form.id;
  delete form.ID;

  // 获取所有新增的GMP
  let gmp = [];
  for(let i in old.gmp) {
    if(!old.gmp[i].PROJECT_ORG_ID) {
      gmp.push(i);
    }
  }

  if(JSON.stringify(form.fileList) != "{}") {
    show.fileList$ = true;
    form.fileList = JSON.stringify(form.fileList);
  }

  // 过滤掉没选中的数据
  filter_x(form, show);

  // 转换附件格式
  for(let key in form) {
    if(form[key].fileList){
      form[key].fileList = JSON.stringify(form[key].fileList);
    }
  }
  // 转换GMP附件格式
  form.gmp.forEach(x => {
    if(x.fileList)
      x.fileList = JSON.stringify(x.fileList);
  });
  // 转换新增GMP附件格式
  old.gmp.forEach(x => {
    if(x.fileList)
      x.fileList = JSON.stringify(x.fileList);
  });

  // 转换为质疑特有格式
  convertQuestion(form);
  convertQuestion(old);

  dateFormat(old, ["DATE"]);
  dateFormat(form, ["DATE"]);

  for(let key in form) {
    if(form[key]) {
      json.list.push({
        FIELD: key,
        UP_VALUE: form[key],
        EXPLAIN: old[key],
      });
    }
  }

  for(let key in old) {
    // 遍历新增的GMP
    gmp.forEach(i => {
      let regex = new RegExp("^gmp\\." + i + "\\.");
      if(regex.exec(key)) {
        // 取出所有新增GMP相应字段
        json.list.push({
          FIELD: key,
          UP_VALUE: old[key],
        });
      }
    });
  }

  // 这个数据是给其他系统用的
  if(form["org.NAME"]) {
    json.YORG_NAME = old["org.NAME"];
    json.ORG_NAME = form["org.NAME"];
  }

  if(json.list.length == 0) {
    return {
      message: "未变更任何字段"
    }
  }

  console.log(json);
  return http({
    url: "/auditchanges/enterpriseChange/save",
    method: "post",
    data: {
      json: JSON.stringify(json),
    }
  })
}

export function list(resData, query) {
  if(query.BEGIN) {
    query.BEGIN = moment(query.BEGIN).format("YYYY-MM-DD HH:mm:ss");
  }

  if(query.END) {
    query.END = moment(query.END).format("YYYY-MM-DD HH:mm:ss");
  }
  return http({
    url: "/auditchanges/enterpriseChange/list",
    method: "get",
    params: Object.assign(resData, query),
  })
}

export function queryKeyValue(id) {
  return http({
    url: "/auditchanges/enterpriseChange/queryKeyValue",
    method: "get",
    params: {
      ID: id
    }
  });
}

export function updateState(id) {
  return http({
    url: "/auditchanges/enterpriseChange/updateState",
    method: "post",
    data: {
      ID: id,
      STATE: '1'
    }
  });
}

export function checkCopy(id) {
  return http({
    url: "/auditchanges/enterpriseChange/checkCopy",
    method: "get",
    params: {
      ID: id,
    }
  });
}

export function revoke(id) {
  return http({
    url: '/auditchanges/toAuditManagement/removeEnterprisesChange',
    method: "get",
    params: {
      dataIdList: id
    }
  });
}
