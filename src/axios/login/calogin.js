import http from 'src/axios/http'

/**
 * ca初始化
 *
 */
export function caInit(data) {
  return http({
    url: '/unifiedlogin/bjca/init',
    method: 'post'
  })
}
/**
 * ca初始化
 *
 */
export function caNoticeInit() {
  return http({
    url: '/management/bjca/noticeInit',
    method: 'get'
  })
}
export function caKeyLogin(data) {
  return http({
    url: '/unifiedlogin/bjca/key/login',
    method: 'post',
    data: {'strRandom': data.strRandom, 'userCert': data.userCert,'userSignedData':data.userSignedData,'containerName':data.containerName}
  })
}



export function caRemoveKey(data) {
  return http({
    url: '/management/bjca/removeKey',
    method: 'post',
    data: {'strRandom': data.strRandom, 'userCert': data.userCert,'userSignedData':data.userSignedData,'containerName':data.containerName}
  })
}

export function caBindKey(data) {
  return http({
    url: '/management/bjca/bindKey',
    method: 'post',
    data: {'strRandom': data.strRandom, 'userCert': data.userCert,'userSignedData':data.userSignedData,'containerName':data.containerName}
  })
}
/**
 * ca用户初始绑定
 *
 */
export function caInitBind(data) {
  return http({
    url: '/unifiedlogin/bjca/init/bind',
    method: 'post',
    data: {'userName': data.userName, 'passWord': data.passWord,'certEntityID':data.certEntityID}
  })
}


/**
 * ca登录
 *
 */
export function caLogin(strCertEntityID) {
  return http({
    url: '/unifiedlogin/bjca/result',
    method: 'post',
    params: {'strCertEntityID': strCertEntityID},
  })
}


/**
 * ca登录
 *
 */
export function vrifyContainCaKey() {
  return http({
    url: '/management/bjca/vrifyKey',
    method: 'get'
  })
}


