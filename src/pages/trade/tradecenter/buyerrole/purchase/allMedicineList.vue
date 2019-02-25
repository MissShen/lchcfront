<template>
  <div>
    <!-- ========================== 主内容start ========================= -->
    <!-- 表格 -->
    <div class="tablebox">

      <!-- 表格查询表单 -->
      <el-form ref="query" :model="query" :inline="true" class="table-form">
        <el-form-item class="width-120">
          <el-input v-model="query.searchProductName" @keyup.enter.native="searchEnterFun" name="searchProductName" placeholder="品名" size="small"></el-input>
        </el-form-item>
        <el-form-item class="width-120">
          <el-input v-model="query.searchMedicalSpec" @keyup.enter.native="searchEnterFun" name="searchMedicalSpec" placeholder="规格" size="small"></el-input>
        </el-form-item>
        <el-form-item class="width-120">
          <el-input v-model="query.searchOrgName" @keyup.enter.native="searchEnterFun" name="searchOrgName" placeholder="生产企业" size="small"></el-input>
        </el-form-item>
        <el-form-item class="width-120">
          <el-input v-model="query.searchSenderName" @keyup.enter.native="searchEnterFun" name="searchSenderName" placeholder="配送企业" size="small"></el-input>
        </el-form-item>
        <el-form-item class="width-100">
          <el-select v-model="query.searchBasicFlag" @keyup.enter.native="searchEnterFun" placeholder="是否基药" size="small">
            <el-option label="全部" value=""></el-option>
            <el-option label="是" value="1"></el-option>
            <el-option label="否" value="0"></el-option>
          </el-select>
        </el-form-item>
        <!--<el-form-item class="width-110">-->
          <!--<el-select v-model="query.searchTwoVotes" @keyup.enter.native="searchEnterFun" placeholder="是否两票制" size="small">-->
            <!--<el-option label="全部" value=""></el-option>-->
            <!--<el-option label="是" value="1"></el-option>-->
            <!--<el-option label="否" value="0"></el-option>-->
          <!--</el-select>-->
        <!--</el-form-item>-->
        <el-form-item>
          <el-button type="success" @click="searchEnterFun" class="js-query" size="small">查询</el-button>
          <el-button type="warning" @click="restQuery()" class="js-reset" size="small">重置</el-button>
        </el-form-item>
      </el-form>
      <div class="tableset">
        <el-table ref="multipleTable"
                  border
                  stripe :default-sort = "{prop: 'name'}"
                  :data="resData.list"
                  tooltip-effect="dark"
                  style="width: 100%"
                  @sort-change="sortChang"
        >
          <el-table-column label="产品名" min-width="180" prop=" f.PRODUCT_NAME" sortable="custom" >
            <template slot-scope="scope" class="drugMessage">
              <ul class="ico-zt">
                <li class="ico-left">
                  <div class="icon-box">
                    <!--<i  v-if="scope.row.regionId == '0'" class="ico icon-qu"></i>-->
                    <i  v-if="scope.row.contractType == '1'" class="ico icon-jc"></i>
                    <i  v-if="scope.row.twoVoteType == '1'" class="ico icon-liang"></i>
                  </div>
                </li>
                <li>
                  <!--tootip提示气泡-->
                  <!--:enterable="false" 鼠标不可进入tooltip中-->
                  <el-tooltip placement="top" :enterable="false">
                    <!--气泡内容（必须放在slot="content"内）,布局与源内容保持一致-->
                    <div slot="content">
                      <div>{{ scope.row.productName }}</div>
                      <div v-if="scope.row.tradeName != '无'&& scope.row.bakTradeName !=null">{{ scope.row.doseageFormName }}({{ scope.row.tradeName }})</div>
                      <div v-if="scope.row.tradeName == '无'|| scope.row.bakTradeName ==null">{{ scope.row.doseageFormName }}</div>
                    </div>
                    <!--源内容（必须放在class="el-tooltip-box"内）-->
                    <div class="el-tooltip-box">
                      <!--加class="text-inline"确保内容不折行-->
                      <div>{{ scope.row.productName }}</div>
                      <div v-if="scope.row.tradeName != '无'&& scope.row.bakTradeName !=null">{{ scope.row.doseageFormName }}({{ scope.row.tradeName }})</div>
                      <div v-if="scope.row.tradeName == '无'|| scope.row.bakTradeName ==null">{{ scope.row.doseageFormName }}</div>
                    </div>
                  </el-tooltip>
                </li>
              </ul>
            </template>
          </el-table-column>
          <el-table-column  label="产品信息" min-width="220" >
            <template slot-scope="scope">

              <el-tooltip placement="top" :enterable="false">
                <div slot="content">
                  {{getSpecHints(scope.row.spec,scope.row.standRate,scope.row.smallestUnits,scope.row.specUnit,scope.row.wrapName)}} <br/>
                  {{getPackHints(scope.row.manufactureName,scope.row.middleStandRate,scope.row.bigMiddleRate)}}
                </div>
                <div class="el-tooltip-box">
                  <div class="text-inline">
                    <span v-if="scope.row.wrapName != '空' && scope.row.wrapName != null"> {{ scope.row.spec}} × {{ scope.row.standRate}} {{ scope.row.smallestUnits}}/ {{ scope.row.specUnit}} &nbsp;&nbsp; {{ scope.row.wrapName}}</span>
                    <span v-if="scope.row.wrapName == '空' || scope.row.wrapName == null"> {{ scope.row.spec}} × {{ scope.row.standRate}} {{ scope.row.smallestUnits}}/ {{ scope.row.specUnit}}</span>
                  </div>
                  <div class="text-inline" >
                    {{ scope.row.manufactureName}} &nbsp;&nbsp; 中大包装:{{ scope.row.middleStandRate}} / {{ scope.row.bigMiddleRate}}
                  </div>
                </div>
              </el-tooltip>

            </template>
          </el-table-column>

          <!--<el-table-column prop="drugStorage" label="药库">-->
            <!--<template slot-scope="scope">-->
              <!--<span>{{ scope.row.warehouseName }}</span>-->
            <!--</template>-->
          <!--</el-table-column>-->
          <el-table-column prop="addresses" label="配送地址" width="150">
            <template slot-scope="scope">
              <el-select v-model="scope.row.addressId" placeholder="请选择" size="small" name="addresses">
                <el-option v-for="(item,index) in scope.row.addresses" :key="item.index" :label="item.addressAbbr" :value="item.id">
                </el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="价格" header-align="left" align="center" width="180" prop="f.BID_PRICE" sortable="custom" >
            <template slot-scope="scope">
              <div v-if="scope.row.enableFlag == '0' && scope.row.priceSource == 0">
                {{ priceFormat(scope.row.bidPrice) }}(禁用)
              </div>
              <div v-else-if="scope.row.enableFlag == '1' && scope.row.priceSource == '0' && scope.row.bidPrice != 0">
                {{ priceFormat(scope.row.bidPrice) }}
              </div>
              <div v-else-if="scope.row.enableFlag == '1' && scope.row.priceSource == '1'">
                {{ priceFormat(scope.row.bidPrice) }}(议价)
              </div>
              <div v-else-if="scope.row.enableFlag == '1' && scope.row.priceSource == '3'">
                {{ priceFormat(scope.row.bidPrice) }}(降价)
              </div>
              <div v-else-if="scope.row.enableFlag == '1' && scope.row.priceSource == '4'">
                {{ priceFormat(scope.row.bidPrice) }}(涨价)
              </div>
              <div v-else-if="scope.row.enableFlag == '1' && scope.row.priceSource == '5'">
                {{ priceFormat(scope.row.bidPrice) }}(被动降价)
              </div>
              <div v-else-if="scope.row.enableFlag == '0' || scope.row.enableFlag == '2' || scope.row.bidPrice == 0">
                (待谈判)
              </div>
              <template v-if="scope.row.minTradePrice == '0.00' && scope.row.maxTradePrice == '0.00'">
                <range-bar :rangeData="[scope.row.bidPrice,scope.row.minTradePrice,scope.row.maxTradePrice]"></range-bar>
              </template>
              <template v-else>
                <range-bar :rangeData="[scope.row.bidPrice,scope.row.minTradePrice,scope.row.maxTradePrice, 1, 1]"
                           @bar-click="tradePriceHistory(scope.row.productId)"></range-bar>
              </template>
            </template>
          </el-table-column>
          <el-table-column prop="enterprise" label="配送企业" width="150">
            <template slot-scope="scope">
              <el-select v-model="scope.row.value" placeholder="请选择" size="small" name="sendBusiness"
                         @change="changeSendBusiness(scope.row,scope.row.sendBusiness,scope.row.value)">
                <el-option v-for="(item,index) in scope.row.sendBusiness" :key="item.index" :label="item.senderEasy" :value="item.senderId">
                </el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column prop="requestQty" label="数量" width="130" :min="1" :step="10">
            <template slot-scope="scope">
              <!--<el-input-number size="small" class="width-120" v-model="scope.row.requestQty" name="requestQty" @change="handleRequestQtyChange" @focus="handleRequestQtyFocus(scope.row)" :min="1" :step="10"></el-input-number>-->
             <!-- <el-input size="small" v-model="scope.row.requestQtyStr"></el-input>-->

              <template v-if="scope.row.purchaseProductId == '0' && scope.row.enableFlag == '1'">
                <el-input size="small" v-model="scope.row.requestQtyStr" name="requestQty" :ref="'requestQty'+scope.$index"
                          @keyup.up.native="keyBoardUp(scope.$index)" @keyup.down.native="keyBoardDown(scope.$index)"
                          @keyup.enter.native="handleSavePurchase(scope.row.productId, scope.row.value,scope.row.addressId,scope.row.requestQtyStr)"></el-input>
              </template>
              <template v-if="scope.row.purchaseProductId == '0' && (scope.row.enableFlag == '2'|| scope.row.enableFlag == '3'|| scope.row.enableFlag == '4')">
                <el-input size="small" v-model="scope.row.requestQtyStr" name="requestQty" :ref="'requestQty'+scope.$index"
                          @keyup.up.native="keyBoardUp(scope.$index)" @keyup.down.native="keyBoardDown(scope.$index)"></el-input>
              </template>
              <template v-if="scope.row.purchaseProductId != '0'">
                <el-input size="small" v-model="scope.row.requestQtyStr" name="requestQty" :ref="'requestQty'+scope.$index"
                          @keyup.up.native="keyBoardUp(scope.$index)" @keyup.down.native="keyBoardDown(scope.$index)"
                          @keyup.enter.native="handleDeletePurchase(scope.row.productId)"></el-input>
              </template>

            </template>
          </el-table-column>
          <el-table-column prop="remark" label="操作" width="110" align="center">
            <template slot-scope="scope">
              <div class="handle-zt">
                <a v-if="scope.row.purchaseProductId == '0' && scope.row.enableFlag == '1' && scope.row.bidPrice != 0" @click="handleSavePurchase(scope.row.productId, scope.row.value,scope.row.addressId,scope.row.requestQtyStr)" class="iconfont buy-btn js-addcart">加入</a>
                <a class="iconfont buy-btn gray" v-if="scope.row.purchaseProductId == '0' && (scope.row.enableFlag == '2'|| scope.row.enableFlag == '3'|| scope.row.enableFlag == '4' || scope.row.bidPrice == 0)">加入</a>
                <a v-if="scope.row.purchaseProductId == '1'" @click="handleDeletePurchase(scope.row.productId)" class="iconfont buy-btn orange js-addcart">移除</a>
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
          <span>临采购物车</span>
          <span class="shop-num" v-if="this.requestCarQty != null">{{this.requestCarQty}}</span>
        </a>
    </div>
    <trade-price-history-dialog  v-if="formViewVisible" ref="tradePriceHistoryDialog"></trade-price-history-dialog>
  </div>
