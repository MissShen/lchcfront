import http from 'src/axios/http'

/**
 * 获取全部新编药学分类
 * @returns {*}
 */
export function  catList(pid,plevel) {
  return http({
      url: '/yxdDataCenter/catPharmacology/listAll',
      method: 'GET',
      params : {
        'pId':pid,
        'pLevel':plevel
      }
    }
  )
}
/**
 * 获取药品列表
 * @param query
 * @returns {*}
 */
export function getDrugs(query,resData) {
  return http({
      url: '/yxdDataCenter/catformulary/getDrugList',
      method: 'GET',
      params: {
        'pageNum': resData.pageNum,
        'pageSize': resData.pageSize,
        'searchContent': query.searchContent,
        'searchType': query.searchType,
        'codeType': query.codeType,
        'pharmType':query.pharmType,
        'pharmId':query.pharmId
      }
    }
  )
}

/**
 * 插入新编药学
 * @returns {*}
 */
export function  insertCatNewPharmacology(form) {
  return http({
      url: '/yxdDataCenter/catNewPharmacology/insertCatNewPharmacology',
      method: 'POST',
      params : form
    }
  )
}

/**
 * 获取全部新编药学详情
 * @returns {*}
 */
export function info(id) {
  return http({
      url: '/yxdDataCenter/catNewPharmacology/findCatNewPharmacologyById',
      method: 'GET',
      params : {
        "id":id
      }
    }
  )
}
/**
 * 获取全部新编药学分类分页
 * @returns {*}
 */
export function  catListPage(search,resData) {
  var param = {};
  param.searchType = search.searchType;
  param.searchContent = search.searchContent;
  param.pharmacologyId = search.pharmacologyId;
  param.createUser = search.createUser;
  param.updateUser = search.updateUser;
  param.pageNum = resData.pageNum;
  param.pageSize = resData.pageSize;
  if(search.cTimeStart && search.cTimeStart != ''){
    param.cTimeStart = search.cTimeStart
  }
  if(search.cTimeEnd && search.cTimeEnd != ''){
    param.cTimeEnd = search.cTimeEnd
  }
  if(search.uTimeStart && search.uTimeStart != ''){
    param.uTimeStart = search.uTimeStart
  }
  if(search.uTimeEnd && search.uTimeEnd != ''){
    param.uTimeEnd = search.uTimeEnd
  }
  return http({
      url: '/yxdDataCenter/catNewPharmacology/list',
      method: 'GET',
      params : param
    }
  )
}



/**
* 根据id查询新编药学信息
* @returns {*}
*/
export function  findCatPharmacologyById(id) {
  return http({
      url: '/yxdDataCenter/catPharmacology/findCatPharmacologyById',
      method: 'GET',
      params : {
        'id':id
      }
    }
  )
}

/**
 * 修改新编药学信息
 * @returns {*}
 */
export function  updateCatNewPharmacology(form) {
  return http({
      url: '/yxdDataCenter/catNewPharmacology/updateCatNewPharmacology',
      method: 'PUT',
      params : {
        'id':form.id,
        'nameChn':form.nameChn,
        'atcCode':form.atcCode,
        'doseageFormCode':form.doseageFormCode,
        'spec':form.spec,
        'drugsType':form.drugsType,
        'drugIds':form.drugIds
      }
    }
  )
}


/**
 * 添加新编药学分类
 * @param from
 * @returns {*}
 */
export function insertCatPharmacology(form) {
console.log("............")
  console.log(form)

  return http({
      url: '/yxdDataCenter/catPharmacology/insertCatPharmacology',
      method: 'POST',
      params: {
        'code':form.code,
        'parentCode':form.parentCode,
        'pName':form.pname,
        'pLevel':form.plevel
      }
    }
  )
}

/**
 * 删除新编药学分类
 * @param from
 * @returns {*}
 */
export function deleteCatNewPharmacologyByIds(ids) {
  return http({
      url: '/yxdDataCenter/catNewPharmacology/deleteCatNewPharmacologyByIds',
      method: 'PUT',
      params: {
        ids:ids
      }
    }
  )
}



