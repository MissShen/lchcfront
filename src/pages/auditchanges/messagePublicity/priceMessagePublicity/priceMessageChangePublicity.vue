<template>
  <!-- 表格 -->
  <div class="tablebox">
    <!-- 表格查询表单 -->
      <el-form ref="query" :model="query" label-position="right" size="small" :inline="true" class="table-form">
          <el-form-item>
            <el-input v-model="query.name" placeholder="产品名称" @keyup.enter.native="searchEnterFun" size="small"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="query.dosage" placeholder="剂型" @keyup.enter.native="searchEnterFun" size="small"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="query.specification" placeholder="规格" @keyup.enter.native="searchEnterFun" size="small"></el-input>
          </el-form-item>
          <el-form-item>
             <el-input v-model="query.manufacture" placeholder="生产企业" @keyup.enter.native="searchEnterFun" size="small"></el-input>
          </el-form-item>
          <el-form-item>
             <el-button type="success" @click="searchEnterFun" size="small">查询</el-button>
              <el-button type="warning" @click="restQuery" size="small">重置</el-button>
          </el-form-item>
      </el-form>

    <div class="tableset">
      <el-table :data="resData.list" border stripe>
       <!-- <el-table-column label="产品名称">
          <template slot-scope="scope">
            <div>
              <div class="text-inline">{{scope.row.product}}</div>
              <div class="text-inline">{{scope.row.mixDosage}}</div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="产品信息">
          <template slot-scope="scope">
            <div class="pro-details">
              <div class="text-inline">{{scope.row.combined}}&nbsp;&nbsp;{{scope.row.wrap}}</div>
              <div class="text-inline">{{scope.row.abbr}}</div>
            </div>
          </template>
        </el-table-column>-->

        <el-table-column label="产品名称">
          <template slot-scope="scope">
            <span>{{ scope.row.product }}</span>
          </template>
        </el-table-column>
        <el-table-column label="商品名">
          <template slot-scope="scope">
            <span>{{ scope.row.trade }}</span>
          </template>
        </el-table-column>
        <el-table-column label="剂型">
          <template slot-scope="scope">
            <span>{{ scope.row.dosage }}</span>
          </template>
        </el-table-column>
        <el-table-column label="规格">
          <template slot-scope="scope">
            <span>{{ scope.row.spec }}</span>
          </template>
        </el-table-column>
        <el-table-column align="right" header-align="left" width="60px" label="转换比">
          <template slot-scope="scope">
            <span>{{ scope.row.standRate }}</span>
          </template>
        </el-table-column>
        <el-table-column label="单位">
          <template slot-scope="scope">
            <span>{{ scope.row.metric }}</span>
          </template>
        </el-table-column>
        <el-table-column label="包材">
          <template slot-scope="scope">
            <span>{{ scope.row.wrap }}</span>
          </template>
        </el-table-column>
        <el-table-column label="生产企业">
          <template slot-scope="scope">
            <span>{{ scope.row.manufacture }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="140px">
          <template slot-scope="scope">
            <div class="operates">
            <span>
              <a class="operation-btn" v-if="scope.row.status == '3' && scope.row.queryFlag == '0'" @click="questionHandle(scope.row.requestCode,scope.row.productId)">质疑</a>
            </span>
            <span>
             <a class="operation-btn" @click="detailHandle(scope.row.requestCode,scope.row.productId)">详情</a>
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
    <price-change-publicity-detail ref="priceChangePublicityDetail"></price-change-publicity-detail>
    <price-change-publicity-doubt ref="priceChangePublicityDoubt"></price-change-publicity-doubt>
  </div>
</template>

<script>
  // 引入用户相关请求
  import {findUpProjectProducts} from "src/axios/auditchanges/messagePublicity/price";
  import {keyBoardEnter} from "../../../../utils";
  import priceChangePublicityDetail from './priceChangePublicityDetail'
  import priceChangePublicityDoubt from './priceChangePublicityDoubt'

  export default {
    components: {
      priceChangePublicityDetail,
      priceChangePublicityDoubt
    },
    data() {
      return {
        resData: this.metaData(),
        query: this.metaQuery() // 查询初始化
      };
    },
    created() {
      if(!!this.$store.state.pageSeach.pageNum){
        this.query = this.$store.state.pageSeach;
        this.resData.pageSize = this.$store.state.pageSeach.pageSize;
        this.resData.pageNum = this.$store.state.pageSeach.pageNum;
      }
      this.$store.state.pageSeach=this.query;
      this.list();
    },
    methods: {
      // -------------------------------------------- 数据初始化  -----------------------------------------
      metaData() {
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
        };
      },

      metaQuery() {
        let obj = {
          name: undefined,
          dosage: undefined,
          specification: undefined,
          manufacture: undefined
        }
        if(sessionStorage.getItem('query')){
          obj = JSON.parse(sessionStorage.getItem('query'))
        }
        return obj
      },
      // ------------------------------------------------- 处理方法 ----------------------------------------
      toggleQuery() {
        this.showQuery = !this.showQuery;
      },
      //查询
      searchEnterFun(e){
        this.$store.state.pageSeach.pageNum = 1;
        this.resData.pageNum=1;
        keyBoardEnter(e, () => {
          this.list();
        })
      },
      //  获取用户分页列表
      list() {
        this.$store.state.pageSeach=this.query;
        findUpProjectProducts(this.resData, this.query).then(res => {
          this.resData = res.data;
          console.log(this.resData)
        });
      },
      questionHandle(id,productId) {
        this.$refs.priceChangePublicityDoubt.list(id,productId)
      },
      detailHandle(id,productId) {
        this.$nextTick(() => {
          this.$refs.priceChangePublicityDetail.list(id,productId)
        })
      },
      handleQuery() {
        this.list();
      },
      restQuery() {//重置
        sessionStorage.removeItem('query')
        this.query = this.metaQuery();
        this.list();
      },
      // ************************
      handleSizeChange(val) {
        this.$store.state.pageSeach.pageSize = val
        this.resData.pageSize = val;
        this.list();
      },
      handleCurrentChange(val) {
        this.$store.state.pageSeach.pageNum = val
        this.resData.pageNum = val;
        this.list();
      }
    }
  };
</script>
