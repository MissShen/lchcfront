<template xmlns="http://www.w3.org/1999/html">
  <div>
    <!-- ========================== 主内容start ========================= -->
    <!-- 表格 -->
    <div class="tablebox">
      <!-- 表格查询表单 -->
      <div class="table-form">
        <el-form ref="query" :model="query"  label-position="right" size="small" class="table-form" :inline="true">
          <el-form-item class="width-120">
            <el-input v-model="query.searchPurchaseCode"  @keyup.enter.native="searchEnterFun"  placeholder="采购单编号" size="small"></el-input>
          </el-form-item>
          <el-form-item class="width-120">
            <el-input v-model="query.searchProductName"  @keyup.enter.native="searchEnterFun"  placeholder="产品名" size="small"></el-input>
          </el-form-item>
          <el-form-item class="width-120">
            <el-input v-model="query.searchSenderName"  @keyup.enter.native="searchEnterFun"  placeholder="配送企业" size="small"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="success" @click="searchEnterFun" size="small">查询</el-button>
            <el-button type="warning" @click="restQuery()" size="small">重置</el-button>
          </el-form-item>

        </el-form>
      </div>
      <!-- 表格列表 -->
      <div class="tableset">
        <el-table
          :data="resData.list"
          border
          @select="handleSelect"
          ref="multipleTable"
          stripe
          @sort-change="sortChang"
        >
          <el-table-column label="采购单号" min-width="75" prop="ooi.purchase_code" sortable="custom">
            <template slot-scope="scope">
              <el-tooltip placement="top" :enterable="false">
                <div slot="content">
                  {{scope.row.purchaseCode}}<br/>
                </div>
                <div class="el-tooltip-box">
                  <div class="text-inline">
                    {{ scope.row.purchaseCode}}
                  </div>
                </div>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column label="产品名" min-width="150" width="230" prop="ooi.bak_product_name" sortable="custom" >
            <template slot-scope="scope" >
              <ul class="ico-zt">
                <li class="ico-left">
                  <div class="icon-box">
                    <i class="ico icon-ji" v-if="scope.row.degreeFlag == '2'"></i>
                    <i class="ico icon-jc" v-if="scope.row.basicMedicantFlag == '1'"></i>
                    <i class="ico icon-qu" v-if="scope.row.isRegion == '1'"></i>
                  </div>
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
          <el-table-column  label="产品信息" min-width="150" width="230" >
            <template slot-scope="scope">
              <el-tooltip placement="top" :enterable="false">
                <div slot="content">
                  {{getHints(scope.row.bakProductSpec,scope.row.bakWrapName)}}<br/>
                  {{getPackHints(scope.row.bakFactoryEasy,scope.row.middleStandRate,scope.row.bigMiddleRate)}}
                </div>
                <div class="el-tooltip-box">
                  <div class="text-inline">
                    <span class="text-inline"  v-if="scope.row.bakWrapName != '空' && scope.row.bakWrapName !=null">{{ scope.row.bakProductSpec }}({{ scope.row.bakWrapName }})</span>
                    <span class="text-inline"  v-if="scope.row.bakWrapName == '空' || scope.row.bakWrapName ==null">{{ scope.row.bakProductSpec }}</span>
                  </div>
                  <div class="text-inline" >
                    {{ scope.row.bakFactoryEasy}}&nbsp;&nbsp; 中大包装: {{ scope.row.bakMiddleStandRate}}/{{ scope.row.bakBigMiddleRate}}
                  </div>
                </div>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column label="配送企业" :render-header="labelHead" width="220"  show-overflow-tooltip prop="ooi.bak_sender_easy" sortable="custom">
            <template slot-scope="scope">
              <div v-if="scope.row.bakSenderEasy==''">{{ scope.row.bakSenderName }}</div>
              <div v-if="scope.row.bakSenderEasy!=''">{{ scope.row.bakSenderEasy }}</div>
            </template>
          </el-table-column>
          <el-table-column label="单价" width="120" sortable header-align="left" align="right"  prop="ooi.unit_price" sortable="custom">
            <template slot-scope="scope">
              <span>{{ priceFormat(scope.row.unitPrice) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="订货量" :render-header="labelHead" width="120" sortable header-align="left" align="right" prop="ooi.request_qty" sortable="custom" >
            <template slot-scope="scope">
              <div>{{ scope.row.requestQty }}</div>
            </template>
          </el-table-column>
          <el-table-column label="到货量" :render-header="labelHead"  sortable header-align="left" align="right" prop="ooi.receive_qty" sortable="custom">
            <template slot-scope="scope">
              <div>{{ scope.row.receiveQty }}</div>
            </template>
          </el-table-column>
          <el-table-column label="备注" :render-header="labelHead" >
            <template slot-scope="scope">
              <div>{{ scope.row.remark }}</div>
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

      </div>
      <!-- 表格分页 -->
    </div>
    <!-- ========================== 主内容end ========================= -->
  </div>

</template>
<script>
  // 引入用户相关请求
  import {queryPurchaseItemList,autoArrival,deleteCloseStockup,commintReceiveQuery,updateDisabled,exportData,exportArriveData} from 'src/axios/trade/buyerrole/arrive/buyerTabView/receiveListInfo'
  import {checkRolePurchaselist,queryOrderItemList} from 'src/axios/trade/purchase/purchase';
  import {priceFormat,keyBoardEnter,labelHead} from "src/utils";
  import {findRole} from 'src/axios/trade/purchase/purchase'
  import fileUpload from 'js-file-download'
  import {getSpecHints,getPackHints} from "src/utils/validateUtil";
  export default {
    name: "orderList",
    props: ['msg'],
    data () {
      return {
        resMainData: this.metaMainData(),
        checked:false,
        value2:undefined,
        currentOrder:undefined,
        activeName: 'first',  // 当前标签
        resData: this.metaData(),
        query: this.metaQuery(), // 查询初始化
        queryReceive:this.metaReceiveQuery(),//确认到货请求参数
        showForm: false, // 表单可见性初始化
        showQuery: false, // 表单查询初始化
        dataList:[],
        defaultProps: {
          children: 'children',
          label: 'name',
          id: 'id'
        },
        options: [{
          value: '选项1',
          label: '到货中'
        },{
          value: '选项2',
          label: '完成'
        },{
          value: '选项3',
          label: '到货修改'
        }],
        checkedAll:false,
        roleCode:''
      }
    },

    created () {
      this.purchaseId =this.$route.params.purchaseId

      this.list()
    },
    methods: {
      getSpecHints,
      getPackHints,
      priceFormat,
      labelHead,
      // -------------------------------------------- 数据初始化  -----------------------------------------
      metaData () {
        return {
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
      metaMainData(){
        return {
          purchaseCode:undefined,
          bakBuyerEasy:undefined,
          approveOrgName:undefined,
          createDate:undefined,
          approveDate:undefined,

        }
      },
      searchEnterFun(e){
        this.$store.state.pageSeach.pageNum = 1;
        this.resData.pageNum = 1;
        keyBoardEnter(e,() =>{
          this.list();
        })
      },
      getIsFinish(flag){
        var arrFlag = ['备货中','已备完'];
        return arrFlag[flag];
      },
      restQuery(){
        this.query=this.metaQuery();
        this.list();
      },
      metaQuery () { // 表单查询数据初始化
        return {

          searchPurchaseCode: undefined,
          searchProductName: undefined,
          searchMedicalSpec: undefined,
          searchOrgName: undefined,
          searchSenderName: undefined,
          searchOrderState: undefined,
          searchInvoiceNo: undefined,
          searchBenDate: undefined,
          searchEndDate: undefined,
          dataFlag:undefined
        }
      },
      searchEnterFun(e){
        this.$store.state.pageSeach.pageNum = 1;
        this.resData.pageNum = 1;
        keyBoardEnter(e,() =>{
          this.list();
        })
      },
      metaReceiveQuery(){
        return {
          invoiceNos : '',
          purchaseInvoiceNos : '',
          lotNos : '',
          medicalExpiredDates : '',
          stockupQtys : '',
          orderItemIds:'',
          orderIds:'',
          planStockQtys:'',
          stockupIds:''
        }
      },
      // ------------------------------------------------- 处理方法 ----------------------------------------
      //  获取用户分页列表
      list () {
        let dataFlag;
        if(this.checkedAll==false){
          this.dataFlag = '0';
        }
        else{
          this.dataFlag = "1";
        }
        this.query.dataFlag=this.dataFlag;
        this.resData.orderBy=this.currentOrder;
        queryOrderItemList(this.resData, this.query,this.purchaseId).then(res => {
          this.resData = res.data;
          if(this.resData.pageNum===0){
            this.resData.pageNum=1
          }
        })
        //查的是上半部分
   /*     checkRolePurchaselist(this.resData, this.query).then(res => {
          this.resMainData = res.data.list[0]
        })*/
      },
      // ************************ 分页操作 ************************
      handleSizeChange (val) {
        this.resData.pageSize = val;
        this.list()
      },
      sortChang(value){
        let sortType=" desc";
        if(value.order.startsWith("asc")){
          sortType=" asc";
        }
        this.currentOrder=value.prop + sortType;
        this.list()
      },


      handleCurrentChange (val) {
        this.resData.pageNum = val;
        this.list()
      },
      handleSelectionChange(val) {
        this.dataList = val;
      },
      handleSelect(rows) {
        this.dataList = rows;
      },
      goBack() {
        this.$router.go(-1)
      },
      getHints(bakProductSpec, bakWrapName) {

        let _bakProductSpec, _bakWrapName;
        if (bakProductSpec == null || bakProductSpec == undefined || bakProductSpec == "空") {
          _bakProductSpec = "";
        } else {
          _bakProductSpec = bakProductSpec;
        }
        if (bakWrapName == null || bakWrapName == undefined || bakWrapName == "空") {
          _bakWrapName = "";
        } else {
          _bakWrapName = bakWrapName;
        }
        return  "规格:  "+ _bakProductSpec +"    包材:"+ _bakWrapName
      },
    }
  }
</script>

