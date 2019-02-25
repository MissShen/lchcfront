<template>
  <div>
    <!-- ========================== 主内容start ========================= -->

    <!-- 表格 -->
    <div class="tablebox">
      <!-- 表格查询表单 -->
        <el-form ref="query" :model="query" label-position="right" size="small" :inline="true" class="table-form">
            <el-form-item>
              <el-select v-model="query.searchType" size="small">
                <el-option label="企业名称" value="0"></el-option>
                <el-option label="企业编码" value="1"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item>
              <el-input v-model="query.searchText" placeholder="关键词" size="small" @keyup.enter.native="searchEnterFun"></el-input>
            </el-form-item>

            <el-form-item>
              <el-button type="success" @click="searchEnterFun" size="small">查询</el-button>
              <el-button type="warning" @click="resetForm()" size="small">重置</el-button>
            </el-form-item>
        </el-form>

      <div class="foot-btn">
        <div class="foot-left">
          <el-button type="primary" size="small" @click="handleRestore()">还原</el-button>
        </div>
      </div>

      <!-- 表格列表 -->
      <div class="tableset">
        <el-table ref="multipleTable"
          :row-key="getRowKeys"
          :data="resData.list"
          @selection-change="handleSelectionChange"
          @sort-change="sortChangeFunc"
          border
          stripe>
          <el-table-column type="selection" :reserve-selection="true" width="50" align="center"></el-table-column>
          <el-table-column label="企业类型" prop="retail_type" sortable="custom" width="180">
            <template slot-scope="scope">
              <span>{{ scope.row.retailType }}</span>
            </template>
          </el-table-column>
          <el-table-column label="企业代码" prop="code" sortable="custom" width="160">
            <template slot-scope="scope">
              <span>{{ scope.row.code }}</span>
            </template>
          </el-table-column>
          <el-table-column label="企业名称" prop="name" sortable="custom" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column label="企业简称" prop="abbr" sortable="custom" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.abbr }}</span>
            </template>
          </el-table-column>
          <el-table-column
                  fixed="right"
                  label="操作"
                  width="100">
            <template slot-scope="scope">
              <div class="operates"><a href="javascript:;" class="operation-btn" size="small" @click="goInfo(scope.row.id)">查看</a></div>
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
  import {retailRecycleList,restore} from 'src/axios/datacenter/orgdata/retailorg/retailorg'
  import {keyBoardEnter} from "src/utils";

  export default {
    data () {
      return {
        activeName: '2',  // 当前标签
        resData: this.metaData(),
        query: this.metaQuery(), // 查询初始化
        showForm: false, // 表单可见性初始化
        showQuery: false, // 表单查询初始化
        restoreDataList:[],
        defaultProps: {
          children: 'children',
          label: 'name',
          id: 'id'
        }
      }
    },
    created () {
      if(!!this.$store.state.pageSeach.pageNum){
        this.query=this.$store.state.pageSeach;
        this.resData.pageSize=this.$store.state.pageSeach.pageSize;
        this.resData.pageNum=this.$store.state.pageSeach.pageNum;
      }
      this.$store.state.pageSeach=this.query;
      this.list()
    },
    methods: {
      // -------------------------------------------- 数据初始化  -----------------------------------------
      // 前后台交互数据封装格式
      metaData () {
        return {
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
          searchType: '0',
          searchText: undefined,
          orderBy:undefined,
        }
      },
      // ------------------------------------------------- 处理方法 ----------------------------------------
      //  排序查询
      sortChangeFunc(value){
        let sortType=" desc"
        if(value.order != null) {
          if (value.order.startsWith("asc")) {
            sortType = " asc";
          }
          this.query.orderBy = value.prop + sortType;
          this.list();
        }
      },
      //  回车查询
      searchEnterFun:function (e){
        this.$store.state.pageSeach.pageNum = 1;
        this.resData.pageNum=1;
        keyBoardEnter(e, () => {
          this.list2();
        })
      },
      //  查询
      search(){
        this.$store.state.pageSeach.pageNum=1;
        this.resData.pageNum=1;
        this.list2();
      },
      //  查询重置
      list2 () {
        this.$refs.multipleTable.clearSelection();
        this.$store.state.pageSeach=this.query;
        retailRecycleList(this.resData, this.query).then(res => {
          this.resData = res.data
      })
      },
      //  获取用户分页列表
      list () {
        this.$store.state.pageSeach=this.query;
        retailRecycleList(this.resData, this.query).then(res => {
          this.resData = res.data
        })
      },
      //  重置
      resetForm() {
        this.query = this.metaQuery();
        this.resData= this.metaData();
        this.list2();
      },
      getRowKeys(row){
        return row.id;
      },
      //  还原选中的记录
      handleSelectionChange(val){
        this.restoreDataList=val;
      },
      handleRestore() {
        if (this.restoreDataList.length < 1) {
          this.$alert('请至少选择一条数据', '提示', {
            confirmButtonText: '确定',
            type: 'warning',
          });
          return false;
        } else {
          this.$confirm(`确定还原选中的`+this.restoreDataList.length+`条数据吗?`, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            var ids = [];
            for (var row of this.restoreDataList) {
              ids.push(row.id);
            }
            restore(ids.toString()).then(res => {
              this.$message({
                      message: res.data,
                      type: 'success',
                      duration: 1000,
                      onClose: () => {
                      this.list();
                      this.$refs.multipleTable.clearSelection();
                  }
               })
            })
        }).catch(() => {
          });
        }
      },
      //  跳转详情页面
      goInfo(id){
        this.$router.push("/DATA/basedata/orgdata/retailorg/retail/info/" + id);
      },
      // ************************ 分页操作 ************************
      handleSizeChange (val) {
        this.resData.pageSize = val;
        this.$store.state.pageSeach.pageSize=val;
        this.list();
      },
      handleCurrentChange (val) {
        this.resData.pageNum = val;
        this.$store.state.pageSeach.pageNum=val;
        this.list();
      }
    }
  }
</script>

