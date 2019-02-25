<template>
  <div>
    <div class="tabs-panel">
      <span class="active">详情</span>
    </div>
    <!-- ========================== 主内容start ========================= -->
    <!-- 表格 -->
    <div class="tablebox">
      <!-- 表格查询表单 -->
      <div class="table-form">
        <el-form ref="query" :model="query" label-position="right" size="small" class="demo-form-inline">
          <div class="formrow">
            <span>
              <el-input v-model="query.searchProductName" @keyup.enter.native="searchEnterFun"  placeholder="品名" size="small"></el-input>
            </span>
            <span>
              <el-input v-model="query.searchMedicalSpec" @keyup.enter.native="searchEnterFun"  placeholder="规格" size="small"></el-input>
            </span>
            <span>
              <el-input v-model="query.searchOrgName" @keyup.enter.native="searchEnterFun"  placeholder="生产企业" size="small"></el-input>
            </span>
            <span>
           <!--   <el-button type="warning" size="small">查询</el-button>
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
          <el-table-column label="医院机构名称">
              {{ scope.row.buyerName }}
          </el-table-column>
          <el-table-column label="单价" width="80" align="right">
              {{ priceFormat(scope.row.minPrice) }}
          </el-table-column>
          <el-table-column label="创建时间">
              {{ scope.row.createDate }}
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
  import {priceWarningItem} from 'src/axios/trade/purchase/purchase'
  import {priceFormat} from "src/utils";

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
          resData: { // 前后台交互数据封装格式
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
        }
      },
      metaQuery () { // 表单查询数据初始化
        return {
            id: undefined,
            searchProductName: undefined,
            searchMedicalSpec: undefined,
            searchOrgName: undefined
        }
      },
      // ------------------------------------------------- 处理方法 ----------------------------------------
      //  获取用户分页列表
      list () {
        priceWarningItem(this.resData, this.query).then(res => {
          this.resData = res.data
          if(this.resData.pageNum === 0){
            this.resData.pageNum = 1
          }
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

