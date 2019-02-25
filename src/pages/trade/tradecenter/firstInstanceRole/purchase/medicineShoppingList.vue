<template>
  <div>
    <!-- ========================== 主内容start ========================= -->
    <div class="tabs-panel">
      <span class="active">本院购物车</span>
    </div>
    <!-- 表格 -->
    <div class="tablebox">

      <!-- 表格查询表单 -->
      <div class="table-form">
        <el-form ref="query" :model="query" size="small" :inline="true" class="demo-form-inline">
          <div class="formrow">
            <span>
              <el-input v-model="query.searchProductName" @keyup.enter.native="searchEnterFun"  placeholder="品名" size="small"></el-input>
            </span>
            <span>
              <el-input v-model="query.searchMedicalSpec" @keyup.enter.native="searchEnterFun"  placeholder="规格" size="small"></el-input>
            </span>
            <span>
              <el-button type="warning" @click="searchEnterFun" size="small">查询</el-button>
              <el-button type="primary" @click="restQuery()">重置</el-button>
            </span>
          </div>
        </el-form>
      </div>

      <div class="table-caption">
          <el-button type="primary" size="small" @click="handleAddMedicine()">
            增加药品
          </el-button>
          <el-button type="primary" size="small" @click="handleDeleteMedicine()">
            删除药品
          </el-button>
          <el-button type="primary" size="small" @click="handleUpdateDegreeSet()">
            设置急需
          </el-button>
          <el-button type="primary" size="small" @click="handleUpdateDegreeCancel()">
            取消急需
          </el-button>
      </div>

      <div class="tableset">

        <el-table ref="multipleTable" :data="resData.list" tooltip-effect="dark"
                  style="width: 100%" @selection-change="handleSelectionChange"  @cell-click="handleCell" border>
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column label="药品信息" width="300" prop="drugDetail">
          <template slot-scope="scope" class="drugMessage">
            <p>
              <span class="icon-sign icon-jixu" v-if="scope.row.degreeFlag == '2'"></span>
              {{ scope.row.bakProductName }}（商品名：{{ scope.row.bakTradeName }}）
              <span class="icon-sign sign-basic" v-if="scope.row.contractType != '0'">基</span>
              <span class="icon-sign sign-district" v-if="scope.row.regionId == '0'">区</span>
            </p>
            <p class="drugCon">
              规格包装：{{ scope.row.bakMedicalSpec}} × {{ scope.row.bakStandSpecRate}} {{scope.row.bakUseUnit}} / {{ scope.row.bakSpecUnit}}
              中大包装：{{ scope.row.bakMiddleStandRate}}/{{ scope.row.bakBigMiddleRate}}
            </p>
            <p class="drugCon">生产企业：{{ scope.row.bakProducerShortname}}</p>
          </template>
          </el-table-column>
          <el-table-column prop="drugStorage" label="药库">
            <template slot-scope="scope">
              <span>{{ scope.row.warehouseName }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="price" label="价格" show-overflow-tooltip align="right" width="80">
            <template slot-scope="scope">
              <p>{{  priceFormat(scope.row.hitPrice) }}</p>
              <div class="price-ico">
                <div class="price-max">{{  priceFormat(scope.row.maxTradePrice) }}</div>
                <div class="price-min">{{  priceFormat(scope.row.minTradePrice) }}</div>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="enterprise" label="配送企业" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-select v-model="scope.row.itemSenderOrgId" placeholder="请选择" size="small"
                         @change="handleChangeSender(scope.row.itemSenderOrgId,scope.row.purchaseId,scope.row.purchaseItemId,scope.row.productId)">
                <el-option v-for="item in scope.row.sendBusiness" :key="item.senderName" :label="item.senderName" :value="item.senderId">
                </el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="数量" show-overflow-tooltip align="right" width="80">
            <template slot-scope="scope">
              <el-input-number size="small" v-model="scope.row.requestQty" :min="1" :step="10"
                               @change="handleAddMinus(scope.row.requestQty,scope.row.purchaseItemId,scope.row.purchaseId)"
                               @blur="amountStatistics(scope.row.requestQty,scope.row.purchaseItemId,scope.row.purchaseId)">
              </el-input-number>
            </template>
          </el-table-column>
          <el-table-column prop="buyerRemark" label="备注" show-overflow-tooltip>
            <template slot-scope="scope">
              <span @click="dataBackFillGoods" v-if="scope.row.purchaseItemId !=cellIndex">{{ scope.row.buyerRemark }}</span>
              <span><el-input v-model="scope.row.buyerRemark"
                              v-if="scope.row.purchaseItemId===cellIndex"
                              @blur="handleCellSubmit(scope.row.purchaseItemId,scope.row.buyerRemark)"
              ></el-input></span>
            </template>
          </el-table-column>

        </el-table>
      </div>
      <!--:current-page="currentPage4"-->
      <div class="pagebox">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="[100, 200, 300, 400]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400">
        </el-pagination>
      </div>
      <div class="sign">
        <span class="text">标记说明：</span>
        <span class="icon-sign sign-district">区</span>
        <span class="text">区目录药品</span>
        <span class="icon-sign sign-basic">基</span>
        <span class="text">基本药物目录</span>
        <span class="icon-sign icon-jixu"></span>
        <span class="text">急需商品</span>
      </div>
    </div>
    <div class="fixed-toolbar">
      <div class="box">
        <div class="amount">
          共<span class="red">{{this.requestCarQty}}</span>款药品
        </div>
        <div class="amount">
          总价:<span class="red">￥ {{ priceFormat(this.requestTotal) }}</span>
        </div>
        <!--<div class="btn-pitchon">代替下级创建采购单</div>-->
        <div class="btn-purchase" @click="handleSavePurchase()" >创建采购单</div>
      </div>
    </div>
  </div>

</template>
<script>

  // 引入用户相关请求
  import {medicineShoppingList,findCarTotal,deleteMedicineShoppingCar,updateDegreeSet,
          updateDegreeCancel,updatePurchaseItemRemark,updatePurchaseItemQty,updatePurchaseItemSender,
          savePurchase}
  from 'src/axios/trade/purchase/purchase'
  import {priceFormat,keyBoardEnter} from "src/utils";

  export default {
    data() {
      return {
        resData: this.metaData(),
        query: this.metaQuery(),
        tableData: [],
        dataList: [],
        value: '',
//        currentPage4: 4,
        remarkShow:true,
        cellIndex:undefined,
        purchaseItemId: undefined,
        purchaseId: undefined,
        requestTotal: undefined,
        requestQty: undefined,
        requestCarQty: undefined
      }
    },
    created () {
      this.purchaseId = this.$route.params.purchaseId;
      this.list();
    },
    mounted(){
      var _this = this;
      // 初始化表格已选数据
      var apiData = this.resData.list;
      var checkArr = [];
      for(let i=0; i<apiData.length; i++){
        if(apiData[i].isChecked){
          checkArr.push(i);
        }
      }
      _this.checkedItems = checkArr;
      _this.tableData = apiData;
      _this.$nextTick(function(){
        _this.checked(); // 每次更新了数据就触发这个函数
      });
    },
    methods: {
      //  获取用户分页列表
      priceFormat,
      list () {
        medicineShoppingList(this.resData, this.query,this.purchaseId).then(res => {
          this.resData = res.data
          if(this.resData.pageNum === 0){
            this.resData.pageNum = 1
          }
        }),
        //本院查询
        findCarTotal("0").then(res => {
          if(res.data != undefined){
            this.requestCarQty = res.data.requestCarQty;
            this.requestTotal = res.data.requestTotal;
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
      handleSavePurchase(){
        if(this.requestCarQty == undefined){
          this.$alert('购物车商品已被清空', '提示', {
            confirmButtonText: '确定',
            type: 'warning',
          })
          return false
        }else{
          savePurchase(this.purchaseId).then(res => {
            this.$message({
              message: res.data,
              type: 'success',
              duration: 1000,
              onClose: () => {
                this.$router.push("/trade/manage/buyerrole/purchaseTabs")
              }
            })
          })
        }
        }

      },
      restQuery(){
        this.query=this.metaQuery()
        this.list();
      },
      checked(){
        //首先el-table添加ref="multipleTable"引用标识
        var checkedItem = this.checkedItems;
        for(let i=0; i<checkedItem.length; i++){
          this.$refs.multipleTable.toggleRowSelection(this.tableData[checkedItem[i]],true);
        }
      },
      handleCellSubmit(purchaseItemId,buyerRemark){
        updatePurchaseItemRemark(purchaseItemId,buyerRemark).then(res => {
          this.$message({
            message: res.data,
            type: 'success',
            duration: 1000,
            onClose: () => {
              this.list()
            }
          })
        })
      },
      metaData () {
        return {
          pageNum: 1,
          pageSize: 20,
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
          query: {
            id: undefined,
            purchaseItemId: undefined,
            searchProductName: undefined,
            searchMedicalSpec: undefined,
            requestTotal: undefined,
            requestQty: undefined,
            buyerRemark: undefined
          }
        }
      },
      handleAddMedicine(){
        this.$router.push("/trade/manage/buyerrole/purchaseTabs")
      },
      handleDeleteMedicine(){
        if(this.dataList.length<1){
          this.$alert('请至少选择一条数据', '提示', {
            confirmButtonText: '确定',
            type: 'warning',
          })
          return false
        }else{
          this.$confirm(`确定删除选中的数据吗?`, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {

            var idList='';
            var purchaseId=this.purchaseId;
            for(var noticeType of this.dataList){
              idList += (noticeType.purchaseItemId + ',');
            }
            deleteMedicineShoppingCar(idList,purchaseId).then(res => {
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
      },

      handleUpdateDegreeSet(){

        if(this.dataList.length<1){
          this.$alert('请至少选择一条数据', '提示', {
            confirmButtonText: '确定',
            type: 'warning',
          })
          return false
        }else{
          var idList='';
          var purchaseId='';
          for(var noticeType of this.dataList){
            idList += (noticeType.purchaseItemId + ',');
            if(purchaseId == ''){
              purchaseId = noticeType.purchaseId
            }
          }
          updateDegreeSet(idList,purchaseId).then(res => {
            this.$message({
              message: res.data,
              type: 'success',
              duration: 1000,
              onClose: () => {
                this.list()
              }
            })
          })
        }
      },
      handleUpdateDegreeCancel(){

        if(this.dataList.length<1){
          this.$alert('请至少选择一条数据', '提示', {
            confirmButtonText: '确定',
            type: 'warning',
          })
          return false
        }else{
          var idList='';
          var purchaseId= '';
          for(var noticeType of this.dataList){
            idList += (noticeType.purchaseItemId + ',');
            if(purchaseId == ''){
              purchaseId = noticeType.purchaseId
            }
          }
          updateDegreeCancel(idList,purchaseId).then(res => {
            this.$message({
              message: res.data,
              type: 'success',
              duration: 1000,
              onClose: () => {
                this.list()
              }
            })
          })
        }
      },
      handleSelectionChange(val) {
        this.dataList = val;
      },
      handleSizeChange(val) {
      },
      handleCurrentChange(val) {
      },
      handleCell(row, column, cell, event){
        if(column.label=="备注"){
          this.cellIndex=row.purchaseItemId;
        }else{
          this.cellIndex=undefined;
        }

      },
//      handleCellSubmit(row){
//        alert(row.id);
//      },
      dataBackFillGoods () {
        this.remarkShow=!this.remarkShow;
      },
      amountStatistics(requestQty,purchaseItemId,purchaseId){
        updatePurchaseItemQty(requestQty,purchaseItemId,purchaseId).then(res => {
          this.list()
        })
      },
      handleAddMinus(requestQty,purchaseItemId,purchaseId){
        updatePurchaseItemQty(requestQty,purchaseItemId,purchaseId).then(res => {
          this.$message({
            message: res.data,
            type: 'success',
            duration: 1000,
            onClose: () => {
              this.list()
            }
//          })
        });
      },
      handleChangeSender(senderId,purchaseId,purchaseItemId,productId){
        updatePurchaseItemSender(senderId,purchaseId,purchaseItemId,productId).then(res => {
          this.$message({
            message: res.data,
            type: 'success',
            duration: 1000,
            onClose: () => {
              this.list()
            }
          })
        });
      }
    }
  }
</script>
