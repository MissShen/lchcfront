<template>
  <!-- 表格 -->
  <div class="tablebox">
    <div class="tabs-panel">
      <span class="active">绑定账号</span>
    </div>
    <el-form ref="dataForm"
             name="dataForm"
             id="dataForm"
             method="post"
             :model="dataForm"
             style="padding-top: 10px;"
             label-width="100px"
             label-position="left"
             size="small">
      <el-row>
        <el-col :span="8" :offset="1">
          <el-form-item label="插入KEY码">
            <el-input name="userKey" id="userKey" v-model="dataForm.userKey" disabled></el-input>
            <span v-if="keyStatus=='0'" class="el-form-item__error">未插入KEY,不能进行任何操作</span>
            <span v-if="keyStatus=='1'" class="el-form-item__error">已绑定KEY:请联系管理员解绑</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8" :offset="1">
          <el-form-item label="KEY密码">
            <el-input type="password" v-model="dataForm.password"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :offset="2">
          <el-form-item>
            <input type="hidden" ID="UserSignedData" name="UserSignedData" v-model="dataForm.userSignedData">
            <input type="hidden" ID="UserCert" name="UserCert" v-model="dataForm.userCert">
            <input type="hidden" ID="ContainerName" name="ContainerName" v-model="dataForm.containerName">
            <input type="hidden" ID="strRandom" name="strRandom" v-model="dataForm.strRandom">
            <!--<el-button v-if="keyStatus=='1'" type="primary" @click="bindKey('remove')">解除已绑定KEY</el-button>-->
            <el-button v-if="keyStatus=='2'" type="primary" @click="bindKey('bind')">绑定当前KEY</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="tabs-panel">
      <span class="active">绑定微信</span>
    </div>
    <el-form :model="weixinToken"
             label-width="100px"
             label-position="left"
             size="small">
      <el-row>
        <el-col :span="8" :offset="1">
          <el-form-item label="微信token">
            <el-input name="accessToken" v-model="weixinToken" disabled></el-input>
            <el-button type="primary" @click="getAccessToken()">申请Token</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <!-- 表格 -->
    <div class="tabs-panel">
      <span class="active">账号信息</span>
    </div>
    <el-form ref="dataForm"
             label-width="100px"
             label-position="left"
    >
      <el-row>
        <el-col :span="10" :offset="1">
          <el-form-item label="用户名称：">
            <span>{{userInfo.userName}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="10" :offset="1">
          <el-form-item label="登录账号：">
            <span>{{userInfo.userCode}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="10" :offset="1">
          <el-form-item label="机构名称：">
            <span>{{userInfo.orgName}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="10" :offset="1">
          <el-form-item label="机构性质：">
            <span v-for="orgType in userOrgType(userInfo.accountType)"
                  :key="orgType.value"
            >
                {{orgType.label}}
              </span>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
  import {vrifyContainCaKey, caRemoveKey, caBindKey} from "src/axios/login/calogin";
  import {userInfo, getWeixinToken} from "../../../axios/management/authority/sysUser";
  import {enumOrgTypeList} from "src/axios/common/common";
  import {
    inintCALogin,
    GetDateNotBefore,
    GetCertEntityByOid,
    SignedData,
    VerifyUserPIN,
    GetUserPINRetryCount,
    GetSignCert,
    GetCertBasicinfo,
    GetDateNotAfter,
    VerifySignedData
  } from "src/assets/XTXSAB"
  import {CERT_OID_NOT_BEFORE, CERT_OID_NOT_AFTER} from "src/assets/XTXSAB"
  import {caInit} from "src/axios/login/calogin";
  import {isNotNull} from "src/utils/validateUtil";

  export default {
    name: "bindKey",
    data() {
      return {
        weixinToken: '',
        dataForm: this.metaForm(),
        userInfo: '',
        enumOrgType: [],
        isShow: false,
        keyStatus: '0',
      }
    },
    methods: {
      metaForm() {
        return {
          password: undefined,
          userKey: undefined,
          strCertID: undefined,
          strRandom: '',
          UserListKey: '',
          userSignedData: '',
          userCert: '',
          containerName: '',
          Authorization: sessionStorage.getItem('token'),
          imgUrl: ''

        }
      },
      packUsbKeyUser(retObj) {
        let _this = this;
        let USB_KEY_USER = [];
        this.dataForm.userKey = '';
        let res = {code: 'BIND_KEY', message: 'KEY初始化失败',};
        if (!retObj) {
          this.$resMessage(res);
        } else if ('' == retObj.retVal) {
          this.keyStatus = '0';
        }
        else {
          let strUserList = retObj.retVal;
          while (true) {
            let i = strUserList.indexOf("&&&");
            if (i <= 0) {
              break;
            }
            let strOneUser = strUserList.substring(0, i);
            let strName = strOneUser.substring(0, strOneUser.indexOf("||"));
            let strCertID = strOneUser.substring(strOneUser.indexOf("||") + 2, strOneUser.length);
            USB_KEY_USER.push({label: strName, value: strCertID});
            let len = strUserList.length;
            strUserList = strUserList.substring(i + 3, len);
          }
          if (USB_KEY_USER.length > 1) {
            res.message = "插入多个KEY,只能绑定第一个";
            this.$resMessage(res);
          }
          GetSignCert(USB_KEY_USER[0].value, function (retObj) {
            GetCertEntityByOid(retObj.retVal, '1.2.86.11.7.1.8', function (retObj) {
              _this.dataForm.userKey = retObj.retVal;
              _this.dataForm.strCertID = USB_KEY_USER[0].value;
              vrifyContainCaKey().then(res => {
                _this.keyStatus = res.data ? '1' : '2';
              })
            });
          })
        }
      },
      initBindKey() {
        inintCALogin(this.packUsbKeyUser);
      },
      initUserInfo() {
        userInfo().then(res => {
          this.userInfo = res.data
        }).then(() => {
          enumOrgTypeList().then(res => {
            this.enumOrgType = res.data
          })
        });
      },
      userOrgType(accountType) {
        let orgTypeNewList = [];
        this.enumOrgType.map(item => {
          if (accountType) {
            accountType.split('').forEach(
              itemValue => {
                if (itemValue === item.value) {
                  orgTypeNewList.push(item);
                }
              }
            )
          }
        });
        return orgTypeNewList;
      },
      verifyKeyOperation(operation, response, strCertID, strPin, strServerCert, strServerRan, strServerSignedData) {
        let _this = this;
        let res = response;
        VerifyUserPIN(strCertID, strPin, function (retObj) {
          if (!retObj.retVal) {
            GetUserPINRetryCount(strCertID, function (retObj) {
              let retryCount = Number(retObj.retVal);
              if (retryCount > 0) {
                res.message = "校验证书密码失败!您还有" + retryCount + "次机会重试!";
                _this.$resMessage(res);
              } else if (retryCount == 0) {
                res.message = "您的证书密码已被锁死,请联系BJCA进行解锁!";
              } else {
                res.message = "验证错误";
                _this.$resMessage(res);
              }
            });
            return;
          }
          //获取用户证书
          GetSignCert(strCertID, function (retObj) {
            let strUserCert = retObj.retVal;
            if (strUserCert == "") {
              res.message = "获取证书失败!请稍后操作";
              _this.$resMessage(res);
              return;
            }
            _this.dataForm.userCert = strUserCert;
            GetCertBasicinfo(strUserCert, CERT_OID_NOT_BEFORE, function (retObj) {
              let notBeforeDate = GetDateNotBefore(retObj.retVal);
              let days = parseInt((notBeforeDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
              if (days > 0) {
                res.message = "您的证书尚未生效!距离生效日期还剩" + days + "天!";
                _this.$resMessage(res);
                return;
              }
              let strUserCert = _this.dataForm.userCert;
              GetCertBasicinfo(strUserCert, CERT_OID_NOT_AFTER, function (retObj) {
                let notAfterDate = GetDateNotAfter(retObj.retVal);
                let milliseconds = notAfterDate.getTime() - new Date().getTime();
                if (milliseconds < 0) {
                  res.message = "您的证书已过期，请尽快到北京数字证书认证中心办理证书更新手续！";
                  _this.$resMessage(res);
                  return;
                }
                VerifySignedData(strServerCert, strServerRan, strServerSignedData,
                  function (retObj) {
                    if (!retObj.retVal) {
                      res.message = "验证服务器端信息失败!";
                      _this.$resMessage(res);
                      return;
                    }
                    SignedData(strCertID, strServerRan, function (retObj) {
                      if (retObj.retVal == "") {
                        res.message = "客户端签名失败!";
                        _this.$resMessage(res);
                        return;
                      }
                      _this.dataForm.userSignedData = retObj.retVal;
                      let http = operation == 'bind' ? caBindKey(_this.dataForm) : caRemoveKey(_this.dataForm);
                      http.then(res => {
                        if (res.data === "SUCCESS") {
                          res.code = "200";
                          res.data = operation == 'bind' ? '恭喜你,KEY已绑定成功' : '恭喜你,KEY已解绑成功';
                          _this.keyStatus = operation == 'bind' ? '1' : '2';
                        }
                        _this.$resMessage(res);
                        _this.dataForm.password = '';
                      })
                    });
                  });
              });
            });
          });
        });
      },
      bindKey(flag) {
        let _this = this;
        let response = {code: 'CA_AUTH', message: '', data: ''};
        if (!isNotNull(_this.dataForm.password)) {
          response.message = "密码不能为空";
          _this.$resMessage(response);
          return;
        }
        caInit().then(res => {
          this.dataForm.strRandom = res.data.strRandom;
          this.verifyKeyOperation(flag, response, this.dataForm.strCertID, this.dataForm.password, res.data.strServerCert, res.data.strRandom, res.data.strSignedData)
        })
      },
      getAccessToken() {
        getWeixinToken().then(res => {
          if (res.code == 200) {
            this.weixinToken = res.data
          } else {
            this.weixinToken = "申请过于频繁";
            this.$resMessage(res);
          }
        })
      }
    },
    mounted() {
      this.initBindKey();
      this.initUserInfo();
    },
  }
</script>

<style>
  [v-cloak] {
    display: none !important;
  }
</style>
