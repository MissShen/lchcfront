<template>
  <div>
    <!-- ========================== 主内容start ========================= -->
    <el-form ref="query" :model="resMainData">
    <div class="tabs-echo">
      <div class="tabs-echo-left">
        <div class="title">
          <span>采购模板</span>
        </div>
        <div class="tools">
          <el-button type="primary" size="small " @click="handleSavePurchase()">生成采购单</el-button>
          <el-button size="small" class="el-button-pale" @click="goBack">返回</el-button>
        </div>
      </div>
      <div class="tabs-echo-right">
        <ul class="tabs-echo-ul">
          <li>模板编号：<span>{{resMainData.purchaseCode}}</span></li>
          <li>创建时间：<span>{{resMainData.createDate}}</span></li>
          <li>拟采金额：<span class="red">{{ priceFormat(resMainData.requestTotal) }}</span></li>
        </ul>
        <ul class="tabs-echo-ul">
          <li>模板名称：
            <!--  <span >{{this.resMainData.byName}}</span>-->
              <span>
                <el-input  v-model="resMainData.byName"
                           @change="updateTemplateByName(resMainData.byName)" size="small" class="width-130" >
                </el-input>
              </span>
          </li>
          <li>创建人：<span>{{resMainData.createName}} </span></li>
          <li>买方机构：<span>{{resMainData.bakBuyerEasy}}</span></li>
        </ul>
      </div>
    </div>
    </el-form>
    <!-- 表格列表 -->
    <div class="tablebox">
        <el-form :inline="true" :model="query" ref="formQuery" class="table-form">
            <el-form-item class="width-120">
              <el-input v-model="query.searchProductName" @keyup.enter.native="searchEnterFun" placeholder="品名" size="small"></el-input>
            </el-form-item>
            <el-form-item class="width-120">
              <el-input v-model="query.searchMedicalSpec" @keyup.enter.native="searchEnterFun" placeholder="规格" size="small"></el-input>
            </el-form-item>
          <el-form-item class="width-120">
            <el-input v-model="query.searchOrgName"  @keyup.enter.native="searchEnterFun" name="searchOrgName" placeholder="生产企业" size="small"></el-input>
          </el-form-item>
          <el-form-item class="width-120">
            <el-input v-model="query.searchSenderName" @keyup.enter.native="searchEnterFun" name="searchSenderName" placeholder="配送企业" size="small"></el-input>
          </el-form-item>
          <el-form-item class="width-120">
            <el-input v-model="query.searchAddress" @keyup.enter.native="searchEnterFun" name="searchAddress" placeholder="配送地址" size="small"></el-input>
          </el-form-item>
          <el-form-item class="width-120">
            <el-select v-model="query.searchBasicFlag" @keyup.enter.native="searchEnterFun" placeholder="是否基药" size="small">
              <el-option label="全部" value=""></el-option>
              <el-option label="是" value="1"></el-option>
              <el-option label="否" value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="width-120">
            <el-select v-model="query.searchIsRegion" @keyup.enter.native="searchEnterFun" placeholder="是否区目录" size="small">
              <el-option label="全部" value=""></el-option>
              <el-option label="是" value="1"></el-option>
              <el-option label="否" value="0"></el-option>
            </el-select>
          </el-form-item>
       <!--   <el-form-item class="width-120">
            <el-select v-model="query.searchTwoVotes" @keyup.enter.native="searchEnterFun" placeholder="是否两票制" size="small">
              <el-option label="全部" value=""></el-option>
              <el-option label="是" value="1"></el-option>
              <el-option label="否" value="0"></el-option>
            </el-select>
          </el-form-item>-->
            <el-form-item>
              <el-button type="success" size="small" @click="searchEnterFun">查询</el-button>
              <el-button type="warning" size="small" @click="restQuery()">重置</el-button>
             </el-form-item>
        </el-form>
      <div class="tableset">
        <el-table ref="multipleTable" :data="resData.list" tooltip-effect="dark"
                  style="width: 100%" @selection-change="handleSelectionChange"  @cell-click="handleCell" stripe border @sort-change="sortChang">
          <el-table-column type="selection" width="40" align="center"></el-table-column>
          <el-table-column label="产品名" min-width="200"  prop="BAK_PRODUCT_NAME" sortable="custom">
            <template slot-scope="scope" class="drugMessage">
              <ul class="ico-zt">
                <li class="ico-left">
                  <i v-if="scope.row.basicMedicantFlag != '0'" class="ico icon-jc"></i>
                  <i v-if="scope.row.isRegion != '0'" class="ico icon-qu"></i>
                  <i v-if="scope.row.twoVoteType != '0'" class="ico icon-liang"  ></i>
                </li>
                <li>
                  <!--tootip提示气泡-->
                  <!--:enterable="false" 鼠标不可进入tooltip中-->
                  <el-tooltip placement="top" :enterable="false">
                    <!--气泡内容（必须放在slot="content"内）,布局与源内容保持一致-->
                    <div slot="content">
                      <div>{{ scope.row.bakProductName }}</div>
                      <div v-if="scope.row.bakTradeName != '无' && scope.row.bakTradeName !=null">{{ scope.row.bakMedicalMode }}({{ scope.row.bakTradeName }})</div>
                      <div v-if="scope.row.bakTradeName == '无' || scope.row.bakTradeName ==null">{{ scope.row.bakMedicalMode }}</div>
                    </div>

                    <!--源内容（必须放在class="el-tooltip-box"内）-->
                    <div class="el-tooltip-box">
                      <!--加class="text-inline"确保内容不折行-->
                      <div class="text-inline">{{ scope.row.bakProductName }}</div>
                      <div class="text-inline"  v-if="scope.row.bakTradeName != '无' && scope.row.bakTradeName !=null">{{ scope.row.bakMedicalMode }}({{ scope.row.bakTradeName }})</div>
                      <div class="text-inline"  v-if="scope.row.bakTradeName == '无' || scope.row.bakTradeName ==null">{{ scope.row.bakMedicalMode }}</div>
                    </div>
                  </el-tooltip>
                </li>
              </ul>
            </template>
          </el-table-column>
          <el-table-column prop="drugStorage" label="产品信息" min-width="170">
            <template slot-scope="scope">
              <el-tooltip placement="top" :enterable="false">
                <div slot="content">
                  {{getSpecHints(scope.row.bakMedicalSpec,scope.row.bakStandSpecRate,scope.row.bakUseUnit,scope.row.bakSpecUnit,scope.row.bakWrapName)}}<br/>
                  {{getPackHints(scope.row.bakFactoryEasy,scope.row.bakMiddleStandRate,scope.row.bakBigMiddleRate)}}
                </div>
                <div class="el-tooltip-box">
                  <div class="text-inline">
                    <span v-if="scope.row.bakWrapName != '空' && scope.row.bakWrapName !=null">{{ scope.row.bakMedicalSpec}} × {{ scope.row.bakStandRate}} {{scope.row.useUnit}} / {{ scope.row.metricName}} &nbsp;&nbsp; {{ scope.row.bakWrapName}}</span>
                    <span v-if="scope.row.bakWrapName == '空' || scope.row.bakWrapName ==null">{{ scope.row.bakMedicalSpec}} × {{ scope.row.bakStandRate}} {{scope.row.useUnit}} / {{ scope.row.metricName}}</span>
                  </div>
                  <div class="text-inline" >
                    {{ scope.row.bakFactoryEasy}} &nbsp;&nbsp; 中大包装: {{ scope.row.bakMiddleStandRate}}/{{ scope.row.bakBigMiddleRate}}
                  </div>
                </div>
              </el-tooltip>

           </template>
          </el-table-column>
          <el-table-column prop="addresses" label="配送地址" width="150">
            <template slot-scope="scope">
              <el-select v-model="scope.row.addressId" placeholder="请选择" size="small" name="addresses"
                         @change="handleChangeAddress(scope.row.itemSenderOrgId,scope.row.addressId,scope.row.productId,scope.row.repositoryId)"
              >
                <el-option v-for="(item,index) in scope.row.addresses" :key="item.index" :label="item.addressAbbr" :value="item.id">
                </el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column  label="药库" v-if="this.resMainData.repositoryFlag" prop="REPOSITORY_NAME" sortable="custom" >
            <template slot-scope="scope">
              <span>{{ scope.row.repositoryName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="单价" header-align="left" align="center" width="160" prop="UNIT_PRICE" sortable="custom" >
            <template slot-scope="scope">
              <!--<div>{{ priceFormat(scope.row.unitPrice) }}</div>-->
              <div v-if="scope.row.priceSource == '0'">
                {{ priceFormat(scope.row.unitPrice) }}
              </div>
              <div v-if=" scope.row.priceSource == '1'">
                {{ priceFormat(scope.row.unitPrice) }}(议价)
              </div>
              <div v-if="scope.row.priceSource == '2'">
                {{ priceFormat(scope.row.unitPrice) }}(降价)
              </div>
              <div v-if=" scope.row.priceSource == '3'">
                {{ priceFormat(scope.row.unitPrice) }}(被动降价)
              </div>
              <div v-if="scope.row.priceSource == '4'">
                {{ priceFormat(scope.row.unitPrice) }}(涨价)
              </div>
              <div v-if=" scope.row.enableFlag == '3'">
                (待谈判)
              </div>
              <template v-if="scope.row.minTradePrice == '0.00' && scope.row.maxTradePrice == '0.00'">
                <range-bar :rangeData="[scope.row.hitPrice,scope.row.minTradePrice,scope.row.maxTradePrice]"></range-bar>
              </template>
              <template v-else>
                <range-bar :rangeData="[scope.row.hitPrice,scope.row.minTradePrice,scope.row.maxTradePrice, 1, 1]"
                           @bar-click="tradePriceHistory(scope.row.productId)"></range-bar>
              </template>
            </template>
          </el-table-column>
          <el-table-column prop="enterprise" label="配送企业" width="150">
            <template slot-scope="scope">
              <el-select v-model="scope.row.senderOrgid" placeholder="请选择" size="small" name="sendBusiness"
                         @change="handleChangeSender(scope.row.senderOrgid,scope.row.productId,scope.row.repositoryId,scope.row.addressId,scope.row.productId)">
                <el-option v-for="(item,index) in scope.row.sendBusiness" :key="item.index" :label="item.senderEasy" :value="item.senderId">
                </el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column show-overflow-tooltip  label="数量" width="150"prop="request_Qty" sortable="custom" >
            <template slot-scope="scope">
              <el-input size="small" style="width: 110px !important;" v-model="scope.row.requestQty"
                               @change="handleAddMinus(scope.row.productId,scope.row.requestQty)">
              </el-input>
              <i class="iconfont icon-shanchu" style="cursor:pointer" @click="handleDeleteOneMedicine(scope.row.productId)"></i>
            </template>
          </el-table-column>
          <el-table-column label="金额" width="70" align="right">
            <template slot-scope="scope">
              <span>{{ scope.row.itemTemplateTotal }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="buyerRemark" label="备注" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>
                <el-input size="small" v-model="scope.row.remark"
                          @blur="handleChangeRemark(scope.row.id,scope.row.remark)">
                </el-input>
              </span>
              <!--<span @click="dataBackFillGoods" v-if="scope.row.id !=cellIndex">{{ scope.row.remark }}</span>-->
              <!--<span><el-input size="small" v-model="scope.row.remark"-->
                              <!--v-if="scope.row.id===cellIndex"-->
                              <!--@blur="handleChangeRemark(scope.row.id,scope.row.remark)"-->
              <!--&gt;</el-input></span>-->
            </template>
          </el-table-column>
        </el-table>
        <div class="pagebox">
          <ul class="explain">
            <li><i class="ico icon-qu"></i><span>区目录</span></li>
            <li><i class="ico icon-jc"></i><span>基本药物</span></li>
            <li><i class="ico icon-ji"></i><span>急需药品</span></li>
            <li><i class="ico icon-yi"></i><span>医保药品</span></li>
            <li><i class="ico icon-liang"></i><span>两票制</span></li>
            <li><i class="ico icon-kang"></i><span>抗菌药</span></li>
            <li><i class="ico icon-budan"></i><span>补单</span></li>
          </ul>
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
      <div class="foot-btn">
        <div class="foot-left">
          <el-button type="success" size="small" @click="handleAddMedicine()"> 增加药品</el-button>

          <el-button type="danger" size="small" @click="handleDeleteMedicine()">删除药品</el-button>

       <!--   <el-button type="primary" size="small" @click="handleUpdateDegreeSet()">保存</el-button>-->


        </div>
      </div>

    </div>
    <trade-price-history-dialog  v-if="formViewVisible" ref="tradePriceHistoryDialog"></trade-price-history-dialog>

  </div>
</template>
<script>

  // 引入用户相关请求
  import {queryPlanItemList,deleteMedicineTemplate,updatePlanItemMedicalDegree,
    findTemplateDetail,queryTemplateItemList,saveTemplatePurchase,updateTemplateItemRemark,updateTemplateItemQty,updateTemplateByName,updateTemplateItemAddress,updateTemplateItemSender,selectLiang}from 'src/axios/trade/purchase/purchase'
  import {priceFormat,keyBoardEnter} from "src/utils";
  import {getSpecHints,getPackHints,isNumber} from "src/utils/validateUtil";
  import tradePriceHistoryDialog from 'src/pages/trade/tradecenter/buyerrole/purchase/tradePriceHistoryDialog'
  import RangeBar from 'src/components/RangeBar';


  export default {
    components:{
      tradePriceHistoryDialog,
      RangeBar
    },
    data() {
      return {
        formViewVisible: false,
        curentMode:undefined,
        currentOrder: undefined,
        query: this.metaQuery(),
        resData: this.metaData(),
        resMainData: this.metaMainData(),
        cellIndex: undefined,
        dataList: [],
        tableData: [],
        purchaseId: undefined,
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
      getSpecHints,
      getPackHints,
      priceFormat,
      sortChang(value){
        let sortType=" desc"
        if(value.order.startsWith("asc")){
          sortType=" asc";
        }
        this.currentOrder=value.prop + sortType;
        this.list()
      },

      list () {
        this.resData.orderBy=this.currentOrder;
        queryTemplateItemList(this.purchaseId,this.query,this.resData).then(res => {
        //queryTemplateItemList(this.purchaseId,this.query.searchProductName,this.query.searchMedicalSpec,this.resData,).then(res => {
          this.resData = res.data;

          if (this.resData.pageNum === 0) {
            this.resData.pageNum = 1
          }
          if (this.resData.pageSize === 0) {
            this.resData.pageSize = 20
          }
         /* if(this.resData.list.length ==0){
            this.$router.push("/trade/manage/buyerrole/purchaseTabs")
          }*/
          findTemplateDetail(this.purchaseId).then(res => {
            this.resMainData = res.data
          })
        })
      },
      tradePriceHistory(productId){
        this.formViewVisible = true;
        console.log(productId)
        this.$nextTick(() => {
          this.$refs.tradePriceHistoryDialog.govPopupParam(productId);
        })
      },


      searchEnterFun(e){
        this.$store.state.pageSeach.pageNum = 1;
        this.resData.pageNum = 1;
        keyBoardEnter(e,() =>{
          this.list();
        })
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
              idList += (noticeType.productId + ',');
            }
            deleteMedicineTemplate(idList,purchaseId).then(res => {
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
      handleDeleteOneMedicine(idList){
        var purchaseId=this.purchaseId;
        deleteMedicineTemplate(idList,purchaseId).then(res => {
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
      handleSavePurchase(){
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
      handleUpdateDegreeSet(){

        if(this.dataList.length<1){
          this.$alert('请至少选择一条数据', '提示', {
            confirmButtonText: '确定',
            type: 'warning',
          })
          return false
        }else{
          var planItemIds='';
          var purchaseId='';
          for(var noticeType of this.dataList){
            planItemIds += (noticeType.id + ',');
            if(purchaseId == ''){
              purchaseId = noticeType.purchaseId
            }
          }
          planItemIds = planItemIds.slice(0,-1);
          updatePlanItemMedicalDegree(planItemIds,purchaseId,'1').then(res => {
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
          var planItemIds='';
          var purchaseId='';
          for(var noticeType of this.dataList){
            planItemIds += (noticeType.id + ',');
            if(purchaseId == ''){
              purchaseId = noticeType.purchaseId
            }
          }
          planItemIds = planItemIds.slice(0,-1);
          updatePlanItemMedicalDegree(planItemIds,purchaseId,'0').then(res => {
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

      handleBack() {
        this.$router.push("/trade/manage/firstInstanceRole/firstApprovalTabs")
      },

      goBack() {
        this.$router.go(-1)
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
          searchProductName: undefined,
          searchMedicalSpec: undefined,
          requestTotal: undefined,
          requestQty: undefined,
          buyerRemark: undefined,
          searchOrgName: undefined,
          searchSenderName: undefined,
          searchAddress:undefined,
          searchBenDate: undefined,
          searchEndDate: undefined,
          searchBasicFlag: undefined,
          searchTwoVotes: undefined,
          searchIsRegion:undefined,
          list: []

        }
      },
      dataBackFillGoods () {
        this.remarkShow=!this.remarkShow;
      },
      handleSelectionChange(val) {
        this.dataList = val;
      },
      handleSizeChange (val) {

        this.resData.pageSize = val
        /*this.list()*/
      },
      handleCurrentChange (val) {
        this.resData.pageNum = val
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
      getDrugStorage(bakMedicalSpec,bakStandSpecRate,bakUseUnit,bakSpecUnit,bakMiddleStandRate,bakBigMiddleRate){
        let _bakMedicalSpec = bakMedicalSpec || '';
        let _bakStandSpecRate = bakStandSpecRate || '';
        let _bakUseUnit = bakUseUnit || '';
        let _bakSpecUnit = bakSpecUnit || '';
        let _bakMiddleStandRate = bakMiddleStandRate || '';
        let _bakBigMiddleRate = bakBigMiddleRate || '';
        return _bakMedicalSpec+'×'+_bakStandSpecRate+_bakUseUnit+'/'+_bakSpecUnit+' \n中大包装:'+_bakMiddleStandRate +'/'+_bakBigMiddleRate
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
          byName:undefined,
          repositoryFlag: false
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
          list: []
        }
      },
/*      amountStatistics(row){
        this.curentMode=row;
        if(!isNumber(newVal)){
          this.$nextTick(function () {
            this.curentMode.requestQty=oldVal;
          })
        }else {
          updateTemplateItemQty( this.curentMode.Id, this.curentMode.requestQty,this.curentMode.purchaseId).then(res => {
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
      },*/
      handleAddMinus(productId,requestQty){
        if(!isNumber(requestQty)) {
          this.$message({
            message: '请正确输入数量！',
            type: 'warning'
          });
          this.list();
          return false
        }else{
          updateTemplateItemQty(productId,requestQty,this.purchaseId).then(res => {
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



      handleAddMedicine() {
        if (this.resMainData == undefined) {
          this.$alert('该采购单已失效', '提示', {
            confirmButtonText: '确定',
            type: 'warning',
          });
          return false
        } else {
          this.$router.push("/trade/manage/firstInstanceRole/addTemplateMedicine/" + this.purchaseId)
        }
      },
      changeSendBusiness(rowSide,row,business){
        for(let i=0;i<row.length;i++){
          if(row[i].senderId==business){
            rowSide.bakBigMiddleRate=row[i].bigMiddleRate;
            rowSide.bakMiddleStandRate=row[i].middleStandRate;
          }
        }
      },
      handleChangeRemark(id,buyerRemark) {
        updateTemplateItemRemark(id,buyerRemark,this.purchaseId).then(res => {
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
      updateTemplateByName(byName) {
        console.log(byName)
        updateTemplateByName(this.purchaseId,byName).then(res => {
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
      handleChangeAddress(senderId,addressId,productId,repositoryId){
        updateTemplateItemAddress(senderId,addressId,this.purchaseId,productId,repositoryId).then(res => {
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
      handleChangeSender(senderId,productId,repositoryId,addressId){
        updateTemplateItemSender(senderId,this.purchaseId,productId,repositoryId,addressId).then(res => {
          this.$message({
            message: res.data,
            type: 'success',
            duration: 1000,
            onClose: () => {
              this.list()
            }
          })
        });
        selectLiang(senderId).then(res => {
          row.twoVoteType=res.data;
        })
        for(let i=0;i<sendBusiness.length;i++){
          if(sendBusiness[i].senderId==senderId){
            row.bakBigMiddleRate=sendBusiness[i].bigMiddleRate;
            row.bakMiddleStandRate=sendBusiness[i].middleStandRate;
          }
        }
      },

    }
  }
</script>
