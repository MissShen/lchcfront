<template>
<el-dialog
  title="添加医院机构"
  :visible.sync="dialogVisible"
  width="800px" height="520px"
  :close-on-click-modal="false">
  <div>

    <!-- 表格 -->
      <!-- 表格查询表单 -->
      <div class="table-form">
        <el-form ref="query" :model="query" label-position="right" size="small"  >
          <div class="formrow">
          <span>
                <el-input v-model="query.code" @keyup.enter.native="searchEnterFun" placeholder="机构编码"size="small" ></el-input>
            </span>
            <span>
                <el-input v-model="query.name" @keyup.enter.native="searchEnterFun" placeholder="机构名称"size="small" ></el-input>
            </span>
            <span>
                <el-button type="success" size="small" @click="searchEnterFun">查询</el-button>
                <el-button type="warning" size="small" @click="reset()">重置</el-button>
            </span>
          </div>
        </el-form>
      </div>

      <!-- 表格列表 -->
      <div class="tableset">
        <el-table
          :data="resData.list"
          border
          stripe >
          <!--<el-table-column type="index" width="50" header-align="left" align="center" label="序号"  ></el-table-column>-->
          <el-table-column label="编码">
            <template slot-scope="scope">
              {{ scope.row.code }}
            </template>
          </el-table-column>
          <el-table-column label="医疗机构名称" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column  width="50px" label="操作">
            <template slot-scope="scope">
             <a class="operation-btn" @click="selectGov(scope.row.id,scope.row.name,scope.row.abbr)">选择</a>
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
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">关闭</el-button>
  </span>
</el-dialog>
</template>
<script>

  // 引入用户相关请求
  import {selectAdministrationList,getCatOrgList} from 'src/axios/trade/transaction/transaction'
  import {priceFormat,keyBoardEnter} from "src/utils";

  export default {
    data () {
      return {
        activeName: 'first',  // 当前标签
        resData: this.metaData(),//返回初始化
        query: this.metaQuery(), // 查询初始化
        showForm: false, // 表单可见性初始化
        showQuery: false, // 表单查询初始化
        multipleSelection: [],
        dialogVisible:false,
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
      selectGov(id,name,abbr){
        this.dialogVisible = false;
        this.$emit('gov-child-popup',id,name,abbr);

      },
      govPopupParam(param){
        this.dialogVisible = true;
        this.param = param;
      },
      reset(){
        this.query = this.metaQuery();
        this.list();
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      metaData () {
        return {
          pageNum: 1,
          pageSize: 10,
          size: 3,
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
          navigatePages: 3,
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
          id: undefined,
          code: undefined,
          name: undefined,
          param:''
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
        getCatOrgList(this.resData, this.query).then(res => {
          this.resData = res.data;
          if(this.resData.pageNum === 0){
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
      }
    }
  }
</script>

