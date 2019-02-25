<template>
  <!-- 表格 -->
  <div class="tablebox">

    <!-- 表格查询表单 -->
      <el-form ref="query" :model="query" label-position="right" size="small" :inline="true"class="table-form">
                <el-form-item>
                  <el-input v-model="query.PRODUCT" @keyup.enter.native="searchEnterFun" placeholder="产品名称" size="small"></el-input>
                </el-form-item>
          <el-form-item>
                  <el-input v-model="query.DOSAGE" @keyup.enter.native="searchEnterFun" placeholder="剂型" size="small"></el-input>
                </el-form-item>
          <el-form-item>
                  <el-input v-model="query.SPEC" @keyup.enter.native="searchEnterFun" placeholder="规格" size="small"></el-input>
                </el-form-item>
          <el-form-item>
                  <el-input v-model="query.MANUFACTURE" @keyup.enter.native="searchEnterFun" placeholder="生产企业" size="small"></el-input>
                </el-form-item>
          <el-form-item>
                  <el-button type="success" @click="searchEnterFun" size="small">查询</el-button>
                  <el-button type="warning" @click="restQuery" size="small">重置</el-button>
          </el-form-item>
      </el-form>

    <!-- 表格列表 -->
    <div class="tableset">
      <el-table
        :data="resData.list"
        border
        stripe
        @selection-change="handleSelectionChange">

       <!-- <el-table-column label="产品名称">
          <template slot-scope="scope">
            <div>
              <div class="text-inline">{{scope.row.PRODUCT}}</div>
              <div class="text-inline">{{scope.row.MIXDOSAGE}}</div>
            </div>
            <span></span>
          </template>
        </el-table-column>
        <el-table-column label="产品信息">
          <template slot-scope="scope">
            <div class="pro-details">
              <div class="text-inline">{{scope.row.COMBINED}}&nbsp;&nbsp;{{scope.row.WRAP}}</div>
              <div class="text-inline">{{scope.row.ABBR}}</div>
            </div>
            <span></span>
          </template>
        </el-table-column>-->

        <el-table-column label="产品名称" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.PRODUCT }}</span>
          </template>
        </el-table-column>
        <el-table-column label="商品名" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.TRADE }}</span>
          </template>
        </el-table-column>
        <el-table-column label="剂型" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.DOSAGE }}</span>
          </template>
        </el-table-column>
        <el-table-column label="规格" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.SPEC }}</span>
          </template>
        </el-table-column>
        <el-table-column label="转换比" width="80px" header-align="left" align="right">
          <template slot-scope="scope">
            <span>{{ scope.row.STANDRATE }}</span>
          </template>
        </el-table-column>
        <el-table-column label="单位" width="60px">
          <template slot-scope="scope">
            <span>{{ scope.row.METRIC }}</span>
          </template>
        </el-table-column>
        <el-table-column label="包材" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.WRAP }}</span>
          </template>
        </el-table-column>
        <el-table-column label="生产企业" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.MANUFACTURE }}</span>
          </template>
        </el-table-column>

        <el-table-column label="操作" width="80px">
          <template slot-scope="scope">
            <div class="operates">
              <span>
                <a class="operation-btn" @click="handleGoReport(scope.row.ID)">举报</a>
              </span>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="foot-btn">
      <div class="foot-left">
        <el-button size="small" @click="goBack">
          返回
        </el-button>
      </div>
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
    <Query ref="Query"></Query>
  </div>
</template>
<script>
  import {queryList} from 'src/axios/auditchanges/messageReportManager/messageReport/productReport'
  import {keyBoardEnter} from "src/utils";
  import Query from "./Query";
  export default {
    components:{
      Query
    },
    data () {
      return {
        resData: this.metaData(),
        visible: false,
        form: this.metaForm(), // 表单初始化
        query: this.metaQuery(), // 查询初始化
        showForm: false, // 表单可见性初始化
        showQuery: false, // 表单查询初始化
        defaultProps: {
          children: 'children',
          label: 'name',
          id: 'id'
        },stateList:[{
          key:"1",
          label: "全部",
          value: "", /*值*/
        },{
          key:"2",
          label: "提交",
          value: "0", /*值*/
        },{
          key:"3",
          label: "授理",
          value: "1", /*值*/
        },{
          key:"4",
          label: "已澄清",
          value: "2", /*值*/
        },{
          key:"5",
          label: "拒绝",
          value: "3", /*值*/
        },{
          key:"6",
          label: "审核",
          value: "4", /*值*/
        }]
      }
    },
    created () {
      this.resData.pageSize = 10;
      this.list()
    },
    methods: {
      // -------------------------------------------- 数据初始化  -----------------------------------------
      metaData () {
        return {

            pageNum: 0,
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
      metaForm () { // 表单数据初始化
        return {
        }
      },
      metaQuery () { // 表单查询数据初始化
        return {
          query: {
            projectId: undefined,
            categoryName: undefined,
            STATE:'',
          }
        }
      },
      // ------------------------------------------------- 处理方法 ----------------------------------------
      toggleQuery () {
        this.showQuery = !this.showQuery
      },
      toggleForm () {
        this.showForm = !this.showForm
      },
      closeForm () {
        this.$refs['form'].resetFields()
        this.toggleForm()
      },
      //  获取用户分页列表
      searchEnterFun(e){
        this.resData.pageNum=1;
        keyBoardEnter(e, () => {
          this.list();
        })
      },
      list () {
        queryList(this.resData, this.query).then(res => {
          this.resData = res.data
        })
      },
      goBack() {
        this.$router.go(-1);
      },
      // 重置用户表单
      resetForm () {
        /*  this.$refs['form'].resetFields()*/
        this.form = this.metaForm()
      },
      handleGoReport(id){
        this.$nextTick(() => {
          this.$refs.Query.fillData(id)
        })
      },
      // ************************
      handleSizeChange (val) {
        this.resData.pageSize = val
        this.list()
      },
      handleSelectionChange(val){
        //val 所选对象
      },
      handleQuery(){
        this.list()
      },
      restQuery(){//重置
        this.query=this.metaQuery();
        this.list();
      },
      handleCurrentChange (val) {
        this.resData.pageNum = val
        this.list()
      }
    }
  }
</script>

<!--<style>
  .el-dialog {
    width: 80% !important;
  }
</style>-->
