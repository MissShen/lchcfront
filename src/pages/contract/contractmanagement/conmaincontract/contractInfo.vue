<template>
  <div>
    <el-dialog
      :title="this.operate == 'info' ? '合同详情' : (
                this.operate == 'change' ? '合同变更' : (
                  this.operate == 'add' ? '合同追加' : '签订委托协议'
                )
              )"
      :close-on-click-modal="false"
      :visible.sync="visible" width="80%">
      <div class="contract-box">
        <h1>{{ this.resData.template.title }}</h1>
        <h3>合同编号：{{ this.resData.mainContract.conNo }}</h3>
        <hr style="padding: 0; margin: 15px 0; border:none; border-bottom: 1px solid #E4E7EA;"/>
        <div class="contract-main">
          <div class="contract-members">
            <p>
              <strong>生产/经营企业：</strong> {{ this.resData.mainContract.jiaName }}
            </p>
            <p>
              <strong>配送商：</strong> {{ this.resData.mainContract.yiName }}
            </p>
          </div>
          <div class="contract-content" v-html="this.resData.template.content">
          </div>
          <hr class="dash"/>
          <p class="contract-list-title">
            合同产品明细
            <template v-if="this.operate == 'add' && this.resData.mainContract.canDetail">
              <el-button type="primary" size="small" style="float: right;" @click="addProduct()">追加产品</el-button>
            </template>
            <template v-if="this.operate == 'change' && this.resData.mainContract.canDetail">
              <el-button type="primary" size="small" style="float: right;" @click="changeProduct()">变更产品</el-button>
            </template>
          </p>

          <div class="tableset">
            <el-table
              :data="products.list"
              :row-class-name="judgeClass"
              border>
              <el-table-column label="通用名" width="150" :show-overflow-tooltip="true">
                <template slot-scope="scope">
                  <span>{{ scope.row.nameChn }}</span>
                </template>
              </el-table-column>
              <el-table-column label="产品名" width="150" :show-overflow-tooltip="true">
                <template slot-scope="scope">
                  <span>{{ scope.row.productName }}</span>
                </template>
              </el-table-column>
              <el-table-column  label="商品名" width="150" :show-overflow-tooltip="true">
                <template slot-scope="scope">
                  <span>{{ scope.row.tradeName }}</span>
                </template>
              </el-table-column>
              <el-table-column label="剂型" width="70" :show-overflow-tooltip="true">
                <template slot-scope="scope">
                  <span>{{ scope.row.doseageFormName }}</span>
                </template>
              </el-table-column>
              <el-table-column label="规格" width="70" :show-overflow-tooltip="true">
                <template slot-scope="scope">
                  <span>{{ scope.row.spec }}</span>
                </template>
              </el-table-column>
              <el-table-column label="转换比" width="70" :show-overflow-tooltip="true">
                <template slot-scope="scope">
                  <span>{{ scope.row.standRate }}</span>
                </template>
              </el-table-column>
              <el-table-column label="单位" width="50" :show-overflow-tooltip="true">
                <template slot-scope="scope">
                  <span>{{ scope.row.specUnit }}</span>
                </template>
              </el-table-column>
              <el-table-column label="包材" width="50" :show-overflow-tooltip="true">
                <template slot-scope="scope">
                  <span>{{ scope.row.wrapName }}</span>
                </template>
              </el-table-column>
              <el-table-column label="生产企业" :show-overflow-tooltip="true">
                <template slot-scope="scope">
                  <span>{{ scope.row.manufactureName }}</span>
                </template>
              </el-table-column>
              <el-table-column label="企业报价" align="right" header-align="left" width="80" :show-overflow-tooltip="true">
                <template slot-scope="scope">
                  <span>{{ priceFormat(scope.row.bidPrice) }}</span>
                </template>
              </el-table-column>
            </el-table>
          </div>

          <!-- 表格分页 -->
          <div class="pagebox">
            <el-pagination
              layout="total, sizes, prev, pager, next, jumper"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :page-sizes="[10, 20, 30]"
              :total="products.total"
              :page-size="products.pageSize"
              :page-count="products.pages"
              :current-page.sync="products.pageNum">
            </el-pagination>
          </div>

          <div class="contract-content">
            <p>此协议一式两份。</p>
            <p>备注：委托配送协议由生产/经营企业和配送商加盖章后上传至北京市医药阳光采购综合管理平台备案。</p>
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
                  {{ moment(resData.mainContract.tempSignDate == null ? resData.mainContract.jiaSignDate : resData.mainContract.tempSignDate).format("YYYY-MM-DD") }}
                </template>
              </li>
              <li>
                乙方(盖章时间):
                <template v-if="resData.mainContract.partyBStamp">
                  {{ moment(resData.mainContract.tempSignDate == null ? resData.mainContract.yiSignDate : resData.mainContract.tempSignDate).format("YYYY-MM-DD") }}
                </template>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <product-list-view v-if="productListViewVisible" :parent-id="this.contractId" @refreshParent="reloadInfo" ref="productListView"></product-list-view>

      <span slot="footer">
        <template v-if="resData.mainContract.canSigned && this.operate == 'sign'">
          <el-button type="success" size="small" @click="openSignPasswordView()">盖章</el-button>
          <el-button type="danger" size="small" @click="openRejectPasswordView()">拒绝</el-button>
        </template>

        <template v-if="(resData.mainContract.canSigned || resData.mainContract.adding) && this.operate == 'add'">
          <el-button type="success" size="small" @click="openAddPasswordView()">盖章</el-button>
          <el-button type="danger" size="small" @click="openRejectPasswordView()">拒绝</el-button>
        </template>

        <template v-if="(resData.mainContract.canSigned || resData.mainContract.changing) && this.operate == 'change'">
          <el-button type="success" size="small" @click="openChangePasswordView()">盖章</el-button>
          <el-button type="danger" size="small" @click="openRejectPasswordView()">拒绝</el-button>
        </template>

        <el-button @click="closeThisWindowAndRefreshParent()" size="small" class="el-button-pale">关闭</el-button>

      </span>

    </el-dialog>

    <!-- 密码框 -->
    <el-dialog title="请输入密码完成签订" :visible.sync="signPasswordVisible" width="30%">
      <el-form label-width="90px" class="demo-ruleForm">
          <el-input type="password" v-model="passWord" size="small"></el-input>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeSignPasswordView()" size="small" class="el-button-pale">关闭</el-button>
        <el-button type="primary" @click="sign()" size="small">确定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="请输入密码完成追加" :visible.sync="addPasswordVisible" width="30%">
      <el-form label-width="90px" class="demo-ruleForm">
        <el-input type="password" v-model="passWord" size="small"></el-input>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeAddPasswordView()" size="small" class="el-button-pale">关闭</el-button>
        <el-button type="primary" @click="addStamp()" size="small">确定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="请输入密码完成变更" :visible.sync="changePasswordVisible" width="30%">
      <el-form label-width="90px" class="demo-ruleForm">
        <el-input type="password" v-model="passWord" size="small"></el-input>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeChangePasswordView()" size="small" class="el-button-pale">关闭</el-button>
        <el-button type="primary" @click="changeStamp()" size="small">确定</el-button>
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
  import {
    queryInfo,
    signContract, queryProducts,
    addProductStamp, changeStamp
  } from 'src/axios/contract/contractmanagement/signEntrustmentAgreement'
  import { rejectContract } from 'src/axios/contract/contractmanagement/contractManagement'

  import productListView from 'src/pages/contract/contractmanagement/conmaincontract/productList'


  import {
    inintCALogin,
  } from 'src/assets/XTXSAB'
  import { keyLoginArr, CERT_OID_NOT_BEFORE, CERT_OID_NOT_AFTER } from 'src/assets/XTXSAB'
  import { caInit } from 'src/axios/login/calogin'
  import { VERIFY_USER_PIN } from 'src/utils/CA';

  import moment from "moment";
  import {priceFormat} from "src/utils"

  export default {
    components: {
      productListView
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
        operate: undefined,
        products: this.metaData(),
        productListViewVisible: false,
        signPasswordVisible: false,
        addPasswordVisible:false,
        changePasswordVisible:false,
        rejectPasswordVisible: false,
        passWord: '',
        partyCode: undefined,
        options:[]
      }
    },
    created () {
      inintCALogin(this.packUsbKeyUser);
    },

    methods: {
      moment,
      priceFormat,
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
          template: {
            'id': undefined,
            'title': '',
            'tempCode': null,
            'typeId': undefined,
            'state': undefined,
            'content': undefined,
            'createDate': undefined,
            'createUserId': undefined,
            'updateDate': undefined,
            'updateUserId': undefined,
            'name': null,
            'type': null,
            'typeName': null
          },
          mainContract: {
            'id': undefined,
            'conNo': undefined,
            'conType': undefined,
            'jiaId': undefined,
            'jiaName': undefined,
            'yiId': undefined,
            'yiName': undefined,
            'jiaState': undefined,
            'yiState': undefined,
            'conState': undefined,
            'startDate': null,
            'endDate': null,
            'jiaSignDate': null,
            'yiSignDate': null,
            'contractFile': null,
            'changeContractFile': null,
            'jiaRefuseRemark': null,
            'yiRefuseRemark': null,
            'createUserId': undefined,
            'createDate': undefined,
            'modifyUserId': null,
            'modifyDate': null,
            'projectId': undefined,
            'templateId': undefined,
            'jiaSignImgurl': null,
            'yiSignImgurl': null,
            'productNum': null,
            'changeNum': null,
            'conTypeName': null,
            'conStateName': null,
            'jiaStateName': null,
            'yiStateName': null,
            'partyAStamp': null,
            'partyBStamp': null
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
      fillData (contractId, operate, partyCode) {
        let _this = this;
        _this.visible = true
        _this.contractId = contractId;
        _this.partyCode = partyCode;
        _this.operate = operate;
        _this.queryContractInfo();
        _this.list();
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
      //  获取产品列表
      list () {
        queryProducts (this.contractId, this.partyCode, this.products).then(res => {
          this.products = res.data;
          if (this.products.pageNum === 0) {
            this.products.pageNum = 1;
          }
        })
      },
      //  获取合同详情
      queryContractInfo () {
        queryInfo(this.contractId, this.partyCode).then(res => {
          this.resData = res.data
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
            signContract(_this.contractId, res, _this.partyCode, _this.partyCode).then(res => {
              _this.$message({
                message: res.success == true ? res.data : res.message,
                type: res.success == true ? 'success' : 'error',
                onClose: () => {
                  _this.reloadInfo();
                }
              })
            })
        }).catch(err => {
            _this.$message({
              message: "服务器繁忙，",
              type: 'error'
            });
          })
        })
      },
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
      openChangePasswordView() {
        this.passWord = '';
        this.changePasswordVisible = true;
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
      //  追加产品
      addProduct () {
        this.productListViewVisible = true
        this.$nextTick(() => {
          this.$refs.productListView.fillData(this.contractId, this.partyCode, this.operate);
        })
      },
      //  变更产品
      changeProduct () {
        this.productListViewVisible = true
        this.$nextTick(() => {
          this.$refs.productListView.fillData(this.contractId, this.partyCode, this.operate);
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
              addProductStamp(_this.contractId, res, _this.partyCode).then(res => {
                _this.$message({
                  message: res.success == true ? res.data : res.message,
                  type: res.success == true ? 'success' : 'error',
                  onClose: () => {
                    _this.reloadInfo();
                  }
                })
              })
            }).catch(err => {
                _this.$message({
                  message: err,
                  type: 'error'
                });
            })
        })
      },
      //  变更盖章
      changeStamp () {
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
            changeStamp(_this.contractId, res, _this.partyCode).then(res => {
              _this.$message({
                message: res.success == true ? res.data : res.message,
                type: res.success == true ? 'success' : 'error',
                onClose: () => {
                  _this.reloadInfo();
                }
              })
            })
          }).catch(err => {
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
            rejectContract(_this.contractId, res, this.partyCode).then(res => {
              _this.$message({
                message: res.success == true ? res.data : res.message,
                type: res.success == true ? 'success' : 'error',
                onClose: () => {
                  _this.passWord = '';
                  _this.reloadInfo();
                }
              })
            })
          }).catch(err => {
            _this.$message({
              message: err,
              type: 'error'
            });
          })
        })
      },
      //  重新加载详情
      reloadInfo () {
        this.passWord = '';
        this.signPasswordVisible = false;
        this.addPasswordVisible = false;
        this.changePasswordVisible = false;
        this.rejectPasswordVisible = false;
        this.queryContractInfo();
        this.list();
      },
      //  控制追加中产品的样式
      judgeClass({row, rowIndex}){
        if (row.addFlag == '20') {
          return 'compact-data-new'
        }
        if (row.deleteFlag == '20') {
          return 'compact-data-new'
        }
        return ''
      },
      //  关闭弹窗、刷父页面
      closeThisWindowAndRefreshParent () {
        this.passWord = '';
        this.signPasswordVisible = false;
        this.addPasswordVisible = false;
        this.changePasswordVisible = false;
        this.rejectPasswordVisible = false;
        this.$emit('refreshParent');
        this.visible = false;
      },
      // 重置用户表单
      resetForm () {
        this.query = this.metaQuery()
        this.list()
      },
      // ************************
      handleSizeChange (val) {
        this.products.pageSize = val
        this.list()
      },
      handleCurrentChange (val) {
        this.products.pageNum = val
        this.list()
      }
    }

  }
</script>

<style scoped>
  @import "./../../../../assets/css/compact.css";
</style>
