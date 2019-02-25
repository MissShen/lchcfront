import moment from 'moment'

/**
 * json转换为spring对应格式
 */
export function convert(form, cur, key, type) {
  cur = cur || form;
  // 遍历当前类型
  for(let x in cur) {
    let index = { Array: key + "[" + x + "]", Object: key + "." + x, undefined: x, }[type];
    // 如果是Array或Object类型递归重新处理
    if(cur[x] instanceof Array) {
      convert(form, cur[x], index, "Array");
      delete cur[x];
    } else if(cur[x] instanceof Object) {
      convert(form, cur[x], index, "Object");
      delete cur[x];
    } else {
      form[index] = cur[x];
    }
  }
  return form;
}

export function dateParse(form, filter) {
  for(let key in form) {
    for(let x in filter) {
      if(key.indexOf(filter[x]) > 0 && form[key]){
        form[key] = new Date(moment(form[key]).format("YYYY/MM/DD HH:mm:ss"));
      }
    }

    if(form[key] instanceof Object) {
      dateParse(form[key], filter);
    }
  }
}

/**
 * 时间格式化
 * @param form 要格式化的json
 * @param filter 要格式化的字段包含字符，数组
 */
export function dateFormat(form, filter, format) {
  for(let key in form) {
    for(let x in filter) {
      if(key.indexOf(filter[x]) > 0 && form[key]){
        form[key] = moment(form[key]).format(format || "YYYY-MM-DD HH:mm:ss");
      }
    }

    if(form[key] instanceof Object) {
      dateFormat(form[key], filter, format);
    }
  }
}

/**
 * 过滤公共页要提交的数据
 * @param form
 */
export function filter(form, cur, key) {
  cur = cur ? cur : form;
  for(let x in cur) {
    if(x.indexOf("$") != -1) {
      if(!cur[x]) {
        delete cur[x.substr(0, x.length - 1)];
      }
      delete cur[x];
      continue;
    }

    let index = key ? key + "." + x : x;
    if(cur[x] instanceof Object) {
      filter(form, cur[x], index);
      delete cur[x];
    } else {
      form[index] = cur[x];
    }
  }
}

/**
 * 过滤公共页要提交的数据，企业公共控件专用
 */
export function filter_x(form, show, cur, cur_show) {
  cur = cur || form;
  cur_show = cur_show || show;
  for(let x in cur_show) {
    // 如果是条件
    if(x.indexOf("$") != -1) {
      if(!cur_show[x]) {
        delete cur[x.substr(0, x.length - 1)];
      }
      delete cur_show[x];
    }

    if(cur[x] instanceof Object) {
      filter_x(form, show, cur[x], cur_show[x]);
    }
  }
}

/**
 * 验证公共页勾选项输入状态
 */
export function checkControl(form, show, cur, cur_show) {
  cur = cur || form;
  cur_show = cur_show || show;
  for(let x in cur_show) {
    // 如果是条件
    if(x.indexOf("$") != -1) {
      // 选中了勾选项
      if(cur_show[x]) {
        if(!cur[x.substr(0, x.length - 1)] || !cur[x.substr(0, x.length - 1)].toString().trim()) {
          return false
        }
      }
    }

    if(cur[x] instanceof Object) {
      if(!checkControl(form, show, cur[x], cur_show[x])) {
        return false;
      }
    }
  }
  return true;
}

/**
 * 过滤成质疑专有格式
 */
export function convertQuestion(form, cur, key) {
  cur = cur || form;
  for(let x in cur) {
    let index = key ? key + "." + x : x;
    if(cur[x] instanceof Object) {
      convertQuestion(form, cur[x], index);
      delete cur[x];
    } else {
      form[index] = cur[x];
    }
  }
}

/**
 * 还原质疑专有格式
 */
export function decodeQuestion(form, doubt) {
  if(doubt) {
    for(let key in doubt) {
      let keys = key.split(".");
      let tmp = form;

      for(let i = 0; i < keys.length; i++) {
        if(i + 1 == keys.length) {
          tmp[keys[i]] = key;
          continue;
        }

        if(!tmp[keys[i]]) {
          if(/^\d+$/.test(keys[i + 1])) {
            tmp[keys[i]] = [];
          } else {
            tmp[keys[i]] = {};
          }
        }

        tmp = tmp[keys[i]];
      }
    }
  }
  return form;
}

/**
 * 还原审核专有格式
 */
export function decodeAudit(form, doubt) {
  if(doubt) {
    for(let key in doubt) {
      let keys = key.split(".");
      let tmp = form;

      for(let i = 0; i < keys.length; i++) {
        if(i + 1 == keys.length) {
          for(let x in doubt[key]) {
            tmp[keys[i]] = doubt[key][x].QUESTION_EDITVAL;
          }
          continue;
        }

        if(!tmp[keys[i]]) {
          if(/^\d+$/.test(keys[i + 1])) {
            tmp[keys[i]] = [];
          } else {
            tmp[keys[i]] = {};
          }
        }

        tmp = tmp[keys[i]];
      }
    }
  }
  return form;
}

/**
 * 还原变更专有格式
 */
export function decodeUp(form, change) {
  if(change) {
    for(let key in change) {
      let keys = key.split(".");
      let tmp = form;

      for(let i = 0; i < keys.length; i++) {
        if(i + 1 == keys.length) {
          tmp[keys[i]] = change[key].UP_VALUE;
          continue;
        }

        if(!tmp[keys[i]]) {
          if(/^\d+$/.test(keys[i + 1])) {
            tmp[keys[i]] = [];
          } else {
            tmp[keys[i]] = {};
          }
        }

        tmp = tmp[keys[i]];
      }
    }
  }
  return form;
}

/**
 * 价格模块勾选项输入状态
 * */
export function checkPriceControl(dataForm,controlForm) {
  let checkResult = true;
    controlForm.forEach((item,index)=>{
        for(let i in item){
           if(item[i] && !dataForm[index][i.substr(0,i.length-1)]){
             checkResult = false;
           }
        }
    })
  return checkResult;
}

export function checkPriceData(flagForm){
  let checkResult = true;
  flagForm.forEach(item=>{
    delete item.ID;
    for (let i in item){
      if(item[i]>0){
        console.log(item[i])
        checkResult = false;
      }
    }
  })
  return checkResult;
}

export function selectPriceControl(control){
  let checkResult = true;
  control.forEach(item=>{
    delete item.ID;
    for (let i in item){
      if(item[i]){
        checkResult = false;
      }
    }
  })
  return checkResult;
}

