import http from 'src/axios/http'
import moment from 'moment'

/**
 * 全国价格库主页数据
 * @returns {*}
 */
export function list(query, resData) {
  return http({
      url: '/yxdDataCenter/nationalPrice/list',
      method: 'GET',
      params: {
        'catDrug.spec': query.catDrug.spec,
        'catDrug.nameChn': query.catDrug.nameChn,
        'catDoseageForm.nameChn': query.catDoseageForm.nameChn,
        'catOrg.name': query.catOrg.name,
        pageNum: resData.pageNum,
        pageSize: resData.pageSize,
        orderBy: query.orderBy
      }
    }
  )
}

/**
 * 根据产品ID查看关联产品价格信息
 * @returns {*}
 */
export function queryPriceByProductId(query, resData, id) {
  return http({
      url: '/yxdDataCenter/nationalPrice/queryPriceByProductId',
      method: 'GET',
      params: {
        productId: id,
        province: query.province,
        projectName: query.projectName,
        projectYear: query.projectYear,
        pageNum: resData.pageNum,
        pageSize: resData.pageSize,
        orderBy: query.orderBy
      }
    }
  )
}

/**
 * 更改可用状态
 * @returns {*}
 */
export function updateEnableFlag(val, id, productId) {
  return http({
      url: '/yxdDataCenter/nationalPrice/updateEnableFlag',
      method: 'POST',
      params: {
        val: val,
        id: id,
        productId: productId
      }
    }
  )
}

/**
 * 根据ID查询ProductPrice对象
 * @returns {*}
 */
export function findPriceById(id) {
  return http({
      url: '/yxdDataCenter/nationalPrice/findPriceById',
      method: 'GET',
      params: {
        id: id
      }
    }
  )
}

/**
 * 根据productId查询相关产品价格年度
 * @returns {*}
 */
export function getPriceYears(productId) {
  return http({
      url: '/yxdDataCenter/nationalPrice/getPriceYears',
      method: 'GET',
      params: {
        productId: productId
      }
    }
  )
}

/**
 * 删除
 * @returns {*}
 */
export function del(id, productId) {
  return http({
      url: '/yxdDataCenter/nationalPrice/deleteById',
      method: 'DELETE',
      params: {
        id: id,
        productId: productId
      }
    }
  )
}

/**
 * 新增
 * @returns {*}
 */
export function add(form) {
  return http({
      url: '/yxdDataCenter/nationalPrice/insert',
      method: 'POST',
      params: {
        productId: form.productId,
        province: form.province,
        projectName: form.projectName,
        projectPrice: form.projectPrice,
        projectYear: form.projectYear,
        zxDate: form.zxDate == undefined ? '' : moment(form.zxDate).format("YYYY-MM-DD"),
        isMin: form.isMin,
        isJy: form.isJy
      }
    }
  )
}

/**
 * 修改
 * @returns {*}
 */
export function update(form) {
  return http({
      url: '/yxdDataCenter/nationalPrice/update',
      method: 'POST',
      params: {
        id: form.id,
        productId: form.productId,
        province: form.province,
        projectName: form.projectName,
        projectPrice: form.projectPrice,
        projectYear: form.projectYear,
        zxDate: form.zxDate == undefined ? '' : moment(form.zxDate).format("YYYY-MM-DD"),
        isMin: form.isMin,
        isJy: form.isJy
      }
    }
  )
}
