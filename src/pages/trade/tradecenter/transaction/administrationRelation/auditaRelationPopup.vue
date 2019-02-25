<template>
  <el-dialog title="添加机构" width="700px" height="620"
    :close-on-click-modal="false"
    :visible.sync="visible">
  <div>
    <!-- ========================== 主内容start ========================= -->

    <!-- 表格 -->
    <div class="tablebox">
      <!-- 表格查询表单 -->
      <div class="table-form">
        <el-form ref="query" :model="query" label-position="right" size="small" class="demo-form-inline">
          <div class="formrow">
            <span>
               <el-form-item>
                 <el-input v-model="query.searchCode" @keyup.enter.native="searchEnterFun"  type="hidden" style="width:0"></el-input>
                 <el-input v-model="query.searchKeyCode" @keyup.enter.native="searchEnterFun"  placeholder="请输入机构编码"></el-input>
               </el-form-item>
            </span>
            <span>
              <el-form-item>
                <el-input v-model="query.searchMode" @keyup.enter.native="searchEnterFun"   type="hidden" style="width:0"></el-input>
                <el-input v-model="query.searchKeyWord" @keyup.enter.native="searchEnterFun"  placeholder="请输入机构名称"></el-input>
              </el-form-item>
            </span>
            <span>
              <el-form-item>
                <el-button type="warning" @click="searchEnterFun">查询</el-button>
                <el-button type="primary" @click="resetButton()">重置</el-button>
              </el-form-item>
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
          <!--<el-table-column type="index" width="50" label="序号"></el-table-column>-->
          <el-table-column label="医疗机构编码" >
            <template slot-scope="scope">
              {{ scope.row.buyerCode }}
            </template>
          </el-table-column>
          <el-table-column label="医疗机构名称">
            <template slot-scope="scope">
              <span>{{ scope.row.buyerAbbr }}</span>
            </template>
          </el-table-column>
          <el-table-column width="50" label="操作">
            <template slot-scope="scope">
              <el-button size="small" type="text"  v-on:click="selectHospital(scope.row.buyerOrgid,scope.row.approveOrgid,scope.row.buyerAbbr)">选择</el-button>
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
  </el-dialog>
</template>
<script>

  // 引入用户相关请求
  import {selectAuditRelationList} from 'src/axios/trade/auditRelation/auditRelationConfig'
  import {priceFormat,keyBoardEnter} from "src/utils";

  export default {
    data () {
      return {
        props:'param',
        visible: false,
        activeName: 'first',  // 当前标签
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
        paramObject:{
          buyerOrgid: undefined,
          approveOrgid: undefined,
          buyerAbbr: undefined

        }
      }
    },
    created () {
      this.list()
    },
    methods: {
      // -------------------------------------------- 数据初始化  -----------------------------------------
      //给父组件传值
      selectHospital(buyerOrgid,approveOrgid,buyerAbbr){
        this.$emit('child-popup',buyerOrgid,approveOrgid,buyerAbbr);
        this.visible = false;
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      resetButton(){
        this.query = this.metaQuery();
        this.list();
      },
      metaData () {
        return {
            pageNum: 1,
            pageSize: 6,
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
            searchKeyCode: undefined,
            searchKeyWord: undefined,
            searchCode: 'buyerCode',
            searchMode: 'buyerAbbr',
            param: undefined
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
        selectAuditRelationList(this.resData, this.query).then(res => {
          this.resData = res.data
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
      //父组件调用
      popupParam(param){
        this.param = param
        this.visible = true
      }

    }
  }
</script>

