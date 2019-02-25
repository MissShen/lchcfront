<template>
  <div>
    <!-- ========================== 采购目录维护》修改商品信息 ========================= -->
        <el-dialog title="订单详情"
          top="2vh" :visible.sync="showAddForm" :before-close="handleClose" width="60%">
          <div class="info-view">
            <ul class="tabs-echo-ul">
              <li>配送企业：<span>{{importData.bakSenderName}}</span></li>
              <li>买方机构：<span>{{importData.bakBuyerName}}</span></li>
            </ul>
            <ul class="tabs-echo-ul">
              <li>订单号：<span>{{purchaseCode}}</span></li>
              <li>导入时间：<span>{{importDate}}</span></li>
            </ul>
          </div>
           <!-- 表格查询表单 -->
           <div class="table-form">
             <span class="form-title">商品清单</span>
             <el-form ref="query" :model="query" size="small" :inline="true" class="form-right">
               <input v-model="query.orderId"  @keyup.enter.native="searchEnterFun" type="hidden" />
               <el-form-item class="width-120">
                 <el-input v-model="query.searchName"  @keyup.enter.native="searchEnterFun" placeholder="品名" size="small"></el-input>
               </el-form-item>
               <el-form-item class="width-120">
                 <el-input v-model="query.bakProductSpec"  @keyup.enter.native="searchEnterFun" placeholder="规格" size="small"></el-input>
               </el-form-item>
               <el-form-item>
                 <el-button type="success" @click="searchEnterFun">查询</el-button>
                </el-form-item>
             </el-form>
           </div>
          <!-- 表格列表 -->
          <div class="tableset">
           <el-table
             :data="resData.list"
             border
             stripe>
             <!--<el-table-column type="index" width="50" header-align="left" align="center" label="序号"></el-table-column>-->
             <el-table-column label="产品名">
               <template slot-scope="scope">
                 {{ scope.row.bakProductName }}
               </template>
             </el-table-column>
             <el-table-column label="商品名">
               <template slot-scope="scope">
                 <span>{{ scope.row.bakTradeName }}</span>
               </template>
             </el-table-column>
             <el-table-column label="规格包装">
               <template slot-scope="scope">
                 <span>{{ scope.row.bakProductSpec }}</span>
               </template>
             </el-table-column>
             <el-table-column label="生产企业">
               <template slot-scope="scope">
                 <span>{{ scope.row.bakFactoryEasy }}</span>
               </template>
             </el-table-column>
             <el-table-column label="单价">
               <template slot-scope="scope">
                 <span>{{ priceFormat(scope.row.unitPrice) }}</span>
               </template>
             </el-table-column>
             <el-table-column label="订购量">
               <template slot-scope="scope">
                 <span>{{ scope.row.requestQty }}</span>
               </template>
             </el-table-column>
             <el-table-column label="总到货量">
               <template slot-scope="scope">
                 <span>{{ scope.row.receiveQty}}</span>
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
          <span slot="footer" class="dialog-footer">
            <el-button @click="showAddForm = false">关闭</el-button>
          </span>
        </el-dialog>
  </div>
</template>

<script>
import {getImportItem,getImportInfo} from 'src/axios/trade/checkRole/order/orderImport';
import {priceFormat,keyBoardEnter} from "src/utils";
  export default {
    data() {
      return {
        ruleForm: this.metaForm(),
        itemId:'',
        stockState:'',
        resData:this.metaData(),
        query: this.metaQuery(), // 查询初始化
        showAddForm:false,
        purchaseCode:'',
        importDate:'',
        importData:{
          bakSenderName:'',
          bakBuyerName:''
        },
      };
    },
    methods: {
      priceFormat,
        metaForm() {
            return {
              bakSenderFullname: '',
              bakRetrievalCode:'',
              bakQuantityExcess:'',
              recordId:''
            }
          },
        toggleForm () {
          this.showAddForm = !this.showAddForm
        },
       fillData(row) {
          const _id = row.orderId;
          this.query.orderId = _id;
          this.purchaseCode= row.purchaseCode
          this.importDate= row.importDate
          this.showAddForm = true
          getImportInfo(_id).then(res => {
             this.importData= res.data
           });
          this.list()
       },
      metaData () {
        return {
          // 前后台交互数据封装格式
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
      searchEnterFun(e){
        this.$store.state.pageSeach.pageNum = 1;
        this.resData.pageNum = 1;
        keyBoardEnter(e,() =>{
          this.list();
        })
      },
      list(){
        getImportItem(this.resData,this.query).then(res => {
          this.resData= res.data
          if(this.resData.pageNum === 0 ){
            this.resData.pageNum = 1
          }
        })
      },
      metaQuery () { // 表单查询数据初始化
        return {
          //            id: undefined,
          orderId: '',
          searchName: '',
          bakProductSpec: ''
        }
      },
      handleClose(done) {
         this.toggleForm();
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
