<template>
  <el-dialog
    title="查看恢复禁用记录"
    :close-on-click-modal="false"
    :visible.sync="visible" width="70%">
    <!-- 表格 -->
    <div>
      <!--产品信息表格-->
      <div class="table-form padding-btm">
        <ul class="tabs-echo-ul">
          <li>产品编码：<span>{{ productInfo.productCode }}</span></li>
          <li>产品名称：<span>{{ productInfo.productName }}</span></li>
          <li>剂型：<span>{{ productInfo.doseageFormName }}</span></li>
        </ul>
        <ul class="tabs-echo-ul">
          <li>规格：<span>{{ productInfo.spec }}</span></li>
          <li>包材：<span>{{ productInfo.wrapName }}</span></li>
          <li>转换比：<span>{{ productInfo.standRate }}</span></li>
        </ul>
        <ul class="tabs-echo-ul">
          <li>单位：<span>{{ productInfo.specUnit }}</span></li>
          <li>生产企业：<span>{{ productInfo.manufactureName }}</span></li>
          <li>&nbsp;</li>
        </ul>
      </div>
      <div class="" style="margin-top: 10px;">
        <el-form ref="query" :model="query" :inline="true" class="table-form">
            <el-form-item>
              <el-input v-model="query.createUserName" maxlength="100" placeholder="操作人" size="small" @keyup.enter.native="searchEnterFun"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="success" @click="searchEnterFun" size="small">查询</el-button>
              <el-button type="warning" @click="resetForm()" size="small">重置</el-button>
            </el-form-item>
        </el-form>
      </div>

      <!-- 表格列表 -->
      <div class="tableset">
        <el-table
          :data="resData.list"
          border
          stripe
          @sort-change="sortChange">
          <el-table-column label="操作类型" prop="FLAG" sortable="custom">
            <template slot-scope="scope">
              <span>{{ scope.row.flag =='0' ? '禁用' :'启用'}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作原因">
            <template slot-scope="scope">
              <span v-html="scope.row.comments"></span>
            </template>
          </el-table-column>
          <el-table-column label="操作人" prop="CREATE_USER_NAME" sortable="custom">
            <template slot-scope="scope">
              <span>{{ scope.row.createUserName}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作时间" prop="CREATE_DATE" sortable="custom">
            <template slot-scope="scope">
              <el-tooltip :enterable="false" class="item" effect="dark" placement="top-start">
                <div slot="content">{{scope.row.createTime}}</div>
                <span>{{ scope.row.createDate }}</span>
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
    </div>
    <div slot="footer" class="dialog-footer">
       <el-button @click="visible = false" size="small">关闭</el-button>
    </div>
  </el-dialog>
</template>
<script>

// 引入用户相关请求
import {queryDisableInfoList,queryProductInfo } from "src/axios/contract/catalogmanagement/disableProduct";
import { keyBoardEnter } from "src/utils"

  export default {
    props: {
      parentId: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        currentOrder: undefined,
        resData: this.metaData(),
        form: this.metaForm(), // 表单初始化
        query: this.metaQuery(), // 查询初始化
        showForm: false, // 表单可见性初始化
        showQuery: false, // 表单查询初始化
        visible: false,
        dataForm: this.metaForm(),
        productId: undefined,
        productInfo: {}
      }
    },
    methods: {
      // -------------------------------------------- 数据初始化  -----------------------------------------
      metaData() {
        return {
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
          list: []
        }
      },
      metaForm() { // 表单数据初始化
        return {
          senderName: ''
        }
      },
      fillData(productId) {
        this.visible = true;
        this.productId = productId;
        this.query = this.metaQuery();
        this.list();
      },
      metaQuery() { // 表单查询数据初始化
        return {
          createUserName: undefined
        }
      },
      // ------------------------------------------------- 处理方法 ----------------------------------------
      //  获取用户分页列表
      list() {
        this.resData.orderBy = this.currentOrder;
        queryDisableInfoList(this.resData, this.query, this.productId).then(res => {
          this.resData = res.data
          if (res.data.pageNum === 0) {
            this.resData.pageNum = 1;
          }
        })
        this.queryProduct();
      },
      //查询产品信息
      queryProduct(){
        queryProductInfo(this.productId).then(res => {
          this.productInfo = res.data;
        })
      },
      // 重置用户表单
      resetForm() {
        this.query = this.metaQuery();
        this.list();
      },
      // ************分页************
      handleSizeChange(val) {
        this.resData.pageSize = val
        this.list()
      },
      handleCurrentChange(val) {
        this.resData.pageNum = val
        this.list()
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
<style>
  @import "../../../../assets/css/compact.css";
</style>
