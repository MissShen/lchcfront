<template>
  <div>
    <!-- ========================== 待处理 ========================= -->
    <!-- 表格 -->
    <div class="tablebox">
      <!-- 表格查询表单 -->
        <el-form ref="query" :model="query" label-position="right" size="small" :inline="true" class="table-form">
            <el-form-item class="width-120">
                <el-input v-model="query.beComplainedOrgName"  @keyup.enter.native="searchEnterFun" placeholder="企业名称" size="small"></el-input>
            </el-form-item>
            <el-form-item>
                <el-date-picker class="width-120" type="date" placeholder="投诉日期"  @keyup.enter.native="searchEnterFun"  format="yyyy-MM-dd" value-format="yyyy-MM-dd" v-model="query.searchBenDate" size="small"></el-date-picker>
                 &nbsp;至&nbsp;
                <el-date-picker class="width-120" type="date" placeholder="投诉日期"  @keyup.enter.native="searchEnterFun"  format="yyyy-MM-dd" value-format="yyyy-MM-dd" v-model="query.searchEndDate" size="small"></el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type="success" @click="searchEnterFun" size="small">查询</el-button>
                <el-button type="warning" size="small" @click="resetQuery()">重置</el-button>
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
          <!--<el-table-column type="index" width="50" header-align="left" align="center" label="序号"></el-table-column>-->
          <el-table-column label="企业名称" prop="e.BECOMPLAINEDORGNAME" sortable="custom" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-tooltip placement="top" :enterable="false">
                <div slot="content">
                  {{scope.row.beComplainedOrgName}}<br/>
                </div>
                <div class="el-tooltip-box">
                  <div class="text-inline">
                    {{ scope.row.beComplainedOrgName}}
                  </div>
                </div>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column label="企业地址" prop="e.BECOMPLAINEDORGADDRESS" sortable="custom" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-tooltip placement="top" :enterable="false">
                <div slot="content">
                  {{scope.row.beComplainedOrgAddress}}<br/>
                </div>
                <div class="el-tooltip-box">
                  <div class="text-inline">
                    {{ scope.row.beComplainedOrgAddress}}
                  </div>
                </div>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column label="企业法人" prop="e.JURIDICAL_PERSON" sortable="custom">
            <template slot-scope="scope">
              {{ scope.row.juridicalPerson }}
            </template>
          </el-table-column>
          <el-table-column label="被投诉次数" sortable width="120" align="right" prop="e.beComplainedCount" sortable="custom">
            <template slot-scope="scope">
              <span>{{ scope.row.beComplainedCount }}</span>
            </template>
          </el-table-column>
          <el-table-column label="总扣分" sortable width="100" align="right" prop="e.DEDUCTIONSCORE" sortable="custom">
            <template slot-scope="scope">
              {{ scope.row.deductionScore }}
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
  import {queryCompanyComplaintList} from 'src/axios/trade/evaluate/evaluate'
  import {priceFormat,keyBoardEnter} from "src/utils";

  export default {
    name:'company-complaint--list',
    data () {
      return {
        currentOrder: undefined,
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
      // -------------------------------------------- 数据初始化  -----------------------------------------
      sortChang(value){
        let sortType=" desc"
        if(value.order.startsWith("asc")){
          sortType=" asc";
        }
        this.currentOrder=value.prop + sortType;
        this.list()
      },
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
            buyerOrgName:undefined,
            searchBenDate:undefined,
            searchEndDate:undefined,
            searchBenDate:this.getLocalYear(),
            searchEndDate:this.getLocalTime()
        }
      },
      searchEnterFun(e){
        this.$store.state.pageSeach.pageNum = 1;
        this.resData.pageNum = 1;
        keyBoardEnter(e,() =>{
          this.list();
        })
      },
      // ------------------------------------------------- 处理方法 ----------------------------------------
      //  获取用户分页列表
      list () {
        this.resData.orderBy=this.currentOrder;
        queryCompanyComplaintList(this.resData, this.query).then(res => {
          this.resData = res.data
          if(this.resData.pageNum===0){
            this.resData.pageNum=1
          }
        })
      },
       getLocalTime (){
        let date = new Date();
        let YY = date.getFullYear();
        let MM = (date.getMonth()+1 < 10 ? '0'+ (date.getMonth()+1) : date.getMonth()+1);
        let DD = date.getDate()+1 < 10 ? '0'+ date.getDate() : date.getDate();
         let hh = date.getHours() < 10 ? '0'+ date.getHours() : date.getHours();
         let mm = date.getMinutes() < 10 ? '0'+ date.getMinutes() : date.getMinutes();
         let ss = date.getSeconds() < 10 ? '0'+ date.getSeconds() : date.getSeconds();
         return YY + '-' + MM + '-' + DD + ' ' + hh + ':' + mm + ':' + ss;

       },
      getLocalYear (){
        let date = new Date();
        let YY = date.getFullYear();
        let MM = '01';
        let DD = '01';
        let hh = '00';
        let mm = '00';
        let ss = '00';
        return YY + '-' + MM + '-' + DD + ' ' + hh + ':' + mm + ':' + ss;

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
      reasonManage(){
        this.$router.push("/trade/manage/complaintReasonManageList")
      }
    }
  }
</script>

