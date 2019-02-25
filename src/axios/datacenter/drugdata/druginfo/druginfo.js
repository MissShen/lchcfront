import http from 'src/axios/http'
import { dateFormat } from 'src/axios/auditchanges/common/nestedJson'

/**
 * 标准化分类
 * @param hierarchy
 * @param parentId
 */
export function standardizedList(hierarchy, parentId) {
  return http({
    url: '/yxdDataCenter/drugInfo/standardizedList',
    method: 'GET',
    params: {
      hierarchy: hierarchy,
      parentId: parentId
    }
  })
}

/**
 * 获取药品信息列表
 * @param search
 * @param resData
 */
export function drugInfoList(search, resData) {

  if(search.createDate != undefined) {
    search.createDateStart = search.createDate[0]
    search.createDateEnd = search.createDate[1]
    console.log("in", search.createDateStart, search.createDateEnd)
  }
    console.log("out", search.createDateStart, search.createDateEnd)

  if(search.updateDate != undefined) {
    search.updateDateStart = search.updateDate[0]
    search.updateDateEnd = search.updateDate[1]
    console.log(search.updateDateStart, search.updateDateEnd)
  }

  search = JSON.parse(JSON.stringify(search));
  dateFormat(search, ['Date'])

  return http({
    url: '/yxdDataCenter/drugInfo/list',
    method: 'GET',
    params: {
      'pageNum': resData.pageNum,
      'pageSize': resData.pageSize,
      'searchType': search.searchType,
      'searchText': search.searchText == undefined? '': search.searchText,
      'eight':search.eight,
      'eleven':search.eleven,
      'thirteen':search.thirteen,
      'twenty':search.twenty,
      'twentyThree':search.twentyThree,
      'bigClassification':search.bigClassification,
      'mediumClassification':search.mediumClassification,
      'smallClassification':search.smallClassification,
      'alternateIdentifier':search.alternateIdentifier,
      'createDateStart':search.createDateStart,
      'createDateEnd':search.createDateEnd,
      'updateDateStart':search.updateDateStart,
      'updateDateEnd': search.updateDateEnd,

    }
  })
}

/**
 * 获取药品回收站
 * @param search
 * @param resData
 */
export function drugInfoRecycleList(search, resData) {

  if(search.createDate != undefined) {
    search.createDateStart = search.createDate[0]
    search.createDateEnd = search.createDate[1]
    console.log("in", search.createDateStart, search.createDateEnd)
  }

  search = JSON.parse(JSON.stringify(search));
  dateFormat(search, ['Date'])

  return http({
    url: '/yxdDataCenter/drugInfo/queryRecycleBinList',
    method: 'GET',
    params: {
      'pageNum': resData.pageNum,
      'pageSize': resData.pageSize,
      'searchType': search.searchType,
      'searchText': search.searchText == undefined? '': search.searchText,
      'eight':search.eight,
      'eleven':search.eleven,
      'thirteen':search.thirteen,
      'twenty':search.twenty,
      'twentyThree':search.twentyThree,
      'bigClassification':search.bigClassification,
      'mediumClassification':search.mediumClassification,
      'smallClassification':search.smallClassification,
      'alternateIdentifier':search.alternateIdentifier,
      'createDateStart':search.createDateStart,
      'createDateEnd':search.createDateEnd,

    }
  })
}

/**
 * 还原
 * @param ids
 */
export function revert(ids) {
  return http({
    url: '/yxdDataCenter/drugInfo/revertDrugInfo',
    method: 'PUT',
    params: {
      'ids': ids
    }
  })
}

/**
 * 删除
 * @param ids
 */
export function remove(ids) {
  return http({
      url: '/yxdDataCenter/drugInfo/deleteDrugInfo',
      method: 'DELETE',
      params: {
        'ids': ids
      }
    }
  )
}
// PUT /drugInfo/updateDrugInfoRemark

/**
 * 备注
 * @param ids
 * @param note
 */
export function updateDrugInfoRemark(ids, note) {
  return http({
    url: '/yxdDataCenter/drugInfo/updateDrugInfoRemark',
    method: 'PUT',
    params: {
      'ids': ids,
      'note': note
    }
  })
}
/**
 * 查询药品详细信息
 * @param hierarchy
 * @param parentId
 */
export function findDrugInfo(id) {
  return http({
    url: '/yxdDataCenter/drugInfo/findDrugInfo',
    method: 'GET',
    params: {
      'id': id
    }
  })
}

/**
 * 新增
 * @param obj
 */
