<template>
  <div class="key-register">
    <ul>
      <li class="reg-left">
        <h4>绑定第三方帐号</h4>
        <el-form :model="ruleForm" ref="ruleForm" :rules="rules">
          <el-form-item prop="thirdUser">
            <el-input :disabled="true" v-model="ruleForm.certEntityID" type="text" placeholder="证书编号" prefix-icon="iconfont icon-user"
                      @keyup.enter.native="submitForm('ruleForm')" style="width:100%;"></el-input>
          </el-form-item>
          <el-form-item prop="thirdUser">
            <el-input v-model="ruleForm.userName" type="text" placeholder="用户名" prefix-icon="iconfont icon-user"
                      @keyup.enter.native="submitForm('ruleForm')" style="width:100%;"></el-input>
          </el-form-item>
          <el-form-item prop="thirdPsw">
            <el-input v-model="ruleForm.passWord" type="passWord" placeholder="密码" prefix-icon="iconfont icon-mima"
                      @keyup.enter.native="submitForm('ruleForm')" style="width:100%;"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button style="width:100%;" type="primary" @click="submitForm('ruleForm')">登录</el-button>
          </el-form-item>
        </el-form>
      </li>

      <li class="reg-right">
        还没有帐号？<br/>
        <router-link to="/register">去注册</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
  import {caInit} from "src/axios/login/calogin";
  import {mapGetters} from 'vuex'
  import {GetCertEntity,SetUserCertList,GetDateNotBefore,SignedData,VerifyUserPIN,GetUserPINRetryCount,GetSignCert,GetCertBasicinfo,GetDateNotAfter,VerifySignedData} from "src/assets/XTXSAB"
  import {arr,CERT_OID_NOT_BEFORE,CERT_OID_NOT_AFTER,CERT_TYPE_HARD } from "src/assets/XTXSAB"
  export default {
    name: "keyRegister",
    data() {
      return {
        rules: {
          userName: [
            {required: true, message: '用户名不能为空', trigger: 'blur'}
          ],
          passWord: [
            {required: true, message: '请填写密码', trigger: 'blur'}
          ]
        },
        ruleForm: {
          userName: '',
          passWord: '',
          certEntityID:''
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$store.dispatch('LoginInitBindCa', this.ruleForm).then((res) => {
              console.info("res", res)

              if (res.code === '200') {
                this.$router.push({path: '/IndexGeneral'});
              } else {
                this.$resMessage(res);
                this.$router.push({path: '/logIn'});
              }
            }).then((res) => {
              // this.loading = false;
                sessionStorage.setItem("login", "login");
            }).catch((res) => {
              // this.loading = false;
              console.log(res, 'login');
            })
          }
        });
      }
    },
    created() {

      var _this = this
      let strCertID =sessionStorage.getItem("certId");
      // let strCertID = sessionStorage.getItem("certId");
      GetSignCert(strCertID, function (retObj) {
        var strUserCert = retObj.retVal;
        GetCertEntity(strUserCert, function (retObj) {
          console.info(" retObj.retVal", retObj.retVal)
          _this.ruleForm.certEntityID = retObj.retVal
        });
      });

    }

  }
</script>

<style scoped>
  .key-register {
    display: -ms-flexbox;
    display: -moz-flex;
    display: -webkit-flex;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background: #f8f8f8;
  }

  .key-register > ul {
    display: table;
    width: 680px;
    margin: 10% auto;
    padding: 0;
    text-align: center;
    vertical-align: middle;
    border: solid 1px #ddd;
  }

  .key-register > ul > li {
    display: table-cell;
    vertical-align: middle;
  }

  .reg-left {
    padding: 30px 60px;
    border-right: dotted 1px #ddd;
    background: #fff;
  }

  .reg-right {
    width: 240px;
    background: #eee;
    line-height: 32px;
  }
</style>
