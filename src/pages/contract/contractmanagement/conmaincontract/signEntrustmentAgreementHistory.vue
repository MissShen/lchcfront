<template>
    <!-- ========================== 主内容start ========================= -->

    <!-- 表格 -->
    <div class="tablebox">
      <!-- 表格查询表单 -->
        <el-form ref="query" :model="query" size="small" :inline="true" class="table-form">
            <!--<el-form-item>
              <el-input v-model="query.conNo" :maxlength="40" size="small" placeholder="协议编号" @keyup.enter.native="searchEnterFun"></el-input>
            </el-form-item>-->
            <el-form-item>
              <el-input v-model="query.organizationName" :maxlength="200" size="small" placeholder="机构名称" @keyup.enter.native="searchEnterFun"></el-input>
            </el-form-item>
            <!--<el-form-item>
              <el-input v-model="query.yiName" :maxlength="200" size="small" placeholder="乙方" @keyup.enter.native="searchEnterFun"></el-input>
            </el-form-item>-->
            <el-form-item>
              <el-select v-model="query.conStateName" size="small" placeholder="合同状态">
                <el-option-group
                  key="合同状态"
                  label="合同状态">
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
          stripe
          @sort-change="sortChange">
          <el-table-column label="协议编号" prop="CON_NO" sortable="custom" width="200">
            <template slot-scope="scope">
              <span>{{ scope.row.conNo }}</span>
            </template>
          </el-table-column>
          <el-table-column label="甲方" prop="JIA_NAME" sortable="custom" min-width="150">
            <template slot-scope="scope">
              <span>{{ scope.row.jiaName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="乙方" prop="YI_NAME" sortable="custom" min-width="150">
            <template slot-scope="scope">
              <span>{{ scope.row.yiName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="甲方状态" prop="JIA_STATE" sortable="custom" width="100" align="center">
            <template slot-scope="scope">
              <i :class="getClassByState(scope.row.jiaStateIcon)" :title="scope.row.jiaStateName"></i>
            </template>
          </el-table-column>
          <el-table-column label="乙方状态" prop="YI_STATE" sortable="custom" width="100" align="center">
            <template slot-scope="scope">
              <i :class="getClassByState(scope.row.yiStateIcon)" :title="scope.row.yiStateName"></i>
            </template>
          </el-table-column>
          <el-table-column label="合同签订时间" prop="JIA_SIGN_DATE, YI_SIGN_DATE" sortable="custom" width="120" align="center">
            <template slot-scope="scope">
              <el-tooltip :enterable="false" class="item" effect="dark" placement="top">
                <div slot="content">{{scope.row.contractSignDate}}</div>
                <span>{{ scope.row.contractSignDate == null ?  '' : moment(scope.row.contractSignDate).format("YYYY-MM-DD") }}</span>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column label="合同状态" prop="CON_STATE" sortable="custom" width="100" align="center">
            <template slot-scope="scope">
              <i :class="getClassByState(scope.row.conStateIcon)" :title="scope.row.conStateName"></i>
            </template>
          </el-table-column>
          <el-table-column label="合同失效时间" prop="END_DATE" sortable="custom" width="120" align="center">
            <template slot-scope="scope">
              <el-tooltip :enterable="false" class="item" effect="dark" placement="top">
                <div slot="content">{{scope.row.endDate}}</div>
                <span>{{ scope.row.endDate == null ?  '' : moment(scope.row.endDate).format("YYYY-MM-DD") }}</span>
              </el-tooltip>
            </template>
          </el-table-column>
          <!--<el-table-column label="操作" width="120">
            <template slot-scope="scope">
              <div class="operates">
                <a href="javaScript:;" type="text" size="small" @click="restart(scope.row.id)">重新发起</a>
              </div>
            </template>
          </el-table-column>-->
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
          :current-page.sync="resData.pageNum">
        </el-pagination>
      </div>

    </div>
    <!-- ========================== 主内容end ========================= -->

</template>
<script>

  // 引入用户相关请求  引自js文件
  import {queryContractHistoryList, restartContract} from 'src/axios/contract/contractmanagement/signEntrustmentAgreement'
  import { keyBoardEnter } from "src/utils"
  import moment from "moment";

  export default {
    data () {
      return {
        currentOrder: undefined,
        activeName: 'first',  // 当前标签
        resData: this.metaData(),
        query: this.metaQuery(), // 查询初始化
        showForm: false, // 表单可见性初始化
        showQuery: false, // 表单查询初始化
        contractTypes: this.contractTypesArr(),
        dataForm: this.metaForm(),
        info: undefined,
        infoViewVisible: false,
        addViewVisible: false,
        contractId: undefined,
        productDetailVisible: false,
        relievePasswordVisible: false,
        passWord: '',
        id: undefined
      }
    },
    created () {
      this.list();
    },
    methods: {
      moment,
      // -------------------------------------------- 数据初始化  -----------------------------------------
      metaData () {
        return {
            orderBy: undefined,
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
          /*conNo: undefined,
          jiaName: undefined,
          yiName:undefined,*/
          organizationName: undefined,
          conStateName: undefined
        }
      },
      contractTypesArr(){
        return [
          {
            label : '全部',
            value : ''
          },
          {
            label : '交易完成',
            value : '70'
          },{
            label : '解除',
            value : '80'
          },{
            label : '无效',
            value : '90'
          }
        ]
      },
      // ------------------------------------------------- 处理方法 ----------------------------------------
      //  获取用户分页列表
      list () {
        this.resData.orderBy = this.currentOrder;
        queryContractHistoryList(this.resData, this.query, this.partyCode()).then(res => {
          this.resData = res.data
          if(this.resData.pageNum === 0){
            this.resData.pageNum = 1;
          }
        })
      },
      partyCode : function() {
        let path = this.$route.path;
        return path.substr(path.length - 1, path.length);
      },
      //  重新发起合同
      restart (contractId) {
        this.$confirm('确定重新发起该合同？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          restartContract(contractId).then(res => {
            this.$message({
              message: res.data,
              type: 'success',
              onClose: () => {
                this.list();
              }
            })
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
    }
  }
</script>
<style>
  @import "../../../../assets/css/compact.css";
</style>
