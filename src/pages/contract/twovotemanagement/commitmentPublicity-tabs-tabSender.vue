<template>
  <div>
    <!-- ========================== 主内容start ========================= -->

    <!-- 表格 -->
    <div class="tablebox">

      <!-- 表格查询表单 -->
        <el-form ref="query" :model="query"  :inline="true" class="table-form" onsubmit="return false;">

            <el-form-item>
              <el-input size="small" v-model="query.mechanismName" maxlength="200" placeholder="配送企业名称" @keyup.enter.native="searchEnterFun"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button size="small" type="success" @click="searchEnterFun">查询</el-button>
              <el-button size="small" type="warning" @click="resetForm()">重置</el-button>
            </el-form-item>

        </el-form>


      <!-- 表格列表 -->
      <div class="tableset">
        <el-table
          :data="resData.list"
          border stripe
          @sort-change="sortChange">
          <el-table-column label="单位名称" prop="mechanismName" sortable>
            <template slot-scope="scope">
              <span><a @click="findCommitmentSigned(scope.row.id,scope.row.orgType)">{{ scope.row.mechanismName }}两票制承诺函</a></span>
            </template>
          </el-table-column>
          <el-table-column label="签订时间" width="180" prop="signedDate" sortable>
            <template slot-scope="scope">
              <el-tooltip :enterable="false" class="item" effect="dark" placement="top-start">
                <div slot="content">{{ scope.row.signedDate }}</div>
                <span v-if="scope.row.signedDate!=null && scope.row.signedDate!=''">{{ moment(scope.row.signedDate).format("YYYY-MM-DD") }}</span>
                <span v-else></span>
              </el-tooltip>
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



      <!--  ====================================== 弹窗 ====================================== -->
      <!--  ====================================== 弹窗 ====================================== -->

      <el-dialog title="承诺书" :visible.sync="showCommitmentState" :before-close="closeForm" width="52%">
        <el-form :inline="true" ref="insertForm" :model="insertForm" class="demo-form-inline">
          <span v-html="this.templateContent"></span>
          <div>
            <p class="pcssd" align="right">公司名称：<img :src="this.insertForm.stampImage" /></p>
            <p class="pcssd" align="right">承诺时间：{{ moment(this.insertForm.signedDate).format("YYYY-MM-DD") }}</p>
          </div>
        </el-form>
        <span slot="footer">
          <el-button type="primary" @click="function(){showCommitmentState = false}">关闭</el-button>
        </span>

      </el-dialog>


    </div>
  </div>
</template>
<script>

  // 引入用户相关请求
  import {queryMechanismList} from 'src/axios/contract/twovotemanagement/commitmentPublicityType';
  import {findCommitmentSignedById} from 'src/axios/contract/twovotemanagement/commitmentSignedType';
  import moment from "moment";
  import { keyBoardEnter } from "src/utils"

  export default {
    data () {
      return {
        templateContent : undefined,
        currentOrder: undefined,
        resData: this.metaData(),
        query: this.metaQuery(), // 查询初始化
        id : undefined,
        showCommitmentState:false,//承诺书弹出框状态
        insertForm :this.formData()
      }
    },
    created () {
      this.list()
    },
    methods: {
      // -------------------------------------------- 数据初始化  -----------------------------------------
      moment,
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
          list: []
        }
      },
      metaQuery () { // 表单查询数据初始化
        return {
          query: {
            name: undefined,
            orgType:'sender'
          }
        }
      },
      formData(){
        return {
          query: {
            orgId: undefined,
            signedDate :undefined,
            stampImage: undefined
          }
        }
      },
      // ------------------------------------------------- 处理方法 ----------------------------------------
      //签订框弹出
      findCommitmentSigned(id,orgType){
        findCommitmentSignedById(id,orgType).then(res => {
          this.templateContent = res.data.content;
          this.insertForm.signedDate = res.data.signedDate;
          this.insertForm.stampImage = res.data.stampImage;
          this.showCommitmentState = true;
        })
      },
      closeForm(){
        this.showCommitmentState = false;
      },
      //  获取用户分页列表
      list () {
        this.resData.orderBy = this.currentOrder;
        this.query.orgType = 'sender';
        queryMechanismList(this.resData, this.query).then(res => {
          this.resData = res.data
          if(this.resData.pageNum === 0){
            this.resData.pageNum =1;
          }
        })
      },
      resetForm () {
        this.query = this.metaQuery();
        this.list();
      },
      // ************************
      handleSizeChange (val) {
        this.resData.pageSize = val;
        this.list();
      },
      handleCurrentChange (val) {
        this.resData.pageNum = val;
        this.list();
      },
      sortChange(value){
        let sortType=" desc"
        if(!!value.order){
          if(value.order.startsWith("asc")){
            sortType=" asc";
          }
          this.currentOrder=value.prop + sortType;
        } else {
          this.currentOrder=undefined;
        }
        this.list();
      },
      searchEnterFun(e){
        this.$store.state.pageSeach.pageNum = 1;
        this.resData.pageNum = 1;
        keyBoardEnter(e , ()=>{
          this.list();
        })
      },
    }
  }
</script>

