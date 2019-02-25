import http from "../../http";
import {dateFormat} from "src/axios/auditchanges/common/nestedJson"
import {getProjectSubjoinMessage} from "src/axios/auditchanges/systemManage/subjoinMessageManage"

export function productList(resData, query) {
  return http({
    url: '/auditchanges/upProductTransfer/productList',
    method: 'get',
    params: {
      'pageNum': resData.pageNum,
      'pageSize': resData.pageSize,
      'orgId': query.orgId,
      'name': query.name,
      'dosage': query.dosage,
      'specification': query.specification,
      'manufacture': query.manufacture,
      'type': query.type,
      'transferId': query.transferId
    }
  })
}

export function clearNull(data) {
  let key = JSON.parse(JSON.stringify(data));
  for (let i in key) {
    if (data[i] == '') {
      delete data[i]
    }
  }
  clearMetricAndManufacture(data)
}

export function clearMetricAndManufacture(data) {
  if (data.METRICID != undefined) {
    data.METRIC = data.METRICID
    delete data["METRICID"]
  }
  if (data.MANUFACTUREID != undefined) {
    data.MANUFACTURE = data.MANUFACTUREID
    delete data["MANUFACTUREID"]
  }
}

/*
  产品大JSON
 */
var productJson = {
  "product": "产品名称",
  "trade": "商品名",
  "dosage": "剂型",
  "spec": "规格",
  "standrate": "转换比",
  "metric": "单位",
  "wrap": "包材",
  "manufacture": "生产企业",
  "standardcode": "本位码",
  "source": "产品来源",
  "unit": "最小使用单位",
  "permitnumber": "批准文号",
  "swrap": "中包装数量",
  "bwrap": "大包装数量",
  "jynum": "药品检验报告编号",
  "jydate": "药品检验报告有效期",
  "jyyj": "药品检验报告是否永久",
  "jknum": "进口药品注册证编号",
  "jkdate": "进口药品注册证有效期",
  "agencyorgdate": "代理授权书有效期",
  "productionnum": "国产药品批件编号",
  "productiondate": "国产药品批件有效期",
  "gmp": "GMP证书编号",
  "patentflag": "是否专利保护",
  "catalogarea": "目录范围",
  "patentbegindate": "专利保护开始时间",
  "patentenddate": "专利保护结束时间",
  "standrd": "药品质量标准",
  "protectionflag": "是否中药保护",
  "useunit": "用法用量",
  "usemin": "每次使用量最小值",
  "usemax": "每次使用量最大值",
  "nummin": "每日次数最小值",
  "avenum": "平均日用量",
  "maximun": "每次使用极量",
  "treatment": "疗程",
  "pricetype": "价格类型",
  "yearid": "年度",
  "provinceid": "省份",
  "projectname": "项目名称",
  "inprice": "中标价",
  "executiondate": "执行日期",
  "representativespec": "代表品装量规格",
  "representativepackaging": "代表品装量包装",
  "representativeprice": "代表品价格",
  "representativemetric": "代表品价格单位",
  "computationalmethod": "计算方法",
  "calculateprice": "计算价格",
  "remark": "备注"
}

export function getJsonChn(field) {
  if (field) {
    let key = field.toLocaleLowerCase();
    return productJson[key]
  }
}

export function dateFormatAndJydate(dataForm) {
  let data = dataForm.JYDATE;
  let jyYj = "";
  let jyDate = "";
  if (data) {
    let jyDateArr = data.split(",");
    jyYj = jyDateArr[1]
    jyDate = jyDateArr[0]
    dataForm.JYDATE = jyDate;
  }
  dateFormat(dataForm, ['DATE'], 'YYYY-MM-DD')
  if(data){
    if (jyDate) {
      dataForm.JYDATE = dataForm.JYDATE + ","
    } else {
      dataForm.JYDATE = "," + jyYj;
    }
  }

}

export function checkJydate(controlData, dataForm) {
  if (controlData.JYDATE$) {
    //选中药品检验报告有效期
    let jyDate = dataForm.JYDATE == undefined ? "" : dataForm.JYDATE;
    let jyYj = dataForm.JYYJ == undefined ? "" : dataForm.JYYJ;
    console.log("JYDATE$")
    console.log(jyDate)
    console.log(jyYj)
    if (jyDate == "" && jyYj == "") {
      return false;
    }
    dataForm.JYDATE = jyDate + "," + jyYj
    delete dataForm["JYYJ"]
    delete controlData["JYDATE$"]
    return true;
  } else {
    return true;
  }
}

