<template>
  <div>
    <!-- ========================== 主内容start ========================= -->
    <!-- 表格 -->
    <div class="tablebox">
      <!-- 表格查询表单 -->
        <el-form ref="query" :model="query" label-position="right" size="small" :inline="true" class="table-form">
          <el-form-item>
            <el-input v-model="query.searchRealName" @keyup.enter.native="searchEnterFun" placeholder="区域名称"></el-input>
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
                @sort-change="sortChang"
        >
          <!--<el-table-column type="index" width="50" header-align="left" align="center" label="序号"></el-table-column>-->
          <el-table-column label="区域编码" prop="c.code" sortable="custom">
            <template slot-scope="scope">
              {{ scope.row.code }}
            </template>
          </el-table-column>
          <el-table-column label="区域名" prop="c.name_chn" sortable="custom">
            <template slot-scope="scope">
              {{ scope.row.nameChn }}
            </template>
          </el-table-column>
          <el-table-column label="二审" width="100" align="center" >
            <template slot-scope="scope">
              <span>{{ scope.row.flag == 1 ? '是' : '否'}}</span>
            </template>
          </el-table-column>

          <el-table-column label="操作" width="150">
            <template slot-scope="scope">
              <div class="operates">
               <a class="green" @click="deleteSecond(scope.row.id,scope.row.flag,scope.row.contractId)">{{ scope.row.flag == 1 ? '取消' : '设置' }}</a>
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
  import {selectParameterSettingList,deleteParameterSettingInfo,insertParameterSettingInfo} from 'src/axios/trade/audit/auditConfig'
  import {priceFormat,keyBoardEnter} from "src/utils";


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

      resetForm(){
        this.query = this.metaQuery();
        this.list()
      },
      searchEnterFun(e){
        this.$store.state.pageSeach.pageNum = 1;
        this.resData.pageNum = 1;
        keyBoardEnter(e,() =>{
          this.list();
        })
      },
      deleteSecond(id,flag){
        if(flag == 1){
          deleteParameterSettingInfo(id).then(res => {
            this.$message({
              message: "取消成功！",
              type: 'success',
              duration: 1000,
              onClose: () => {
                this.list()
              }
            })
          })
        }else {
          insertParameterSettingInfo(id).then(res => {
            this.$message({
              message: "设置成功！",
              type: 'success',
              duration: 1000,
              onClose: () => {
                this.list()
              }
            })
          })
        }
      },
      metaData () {
        return {
          // 前后台交互数据封装格式
          orderBy: undefined,
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
            id: "",
            searchSenderName:"",
            searchSenderAbbr: "",
            searchRealName: "",
        }
      },
      // ------------------------------------------------- 处理方法 ----------------------------------------
      //  获取用户分页列表
      list () {
        this.resData.orderBy=this.currentOrder;
        selectParameterSettingList(this.resData, this.query).then(res => {
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

