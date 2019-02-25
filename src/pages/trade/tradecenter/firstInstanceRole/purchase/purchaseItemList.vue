<template>
  <div>
    <!-- ========================== 主内容start ========================= -->
    <div class="tabs-echo">
      <div class="tabs-echo-left">
        <div class="title">
          <span>采购单状态：{{getState(this.resMainData.purchaseState)}}</span>
        </div>
        <div class="tools">
          <!--<el-button type="warning" size="small " @click="handleBack()">返回</el-button>-->
          <el-button type="" @click="goBack">返回</el-button>
        </div>
      </div>
      <div class="tabs-echo-right">
        <ul class="tabs-echo-ul">
          <li>采购单编号：<span>{{this.resMainData.purchaseCode}}</span></li>
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
          <li>整单备注:<span v-if="this.resMainData != undefined">{{this.resMainData.orderRemark}}</span></li>
          <li>送审说明:<span v-if="this.resMainData != undefined">{{this.resMainData.approveRemark}}</span></li>
        </ul>
      </div>
    </div>
    <!-- 表格列表 -->
    <div class="tablebox">
      <div class="table-form">
        <span class="form-title">采购单明细</span>
        <el-form :inline="true" :model="query" ref="formQuery"  class="form-right">
          <el-form-item class="width-120">
            <el-input v-model="query.searchProductName" @keyup.enter.native="searchEnterFun" placeholder="品名" size="small"></el-input>
          </el-form-item>
          <el-form-item class="width-120">
            <el-input v-model="query.searchMedicalSpec" @keyup.enter.native="searchEnterFun" placeholder="规格" size="small"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="success" size="small" @click="searchEnterFun">查询</el-button>
            <el-button type="warning" size="small" @click="restQuery()">重置</el-button>
           </el-form-item>
        </el-form>
      </div>

      <div class="tableset">

        <el-table ref="multipleTable" :data="resData.list" tooltip-effect="dark"
                  style="width: 100%" @selection-change="handleSelectionChange"  @cell-click="handleCell" stripe border @sort-change="sortChang" >
          <!--<el-table-column type="selection" width="55" align="center"></el-table-column>-->
          <el-table-column label="产品名"  min-width="200" prop="p.BAK_PRODUCT_NAME" sortable="custom" >
            <template slot-scope="scope" class="drugMessage">
              <ul class="ico-zt">
                <li class="ico-left">
                  <i class="ico icon-ji" v-if="scope.row.degreeFlag == '2'"></i>
                  <i class="ico icon-jihui" v-if="scope.row.degreeFlag == '0'" ></i>
                  <i class="ico icon-jc" v-if="scope.row.basicMedicantFlag == '1'"></i>
                  <i class="ico icon-qu" v-if="scope.row.isRegion == '1'"></i>
                  <i class="ico icon-liang" v-if="scope.row.twoVoteType != '0'" ></i>
                </li>
            <!--    <div><li class="ellipsis es200" :title="scope.row.bakProductName">   {{ scope.row.bakProductName }}</li></div>
                <div> (商品名：{{ scope.row.bakTradeName }})</div>-->
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
          <el-table-column prop="drugStorage" label="产品信息" min-width="200">
            <template slot-scope="scope">
              <el-tooltip placement="top" :enterable="false">
                <div slot="content">
                  {{getSpecHints(scope.row.bakMedicalSpec,scope.row.bakStandRate,scope.row.useUnit,scope.row.metricName,scope.row.bakWrapName)}}<br/>
                  {{getPackHints(scope.row.bakFactoryEasy,scope.row.middleStandRate,scope.row.bigMiddleRate)}}
                </div>
                <div class="el-tooltip-box">
                  <div class="text-inline">
                    <span class="text-inline"  v-if="scope.row.bakWrapName != '空' && scope.row.bakWrapName != null">{{ scope.row.bakMedicalSpec}} × {{ scope.row.bakStandRate}} {{scope.row.useUnit}} / {{ scope.row.metricName}}&nbsp;&nbsp; {{ scope.row.bakWrapName}}</span>
                    <span class="text-inline"  v-if="scope.row.bakWrapName == '空' || scope.row.bakWrapName == null">{{ scope.row.bakMedicalSpec}} × {{ scope.row.bakStandRate}} {{scope.row.useUnit}} / {{ scope.row.metricName}}</span>
                  </div>
                  <div class="text-inline" >
                    {{ scope.row.bakFactoryEasy}}&nbsp;&nbsp; 中大包装: {{ scope.row.middleStandRate}}/{{ scope.row.bigMiddleRate}}
                  </div>
                </div>
              </el-tooltip>
            </template>
          </el-table-column>

          <el-table-column label="药库" v-if="this.resMainData.repositoryFlag" prop="p.REPOSITORY_NAME" sortable="custom">
            <template slot-scope="scope">
              <span>{{ scope.row.repositoryName }}</span>
            </template>
          </el-table-column>
          <el-table-column  label="配送地址" min-width="150" prop="p.ADDRESS_NAME" sortable="custom" >
            <template slot-scope="scope">
              <span>{{scope.row.addressAbbr}}</span>
              <!--<el-select v-model="scope.row.addressId" placeholder="请选择" size="small"-->
                         <!--@change="handleChangeAddress(scope.row.addressId,scope.row.purchaseId,scope.row.id,scope.row.repositoryId)">-->
                <!--<el-option v-for="item in scope.row.addresses" :key="item.address" :label="item.address" :value="item.id">-->
                <!--</el-option>-->
              <!--</el-select>-->
            </template>
          </el-table-column>
          <el-table-column  label="价格" align="center" width="150" prop="p.UNIT_PRICE" sortable="custom" >
            <template slot-scope="scope">
              <!--<div>{{ priceFormat(scope.row.unitPrice) }}</div>-->
              <div v-if="scope.row.enableFlag == '1' && scope.row.priceSource == '0'">
                {{ priceFormat(scope.row.unitPrice) }}
              </div>
              <div v-if="scope.row.enableFlag == '1' && scope.row.priceSource == '1'">
                {{ priceFormat(scope.row.unitPrice) }}(议价)
              </div>
              <div v-if="scope.row.enableFlag == '1' && scope.row.priceSource == '2'">
                {{ priceFormat(scope.row.unitPrice) }}(降价)
              </div>
              <div v-if="scope.row.enableFlag == '1' && scope.row.priceSource == '3'">
                {{ priceFormat(scope.row.hitPrice) }}(被动降价)
              </div>
              <div v-if="scope.row.enableFlag == '1' && scope.row.priceSource == '4'">
                {{ priceFormat(scope.row.hitPrice) }}(涨价)
              </div>
              <div v-if="scope.row.enableFlag == '2' || scope.row.enableFlag == '3' || scope.row.enableFlag == '4' || scope.row.enableFlag == '5'">
                (待谈判)
              </div>
              <range-bar :rangeData="[scope.row.unitPrice,scope.row.minTradePrice,scope.row.maxTradePrice,1]"></range-bar>
            </template>
          </el-table-column>
          <el-table-column  label="配送企业" prop="p.BAK_SENDER_EASY" sortable="custom" min-width="150">
            <template slot-scope="scope">
              <span>{{ scope.row.bakSenderEasy }}</span>
              <!--<el-select v-model="scope.row.senderOrgid" placeholder="请选择" size="small"-->
                         <!--@change="handleChangeSender(scope.row.senderOrgid,scope.row.purchaseId,scope.row.id)">-->
                <!--<el-option v-for="item in scope.row.sendBusiness" :key="item.senderName" :label="item.senderName" :value="item.senderId">-->
                <!--</el-option>-->
              <!--</el-select>-->
            </template>
          </el-table-column>
          <el-table-column label="数量" prop="p.REQUEST_QTY" sortable="custom" align="right" width="70" >
            <!--@input="handleAddMinus(scope.row.requestQty,scope.row.id,scope.row.purchaseId)"-->
            <template slot-scope="scope">
              <!--<el-input-number size="small" v-model="scope.row.requestQty" :min="1" :step="10"
                               @blur="amountStatistics(scope.row.requestQty,scope.row.id,scope.row.purchaseId)">
              </el-input-number>-->
              <span>{{ scope.row.requestQty }}</span>
              <!--<el-input-number size="small" v-model="scope.row.requestQty" :min="1" :step="10"-->
                               <!--@change="handleRequestQtyChange" @focus="handleRequestQtyFocus(scope.row)">-->
              <!--</el-input-number>-->
            </template>
          </el-table-column>
          <el-table-column prop="buyerRemark" label="备注" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.remark }}</span>
              <!--<span @click="dataBackFillGoods" v-if="scope.row.id !=cellIndex">{{ scope.row.remark }}</span>-->
              <!--<span><el-input size="small" v-model="scope.row.remark"-->
                              <!--v-if="scope.row.id===cellIndex"-->
                              <!--@blur="handleCellSubmit(scope.row.id,scope.row.remark)"-->
              <!--&gt;</el-input></span>-->
            </template>
          </el-table-column>

        </el-table>
      </div>

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
    <!--<div class="foot-btn">-->
      <!--<div class="foot-left">-->
        <!--<el-button type="warning" @click="handleSendback">确认撤回</el-button>-->
      <!--</div>-->
    <!--</div>-->
  </div>
