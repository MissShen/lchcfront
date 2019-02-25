<template>
  <div>
    <!-- ========================== 主内容start ========================= -->

    <!-- 表格 -->
    <div class="tablebox">
      <!-- 表格查询表单 -->
        <el-form ref="query" :model="query" size="small" :inline="true" class="table-form">
            <el-form-item>
              <el-input v-model="query.orgName" :maxlength="20" size="small" placeholder="机构名称" @keyup.enter.native="searchEnterFun"></el-input>
            </el-form-item>
            <el-form-item>
              <el-select v-model="query.conState" size="small" placeholder="状态">
                <el-option-group
                  key="状态"
                  label="状态">
                  <el-option
                    v-for="item in contractTypes"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-option-group>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="success"  size="small" @click="searchEnterFun">查询</el-button>
              <el-button size="small" type="warning" @click="resetForm()">重置</el-button>
            </el-form-item>
        </el-form>

      <!-- 表格列表 -->
      <div class="tableset">
        <el-table
          :data="resData.list"
          border
          @sort-change="sortChange"
          stripe>
          <el-table-column label="甲方" prop="jiaName" sortable min-width="150">
            <template slot-scope="scope">
              <span>{{ scope.row.jiaName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="乙方" prop="yiName" sortable sortable min-width="150">
            <template slot-scope="scope">
              <span>{{ scope.row.yiName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="产品数量" prop="productNum" sortable align="right" width="90">
            <template slot-scope="scope">
              <el-tooltip :enterable="false" class="item" effect="dark" placement="top">
                <div slot="content">点击查看产品信息</div>
                <a @click="showProductList(scope.row.id)">{{ scope.row.productNum != null ? scope.row.productNum : 0 }}</a>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column label="变更次数" prop="changeNum" sortable align="right" width="90">
            <template slot-scope="scope">
              <template v-if="scope.row.changeNum == null || scope.row.changeNum == 0">
                <span>0</span>
              </template>
              <template v-if="scope.row.changeNum > 0">
                <span>
                  <a @click="showContractLog(scope.row.id)">{{ scope.row.changeNum }}</a>
                </span>
              </template>
            </template>
          </el-table-column>
          <el-table-column label="合同附件" prop="fileNum" sortable align="right" width="90">
            <template slot-scope="scope">
              <span v-if="scope.row.fileNum > 0">
                <a class="operation-btn" type="text" size="small" @click="showFile(scope.row.id)">
                  {{ scope.row.fileNum }}
                </a>
              </span>
              <span v-if="scope.row.fileNum == 0">
                  {{ scope.row.fileNum }}
              </span>
            </template>
          </el-table-column>
          <el-table-column label="甲方状态" align="center" width="90">
            <template slot-scope="scope">
              <i :class="getClassByState(scope.row.jiaStateIcon)" :title="scope.row.jiaStateName"></i>
            </template>
          </el-table-column>
          <el-table-column label="乙方状态" align="center" width="90">
            <template slot-scope="scope">
              <i :class="getClassByState(scope.row.yiStateIcon)" :title="scope.row.yiStateName"></i>
            </template>
          </el-table-column>
          <el-table-column label="合同签订时间" prop="fileNum" sortable align="center" width="90">
            <template slot-scope="scope">
              <span :title="scope.row.contractSignDate">{{ scope.row.contractSignDate == null ?  '' : moment(scope.row.contractSignDate).format("YYYY-MM-DD") }}</span>
            </template>
          </el-table-column>
          <el-table-column label="合同状态" align="center" width="90">
            <template slot-scope="scope">
              <i :class="getClassByState(scope.row.conStateIcon)" :title="scope.row.conStateName"></i>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="260">
            <template slot-scope="scope">
              <div class="operates w100">
                <span class="btn-word-2">
                  <a v-if="scope.row.canSigned" class="blue-bord" type="text" size="small" @click="sign(scope.row.id)">签订</a>
                  <a v-if="scope.row.canChanged || scope.row.adding" class="blue-bord" type="text" size="small" @click="addProduct(scope.row.id)">追加</a>
                  <a v-if="scope.row.relieving" class="blue-bord" type="text" size="small" @click="openRelievePasswordView(scope.row.id)">同意</a>
                </span>
                <span class="btn-word-2">
                  <a v-if="scope.row.canChanged || scope.row.changing" class="orange-bord" type="text" size="small" @click="changeProduct(scope.row.id)">变更</a>
                </span>
                <span class="btn-word-2">
                  <a v-if="scope.row.canRelieve" class="red-bord" type="text" size="small" @click="openRelievePasswordView(scope.row.id)">解除</a>
                  <a v-if="scope.row.canCancelSign" class="red-bord" type="text" size="small" @click="cancelSign(scope.row.id)">撤销</a>
                  <a v-if="scope.row.canCancelRelieve" class="red-bord" type="text" size="small" @click="cancelRelieve(scope.row.id)">撤回</a>
                  <a v-if="scope.row.relieving" class="red-bord" type="text" size="small" @click="openRejectPasswordView(scope.row.id)">拒绝</a>
                </span>
                <span v-if="scope.row.canUpload">
                  <a type="text" size="small" @click="upload(scope.row.id)">上传</a>
                </span>
                <span>
                  <a type="text" size="small" @click="showInfo(scope.row.id)">详情</a>
                </span>
                <span v-if="scope.row.contractFile">
                  <a type="text" size="small" @click="downLoadFile(scope.row.id)">下载</a>
                </span>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <!-- 表格分页 -->
      <div class="pagebox">
        <ul class="explain">
          标记说明：
          <li><i class="ico-status ico-ty"></i><span>同意</span></li>
          <li><i class="ico-status ico-clz"></i><span>处理中</span></li>
          <li><i class="ico-status ico-jc"></i><span>解除</span></li>
          <li><i class="ico-status ico-juj"></i><span>拒绝</span></li>
          <li><i class="ico-status ico-njc"></i><span>拒绝解除</span></li>
        </ul>
        <el-pagination
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="[10, 20, 30]"
          :total="resData.total"
          :page-size="resData.pageSize"
          :page-count="resData.pages"
          :pager-count="5"
          :current-page.sync="resData.pageNum">
        </el-pagination>
      </div>

    </div>
    <!-- ========================== 主内容end ========================= -->

    <info-view v-if="infoViewVisible" :parent-id="this.contractId" ref="infoView" @refreshParent="list"></info-view>
    <change-view v-if="changeViewVisible" :parent-id="this.contractId" ref="changeView" @refreshParent="list"></change-view>
    <product-detail v-if="productDetailVisible" :parent-id="this.id" ref="productDetail"></product-detail>

    <!-- 密码框 -->
    <el-dialog title="请输入密码完成解除" :visible.sync="relievePasswordVisible" width="30%">
      <el-form label-width="90px" class="demo-ruleForm">
        <el-input type="password" v-model="passWord" size="small"></el-input>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeRelievePasswordView()" size="small" class="el-button-pale">关闭</el-button>
        <el-button type="primary" @click="relieve()" size="small">确定</el-button>
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

    <el-dialog title="文件" :visible.sync="fileVisible" width="30%" :append-to-body="true">
      <file-preview :fileIdList="fileIds" @deleteCallBack="changeIdList"></file-preview>
    </el-dialog>

    <choose-files ref="chooseFiles" v-if="dialogVisible" @handleSelectedFolder="selectedData"></choose-files>
  </div>

</template>
<script>

  // 引入用户相关请求  引自js文件
  import {queryContractList, relieveContract, queryTradeNum,
    uploadContractFile, queryContractFileIds, deleteByFileIds,
    cancelContractSign, cancelContractRelieve} from 'src/axios/contract/contractmanagement/signEntrustmentAgreement'
  import {findContractType, downLoadPdf} from 'src/axios/contract/contractmanagement/contractManagement'
  import { rejectContract } from 'src/axios/contract/contractmanagement/contractManagement'
  import { keyBoardEnter } from "src/utils"

  import chooseFiles from 'src/pages/auditchanges/common/chooseFiles';
  import filePreview from 'src/pages/contract/contractmanagement/conmaincontract/filePreview';

  import {
    inintCALogin,
  } from 'src/assets/XTXSAB'
  import { keyLoginArr, CERT_OID_NOT_BEFORE, CERT_OID_NOT_AFTER } from 'src/assets/XTXSAB'
  import { caInit } from 'src/axios/login/calogin'
  import { VERIFY_USER_PIN } from 'src/utils/CA';

  import infoView from 'src/pages/contract/contractmanagement/conmaincontract/contractInfo';
  import changeView from 'src/pages/contract/contractmanagement/conmaincontract/changeContract';
  import productDetail from 'src/pages/contract/contractmanagement/productDetail';
  import fileUpload from 'js-file-download';
  import moment from "moment";


  export default {
    components: {
      infoView,
      changeView,
      productDetail,
      chooseFiles,
      filePreview
    },
    data () {
      return {
        activeName: 'first',  // 当前标签
        resData: this.metaData(),
        query: this.metaQuery(), // 查询初始化
        showForm: false, // 表单可见性初始化
        showQuery: false, // 表单查询初始化
        contractTypes: [],
        dataForm: this.metaForm(),
        info: undefined,
        infoViewVisible: false,
        changeViewVisible: false,
        addViewVisible: false,
        contractId: undefined,
        productDetailVisible: false,
        relievePasswordVisible: false,
        passWord: '',
        id: undefined,
        currentOrder: undefined,
        rejectPasswordVisible: false,
        dialogVisible : false,
        options:[],
        fileVisible:false,
        fileIds:[]
      }
    },
    created () {
      this.getDownList();
      this.list();
      inintCALogin(this.packUsbKeyUser);
    },
    methods: {
      moment,
      packUsbKeyUser(retObj) {
        let USB_KEY_USER=[];
        this.options=[];
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
            list: undefined
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
        queryContractList(this.resData, this.query, this.partyCode()).then(res => {
          this.resData = res.data
          if (this.resData.pageNum === 0) {
            this.resData.pageNum = 1;
          }
        })
      },
      partyCode : function() {
        let path = this.$route.path;
        return path.substr(path.length - 1, path.length);
      },
      //  查看合同产品明细
      showProductList(id){
        this.id = id;
        this.productDetailVisible = true;
        this.$nextTick(() => {
          this.$refs.productDetail.fillData(this.id, this.partyCode());
        });
      },
      //  查合同状态列表
      getDownList () {
        findContractType().then(res => {
          let header = [{label:"全部",value:""}];
          if(res.data != null && res.data.length>0){
            this.contractTypes = header.concat(res.data)
          }else{
            this.contractTypes = [];
          }
        })
      },
      //  判断合同状态图标
      getClassByState(state){
        if(state=="CONSENT"){
          return 'ico-status ico-ty'
        }else if(state=="BEING_PROCESSED"){
          return 'ico-status ico-clz'
        }else if(state=="RELIEVED"){
          return 'ico-status ico-jc'
        }else if(state=="SIGN_REJECT"){
          return 'ico-status ico-juj'
        }else if(state=="RELIEVE_REJECT"){
          return 'ico-status ico-njc'
        }
      },
      //  详情
      showInfo(contractId) {
        this.contractId = contractId;
        this.infoViewVisible = true;
        this.$nextTick(() => {
          this.$refs.infoView.fillData(contractId, 'info', this.partyCode());
        });
      },
      //  签订合同
      sign (contractId) {
        this.contractId = contractId;
        this.infoViewVisible = true;
        this.$nextTick(() => {
          this.$refs.infoView.fillData(this.contractId, 'sign', this.partyCode());
        });
      },
      //  解除合同
      relieve () {
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
            relieveContract(_this.contractId, res, this.partyCode()).then(res => {
              _this.$message({
                message: res.success == true ? res.data : res.message,
                type: res.success == true ? "success" : "error",
                onClose: () => {
                  _this.closeRelievePasswordView();
                  _this.list();
                }
              })
            })
          }).catch(err => {
            _this.closeRelievePasswordView();
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
            rejectContract(_this.contractId, res, this.partyCode()).then(res => {
              _this.$message({
                message: res.success == true ? res.data : res.message,
                type: res.success == true ? 'success' : 'error',
                onClose: () => {
                  _this.passWord = '';
                  _this.rejectPasswordVisible = false;
                  _this.list();
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
      //  密码框
      openRelievePasswordView(contractId) {
        this.contractId = contractId;
        queryTradeNum(contractId).then(res => {
          var text;
          if (!!res.data) {
            text = '当前合同的配送有' + res.data.orderCount + '条订单和' +
              res.data.returnCount + '条退货尚未完成，请务必在30天内完成，否则自动作废！';
          } else {
            text = '当前合同的配送若有订单与退货尚未完成，请务必在30天内完成，否则自动作废！';
          }
          this.$confirm(text, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.passWord = '';
            this.relievePasswordVisible = true;
          }).catch(()=>{
          });
        });
      },
      closeRelievePasswordView() {
        this.contractId = undefined;
        this.passWord = '';
        this.relievePasswordVisible = false;
      },
      //  追加产品
      addProduct(contractId) {
        this.contractId = contractId;
        this.infoViewVisible = true;
        this.$nextTick(() => {
          this.$refs.infoView.fillData(contractId, 'add', this.partyCode());
        });
      },
      //  变更产品
      changeProduct(contractId) {
        this.contractId = contractId;
        this.changeViewVisible = true;
        this.$nextTick(() => {
          this.$refs.changeView.fillData(contractId, 'change', this.partyCode());
        });
      },
      //  下载PDF
      downLoadFile (contractId) {
        downLoadPdf(contractId).then(res => {
          let headers = res.headers;
          let title = ""
          if (!title) {
            const fileName = headers['content-disposition'];
            title = fileName.includes('filename=') ? decodeURI(fileName.split('=')[1]) : '下载的文件';
          }
          fileUpload(res.data, title, "application/pdf")
        })
      },
      //  上传文件
      upload (contractId) {
        const tis = this;
        tis.contractId = contractId;
        tis.dialogVisible = true;
        this.$nextTick(() => {
          this.$refs.chooseFiles.initData(contractId);
        })
      },
      selectedData(res) {
        uploadContractFile(res).then(res => {
          this.$message({
            message: res.success ? res.data : res.message,
            type: res.success ? 'success' : 'error'
          })
        })
      },
      showFile(contractId) {
        this.contractId = contractId;
        queryContractFileIds(contractId).then(res => {
          this.fileIds = res.data;
          this.fileVisible = true;
        })
      },
      //  删除文件
      changeIdList(id) {
        deleteByFileIds(this.contractId, id).then(res => {
          this.$message({
            message: res.success ? res.data : res.message,
            type: res.success ? 'success' : 'error'
          })
        })
      },
      //  打开Log页面
      showContractLog (contractId) {
        this.$router.push({
          path : "/CONTRACT/contractmanagement/conMainContractLog/" + contractId + "/" + this.partyCode()
        });
      },
      //  拒绝密码框
      openRejectPasswordView(contractId) {
        this.contractId = contractId;
        this.passWord = '';
        this.rejectPasswordVisible = true;
      },
      closeRejectPasswordView() {
        this.passWord = '';
        this.rejectPasswordVisible = false;
      },
      //  列表排序
      sortChange(value){
        let sortType=" desc"
        if(!!value.order){
          if(value.order.startsWith("asc")){
            sortType=" asc";
          }
          this.currentOrder = value.prop + sortType;
        } else {
          this.currentOrder = undefined;
        }
        this.list();
      },
      //  撤销签订
      cancelSign (contractId) {
        cancelContractSign(contractId).then(res => {
          this.$message({
            message: res.success ? res.data : res.message,
            type: res.success ? 'success' : 'error',
            onClose: () => {
              this.list();
            }
          })
        })
      },
      //  撤回解除
      cancelRelieve (contractId) {
        cancelContractRelieve(contractId).then(res => {
          this.$message({
            message: res.success ? res.data : res.message,
            type: res.success ? 'success' : 'error',
            onClose: () => {
              this.list();
            }
          })
        })
      },
      resetForm () {
        this.query = this.metaQuery();
        this.list();
      },
      // ************************ 分页操作 ************************
      handleSizeChange (val) {
        this.resData.pageSize = val
        this.list()
      },
      handleCurrentChange (val) {
        this.resData.pageNum = val
        this.list()
      },
      searchEnterFun(e){
        this.$store.state.pageSeach.pageNum = 1;
        this.resData.pageNum = 1;
        keyBoardEnter(e , ()=>{
          this.list();
        })
      }
    }
  }
</script>
<style>
  @import "../../../../assets/css/compact.css";
</style>
