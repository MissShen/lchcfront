<template>
  <div>
    <!-- ========================== 主内容start ========================= -->
    <!-- 表格 -->
    <div class="tablebox">
      <!-- 表格查询表单 -->
        <el-form ref="query" :model="query" label-position="right" size="small" :inline="true" class="table-form" >
          <el-form-item class="width-130">
            <el-input v-model="query.orgName" @keyup.enter.native="searchEnterFun" size="small" placeholder="下级机构名称"></el-input>
          </el-form-item>
          <el-form-item class="width-130">
            <el-input v-model="query.parentOrgName" @keyup.enter.native="searchEnterFun" size="small" placeholder="上级机构名称"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="success" size="small" @click="searchEnterFun">查询</el-button>
            <el-button type="warning" size="small" @click="reset()">重置</el-button>
          </el-form-item>
        </el-form>
      <!-- 表格列表 -->
      <div class="tableset">
        <el-table
          :data="resData.list"
          border @selection-change="handleSelectionChange"
          @sort-change="sortChang"
          tooltip-effect="dark"
          stripe >
          <el-table-column type="selection" align="center" width="50"></el-table-column>
         <!-- <el-table-column type="index" width="50" header-align="left" align="center" label="序号"  ></el-table-column>-->
          <el-table-column label="下级机构名称" prop="org_name" sortable="custom" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.orgName}}</span>
            </template>
          </el-table-column>
          <el-table-column label="上级机构名称" prop="parent_org_name" sortable="custom" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.parentOrgName}}</span>
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
          <el-button type="success"  size="small" @click="handleGoAdd()">
            新增
          </el-button>
          <el-button type="danger" size="small" @click="deleteRelation()">
            删除
          </el-button>
        </div>

      </div>
    </div>
    <!-- ========================== 主内容end ========================= -->
  </div>

</template>
<script>

  // 引入用户相关请求
  import {selectAdministrationList,deleteTransactionById} from 'src/axios/trade/transaction/transaction'
  import {priceFormat,keyBoardEnter} from "src/utils";

  export default {
    data () {
      return {
        activeName: 'first',  // 当前标签
        currentOrder:undefined,
        resData: this.metaData(),//返回初始化
        query: this.metaQuery(), // 查询初始化
        showForm: false, // 表单可见性初始化
        showQuery: false, // 表单查询初始化
        multipleSelection: [],
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
      handleGoAdd(){
          this.$router.push("auditaAddList")
      },
      reset(){
        this.query = this.metaQuery();
        this.list();
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      deleteRelation(){
        if(this.multipleSelection.length<1){
          this.$alert('请选择要删除的信息', '信息', {
            confirmButtonText: '确定',
          });
          return false;
        }else {
          this.$confirm('确认删除', '信息', {
            cancelButtonText: '取消',
            confirmButtonText: '确定',
            type: 'warning'
          }).then(() => {
            let ids = [],arr = this.multipleSelection;
            for(let i = 0; i < arr.length; i++){
              ids.push(arr[i].id);
            }
            deleteTransactionById(ids).then( res => {
                this.$message({
                  type: 'success',
                  duration: 1000,
                  message: '删除成功!',
                  onClose: () => {
                    window.history.go(0);
                    this.metaList()
                  }
                });
            });
          });
        }

      },
      searchEnterFun(e){
        this.$store.state.pageSeach.pageNum = 1;
        this.resData.pageNum = 1;
        keyBoardEnter(e,() =>{
          this.list();
        })
      },
      metaData () {
        return {
           // 前后台交互数据封装格式
          orderBy:undefined,
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
            id: undefined,
            searchOrgName: undefined,
            parentOrgName: undefined,
        }
      },
      // ------------------------------------------------- 处理方法 ----------------------------------------
      //  获取用户分页列表
      list () {
        this.resData.orderBy=this.currentOrder;
        selectAdministrationList(this.resData, this.query).then(res => {
          this.resData = res.data;
          if(this.resData.pageNum === 0){
            this.resData.pageNum = 1
          }
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
      }
    }
  }
</script>

