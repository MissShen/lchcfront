<template>
  <div>
    <!-- ========================== 主内容start ========================= -->
    <div class="tabs-echo">
      <div class="tabs-echo-left">
        <div class="title">
          <span>采购计划</span>
        </div>
        <div class="tools">
          <el-button type="primary" size="small " @click="createPurchase">生成采购单</el-button>
          <!--<el-button type="warning" size="small " @click="handleBack()">返回</el-button>-->
          <el-button type="" size="small " @click="goBack">返回</el-button>
        </div>
      </div>
      <div class="tabs-echo-right">
        <ul class="tabs-echo-ul">
          <li>采购计划单号：<span>{{this.resMainData.purchaseCode}}</span></li>
          <li>创建时间：<span>{{this.resMainData.createDate}}</span></li>
          <li>拟采金额：<span>{{ priceFormat(this.resMainData.requestTotal) }}</span></li>
        </ul>
        <ul class="tabs-echo-ul">
          <li>创建人：<span>{{this.resMainData.createName}}</span></li>
          <li>买方机构：<span>{{this.resMainData.bakBuyerEasy}}</span></li>
          <li>联系电话：<span>{{this.resMainData.linkPhone}}</span></li>
        </ul>
        <ul class="tabs-echo-ul">
          <li>是否补单:
            <span v-if="this.resMainData != undefined && (this.resMainData.flag == '2' || this.resMainData.flag == '3')">是</span>
            <span v-if="this.resMainData != undefined && (this.resMainData.flag == '0' || this.resMainData.flag == '1')">否</span>
          </li>
          <!--<li>整单备注:<span v-if="this.resMainData != undefined">{{this.resMainData.orderRemark}}</span></li>-->
          <!--<li>审批备注:<span v-if="this.resMainData != undefined">{{this.resMainData.approveRemark}}</span></li>-->
        </ul>
      </div>
    </div>
    <!-- 表格列表 -->
    <div class="tablebox">
      <div class="title-name">药品详情</div>
      <div class="table-form">
        <el-form :inline="true" :model="query" ref="formQuery" class="demo-form-inline">
          <div class="formrow">
            <span>
              <el-input v-model="query.searchProductName"  @keyup.enter.native="searchEnterFun"  placeholder="品名" size="small"></el-input>
            </span>
              <span>
              <el-input v-model="query.searchMedicalSpec" @keyup.enter.native="searchEnterFun"  placeholder="规格" size="small"></el-input>
            </span>
            <span>
              <el-button type="success" size="small" @click="searchEnterFun">查询</el-button>
              <el-button type="warning" size="small" @click="restQuery()">重置</el-button>
             </span>
          </div>
        </el-form>
      </div>
      <div class="tableset">
        <el-table ref="multipleTable" :data="resData.list" tooltip-effect="dark"
                  style="width: 100%" @selection-change="handleSelectionChange" stripe @cell-click="handleCell" border @sort-change="sortChang" >
          <el-table-column type="selection" width="40" align="center"></el-table-column>

<!--

         <el-table-column label="药品信息" width="300" prop="drugDetail">
            <template slot-scope="scope" class="drugMessage">
              <p>
                <span class="ico icon-ji" v-if="scope.row.degreeFlag == '2'"></span>
                {{ scope.row.bakProductName }}（商品名：{{ scope.row.bakTradeName }}）
                <span class="ico icon-jc" v-if="scope.row.contractType != '0'"></span>
                <span class="ico icon-qu" v-if="scope.row.regionId == '0'"></span>
              </p>
              <p class="drugCon">
                规格包装：{{ scope.row.bakMedicalSpec}} × {{ scope.row.bakStandRate}} {{scope.row.useUnit}} / {{ scope.row.metricName}}
                中大包装：{{ scope.row.middleStandRate}}/{{ scope.row.bigMiddleRate}}
              </p>
              <p class="drugCon">生产企业：{{ scope.row.bakFactoryEasy}}</p>
            </template>
          </el-table-column>

-->

         <el-table-column label="产品名" min-width="200" prop="pi.bak_Product_Name" sortable="custom" show-overflow-tooltip>
            <template slot-scope="scope" class="drugMessage">
              <ul class="ico-zt">
                <li class="ico-left">
