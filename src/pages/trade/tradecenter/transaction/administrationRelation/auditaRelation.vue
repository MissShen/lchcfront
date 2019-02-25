<template>
  <div>
    <!-- ========================== 主内容start ========================= -->
    <!-- 表格 -->
    <div class="tablebox">
      <!-- 表格查询表单 -->
        <el-form ref="query" :model="query" label-position="right" size="small" :inline="true" class="table-form">
          <el-form-item class="width-130">
            <el-select v-model="query.searchCode" @keyup.enter.native="searchEnterFun" placeholder="请选择" size="small" >
              <el-option
                v-for="item in co"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="width-130">
            <el-input v-model="query.searchKeyCode" @keyup.enter.native="searchEnterFun" placeholder="请输入机构编码" size="small"></el-input>
          </el-form-item>
          <el-form-item class="width-130">
            <el-select v-model="query.searchMode" @keyup.enter.native="searchEnterFun" placeholder="请选择" size="small" >
              <el-option
                v-for="item in na"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="width-130">
           <el-input v-model="query.searchKeyWord" @keyup.enter.native="searchEnterFun" placeholder="请输入机构名称"  size="small"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="success" size="small" @click="searchEnterFun">查询</el-button>
            <el-button type="warning" size="small" @click="resetButton()">重置</el-button>
          </el-form-item>
        </el-form>
      <!-- 表格列表 -->
      <div class="tableset">
        <el-table
          :data="resData.list"
          @sort-change="sortChang"
          border
          stripe @selection-change="handleSelectionChange">
          <el-table-column type="selection" align="center"  width="40" class="selection" ></el-table-column>
         <!-- <el-table-column type="index" width="50" label="序号" header-align="left" align="center"></el-table-column>-->
          <el-table-column label="医疗机构编码" prop="buyer_code" sortable="custom">
            <template slot-scope="scope">
              {{ scope.row.buyerCode }}
            </template>
          </el-table-column>
          <el-table-column label="医疗机构名称" prop="buyer_abbr" sortable="custom">
            <template slot-scope="scope">
              <span>{{ scope.row.buyerAbbr }}</span>
            </template>
          </el-table-column>
          <el-table-column label="审核机构编码" prop="approve_code" sortable="custom">
            <template slot-scope="scope">
              {{ scope.row.approveCode }}
            </template>
          </el-table-column>
          <el-table-column label="审核机构名称" prop="approve_name" sortable="custom">
            <template slot-scope="scope">
              <span>{{ scope.row.approveName }}</span>
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

      <div class="foot-btn" >
        <div class="foot-left">
          <el-button type="success" size="small" @click="handleGoAdd">新增</el-button>
          <el-button type="danger" size="small" @click="handleGoDel">删除</el-button>
        </div>
      </div>

    </div>
    <!-- ========================== 主内容end ========================= -->
  </div>

</template>
<script>

  // 引入用户相关请求
  import {selectAuditRelationList,deleteAuditRelationList} from 'src/axios/trade/auditRelation/auditRelationConfig'
  import {priceFormat,keyBoardEnter} from "src/utils";

  export default {
    data () {
      return {
        activeName: 'first',  // 当前标签
        currentOrder:undefined,
        resData: this.metaData(),
        query: this.metaQuery(), // 查询初始化
        multipleSelection: [],
        showForm: false, // 表单可见性初始化
        showQuery: false, // 表单查询初始化
        defaultProps: {
          children: 'children',
          label: 'name',
          id: 'id'
        },
        co: [{
          value: 'buyerCode',
          label: '医疗机构编码'
        }, {
          value: 'approveCode',
          label: '审批机构编码'
        }],
        searchCode:'',
        na: [{
          value: 'buyerAbbr',
          label: '医疗机构名称'
        }, {
          value: 'approveAbbr',
          label: '审批机构名称'
        }],
        searchMode: ''
      }
    },
    created () {
      this.list()
    },
    methods: {
      // -------------------------------------------- 数据初始化  -----------------------------------------
      handleGoAdd(){
        this.$router.push("/trade/setting/auditaRelationAddList")
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      searchEnterFun(e){
        this.$store.state.pageSeach.pageNum = 1;
        this.resData.pageNum = 1;
        keyBoardEnter(e,() =>{
          this.list();
        })
      },
      handleGoDel(){
        if(this.multipleSelection.length<1){
          this.$alert('请选择要删除的信息', '提示', {
            confirmButtonText: '确定',
            type: 'warning',
          })
          return false
        }else{
          this.$confirm(`确定移除?`, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            var ids=[], arr = this.multipleSelection;
            for(var i=0; i<arr.length; i++){
              ids.push(arr[i].id)
            }
            deleteAuditRelationList(ids).then(res => {
              this.$message({
                message: "成功！",
                type: 'success',
                duration: 1000,
                onClose: () => {
                  window.history.go(0);
                  this.metaList()
                }
              })
            })
          }).catch(() => {
          });
        }
      },
      resetButton(){
        this.query = this.metaQuery();
        this.list()
      },
      metaData () {
        return {
           // 前后台交互数据封装格式
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
      metaQuery () { // 表单查询数据初始化
        return {

            id: undefined,
            searchKeyCode: undefined,
            searchKeyWord: undefined,
            searchCode: undefined,
            searchMode: undefined,
            buyerCode: undefined,
            approveCode: undefined,
            buyerAbbr: undefined,
            approveAbbr: undefined



        }
      },
      // ------------------------------------------------- 处理方法 ----------------------------------------
      //  获取用户分页列表
      list () {
        this.resData.orderBy=this.currentOrder;
        selectAuditRelationList(this.resData, this.query).then(res => {
          this.resData = res.data;
          if(this.resData.pageNum===0){
            this.resData.pageNum=1;
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