export function findFilesById(id) {
  return http({
    url: '/auditchanges/ProductInfoRegister/findImagesById',
    method: 'get',
    params: {"id": id}
  })
}

export function returnAnnex(show, data, change, audit, flag) {
  //show:变更前展示数据(申报/挂网)
  //data:需提交数据(质疑,变更,审核)
  //change：变更后展示数据(变更质疑,变更澄清,变更审核,变更确认)
  //audit:审核后展示数据(审核详情、确认)
  //flag:待质疑/澄清数据(澄清/审核)
  var annexStemp = [];
  getProjectSubjoinMessage({attachedType: '2'}).then(subjoin => {
    subjoin.data.forEach(x => {
      let annex = {
        dicName: x.dicName,
        options: [],
      };
      x.catAttachedDictionaryDomains.forEach(y => {
        annex.options.push({
          id: y.id,
          type: y.fieldType,
          label: y.remark,
          tipUrl: y.tipUrl,
          tipText: y.tipText,
          fileTypeId: y.fileTypeId,
          fileTypeName: y.fileTypeName,
          imageFlag: y.hasImageFlag,
          options: y.catAttachedDictionaryOptions,
          dataOptionsVal: y.fieldType == '5' && data && data[y.id] ? data[y.id].split(",") : [],
          changeOptionsVal: y.fieldType == '5' && change && change[y.id] ? change[y.id].split(",") : [],
          auditOptionsVal: y.fieldType == '5' && audit && audit[y.id] ? audit[y.id].split(",") : [],
          showOptionsVal: y.fieldType == '5' && show && show[y.id] ? show[y.id].split(",") : [],
          dataValue: data && data[y.id] ? data[y.id] : '',//提交数据
          changeValue: change && change[y.id] ? change[y.id] : '',//变更后数据
          auditValue: audit && audit[y.id] ? audit[y.id] : '',//审核后数据
          showValue: show && show[y.id] ? show[y.id] : '',//变更前数据
          flagValue: flag && flag[y.id] ? flag[y.id] : ''//质疑数量
        })
      });
      annexStemp.push(annex);
    });
  })
  return annexStemp;
}

export function returnAnnexFile(show, data, change, oldFile) {
  /*
  attachedFileList:{
    showFile:{'id':[]},
    dataFile:{'id':[]},
    auditFile:{'id':[]},
    changeFile:{'id':[]}
  }
  */
  //show:变更前展示数据(申报/挂网)
  //data:需提交数据(质疑,变更,审核)
  //change：变更后展示数据(变更质疑,变更澄清,变更审核,变更确认)
  let newFile = oldFile ? oldFile : {};
  newFile.showFile=show || {};
  if(!newFile.dataFile){
    newFile.dataFile = {};
  }
  for(let x in data){
    if(/\d/ig.test(x)){
      newFile.dataFile[x]=data[x]
    }
  }
  newFile.changeFile=change || {};
  return newFile;
}

//获取待提交附加信息数据
export function returnDataAnnex(annex, flag) {
  //annex 附加信息对象
  //flag = true  {"DATA002183921739821":["1080","val"]}
  //flag = false {"DATA234732974983274":"val"}
  let att = {};
  if (flag) {
    annex.forEach(x => {
      x.options.forEach(y => {
        if (y.type == '5') {
          if (Object.keys(y.dataOptionsVal).length != 0) {
            let val = y.dataOptionsVal.join(",");
            att[y.id] = [y.fileTypeId, val];
          }
        } else {
          if (y.dataValue) {
            att[y.id] = [y.fileTypeId, y.dataValue];
          }
        }
      })
    })
  } else {
    annex.forEach(x => {
      x.options.forEach(y => {
        if (y.type == '5') {
          if (Object.keys(y.dataOptionsVal).length != 0) {
            let val = y.dataOptionsVal.join(",");
            att[y.id] = val;
          }
        } else {
          if (y.dataValue) {
            att[y.id] = y.dataValue;
          }
        }
      })
    })
  }
  return att
}

export function selectControl(control) {
  let flag = false;
  for (let x in control){
    if(control[x]){
      flag = true;
    }
  }
  return flag;
}

export function returnYearList(){
  let yearList = [];
  let thisYear = new Date().getFullYear();
  while(thisYear >= 2009){
    yearList.push({key:thisYear,value:thisYear,label:thisYear})
    thisYear = --thisYear;
  }
  return yearList;
}
