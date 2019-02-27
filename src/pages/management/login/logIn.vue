<template>
  <div>
    <notice-view-from v-if="isNoticeView" ref="noticeView"></notice-view-from>
    <div class="login-main">
      <div class="slogan">
        <div class="key-login">
          <ul class="login-win" v-if="isLogin()">
            <li class="win-head"><span class="avatar"><img :src="userImage"></span></li>
            <li class="win-name">{{ loginCode }}</li>
            <li class="win-role">{{ roleNames }}</li>
            <li class="win-btn">
              <el-button type="primary" @click="Login">进入系统</el-button>
            </li>
            <li class="win-exit">
              <el-button type="primary" @click="loginOut">退出</el-button>
            </li>
          </ul>
          <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick" class="login-tabs"
                   v-if="!isLogin()">
            <el-tab-pane label="系统登录" name="first">
              <div class="login-form">
                <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm">
                  <el-form-item prop="userName">
                    <i class="icon icon-user"></i>
                    <el-input v-model="ruleForm.userName" type="text" name="userName" placeholder="用户名"></el-input>
                  </el-form-item>
                  <el-form-item prop="passWord">
                    <i class="icon icon-pw"></i>
                    <el-input v-model="ruleForm.passWord" type="passWord" name="userPsw" placeholder="密码"
                              @keyup.enter.native="submitForm('ruleForm')"></el-input>
                  </el-form-item>
                  <el-form-item prop="validCode">
                    <el-col :span="12" style="padding-right: 10px;">
                      <i class="icon icon-wendang"></i>
                      <el-input v-model="ruleForm.validCode" type="text" name="validCode" placeholder="验证码"
                                @keyup.enter.native="submitForm('ruleForm')"></el-input>
                    </el-col>
                    <el-col :span="12">
                      <img :src="validCodeImage" height="34" @click="getValidCode">
                    </el-col>
                  </el-form-item>
                  <el-form-item style="padding-top:10px">
                    <el-button :loading="loading" type="primary" @click="submitForm('ruleForm')">登录</el-button>
                    <div v-if="showErrorMsg" class="orange" style="margin-top:5px; line-height:14px; text-align:center">
                      {{errorMsg}}
                    </div>
                  </el-form-item>
                </el-form>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import router from 'src/router'
  import {validCode} from "src/axios/login/login";
   import {uuid} from "src/utils";
   import {
    SetUserCertList,
    GetDateNotBefore,
    SignedData,
    VerifyUserPIN,
    GetUserPINRetryCount,
    GetSignCert,
    GetCertBasicinfo,
    GetDateNotAfter,
    VerifySignedData
  } from "src/assets/XTXSAB"
  import {CERT_OID_NOT_BEFORE, CERT_OID_NOT_AFTER, CERT_TYPE_HARD} from "src/assets/XTXSAB"

  export default {
    name: 'logIn',
    components: {
      noticeViewFrom
    },
    computed: {
      ...mapGetters([
        'loginCode',
        'roleNames',
        'userImage',
        'addRouters',
      ]),
    },
    data() {
      var checkName = (rule, value, callback) => {
        const val = value.trim();
        this.ruleForm.userName = val;  //去掉首尾误输入的空格
        if (!val) {
          return callback(new Error('用户名不能为空'));
        }
        setTimeout(() => {
          const patt = /^[a-zA-Z0-9_]{3,16}$/;
          if (!patt.test(val)) {
            return callback(new Error('用户名为3-16个字母、数字和下划线“_”组合'));
          } else {
            callback();
          }
        }, 1000);
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          callback();
        }
      };
      return {
        rules: {
          userName: [
            {validator: checkName, trigger: 'blur'}
          ],
          passWord: [
            {validator: validatePass, trigger: 'blur'}
          ],
          validCode: [
            {required: true, message: '验证码不能为空', trigger: 'blur'}
          ]
        },
        keyRules: {
          UserListKey: [
            {required: true, message: '请选择', trigger: 'change'}
          ],
          password: [
            {required: true, message: '密码不能为空', trigger: 'blur'},
            {min: 3, max: 10, message: '长度在 3 到 5 个字符', trigger: 'blur'}
          ]
        },
        ruleForm: {
          userName: '',
          passWord: '',
          validCode: '',
          uuid: '',
        },
        validCodeKey: '',
        validCodeImage: '',
        USB_KEY_USER: [],
        options: [],
        resData: {
          pageNum: 1,
          pageSize: 10,
          total: 0,
          pages: 0,
          list: []
        },
        loginKeyForm: {
          UserListKey: '',
          password: '',
          strRandom: '',
          userSignedData: '',
          userCert: '',
          containerName: ''

        },
        showErrorMsg: false,
        isNoticeView: false,
        errorMsg: '',
        passwordType: 'password',
        activeName: 'first',
        newList: [],
        notice: {},
        isShow: false,
        noticeShow: false,
        loading: false,
      };

    },
    created() {
      this.metaList();
    },
    methods: {
      getValidCode() {
        this.validCodeKey=uuid();
        validCode(this.validCodeKey).then(res => {
          if (res.code == 200) {
            this.ruleForm.uuid =this.validCodeKey;
            this.validCodeImage = res.data
          }
        })
      },
      getContent(description) {
        description = description.replace(/(\n)/g, "");
        description = description.replace(/(\t)/g, "");
        description = description.replace(/(\r)/g, "");
        description = description.replace(/<\/?[^>]*>/g, "");
        description = description.replace(/\s*/g, "");
        description = description.replace(/&nbsp;/ig, "");
        return description;
      },
      handleNoticeView(id) {
        this.isNoticeView = true;
        this.$nextTick(function () {
          this.$refs.noticeView.metaList(id)
        })
      },
      openAffiche() {
        this.$router.push({path: '/affiche'});
      },
      submitForm(formName) {
        this.showErrorMsg = false;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.loading = true;
            this.$store.dispatch('LoginUser', this.ruleForm).then((res) => {
              const resources = res.data.resourceList;
              this.$store.dispatch('generateRoutes', {resources}).then(() => { // 根据权限生成可访问的路由表
                router.addRoutes(this.addRouters); // 动态添加可访问路由表
                router.addRoutes([{path: '*', redirect: 'Error/404', hidden: true}]);
              });
              this.loading = false;
              this.$router.push({path: '/IndexGeneral'});
            }).catch((res) => {
              this.getValidCode();
              this.loading = false;
              if (res.code === "100") {
                this.showErrorMsg = true;
                this.errorMsg = res.message;
              }
            })
          }
        });

      },
      submitKeyForm(formName) {
        var _this = this
        var strServerSignedData = ''
        var strServerRan = ''
        var strServerCert = ''
        this.$refs[formName].validate((valid) => {

          if (valid) {
            var strCertID = _this.loginKeyForm.UserListKey
            var strPin = _this.loginKeyForm.password
            //  第一步:获取服务器证书:strServerCert,随机数strServerRan，随机数签名strServerSignedData
            caInit().then(res => {
              strServerSignedData = res.data.strSignedData
              strServerRan = res.data.strRandom
              strServerCert = res.data.strServerCert
              _this.loginKeyForm.strRandom = strServerRan
              _this.loginKeyForm.containerName = strCertID

            }).then(() => {
              // 第二步: 验证用户密码： params=证书ID,证书密码
              VerifyUserPIN(strCertID, strPin, function (retObj) {
                if (!retObj.retVal) {
                  GetUserPINRetryCount(strCertID, function (retObj) {
                    var retryCount = Number(retObj.retVal);
                    if (retryCount > 0) {
                      alert("校验证书密码失败!您还有" + retryCount + "次机会重试!");
                      return;
                    } else if (retryCount == 0) {
                      alert("您的证书密码已被锁死,请联系BJCA进行解锁!");
                      return;
                    } else {
                      alert("登录失败!");
                      return;
                    }
                  });
                  return;
                }
                //strClientCert
                //第三步: 通过证书ID获取用户证书 params=证书ID
                GetSignCert(strCertID, function (retObj) {
                  var strUserCert = retObj.retVal;
                  if (strUserCert == "") {
                    alert("导出用户证书失败!");
                    return;
                  }
                  _this.loginKeyForm.userCert = strUserCert;
                  //  ..辅助：证书基本信息校验
                  GetCertBasicinfo(strUserCert, CERT_OID_NOT_BEFORE, function (retObj) {
                    var notBeforeDate = GetDateNotBefore(retObj.retVal);
                    var days = parseInt((notBeforeDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
                    if (days > 0) {
                      alert("您的证书尚未生效!距离生效日期还剩" + days + "天!");
                      return;
                    }

                    var strUserCert = _this.loginKeyForm.userCert;
                    GetCertBasicinfo(strUserCert, CERT_OID_NOT_AFTER, function (retObj) {
                      var notAfterDate = GetDateNotAfter(retObj.retVal);
                      var milliseconds = notAfterDate.getTime() - new Date().getTime();
                      if (milliseconds < 0) {
                        alert("您的证书已过期，请尽快到北京数字证书认证中心办理证书更新手续！");
                        return;
                      }
                      // 第四步:客户端验证服务端证书以及随机数签名  params=服务器证书，随机数，随机数的签名
                      VerifySignedData(strServerCert, strServerRan, strServerSignedData,
                        function (retObj) {
                          if (!retObj.retVal) {
                            alert("验证服务器端信息失败!");
                            return;
                          }

                          var strCertID = _this.loginKeyForm.UserListKey;
                          // 第五步：使用客户端证书ID-进行签名-随机数  params=证书ID,随机数
                          // 返回签名后的数据
                          SignedData(strCertID, strServerRan, function (retObj) {
                            if (retObj.retVal == "") {
                              alert("客户端签名失败!");
                              return;
                            }
                            _this.loginKeyForm.userSignedData = retObj.retVal;

                            _this.$store.dispatch('LoginCA', _this.loginKeyForm).then((res) => {
                              if (res.code == '200') {
                                const resources = res.data.resourceList;
                                _this.$store.dispatch('generateRoutes', {resources}).then(() => {
                                  router.addRoutes(_this.addRouters); // 动态添加可访问路由表
                                });
                                _this.$router.push({path: '/IndexGeneral'});
                              } else if (res.code == '501') {
                                _this.$resMessage(res);
                                _this.$router.push({path: '/keyRegister'});
                              } else {
                                _this.$resMessage(res);
                                _this.$router.push({path: '/logIn'});
                              }
                            }).catch((res) => {
                              if (res.code == '501') {
                                _this.$resMessage(res);
                                // _this.$router.push({path: '/keyRegister'});
                              }
                              // this.loading = false;
                              _this.$router.push({path: '/logIn'});
                            })

                          });
                        });
                    });
                  });
                });

                // caTestLogin(_this.loginKeyForm).then(res => {
                //   // let fileName=res.headers['Content-Disposition'].split('filename=')[1];
                //   // let contentType=res.headers['content-Type'];
                //   console.info(res.data)
                //   fileUpload(res.data,"1.xls","application/vnd.ms-excel")
                // })

              });

            })


          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      handleClick(tab) {
        if (tab.name === "second") {
        }
      },
      overShow(index) {
        this.noticeShow = index;
      },
      outHide(index) {
        this.noticeShow = index;
      },
      Login() {
        this.$router.push({path: '/IndexGeneral'})
      },
      loginOut() {
        this.$store.dispatch('logoutUser')
      },
      isLogin() {
        return 'login' === sessionStorage.getItem('login');
      },
      metaList() {
        this.getValidCode();
        unLoginNoticeLimitList().then(res => {
          this.resData = res.data;
          0 === this.resData.pageNum ? this.resData.pageNum = 1 : null;
        })
      },
      packUsbKeyUser(retObj) {
        let USB_KEY_USER = [];
        this.options = [];
        this.loginKeyForm.UserListKey = '';
        if (retObj && retObj.retVal) {
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
          this.options = USB_KEY_USER;
        }
      },

    },
  }
</script>
