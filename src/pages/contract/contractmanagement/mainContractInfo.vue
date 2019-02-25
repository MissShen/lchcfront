<template>
  <div>
    <div class="contract-box">
      <div class="space-20"></div>
      <h1>{{ resData.template.title }}</h1>
      <h3>合同编号：{{ resData.mainContract.conNo }}</h3>
      <hr class="dash"/>
        <div class="contract-main">
          <div class="contract-members">
            <p>
              <strong>甲方（采购人）：</strong> {{ resData.mainContract.jiaName }}
            </p>
            <p>
              <strong>乙方（配送商）：</strong> {{ resData.mainContract.yiName }}
            </p>
          </div>
          <div class="contract-content" v-html="resData.template.content">
          </div>
          <hr class="dash"/>
          <form id="stampForm">
            <input type="hidden" ID="UserSignedData" name="UserSignedData" v-model="dataForm.userSignedData">
            <input type="hidden" ID="UserCert" name="UserCert" v-model="dataForm.userCert">
            <input type="hidden" ID="ContainerName" name="ContainerName" v-model="dataForm.containerName">
            <input type="hidden" ID="strRandom" name="strRandom" v-model="dataForm.strRandom">
            <input type="hidden" ID="imgUrl" name="imgUrl" v-model="dataForm.imgUrl">
          </form>

          <div class="contract-content">
            <p>此协议一式两份。</p>
          </div>

          <div class="contract-seal">
            <ul>
              <li>
                甲方(盖章)
                <template v-if="resData.mainContract.partyAStamp">
                  <img :src="resData.mainContract.jiaSignImgurl" />
                </template>
              </li>
              <li>
                乙方(盖章)
                <template v-if="resData.mainContract.partyBStamp">
                  <img :src="resData.mainContract.yiSignImgurl" />
                </template>
              </li>
            </ul>
            <ul>
              <li>
                甲方(盖章时间):
                <template v-if="resData.mainContract.partyAStamp">
                  {{ moment(resData.mainContract.jiaSignDate).format("YYYY-MM-DD") }}
                </template>
              </li>
              <li>
                乙方(盖章时间):
                <template v-if="resData.mainContract.partyBStamp">
                  {{ moment(resData.mainContract.yiSignDate).format("YYYY-MM-DD") }}
                </template>
              </li>
            </ul>
          </div>
          <!--<div class="contract-content" style="margin-top:10px;">-->
            <div slot="footer" class="flo-right space-40">
              <el-button @click="closeThisWindowAndRefreshParent()" size="small" class="el-button-pale">关闭</el-button>
              <template v-if="resData.mainContract.canSigned && this.operate == 'sign'">
                <el-button v-if="operate == 'sign'" type="primary" size="mini" @click="openSignPasswordView()">盖章</el-button>
                <el-button v-if="operate == 'sign'" type="danger" size="mini" @click="openRejectPasswordView()">拒绝</el-button>
              </template>
            </div>
          <!--</div>-->
      </div>
    </div>
    <!-- 密码框 -->
    <el-dialog title="请输入密码完成签订" :visible.sync="signPasswordVisible" width="30%" :append-to-body="true">
      <el-form label-width="90px" class="demo-ruleForm">
        <el-input type="password" v-model="passWord" size="small"></el-input>
      </el-form>
      <span slot="footer" class="dialog-footer">
            <el-button @click="closeSignPasswordView()" size="small" class="el-button-pale">关闭</el-button>
            <el-button type="primary" @click="sign()" size="small">确定</el-button>
          </span>
    </el-dialog>

    <el-dialog title="请输入密码完成追加" :visible.sync="addPasswordVisible" width="30%" :append-to-body="true">
      <el-form label-width="90px" class="demo-ruleForm">
        <el-input type="password" v-model="passWord" size="small"></el-input>
      </el-form>
      <span slot="footer" class="dialog-footer">
            <el-button @click="closeAddPasswordView()" size="small" class="el-button-pale">关闭</el-button>
            <el-button type="primary" @click="addStamp()" size="small">确定</el-button>
          </span>
    </el-dialog>

    <el-dialog title="请输入密码完成拒绝" :visible.sync="rejectPasswordVisible" width="30%" :append-to-body="true">
      <el-form label-width="90px" class="demo-ruleForm">
        <el-input type="password" v-model="passWord" size="small"></el-input>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeRejectPasswordView()" size="small" class="el-button-pale">关闭</el-button>
        <el-button type="primary" @click="reject()" size="small">确定</el-button>
      </span>
    </el-dialog>
  </div>

</template>

