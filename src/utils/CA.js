import {
  ConvertPicFormat,
  GetPic,
  GetDateNotBefore,
  SignedData,
  VerifyUserPIN,
  GetUserPINRetryCount,
  GetSignCert,
  GetCertBasicinfo,
  GetDateNotAfter,
  VerifySignedData,
} from 'src/assets/XTXSAB'

/**
 *
 * 验证用户PIN
 */
export function VERIFY_USER_PIN(_this,
                                keyLoginArr,
                                CERT_OID_NOT_BEFORE,
                                CERT_OID_NOT_AFTER,
                                strCertID,
                                strPin,
                                strServerCert,
                                strServerRan,
                                strServerSignedData) {
  return new Promise((resolve, reject) => {
    _this.dataForm.containerName = strCertID;
    VerifyUserPIN(strCertID, strPin, function (retObj) {
      if (!retObj.retVal) {
        GetUserPINRetryCount(strCertID, function (retObj) {
          let retryCount = Number(retObj.retVal);
          if (retryCount > 0) {
            let msg = '校验证书密码失败! 您还有' + retryCount + '次机会重试!';
            reject(msg);
          } else if (retryCount === 0) {
            let msg = '您的证书密码已被锁死, 请联系BJCA进行解锁!';
            reject(msg);
          } else {
            let msg = '登录失败!';
            reject(msg);
          }
        });
      }
      //获取用户证书
      GetSignCert(strCertID, function (retObj) {
        let strUserCert = retObj.retVal;
        if (strUserCert === '') {
          let msg = '导出用户证书失败!';
          reject(msg);
        }
        _this.dataForm.userCert = strUserCert;
        GetCertBasicinfo(strUserCert, CERT_OID_NOT_BEFORE, function (retObj) {
          let notBeforeDate = GetDateNotBefore(retObj.retVal);
          let days = parseInt((notBeforeDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
          if (days > 0) {
            let msg = '您的证书尚未生效! 距离生效日期还剩' + days + '天!';
            reject(msg);
          }
          let strUserCert = _this.dataForm.userCert;
          GetCertBasicinfo(strUserCert, CERT_OID_NOT_AFTER, function (retObj) {
            let notAfterDate = GetDateNotAfter(retObj.retVal);
            let milliseconds = notAfterDate.getTime() - new Date().getTime();
            if (milliseconds < 0) {
              let msg = '您的证书已过期，请尽快到北京数字证书认证中心办理证书更新手续！';
              reject(msg);
            }
            days = parseInt(milliseconds / (1000 * 60 * 60 * 24));
            if (days > 0 && days <= 60) {
              let msg = '您的证书还有' + days + '天过期\n请您尽快到北京数字证书认证中心办理证书更新手续！';
              _this.$message({
                message: msg,
                type: 'warning'
              });
              // reject(msg);
            } else if (days === 0) { // 证书有效期天数小于1天
              let hours = parseInt(milliseconds / (1000 * 60 * 60))
              if (hours > 0) {
                let msg = '您的证书还有' + hours + '小时过期\n您尽快到北京数字证书认证中心办理证书更新手续！';
                _this.$message({
                  message: msg,
                  type: 'warning'
                });
              }
              // 证书有效期小于1小时
              let minutes = parseInt(milliseconds / (1000 * 60))
              if (minutes > 1) {
                let msg = '您的证书还有' + minutes + '分钟过期\n您尽快到北京数字证书认证中心办理证书更新手续！';
                _this.$message({
                  message: msg,
                  type: 'warning'
                });
              } else {
                let msg = '您的证书已过期，请尽快到北京数字证书认证中心办理证书更新手续！';
                reject(msg);
              }
            }
            VerifySignedData(strServerCert, strServerRan, strServerSignedData,
              function (retObj) {
                if (!retObj.retVal) {
                  let msg = '验证服务器端信息失败!';
                  reject(msg);
                }
                SignedData(strCertID, strServerRan, function (retObj) {
                  if (retObj.retVal === '') {
                    let msg = '客户端签名失败!';
                    reject(msg);
                  }
                  _this.dataForm.userSignedData = retObj.retVal;
                  _this.finalSignedData = retObj.retVal;
                  let strCertID = sessionStorage.getItem('certId');
                  if (!strCertID) {
                    strCertID = keyLoginArr[0].value
                  }
                  let i = strCertID.indexOf('/');
                  if (i > 0) {
                    strCertID = strCertID.substring(0, i)
                  }
                  GetPic(strCertID, function (retObj) {
                    if (retObj.retVal === '') {
                      _this.dataForm.imgUrl = '' //可替换自己的图片路径
                      let msg = '获取签章图片失败！';
                      reject(msg);
                    }
                    ConvertPicFormat(retObj.retVal, '3', function (retObj) {
                      if (retObj.retVal === '') {
                        _this.dataForm.imgUrl = ''//可替换自己的图片路径
                        let msg = '转换签章图片格式失败';
                        reject(msg);
                      }
                      _this.dataForm.imgUrl = retObj.retVal; //可替换自己的图片路径
                      resolve(_this.dataForm);
                    })
                  })
                })
              })
          })
        })
      })
    })
  });
}

