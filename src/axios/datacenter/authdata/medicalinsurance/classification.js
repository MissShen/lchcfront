import http from 'src/axios/http'
import moment from 'moment'
/**
 * 日期格式转换
 * @param data
 * @returns {*}
 */
function dateChange(data){
  var result;
  if(typeof (data)!='undefined'&& data!=null ){
    result=moment(data).format("YYYY-MM-DD");
  }
  return result;
}
/**
 * 根据父级ID查看分类列表信息
 * @returns {*}
 */
export function queryListByParentId(parentId) {
  return http({
      url: '/yxdDataCenter/classification/queryListByParentId',
      method: 'GET',
      params: {
        'id': parentId
      }
  })
}
/**
 * 根据ID查看类别详细信息
 * @returns {*}
 */
export function findClassificationById(id) {
    return http({
        url: '/yxdDataCenter/classification/findClassificationById',
        method: 'GET',
        params: {
            'id': id
        }
    })
}
/**
 * 保存修改
 * @returns {*}
 */
export function updateClassification(entity) {
    return http({
       url: '/yxdDataCenter/classification/updateClassification',
        method: 'PUT',
        params: {
            'id': entity.id,
            'code':entity.code,
            'nameChn':entity.nameChn,
            'nameEng':entity.nameEng,
            'remark':entity.remark,
            'tempCodeFlag':entity.tempCodeFlag
        }
    })
}
/**
 * 查询类别信息列表
 * @returns {*}
 */
export function queryClassificationList(resData,dataForm) {
    return http({
        url: '/yxdDataCenter/classification/queryClassificationList',
        method: 'GET',
        params: {
            'pageNum': resData.pageNum,
            'pageSize': resData.pageSize,
            'searchType': dataForm.searchType,
            'searchContent':dataForm.searchContent
        }
    })
}
/**
 * 新增类别信息
 * @returns {*}
 */
export function saveNewClassification(dataForm) {
    return http({
        url: '/yxdDataCenter/classification/saveNewClassification',
        method: 'POST',
        params: {
            'id': dataForm.id,
            'parentId': dataForm.parentId,
            'code': dataForm.code,
            'nameEng':dataForm.nameEng,
            'nameChn':dataForm.nameChn,
            'remark':dataForm.remark,
            'hierarchy':dataForm.hierarchy,
            'tempCodeFlag':dataForm.tempCodeFlag
        }
    })
}
/**
 * 新增类别信息
 * @returns {*}
 */
export function deleteClassification(id) {
    return http({
        url: '/yxdDataCenter/classification/deleteClassificationById',
        method: 'DELETE',
        params: {
            'id': id
        }
    })
}
/**
 * 树形列表默认展开
 * @returns {*}
 */
export function expandTree(form) {
    return http({
        url: '/yxdDataCenter/classification/findExpandedIds',
        method: 'GET',
        params: {
            'id': form.id,
            'parentId':form.parentId,
            'hierarchy':form.hierarchy
        }
    })
}
/**
 * 树形列表默认展开
 * @returns {*}
 */
export function expandTree2(id) {
    return http({
        url: '/yxdDataCenter/classification/findExpandedIds2',
        method: 'GET',
        params: {
            'id': id
        }
    })
}