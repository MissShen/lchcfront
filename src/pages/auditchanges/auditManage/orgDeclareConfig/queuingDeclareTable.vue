<template>
  <div>
    <!-- ========================== 主内容start ========================= -->

    <!-- 表格 -->
    <div class="tablebox">
      <!-- 表格查询表单 -->
      <el-form ref="query" :model="query" label-position="right" size="small" :inline="true" class="table-form">

        <el-form-item class="width-150">
          <el-input v-model="query.NAME" placeholder="企业名称" size="small"
                    @keyup.enter.native="searchEnterFun"></el-input>
        </el-form-item>

        <el-form-item class="width-150">
          <el-input v-model="query.CREDITCODE" placeholder="社会统一信用代码" size="small"
                    @keyup.enter.native="searchEnterFun"></el-input>
        </el-form-item>

        <el-form-item class="width-150">
          <el-input v-model="query.ORGANIZECODE" placeholder="组织机构代码" size="small"
                    @keyup.enter.native="searchEnterFun"></el-input>
        </el-form-item>

        <el-form-item>
          <el-date-picker type="date" placeholder="审核开始时间" v-model="query.BEGINDATE" size="small"></el-date-picker>
        </el-form-item>

        <el-form-item>
          <el-date-picker type="date" placeholder="审核结束时间" v-model="query.ENDDATE" size="small"></el-date-picker>
        </el-form-item>

        <el-form-item>
          <el-button type="success" @click="searchEnterFun" size="small">查询</el-button>
          <el-button type="warning" @click="resetForm" size="small">重置</el-button>
        </el-form-item>
      </el-form>

      <!-- 表格列表 -->
      <div class="tableset">
        <el-table
          :data="resData.list"
          @selection-change="handleSelectionChange"
          border
          ref="mainTable"
          :row-key="getRowKeys"
          @sort-change="sortChange"
          stripe>
          <el-table-column type="selection" width="50" align="center" :reserve-selection="true"/>
          <el-table-column label="序号" type="index" width="50"></el-table-column>
          <el-table-column label="企业名称" width="120" sortable="custom" prop="NAME">
            <template slot-scope="scope">
              <span>{{scope.row.NAME}}</span>
            </template>
          </el-table-column>
          <el-table-column label="企业简称" show-overflow-tooltip sortable="custom" prop="ABBR">
            <template slot-scope="scope">
              <span>{{ scope.row.ABBR }}</span>
            </template>
          </el-table-column>
          <el-table-column label="社会统一信用代码" width="180" sortable="custom" prop="CREDIT_CODE">
            <template slot-scope="scope">
              <span>{{ scope.row.CREDIT_CODE}}</span>
            </template>
          </el-table-column>
          <el-table-column label="组织机构代码" width="180" sortable="custom" prop="ORGANIZE_CODE">
            <template slot-scope="scope">
              <span>{{ scope.row.ORGANIZE_CODE }}</span>
            </template>
          </el-table-column>
          <el-table-column label="审核时间" sortable="custom" prop="CHECK_DATE">
            <template slot-scope="scope">
              <span>{{ scope.row.CHECK_DATE }}</span>
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
          <el-button type="success" size="small" @click="updateStatusByIds()">
            勾选移出待挂网
          </el-button>
          <el-button type="danger" size="small" @click="outAll()">
            全部移出待挂网
          </el-button>
          <el-button type="danger" size="small" @click="allDeclare()">
            全部挂网
          </el-button>
        </div>
      </div>

    </div>
  </div>

</template>
<script>

  // 引入用户相关请求
  import {
    list,
    updateAllStatus,
    updateStatusByIds,
    declareAll
  } from 'src/axios/auditchanges/auditManage/orgDeclareConfig'
  import {keyBoardEnter} from "src/utils";

  export default {
//    components: {},
    data () {
      return {
        deleteDataList: [],
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

    created() {
      if (!!this.$store.state.pageSeach.pageNum) {
        this.query = this.$store.state.pageSeach;
        this.resData.pageSize = this.$store.state.pageSeach.pageSize;
        this.resData.pageNum = this.$store.state.pageSeach.pageNum;
      }
      this.list();
    },

    methods: {

      sortChange(value){
        let sortType = " desc";
        if (value.order != null) {
          if (value.order.startsWith("asc")) {
            sortType = " asc";
          }
          this.query.orderBy = value.prop + sortType;
          this.list()
        }
      },

      searchEnterFun(e){
        this.$store.state.pageSeach.pageNum = 1;
        this.resData.pageNum = 1;
        keyBoardEnter(e, () => {
          this.list();
        })
      },
      getRowKeys(row){
        return row.ROW_ID;
      },

      list () {
        this.$store.state.pageSeach = this.query;
        //初始表格数据
        list(this.query, this.resData).then(res => {
          this.resData = res.data;
          if (this.resData.pageNum == 0) {
            this.resData.pageNum = 1
          }
        });
      },

      //重置
      resetForm(){
        this.$refs.mainTable.clearSelection();
        this.query = this.metaQuery();
        this.resData = this.metaData();
        this.list();
      },

      handleSelectionChange(val){
        this.deleteDataList = val;
      },

      //勾选移入
      updateStatusByIds(){
        if (this.deleteDataList.length < 1) {
          this.$alert('请至少选择一条数据', '提示', {
            confirmButtonText: '确定',
            type: 'warning',
          });
          return false
        } else {
          this.$confirm('确定移出选中' + this.deleteDataList.length + '的条数据吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            var ids = [];
            for (var row of this.deleteDataList) {
              ids.push(row.ID);
            }
            updateStatusByIds(ids.toString(), "5").then(res => {
              this.$message({
                message: res.data,
                type: 'success',
                duration: 1000,
                onClose: () => {
                  this.$refs.mainTable.clearSelection();
                  this.list()
                }
              })
            })
          }).catch(() => {
          });
        }
      },

      outAll() {
        this.$confirm('确定全部移出待挂网？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          updateAllStatus("5").then(res => {
            this.$message({
              message: res.data,
              type: 'success',
              duration: 1000,
              onClose: () => {
                this.list()
              }
            })
          })
        }).catch(() => {
        });
      },

      allDeclare(){
        this.$confirm('确定全部挂网？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          declareAll().then(res => {
            this.$message({
              message: res.data,
              type: 'success',
              duration: 1000,
              onClose: () => {
                this.list()
              }
            })
          })
        }).catch(() => {
        });
      },

      // -------------------------------------------- 数据初始化  -----------------------------------------
      metaQuery()
      { // 表单查询数据初始化
        return {
          STATE: "5",
          NAME: "",
          CREDITCODE: "",
          ORGANIZECODE: "",
          BEGINDATE: undefined,
          ENDDATE: undefined
        }
      }
      ,

      metaData(){
        return {
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

      // ************************ 分页操作 ************************
      handleSizeChange(val)
      {
        this.resData.pageSize = val;
        this.$store.state.pageSeach.pageSize = val;
        this.list()
      }
      ,

      handleCurrentChange(val)
      {
        this.resData.pageNum = val;
        this.$store.state.pageSeach.pageNum = val;
        this.list()
      }
    }
  }
</script>

