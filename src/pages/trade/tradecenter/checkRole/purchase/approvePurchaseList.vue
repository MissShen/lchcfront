<template>
  <div>
    <!-- ========================== 主内容start ========================= -->
    <!-- 表格 -->
    <div class="tablebox">
      <!-- 表格查询表单 -->
      <div class="table-form">
        <el-form ref="query" :model="query" label-position="right" size="small">
          <div class="formrow">
            <span>
              <el-input v-model="query.searchPurchaseCode"  @keyup.enter.native="searchEnterFun" placeholder="采购单编号" size="small"></el-input>
            </span>
            <span>
              <el-date-picker type="date"  @keyup.enter.native="searchEnterFun" placeholder="创建开始日期" v-model="query.searchBenDate"
                              format="yyyy-MM-dd" value-format="yyyy-MM-dd" size="small"></el-date-picker>
              &nbsp;至&nbsp;
              <el-date-picker type="date"  @keyup.enter.native="searchEnterFun" placeholder="创建结束日期" v-model="query.searchEndDate"
                              format="yyyy-MM-dd" value-format="yyyy-MM-dd" size="small"></el-date-picker>
            </span>
            <span>
              <el-button type="warning" @click="searchEnterFun" size="small">查询</el-button>
              <el-button type="primary" @click="restQuery()" size="small">重置</el-button>
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
          <!--<el-table-column type="index" width="50" label="序号">
          </el-table-column>-->
          <el-table-column label="采购单编号">
            <template slot-scope="scope">
              <span>{{ scope.row.purchaseCode }}</span>
            </template>
          </el-table-column>
          <el-table-column label="创建时间">
            <template slot-scope="scope">
              <span>{{ scope.row.createDate }}</span>
            </template>
          </el-table-column>
          <el-table-column label="送审时间">
            <template slot-scope="scope">
              <span>{{ scope.row.sendApproveDate }}</span>
            </template>
          </el-table-column>
          <el-table-column label="买方机构">
            <template slot-scope="scope">
              {{ scope.row.bakBuyerEasy }}
            </template>
          </el-table-column>
          <el-table-column label="拟采购金额（元）">
            <template slot-scope="scope">
              <span>{{ priceFormat(scope.row.requestTotal) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="采购类别">
            <template slot-scope="scope">
              <span >{{ getFlag(scope.row.flag) }}</span>
            </template>
          </el-table-column>
          <!--<el-table-column label="采购单别名">-->
            <!--<template slot-scope="scope">byName-->
              <!--<span>{{ scope.row.byName }}</span>-->
            <!--</template>-->
          <!--</el-table-column>-->
          <el-table-column label="状态">
            <template slot-scope="scope">
              <span>{{ scope.row.purchaseState == '1'? '送一审':'' }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="checkOne(scope.row.purchaseId)">审核</el-button>
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
        <span class="icon-sign sign-basic"></span>
        <span class="text">部分急需</span>
        <span class="icon-sign icon-jixu"></span>
        <span class="text">全部急需</span>
      </div>

    </div>
    <!-- ========================== 主内容end ========================= -->
  </div>

</template>
<script>

  // 引入用户相关请求
  import {queryCheckApprovePurchaseList} from 'src/axios/trade/purchase/purchase'
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
            pageNum: 1,
            pageSize: 20,
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
          searchPurchaseCode: undefined,
          searchBenDate: undefined,
          searchEndDate: undefined
        }
      },
      // ------------------------------------------------- 处理方法 ----------------------------------------
      //  获取用户分页列表
      list () {
        queryCheckApprovePurchaseList(this.resData, this.query).then(res => {
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
      checkOne(purchaseId) {
        this.$router.push("/trade/manage/checkRole/checkOne/" + purchaseId+"/"+'approve')
      },
      restQuery() {
        this.query = this.metaQuery()
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
      getFlag(flag){
        var arrFlag = ['本院订单', '临时订单', '本院补单', '临时补单'];
        return arrFlag[flag];
      }
    }
  }
</script>