</template>

<script>

  // 引入用户相关请求
  import tradePriceHistoryDialog from './tradePriceHistoryDialog'
  import {queryTempMedicineList,insertTempPurchaseCar,findCarTotal,deleteTempPurchaseItemCar,selectLiang} from 'src/axios/trade/purchase/purchase'
  import {isNumber} from "src/utils/validateUtil";
  import {priceFormat,keyBoardEnter} from "src/utils";
  import {getPackHints,getSpecHints} from "src/utils/validateUtil";
  import RangeBar from 'src/components/RangeBar';

  export default {
    // mixins:[rangebar],
    components:{
      tradePriceHistoryDialog,
      RangeBar
    },
    data() {
      return {
        currentOrder: undefined,
        activeName: 'first',  // 当前标签
        resData: this.metaData(),
        query: this.metaQuery(), // 查询初始化
        showForm: false, // 表单可见性初始化
        showQuery: false, // 表单查询初始化
        formViewVisible: false,
        defaultProps: {
          children: 'children',
          label: 'name',
          id: 'id'
        },
        requestQty : undefined,
        purchaseId : undefined,
        requestCarQty: undefined,
        curentMode:undefined
      };
    },
    created () {
      this.list()
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
      getSpecHints,
      getPackHints,
      priceFormat,
      // -------------------------------------------- 数据初始化  -----------------------------------------
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
          id: undefined,
          searchRepositoryId: undefined,
          searchProductName: undefined,
          searchMedicalSpec: undefined,
          searchOrgName: undefined,
          searchSenderName:undefined,
          searchBenDate:undefined,
          searchEndDate:undefined,
          searchBasicFlag: undefined,
          searchTwoVotes: undefined,
          list: undefined
        }
      },
      tradePriceHistory(productId){
        this.formViewVisible = true;
        console.log(productId)
        this.$nextTick(() => {
          this.$refs.tradePriceHistoryDialog.govPopupParam(productId);
        })
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
      searchEnterFun(e){
        this.$store.state.pageSeach.pageNum = 1;
        this.resData.pageNum = 1;
        keyBoardEnter(e,() =>{
          this.list();
        })
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
      /*handleSelect(sel, row) {
        row.isChecked = !row.isChecked;
      },*/
      handleChange(value) {
      },
      handleSizeChange(val) {
      },
      handleCurrentChange(val) {
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
      // ------------------------------------------------- 处理方法 ----------------------------------------
      //  获取用户分页列表
      list () {
        this.resData.orderBy=this.currentOrder;
        queryTempMedicineList(this.resData, this.query).then(res => {
          this.resData = res.data
          if(this.resData.pageNum === 0){
            this.resData.pageNum = 1
          }
          if(this.resData.pageSize===0){
             this.resData.pageSize=20
          }
          //临采查询
          findCarTotal("1").then(res => {
            this.requestCarQty = res.data.requestCarQty;
            this.purchaseId = res.data.purchaseId;
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
        this.$router.push("/trade/manage/buyerrole/allMedicineShoppingList/" + this.purchaseId)
      },
      handleSavePurchase(productId, senderId, addressId,requestQty){
        if(null == addressId){
          this.$message({
            message: '请选择配送地址！',
            type: 'warning'
          })
          return false
        }else if(null == senderId){
          this.$message({
            message: '请选择配送企业！',
            type: 'warning'
          })
          return false
        }else if(null == requestQty){
          this.$message({
            message: '请输入数量！',
            type: 'warning'
          })
          return false
        }else if(!isNumber(requestQty)){
          this.$message({
            message: '请正确输入数量！',
            type: 'warning'
          });
          return false
        }
        else if(1000000 < requestQty ){
          this.$message({
            message: '数量过多！',
            type: 'warning'
          });
          return false
        }else {
          insertTempPurchaseCar(productId, senderId,addressId, requestQty).then(res => {
            this.$message({
              message: res.data,
              type: 'success',
              duration: 1000,
              onClose: () => {
                this.restQuery()
              }
            })
          })
        }
      },
      handleDeletePurchase(productId){
        deleteTempPurchaseItemCar(productId).then(res => {
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
      restQuery() {
        this.query = this.metaQuery()
        this.list();
      },
  /*    handleRequestQtyChange(newVal, oldVal){
        if(!isNumber(newVal)){
          this.$nextTick(function () {
            this.curentMode.requestQty=oldVal;
          })
        }
      },*/
      handleRequestQtyFocus(row){
        this.curentMode=row;
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

    }
  }
</script>


