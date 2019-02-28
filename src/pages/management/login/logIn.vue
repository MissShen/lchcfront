<template>
  <div>
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
                  <!--<el-form-item prop="validCode">-->
                  <!--<el-col :span="12" style="padding-right: 10px;">-->
                  <!--<i class="icon icon-wendang"></i>-->
                  <!--<el-input v-model="ruleForm.validCode" type="text" name="validCode" placeholder="验证码"-->
                  <!--@keyup.enter.native="submitForm('ruleForm')"></el-input>-->
                  <!--</el-col>-->
                  <!--<el-col :span="12">-->
                  <!--<img :src="validCodeImage" height="34" @click="getValidCode">-->
                  <!--</el-col>-->
                  <!--</el-form-item>-->
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

  export default {
    name: 'logIn',
    components: {
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
          ]
          // validCode: [
          //   {required: true, message: '验证码不能为空', trigger: 'blur'}
          // ]
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
      // getValidCode() {
      //   this.validCodeKey=uuid();
      //   validCode(this.validCodeKey).then(res => {
      //     if (res.code == 200) {
      //       this.ruleForm.uuid =this.validCodeKey;
      //       this.validCodeImage = res.data
      //     }
      //   })

      getContent(description) {
        description = description.replace(/(\n)/g, "");
        description = description.replace(/(\t)/g, "");
        description = description.replace(/(\r)/g, "");
        description = description.replace(/<\/?[^>]*>/g, "");
        description = description.replace(/\s*/g, "");
        description = description.replace(/&nbsp;/ig, "");
        return description;
      },
      submitForm(formName) {
        this.showErrorMsg = false;
        this.$router.push({path: '/IndexGeneral'})
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
               this.loading = false;
              if (res.code === "100") {
                this.showErrorMsg = true;
                this.errorMsg = res.message;
              }
            })
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
        //this.getValidCode();
        // unLoginNoticeLimitList().then(res => {
        //   this.resData = res.data;
        //   0 === this.resData.pageNum ? this.resData.pageNum = 1 : null;
        // })
      }
  }
  }

</script>
