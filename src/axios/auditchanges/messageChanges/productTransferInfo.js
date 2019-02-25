import http from 'src/axios/http'
import {convert} from "../common/nestedJson";

export function findUpProductTransferInfos(resData, query) {
  return http({
    url: '/auditchanges/upProductTransferInfo/list',
    method: 'get',
    params: {
      'pageNum': resData.pageNum,
      'pageSize': resData.pageSize,
      'transferId': query.id,
      'productName': query.name,
      'dosage': query.dosage,
      'specification': query.specification,
      'manufacture': query.manufacture
    }
  })
}

export function auditList(resData, transferId,flag) {
  return http({
    url: '/auditchanges/upProductTransferInfo/auditList',
    method: 'get',
    params: {
      'pageNum': resData.pageNum,
      'pageSize': resData.pageSize,
      'transferId': transferId,
      'flag':flag
    }
  })
}

export function confirm(transferId, arrCheck) {
  return http({
    url: '/auditchanges/upProductTransferInfo/insert',
    method: 'post',
    data: {
      'upProductTranId': transferId,
      'transferProducts': JSON.stringify(arrCheck)
    }
  })
}

export function del(id) {
  return http({
    url: '/auditchanges/upProductTransferInfo/delete',
    method: 'delete',
    params: {'id': id}
  })
}

export function orgMerge(transferId) {
  return http({
    url: '/auditchanges/upProductTransferInfo/orgMerge',
    method: 'post',
    data: {
      'upProductTranId': transferId
    }
  })
}


export function batchAgree(transferId, ids) {
  return http({
    url: '/auditchanges/upProductTransferInfo/batchAgree',
    method: 'post',
    data: {
      'upProductTranId': transferId,
      'ids': JSON.stringify(ids),
    }
  })
}


export function batchRefuse(transferId, ids, reason) {
  return http({
    url: '/auditchanges/upProductTransferInfo/batchRefuse',
    method: 'post',
    data: {
      'upProductTranId': transferId,
      'ids': JSON.stringify(ids),
      'reason': reason
    }
  })
}

/*
* 产品转产确认
*
* */
export function productTransferAffirm(transferId, processingstate, transferinfos) {
  var paramsForm = {
    "id":transferId,
    "processingState":processingstate,
    "transferInfos":transferinfos,
  }
  paramsForm = convert(paramsForm);
  console.log(transferinfos,'transferinfos');
  return http({
    url: '/auditchanges/productTransferAffirm/productTransferAffirm',
    method: 'post',
    data: paramsForm
  })
}
 export function findTransferById(reqData) {
   return http({
     url:'/auditchanges/productTransferAudit/findTransferById',
     method:'get',
     params:{
       'transferId':reqData
     }
   })
 }

 export function productTransferAffirmNo(id,states,explain) {
   return http({
     url:'/auditchanges/productTransferAffirm/productTransferAffirmNo',
     method:'post',
     data:{
       'id':id,
       'processingState':states,
       'remark':explain
     }
   })
 }
