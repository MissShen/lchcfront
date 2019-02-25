<template>
  <div>
    <!-- ========================== 主内容start ========================= -->
    <!--<div class="tabs-panel">
      <span class="active">交易明细查询</span>
    </div>-->

    <!-- 表格 -->
    <div class="tablebox">
      <!-- 表格查询表单 -->
      <div class="table-form">
        <el-form ref="query" :model="query" label-position="right" size="small" :inline="true" class="table-form">
              <el-form-item>
                <el-select v-model="query.orderItemState" @keyup.enter.native="searchEnterFun"  size="small" placeholder="订单状态">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-date-picker type="date" placeholder="开始日期" format="yyyy-MM-dd" vlue-format="yyyy-MM-dd"  @keyup.enter.native="searchEnterFun"
                                size="small" v-model="query.searchBenDate"></el-date-picker>
                &nbsp;至&nbsp;
                <el-date-picker type="date" placeholder="结束日期" format="yyyy-MM-dd" vlue-format="yyyy-MM-dd"  @keyup.enter.native="searchEnterFun"
                                size="small" v-model="query.searchEndDate"></el-date-picker>
              </el-form-item>
              <el-form-item>
                <el-input v-model="query.searchProductName" placeholder="品名"@keyup.enter.native="searchEnterFun" size="small"></el-input>
              </el-form-item>
              <el-form-item>
                <el-input v-model="query.searchBuyerOrgName" placeholder="买方机构"@keyup.enter.native="searchEnterFun" size="small"></el-input>
              </el-form-item>
              <el-form-item>
                <el-input v-model="query.searchSenderOrgName" placeholder="配送企业"@keyup.enter.native="searchEnterFun" size="small"></el-input>
              </el-form-item>
              <el-form-item>
                <el-input v-model="query.searchBakFactoryName" placeholder="生产企业"@keyup.enter.native="searchEnterFun" size="small"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="warning" @click="list()">查询</el-button>
                <el-button type="primary" @click="rest()">重置</el-button>
              </el-form-item>
        </el-form>
      </div>
      <!-- 表格列表 -->
      <div class="tableset">
        <el-table
          :data="resData.list"
          @sort-change="sortChang"
          border
          stripe>
          <el-table-column label="产品名">
            <template slot-scope="scope">

                <!--tootip提示气泡-->
                <!--:enterable="false" 鼠标不可进入tooltip中-->
                <el-tooltip placement="top" :enterable="false">
                  <!--气泡内容（必须放在slot="content"内）,布局与源内容保持一致-->
                  <div slot="content">
                    <div>{{ scope.row.bakProductName }}</div>
                    <div>{{ scope.row.bakMedicalMode }}
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
          <el-table-column label="产品信息">
            <template slot-scope="scope">

              <el-tooltip placement="top" :enterable="false">
                <div slot="content">
                  {{getHints(scope.row.bakProductSpec,scope.row.bakWrapName)}}<br/>
                  {{getPackHints(scope.row.bakFactoryEasy,scope.row.middleStandRate,scope.row.bigMiddleRate)}}
                </div>
                <div class="el-tooltip-box">
                  <div class="text-inline">
                    {{ scope.row.bakProductSpec}} &nbsp;&nbsp;
                    <span v-if="scope.row.bakWrapName != '空' && scope.row.bakWrapName != null">{{ scope.row.bakWrapName}}</span>
                  </div>
                  <div class="text-inline" >
                    {{ scope.row.bakFactoryEasy}}&nbsp;&nbsp; 中大包装: {{ scope.row.bakMiddleStandRate}}/{{ scope.row.bakBigMiddleRate}}
                  </div>
                </div>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column label="买方机构" prop="buyer_org_easy" sortable="custom">
            <template slot-scope="scope">
              <span>{{ scope.row.buyerOrgEasy }}</span>
            </template>
          </el-table-column>
          <el-table-column label="配送企业" prop="sender_org_easy" sortable="custom">
            <template slot-scope="scope">
              <span>{{ scope.row.senderOrgEasy }}</span>
            </template>
          </el-table-column>
          <el-table-column label="单价"align="right" prop="ooi.UNIT_PRICE" sortable="custom">
            <template slot-scope="scope">
              <span>{{ priceFormat(scope.row.unitPrice) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="数量"align="right" prop="ooi.request_Qty" sortable="custom">
            <template slot-scope="scope">
              <span>{{ scope.row.requestQty }}</span>
            </template>
          </el-table-column>

          <el-table-column label="订购金额"align="right" prop="request_Total" sortable="custom">
            <template slot-scope="scope">
              <span>{{ scope.row.requestTotal }}</span>
            </template>
          </el-table-column>
          <el-table-column label="到货金额"align="right" prop="receive_Total" sortable="custom">
            <template slot-scope="scope">
              <span>{{ scope.row.receiveTotal }}</span>
            </template>
          </el-table-column>
          <el-table-column label="发送时间" prop="ooi.create_Date" sortable="custom">
            <template slot-scope="scope">
              <span>{{ scope.row.createDate }}</span>
            </template>
          </el-table-column>
          <el-table-column label="明细状态">
            <template slot-scope="scope">
              <span>{{ scope.row.orderItemStateStr }}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="foot-btn">
        <div class="foot-left">
          <el-button type="warning" size="small" @click="exportExcel()">
            导出excel
          </el-button>
          <span style="padding: 20px 0px 0px 50px">
            订购金额汇总: <span style="color: red;">{{this.resData.list[0].requestSumTotal}}</span> （元）
            到货金额汇总: <span style="color: red;">{{this.resData.list[0].receiveSumTotal}}</span> （元）
          </span>
        </div>
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
  import {getOrderDetailList,exportExcel} from 'src/axios/trade/senderRole/order/allOrderList';
  import {getSpecHints, getPackHints} from "src/utils/validateUtil";
  import {priceFormat,keyBoardEnter} from "src/utils";
  import fileUpload from 'js-file-download'

  export default {
    data () {
      return {
        currentOrder:undefined,
        activeName: 'first',  // 当前标签
        resData: this.metaData(),
        query: this.metaQuery(), // 查询初始化
        showForm: false, // 表单可见性初始化
        showQuery: false, // 表单查询初始化
        defaultProps: {
          children: 'children',
          label: 'name',
          id: 'id'
        },
        options: [{
          value: '',
          label: '请选择'
        },{
          value: '0',
          label: '准备'
        },{
          value: '1',
          label: '未阅读'
        },{
          value: '2',
          label: '已阅读'
        },{
          value: '3',
          label: '已确认'
        },{
          value: '4',
          label: '到货中'
        },{
          value: '5',
          label: '完成'
        },{
          value: '6',
          label: '作废'
        },{
          value: '7',
          label: '缺货'
        }],
        value:'',
      }
    },
    created () {
      this.list()
    },

    methods: {
      priceFormat,
      getSpecHints,
      getPackHints,
      // -------------------------------------------- 数据初始化  -----------------------------------------
      rest(){
        this.query=this.metaQuery();
      },
      metaData () {
        return {
            orderBy:undefined,
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
      },
      metaQuery () { // 表单查询数据初始化
        return {
            orderItemState:'',
            searchBenDate: '',
            searchEndDate:'',
            searchProductName:'',
            searchBuyerOrgName: '',
            searchSenderOrgName: '',
            searchBakFactoryName: '',
        }
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
      // ------------------------------------------------- 处理方法 ----------------------------------------
      //  获取用户分页列表
      list () {
        this.resData.orderBy=this.currentOrder;
        getOrderDetailList(this.resData, this.query).then(res => {
          this.resData = res.data
          if(this.resData.pageNum === 0 ){
            this.resData.pageNum = 1
          }
        })
      },
      exportExcel(){
        if(this.query.searchBenDate == "" || this.query.searchEndDate == ""){
          this.$message({
            type: 'error',
            message: '请选择开始日期和结束日期！'
          });
          return false;
        }else {
          exportExcel(this.query).then(res => {
            let headers = res.headers;
            let title = ""
            if (!title) {
              const fileName = headers['content-disposition'];
              title = fileName.includes('filename=') ? decodeURI(fileName.split('=')[1]) : '下载的文件';
            }
            fileUpload(res.data, title, "application/vnd.ms-excel")
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

