<template>
  <div>
    <!-- ========================== 主内容start ========================= -->
    <!-- 表格 -->
    <div class="tablebox">
      <!-- 表格查询表单 -->
      <div class="table-form">
        <el-form ref="query" :model="query" label-position="right" size="small">
          <div class="formrow">
            <span>
                <el-select v-model="query.searchKey" @keyup.enter.native="searchEnterFun" placeholder="投诉对象" size="small">
                  <el-option label="生产企业" value="producer"></el-option>
                  <el-option label="配送企业" value="sender"></el-option>
                </el-select>
            </span>
            <span>
                <el-input v-model="query.description" @keyup.enter.native="searchEnterFun" placeholder="投诉原因" size="small"></el-input>
            </span>
            <span>
                <el-button type="success" @click="searchEnterFun" size="small">查询</el-button>
                <el-button type="warning" size="small" @click="resetQuery()">重置</el-button>
            </span>
          </div>
        </el-form>
      </div>


      <!-- 表格列表 -->
      <div class="tableset">
        <el-table
          :data="resData.list"
          border
          stripe>
          <!--<el-table-column type="index" width="50" header-align="left" align="center" label="序号"></el-table-column>-->
          <el-table-column label="投诉原因" show-overflow-tooltip>
            <template slot-scope="scope">
              {{ scope.row.description }}
            </template>
          </el-table-column>
          <el-table-column label="投诉对象">
            <template slot-scope="scope">
              <span>{{ scope.row.beComplainedOrgName }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="deductionScore" sortable width="120" align="right" label="投诉分值"></el-table-column>
<!--
          <el-table-column label="投诉分值" sortable width="120" align="right">
            <template slot-scope="scope">
              {{ scope.row.deductionScore }}
            </template>
          </el-table-column>-->

          <el-table-column label="操作" width="150">
            <template slot-scope="scope">
              <span><a @click="addOrUpdateReason(scope.row.id)" title="修改" class="operation-btn">修改</a></span>
              <span><a @click="changeEnableFlag(scope.row.id,scope.row.enableFlag,scope.row.enableFlagName)" title="关闭启用" class="operation-btn">{{ scope.row.enableFlagName}}</a></span>
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
          <el-button type="success" size="small" @click="addOrUpdateReason(0)">
            新增
          </el-button>
        </div>
      </div>
    </div>
    <!-- ========================== 主内容end ========================= -->
  </div>

</template>
<script>

  // 引入用户相关请求
  import {complaintReasonManageList,changeEnableFlag} from 'src/axios/trade/evaluate/evaluate'
  import {priceFormat,keyBoardEnter} from "src/utils";

  export default {
    name:'complaint-reason-manage-list',
    data () {
      return {
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
      metaData () {
        return {
         // 前后台交互数据封装格式
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

            searchKey:undefined,
            description:undefined

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
        complaintReasonManageList(this.resData, this.query).then(res => {
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
      addOrUpdateReason(id){
        this.$router.push("/trade/manage/addOrUpdateReason/"+id)
      },
      resetQuery() {
        this.query = this.metaQuery();
        this.list()
      },
      changeEnableFlag(id,enableFlag,enableFlagName){
        this.$confirm('确定'+enableFlagName+'?', '提示', {
          cancelButtonText: '取消',
          confirmButtonText: '确定',
          type: 'warning'
        }).then(() => {
          changeEnableFlag(id,enableFlag).then(res => {
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
      }
    }
  }
</script>

