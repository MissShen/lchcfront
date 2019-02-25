import http from 'src/axios/http'

/**
 * 用户登录
 *
 */
export function userLogin(data) {
  return http({
    url: '/unifiedlogin/sso/login',
    method: 'post',
    loading: false,
    data: {userName: data.userName, passWord: data.passWord, validCode: data.validCode, uuid: data.uuid}
  })
}

/**
 * 获取验证码
 *
 * @author: JiaHaiGang
 * @date: 2018/6/29 9:56
 */
export function validCode(uuid) {
  return http({
    url: '/unifiedlogin/sso/valid/code',
    method: 'get',
    loading: false,
    params: {uuid: uuid}
  })
}


/**
 * 刷新token
 *
 * @author: JiaHaiGang
 * @date: 2018/4/11 9:24
 */
export function refreshToken() {
  return http({
    url: '/unifiedlogin/sso/renew',
    loading: false,
    method: 'post',
  })
}

/**
 * 获取用户权限列表
 *
 * @author: JiaHaiGang
 * @date: 2018/3/27 19:36
 */
export function userPerms() {
  return http({
    url: '/management/user/resource/list',
    loading: false,
    method: 'post'
  })
}

