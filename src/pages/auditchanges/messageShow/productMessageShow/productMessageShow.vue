<template>
  <!-- 表格 -->
  <div class="tablebox">
    <!-- 表格查询表单 -->
      <el-form ref="query" :model="query" label-position="right" size="small" :inline="true" class="table-form">
          <el-form-item>
            <el-input v-model="query.productName" placeholder="产品名称" @keyup.enter.native="searchEnterFun" size="small"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="query.doseageFormCode" placeholder="剂型" @keyup.enter.native="searchEnterFun" size="small"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="query.spec" placeholder="规格" @keyup.enter.native="searchEnterFun" size="small"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="query.manufactureName" placeholder="生产企业" @keyup.enter.native="searchEnterFun" size="small"></el-input>
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
              <div class="text-inline">{{scope.row.productName}}</div>
              <div class="text-inline">{{scope.row.mixDosage}}</div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="产品信息">
          <template slot-scope="scope">
            <div class="pro-details">
              <div class="text-inline">{{scope.row.combined}}&nbsp;&nbsp;{{scope.row.codeName}}</div>
              <div class="text-inline">{{scope.row.abbr}}</div>
            </div>
          </template>
        </el-table-column>-->

        <el-table-column label="产品名称">
          <template slot-scope="scope">
            <span>{{scope.row.productName}}</span>
          </template>
        </el-table-column>
        <el-table-column label="商品名">
          <template slot-scope="scope">
            <span>{{ scope.row.tradeName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="剂型" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.doseageFormCode }}</span>
          </template>
        </el-table-column>
        <el-table-column label="规格" show-overflow-tooltip>
          <template slot-scope="scope">
              <span>{{scope.row.spec}}</span>
          </template>
        </el-table-column>
        <el-table-column label="转换比" header-align="left" align="right">
          <template slot-scope="scope">
            <span>{{ scope.row.rate }}</span>
          </template>
        </el-table-column>
        <el-table-column label="单位">
          <template slot-scope="scope">
            <span>{{ scope.row.metricName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="包材" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.codeName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="生产企业" show-overflow-tooltip>
          <template slot-scope="scope">
              <span>{{scope.row.manufactureName}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="100px">
          <template slot-scope="scope">
            <div class="operates">
              <span><a class="operation-btn" @click="handleView(scope.row.id)">详情</a></span>
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
    <detail-page ref="detailPage"></detail-page>
  </div>

</template>
<script>

  // 引入用户相关请求

  import {queryList} from 'src/axios/auditchanges/infoshow/productInfoShow'
  import {keyBoardEnter} from "src/utils";
  import detailPage from "./detailPage";
  export default {
    components:{
      detailPage
    },
    data () {
      return {
        resData: this.metaData(),
        form: this.metaForm(), // 表单初始化
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
      //页面初始化执行
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
          productName:undefined,
          tradeName:undefined,
          metricName:undefined,
          codeName: undefined,
          manufactureName:undefined,
          spec:undefined,
          rate:undefined,
          doseageFormCode:undefined
        }
      },
      metaQuery () { // 表单查询数据初始化
        return {
          query: {//条件查询定义
            productName: undefined,
            tradeName: undefined,
            doseageFormCode: undefined,
            spec: undefined,
            manufactureName: undefined
          }
        }
      },
      //查询
      searchEnterFun(e){
        this.$store.state.pageSeach.pageNum = 1;
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
      handleSizeChange (val) {
        this.resData.pageSize = val
        this.list()
      },
      handleCurrentChange (val) {
        this.resData.pageNum = val
        this.list()
      },
      handleQuery(){
        this.list()
      },
      handleSelectionChange(val){
        //val 所选对象
      },
      restQuery(){//重置
        this.query=this.metaQuery();
        this.list();
      },
      handleView(id) {
        this.$nextTick(() => {
          this.$refs.detailPage.list(id)
        })
      }
    }
  }
</script>
