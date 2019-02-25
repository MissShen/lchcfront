<template>
  <div>
    <!-- ========================== 主内容start ========================= -->
    <!-- 表格 -->
    <div class="tablebox">
      <!-- 表格查询表单 -->
        <el-form ref="query" :model="query" label-position="right" size="small" :inline="true" class="table-form">
          <el-form-item class="width-130">
               <el-input  v-model="query.searchIssueName" @keyup.enter.native="searchEnterFun"   placeholder="期号名称" size="small"></el-input>
           </el-form-item>
           <el-form-item class="width-130">
             <el-select v-model="query.searchIssueState" @keyup.enter.native="searchEnterFun"  placeholder="期号状态" size="small">
                <el-option label="==全部==" value=""></el-option>
                <el-option label="开始上报" value="1"></el-option>
                <el-option label="结束上报" value="2"></el-option>
             </el-select>
           </el-form-item>
            <el-form-item>
                 <el-date-picker type="date" @keyup.enter.native="searchEnterFun"  placeholder="选择发布开始日期" format="yyyy-MM-dd"  value-format="yyyy-MM-dd" size="small" v-model="query.searchBenDate" ></el-date-picker>
                 &nbsp;至&nbsp;
                 <el-date-picker type="date" @keyup.enter.native="searchEnterFun"  placeholder="选择发布结束日期" format="yyyy-MM-dd"  value-format="yyyy-MM-dd" size="small" v-model="query.searchEndDate"  ></el-date-picker>
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
          border
          stripe
          ref="multipleTable"
          @sort-change="sortChang"
        >
          <el-table-column  type="expand">
            <template slot-scope="scope">
              <el-form label-position="left"  height="30px" inline class="demo-table-expand">
                <el-form-item label="备注" class="nomar">
                  <span> ： {{ scope.row.comments }}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <!--<el-table-column label="序号" header-align="left" align="center" type="index" width="50"></el-table-column>-->
          <el-table-column label="期号名称" prop="ISSUE_NAME" sortable="custom" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.issueName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="期号状态" prop="writeState" sortable="custom">
            <template slot-scope="scope">
              <span>{{ scope.row.writeState }}</span>
            </template>
          </el-table-column>
            <el-table-column label="发布日期" prop="CREATE_DATE" sortable="custom">
                <template slot-scope="scope">
                   <span>{{ scope.row.createDate }}</span>
                </template>
             </el-table-column>
          <el-table-column label="备注" width="80">
            <template slot-scope="scope">
              <div class="operates">
                <a href="javaScript:;" class="green" @click="show(scope.row)">查看</a>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="80">
            <template slot-scope="scope">
              <div class="operates">
                <a href="javaScript:;" @click="addOrUpdateIssue(scope.row.id)" title="修改" class="green" size="small">修改</a>
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
      <div class="foot-btn">
        <div class="foot-left">
          <el-button type="success" size="small" @click="addOrUpdateIssue('0')">新增</el-button>
        </div>
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
        currentOrder: undefined,
        resData: this.metaData(),
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
      sortChang(value){
        let sortType=" desc"
        if(value.order.startsWith("asc")){
          sortType=" asc";
        }
        this.currentOrder=value.prop + sortType;
        this.list()
      },
      metaData () {
        return {// 前后台交互数据封装格式
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
      searchEnterFun(e){
        this.$store.state.pageSeach.pageNum = 1;
        this.resData.pageNum = 1;
        keyBoardEnter(e,() =>{
          this.list();
        })
      },
      resetForm () {
        this.query=this.metaQuery()
        this.list()
      },
      metaQuery () { // 表单查询数据初始化
        return {

            searchIssueName: undefined,
            searchIssueState: undefined,
            searchBenDate:undefined,
            searchEndDate:undefined

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
      // ************************ 分页操作 ************************
      handleSizeChange (val) {
        this.resData.pageSize = val
        this.list()
      },
      handleCurrentChange (val) {
        this.resData.pageNum = val
        this.list()
      },
      addOrUpdateIssue(id){
        this.$router.push("/trade/dataReport/addOrUpdateIssue/"+id)
      },
        show(row){
        this.$refs.multipleTable.toggleRowExpansion(row,this.expanded)
        this.expanded = !this.expanded
      }
    }
  }
</script>
