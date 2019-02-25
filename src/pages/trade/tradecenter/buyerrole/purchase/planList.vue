<template>
  <div><!-- ==================================================================== 不要了 ============================================== -->
    <!-- ========================== 主内容start ========================= -->
    <!-- 表格 -->
    <div class="tablebox">
      <!-- 表格查询表单 -->
      <div class="table-form">
        <el-form ref="query" :model="query" size="small" class="demo-form-inline">
          <div class="formrow">
            <span>
              <el-select v-model="value" placeholder="采购单状态" size="small">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </span>
            <span>
                <el-input v-model="query.searchPurchaseCode" @keyup.enter.native="searchEnterFun"  placeholder="采购单编号" size="small"></el-input>
            </span>
            <span class="date-group">
                  <el-date-picker type="date" placeholder="创建开始日期" v-model="query.beginDate" @keyup.enter.native="searchEnterFun"
                                  format="yyyy-MM-dd" value-format="yyyy-MM-dd" size="small"></el-date-picker>
              &nbsp;至&nbsp;
                  <el-date-picker type="date" placeholder="创建结束日期" v-model="query.endDate" @keyup.enter.native="searchEnterFun"
                                  format="yyyy-MM-dd" value-format="yyyy-MM-dd" size="small"></el-date-picker>
            </span>
            <span>
                <!--<el-button type="warning" size="small">查询</el-button>
                <el-button type="primary" size="small">重置</el-button>-->
            </span>
          </div>
        </el-form>
      </div>

      <div class="table-caption">
        <el-button type="primary" size="small">
          导出采购单
        </el-button>
        <template>
          <el-checkbox v-model="checked">包含明细</el-checkbox>
        </template>
      </div>

      <!-- 表格列表 -->
      <div class="tableset">
        <el-table
          :data="resData.list"
          border
          stripe>
          <!--<el-table-column type="index" width="50" label="序号">
          </el-table-column>-->
          <el-table-column label="采购单编号">
              <span>{{ scope.row.purchaseCode }}</span>
          </el-table-column>
          <el-table-column label="创建时间">
              <span>{{ scope.row.createDate }}</span>
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

      <div class="sign">
        <span class="text">标记说明：</span>
        <span class="icon-sign sign-district">区</span>
        <span class="text">区目录药品</span>
        <span class="icon-sign sign-basic">基</span>
        <span class="text">基本药物目录</span>
        <span class="icon-sign icon-jixu"></span>
        <span class="text">急需商品</span>
      </div>

    </div>
    <!-- ========================== 主内容end ========================= -->
  </div>

</template>
<script>

  // 引入用户相关请求
  import {queryPlanList} from 'src/axios/trade/purchase/purchase'
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
            pageSize: 0,
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
        queryPlanList(this.resData, this.query).then(res => {
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