</template>
<script>

  // 引入用户相关请求
  import {findFirstApprovePurchase,queryFirstApprovePurchaseItemList,updatePurchaseItemQty,
    updatePurchaseItemRemark,updateDegreeSet,updateDegreeCancel,deleteMedicineShoppingCar,
    updatePassOrRefusePurchase,sendbackPurchase
  }
    from 'src/axios/trade/purchase/purchase'
  import {isNotNull, isNumber} from "src/utils/validateUtil";
  import {priceFormat,keyBoardEnter} from "src/utils";
  import {getSpecHints,getPackHints} from "src/utils/validateUtil";
  import RangeBar from 'src/components/RangeBar';

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
        purchaseItemIds: '',
        cellIndex: undefined,
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
        queryFirstApprovePurchaseItemList(this.resData, this.query,this.purchaseId).then(res => {
          this.resData = res.data;
          if(this.resData.pageNum === 0){
            this.resData.pageNum = 1
          }
          findFirstApprovePurchase(this.purchaseId).then(res => {
            this.resMainData = res.data
          })
        })
      },
      handleSendback(){
        if(this.dataList.length<1){
          this.$alert('请至少选择一条数据', '提示', {
            confirmButtonText: '确定',
            type: 'warning',
          });
          return false;
        }else {
          for (var data of this.dataList) {
            this.purchaseItemIds += (data.id + ',');
          }
          this.purchaseItemIds=this.purchaseItemIds.slice(0, -1);
          //调用后台方法请求提交并刷新页面
          sendbackPurchase(this.purchaseId,this.purchaseItemIds).then(res => {
            var flag = res.data;
            if(flag == 0){
              this.$alert(`配送已操作，不能明细撤回`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(res => {
                this.list()
              })
            }
            else if(flag == 2){
              this.$alert(`明细撤销成功`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(res => {
                this.list()
              })
            }else{
              this.$alert(res.message,'提示',{
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                dangerouslyUseHTMLString: true
              }).then(() => {
                this.list()
              })
            }
          })
        }
      },
      handleBack() {
//        this.$router.push("/trade/manage/firstInstanceRole/allPurchaseOrder")
        this.$router.push("/trade/manage/orderReceiveTabs/"+1)
      },
      goBack() {
        this.$router.go(-1)
      },
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
      handleChangeSender(senderId,purchaseId,planItemId){
        updatePurchaseItemSender(senderId,purchaseId,planItemId).then(res => {
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
        this.resData.pageSize = val
        /*this.list()*/
      },
      handleCurrentChange (val) {
        this.resData.pageNum = val
        /*this.list()*/
      },
      getState(state){
        var arrState = ['准备', '送一审', '发送', '一审拒绝','完成','送二审','二审拒绝','购物车状态'];
        return arrState[state];
      },
      getDrugStorage(bakMedicalSpec,bakStandRate,useUnit,metricName,middleStandRate,bigMiddleRate){
        let _bakMedicalSpec = bakMedicalSpec || '';
        let _bakStandRate = bakStandRate || '';
        let _useUnit = useUnit || '';
        let _metricName = metricName || '';
        let _middleStandRate = middleStandRate || '';
        let _bigMiddleRate = bigMiddleRate || '';
        return _bakMedicalSpec+ '×'+ _bakStandRate + _useUnit+ '/'+ _metricName+'\n中大包装:' +_middleStandRate+'/'+_bigMiddleRate
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
          purchaseRemark: undefined,
          approveRemark: undefined,
          repositoryFlag: false,
          orderRemark: undefined
        }
      },
      handleRequestQtyChange(newVal, oldVal){
        if(!isNumber(newVal)){
          this.$nextTick(function () {
            this.curentMode.requestQty=oldVal;
          })
        }
      },
      handleRequestQtyFocus(row){
        this.curentMode=row;
      },
      metaData () {
        // 前后台交互数据封装格式
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
    }
  }
</script>



