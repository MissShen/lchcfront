<template>
  <div>
    <!-- ========================== 主内容start ========================= -->
    <!-- 表格 -->
    <div class="tablebox">
      <!-- 表格查询表单 -->
      <el-form ref="query" :model="query" size="small" :inline="true" class="table-form">
        <el-form-item class="width-120">
          <el-input v-model="query.searchPurchaseCode"  @keyup.enter.native="searchEnterFun" placeholder="模板编号" size="small"></el-input>
        </el-form-item>
        <el-form-item class="width-120">
            <el-input v-model="query.searchByName"  @keyup.enter.native="searchEnterFun" placeholder="模板名称" size="small"></el-input>
        </el-form-item>
        <el-form-item>
          <el-date-picker type="date" placeholder="历史采购开始日期" v-model="query.searchBenDate" @keyup.enter.native="searchEnterFun"
                          format="yyyy-MM-dd" value-format="yyyy-MM-dd" size="small"></el-date-picker>
           &nbsp;至&nbsp;
          <el-date-picker type="date" placeholder="历史采购结束日期" v-model="query.searchEndDate" @keyup.enter.native="searchEnterFun"
                          format="yyyy-MM-dd" value-format="yyyy-MM-dd" size="small"></el-date-picker>
        </el-form-item>
         <el-form-item>
          <el-button type="success" @click="searchEnterFun" size="small">查询</el-button>
          <el-button type="warning" size="small" @click="this.reSet">重置</el-button>
        </el-form-item>
      </el-form>

      <div class="tableset">

        <el-table
          :data="resData.list"
          border
          stripe
          tooltip-effect="dark"
          @sort-change="sortChang"
        >
          <!--<el-table-column label="序号" align="center" type="index" width="50">-->

          <el-table-column  sortable label="模板编号" prop="PURCHASE_CODE" sortable="custom" min-width="150" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>
                {{ scope.row.purchaseCode}}
              </span>
            </template>
          </el-table-column>
          <el-table-column  label="模板名称" prop="BY_NAME" sortable="custom" min-width="200" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>
                {{ scope.row.byName}}
              </span>
            </template>
          </el-table-column>

          <el-table-column label="品种数量" header-align="left" align="right" width="120" prop="product_num" sortable="custom" >
            <template slot-scope="scope">
              <span>  {{scope.row.productNum}}</span>
            </template>
          </el-table-column>

          <el-table-column label="拟采购金额" header-align="left" align="right" width="120" prop="REQUEST_TOTAL" sortable="custom">
            <template slot-scope="scope">
              <span class="red">{{ priceFormat(scope.row.requestTotal) }}</span>
            </template>
          </el-table-column>

          <el-table-column   label="时间" width="150"  prop="CREATE_DATE" sortable="custom" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.createDate }}</span>
            </template>
          </el-table-column>

          <el-table-column  label="买方机构" prop="BAK_BUYER_EASY" sortable="custom"  min-width="150">
            <template slot-scope="scope">
              <span>{{ scope.row.bakBuyerEasy  }}</span>
            </template>
          </el-table-column>

          <el-table-column  label="操作" width="230">
            <template slot-scope="scope">
              <div class="operates">
                <a href="javascript:;" class="blue-bord" @click="createPurchase(scope.row.purchaseId)">生成采购单</a>
                <a href="javascript:;" class="green" @click="planInfo(scope.row.purchaseId)">编辑</a>
                <a href="javascript:;" class="red" @click="deletePurchase(scope.row.purchaseId)">删除</a>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
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
    <el-dialog
      title="信息"
      :visible.sync="centerDialogVisible"
      width="30%"
      center>
      <span>确定生成采购单?</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="createPurchaseOrder">确 定</el-button>
        <el-button @click="centerDialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>