<script>
  import { queryInfo, addProductStamp } from 'src/axios/contract/contractmanagement/signEntrustmentAgreement'
  import { signContract } from 'src/axios/contract/contractmanagement/hospitalSenderContract'
  import { rejectContract } from 'src/axios/contract/contractmanagement/contractManagement'

  import {
    inintCALogin,
  } from 'src/assets/XTXSAB'
  import { keyLoginArr, CERT_OID_NOT_BEFORE, CERT_OID_NOT_AFTER } from 'src/assets/XTXSAB'
  import { caInit } from 'src/axios/login/calogin'
  import { VERIFY_USER_PIN } from 'src/utils/CA';

  import moment from "moment";

  export default {
    props: {
      contractId: {
        type: String,
        required: true
      },
      operate: {
        type: String,
        required: true,
        default: ''
      }
    },
    data () {
      return {
        resData: this.metaData(),
        form: this.metaForm(), // 表单初始化
        query: this.metaQuery(), // 查询初始化
        showForm: false, // 表单可见性初始化
        showQuery: false, // 表单查询初始化
        visible: false,
        dataForm: this.metaForm(),
        result: undefined,
        signPasswordVisible: false,
        addPasswordVisible:false,
        rejectPasswordVisible:false,
        passWord: '',
        options:[]
      }
    },
    created () {
      this.list()
      inintCALogin(this.packUsbKeyUser);
      console.log('main: ', this.operate)
    },
    methods: {
      packUsbKeyUser(retObj) {
        let USB_KEY_USER=[];
        this.options=[];
        console.log('retObj=',retObj);
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
          this.options=USB_KEY_USER;
        }
      },
      moment,
      // -------------------------------------------- 数据初始化  -----------------------------------------
      metaData () {
        return {
          pageNum: 1,
          pageSize: 10,
          size: undefined,
          startRow: undefined,
          endRow: undefined,
          total: undefined,
          pages: undefined,
          prePage: undefined,
          nextPage: undefined,
          isFirstPage: true,
          isLastPage: undefined,
          hasPreviousPage: undefined,
          hasNextPage: undefined,
          navigatePages: undefined,
          navigatepageNums: undefined,
          navigateFirstPage: undefined,
          navigateLastPage: undefined,
          firstPage: undefined,
          lastPage: undefined,
          list: [],
          mainContract: {},
          products: [],
          template: {
            title: ''
          }
        }
      },
      metaForm () { // 表单数据初始化
        return {
          password: undefined,
          userKey: undefined,
          strRandom: '',
          userSignedData: '',
          userCert: '',
          containerName: '',
          imgUrl: ''
        }
      },
      metaQuery () { // 表单查询数据初始化
        return {
          password: undefined,
          userKey: undefined,
          strRandom: '',
          userSignedData: '',
          userCert: '',
          containerName: '',
          imgUrl: ''
        }
      },
      // ------------------------------------------------- 处理方法 ----------------------------------------
      //  获取用户分页列表
      list () {
        queryInfo(this.contractId, null).then(res => {
          this.$nextTick(() => {
            this.resData = res.data
            this.result = res.data
          })
          console.log(this.resData)
        })
      },
      //  签订、盖章
      sign () {
        let _this = this;
        let strCertID = '';
        let strPin = _this.passWord;
        let strServerSignedData = '';
        let strServerRan = '';
        let strServerCert = '';
        caInit().then(res => {
          strServerRan = res.data.strRandom;
          strServerSignedData = res.data.strSignedData;
          strServerCert = res.data.strServerCert;
          _this.dataForm.strRandom = res.data.strRandom;
          if (_this.options.length == 0){
            _this.$message({
              message: "未检测到Key，请检查后重试",
              type: 'error'
            });
            return;
          }
          if (_this.options.length > 1) {
            _this.$message({
              message: "检测到多个Key，默认使用第一个",
              type: 'warning'
            });
          }
          strCertID = _this.options[0].value;
          let keyParam = _this.options;
          VERIFY_USER_PIN(_this,
            keyParam,
            CERT_OID_NOT_BEFORE,
            CERT_OID_NOT_AFTER,
            strCertID,
            strPin,
            strServerCert,
            strServerRan,
            strServerSignedData
          ).then(res => {
            //	do something
            signContract(_this.contractId, res).then(res => {
                _this.$message({
                  message: res.success == true ? res.data : res.message,
                  type: res.success == true ? "success" : "error",
                  onClose: () => {
                    _this.passWord = '';
                    _this.signPasswordVisible = false;
                    _this.addPasswordVisible = false;
                    _this.rejectPasswordVisible = false;
                    _this.$emit('closeParent');
                    _this.visible = false;
                  }
                })
            })
          }).catch(err => {
            console.log("err: ", err);
            _this.$message({
              message: err,
              type: 'error'
            });
          })
        })
      },
      //  追加盖章
      addStamp () {
        let _this = this;
        let strCertID = '';
        let strPin = _this.passWord;
        let strServerSignedData = '';
        let strServerRan = '';
        let strServerCert = '';
        caInit().then(res => {
          strServerRan = res.data.strRandom;
          strServerSignedData = res.data.strSignedData;
          strServerCert = res.data.strServerCert;
          _this.dataForm.strRandom = res.data.strRandom;
          if (_this.options.length == 0){
            _this.$message({
              message: "未检测到Key，请检查后重试",
              type: 'error'
            });
            return;
          }
          if (_this.options.length > 1) {
            _this.$message({
              message: "检测到多个Key，默认使用第一个",
              type: 'warning'
            });
          }
          strCertID = _this.options[0].value;
          let keyParam = _this.options;
          VERIFY_USER_PIN(_this,
            keyParam,
            CERT_OID_NOT_BEFORE,
            CERT_OID_NOT_AFTER,
            strCertID,
            strPin,
            strServerCert,
            strServerRan,
            strServerSignedData
          ).then(res => {
            //	do something
            addProductStamp(_this.contractId, res).then(res => {
              console.log(res);
              _this.$message({
                message: res.success == true ? res.data : res.message,
                type: res.success == true ? 'success' : 'error',
                onClose: () => {
                  _this.passWord = '';
                  _this.signPasswordVisible = false;
                  _this.addPasswordVisible = false;
                  _this.rejectPasswordVisible = false;
                  _this.$emit('closeParent')
                  _this.visible = false
                }
              })
            })
          }).catch(err => {
            console.log("err: ", err);
            _this.$message({
              message: err,
              type: 'error'
            });
          })
        })
      },
      //  拒绝合同
      reject () {
        let _this = this;
        let strCertID = '';
        let strPin = _this.passWord;
        let strServerSignedData = '';
        let strServerRan = '';
        let strServerCert = '';
        caInit().then(res => {
          strServerRan = res.data.strRandom;
          strServerSignedData = res.data.strSignedData;
          strServerCert = res.data.strServerCert;
          _this.dataForm.strRandom = res.data.strRandom;
          if (_this.options.length == 0){
            _this.$message({
              message: "未检测到Key，请检查后重试",
              type: 'error'
            });
            return;
          }
          if (_this.options.length > 1) {
            _this.$message({
              message: "检测到多个Key，默认使用第一个",
              type: 'warning'
            });
          }
          strCertID = _this.options[0].value;
          let keyParam = _this.options;
          VERIFY_USER_PIN(_this,
            keyParam,
            CERT_OID_NOT_BEFORE,
            CERT_OID_NOT_AFTER,
            strCertID,
            strPin,
            strServerCert,
            strServerRan,
            strServerSignedData
          ).then(res => {
            //	do something
            rejectContract(_this.contractId, res, null).then(res => {
              console.log(res);
              _this.$message({
                message: res.success == true ? res.data : res.message,
                type: res.success == true ? 'success' : 'error',
                onClose: () => {
                  _this.passWord = '';
                  _this.signPasswordVisible = false;
                  _this.addPasswordVisible = false;
                  _this.rejectPasswordVisible = false;
                  _this.$emit('closeParent')
                  _this.visible = false
                }
              })
            })
          }).catch(err => {
            console.log("err: ", err);
            _this.$message({
              message: err,
              type: 'error'
            });
          })
        })
      },
      //  密码框
      openSignPasswordView() {
        this.passWord = '';
        this.signPasswordVisible = true;
      },
      closeSignPasswordView() {
        this.passWord = '';
        this.signPasswordVisible = false;
      },
      openAddPasswordView() {
        this.passWord = '';
        this.addPasswordVisible = true;
      },
      closeAddPasswordView() {
        this.passWord = '';
        this.addPasswordVisible = false;
      },
      openRejectPasswordView() {
        this.passWord = '';
        this.rejectPasswordVisible = true;
      },
      closeRejectPasswordView() {
        this.passWord = '';
        this.rejectPasswordVisible = false;
      },
      closeThisWindowAndRefreshParent () {
        this.$emit('closeParent');
        this.visible = false;
      },
      //  父组件用来控制当前组件刷新的函数
      refreshList () {
        this.list()
      },
      // 重置用户表单
      resetForm () {
        this.query = this.metaQuery()
        this.list()
      },
      // ************************
      handleSizeChange (val) {
        this.resData.pageSize = val
        this.list()
      },
      handleCurrentChange (val) {
        this.resData.pageNum = val
        this.list()
      }
    }
  }
</script>

<style scoped>
  @import "./../../../assets/css/compact.css";
</style>
