<template>
  <div>
    <!-- ========================== 主内容start ========================= -->
    <!-- 表格 -->
    <div class="tablebox">
      <!-- 表格查询表单 -->
      <el-form ref="query" :model="query" size="small" :inline="true" class="table-form">
        <el-form-item class="width-100">
          <el-input v-model="query.searchProductName"  @keyup.enter.native="keyBoardEnter" ref="searchProductName" name="searchProductName" placeholder="品名" size="small"></el-input>
        </el-form-item>
        <el-form-item class="width-100">
          <el-input v-model="query.searchMedicalSpec"  @keyup.enter.native="searchEnterFun" name="searchMedicalSpec" placeholder="规格" size="small"></el-input>
        </el-form-item>
        <el-form-item class="width-100">
          <el-input v-model="query.searchOrgName"  @keyup.enter.native="searchEnterFun" name="searchOrgName" placeholder="生产企业" size="small"></el-input>
        </el-form-item>
        <el-form-item class="width-100">
          <el-input v-model="query.searchSenderName" @keyup.enter.native="searchEnterFun" name="searchSenderName" placeholder="配送企业" size="small"></el-input>
        </el-form-item>
        <el-form-item class="width-100">
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
        <!--<el-form-item class="width-120">-->
          <!--<el-select v-model="query.searchTwoVotes" @keyup.enter.native="searchEnterFun" placeholder="是否两票制" size="small">-->
            <!--<el-option label="全部" value=""></el-option>-->
            <!--<el-option label="是" value="1"></el-option>-->
            <!--<el-option label="否" value="0"></el-option>-->
          <!--</el-select>-->
        <!--</el-form-item>-->
        <el-form-item>
          <el-date-picker type="date" placeholder="历史采购开始日期"  @keyup.enter.native="searchEnterFun" v-model="query.searchBenDate" name="searchBenDate"
                          class="width-120" format="yyyy-MM-dd" value-format="yyyy-MM-dd" size="small"></el-date-picker>
          &nbsp;至&nbsp;
          <el-date-picker type="date" placeholder="历史采购结束日期"  @keyup.enter.native="searchEnterFun" v-model="query.searchEndDate" name="searchEndDate"
                          class="width-120" format="yyyy-MM-dd" value-format="yyyy-MM-dd" size="small"></el-date-picker>
          </el-form-item>
        <el-form-item>
            <el-button type="success" @click="searchEnterFun" size="small">查询</el-button>
            <el-button type="warning" @click="restQuery()" size="small">重置</el-button>
        </el-form-item>
      </el-form>

      <div class="tableset">
        <el-table ref="multipleTable" :data="resData.list" tooltip-effect="dark" @sort-change="sortChang"
                  style="width: 100%" @selection-change="handleSelectionChange" stripe border>
          <el-table-column label="产品名称" min-width="200"  prop="h.bak_product_name" sortable="top">
            <template slot-scope="scope" class="drugMessage" >
              <ul class="ico-zt">
                <li class="ico-left">
                  <div class="icon-box">
                    <i  v-if="scope.row.contractType != '0'" class="ico icon-jc"></i>
                    <i  v-if="scope.row.regionId != '0'" class="ico icon-qu"></i>
                    <i  v-if="scope.row.twoVoteType != '0'" class="ico icon-liang"></i>
                  </div>
                </li>

                <li>
                  <!--tootip提示气泡-->
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
          <el-table-column  label="产品信息" min-width="200" prop="h.bak_medical_spec" sortable="top" >
            <template slot-scope="scope">
              <el-tooltip placement="top" :enterable="false">
                <div slot="content">
                  {{getSpecHints(scope.row.bakMedicalSpec,scope.row.bakStandSpecRate,scope.row.bakUseUnit,scope.row.bakSpecUnit,scope.row.wrapName)}} <br/>
                  {{getPackHints(scope.row.bakProducerShortname,scope.row.bakMiddleStandRate,scope.row.bakBigMiddleRate)}}
                </div>
                <div class="el-tooltip-box">
                  <div class="text-inline">
                    <span class="text-inlie"  v-if="scope.row.wrapName != '空' && scope.row.wrapName != null"> {{ scope.row.bakMedicalSpec}} × {{ scope.row.bakStandSpecRate}} {{scope.row.bakUseUnit}} / {{ scope.row.bakSpecUnit}}&nbsp;&nbsp; {{scope.row.wrapName}}</span>
                    <span class="text-inlie"  v-if="scope.row.wrapName == '空' || scope.row.wrapName == null"> {{ scope.row.bakMedicalSpec}} × {{ scope.row.bakStandSpecRate}} {{scope.row.bakUseUnit}} / {{ scope.row.bakSpecUnit}}</span>

                  </div>
                  <div class="text-inline" >
                    {{ scope.row.bakProducerShortname}}&nbsp;&nbsp; 中大包装: {{scope.row.bakMiddleStandRate}}/{{scope.row.bakBigMiddleRate}}
                  </div>
                </div>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column prop="drugStorage" label="药库" v-if="this.repositoryFlag" width="120">
            <template slot-scope="scope">
              <span>{{ scope.row.warehouseName }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="addresses" label="配送地址" width="150">
            <template slot-scope="scope">
              <el-select v-model="scope.row.addressId" placeholder="请选择" size="small" name="addresses">
                <el-option v-for="(item,index) in scope.row.addresses" :key="item.index" :label="item.addressAbbr" :value="item.id">
                </el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="单价" header-align="left" align="center" width="200" prop=" h.hit_price" sortable="custom">
            <template slot-scope="scope">
              <div v-if="scope.row.enableFlag == '0'">
                {{ priceFormat(scope.row.hitPrice) }}(禁用)
              </div>
              <div v-else-if="scope.row.enableFlag == '1' && scope.row.priceSource == '0'">
                {{ priceFormat(scope.row.hitPrice) }}
              </div>
              <div v-else-if="scope.row.enableFlag == '1' && scope.row.priceSource == '1'">
                {{ priceFormat(scope.row.hitPrice) }}(议价)
              </div>
              <div v-else-if="scope.row.enableFlag == '1' && scope.row.priceSource == '2'">
                {{ priceFormat(scope.row.hitPrice) }}(降价)
              </div>
              <div v-else-if="scope.row.enableFlag == '1' && scope.row.priceSource == '3'">
                {{ priceFormat(scope.row.hitPrice) }}(被动降价)
              </div>
              <div v-else-if="scope.row.enableFlag == '1' && scope.row.priceSource == '4'">
                {{ priceFormat(scope.row.hitPrice) }}(涨价)
              </div>
              <div v-else-if="scope.row.enableFlag == '2' || scope.row.enableFlag == '3'|| scope.row.enableFlag == '4' || scope.row.enableFlag == '5' || scope.row.enableFlag == '6'">
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
              <el-select v-model="scope.row.firstSenderId" placeholder="请选择" size="small" name="sendBusiness" @change="changeSendBusiness(scope.row,scope.row.sendBusiness,scope.row.firstSenderId)">
                <el-option v-for="(item,index) in scope.row.sendBusiness" :key="item.index" :label="item.senderEasy" :value="item.senderId">
                </el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column prop="requestQty" label="数量" width="120">
            <template slot-scope="scope">
              <!--<el-input-number size="small" style="width: 110px !important;" v-model="scope.row.requestQty" name="requestQty"-->
                 <!--@change="handleRequestQtyChange" @focus="handleRequestQtyFocus(scope.row)" :min="1" :step="10"></el-input-number>-->
              <template v-if="scope.row.purchaseProductId == '0' && scope.row.enableFlag == '1'">
                <el-input size="small" v-model="scope.row.requestQtyStr" name="requestQty" :ref="'requestQty'+scope.$index"
                          @keyup.up.native="keyBoardUp(scope.$index)" @keyup.down.native="keyBoardDown(scope.$index)"
                          @keyup.enter.native="handleSavePurchase(scope.row,scope.row.recordId, scope.row.firstSenderId,scope.row.addressId,scope.row.requestQtyStr,scope.row.warehouseId,scope.row.warehouseName)"></el-input>
              </template>
              <template v-if="scope.row.purchaseProductId == '0' && (scope.row.enableFlag == '2'|| scope.row.enableFlag == '3')">
                <el-input size="small" v-model="scope.row.requestQtyStr" name="requestQty" :ref="'requestQty'+scope.$index"
                          @keyup.up.native="keyBoardUp(scope.$index)" @keyup.down.native="keyBoardDown(scope.$index)"></el-input>
              </template>
              <template v-if="scope.row.purchaseProductId != '0'">
                <el-input size="small" v-model="scope.row.requestQtyStr" name="requestQty" :ref="'requestQty'+scope.$index"
                          @keyup.up.native="keyBoardUp(scope.$index)" @keyup.down.native="keyBoardDown(scope.$index)"
                          @keyup.enter.native="handleDeletePurchase(scope.row.recordId,scope.row.warehouseId)"></el-input>
              </template>
            </template>
          </el-table-column>
          <el-table-column prop="remark" label="操作" width="110" align="center">
            <template slot-scope="scope">
              <div class="handle-zt">
                <a class="iconfont buy-btn" v-if="scope.row.purchaseProductId == '0' && (scope.row.enableFlag == '1' || scope.row.enableFlag == '3')" @click="handleSavePurchase(scope.row,scope.row.recordId, scope.row.firstSenderId,scope.row.addressId,scope.row.requestQtyStr,scope.row.warehouseId,scope.row.warehouseName)">加入</a>
                <a class="iconfont buy-btn gray" v-if="scope.row.purchaseProductId == '0' && (scope.row.enableFlag == '2'|| scope.row.enableFlag == '4'|| scope.row.enableFlag == '5' || scope.row.enableFlag == '6')">加入</a>
                <a class="iconfont buy-btn orange" v-if="scope.row.purchaseProductId != '0'" @click="handleDeletePurchase(scope.row.recordId,scope.row.warehouseId)">移除</a>
              </div>
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
          :pager-count="5"
          :current-page.sync="resData.pageNum">
        </el-pagination>
      </div>
    </div>
    <div class="foot-btn">
      <a class="shop-btn bj-yellow js-cart" @click = "handleMyShopCar()">
        <i class="iconfont ico-gwc"></i>
        <span>本院购物车</span>
        <span class="shop-num" v-if="this.requestCarQty != null">{{this.requestCarQty}}</span>
      </a>
    </div>
    <trade-price-history-dialog  v-if="formViewVisible" ref="tradePriceHistoryDialog"></trade-price-history-dialog>
  </div>

</template>
<script>

  // 引入用户相关请求
  import tradePriceHistoryDialog from './tradePriceHistoryDialog'
  import {medicineList,insertPurchaseCar,findCarTotal,deletePurchaseItemCar,selectLiang} from 'src/axios/trade/purchase/purchase'
  import {isNotNull, isNumber} from "src/utils/validateUtil";
  import {priceFormat,keyBoardEnter} from "src/utils";
  import {getPackHints,getSpecHints} from "src/utils/validateUtil";
  import RangeBar from 'src/components/RangeBar';

  export default {
    components:{
      tradePriceHistoryDialog,
      RangeBar
    },
    data() {
      return {
        activeName: 'first',  // 当前标签
        currentOrder: undefined,
        resData: this.metaData(),
        resMainData: this.metaMainData(),
        query: this.metaQuery(), // 查询初始化
        showForm: false, // 表单可见性初始化
        showQuery: false, // 表单查询初始化
        requestQty : 0,
        purchaseId : undefined,
        requestCarQty: undefined,
        wareHouseId: undefined,
        repositoryFlag: false,
        formViewVisible: false,
        defaultProps: {
          children: 'children',
          label: 'name',
          id: 'id'
        },
        curentMode:undefined,

      }
    },
    created () {
      this.list()
    },

   /* mounted(){
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
    },*/
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
      metaQuery () { // 表单查询数据初始化
        return {
          orderBy:undefined,
          id: undefined,
          searchRepositoryId: undefined,
          searchProductName: undefined,
          searchMedicalSpec: undefined,
          searchOrgName: undefined,
          searchSenderName: undefined,
          searchBenDate: undefined,
          searchEndDate: undefined,
          searchBasicFlag: undefined,
          searchTwoVotes: undefined,
          searchIsRegion: undefined,
          list: []
        }
      },
      searchEnterFun(e){
        this.$store.state.pageSeach.pageNum = 1;
        this.resData.pageNum = 1;
        this.list();
      },
      keyBoardEnter(e){
        this.resData.orderBy=this.currentOrder;
        medicineList(this.resData, this.query).then(res => {
          this.resData = res.data;
          if(this.resData.pageNum === 0){
            this.resData.pageNum = 1
          }
          if(this.resData.pageSize===0){
            this.resData.pageSize=20
          }
          findCarTotal("0").then(res => {
            this.repositoryFlag = res.data.repositoryFlag;
            if(res.data != undefined){
              this.requestCarQty = res.data.requestCarQty;
              this.purchaseId = res.data.purchaseId;
            }
          })
          this.$nextTick(()=>{
            if(this.resData.list.length){
              this.$refs.requestQty0.focus();
            }
          })
        })
      },
      tradePriceHistory(productId){
        this.formViewVisible = true;
        this.$nextTick(() => {
          this.$refs.tradePriceHistoryDialog.govPopupParam(productId);
        })
      },
      keyBoardUp(i){
        if(i<1){
          return false;
        }else{
          this.$refs['requestQty'+(i-1)].focus();
        }
      },
      keyBoardDown(i){
        const n = i+1;
        if(n<this.resData.pageSize){
          this.$refs['requestQty'+n].focus();
        }else{
          return false;
        }
      },
      metaData () {
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
      checked(){
        //首先el-table添加ref="multipleTable"引用标识
        var checkedItem = this.checkedItems;
        for(let i=0; i<checkedItem.length; i++){
          this.$refs.multipleTable.toggleRowSelection(this.tableData[checkedItem[i]],true);
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      //  获取用户分页列表
      list () {
        this.resData.orderBy=this.currentOrder;
        medicineList(this.resData, this.query).then(res => {
          this.resData = res.data;
          if(this.resData.pageNum === 0){
            this.resData.pageNum = 1
          }
          if(this.resData.pageSize===0){
            this.resData.pageSize=20
          }
          findCarTotal("0").then(res => {
            this.repositoryFlag = res.data.repositoryFlag;
            if(res.data != undefined){
              this.requestCarQty = res.data.requestCarQty;
              this.purchaseId = res.data.purchaseId;
            }
          })
        })

      },
      getDrugStorage(bakProducerShortname,bakMiddleStandRate,bakBigMiddleRate){
        let _bakProducerShortname = bakProducerShortname || '';
        let _bakMiddleStandRate = bakMiddleStandRate || '';
        let _bakBigMiddleRate = bakBigMiddleRate || '';
        return _bakProducerShortname+' \n中大包装:'+_bakMiddleStandRate +'/'+_bakBigMiddleRate
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
      handleMyShopCar(){
        this.$router.push("/trade/manage/buyerrole/medicineShoppingList/" + this.purchaseId)
      },
      changeSendBusiness(row,business,rowSide){
        for(let i=0;i<business.length;i++){
          if(business[i].senderId==rowSide){
            row.bakBigMiddleRate=business[i].bigMiddleRate;
            row.bakMiddleStandRate=business[i].middleStandRate;
            selectLiang(rowSide).then(res => {
              row.twoVoteType=res.data;
            })
          }
        }
      },
      handleDeletePurchase(recordId,repositoryId){
        deletePurchaseItemCar(recordId,repositoryId).then(res => {
          this.$message({
            message: res.data,
            type: 'success',
            duration: 1000,
            onClose: () => {
              this.restQuery();
            }
          })
        })
      },
      handleSavePurchase(entry,recordId, senderId, addressId,requestQty,repositoryId,repositoryName){
        if(null == addressId || undefined == addressId){
          this.$message({
            message: '请选择配送地址！',
            type: 'warning'
          });
          return false
        }else if(null == senderId || undefined == addressId){
          this.$message({
            message: '请选择配送企业！',
            type: 'warning'
          });
          return false
        }else if(null == requestQty || undefined == addressId){
          this.$message({
            message: '数量不能为空！',
            type: 'warning'
          });
          return false
        }else if(1000000 < requestQty ){
          this.$message({
            message: '数量过多！',
            type: 'warning'
          });
          return false
        }
        else if(
            entry.bakQuantityExcess!=null && entry.bakQuantityExcess!= 0 && entry.bakQuantityExcess < requestQty* entry.hitPrice){
            /*待解决换行问题*/
            this.$confirm(
              '产品名称：'+entry.bakProductName
              + '<br/> 商 品  名：'+entry.bakTradeName
              + '<br/>规      格：'+entry.bakMedicalSpec+'×'+entry.bakStandSpecRate+'  '+entry.bakUseUnit+'/'+entry.bakSpecUnit
              + '<br/>生产企业：'+entry.bakProducerShortname
              + '<br/>超限提醒：'+entry.bakQuantityExcess
              + '<br/><br/>采购数量超过限定数量，是否继续制单？',

              '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
              type: 'warning',
              dangerouslyUseHTMLString: true
            }).then(() => {
              insertPurchaseCar(recordId, senderId, addressId, requestQty,repositoryId,repositoryName).then(res => {
                this.$message({
                  message: res.data,
                  type: 'success',
                  duration: 1000,
                  onClose: () => {
                    this.restQuery();
                  }
                })
              })
            })

          return false
        }else if(!isNumber(requestQty)){
          this.$message({
            message: '请正确输入数量！',
            type: 'warning'
          });
          return false
        }else{
          insertPurchaseCar(recordId, senderId,addressId, requestQty,repositoryId,repositoryName).then(res => {
            this.$message({
              message: res.data,
              type: 'success',
              duration: 1000,
              onClose: () => {
                this.restQuery();
              }
            })
          })
        }
      },
      restQuery() {
        this.query = this.metaQuery()
        this.list();
        this.$nextTick(()=>{
          this.$refs.searchProductName.focus();
        })
      },
      metaMainData () {
        return {
          resData: { // 前后台交互数据封装格式
            purchaseId: undefined,
            requestCarQty: undefined
          }
        }
      },
   /*   handleRequestQtyChange(newVal, oldVal){
        alert(1)
        if(!isNumber(newVal)){
          this.$nextTick(function () {
            this.curentMode.requestQty=oldVal;
          })
        }
      },*/
      handleRequestQtyFocus(row){
        this.curentMode=row;
      }
    }
  }
</script>




