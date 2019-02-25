import http from 'src/axios/http'
import moment from 'moment'

/**
 * 获取产品信息列表
 * @returns {*}
 */
export function  yellowPageList(resData,search) {
    var examineTimeBegin;
    var examineTimeEnd;
    var registerDateBegin;
    var registerDateEnd;
    if(typeof (search.examineTimeBegin)!='undefined'){
        examineTimeBegin=moment(search.examineTimeBegin).format("YYYY-MM-DD");
    }
    if(typeof (search.examineTimeEnd)!='undefined'){
        examineTimeEnd=moment(search.examineTimeEnd).format("YYYY-MM-DD");
    }
    if(typeof (search.registerDateBegin)!='undefined'){
        registerDateBegin=moment(search.registerDateBegin).format("YYYY-MM-DD");
    }
    if(typeof (search.registerDateEnd)!='undefined'){
        registerDateEnd=moment(search.registerDateEnd).format("YYYY-MM-DD");
    }
  return http({
      url: '/yxdDataCenter/productyellowpage/list',
      method: 'GET',
      params: {
          'pageNum': resData.pageNum,
          'pageSize': resData.pageSize,
          'searchTypeA': search.searchTypeA,
          'searchContentA': search.searchContentA,
          'searchTypeB': search.searchTypeB,
          'searchContentB': search.searchContentB,
          'examineFlag': search.examineFlag,
          'enableFlag':search.enableFlag,
          'doseage':search.doseage,
          'spec':search.spec,
          'examinePeople':search.examinePeople,
          'examineTimeBegin':examineTimeBegin,
          'examineTimeEnd':examineTimeEnd,
          'attestationKey':search.attestationKey,
          'attestationFlag':search.attestationFlag,
          'registerType':search.registerType,
          'registerDateBegin':registerDateBegin,
          'registerDateEnd':registerDateEnd,
          'orderBy':search.orderBy
      }
    }
  )
}
/**
* 获取审核人信息列表
* @returns {*}
*/
export function  queryCheckUsersList(){
    return http({
        url: '/yxdDataCenter/productyellowpage/queryCheckUsersList',
        method: 'GET',
        params:{}
    })
}