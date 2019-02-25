<template>
  <div>
    <!-- ========================== 主内容start ========================= -->

    <!-- 表格 -->
    <div class="tablebox">
      <!-- 表格查询表单 -->
        <el-form ref="query" :model="query" size="small" :inline="true" class="table-form">
            <el-form-item>
              <el-input v-model="query.orgName" size="small" placeholder="机构名称" @keyup.enter.native="searchEnterFun"></el-input>
            </el-form-item>
            <el-form-item>
              <el-select v-model="query.conState" size="small" placeholder="全部">
                <el-option
                  v-for="item in contractTypes"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="success" size="small" @click="searchEnterFun">查询</el-button>
              <el-button type="warning" @click="resetForm()" size="small">重置</el-button>
            </el-form-item>
        </el-form>

      <!-- 表格列表 -->
      <!--:default-sort="{prop: 'jiaName',prop:'yiName',prop:'productNum',prop:'changeNum'}"
-->
      <div class="tableset">
        <el-table
          :data="resData.list"
          border
          @sort-change="sortChange"
          stripe>
          <el-table-column label="甲方" prop="jiaName" sortable min-width="180">
            <template slot-scope="scope">
              <span>{{ scope.row.jiaName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="乙方" prop="yiName" sortable min-width="180">
            <template slot-scope="scope">
              <span>{{ scope.row.yiName }}</span>
            </template>
          </el-table-column>
          <!--<el-table-column label="产品数量" prop="productNum" sortable align="right" header-align="left" width="100" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <el-tooltip content="点击查看产品明细" placement="top" :enterable="false">
                <a @click="showProductDetail(scope.row.id)">{{ scope.row.productNum != null ? scope.row.productNum : 0 }}</a>
              </el-tooltip>
            </template>
          </el-table-column>-->
          <!--<el-table-column label="变更次数" prop="changeNum" sortable align="right" header-align="left" width="100" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span>{{ scope.row.changeNum != null ? scope.row.changeNum : 0 }}</span>
            </template>
          </el-table-column>-->
          <el-table-column label="甲方状态" prop="jiaState" sortable align="center" width="90">
            <template slot-scope="scope">
              <i :class="getClassByState(scope.row.jiaStateIcon)" :title="scope.row.jiaStateName"></i>
            </template>
          </el-table-column>
          <el-table-column label="乙方状态" prop="yiState" sortable align="center" width="90">
            <template slot-scope="scope">
              <i :class="getClassByState(scope.row.yiStateIcon)" :title="scope.row.yiStateName"></i>
            </template>
          </el-table-column>
          <el-table-column label="合同签订时间" align="center" width="90">
            <template slot-scope="scope">
              <span :title="scope.row.contractSignDate">{{ scope.row.contractSignDate == null ?  '' : moment(scope.row.contractSignDate).format("YYYY-MM-DD") }}</span>
            </template>
          </el-table-column>
          <el-table-column label="合同状态" prop="conState" sortable align="center" width="90">
            <template slot-scope="scope">
              <i :class="getClassByState(scope.row.conStateIcon)" :title="scope.row.conStateName"></i>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="220">
              <template slot-scope="scope">
                <div class="operates w100">
                  <span class="btn-word-2" >
                    <a v-if="scope.row.canSigned" class="blue-bord" type="text" size="small" @click="sign(scope.row.id)">签订</a>
                    <a v-if="scope.row.relieving" class="blue-bord"  type="text" size="small" @click="openRelievePasswordView(scope.row.id)">同意</a>
                  </span>
                  <span class="btn-word-2" >
                    <a v-if="scope.row.canRelieve" class="red-bord" type="text" size="small" @click="openRelievePasswordView(scope.row.id)">解除</a>
                    <a v-if="scope.row.relieving" class="red-bord" type="text" size="small" @click="openRejectPasswordView(scope.row.id)">拒绝</a>
                    <a v-if="scope.row.canCancelSign" class="red-bord" type="text" size="small" @click="cancelSign(scope.row.id)">撤销</a>
                    <a v-if="scope.row.canCancelRelieve" class="red-bord" type="text" size="small" @click="cancelRelieve(scope.row.id)">撤回</a>
                  </span>
                  <span>
                    <a type="text" size="small" @click="showInfo(scope.row.id)">合同</a>
                  </span>
                  <span>
                    <a v-if="scope.row.contractFile" type="text" size="small" @click="downLoadFile(scope.row.id)">下载</a>
                  </span>
                  <span>
                    <a class="green" @click="openSelectedPage(scope.row.jiaId,scope.row.yiId)">产品</a>
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

    <info-main-view v-if="infoMainViewVisible" :parent-id="this.contractId" ref="infoMainView" @refreshParent="list"></info-main-view>

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

    <!--  ====================================== 弹窗 ====================================== -->
    <el-dialog title="合同产品" top="2vh" :visible.sync="showSelectedForm" width="80%">
      <el-form ref="selectedQuery" :model="selectedQuery" :inline="true" class="table-form" size="small">
        <el-form-item>
          <el-input v-model="selectedQuery.productName"
                    maxlength="200" placeholder="品名" size="small" @keyup.enter.native="searchEnterFunView"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="selectedQuery.manufactureName"
                    maxlength="200" placeholder="生产企业名称" size="small" @keyup.enter.native="searchEnterFunView"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="success" @click="searchEnterFunView" size="small">查询</el-button>
          <el-button type="warning" @click="resetSelectedForm()" size="small">重置</el-button>
        </el-form-item>
      </el-form>
      <el-table
        :data="selectedData.list"
        border
        stripe
        @sort-change="sortChangeAlert">
        <!--<el-table-column
          type="selection"
          width="55">
        </el-table-column>-->
        <el-table-column label="通用名" prop="NAME_CHN" sortable="custom" :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span>{{ scope.row.nameChn }}</span>
          </template>
        </el-table-column>
        <el-table-column label="产品名" prop="PRODUCT_NAME" sortable="custom" :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span>{{ scope.row.productName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="商品名" prop="TRADE_NAME" sortable="custom" :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span>{{ scope.row.tradeName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="剂型" prop="DOSEAGE_FORM_NAME" sortable="custom" width="80" :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span>{{ scope.row.doseageFormName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="规格" prop="SPEC" sortable="custom" width="80" :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span>{{ scope.row.spec }}</span>
          </template>
        </el-table-column>
        <el-table-column label="转换比" prop="STAND_RATE" sortable="custom" width="80" :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span>{{ scope.row.standRate }}</span>
          </template>
        </el-table-column>
        <el-table-column label="单位" prop="SPEC_UNIT" sortable="custom" width="80" :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span>{{ scope.row.specUnit }}</span>
          </template>
        </el-table-column>
        <el-table-column label="包材" prop="WRAP_NAME" sortable="custom" width="60" :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span>{{ scope.row.wrapName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="生产企业" prop="MANUFACTURE_NAME" sortable="custom" :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span>{{ scope.row.manufactureName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="两票制" prop="twoVoteId" sortable="custom" width="150">
          <template slot-scope="scope">
            <span v-if="scope.row.twoVoteId != null">已签订</span>
            <span v-else class="red">未签订</span>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagebox">
        <el-pagination
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange2"
          @current-change="handleCurrentChange2"
          :page-sizes="[10, 20, 30]"
          :total="selectedData.total"
          :page-size="selectedData.pageSize"
          :page-count="selectedData.pages"
          :current-page.sync="selectedData.pageNum">
        </el-pagination>
      </div>
      <span slot="footer">
        <el-button @click="showSelectedForm = false" size="small" class="el-button-pale">关闭</el-button>
      </span>
    </el-dialog>

  </div>

</template>
<script>

  // 引入用户相关请求  引自js文件
  import {queryContractList, findContractType, rejectContract, relieveContract, downLoadZip} from 'src/axios/contract/contractmanagement/contractManagement';
  import {queryTradeNum, cancelContractSign, cancelContractRelieve} from 'src/axios/contract/contractmanagement/signEntrustmentAgreement'

  import { keyBoardEnter } from "src/utils"
  import {
    inintCALogin,
  } from 'src/assets/XTXSAB'
  import { CERT_OID_NOT_BEFORE, CERT_OID_NOT_AFTER } from 'src/assets/XTXSAB'
  import { caInit } from 'src/axios/login/calogin'
  import { VERIFY_USER_PIN } from 'src/utils/CA';

  import infoMainView from 'src/pages/contract/contractmanagement/contractInfoMain';
  import productDetail from 'src/pages/contract/contractmanagement/productDetail';
  import fileUpload from 'js-file-download'
  import moment from "moment";

  import {querySelectedProductList} from 'src/axios/contract/sender/hospitalSelectSender';

  export default {
    components: {
      infoMainView,
      productDetail
    },
    data () {
      return {
        activeName: 'first',  // 当前标签
        resData: this.metaData(),
        query: this.metaQuery(), // 查询初始化
        showForm: false, // 表单可见性初始化
        showQuery: false, // 表单查询初始化
        contractTypes : [],
        dataForm: this.metaForm(),
        infoMainViewVisible: false,
        productDetailVisible: false,
        relievePasswordVisible: false,
        contractId: undefined,
        id: undefined,
        passWord: '',
        currentOrder: undefined,
        // contractId: undefined
        rejectPasswordVisible: false,
        options: [],
        senderId: undefined,
        hospitalId: undefined,
        showSelectedForm:false,
        selectedData: this.metaSelectedData(),
        selectedQuery: this.metaSelectedQuery(),
        relieveSendId: undefined
      }
    },
    created () {
      this.relieveSendId = this.$route.params.sendId;
      console.log("relieveSendId: ", this.relieveSendId);
      inintCALogin(this.packUsbKeyUser);
      this.getDownList();
      this.list()
    },
    methods: {
      moment,
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
            list: undefined,
        }
      },
      metaSelectedForm() {
        return {
          productName: '',
          manufactureName: ''
        }
      },
      metaQuery () { // 表单查询数据初始化
        return {
            conState: undefined,
            orgName: undefined
        }
      },
      metaSelectedQuery() {
        return {
          productName: undefined,
          manufactureName: undefined
        }
      },
      searchEnterFunView(e){
        this.$store.state.pageSeach.pageNum = 1;
        this.resData.pageNum = 1;
        keyBoardEnter(e , ()=>{
          this.selectedList();
        })
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
      metaSelectedData() {
        return {
          orderBy:undefined,
          pageNum: 1,
          pageSize: 10,
          size: 10,
          startRow: 0,
          endRow: 0,
          total: 0,
          pages: 0,
          prePage: 0,
          nextPage: 0,
          isFirstPage: false,
          isLastPage: true,
          hasPreviousPage: false,
          hasNextPage: false,
          navigatePages: 8,
          navigatepageNums: [],
          navigateFirstPage: 0,
          navigateLastPage: 0,
          firstPage: 0,
          lastPage: 0,
          selectedList: [],
          relieveSendId: undefined
        }
      },
      // ------------------------------------------------- 处理方法 ----------------------------------------
      //  获取用户分页列表
      list () {
        queryContractList(this.resData, this.query, this.relieveSendId).then(res => {
          console.log(res);
          this.resData = res.data
          if (this.resData.pageNum === 0) {
            this.resData.pageNum = 1;
          }
        })
      },
      //查询重置方法
      resetForm(){
        this.query = this.metaQuery();
        this.list();
      },
      //查看产品明细
      showProductDetail(id){
        this.id = id;
        this.productDetailVisible = true;
        this.$nextTick(() => {
          this.$refs.productDetail.fillData(this.id);
        });
      },
      //  查合同状态列表
      getDownList () {
        findContractType().then(res => {
          console.log(res);
          this.contractTypes = res.data
        })
      },
      //  签订合同
      sign (contractId) {
        this.contractId = contractId;
        this.infoMainViewVisible = true;
        this.$nextTick(() => {
          this.$refs.infoMainView.fillData(this.contractId, 'sign');
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
            relieveContract(_this.contractId, res).then(res => {
              console.log(res);
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
                  _this.rejectPasswordVisible = false;
                  _this.list();
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
      openRelievePasswordView(contractId) {
        queryTradeNum(contractId).then(res => {
          console.log(res.data);
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
            this.contractId = contractId;
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
      //  详情
      showInfo(contractId) {
        this.contractId = contractId;
        console.log('contractId: ', this.contractId);
        this.infoMainViewVisible = true;
        this.$nextTick(() => {
          this.$refs.infoMainView.fillData(this.contractId, 'info');
        });
      },
      //  下载PDF
      downLoadFile (contractId) {
        downLoadZip(contractId).then(res => {
          let headers = res.headers;
          let title = ""
          if (!title) {
            console.info("title",title)
            const fileName = headers['content-disposition'];
            console.info("fileName " , fileName)
            console.info(fileName)
            title = fileName.includes('filename=') ? decodeURI(fileName.split('=')[1]) : '下载的文件';
          }
          fileUpload(res.data, title, "application/zip")
        })
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
        if (!!value.order) {
          if(value.order.startsWith("asc")){
            sortType = " asc";
          }
          this.currentOrder = value.prop + sortType;
        } else {
          this.currentOrder = undefined;
        }
        this.list();
      },
      //  撤销签订
      cancelSign(contractId) {
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
      cancelRelieve(contractId) {
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
      // 打开已选产品页面
      openSelectedPage(hospitalId,senderId) {
        this.hospitalId = hospitalId;// 传递Id
        this.senderId = senderId;// 传递Id
        this.resetSelectedForm();// 重置已选窗口内的查询表单
        this.showSelectedForm = true;// 打开已选窗口
      },
      selectedList() {
        this.selectedData.orderBy = this.currentOrder;
        querySelectedProductList(this.selectedData, this.selectedQuery, this.hospitalId, this.senderId).then(res => {
          this.selectedData = res.data;
          if (this.selectedData.pageNum === 0) {
            this.selectedData.pageNum = 1;
          }
        });
      },
      // ************************ 分页操作 ************************
      handleSizeChange (val) {
        this.resData.pageSize = val
        this.list()
      },
      resetSelectedForm() {
        this.selectedQuery = this.metaSelectedForm();
        this.selectedList();
      },
      handleSizeChange2(val) {
        this.selectedData.pageSize = val
        this.selectedList()
      },
      handleCurrentChange2(val) {
        this.selectedData.pageNum = val
        this.selectedList()
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
      },
      sortChangeAlert(value){
        let sortType=" desc"
        if(!!value.order){
          if(value.order.startsWith("asc")){
            sortType=" asc";
          }
          this.currentOrder=value.prop + sortType;
        } else {
          this.currentOrder=undefined;
        }
        this.selectedList();
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
      }
      //按钮样式自适应
//      spHide1(canSigned,relieving){
//        if(canSigned == false && relieving == false){
//          return false;
//        }else{
//          return true;
//        }
//      },
//      spHide2(canRelieve,relieving,canCancelSign,canCancelRelieve){
//        if(canRelieve == false && relieving == false && canCancelSign == false && canCancelRelieve == false){
//          return false;
//        }else{
//          return true;
//        }
//      },
//      spHide3(contractFile){
//        if(contractFile == false){
//          return false;
//        }else{
//          return true;
//        }
//      }
    }
  }
</script>
<style>
  @import "../../../assets/css/compact.css";
</style>
