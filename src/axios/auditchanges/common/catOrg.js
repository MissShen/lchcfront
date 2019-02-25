import http from "../../http";

/**
 * 获取除自己以外的其它企业
 */
export function otherOrgs() {
  return http({
      url: '/auditchanges/upProductTransfer/otherOrgs',
      method: 'get',
      param: {
        name: ''
      }
    }
  )
}
