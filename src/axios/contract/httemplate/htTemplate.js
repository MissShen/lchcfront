import http from 'src/axios/http'

/**
 *
 * @param template
 * @author yuanyao.ma
 * @date 2018.3.19
 */
export function templateAdd (template) {
  return http({
    url: 'contract/htTemplate/saveHtTemplate',
    method: 'POST',
    data: template
  })
}
