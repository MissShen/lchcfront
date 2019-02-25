<template>
  <div>
    <div class="tabs-panel">
      <span class="active">打印</span>
    </div>
    <!-- ========================== 主内容start ========================= -->
    <!-- 表格 -->
    <div class="tablebox">
      <!-- 表格查询表单 -->
      <div class="table-form">
        <el-form ref="query" :model="query" label-position="right" size="small" class="demo-form-inline">
          <div class="formrow">
            <span>
                <el-input v-model="query.orgAllName" @keyup.enter.native="searchEnterFun" placeholder="药库" size="small"></el-input>
            </span>
            <span>
                <el-input v-model="query.searchProductName" @keyup.enter.native="searchEnterFun" placeholder="品名" size="small"></el-input>
            </span>
            <span>
                <el-input v-model="query.searchMedicalSpec" @keyup.enter.native="searchEnterFun" placeholder="规格" size="small"></el-input>
            </span>
            <span>
                <el-input v-model="query.orgName3" @keyup.enter.native="searchEnterFun" placeholder="生产企业" size="small"></el-input>
            </span>
            <span>
                <el-input v-model="query.senderOrgName" @keyup.enter.native="searchEnterFun" placeholder="配送企业" size="small"></el-input>
            </span>
            <span>
              <el-date-picker type="date" placeholder="历史采购开始日期" v-model="query.searchBenDate" @keyup.enter.native="searchEnterFun"
                              format="yyyy-MM-dd" value-format="yyyy-MM-dd" size="small"></el-date-picker>
              &nbsp;至&nbsp;
              <el-date-picker type="date" placeholder="历史采购结束日期" v-model="query.searchEndDate" @keyup.enter.native="searchEnterFun"
                              format="yyyy-MM-dd" value-format="yyyy-MM-dd" size="small"></el-date-picker>
            </span>
            <span>
   <!--           <el-button type="warning" size="small">查询</el-button>
              <el-button type="primary" size="small">重置</el-button>-->
            </span>
          </div>
        </el-form>
      </div>

      <!-- 表格列表 -->
      <div class="tableset">
        <el-table
          :data="resData.list"
          border
          stripe>
          <!--<el-table-column type="index" label="序号" width="50"></el-table-column>-->
          <el-table-column label="产品名">
              <span>{{ scope.row.bakMedicalName }}</span>
          </el-table-column>
          <el-table-column label="商品名">
              {{ scope.row.bakProductName }}
          </el-table-column>
          <el-table-column label="规格包装">
              <span>{{ scope.row.bakMedicalSpec }}</span>
          </el-table-column>
          <el-table-column label="中大包装">
              {{ scope.row.bakMiddleStandRate }}
          </el-table-column>
          <el-table-column label="生产企业">
              <span>{{ scope.row.bakProducerFullname }}</span>
          </el-table-column>
          <el-table-column label="配送企业">
              <span>{{ scope.row.sendBusiness }}</span>
          </el-table-column>
          <el-table-column label="单价" align="right">
              <span>{{ priceFormat(scope.row.hitPrice) }}</span>
          </el-table-column>
          <el-table-column label="计划采购量">
              <span>{{ scope.row.requestQty }}</span>
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

    </div>
    <!-- ========================== 主内容end ========================= -->
  </div>

</template>
<script>

  // 引入用户相关请求
  import {printList} from 'src/axios/trade/purchase/purchase'
  import {priceFormat,keyBoardEnter} from "src/utils";

  export default {
    name:'based-city-snder-list',
    data () {
      return {
        activeName: 'first',  // 当前标签
        resData: this.metaData(),
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
      priceFormat,
      // -------------------------------------------- 数据初始化  -----------------------------------------
      metaData () {
        return {
          // 前后台交互数据封装格式
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
      metaQuery () { // 表单查询数据初始化
        return {
            id: undefined,
            orgAllName: undefined,
            searchAllproductName:undefined,
            senderOrgName:undefined,
            searchBenDate:undefined,
            searchEndDate:undefined
        }
      },
      // ------------------------------------------------- 处理方法 ----------------------------------------
      //  获取用户分页列表
      list () {
        printList(this.resData, this.query).then(res => {
          this.resData = res.data
        })
      },
      searchEnterFun(e){
        this.$store.state.pageSeach.pageNum = 1;
        this.resData.pageNum = 1;
        keyBoardEnter(e,() =>{
          this.list();
        })
      },
      // ************************ 分页操作 ************************
      handleSizeChange (val) {
        this.resData.pageSize = val
        this.list()
      },
      handleCurrentChange (val) {
        this.resData.pageNum = val
        this.list()
      }
    }
  }
</script>

