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
            <el-input v-model="query.bakProductSpec" @keyup.enter.native="searchEnterFun"  placeholder="规格"  size="small"></el-input>
          </el-form-item>
          <el-form-item class="width-120">
            <el-input v-model="query.searchSender" @keyup.enter.native="searchEnterFun"  placeholder="配送企业"  size="small"></el-input>
          </el-form-item>
          <el-form-item class="width-120">
            <el-input v-model="query.bakBuyerName" @keyup.enter.native="searchEnterFun"  placeholder="买方机构"  size="small"></el-input>
          </el-form-item>
          <el-form-item>
            <el-date-picker type="date" placeholder="发单日期"  @keyup.enter.native="searchEnterFun"  v-model="query.searchBenDate"
                            format="yyyy-MM-dd" value-format="yyyy-MM-dd" size="small"></el-date-picker>
            &nbsp;至&nbsp;
            <el-date-picker type="date" placeholder="发单日期"  @keyup.enter.native="searchEnterFun"  v-model="query.searchEndDate"
                            format="yyyy-MM-dd" value-format="yyyy-MM-dd" size="small"></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="success" @click="searchEnterFun" size="small">查询</el-button>
            <el-button type="warning" size="small" @click="resetQuery()">重置</el-button>
          </el-form-item>
        </el-form>
      <!-- 表格列表 -->
      <div>
        <el-table :data="resData.list" ref="multipleTable" @sort-change="sortChang" style="width: 100%" border stripe>
          <el-table-column label="采购编号" width="75" prop="i.PURCHASE_CODE" sortable="custom">
            <template slot-scope="scope">
              <span>{{scope.row.purchaseCode}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="i.bak_medical_name" sortable="custom" label="产品名" min-width="150">
            <template slot-scope="scope">
            <!--  <div class="ellipsis es150" :title="getDrugStorage(scope.row.bakMedicalName)" >{{ scope.row.bakMedicalName }}</div>
              <div class="ellipsis es150" :title="getDrugStorage(scope.row.bakTradeName)" >(商品名: {{ scope.row.bakTradeName }})</div>-->

                <!--tootip提示气泡-->
                <!--:enterable="false" 鼠标不可进入tooltip中-->
                <el-tooltip placement="top" :enterable="false">
                  <!--气泡内容（必须放在slot="content"内）,布局与源内容保持一致-->
                  <div slot="content">
                    <div>{{ scope.row.bakProductName }}</div>
                    <div class="text-inline">{{ scope.row.bakMedicalMode }}
                      <span v-if="scope.row.bakTradeName != '无' && scope.row.bakTradeName !=null">({{ scope.row.bakTradeName }})</span>
                    </div>
                  </div>

                  <!--源内容（必须放在class="el-tooltip-box"内）-->
                  <div class="el-tooltip-box">
                    <!--加class="text-inline"确保内容不折行-->
                    <div class="text-inline">{{ scope.row.bakProductName }}</div>
                    <div class="text-inline">{{ scope.row.bakMedicalMode }}
                      <span v-if="scope.row.bakTradeName != '无' && scope.row.bakTradeName !=null">({{ scope.row.bakTradeName }})</span>
                    </div>
                  </div>
                </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column label="产品信息" min-width="150">
            <template slot-scope="scope" class="drugMessage">

              <el-tooltip placement="top" :enterable="false">
                <div slot="content">
                  {{getHints(scope.row.bakProductSpec,scope.row.bakWrapName)}}<br/>
                  {{getPackHints(scope.row.bakFactoryEasy,scope.row.middleStandRate,scope.row.bigMiddleRate)}}
                </div>
                <div class="el-tooltip-box">
                  <div class="text-inline">
                    {{ scope.row.bakProductSpec}} &nbsp;&nbsp;
                    <span v-if="scope.row.bakWrapName != '空' && scope.row.bakWrapName != null"> {{ scope.row.bakWrapName}}</span>
                  </div>
                  <div class="text-inline" >
                    {{ scope.row.bakFactoryEasy}}&nbsp;&nbsp; 中大包装:{{scope.row.middleStandRate }}/{{ scope.row.bigMiddleRate}}
                  </div>
                </div>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column label="配送企业\发单时间" :render-header="labelHead" width="100" prop="SENDER_ORG_EASY" sortable="custom" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-tooltip placement="top" :enterable="false">
                <div slot="content">
                  {{scope.row.senderOrgEasy}}<br/>
                  {{scope.row.createDate}}
                </div>
                <div class="el-tooltip-box">
                  <div class="text-inline">
                    {{scope.row.senderOrgEasy}}<br/>
                    {{scope.row.createDate}}
                  </div>
                </div>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column prop="i.unit_price" sortable="custom" label="单价" header-align="left" align="right" width="60">
            <template slot-scope="scope">
              {{ priceFormat(scope.row.unitPrice) }}
            </template>
          </el-table-column>
          <el-table-column prop="i.request_qty" sortable="custom" label="到货量\订货量"  :render-header="labelHead" align="right">
            <template slot-scope="scope">
              <div>
                <span v-if="scope.row.orderItemId+scope.$index==updateOrderItemId"> <el-input size="mini"  v-model.trim="scope.row.receiveQty"></el-input></span>
                <span v-else>{{scope.row.receiveQty}}</span>
              </div>
              <div>{{ scope.row.requestQty }}</div>
            </template>
          </el-table-column>
          <el-table-column prop="receiveTotal" sortable="custom" label="到货金额\订购金额" width="80" :render-header="labelHead" header-align="left" align="right">
            <template slot-scope="scope">
              <div>{{ priceFormat(scope.row.receiveMoneySum) }}</div>
              <div>{{ priceFormat(scope.row.receiveTotal) }}</div>
            </template>
          </el-table-column>
          <el-table-column prop="oos.INVOICE_NO" sortable="custom" label="发票号"  show-overflow-tooltip>
            <template slot-scope="scope">
              <span v-if="scope.row.orderItemId+scope.$index==updateOrderItemId"> <el-input size="mini" v-model.trim="scope.row.invoiceNo"></el-input></span>
              <span v-else>{{scope.row.invoiceNo}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="r.lot_no" sortable="custom" label="批号\有效期" :render-header="labelHead" >
            <template slot-scope="scope">
              <div><span v-if="scope.row.orderItemId+scope.$index==updateOrderItemId"> <el-input size="mini"  v-model.trim="scope.row.receiveLotNo"></el-input></span>
              <span v-else>{{scope.row.receiveLotNo}}</span></div>
              <div><span v-if="scope.row.orderItemId+scope.$index==updateOrderItemId"> <el-date-picker format="yyyy-MM-dd" value-format="yyyy-MM-dd"
                                                                   v-model="scope.row.medicalExpiredDate" type="date" placeholder="选择日期" size="mini"></el-date-picker></span>
                <span v-else>{{scope.row.medicalExpiredDate}}</span></div>
            </template>
          </el-table-column>
          <el-table-column prop="i.BUYER_ORG_EASY" sortable="custom" label="买方机构\收货地址"  :render-header="labelHead">
            <template slot-scope="scope">
              <el-tooltip placement="top" :enterable="false">
                <div slot="content">
                  <div class="text-inline">
                    {{scope.row.buyerOrgEasy}}
                  </div>
                  <div class="text-inline">
                    {{scope.row.addressAbbr}}
                  </div>
                </div>
                <div class="el-tooltip-box">
                  <div class="text-inline">
                    {{scope.row.buyerOrgEasy}}
                  </div>
                  <div class="text-inline">
                    {{scope.row.addressAbbr}}
                  </div>
                </div>
              </el-tooltip>
            </template>
          </el-table-column>

          <el-table-column label="操作" >
            <template slot-scope="scope">
              <div class="operates">
              <a class="green" v-if="(scope.row.roleCode ==='director'||scope.row.roleCode==='manage')&&(scope.row.receiveFlag==1)" @click="changeState(scope.row.receiveId)">设置修改</a>
              <a v-if="scope.row.receiveFlag==2&&scope.row.orderItemId+scope.$index!=updateOrderItemId" @click="changeReceiveOrder(scope)" class="green">到货修改</a>
              <a v-if="scope.row.orderItemId+scope.$index==updateOrderItemId" @click="updateReceiveOrder(scope.row)" class="green">保存</a>
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
  import {queryOrdOrderItem,changeOrderState,saveReceiveOrder} from 'src/axios/trade/buyerrole/arrive/buyerTabView/receiveListInfo'
  import {isNumber} from "src/utils/validateUtil";
  import {priceFormat,keyBoardEnter,labelHead} from "src/utils";
  import {getSpecHints,getPackHints} from "src/utils/validateUtil";
  export default {
    data () {
      return {
        activeName: 'first',  // 当前标签
        lastReceive: '',  // 上次到货
        updateOrderItemId:'-',
        currentOrder:undefined,
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
      getSpecHints,
      getPackHints,
      priceFormat,
      labelHead,
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
          bakProductSpec: undefined,
            searchSender: undefined,
          searchEndDate: undefined,
          searchBenDate: undefined,
            bakBuyerName: undefined
        }
      },
      // ------------------------------------------------- 处理方法 ----------------------------------------
      //  获取用户分页列表
      list () {
        this.resData.orderBy=this.currentOrder;
        queryOrdOrderItem(this.resData, this.query).then(res => {
          this.resData = res.data
          if(this.resData.pageNum===0){
            this.resData.pageNum=1
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
      sortChang(value){
        let sortType=" desc"
        if(value.order.startsWith("asc")){
          sortType=" asc";
        }
        this.currentOrder=value.prop + sortType;
        this.list()
      },
      changeState (receiveId) {
        changeOrderState(receiveId).then(res => {
          this.$message({
            type: 'success',
            message: "设置成功"
          })
          this.list()
        })
      },
      updateReceiveOrder (row) {
        /*
        console.log(Number(row.receiveQty))
        console.log(Number(row.receiveTotalAll))
        console.log(Number(this.lastReceive))
        console.log(Number(row.requestQty+row.requestQty))*/
        if(row.lotNo=='' ||(row.receiveQty<0) ||row.invoiceNo=='' ||row.medicalExpiredDate==null){
          this.$message({
            message: '修改内容不能为空！',
            type: 'warning'
          });
          return false
        }else if(!isNumber(row.receiveQty)){
          this.$message({
            message: '请正确输入到货量！',
            type: 'warning'
          });
        }else if((Number(row.receiveQty)+Number(row.receiveTotalAll)-Number(this.lastReceive))>Number(row.requestQty+row.requestQty)){
          this.$message({
            message: '确认到货量必须小于等于订购量的两倍！',
            type: 'warning'
          });
        }else {
          saveReceiveOrder(row).then(res => {
            this.$message({
              type: 'success',
              message: "修改成功"
            })
            this.updateOrderItemId='-';
            this.list()
          })
        }
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
      changeReceiveOrder(scope){
        this.updateOrderItemId = scope.row.orderItemId+scope.$index
        this.lastReceive=scope.row.receiveQty
      },
      getDrugStorage(bakMedicalSpec,middleStandRate,bigMiddleRate){
        let _bakMedicalSpec = bakMedicalSpec || '';
        let _middleStandRate = middleStandRate || '';
        let _bigMiddleRate = bigMiddleRate || '';
        return '规格包装'+_bakMedicalSpec+'中大包装:'+_middleStandRate+'/'+_bigMiddleRate
    },

      getHints(bakMedicalSpec,wrapName){
        let _bakMedicalSpec,_wrapName;
        if(bakMedicalSpec == null || bakMedicalSpec == undefined || bakMedicalSpec == "空"){
          _bakMedicalSpec = "";
        }else {
          _bakMedicalSpec = bakMedicalSpec;
        }
        if(wrapName == null || wrapName == undefined || wrapName == "空"){
          _wrapName = "";
        }else {
          _wrapName = wrapName;
        }
        return "规格: "+_bakMedicalSpec +"   包材:"+_wrapName
      },
    }


  }
</script>

