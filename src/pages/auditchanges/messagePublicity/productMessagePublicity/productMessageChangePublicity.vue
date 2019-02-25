<template>
  <!-- 表格 -->
  <div class="tab-box">
    <!--<div class="tabs-panel">
      <router-link to="/AUDIT/messagePublicity/productMessageDeclarePublicity">产品信息申报公示</router-link>
      <span class="active">产品信息变更公示</span>
    </div>-->

    <el-tabs v-model="activeName" @tab-click="toDeclare">
      <el-tab-pane label="产品信息申报公示" name="first" />
      <el-tab-pane label="产品信息变更公示" name="second" />
    </el-tabs>

    <div class="el-tabs__content">
      <div class="tablebox">

    <!-- 表格查询表单 -->
      <el-form ref="query" :model="query" label-position="right" size="small" :inline="true" class="table-form">
          <el-form-item>
              <el-input v-model="query.PRODUCT" placeholder="产品名称" @keyup.enter.native="searchEnterFun" size="small"></el-input>
          </el-form-item>
          <el-form-item>
              <el-input v-model="query.DOSAGE" placeholder="剂型" @keyup.enter.native="searchEnterFun" size="small"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="query.SPEC" placeholder="规格" @keyup.enter.native="searchEnterFun" size="small"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="query.MANUFACTURE" placeholder="生产企业" @keyup.enter.native="searchEnterFun" size="small"></el-input>
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

        <el-table-column label="申报号" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{scope.row.UPPRODUCTID}}</span>
          </template>
        </el-table-column>
       <!-- <el-table-column label="产品名称">
          <template slot-scope="scope">
            <div>
              <div class="text-inline">{{scope.row.PRODUCT}}</div>
              <div class="text-inline">{{scope.row.MIXDOSAGE}}</div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="产品信息">
          <template slot-scope="scope">
            <div class="pro-details">
              <div class="text-inline">{{scope.row.COMBINED}}&nbsp;&nbsp;{{scope.row.WRAP}}</div>
              <div class="text-inline">{{scope.row.ABBR}}</div>
            </div>
          </template>
        </el-table-column>
        -->

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
        <el-table-column label="剂型" width="130px" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.DOSAGE }}</span>
          </template>
        </el-table-column>
        <el-table-column label="规格" width="120px" show-overflow-tooltip>
          <template slot-scope="scope">
              <span>{{scope.row.SPEC}}</span>
          </template>
        </el-table-column>
        <el-table-column label="转换比" width="60px" header-align="left" align="right">
          <template slot-scope="scope">
            <span>{{ scope.row.STANDRATE }}</span>
          </template>
        </el-table-column>
        <el-table-column label="单位" width="50px">
          <template slot-scope="scope">
            <span>{{ scope.row.METRIC }}</span>
          </template>
        </el-table-column>
        <el-table-column label="包材" width="50px" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.WRAP }}</span>
          </template>
        </el-table-column>
        <el-table-column label="生产企业" show-overflow-tooltip>
          <template slot-scope="scope">
              <span>{{scope.row.MANUFACTURE}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="140px">
          <template slot-scope="scope">
            <div class="operates">
              <span v-if="scope.row.STATE == '3' && scope.row.QUERYFLAG == '0'">
                <a class="operation-btn" @click="handleGoQuery(scope.row.PRODUCTID,scope.row.UPPRODUCTID)">质疑</a>
              </span>
              <span>
                <a class="operation-btn" @click="handleGoView(scope.row.PRODUCTID,scope.row.UPPRODUCTID)">详情</a>
              </span>
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
    <change-find-view ref="changeFindView"></change-find-view>
    <change-query ref="changeQuery"></change-query>
  </div>
    </div>
  </div>
</template>
<script>
  import {queryListChange} from 'src/axios/auditchanges/messagePublicity/productPublicity'
  import {keyBoardEnter} from "src/utils";
  import changeQuery from './changeQuery'
  import changeFindView from "./changeFindView";
  export default {
    components:{
      changeQuery,
      changeFindView
    },
    data () {
      return {
        resData: this.metaData(),
        form: this.metaForm(), // 表单初始化
        activeName: 'second',//标签页默认选中第一个
        query: this.metaQuery(), // 查询初始化
        showForm: false, // 表单可见性初始化
        showQuery: false, // 表单查询初始化
        defaultProps: {
          children: 'children',
          label: 'name',
          id: 'id'
        }
      }
    },
    created () {
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
          id: undefined,
          PRODUCT:undefined,
          TRADE:undefined,
          METRIC:undefined,
          STANDRATE: undefined,
          MANUFACTURE:undefined,
          SPEC:undefined,
          WARP:undefined,
          DOSAGE:undefined
        }
      },
      metaQuery () { // 表单查询数据初始化
        let obj = {
          PRODUCT: undefined,
          DOSAGE: undefined,
          SPEC: undefined,
          MANUFACTURE: undefined
        }
        if(sessionStorage.getItem('query')){
          obj = JSON.parse(sessionStorage.getItem('query'))
        }
        return obj
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
      searchEnterFun(e){
        this.$store.state.pageSeach.pageNum = 1;
        this.resData.pageNum=1;
        keyBoardEnter(e, () => {
          this.list();
        })
      },
      //  获取用户分页列表
      list () {
        queryListChange(this.resData, this.query).then(res => {
          this.resData = res.data
        })
      },
      // 重置用户表单
      resetForm () {
        /*  this.$refs['form'].resetFields()*/
        this.form = this.metaForm()
      },
      // ************************
      handleSizeChange (val) {
        this.resData.pageSize = val
        this.list()
      },
      handleCurrentChange (val) {
        this.resData.pageNum = val
        this.list()
      },
      handleGoView(productId,upProductId){
        this.$nextTick(() => {
          this.$refs.changeFindView.list(productId,upProductId)
        })
      },
      handleSelectionChange(val){
        //val 所选对象
      },
      handleQuery(){
        this.list()
      },
      restQuery(){
        sessionStorage.removeItem('query')
        this.query=this.metaQuery();this.list();
      },
      toDeclare(t) {
        if(t.name == "first") {
          this.$router.push('/AUDIT/messagePublicity/productMessageDeclarePublicity');
        }
      },
      handleGoQuery(productId,upProductId){
        this.$nextTick(() => {
          this.$refs.changeQuery.list(productId,upProductId)
        })
      }
    }
  }
</script>