<!--
                  <i class="ico icon-ji" v-if="scope.row.degreeFlag == '2'"  style="cursor:pointer"
                     @click="handleUpdateDegreeCancel(scope.row.id,scope.row.purchaseId)"></i>
                  <i class="ico icon-jihui" v-if="scope.row.degreeFlag == '0'"  style="cursor:pointer"
                     @click="handleUpdateDegreeSet(scope.row.id,scope.row.purchaseId)"></i>
                  -->
                  <i class="ico icon-ji" v-if="scope.row.degreeFlag == '2'"  ></i>
                  <i class="ico icon-jihui" v-if="scope.row.degreeFlag == '0'"  ></i>
                  <i  v-if="scope.row.regionId == '0'" class="ico icon-qu"></i>
                  <i  v-if="scope.row.contractType != '0'" class="ico icon-jc"></i>
                </li>
                <div>
                  <span class="text-inlie" :title="scope.row.bakProductName"  >{{ scope.row.bakProductName }}</span>
                </div>
                <div >
                  <span class="text-inlie" :title="scope.row.bakMedicalMode+'  ('+scope.row.bakTradeName+')'"  v-if="scope.row.bakTradeName != '无' && scope.row.bakTradeName != null">{{ scope.row.bakMedicalMode }}({{ scope.row.bakTradeName }})</span>
                  <span class="text-inlie" :title="scope.row.bakMedicalMode"  v-if="scope.row.bakTradeName == '无' || scope.row.bakTradeName == null">{{ scope.row.bakMedicalMode }}</span>

                </div>
              </ul>
            </template>
          </el-table-column>
          <el-table-column prop="drugStorage" min-width="200" label="产品信息" show-overflow-tooltip>
            <template slot-scope="scope">
              <div class="pro-details" :title="getSpecHints(scope.row.bakMedicalSpec,scope.row.bakStandRate,scope.row.useUnit,scope.row.metricName ,scope.row.bakWrapName)">

                <span class="text-inlie"  v-if="scope.row.bakWrapName != '空' && scope.row.bakWrapName != null">{{ scope.row.bakMedicalSpec}} × {{ scope.row.bakStandRate}} {{scope.row.useUnit}} / {{ scope.row.metricName}} &nbsp;&nbsp; {{ scope.row.bakWrapName}}</span>
                <span class="text-inlie"  v-if="scope.row.bakWrapName == '空' || scope.row.bakWrapName == null">{{ scope.row.bakMedicalSpec}} × {{ scope.row.bakStandRate}} {{scope.row.useUnit}} / {{ scope.row.metricName}}</span>

              </div>
              <div :title="getPackHints(scope.row.bakFactoryEasy,scope.row.middleStandRate,scope.row.bigMiddleRate)" class="pro-details" v-if="scope.row.bakFactoryEasy!=''">{{ scope.row.bakFactoryEasy}}&nbsp;&nbsp; 中大包装:  {{ scope.row.middleStandRate}}/{{ scope.row.bigMiddleRate}}</div>
            </template>
          </el-table-column>

          <el-table-column prop="drugStorage" label="药库" v-if="this.resMainData != undefined && this.resMainData.repositoryFlag">
            <template slot-scope="scope">
              <span>{{ scope.row.repositoryName }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="enterprise" label="配送地址" width="120">
            <template slot-scope="scope">
              <el-select v-model="scope.row.addressId" placeholder="请选择" size="small"
                         @change="handleChangeAddress(scope.row.addressId,scope.row.purchaseId,scope.row.id,scope.row.repositoryId,scope.row.productId)">
                <el-option v-for="item in scope.row.addresses" :key="item.address" :label="item.addressAbbr" :value="item.id">
                </el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="价格" header-align="left" align="center" width="180" prop="pi.unit_Price" sortable="custom"  >
            <template slot-scope="scope">
              <div>{{ priceFormat(scope.row.unitPrice) }}</div>
              <range-bar :rangeData="[scope.row.unitPrice,scope.row.minTradePrice,scope.row.maxTradePrice,1]"></range-bar>
            </template>
          </el-table-column>
          <el-table-column prop="enterprise" label="配送企业">
            <template slot-scope="scope">
              <el-select v-model="scope.row.senderOrgid" placeholder="请选择" size="small"
                         @change="handleChangeSender(scope.row.senderOrgid,scope.row.purchaseId,scope.row.id,scope.row.productId)">
                <el-option v-for="(item,index) in scope.row.sendBusiness" :key="item.index" :label="item.senderEasy" :value="item.senderId">
                </el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="数量" width="160">
            <!--@input="handleAddMinus(scope.row.requestQty,scope.row.id,scope.row.purchaseId)"-->
            <template slot-scope="scope">
              <el-input-number size="small" class="width-120" v-model="scope.row.requestQty" :min="1" :step="10"
                               @change="handleAddMinus"
                               @focus="amountStatistics(scope.row)">
              </el-input-number>
              <i class="iconfont icon-shanchu" style="cursor:pointer" @click="handleDeleteOneMedicine(scope.row.purchaseItemId)"></i>
            </template>
          </el-table-column>
          <el-table-column prop="buyerRemark" label="备注" show-overflow-tooltip>
            <template slot-scope="scope">
              <span @click="dataBackFillGoods" v-if="scope.row.id !=cellIndex">{{ scope.row.remark }}</span>
              <span>
                <el-input size="mini" v-model="scope.row.remark" v-if="scope.row.id===cellIndex"
                              @blur="handleCellSubmit(scope.row.id,scope.row.remark)">
                </el-input>
              </span>
            </template>
          </el-table-column>
        </el-table>
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

        <el-dialog title="采购计划名称" :visible.sync="dialogFormVisible3" width="20%">
          <el-form>
            <el-input placeholder="请输入内容" size="small" v-model="this.byName" ></el-input>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible3 = false">取 消</el-button>
            <el-button type="primary" @click="shoppingRemarks">确 定</el-button>
          </div>
        </el-dialog>

        <ul class="explain">
          <li>标记说明：</li>
          <li><i class="ico icon-qu"></i><span>区目录药品</span></li>
          <li><i class="ico icon-jc"></i><span>基本药物目录</span></li>
          <li><i class="ico icon-ji"></i><span>急需药品</span></li>
          <li><i class="ico icon-yi"></i><span>医保药品</span></li>
          <li><i class="ico icon-liang"></i><span>两票制</span></li>
          <li><i class="ico icon-kang"></i><span>抗菌药</span></li>
          <li><i class="ico icon-budan"></i><span>补单</span></li>
        </ul>
      </div>
      <div class="foot-btn">
        <div class="foot-left">
          <el-button type="success" size="small " @click="handleAddMedicine()">增加药品</el-button>
          <el-button type="danger" size="small " @click="handleDeleteMedicine()">删除药品</el-button>
          <!--<el-button type="primary" size="small" @click="handleUpdateSuppleSet()"-->
                     <!--v-if="this.resMainData != undefined && (this.resMainData.flag == '0' || this.resMainData.flag == '1')">-->
            <!--设置补单-->
          <!--</el-button>-->
          <!--<el-button type="warning" size="small" @click="handleUpdateSuppleCancel()"-->
                     <!--v-if="this.resMainData != undefined && (this.resMainData.flag == '2' || this.resMainData.flag == '3')">-->
            <!--取消补单-->
          <!--</el-button>-->
          <!--<el-button type="success" size="small" @click="handlePurchaseRemark()">-->
            <!--整单备注-->
          <!--</el-button>-->
          <!--<el-button type="success" size="small" @click="handleApproveRemark()">-->
            <!--审核备注-->
          <!--</el-button>-->
          <el-button type="success" size="small" @click="handleByName()">
            计划名称
          </el-button>
        </div>
      </div>
    </div>
    <!--<div class="log-box">-->
      <!--<div class="title-name">-->
        <!--<span>-->
          <!--采购计划名称:-->
        <!--</span>-->
        <!--<span>-->
          <!--<el-input v-model="query.searchProductName" placeholder="输入的采购计划名称" size="small" class="width-520"></el-input>-->
        <!--</span>-->
      <!--</div>-->

    <!--</div>-->
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
<script>

  // 引入用户相关请求
  import {queryPlanItemList,deletePlanItemMedical,updatePlanItemMedicalDegree,findPlanDetail,updatePurchaseItemAddress}from 'src/axios/trade/purchase/purchase'
  import {savePurchase,updatePurchaseItemRemark,updatePurchaseItemSender,updatePurchaseItemQty,updatePlanByName}from 'src/axios/trade/plan/planList'
  import {isNumber} from "src/utils/validateUtil";
  import {priceFormat,keyBoardEnter} from "src/utils";
  import {getPackHints,getSpecHints} from "src/utils/validateUtil";
  import RangeBar from 'src/components/RangeBar'
  export default {
    components: {
      RangeBar
    },
    data() {
      return {
        currentOrder: undefined,
        query: this.metaQuery(),
        resData: this.metaData(),
        resMainData: this.metaMainData(),
        centerDialogVisible: false,
        cellIndex: undefined,
        dialogTableVisible: false,
        dialogFormVisible: false,
        dialogFormVisible2:false,
        dialogFormVisible3:false,
        byName: '',
        dataList: [],
        tableData: [],
        purchaseId: undefined,
        curentMode:undefined
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
      getPackHints,
      getSpecHints,
      priceFormat,
      sortChang(value){
        let sortType=" desc"
        if(value.order.startsWith("asc")){
          sortType=" asc";
        }
        this.currentOrder=value.prop + sortType;
        this.list()
      },
      searchEnterFun(e){
        this.$store.state.pageSeach.pageNum = 1;
        this.resData.pageNum = 1;
        keyBoardEnter(e,() =>{
          this.list();
        })
      },
      list () {
        this.resData.orderBy=this.currentOrder;
        queryPlanItemList(this.resData, this.query,this.purchaseId).then(res => {
          this.resData = res.data;
          findPlanDetail(this.purchaseId).then(res => {
            this.resMainData = res.data;
            this.byName = res.data.byName;
          })
        })
      },
      handleAddMedicine(){
        this.$router.push("/trade/manage/addPlanMedicine/"+this.purchaseId)
      },
      handlePurchaseRemark(){
        if(this.resMainData == undefined){
          this.$alert('该产品明细已清空', '提示', {
            confirmButtonText: '确定',
            type: 'warning',
          })
          return false
        }else {
          this.dialogFormVisible = true
        }
      },
      shoppingRemarks(){
        updatePlanByName(this.byName,this.purchaseId).then(res => {
          this.$message({
            message: res.data,
            type: 'success',
            duration: 1000,
            onClose: () => {
              this.dialogFormVisible3 = false;
            }
          })
        })

      },

      handleByName(){
        if("undefined" == this.purchaseId){
          this.$alert('该采购计划已清空', '提示', {
            confirmButtonText: '确定',
            type: 'warning',
          })
          return false
        }else {
          this.dialogFormVisible3 = true
        }
      },
      handleChangeAddress(addressId,purchaseId,purchaseItemId,repositoryId,productId){
        updatePurchaseItemAddress(addressId,purchaseId,purchaseItemId,repositoryId,productId).then(res => {
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
          var planItemIds='';
          var purchaseId=this.purchaseId;
          for(var noticeType of this.dataList){
            planItemIds += (noticeType.id + ',');
          }
          planItemIds = planItemIds.slice(0,-1);
          deletePlanItemMedical(planItemIds,purchaseId).then(res => {
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
      createPurchase(){


        this.centerDialogVisible=true;
      },
      goBack() {
        this.$router.go(-1)
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
      handleUpdateDegreeSet(id,purchaseId){
        updatePlanItemMedicalDegree(id,purchaseId,'1').then(res => {
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
      handleCellSubmit(planItemId,buyerRemark){
        updatePurchaseItemRemark(planItemId,buyerRemark).then(res => {
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
      metaDataRequest () {
        return {
          pageNum: 1,
          pageSize: 20
        }
      },
      handleUpdateDegreeCancel(id,purchaseId){
        updatePlanItemMedicalDegree(id,purchaseId,'0').then(res => {
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
      amountStatistics(row){
        this.curentMode=row;
      },
   /*   amountStatistics(requestQty,purchaseItemId,purchaseId){
        console.log("======"+1231232132131231232)
        updatePurchaseItemQty(requestQty,purchaseItemId,purchaseId).then(res => {
          this.$message({
            message: res.data,
            type: 'success',
            duration: 1000,
            onClose: () => {
              this.list()
            }
          })
        })
      },*/
      handleAddMinus(newVal, oldVal){
        if(!isNumber(newVal)){
          this.$nextTick(function () {
            this.curentMode.requestQty=oldVal;
          })
        }else{
          updatePurchaseItemQty(this.curentMode.requestQty,this.curentMode.id,this.curentMode.purchaseId).then(res => {
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
      },
      handleDeleteOneMedicine(purchaseItemId){
        this.$confirm('确认删除吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          var purchaseId=this.purchaseId;
          deletePlanItemMedical(purchaseItemId,purchaseId).then(res => {
            this.$message({
              message: res.data,
              type: 'success',
              duration: 1000,
              onClose: () => {
                this.list()
              }
            })
          })
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      handleChangeSender(senderId,purchaseId,planItemId,productId){
        updatePurchaseItemSender(senderId,purchaseId,planItemId,productId).then(res => {
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
      handleBack() {
        this.$router.push("/trade/manage/firstInstanceRole/firstApprovalTabs")
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
      metaMainData () {
        return {
          purchaseCode: undefined,
          createDate: undefined,
          requestTotal: undefined,
          createName: undefined,
          linkPhone: undefined,
          bakBuyerEasy: undefined,
          purchaseState: undefined,
          byName: undefined
        }
      },
      metaData () {
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
          list: undefined
        }
      }
    }
  }
</script>



