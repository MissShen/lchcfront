<template>
  <div>
    <!-- ========================== 主内容start ========================= -->
    <!-- 表格 -->
    <div class="tablebox">
      <!-- 表格查询表单 -->
        <el-form ref="query" :model="query" size="small" :inline="true" class="table-form">
            <el-form-item class="width-100">
              <el-input v-model="query.searchProductName"  @keyup.enter.native="searchEnterFun"  placeholder="品名" size="small"></el-input>
            </el-form-item>
            <el-form-item class="width-100">
              <el-input v-model="query.searchMedicalSpec"  @keyup.enter.native="searchEnterFun"  placeholder="规格" size="small"></el-input>
            </el-form-item>
            <el-form-item class="width-100">
              <el-input v-model="query.searchOrgName"  @keyup.enter.native="searchEnterFun"  placeholder="生产企业" size="small"></el-input>
            </el-form-item>
            <el-form-item class="width-100">
              <el-input v-model="query.searchSenderName"  @keyup.enter.native="searchEnterFun"  placeholder="配送企业" size="small"></el-input>
            </el-form-item>
            <el-form-item class="width-100">
              <el-select v-model="query.searchBasicFlag"  @keyup.enter.native="searchEnterFun"  placeholder="是否基药" size="small">
                <el-option label="全部" value=""></el-option>
                <el-option label="是" value="1"></el-option>
                <el-option label="否" value="0"></el-option>
              </el-select>
            </el-form-item>
            <!--<el-form-item class="width-120">-->
              <!--<el-select v-model="query.searchTwoVotes"  @keyup.enter.native="searchEnterFun"  placeholder="是否两票制" size="small">-->
                <!--<el-option label="全部" value=""></el-option>-->
                <!--<el-option label="是" value="1"></el-option>-->
                <!--<el-option label="否" value="0"></el-option>-->
              <!--</el-select>-->
            <!--</el-form-item>-->
            <el-form-item>
              <el-date-picker type="date" class="width-120" placeholder="历史采购开始日期" v-model="query.searchBenDate"  @keyup.enter.native="searchEnterFun"
                              format="yyyy-MM-dd" value-format="yyyy-MM-dd" size="small"></el-date-picker>
              &nbsp;至&nbsp;
              <el-date-picker type="date" class="width-120" placeholder="历史采购结束日期" v-model="query.searchEndDate"  @keyup.enter.native="searchEnterFun"
                              format="yyyy-MM-dd" value-format="yyyy-MM-dd" size="small"></el-date-picker>
              </el-form-item>
            <el-form-item>
                <el-button type="warning" @click="searchEnterFun" size="small">查询</el-button>
                <el-button type="primary" @click="restQuery()" size="small">重置</el-button>
                <el-button @click="returnEx()" size="small" class="el-button-pale">返回</el-button>
            </el-form-item>
        </el-form>

      <div class="tableset">
        <el-table ref="multipleTable" :data="resData.list" tooltip-effect="dark" @sort-change="sortChang"
                  style="width: 100%" @selection-change="handleSelectionChange" stripe border>
          <!--<el-table-column type="selection" width="55"></el-table-column>-->
          <el-table-column label="产品名"  prop="f.PRODUCT_NAME" sortable="custom" min-width="180" >
            <template slot-scope="scope" class="drugMessage">
              <ul class="ico-zt">
                <li class="ico-left">
                  <i  v-if="scope.row.contractType != '0'" class="ico icon-jc"></i>
                  <!--<i  v-if="scope.row.regionId != '0'" class="ico icon-qu"></i>-->
                  <i  v-if="scope.row.twoVoteType == '1'" class="ico icon-liang"></i>
                </li>
                <li>
                  <!--tootip提示气泡-->
                  <!--:enterable="false" 鼠标不可进入tooltip中-->
                  <el-tooltip placement="top" :enterable="false">
                    <!--气泡内容（必须放在slot="content"内）,布局与源内容保持一致-->
                    <div slot="content">
                      <div>{{ scope.row.productName }}</div>
                      <div v-if="scope.row.bakTradeName != '无' && scope.row.bakTradeName !=null">{{ scope.row.doseageFormName }}({{ scope.row.bakTradeName }})</div>
                      <div v-if="scope.row.bakTradeName == '无' || scope.row.bakTradeName ==null">{{ scope.row.doseageFormName }}</div>
                    </div>

                    <!--源内容（必须放在class="el-tooltip-box"内）-->
                    <div class="el-tooltip-box">
                      <!--加class="text-inline"确保内容不折行-->
                      <div class="text-inline">{{ scope.row.productName }}</div>
                      <div class="text-inline"  v-if="scope.row.bakTradeName != '无' && scope.row.bakTradeName !=null">{{ scope.row.doseageFormName }}({{ scope.row.bakTradeName }})</div>
                      <div class="text-inline"  v-if="scope.row.bakTradeName == '无' || scope.row.bakTradeName ==null">{{ scope.row.doseageFormName }}</div>
                    </div>
                  </el-tooltip>
                </li>
              </ul>
            </template>
          </el-table-column>
          <el-table-column prop="drugStorage" label="产品信息" min-width="180">
            <template slot-scope="scope">

              <el-tooltip placement="top" :enterable="false">
                <div slot="content">
                  {{getSpecHints(scope.row.spec,scope.row.standRate,scope.row.smallestUnits,scope.row.specUnit,scope.row.wrapName)}}<br/>
                  {{getPackHints(scope.row.manufactureName,scope.row.bakMiddleStandRate,scope.row.bakBigMiddleRate)}}
                </div>
                <div class="el-tooltip-box">
                  <div class="text-inline">
                    {{ scope.row.spec}} × {{ scope.row.standRate}} {{ scope.row.smallestUnits}}/ {{ scope.row.specUnit}}&nbsp;&nbsp;
                    <span v-if="scope.row.wrapName != '空' && scope.row.wrapName != null">{{ scope.row.wrapName}}</span>
                  </div>
                  <div class="text-inline" >
                    {{ scope.row.manufactureName}}&nbsp;&nbsp; 中大包装: {{ scope.row.bakMiddleStandRate}}/{{ scope.row.bakBigMiddleRate}}
                  </div>
                </div>
              </el-tooltip>

            </template>
          </el-table-column>

          <!--<el-table-column prop="drugStorage" label="药库" v-if="this.repositoryFlag" width="120">-->
            <!--<template slot-scope="scope">-->
              <!--<span>{{ scope.row.warehouseName }}</span>-->
            <!--</template>-->
          <!--</el-table-column>-->
          <el-table-column prop="addresses" label="配送地址" width="150" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-select v-model="scope.row.addressId" placeholder="请选择" size="small" name="addresses">
                <el-option v-for="(item,index) in scope.row.addresses" :key="item.index" :label="item.addressAbbr" :value="item.id">
                </el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column  prop="f.BID_PRICE" sortable="custom" label="单价" header-align="left" align="center" width="180">
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
                <range-bar :rangeData="[scope.row.bidPrice,scope.row.minTradePrice,scope.row.maxTradePrice,1]"></range-bar>
              </template>
            </template>
          </el-table-column>
          <el-table-column prop="enterprise" label="配送企业" width="150" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-select v-model="scope.row.value" placeholder="请选择" size="small" name="sendBusiness"
                         @change="changeSendBusiness(scope.row,scope.row.sendBusiness,scope.row.value)">
                <el-option v-for="(item,index) in scope.row.sendBusiness" :key="item.index" :label="item.senderEasy" :value="item.senderId">
                </el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column prop="requestQty" label="数量" width="150" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-input size="small" v-model="scope.row.requestQtyStr" name="requestQty"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="remark" label="操作" width="110" align="center">
            <template slot-scope="scope">
              <div class="handle-zt">
                <a class="iconfont buy-btn" v-if="scope.row.purchaseProductId == '0' && scope.row.enableFlag == '1' && scope.row.bidPrice != 0"
                   @click="handleSavePurchase(scope.row,scope.row.productId, scope.row.value,scope.row.addressId,scope.row.requestQtyStr,scope.row.warehouseId,scope.row.warehouseName)">加入</a>
                <a class="iconfont buy-btn gray" v-if="scope.row.purchaseProductId == '0' && (scope.row.enableFlag == '2'|| scope.row.enableFlag == '3'|| scope.row.enableFlag == '4' || scope.row.bidPrice == 0)">加入</a>
                <a class="iconfont buy-btn orange" v-if="scope.row.purchaseProductId == '1'"
                   @click="handleDeletePurchase(scope.row.productId)">移除</a>
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
        <li><i class="ico icon-yi"></i><span>医保药品</span></li>
        <li><i class="ico icon-liang"></i><span>两票制</span></li>
        <li><i class="ico icon-kang"></i><span>抗菌药</span></li>
        <li><i class="ico icon-budan"></i><span>补单</span></li>
      </ul>
    </div>
  </div>