// 引入用户相关请求
<script>
  import {saveTemplatePurchase,deleteTemplate,queryTemplateList} from 'src/axios/trade/purchase/purchase'
  import {priceFormat,keyBoardEnter} from "src/utils";
  export default {
    data() {
      return {
        currentOrder: undefined,
        resData: this.metaData(),
        purchaseId: undefined,
        centerDialogVisible: false,
        query: this.metaQuery(),

      };
    },
    mounted(){
      this.list();
    },
    methods: {
      priceFormat,
      sortChang(value){
        let sortType=" desc"
        if(value.order.startsWith("asc")){
          sortType=" asc";
        }
        this.currentOrder=value.prop + sortType;
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
          searchBenDate:undefined,
          searchEndDate:undefined,
          searchByName:undefined
        }
      },
      sortChang(value){
        let sortType=" desc"
        if(value.order.startsWith("asc")){
          sortType=" asc";
        }
        this.currentOrder=value.prop + sortType;
        this.list()
      },
      addPurchaseOrder(){
        this.$router.push("/trade/manage/createPurchaseOrder/")
      },
      handleChange(value) {
      },
      handleSizeChange(val) {
        this.resData.pageSize=val;
        this.list();
      },
      handleCurrentChange(val) {
        this.resData.pageNum=val;
        this.list();
      },
      reSet(){
        this.query.searchBenDate="";
        this.query.searchEndDate="";
        this.query.searchPurchaseCode="";
        this.query.searchByName="";
        this.list()
      },
      list () {
        this.resData.orderBy=this.currentOrder;
        queryTemplateList(this.resData, this.query).then(res => {
          this.resData = res.data
          if(this.resData.pageNum === 0){
            this.resData.pageNum = 1
          }
        })
      },
      searchEnterFun(e){
        this.$store.state.pageSeach.pageNum = 1;
        this.resData.pageNum = 1;
        keyBoardEnter(e,() =>{
          this.list();
        })
      },
      planInfo(purchaseId){
        this.$router.push("/trade/manage/purchaseTemplateInfo/" + purchaseId)
      },
      createPurchase(purchaseId){
        this.centerDialogVisible=true;
        this.purchaseId=purchaseId;
      },
      createPurchaseOrder(){
        this.centerDialogVisible=false;
        saveTemplatePurchase(this.purchaseId).then(res => {
          this.$message({
            message: res.data,
            type: 'success',
            duration:1000,
            onClose: ()=>{
              this.list()
            }
          })
        })
      },
      deletePurchase(purchaseId){
        this.$confirm(`确定删除吗?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteTemplate(purchaseId).then(res => {
            this.$message({
              message: res.data,
              type: 'success',
              duration: 1000,
              onClose: () => {
                this.list()
              }
            })
          })
        })
      }
    }
  }
</script>
<style>
  p{
    margin: 0;
  }
  .drugCon{
    font-size: 12px;
    color: #c0c4cc;
  }
  .fixed-toolbar{
    left:60px;
    width:100%;
    background:#eee;
    text-align:right;
    line-height:60px;
    height:60px;
  }
  .box{
    float:right;
    margin-right: 15px;
  }
  .amount{
    float:left;
    font-size:14px;
    margin-right: 15px;
  }
  .red{
    color: #f43530;
  }
  .btn-pitchon{
    float:left;
    color:#008dd8;
    background: #fff;
    border-top: 1px solid #008dd8;
    border-left:1px solid #008dd8;
    padding:0 30px;
    cursor: pointer;
    height: 58px;
  }
  .btn-purchase{
    float:left;
    color:#fff;
    background: #008dd8;
    padding:0 30px;
    cursor: pointer;
    height: 58px;
  }
  .sign{
    height: 22px;
    margin-bottom: 10px;
  }
  .sign > span{
    display: inline-block;
    vertical-align: middle;
  }
  .icon-sign{
    height: 22px;
    line-height: 22px;
    padding:0 5px;
    font-size: 12px;
    border-radius:4px;
  }
  .sign-district{
    background-color:rgba(32,160,255,0.1);
    border:solid 1px rgba(32,160,255,0.2);
    color:#2b86cc;
  }
  .sign-basic{
    background-color:rgba(247,186,42,0.1);
    border:solid 1px rgba(247,186,42,0.2) ;
    color:#ef8e05;
  }
  .text{
    padding: 0 5px;
  }
  .icon-jixu{
    display: inline-block;
    width:10px;
    height:10px;
    border-radius:2px;
    background-color:#e64340;
  }
</style>