export function insertDrugInfo(obj) {

  dateFormat(obj, ['DATE'])

  return http({
      url: '/yxdDataCenter/drugInfo/insertDrugInfo',
      method: 'POST',
      params: obj
      //   {
      //   'CODE': obj.CODE,
      //   'DRUG_SERIAL_NUMBER': obj.DRUG_SERIAL_NUMBER,
      //   'DOSEAGE_FORM_CODE': obj.DOSEAGE_FORM_CODE,
      //   'SPEC': obj.SPEC,
      //   'SALT_CODE': obj.SALT_CODE,
      //   'NAME_CHN': obj.NAME_CHN,
      //   'SALT_CODE2': obj.SALT_CODE2,
      //   'NAME_ENG': obj.NAME_ENG,
      //   'COMPOUND_CHILDREN': obj.COMPOUND_CHILDREN,
      //   'STAND_RATE': obj.STAND_RATE,
      //   'WRAP_CODE': obj.WRAP_CODE,
      //   'READY_FLAG': obj.READY_FLAG,
      //   'CONTENT_NUM': obj.CONTENT_NUM,
      //   'WEIGHT_NUM': obj.WEIGHT_NUM,
      //   'CRITERION_NUM': obj.CRITERION_NUM,
      //   'CRITERION_TYPE': obj.CRITERION_TYPE,
      //   'CRITERION_EXPIRE_DATE': obj.CRITERION_EXPIRE_DATE,
      //   'DOSEAGE_DESC': obj.DOSEAGE_DESC,
      //   'NATIONAL_BASIC_DRUG': obj.NATIONAL_BASIC_DRUG,
      //   'NATIONAL_INSURANCE_DRUG': obj.NATIONAL_INSURANCE_DRUG,
      //   'PRESCRIPTION': obj.PRESCRIPTION,
      //   'DESCRIPTION': obj.DESCRIPTION,
      //   'CONTENT_UNIT': obj.CONTENT_UNIT,
      //   'WEIGHT_UNIT': obj.WEIGHT_UNIT
      // }
    }
  )
}

/**
 * 修改
 * @param obj
 */
export function updateDrugInfo(obj) {

  dateFormat(obj, ['DATE'])

  console.log("==>updateDrugInfo ", obj)

  return http({
      url: '/yxdDataCenter/drugInfo/updateDrugInfo',
      method: 'PUT',
      data: obj
      //   {
      //   'ID': obj.ID,
      //   'CODE': obj.CODE,
      //   // 'DRUG_SERIAL_NUMBER': obj.DRUG_SERIAL_NUMBER,
      //   'DOSEAGE_FORM_CODE': obj.DOSEAGE_FORM_CODE,
      //   'SPEC': obj.SPEC,
      //   'SALT_CODE': obj.SALT_CODE,
      //   'NAME_CHN': obj.NAME_CHN,
      //   'SALT_CODE2': obj.SALT_CODE2,
      //   'NAME_ENG': obj.NAME_ENG,
      //   'COMPOUND_CHILDREN': obj.COMPOUND_CHILDREN,
      //   'STAND_RATE': obj.STAND_RATE,
      //   'WRAP_CODE': obj.WRAP_CODE,
      //   'READY_FLAG': obj.READY_FLAG,
      //   'CONTENT_NUM': obj.CONTENT_NUM,
      //   'WEIGHT_NUM': obj.WEIGHT_NUM,
      //   'CRITERION_NUM': obj.CRITERION_NUM,
      //   'CRITERION_TYPE': obj.CRITERION_TYPE,
      //   'CRITERION_EXPIRE_DATE': obj.CRITERION_EXPIRE_DATE,
      //   'DOSEAGE_DESC': obj.DOSEAGE_DESC,
      //   'NATIONAL_BASIC_DRUG': obj.NATIONAL_BASIC_DRUG,
      //   'NATIONAL_INSURANCE_DRUG': obj.NATIONAL_INSURANCE_DRUG,
      //   'PRESCRIPTION': obj.PRESCRIPTION,
      //   'DESCRIPTION': obj.DESCRIPTION,
      //   'CONTENT_UNIT': obj.CONTENT_UNIT,
      //   'WEIGHT_UNIT': obj.WEIGHT_UNIT
      // }
    }
  )
}

/**
 * 药品分类
 */
export function drugBigClass(resData, query) {
  return http({
      url: '/yxdDataCenter/drugInfo/queryDrugClassificationList',
      method: 'GET',
      params: {
        'pageNum': resData.pageNum,
        'pageSize': resData.pageSize,
        'name': query.searchContent
      }
    }
  )
}

/**
 * 药品小分类
 */
export function drugSmallClass(resData, query, id) {
  return http({
      url: '/yxdDataCenter/drugInfo/queryDrugSmallClassificationList',
      method: 'GET',
      params: {
        'pageNum': resData.pageNum,
        'pageSize': resData.pageSize,
        'name': query.searchContent,
        'id': id
      }
    }
  )
}

/**
 * 通用名
 */
