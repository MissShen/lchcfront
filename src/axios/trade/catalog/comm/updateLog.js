import http from 'src/axios/http'

/**
 * 查询要修改采购订单
 * @param id
 * @returns {*}
 */
export function selectHitComm (id) {
  return http({
    url: '/trade/catalog/selectCatalog',
    method: 'get',
    params: {
      recordId:id
    }
  })
}

/**
 * 修改采购订单
 * @param domain
 * @returns {*}
 */
export function putHitComm (domain) {
  return http({
    url: '/trade/catalog/putCatalog',
    method: 'put',
    params: {
      recordId:domain.recordId,
      bakSenderFullname:domain.bakSenderFullname,
      bakRetrievalCode:domain.bakRetrievalCode,
      bakQuantityExcessStr:domain.bakQuantityExcessStr,
      plan:domain.plan,
      senderOrgid:domain.senderOrgid
    }
  })
}

/**
 * 配送企业查询
 * @param id
 * @returns {*}
 */
export function getSendName (id) {
  return http({
    url: '/trade/catalog/getSendName',
    method: 'get',
    params: {
      recordId:id
    }
  })
}
