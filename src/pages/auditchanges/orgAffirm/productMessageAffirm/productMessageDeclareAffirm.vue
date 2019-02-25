<template>
  <!-- 表格 -->
  <div class="tab-box">
    <!--<div class="tabs-panel">
      <span class="active">产品信息申报确认</span>
      <router-link to="/AUDIT/orgAffirm/productMessageChangeAffirm">产品信息变更确认</router-link>
    </div>-->

    <span class="tab-bar"></span>
    <el-tabs v-model="activeName" @tab-click="toChange">
      <el-tab-pane label="产品信息申报确认" name="first" />
      <el-tab-pane label="产品信息变更确认" name="second" />
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
        <el-table-column label="产品名称">
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
        <!--<el-table-column label="商品名" show-overflow-tooltip>-->
          <!--<template slot-scope="scope">-->
            <!--<span>{{ scope.row.TRADE }}</span>-->
          <!--</template>-->
        <!--</el-table-column>-->
        <!--<el-table-column label="剂型" width="100px">-->
          <!--<template slot-scope="scope">-->
            <!--<span>{{ scope.row.DOSAGE }}</span>-->
          <!--</template>-->
        <!--</el-table-column>-->
        <!--<el-table-column label="规格" width="80" show-overflow-tooltip>-->
          <!--<template slot-scope="scope">-->
              <!--<span>{{ scope.row.SPEC }}</span>-->
          <!--</template>-->
        <!--</el-table-column>-->
        <!--<el-table-column label="转换比" width="80px" header-align="left" align="right">-->
          <!--<template slot-scope="scope">-->
            <!--<span>{{ scope.row.STANDRATE }}</span>-->
          <!--</template>-->
        <!--</el-table-column>-->
        <!--<el-table-column label="单位" width="60px">-->
          <!--<template slot-scope="scope">-->
            <!--<span>{{ scope.row.METRIC }}</span>-->
          <!--</template>-->
        <!--</el-table-column>-->
        <!--<el-table-column label="包材" width="60px" show-overflow-tooltip>-->
          <!--<template slot-scope="scope">-->
            <!--<span>{{ scope.row.WRAP }}</span>-->
          <!--</template>-->
        <!--</el-table-column>-->
        <!--<el-table-column label="生产企业" show-overflow-tooltip>-->
          <!--<template slot-scope="scope">-->
              <!--<span>{{ scope.row.MANUFACTURE }}</span>-->
          <!--</template>-->
        <!--</el-table-column>-->
        <el-table-column label="状态">
          <template slot-scope="scope">
            <span>{{scope.row.STATE=='8'?'未确认':'已确认'}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="100px">
          <template slot-scope="scope">
            <div class="operates">
              <span v-if="scope.row.STATE == '8'">
                <a class="operation-btn" @click="handleGoAffirm(scope.row.ID)">去确认</a>
              </span>
              <span v-if="scope.row.STATE == '9'">
                <a class="operation-btn" @click="goDetail(scope.row.ID)">详情</a>
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
    <declare-affirm ref="declareAffirm"></declare-affirm>
    <declare-detail ref="declareDetail"></declare-detail>
      </div>
    </div>
  </div>
</template>
<script>
  import {queryList} from 'src/axios/auditchanges/orgAffirm/productAffirm'
  // import {keyBoardEnter} from "src/utils";
  import declareAffirm from "./declareAffirm"
  import declareDetail from "./declareDetail"
  export default {
    components:{
      declareAffirm,
      declareDetail
    },
    data () {
      return {
        resData: this.metaData(),
        form: this.metaForm(), // 表单初始化
        activeName: 'first',//标签页默认选中第一个
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
        }
      },
      metaQuery () { // 表单查询数据初始化
        let obj = {
          projectId: undefined,
          categoryName: undefined
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
      // //查询
      // searchEnterFun(e){
      //   this.$store.state.pageSeach.pageNum = 1;
      //   this.resData.pageNum=1;
      //   keyBoardEnter(e, () => {
      //     this.list();
      //   })
      // },
      //  获取用户分页列表
      list () {
        queryList(this.resData, this.query).then(res => {
          this.resData = res.data
        })
      },
      // 重置用户表单
      resetForm () {
        /*  this.$refs['form'].resetFields()*/
        this.form = this.metaForm()
      },
      handleGoAffirm(id){
        this.$nextTick(() => {
          this.$refs.declareAffirm.list(id)
        })
      },
      goDetail(id){
        console.log(this.$refs)
        this.$nextTick(() => {
          this.$refs.declareDetail.list(id)
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
        sessionStorage.removeItem('query')
        this.query=this.metaQuery();this.list();
      },
      toChange(t) {
        if(t.name == "second") {
          this.$router.push('/AUDIT/orgAffirm/productMessageChangeAffirm');
        }
      },
      handleCurrentChange (val) {
        this.resData.pageNum = val
        this.list()
      }
    }
  }
</script>
