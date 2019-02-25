<template>
  <div>
    <!-- ========================== 主内容start ========================= -->
    <!-- 表格 -->
    <div class="tablebox">
      <!-- 表格查询表单 -->
      <el-form ref="query" :model="query" size="small" :inline="true" class="table-form">
          <el-form-item>
            <el-date-picker type="date" placeholder="开始日期" v-model="query.searchBenDate" @keyup.enter.native="searchEnterFun"
                            format="yyyy-MM-dd" value-format="yyyy-MM-dd" size="small"></el-date-picker>
             &nbsp;至&nbsp;
            <el-date-picker type="date" placeholder="结束日期" v-model="query.searchEndDate" @keyup.enter.native="searchEnterFun"
                            format="yyyy-MM-dd" value-format="yyyy-MM-dd" size="small"></el-date-picker>
          </el-form-item>
          <el-form-item>
              <el-input v-model="query.searchPurchaseCode" placeholder="计划单号" @keyup.enter.native="searchEnterFun" size="small"></el-input>
          </el-form-item>
          <el-form-item>
              <el-input v-model="query.searchByName" placeholder="计划名称" @keyup.enter.native="searchEnterFun" size="small"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="success" @click="searchEnterFun" size="small">查询</el-button>
            <el-button type="warning" size="small" @click="reSet()">重置</el-button>
          </el-form-item>
      </el-form>

      <div class="tableset">

        <el-table
          :data="resData.list"
          border
          stripe
          @sort-change="sortChang"
        >
          <!--<el-table-column label="序号" type="index" width="50" header-align="left" align="center"></el-table-column>-->
          <el-table-column sortable label="采购计划单号" prop="PURCHASE_CODE" sortable="custom" >
            <template slot-scope="scope">
              <span>{{ scope.row.purchaseCode }}</span>
            </template>
          </el-table-column>

          <el-table-column label="采购计划名称" prop="BY_NAME" sortable="custom">
            <template slot-scope="scope">
              <span>{{ scope.row.byName }}</span>
            </template>
          </el-table-column>

          <el-table-column  sortable label="创建时间" width="120"  prop="CREATE_DATE" sortable="custom">
            <template slot-scope="scope">
              <span>{{ scope.row.createDate }}</span>
            </template>
          </el-table-column>

          <el-table-column  sortable label="买方机构" prop="BAK_BUYER_EASY" sortable="custom">
            <template slot-scope="scope">
              <span>{{ scope.row.bakBuyerEasy  }}</span>
            </template>
          </el-table-column>

          <el-table-column label="拟采购金额（元）" header-align="left" align="right" width="150" prop="REQUEST_TOTAL" sortable="custom">
            <template slot-scope="scope">
              <span>{{ priceFormat(scope.row.requestTotal) }}</span>
            </template>
          </el-table-column>

          <el-table-column prop="remark" label="操作" show-overflow-tooltip width="200">
            <template slot-scope="scope">
              <div class="operates">
                <span class="operation-btn blue-bord" @click="createPurchase(scope.row.purchaseId)">生成采购单</span>
                <span class="operation-btn" @click="planInfo(scope.row.purchaseId)">详情</span>
                <span class="operation-btn" @click="deletePurchase(scope.row.purchaseId)">删除</span>
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
      <ul class="explain">
        <li>标记说明：</li>
        <li><i class="ico icon-qu"></i><span>区目录药品</span></li>
        <li><i class="ico icon-jc"></i><span>基本药物目录</span></li>
        <li><i class="ico icon-ji"></i><span>急需药品</span></li>
      </ul>
      <div class="foot-btn">
        <div class="foot-left">
          <span>
            <el-button type="success" @click="addPurchaseOrder" size="small">
              创建采购计划
            </el-button>
          </span>
        </div>
      </div>
    </div>
    <el-dialog
      title="信息"
      :visible.sync="centerDialogVisible"
      width="30%">
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
  import {queryPlanList,savePurchase,deletePlanItemMedical} from 'src/axios/trade/plan/planList'
  import {priceFormat,keyBoardEnter} from "src/utils";
  export default {
    data() {
      return {
        currentOrder: undefined,
        resData: this.metaData(),
        purchaseId: undefined,
        centerDialogVisible: false,
        query: {
          searchBenDate:undefined,
          searchEndDate:undefined,
          searchPurchaseCode:undefined,
          searchByName:undefined
        }
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
      addPurchaseOrder(){
        this.$router.push("/trade/manage/createPurchaseOrder/")
      },
      handleChange(value) {
      },
      searchEnterFun(e){
        this.$store.state.pageSeach.pageNum = 1;
        this.resData.pageNum = 1;
        keyBoardEnter(e,() =>{
          this.list();
        })
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
        this.list();
      },
      list () {
        this.resData.orderBy=this.currentOrder;
        queryPlanList(this.resData, this.query).then(res => {
          this.resData = res.data
          if(this.resData.pageNum === 0){
            this.resData.pageNum = 1
          }
        })
      },
      planInfo(orderId){
        this.$router.push("/trade/manage/planPurchaseItemList/" + orderId)
      },
      createPurchase(purchaseId){
        this.centerDialogVisible=true;
        this.purchaseId=purchaseId;
      },
      createPurchaseOrder(){
        this.centerDialogVisible=false;
        savePurchase(this.purchaseId).then(res => {
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
          deletePlanItemMedical(purchaseId).then(res => {
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

















