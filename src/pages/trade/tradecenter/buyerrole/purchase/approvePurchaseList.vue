<template>
  <div>
    <!-- ========================== 主内容start ========================= -->
    <!-- 表格 -->
    <div class="tablebox">
      <!-- 表格查询表单 -->
      <div class="table-form">
        <el-form :inline="true" ref="query" :model="query" class="demo-form-inline">
          <div class="formrow">
            <span>
              <el-input v-model="query.searchPurchaseCode" @keyup.enter.native="searchEnterFun"  placeholder="采购单编号" size="small"></el-input>
            </span>
            <span>
              <el-date-picker type="date" placeholder="创建开始日期"  @keyup.enter.native="searchEnterFun" format="yyyy-MM-dd" value-format="yyyy-MM-dd"
                              v-model="query.searchBenDate" size="small"></el-date-picker>
              &nbsp;至&nbsp;
              <el-date-picker type="date" placeholder="创建结束日期" @keyup.enter.native="searchEnterFun"  format="yyyy-MM-dd" value-format="yyyy-MM-dd"
                              v-model="query.searchEndDate" size="small"></el-date-picker>
            </span>
            <span>
              <!--  <el-button type="warning" size="small">查询</el-button>
                <el-button type="primary">重置</el-button>-->
            </span>
          </div>
        </el-form>
      </div>

      <!-- 表格列表 -->
      <div class="tableset">
        <el-table ref="multipleTable" border  stripe :default-sort = "{prop: 'name'}" :data="resData.list" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
          <!--<el-table-column type="index" width="80" label="序号">
          </el-table-column>-->
          <el-table-column label="采购单编号">
              {{ scope.row.purchaseCode }}
          </el-table-column>
          <el-table-column label="创建时间">
              {{ scope.row.createDate }}
          </el-table-column>
          <el-table-column label="买方机构">
              {{ scope.row.buyerName }}
          </el-table-column>
          <el-table-column label="拟采购金额（元）">
              <span>{{ priceFormat(scope.row.requestTotal) }}</span>
          </el-table-column>
          <el-table-column label="采购类别">
              <span>{{ scope.row.purchaseState }}</span>
          </el-table-column>
          <el-table-column label="采购单别名">
              <span>{{ scope.row.byName }}</span>
          </el-table-column>
          <el-table-column label="状态">
              <span>{{ scope.row.purchaseState }}</span>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <a class="operation-btn" size="small">详情</a>
              <a class="operation-btn" size="small">制单</a>
              <a class="operation-btn" size="small">编辑</a>
              <a class="operation-btn" size="small">删除</a>
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

    </div>
    <!-- ========================== 主内容end ========================= -->
  </div>

</template>
<script>

  // 引入用户相关请求
  import {approvePurchaseList} from 'src/axios/trade/purchase/purchase'
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
            searchAllproductName: undefined,
            searchAllproductName:undefined,
            senderOrgName:undefined,
            searchBenDate:undefined,
            searchEndDate:undefined

        }
      },
      // ------------------------------------------------- 处理方法 ----------------------------------------
      //  获取用户分页列表
      list () {
        itemList(this.resData, this.query).then(res => {
          this.resData = res.data
          if(this.resData.pageNum === 0){
            this.resData.pageNum = 1
          }
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

