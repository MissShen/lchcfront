import http from 'src/axios/http'
import {dateFormat} from "../../common/nestedJson";



export function queryList (resData,query) {
  return http({
    url: '/auditchanges/productReport/sponsorlist',
    method: 'get',
    params: {'pageNum': resData.pageNum,
             'pageSize': resData.pageSize,
             'PRODUCT': query.PRODUCT,
             'DOSAGE': query.DOSAGE,
             'SPEC': query.SPEC,
             'MANUFACTURE': query.MANUFACTURE
    }
  })
}

export function queryListChange (resData,query) {
  return http({
    url: '/auditchanges/productReport/list',
    method: 'get',
    params: {'pageNum': resData.pageNum,
      'pageSize': resData.pageSize,
      'PRODUCT': query.PRODUCT,
      'DOSAGE': query.DOSAGE,
      'SPEC': query.SPEC,
      'MANUFACTURE': query.MANUFACTURE,
      'STATE':query.STATE
    }
  })
}

export function queryListAudit (resData,query) {
  let STARTDATE = "";
  let ENDDATE = "";
  if(query.SELECTDATE != '' && query.SELECTDATE != undefined) {
    STARTDATE = query.SELECTDATE[0];
    ENDDATE = query.SELECTDATE[1];
  }
  return http({
    url: '/auditchanges/productReport/auditlist',
    method: 'get',
    params: {'pageNum': resData.pageNum,
      'pageSize': resData.pageSize,
      'PRODUCT': query.PRODUCT,
      'DOSAGE': query.DOSAGE,
      'SPEC': query.SPEC,
      'MANUFACTURE': query.MANUFACTURE,
      'STATE':query.STATE,
      'DATE':query.DATE,
      'STARTDATE':STARTDATE,
      'ENDDATE':ENDDATE
    }
  })
}


export function queryListClarify (resData,query) {
  let STARTDATE = "";
  let ENDDATE = "";
  if(query.SELECTDATE != '' && query.SELECTDATE != undefined) {
    STARTDATE = query.SELECTDATE[0];
    ENDDATE = query.SELECTDATE[1];
  }
  return http({
    url: '/auditchanges/productReport/clarifylist',
    method: 'get',
    params: {'pageNum': resData.pageNum,
      'pageSize': resData.pageSize,
      'PRODUCT': query.PRODUCT,
      'DOSAGE': query.DOSAGE,
      'SPEC': query.SPEC,
      'MANUFACTURE': query.MANUFACTURE,
      'STATE':query.STATE,
      'DATE':query.DATE,
      'STARTDATE':STARTDATE,
      'ENDDATE':ENDDATE
    }
  })
}

export function findReportById (id) {
  return http({
    url: '/auditchanges/productReport/reportDetail',
    method: 'get',
    params: {'id': id}
  })
}

export function insertReport(dataForm,fileForm){
  return http({
    url:'/auditchanges/productReport/insertReport',
    method:'post',
    data:{
      dataStr:JSON.stringify(dataForm),
      fileStr:JSON.stringify(fileForm)
    }
  })
}
export function update(reportId) {
  return http({
    url: '/auditchanges/productReport/update',
    method: "put",
    data:{"id":reportId}
  })
}

export function updateUserId(qtID) {
  return http({
    url: '/auditchanges/productReport/updateUserId',
    method: "put",
    data:{"id":qtID}
  })
}

export function updateClarify(dataForm,fileForm) {
  return http({
    url: '/auditchanges/productReport/updateclarify',
    method: "put",
    data:{
      dataStr:JSON.stringify(dataForm),
      fileStr:JSON.stringify(fileForm)
    }
  })
}

export function updateReply(dataForm,reportId) {
  return http({
    url: '/auditchanges/productReport/updatereply',
    method: "put",
    data:{
      "REPLYEXPLAN":dataForm.REPLYEXPLAN,
      "id":reportId
    }
  })
}

export function updateAudit(dataForm,reportId) {
  return http({
    url: '/auditchanges/productReport/updateaudit',
    method: "put",
    data:{
      "REPLYEXPLAN":dataForm.REPLYEXPLAN,
      "AUDIT":dataForm.AUDIT,
      "id":reportId
    }
  })
}
