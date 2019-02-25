<template>
  <div>
    <!-- ========================== 主内容start ========================= -->
    <!-- 表格 -->
    <div class="tablebox">
      <!-- 表格查询表单 -->
      <el-form ref="query" :model="query" label-position="right" :inline="true" size="small" class="table-form">
         <el-form-item>
            <el-select v-model="query.searchIssueState"  @keyup.enter.native="searchEnterFun"  placeholder="上报状态" size="small">
              <el-option label="全部" value=""></el-option>
              <el-option label="开始上报" value="1"></el-option>
              <el-option label="结束上报" value="2"></el-option>
            </el-select>
         </el-form-item>
        <el-form-item>
          <el-input  v-model="query.searchIssueName" @keyup.enter.native="searchEnterFun"   placeholder="期号名称" size="small"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="success" size="small" @click="searchEnterFun">查询</el-button>
          <el-button type="warning" size="small" @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>

      <!-- 表格列表 -->
      <div class="tableset">
        <el-table
          :data="resData.list"
          @sort-change="sortChang"
          border
          stripe>
          <!--<el-table-column label="序号"  type="index" header-align="left" align="center" width="50"></el-table-column>-->
          <el-table-column label="期号名称" prop="ISSUE_NAME" sortable="custom" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.issueName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="期号状态" prop="writeState" sortable="custom" width="180" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.writeState }}</span>
            </template>
          </el-table-column>
            <el-table-column label="发布日期" prop="CREATE_DATE" sortable="custom" width="180" align="center">
                <template slot-scope="scope">
                   <span>{{ scope.row.createDate }}</span>
                </template>
             </el-table-column>
          <el-table-column label="备注" prop="COMMENTS" sortable="custom">
                <template slot-scope="scope">
                   <span>{{ scope.row.comments }}</span>
                </template>
             </el-table-column>
          <el-table-column label="操作" width="150" >
            <template slot-scope="scope">
              <div class="operates">
                <a href="javaScript:;" @click="getTogether(scope.row.id)" title="汇总" class="green" size="small">汇总</a>
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
  import {issueList} from  'src/axios/trade/shortage/buyerRole/shortageUpList'
  import {priceFormat,keyBoardEnter} from "src/utils";


  export default {
    name:'orderItemStaticList',
    data () {
      return {
        resData: this.metaData(),
        currentOrder:undefined,
        query: this.metaQuery(), // 查询初始化
        expanded:true,
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
      metaData () {
        return {// 前后台交互数据封装格式
          orderBy:undefined,
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
      resetForm () {
        this.query=this.metaQuery()
        this.list()
      },
      metaQuery () { // 表单查询数据初始化
        return {

            searchIssueName: undefined,
            searchIssueState: undefined

        }
      },
      // ------------------------------------------------- 处理方法 ----------------------------------------
      //  获取用户分页列表
      list () {
        this.resData.orderBy=this.currentOrder;
        issueList(this.resData, this.query).then(res => {
          this.resData = res.data
           if(this.resData.pageNum === 0 ){
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
      sortChang(value){
        let sortType=" desc"
        if(value.order.startsWith("asc")){
          sortType=" asc";
        }
        this.currentOrder=value.prop + sortType;
        this.list()
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
      getTogether(id){
        this.$router.push("/trade/dataReport/superviseRoleList/"+id)
      }
    }
  }
</script>
