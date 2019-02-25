<template>
  <div>
    <!-- ========================== 主内容start ========================= -->
    <!-- 表格 -->
    <div class="tablebox">
      <!-- 表格查询表单 -->
        <el-form ref="query" :model="query" label-position="right" size="small" :inline="true" class="table-form">
          <el-form-item class="width-120">
            <el-input v-model="query.searchName" @keyup.enter.native="searchEnterFun"  placeholder="品名"  size="small"></el-input>
          </el-form-item>
          <el-form-item class="width-120">
            <el-input v-model="query.bakMedicalSpec" @keyup.enter.native="searchEnterFun"  placeholder="规格"  size="small"></el-input>
          </el-form-item>
          <el-form-item class="width-120">
            <el-input v-model="query.searchSender" @keyup.enter.native="searchEnterFun"  placeholder="配送企业"  size="small"></el-input>
          </el-form-item>
          <el-form-item class="width-120">
            <el-input v-model="query.bakBuyerName" @keyup.enter.native="searchEnterFun"  placeholder="买方机构"  size="small"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="success" @click="searchEnterFun" size="small">查询</el-button>
            <el-button type="warning" size="small" @click="resetQuery()">重置</el-button>
          </el-form-item>
        </el-form>
      <!-- 表格列表 -->
      <div>
        <el-table :data="resData.list" ref="multipleTable" @sort-change="sortChang" style="width: 100%" border stripe>
          <el-table-column  type="expand">
            <template slot-scope="scope">
              <el-form label-position="left"  height="20px" inline class="demo-table-expand">
                <el-form-item label="原因" class="nomar">
                  <span> ： {{ scope.row.nullifyReason }}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column label="采购编号" width="150" prop="i.PURCHASE_CODE" sortable="custom" show-overflow-tooltip>
            <template slot-scope="scope">
              {{ scope.row.purchaseCode }}
            </template>
          </el-table-column>
          <el-table-column label="产品名" prop="ooi.BAK_PRODUCT_NAME" sortable="custom" min-width="150" >
            <template slot-scope="scope" class="drugMessage">
              <ul class="ico-zt">
                <div>
                  <li class="text-inline" :title="scope.row.bakProductName" >{{ scope.row.bakProductName }}</li>
                </div>
                <div class="text-inline"> {{ scope.row.bakMedicalMode }}<span v-if="scope.row.bakTradeName != '无' && scope.row.bakTradeName != '' && scope.row.bakTradeName != null ">({{ scope.row.bakTradeName }})</span></div>
              </ul>
            </template>
          </el-table-column>
          <el-table-column  label="产品信息" prop="ooi.BAK_MEDICAL_SPEC" sortable="custom" min-width="150">
            <template slot-scope="scope">
              <div class="pro-details text-inline" >
                {{ scope.row.bakProductSpec}}  &nbsp;&nbsp;<span v-if="scope.row.bakWrapName != '空' && scope.row.bakWrapName != null">{{ scope.row.bakWrapName}}</span>
              </div>
              <div :title="scope.row.bakFactoryEasy" class="pro-details text-inline">{{ scope.row.bakFactoryEasy}} &nbsp;&nbsp; 中大包装:{{scope.row.middleStandRate }}/{{ scope.row.bigMiddleRate}}</div>
            </template>
          </el-table-column>
          <el-table-column label="配送企业" show-overflow-tooltip prop="SENDER_ORG_EASY" sortable="custom">
            <template slot-scope="scope">
              <span>{{ scope.row.senderOrgEasy }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="i.unit_price" sortable="custom" label="单价" width="60" align="right">
            <template slot-scope="scope">
              {{ priceFormat(scope.row.unitPrice) }}
            </template>
          </el-table-column>
          <el-table-column prop="i.request_qty" sortable="custom" label="订购量"  width="90" align="right">
            <template slot-scope="scope">
              {{ scope.row.requestQty }}
            </template>
          </el-table-column>
          <el-table-column prop="i.BUYER_ORG_EASY" sortable="custom" label="买方机构" width="95" show-overflow-tooltip>
            <template slot-scope="scope">
              {{ scope.row.buyerOrgEasy }}
            </template>
          </el-table-column>
          <el-table-column prop="i.ORDER_ITEM_STATE" sortable="custom" label="状态" align="center" width="95">
            <template slot-scope="scope">
              <span v-if="scope.row.orderItemState==11">申请作废</span>
              <span v-if="scope.row.orderItemState==12">已同意</span>
              <span v-if="scope.row.orderItemState==13">已拒绝</span>
            </template>
          </el-table-column>
          <el-table-column label="文件" width="95">
            <template slot-scope="scope">
              <span v-for="img in scope.row.ordAttachment">
                <img width="25%" :src="formatImg(img.filePath)" @click="handlePictureCardPreview(scope.row,img.filePath)" hspace="3"/>
              </span>
              <el-dialog :visible.sync="scope.row.enabled" width="80%">
                <img width="100%" :src="dialogImageUrl"/>
              </el-dialog>
            </template>
          </el-table-column>
          <el-table-column label="作废原因" width="80">
            <template slot-scope="scope">
              <div class="operates">
                <a href="javaScript:;" class="green" @click="show(scope.row)">查看</a>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <div class="operates">
                <a v-if="scope.row.orderItemState==11" @click="changeOrderItemState(scope.row.recordId,'12')" class="blue">同意</a>
                <a v-if="scope.row.orderItemState==12&&scope.row.newOrderItemId==null" @click="createCompensate(scope.row.stockupId)" class="green">生成补单</a>
                <a v-if="scope.row.orderItemState==12&&scope.row.newOrderItemId!=null"  class="green">生成补单</a>
                <a v-if="scope.row.orderItemState==11" @click="changeOrderItemState(scope.row.recordId,'13')" class="red">拒绝</a>
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

  // 引入用户相关请求
  import {handleCancelList,changeCancelOrderItemState,generateSupplementPurchase} from 'src/axios/trade/buyerrole/arrive/buyerTabView/receiveListInfo'
  import {priceFormat,keyBoardEnter} from "src/utils";

  export default {
    data () {
      return {
        activeName: 'first',  // 当前标签
        lastReceive: '',  // 上次到货
        dialogImageUrl: '',
        currentOrder:undefined,
        expanded:true,
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
      handlePictureCardPreview(row,path) {
        this.dialogImageUrl="data:image/png;base64,"+path;
        row.enabled = !row.enabled;
    },
      formatImg(path){
        return path="data:image/png;base64,"+path;
      },
      priceFormat,
      // -------------------------------------------- 数据初始化  -----------------------------------------
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
            searchName: undefined,
            bakMedicalSpec: undefined,
            searchSender: undefined,
            bakBuyerName: undefined
        }
      },
      // ------------------------------------------------- 处理方法 ----------------------------------------
      //  获取用户分页列表
      list () {
        this.resData.orderBy=this.currentOrder;
        handleCancelList(this.resData, this.query).then(res => {
          this.resData = res.data
          this.dialogVisible=this.resData.enabled
          if(this.resData.pageNum===0){
            this.resData.pageNum=1
          }
        })
      },
      createCompensate(stockupId) {
        this.$confirm(`确认生成补单？`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          generateSupplementPurchase(stockupId).then(res => {
            this.$message({
              message: res.data,
              type: 'success',
              duration: 1000,
              onClose: () => {
                this.list();
              }
            })
          })
        })
      },
      searchEnterFun(e){
        this.$store.state.pageSeach.pageNum = 1;
        this.resData.pageNum = 1;
        keyBoardEnter(e,() =>{
          this.list();
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
      changeOrderItemState (recordId,state) {
        changeCancelOrderItemState(recordId,state).then(res => {
          this.$message({
            type: 'success',
            message: res.data,
          })
          this.list()
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
      resetQuery() {
        this.query = this.metaQuery();
        this.list();
      },
      getDrugStorage(bakMedicalSpec,middleStandRate,bigMiddleRate){
        let _bakMedicalSpec = bakMedicalSpec || '';
        let _middleStandRate = middleStandRate || '';
        let _bigMiddleRate = bigMiddleRate || '';
        return '规格包装'+_bakMedicalSpec+'中大包装:'+_middleStandRate+'/'+_bigMiddleRate
    },
   show(row){
    this.$refs.multipleTable.toggleRowExpansion(row,this.expanded)
    this.expanded = !this.expanded
  }
    }
  }
</script>

