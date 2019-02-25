<template>
  <div>
    <!-- ========================== 主内容start ========================= -->
    <div class="tabs-echo">
      <div class="tabs-echo-left">
        <div class="title">
          <span>采购单状态：{{getState(this.resMainData.purchaseState)}}</span>
        </div>
        <div class="tools">
          <el-button type="warning" size="small " @click="handlePass()">发送</el-button>
          <el-button type="warning" size="small " @click="handleRefuse()">拒绝</el-button>
          <el-button size="small" class="el-button-pale" @click="handleBack()">返回</el-button>
        </div>
      </div>
      <div class="tabs-echo-right">
        <ul class="tabs-echo-ul">
          <li>采购单编号：<span>{{this.resMainData.purchaseCode}}</span></li>
          <li>创建时间：<span>{{this.resMainData.createDate}}</span></li>
          <li>拟采金额：<span>{{ priceFormat(this.resMainData.requestTotal) }}</span></li>
        </ul>
        <ul class="tabs-echo-ul">
          <li>创建人：<span>{{this.resMainData.createUserid}}</span></li>
          <li>买方机构：<span>{{this.resMainData.bakBuyerEasy}}</span></li>
          <li>联系电话：<span>{{this.resMainData.linkPhone}}</span></li>
        </ul>
      </div>
    </div>
    <!-- 表格列表 -->
    <div class="tablebox">
      <div class="title-name">采购单明细</div>
      <div class="table-form">
        <el-form :inline="true" :model="query" ref="formQuery" class="demo-form-inline">
          <div class="formrow">
          <span>
            <el-input v-model="query.searchProductName" @keyup.enter.native="searchEnterFun"  placeholder="品名" size="small"></el-input>
          </span>
            <span>
            <el-input v-model="query.searchMedicalSpec" @keyup.enter.native="searchEnterFun"  placeholder="规格" size="small"></el-input>
          </span>
          <span>
            <el-button type="warning" size="small" @click="searchEnterFun">查询</el-button>
            <el-button size="small" @click="restQuery()">重置</el-button>
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
        <!--<el-button type="primary" size="small" @click="handleUpdateDegreeSet()">
          设置急需
        </el-button>
        <el-button type="primary" size="small" @click="handleUpdateDegreeCancel()">
          取消急需
        </el-button>-->
      </div>


      <div class="tableset">

        <el-table ref="multipleTable" :data="resData.list" tooltip-effect="dark"
                  style="width: 100%" @selection-change="handleSelectionChange"  @cell-click="handleCell" border>
          <el-table-column type="selection" width="40"></el-table-column>
          <el-table-column label="药品信息" min-width="200" prop="drugDetail">
            <template slot-scope="scope" class="drugMessage">
              <p>
                <span class="ico icon-ji" v-if="scope.row.degreeFlag == '2'"  @click="handleUpdateDegreeCancel(scope.row.id,scope.row.purchaseId)"></span>
                <span class="ico icon-jihui" v-if="scope.row.degreeFlag == '0'"  @click="handleUpdateDegreeSet(scope.row.id,scope.row.purchaseId)"></span>
                {{ scope.row.bakProductName }}（商品名：{{ scope.row.bakTradeName }}）
                <span class="icon-sign sign-basic" v-if="scope.row.contractType != '0'">基</span>
                <span class="icon-sign sign-district" v-if="scope.row.regionId == '0'">区</span>
              </p>
              <p class="drugCon">
                规格包装：{{ scope.row.bakMedicalSpec}} × {{ scope.row.bakStandRate}} {{scope.row.useUnit}} / {{ scope.row.metricName}}
                中大包装：{{ scope.row.middleStandRate}}/{{ scope.row.bigMiddleRate}}
              </p>
              <p class="drugCon">生产企业：{{ scope.row.bakFactoryEasy}}</p>
            </template>
          </el-table-column>
          <el-table-column prop="drugStorage" label="药库">
            <template slot-scope="scope">
              <span>{{ scope.row.warehouseName }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="price" label="价格" show-overflow-tooltip align="right" width="80">
            <template slot-scope="scope">
              <p>{{ priceFormat(scope.row.unitPrice) }}</p>
              <range-bar v-if="scope.row.isShowPrice == '1'" :rangeData="[scope.row.unitPrice,scope.row.minTradePrice,scope.row.maxTradePrice,1]"></range-bar>
            </template>
          </el-table-column>
          <el-table-column prop="enterprise" label="配送企业" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-select v-model="scope.row.senderOrgid" placeholder="请选择" size="small"
                         @change="handleChangeSender(scope.row.senderOrgid,scope.row.purchaseId,scope.row.id)">
                <el-option v-for="item in scope.row.sendBusiness" :key="item.senderName" :label="item.senderName" :value="item.senderId">
                </el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="数量" show-overflow-tooltip align="right" width="80">
            <template slot-scope="scope">
              <el-input-number size="small" v-model="scope.row.requestQty" :min="1" :step="10"
                               @change="handleAddMinus(scope.row.requestQty,scope.row.id,scope.row.purchaseId)"
                               @blur="amountStatistics(scope.row.requestQty,scope.row.id,scope.row.purchaseId)">
              </el-input-number>
            </template>
          </el-table-column>
          <el-table-column prop="buyerRemark" label="备注" show-overflow-tooltip>
            <template slot-scope="scope">
              <span @click="dataBackFillGoods" v-if="scope.row.id !=cellIndex">{{ scope.row.buyerRemark }}</span>
              <span><el-input v-model="scope.row.buyerRemark"
                              v-if="scope.row.id===cellIndex"
                              @blur="handleCellSubmit(scope.row.id,scope.row.buyerRemark)"
              ></el-input></span>
            </template>
          </el-table-column>

        </el-table>
      </div>

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
      <div class="log-box">
        <div class="title-name"></div>
        <ul class="log-con">

        </ul>
      </div>
    </div>
</template>
<script>

  // 引入用户相关请求
  import {findFirstApprovePurchase,queryFirstApprovePurchaseItemList,updatePurchaseItemQty,
    updatePurchaseItemRemark,updateDegreeSet,updateDegreeCancel,deleteMedicineShoppingCar,
    updatePassOrRefusePurchase
  }
  from 'src/axios/trade/purchase/purchase'
  import {priceFormat,keyBoardEnter} from "src/utils";
  import RangeBar from 'src/components/RangeBar'

  export default {
    components: {
      RangeBar
    },
    data() {
      return {
        query: this.metaQuery(),
        resData: this.metaData(),
        resMainData: this.metaMainData(),
        cellIndex: undefined,
        dataList: [],
        tableData: [],
        purchaseId: undefined,
//        paginations: { // 初始化分页
//          pageNum: 1,
//          pageSize: 20,
//          size: 10,
//          startRow: 0,
//          endRow: 0,
//          total: 0,
//          pages: 0,
//          prePage: 0,
//          nextPage: 0,
//          isFirstPage: false,
//          isLastPage: true,
//          hasPreviousPage: false,
//          hasNextPage: false,
//          navigatePages: 8,
//          navigatepageNums: [],
//          navigateFirstPage: 0,
//          navigateLastPage: 0,
//          firstPage: 0,
//          lastPage: 0,
//        }

      }
    },

    created () {
      this.purchaseId = this.$route.params.purchaseId;
      this.list();
    },
    mounted(){
      var _this = this;
      // 初始化表格已选数据
      var checkArr = [];
      var apiList = this.resData.list;
      for(let i=0; i<apiList.length; i++){
        if(apiList[i].isChecked){
          checkArr.push(i);
        }
      }
      _this.checkedItems = checkArr;
      _this.tableData = apiList;
      _this.$nextTick(function(){
        _this.checked(); // 每次更新了数据就触发这个函数
      });
    },
    methods: {
      priceFormat,
      list () {
        findFirstApprovePurchase(this.purchaseId).then(res => {
          this.resMainData = res.data
        }),
        queryFirstApprovePurchaseItemList(this.resData, this.query,this.purchaseId).then(res => {
          this.resData = res.data
        })
      },
      handlePass() {
        //0，审核通过；1，审核拒绝。
        updatePassOrRefusePurchase(this.purchaseId,'0').then(res =>{
          this.$message({
            message: res.data,
            type: 'success',
            duration: 1000,
            onClose: () => {
              this.$router.push("/trade/manage/checkRole/checkApprovalTabs")
            }
          })
        })
      },
      handleRefuse() {
        //0，审核通过；1，审核拒绝。
        updatePassOrRefusePurchase(this.purchaseId,'1').then(res =>{
          this.$message({
            message: res.data,
            type: 'success',
            duration: 1000,
            onClose: () => {
              this.$router.push("/trade/manage/checkRole/checkApprovalTabs")
            }
          })
        })
      },
      handleBack() {
        this.$router.push("/trade/manage/checkRole/checkApprovalTabs")
      },
//      handleSavePurchase(){
//        savePurchase(this.purchaseId).then(res => {
//          this.$message({
//            message: res.data,
//            type: 'success',
//            duration: 1000,
//            onClose: () => {
//              this.$router.push("/trade/manage/buyerrole/purchaseTabs")
//            }
//          })
//        })
//      },
      restQuery(){
        this.query=this.metaQuery()
        this.list();
      },
      searchEnterFun(e){
        this.$store.state.pageSeach.pageNum = 1;
        this.resData.pageNum = 1;
        keyBoardEnter(e,() =>{
          this.list();
        })
      },
      handleCellSubmit(id,buyerRemark){
        updatePurchaseItemRemark(id,buyerRemark).then(res => {
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
      handleAddMedicine(){
        this.$router.push("/trade/manage/checkRole/purchaseTabs")
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
              idList += (noticeType.id + ',');
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

      handleUpdateDegreeSet(id,purchaseId){

          updateDegreeSet(id,purchaseId).then(res => {
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
      handleUpdateDegreeCancel(id,purchaseId){


          updateDegreeCancel(id,purchaseId).then(res => {
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


      checked(){
        //首先el-table添加ref="multipleTable"引用标识
        var checkedItem = this.checkedItems;
        for(let i=0; i<checkedItem.length; i++){
          this.$refs.multipleTable.toggleRowSelection(this.tableData[checkedItem[i]],true);
        }
      },
      metaQuery(){
        return {
          id: undefined,
          id: undefined,
          searchProductName: undefined,
          searchMedicalSpec: undefined,
          requestTotal: undefined,
          requestQty: undefined,
          buyerRemark: undefined
        }
      },
      dataBackFillGoods () {
        this.remarkShow=!this.remarkShow;
      },
      amountStatistics(requestQty,id,purchaseId){
        updatePurchaseItemQty(requestQty,id,purchaseId).then(res => {
          this.list()
//          this.$message({
//            message: res.data,
//            type: 'success',
//            duration: 1000,
//            onClose: () => {
//              this.list()
//            }
//          })
        })
      },
      handleAddMinus(requestQty,id,purchaseId){
        updatePurchaseItemQty(requestQty,id,purchaseId).then(res => {
          this.$message({
            message: res.data,
            type: 'success',
            duration: 1000,
            onClose: () => {
              this.list()
            }
          })
        });
      },
      handleCell(row, column, cell, event){
        if(column.label=="备注"){
          this.cellIndex=row.id;
        }else{
          this.cellIndex=undefined;
        }

      },
      getState(state){
        var arrState = ['准备', '送一审', '发送', '一审拒绝','完成','送二审','二审拒绝','购物车状态'];
        return arrState[state];
      },
      handleSelectionChange(val) {
        this.dataList = val;
      },
      handleSizeChange (val) {
        this.tableData3.pageSize = val
        /*this.list()*/
      },
      handleCurrentChange (val) {
        this.tableData3.pageNum = val
        /*this.list()*/
      },
      metaMainData () {
        return {
          purchaseCode: undefined,
          createDate: undefined,
          requestTotal: undefined,
          createUserid: undefined,
          linkPhone: undefined,
          bakBuyerEasy: undefined
        }
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
      }


    }
  }
</script>



