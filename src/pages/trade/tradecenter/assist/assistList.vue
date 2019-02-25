<template>
  <div>
    <!-- ========================== 主内容start ========================= -->
    <!-- 表格 -->
    <div class="tablebox">
      <!-- 表格查询表单 -->
        <el-form ref="query" :model="query" label-position="right" size="small" :inline="true" class="table-form">
            <el-form-item class="width-130">
              <el-input v-model="query.searchDeclareName" @keyup.enter.native="searchEnterFun" placeholder="申报名称" size="small"></el-input>
            </el-form-item>
            <el-form-item class="width-130">
              <el-select v-model="query.searchDeclareState" @keyup.enter.native="searchEnterFun" size="small" placeholder="申报状态">
                <el-option label="全部" value=""></el-option>
                <el-option label="开始上报" value="1"></el-option>
                <el-option label="结束上报" value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
                <el-date-picker type="date" size="small" placeholder="发布日期" @keyup.enter.native="searchEnterFun" format="yyyy-MM-dd" value-format="yyyy-MM-dd" v-model="query.searchBenDate"></el-date-picker>
                &nbsp;至&nbsp;
                <el-date-picker type="date" size="small" placeholder="发布日期" @keyup.enter.native="searchEnterFun" format="yyyy-MM-dd" value-format="yyyy-MM-dd" v-model="query.searchEndDate"></el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type="success" @click="searchEnterFun" size="small">查询</el-button>
                <el-button type="warning" size="small" @click="reset()">重置</el-button>
            </el-form-item>
        </el-form>
      <!-- 表格列表 -->
      <div class="tableset">
        <el-table
          :data="resData.list"
          border
          stripe  ref="multipleTable"
          @sort-change="sortChang"
        >
          <!--<el-table-column type="index" width="80" label="序号" header-center="left" align="center"></el-table-column>-->
          <el-table-column label="申报名称" prop="DECLARE_NAME" sortable="custom" min-width="200"  >
            <template slot-scope="scope">
              <span>{{ scope.row.declareName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="申报状态" min-width="100" prop="DECLARE_STATE" sortable="custom" align="center"  >
            <template slot-scope="scope">
              <span>{{getState(scope.row.declareState) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="发布日期" width="180" prop="CREATE_DATE" sortable="custom" align="center" >
            <template slot-scope="scope">
              <span>{{ scope.row.createDate }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="150">
            <template slot-scope="scope">
              <div class="operates">
                <a href="javaScript:;" class="green"  @click="goEdit(scope.row.id)" >修改</a>
                <a href="javaScript:;" class="green" @click="goInfo(scope.row.id)">查看</a>
                <a href="javaScript:;" class="green" @click="show(scope.row)">备注</a>
              </div>
            </template>
          </el-table-column>
          <el-table-column  type="expand" width="50">
            <template slot-scope="scope">
              <el-form label-position="left"  height="30px" inline class="demo-table-expand">
                <el-form-item label="备注:" class="nomar">
                  <span>{{ scope.row.comments }}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
        </el-table>
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
      <div class="foot-btn">
        <div class="foot-left">
          <el-button type="success" size="small" @click="goAdd">新增</el-button>
        </div>
      </div>
    </div>
    <!-- ========================== 主内容end ========================= -->
  </div>

</template>
<script>

  // 引入数据请求
  import {selectAssistList} from 'src/axios/trade/assist/assistConfig'
  import {keyBoardEnter} from "src/utils";
  export default {
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
        },
        expanded:true
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
            list: [],
            requestInfo:[]
        }
      },
      getState(state){
        var arrState = ['','开始上报','上报结束'];
        return arrState[state];
      },
      show(row){
        this.$refs.multipleTable.toggleRowExpansion(row,this.expanded);
        this.expanded = !this.expanded
      },
      metaQuery () { // 表单查询数据初始化
        return {
            searchDeclareName: undefined,
            searchBenDate:  undefined,
            searchEndDate:  undefined,
            searchDeclareState:  undefined
        }
      },
      // ------------------------------------------------- 处理方法 ----------------------------------------
      //  获取用户分页列表
      list () {
        this.resData.orderBy=this.currentOrder;
        selectAssistList(this.resData, this.query).then(res => {
          this.resData = res.data;
          if(this.resData.pageNum===0){
            this.resData.pageNum=1
          }
        })
      },
      reset(){
        this.query=this.metaQuery();
        this.list();
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
        this.resData.pageSize = val;
        this.list()
      },
      handleCurrentChange (val) {
        this.resData.pageNum = val;
        this.list()
      },
      goAdd () {
        this.$router.push("/trade/dataReport/assistAdd");
      },
      goInfo(id) {
        this.$router.push("/trade/dataReport/assistInfo/" + id);
      },
      goEdit(id) {
        this.$router.push("/trade/dataReport/assistUpdate/" + id);
      }
    }
  }
</script>