export function queryCommonNameList(resData, query, bigCode, smallCode) {
  return http({
      url: '/yxdDataCenter/drugInfo/queryCommonNameList',
      method: 'GET',
      params: {
        'pageNum': resData.pageNum,
        'pageSize': resData.pageSize,
        'name': query.searchContent,
        'bigCode': bigCode,
        'smallCode': smallCode,
      }
    }
  )
}

/**
 * 新增-通用名
 */
export function insertCommonName(bigCode, smallCode, nameChn, nameEng) {
  return http({
      url: '/yxdDataCenter/drugInfo/insertCommonName',
      method: 'POST',
      params: {
        'bigCode': bigCode,
        'smallCode': smallCode,
        'nameChn': nameChn,
        'nameEng':nameEng
      }
    }
  )
}

/**
 * 查询剂型列表
 */
export function queryDoseageList(resData, query, bigCode, smallCode, nameCode) {
  console.log(bigCode, smallCode, nameCode)
  return http({
      url: '/yxdDataCenter/drugInfo/queryDoseageList',
      method: 'GET',
      params: {
        'pageNum': resData.pageNum,
        'pageSize': resData.pageSize,
        'name': query.searchContent,
        'code': query.code,
        'bigCode': bigCode,
        'smallCode': smallCode,
        'comName': nameCode
      }
    }
  )
}

/**
 * 查询规格列表
 */
export function querySpecificationList(resData, query, bigCode, smallCode, nameCode, dos) {
  console.log("bigCode=",bigCode)
  return http({
      url: '/yxdDataCenter/drugInfo/querySpecificationList',
      method: 'GET',
      params: {
        'pageNum': resData.pageNum,
        'pageSize': resData.pageSize,
        'specStr': query.searchContent,
        'bigCode': bigCode,
        'smallCode': smallCode,
        'comName': nameCode,
        'doseageCode': dos
      }
    }
  )
}

/**
 * 新增-规格
 */
export function insertSpecification(preCode, spec) {
  return http({
      url: '/yxdDataCenter/drugInfo/insertSpecification',
      method: 'POST',
      params: {
        'preCode': preCode,
        'spec': spec
      }
    }
  )
}

/**
 * 查询一(&二)级盐类衍生物列表
 */
export function querySalt1List(resData, query) {
  return http({
      url: '/yxdDataCenter/drugInfo/querySaltOneLevelList',
      method: 'GET',
      params: {
        'pageNum': resData.pageNum,
        'pageSize': resData.pageSize,
        'name': query.searchContent
      }
    }
  )
}

/**
 * 查询复方小儿列表
 */
export function queryCompound(resData, query) {
  return http({
      url: '/yxdDataCenter/drugInfo/queryCompoundAndChildrenList',
      method: 'GET',
      params: {
        'pageNum': resData.pageNum,
        'pageSize': resData.pageSize,
        'type': query.type,
        'value': query.value
      }
    }
  )
}

/**
 * 查询转换比列表
 */
export function queryConvertRateList(resData, query, bigCode, smallCode, nameCode, dos, spec) {
  console.log("spec====", spec)
  return http({
      url: '/yxdDataCenter/drugInfo/queryConvertRateList',
      method: 'GET',
      params: {
        'pageNum': resData.pageNum,
        'pageSize': resData.pageSize,
        'name': query.searchContent,
        'bigCode': bigCode,
        'smallCode': smallCode,
        'comName': nameCode,
        'doseageCode': dos,
        'specName': spec
      }
    }
  )
}

/**
 * 新增-转换比
 */
export function insertConvertRateList(bigCode, smallCode, comName, doseageCode, specName, name, preCode) {
  console.log("insertConvertRateList 接收到参数：",bigCode, smallCode, comName, doseageCode, specName, name, preCode);
  return http({
      url: '/yxdDataCenter/drugInfo/insertConvertRateList',
      method: 'POST',
      params: {
        'bigCode': bigCode,
        'smallCode': smallCode,
        'comName': comName,
        'doseageCode': doseageCode,
        'specName': specName,
        'name': name,
        'preCode': preCode
      }
    }
  )
}


/**
 * 获取包材
 * @param resData
 * @param query
 */
export function queryWrapList(resData, query) {
  return http({
      url: '/yxdDataCenter/drugInfo/queryWrapList',
      method: 'GET',
      params: {
        'pageNum': resData.pageNum,
        'pageSize': resData.pageSize,
        'name': query.name,
        'code': query.code
      }
    }
  )
}

/**
 * 导入编码验证重复
 * @param code
 */
export function codeIsRepeat(code) {
  return http({
    url: 'yxdDataCenter/drugInfo/isRepeat',
    method: 'GET',
    params: {
      'code': code
    }
  })
}
