<template>
  <div>
    <!-- ========================== 用户投诉 ========================= -->
    <!-- 表格 -->
    <div class="tablebox">
      <!-- 表格查询表单 -->
        <el-form ref="query" :model="query" label-position="right" size="small" :inline="true" class="table-form">
            <el-form-item class="width-120">
                <el-input v-model="query.beComplainedOrgName" @keyup.enter.native="searchEnterFun" placeholder="被投诉企业" size="small"></el-input>
            </el-form-item>
            <el-form-item>
              <el-date-picker type="date" placeholder="投诉日期" @keyup.enter.native="searchEnterFun" v-model="query.searchBenDate"  format="yyyy-MM-dd" value-format="yyyy-MM-dd" size="small"></el-date-picker>
               &nbsp;至&nbsp;
              <el-date-picker type="date" placeholder="投诉日期" @keyup.enter.native="searchEnterFun" v-model="query.searchEndDate"  format="yyyy-MM-dd" value-format="yyyy-MM-dd" size="small"></el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type="success" @click="searchEnterFun" size="small">查询</el-button>
                <el-button type="warning" size="small" @click="resetQuery()">重置</el-button>
                <el-button size="small" @click="goBack()">返回</el-button>
            </el-form-item>
        </el-form>
      <!-- 表格列表 -->
      <div class="tableset">
        <el-table
          :data="resData.list"
          border
          stripe
          @sort-change="sortChang"
        >
          <!--<el-table-column type="index" header-align="left" align="center" width="50" label="序号"></el-table-column>-->
          <el-table-column label="投诉编号" prop="e.CODE" sortable="custom" >
            <template slot-scope="scope">
              {{ scope.row.code }}
            </template>
          </el-table-column>
            <el-table-column label="被投诉企业" show-overflow-tooltip prop="e.beComplainedOrgName" sortable="custom" >
            <template slot-scope="scope">
              <span>{{ scope.row.beComplainedOrgName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="买方机构" show-overflow-tooltip prop="e.buyerOrgName" sortable="custom" >
            <template slot-scope="scope">
              {{ scope.row.buyerOrgName }}
            </template>
          </el-table-column>
          <el-table-column label="投诉时间" prop="e.CREATED_AT" sortable="custom" >
            <template slot-scope="scope">
              <span>{{ scope.row.createdAt }}</span>
            </template>
          </el-table-column>
          <el-table-column label="状态" prop="e.stateName" sortable="custom">
            <template slot-scope="scope">
              {{ scope.row.stateName }}
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
  import {queryCustomerComplaintsList} from 'src/axios/trade/evaluate/evaluate'
  import {priceFormat,keyBoardEnter} from "src/utils";

  export default {
    name:'show-complained-list',
    data () {
      return {
        currentOrder: undefined,
        activeName: 'first',  // 当前标签
        resData: this.metaData(),
        query: this.metaQuery(), // 查询初始化
        orderItemId:'',
        returnFlag:'',
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
      this.returnFlag =this.$route.params.type
      this.orderItemId =this.$route.params.id
      this.list()
    },
    methods: {
      // -------------------------------------------- 数据初始化  -----------------------------------------
      metaData () {
        return {
          // 前后台交互数据封装格式
          orderBy: undefined,
            pageNum: 1,
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
      metaQuery () { // 表单查询数据初始化
        return {
            beComplainedOrgName:undefined,
            returnFlag:undefined,
            searchBenDate:undefined,
            orderItemId:undefined,
            searchEndDate:undefined
        }
      },
      // ------------------------------------------------- 处理方法 ----------------------------------------
      //  获取用户分页列表
      list () {
        this.resData.orderBy=this.currentOrder;
        this.query.orderItemId=this.orderItemId;
        this.query.returnFlag=this.returnFlag;
        queryCustomerComplaintsList(this.resData, this.query).then(res => {
          this.resData = res.data
          if(this.resData.pageNum===0){
            this.resData.pageNum=1
          }
        })
      },
      goBack() {
        this.$router.go(-1)
      },
      sortChang(value){
        let sortType=" desc"
        if(value.order.startsWith("asc")){
          sortType=" asc";
        }
        this.currentOrder=value.prop + sortType;
        this.list()
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
      },
      resetQuery() {
        this.query = this.metaQuery();
        this.list()
      },
    }
  }
</script>

