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
          <el-table-column label="企业名称" prop="beComplainedOrgName" sortable="custom" show-overflow-tooltip>
            <template slot-scope="scope">
              <!--<el-tooltip placement="top" :enterable="false">
                <div slot="content">
                  {{scope.row.beComplainedOrgName}}<br/>
                </div>
                <div class="el-tooltip-box">
                  <div class="text-inline">
                    {{ scope.row.beComplainedOrgName}}
                  </div>
                </div>
              </el-tooltip>-->
              <span>{{ scope.row.beComplainedOrgName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="被投诉次数" sortable  prop="beComplainedCount" sortable="custom">
            <template slot-scope="scope">
              <span>{{ scope.row.beComplainedCount }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="150">
            <template slot-scope="scope">
              <div class="operates">
                <a @click="showDetails(scope.row.beComplainedOrgid)"  title="查看" class="operation-btn" size="small">查看</a>
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

    </div>
    <!-- ========================== 主内容end ========================= -->
  </div>

</template>
<script>

  // 引入用户相关请求
  import {getAllComplaint} from 'src/axios/trade/evaluate/evaluate'
  import {keyBoardEnter} from "src/utils";

  export default {
    name:'company-complaint--list',
    data () {
      return {
        currentOrder: undefined,
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
        getAllComplaint(this.resData, this.query.beComplainedOrgName).then(res => {
          this.resData = res.data
          if(this.resData.pageNum===0){
            this.resData.pageNum=1
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
      },
      resetQuery() {
        this.query = this.metaQuery();
        this.list()
      },
      showDetails(beComplainedOrgid) {
        this.$router.push({path: '/trade/information/complaintDetails/'+beComplainedOrgid});
      },
    }
  }
</script>

