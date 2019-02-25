<template>
    <!-- ========================== 主内容start ========================= -->
    <!-- 表格 -->
    <div class="tablebox">

      <!-- 表格查询表单 -->
      <!-- 表格查询表单 -->
      <el-form ref="query" :model="query" :inline="true" class="table-form" onsubmit="return false;">
        <el-form-item>
          <el-input size="small" v-model="query.mechanismName" :maxlength="200" placeholder="机构名称" @keyup.enter.native="searchEnterFun"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="success" size="small" @click="searchEnterFun">查询</el-button>
          <el-button type="warning" size="small" @click="resetForm()">重置</el-button>
        </el-form-item>
      </el-form>


      <!-- 表格列表 -->
      <div class="tableset">
        <el-table
          :data="resData.list"
          border
          stripe
          style="width: 100%;"
          @sort-change="sortChange">
          <el-table-column label="单位名称" prop="MECHANISMNAME" sortable="custom">
            <template slot-scope="scope">
              <span>{{ scope.row.mechanismName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="两票制" prop="COU" sortable="custom" width="180" align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.cou == 0" class="red">未签订</span>
              <span v-if="scope.row.cou == 1">已签订</span>
            </template>
          </el-table-column>
          <el-table-column label="签订时间" prop="SIGNEDDATE" sortable="custom" width="200" align="center">
            <template slot-scope="scope">
              <el-tooltip :enterable="false" class="item" effect="dark" placement="top-start">
                <div slot="content">{{ scope.row.signedDate }}</div>
                <span v-if="scope.row.signedDate!=null && scope.row.signedDate!=''">{{ moment(scope.row.signedDate).format("YYYY-MM-DD") }}</span>
                <span v-else></span>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="180">
            <template slot-scope="scope">
              <div class="operates">
                <a @click="showCommitment(scope.row.cou,scope.row.id,scope.row.orgType)">{{scope.row.cou>0?"查看承诺书":"签订承诺书"}}</a>
              </div>
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
          :total="resData.total"
          :page-size="resData.pageSize"
          :page-count="resData.pages"
          :current-page.sync="resData.pageNum">
        </el-pagination>
      </div>



      <!--  ====================================== 弹窗 ====================================== -->

      <el-dialog title="承诺书" top="2vh" :visible.sync="showCommitmentState" :before-close="closeForm" width="50%">
        <el-form :inline="true" ref="insertForm" :model="insertForm" class="demo-form-inline">
          <span v-html="this.templateContent"></span>
          <div>
            <p class="pcssd" align="right" v-if="this.orgType=='4'">
              医疗机构名称：<img :src="this.insertForm.stampImage" />
            </p>
            <p class="pcssd" align="right" v-if="this.orgType!='4'">
              公司名称：<img :src="this.insertForm.stampImage" />
            </p>
            <p class="pcssd" align="right">承诺时间：{{ moment(this.insertForm.signedDate).format("YYYY-MM-DD") }}</p>
          </div>
        </el-form>
        <span slot="footer">
          <el-button type="primary" v-if="isCommitment==false" @click="openSignPasswordView()">{{ isCommitment ? "已签订" : "签订" }}</el-button>
          <el-button @click="showCommitmentState = false">关闭</el-button>
        </span>
      </el-dialog>

      <el-dialog title="请输入密码完成签订" :visible.sync="signPasswordVisible" width="30%">
        <el-form label-width="90px" class="demo-ruleForm">
          <el-input type="password" v-model="passWord" size="small"></el-input>
        </el-form>
        <span slot="footer" class="dialog-footer">
        <el-button @click="closeSignPasswordView()">关闭</el-button>
        <el-button type="primary" @click="signed()">确定</el-button>
      </span>
      </el-dialog>
    </div>
</template>
<script>

  // 引入用户相关请求
  import {queryUnselectedProductList,insertSigned,findCommitmentSignedById} from 'src/axios/contract/twovotemanagement/commitmentSignedType';
  import {
    inintCALogin,
  } from 'src/assets/XTXSAB'
  import { keyLoginArr, CERT_OID_NOT_BEFORE, CERT_OID_NOT_AFTER } from 'src/assets/XTXSAB'
  import { caInit } from 'src/axios/login/calogin'
  import { VERIFY_USER_PIN } from 'src/utils/CA';
  import moment from "moment";
  import { keyBoardEnter } from "src/utils"

  export default {
    data () {
      return {
        templateContent : undefined,
        currentOrder: undefined,
        finalSignedData:'',
        resData: this.metaData(),
        query: this.metaQuery(), // 查询初始化
        showCommitmentState:false,//承诺书弹出框状态
        isCommitment:false,//是否签订了承诺书
        id:"",//机构ID
        insertForm :this.formData(),
        dataForm: this.metaForm(),
        orgType : "",
        signPasswordVisible : false,
        passWord : '',
        options:[]
      }
    },
    created () {
      this.list();
      inintCALogin(this.packUsbKeyUser);
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
      // -------------------------------------------- 数据初始化  -----------------------------------------
      moment,
      metaData () {
        return {
          orderBy: undefined,
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
          list: []
        }
      },
      formData(){
        return {
          query: {
            orgId: undefined,
            signedDate :undefined
          },
          password: undefined,
          userKey: undefined,
          strRandom: '',
          userSignedData: '',
          userCert: '',
          containerName: '',
          imgUrl: '',
          stampImage:undefined
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
          query: {
            mechanismName: undefined,
          }
        }
      },
      // ------------------------------------------------- 处理方法 ----------------------------------------

      //  获取用户分页列表
      list () {
        this.resData.orderBy = this.currentOrder;
        queryUnselectedProductList(this.resData, this.query).then(res => {
          this.resData = res.data
          if(this.resData.pageNum === 0){
            this.resData.pageNum =1;
          }
        })
      },
      //签订框弹出
      showCommitment(cou,id,orgType){
        this.orgType = orgType;
        this.id = id;
        if(cou>0){
          //当前弹框是否已经签订
          this.isCommitment = true;
          this.findCommitmentSigned(orgType);
        }else{
          this.isCommitment = false;
          this.showCommitmentState = true;
        }
      },
      findCommitmentSigned(orgType){
        findCommitmentSignedById("",orgType).then(res => {
          this.templateContent = res.data.content;
          this.insertForm.signedDate = res.data.signedDate;
          this.insertForm.stampImage = res.data.stampImage;
          this.showCommitmentState = true;
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
      //  点击签订
      signed () {
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
            insertSigned(res).then(res => {
              _this.$message({
                message: res.success == true ? res.data : res.message,
                type: res.success == true ? 'success' : 'error',
                onClose: () => {
                  _this.showCommitmentState = false;
                  _this.closeSignPasswordView();
                  _this.list();
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
      resetForm () {
        this.query = this.metaQuery();
        this.list();
      },
      closeForm () {
        this.showCommitmentState=!this.showCommitmentState;
      },
      //分页 ************************
      handleSizeChange (val) {
        this.resData.pageSize = val;
        this.list();
      },
      handleCurrentChange (val) {
        this.resData.pageNum = val;
        this.list();
      },
      sortChange(value){
        let sortType=" desc"
        if(!!value.order){
          if(value.order.startsWith("asc")){
            sortType=" asc";
          }
          this.currentOrder=value.prop + sortType;
        } else {
          this.currentOrder=undefined;
        }
        this.list();
      },
      searchEnterFun(e){
        this.$store.state.pageSeach.pageNum = 1;
        this.resData.pageNum = 1;
        keyBoardEnter(e , ()=>{
          this.list();
        })
      },
    }
  }
</script>
<style>
  .divcss5{
    text-indent:35px;
    margin-right:20px;
    margin-left:20px;
  }
  .pcssd{
    padding-right:20px;
  }
</style>