</template>
<script>

  // 引入用户相关请求
  import {medicineTempList,insertApproveTempPurchase,findApproveCarTotal,insertApprovePurchase,deleteAddTempPurchaseItemCar,selectLiang} from 'src/axios/trade/purchase/purchase'
  import {isNumber} from "src/utils/validateUtil";
  import {priceFormat,keyBoardEnter} from "src/utils";
  import {getSpecHints,getPackHints} from "src/utils/validateUtil";
  import RangeBar from 'src/components/RangeBar';
  export default {

    components: {
      RangeBar
    },
    data() {
      return {
        activeName: 'first',  // 当前标签
        resData: this.metaData(),
        currentOrder:undefined,
        query: this.metaQuery(), // 查询初始化
        showForm: false, // 表单可见性初始化
        showQuery: false, // 表单查询初始化
        requestQty : undefined,
        purchaseId : undefined,
        requestCarQty: undefined,
        wareHouseId: undefined,
        repositoryFlag: false,
        defaultProps: {
          children: 'children',
          label: 'name',
          id: 'id'
        },
        curentMode:undefined

      }
    },
    created () {
      this.purchaseId = this.$route.params.purchaseId;
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
      handleRequestQtyChange(newVal, oldVal){
        if(!isNumber(newVal)){
          this.$nextTick(function () {
            this.curentMode.requestQty=oldVal;
          })
        }
      },
      handleDeletePurchase(productId){
        deleteAddTempPurchaseItemCar(productId,this.purchaseId).then(res => {
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
      handleRequestQtyFocus(row){
        this.curentMode=row;
      },
      searchEnterFun(e){
        this.$store.state.pageSeach.pageNum = 1;
        this.resData.pageNum = 1;
        keyBoardEnter(e,() =>{
          this.list();
        })
      },
      // -------------------------------------------- 数据初始化  -----------------------------------------
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
            list: []
        }
      },

      // ------------------------------------------------- 处理方法 ----------------------------------------
      //  获取用户分页列表
      list () {
        this.resData.orderBy=this.currentOrder;
        medicineTempList(this.resData, this.query,this.purchaseId).then(res => {
          this.resData = res.data
          if(this.resData.pageNum === 0){
            this.resData.pageNum = 1
          }
          if(this.resData.pageSize===0){
            this.resData.pageSize=20
          }
          findApproveCarTotal("1",this.purchaseId).then(res => {
            this.repositoryFlag = res.data.repositoryFlag;
            if(res.data != undefined){
              this.requestCarQty = res.data.requestCarQty;
            }
          })
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
      handleSavePurchase(entry,productId, senderId, addressId,requestQty,repositoryId,repositoryName){

        if(null == addressId){
          this.$message({
            message: '请选择配送地址！',
            type: 'warning'
          });
          return false
        }else if(null == senderId){
          this.$message({
            message: '请选择配送企业！',
            type: 'warning'
          });
          return false
        }else if(null == requestQty){
          this.$message({
            message: '数量不能为空！',
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
        }
        else if(entry.bakQuantityExcess!=null && entry.bakQuantityExcess!= 0 && entry.bakQuantityExcess < requestQty){

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
              insertApproveTempPurchase(this.purchaseId,productId, senderId, addressId, requestQty,repositoryId,repositoryName).then(res => {
                this.$message({
                  message: res.data,
                  type: 'success',
                  duration: 1000,
                  onClose: () => {
                    this.$router.push("/trade/manage/firstInstanceRole/checkOne/" + this.purchaseId+"/"+'add')
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
          insertApproveTempPurchase(this.purchaseId,productId, senderId,addressId, requestQty,repositoryId,repositoryName).then(res => {
            this.$message({
              message: res.data,
              type: 'success',
              duration: 1000,
              onClose: () => {
                this.$router.push("/trade/manage/firstInstanceRole/checkOne/" + this.purchaseId+"/"+'add')
              }
            })
          })
        }

//        if(null == senderId){
//          this.$alert('请选择配送', '提示', {
//            confirmButtonText: '确定',
//            type: 'warning',
//          })
//          return false
//        }else {
//          insertApprovePurchase(this.purchaseId,recordId, senderId, requestQty).then(res => {
//            console.log(this.purchaseId)
//            this.$message({
//              message: res.data,
//              type: 'success',
//              duration: 1000,
//              onClose: () => {
//                this.$router.push("/trade/manage/firstInstanceRole/checkOne/" + this.purchaseId)
//              }
//            })
//          })
//        }
      },
      restQuery() {
        this.query = this.metaQuery()
        this.list();
      },
      returnEx(){
        window.history.go(-1);
      },
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
      getDrugStorage(bakMedicalSpec,bakStandSpecRate,bakUseUnit,bakSpecUnit,bakMiddleStandRate,bakBigMiddleRate){
        let _bakMedicalSpec = bakMedicalSpec || '';
        let _bakStandSpecRate = bakStandSpecRate || '';
        let _bakUseUnit = bakUseUnit || '';
        let _bakSpecUnit = bakSpecUnit || '';
        let _bakMiddleStandRate = bakMiddleStandRate || '';
        let _bakBigMiddleRate = bakBigMiddleRate || '';
        return _bakMedicalSpec+'×'+_bakStandSpecRate+_bakUseUnit+'/'+_bakSpecUnit+' \n中大包装:'+_bakMiddleStandRate +'/'+_bakBigMiddleRate
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
    }
  }
</script>



