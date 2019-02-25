<template>
  <!-- ========================== 品种明细 ========================= -->
  <!-- 表格 -->
  <div class="tablebox">
    <!-- 表格查询表单 -->
    <el-form ref="query" :model="query" label-position="right" size="small" :inline="true" class="table-form">
      <el-form-item class="width-150">
        <el-select v-model="query.searchState" @keyup.enter.native="searchEnterFun" placeholder="是否基药" size="small">
          <el-option label="是" value="1"></el-option>
          <el-option label="否" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="width-150">
        <el-input v-model="query.medicalName" @keyup.enter.native="searchEnterFun" placeholder="品名"
                  size="small"></el-input>
      </el-form-item>
      <el-form-item>
        <el-date-picker type="date" @keyup.enter.native="searchEnterFun" placeholder="订单日期" v-model="query.beginDate"
                        format="yyyy-MM-dd" value-format="yyyy-MM-dd" size="small"></el-date-picker>
        &nbsp;至&nbsp;
        <el-date-picker type="date" @keyup.enter.native="searchEnterFun" placeholder="订单日期" v-model="query.endDate"
                        format="yyyy-MM-dd" value-format="yyyy-MM-dd" size="small"></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="success" size="small" @click="searchEnterFun">查询</el-button>
        <el-button type="warning" size="small" @click="reset()">重置</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格列表 -->
    <div class="tableset">
      <el-table
        :data="resData.list"
        border
        @sort-change="sortChang"
        stripe>
        <!--<el-table-column type="index" width="50" header-align="left" align="center" label="序号"></el-table-column>-->
        <el-table-column label="产品名" prop="ooi.BAK_PRODUCT_NAME" sortable="custom" min-width="150">
          <template slot-scope="scope" class="drugMessage">
            <ul class="ico-zt">

              <li>
                <!--tootip提示气泡-->
                <!--:enterable="false" 鼠标不可进入tooltip中-->
                <el-tooltip placement="top" :enterable="false">
                  <!--气泡内容（必须放在slot="content"内）,布局与源内容保持一致-->
                  <div slot="content">
                    <div>{{ scope.row.drugName }}</div>
                    <div>{{ scope.row.bakMedicalMode }}
                      <span v-if="scope.row.bakTradeName != '无' && scope.row.bakTradeName !=null">({{ scope.row.bakTradeName }})</span>
                    </div>
                  </div>

                  <!--源内容（必须放在class="el-tooltip-box"内）-->
                  <div class="el-tooltip-box">
                    <!--加class="text-inline"确保内容不折行-->
                    <div class="text-inline">{{ scope.row.drugName }}</div>
                    <div class="text-inline">{{ scope.row.bakMedicalMode }}
                      <span v-if="scope.row.bakTradeName != '无' && scope.row.bakTradeName !=null">({{ scope.row.bakTradeName }})</span>
                    </div>
                  </div>
                </el-tooltip>
              </li>
            </ul>
          </template>
        </el-table-column>
        <el-table-column label="产品信息" prop="ooi.BAK_MEDICAL_SPEC" sortable="custom" min-width="150">
          <template slot-scope="scope">

            <el-tooltip placement="top" :enterable="false">
              <div slot="content">
                {{getHints(scope.row.standardSpec,scope.row.bakWrapName)}}<br/>
                {{getPackHints(scope.row.manufactureName,scope.row.middleStandRate,scope.row.bigMiddleRate )}}
              </div>
              <div class="el-tooltip-box">
                <div class="text-inline">
                  {{ scope.row.standardSpec}} &nbsp;&nbsp;
                  <span v-if="scope.row.bakWrapName != '空' && scope.row.bakWrapName != null">{{ scope.row.bakWrapName}}</span>
                </div>
                <div class="text-inline" >
                  {{ scope.row.manufactureName}} &nbsp;&nbsp; 中大包装:{{scope.row.middleStandRate }}/{{ scope.row.bigMiddleRate}}
                </div>
              </div>
            </el-tooltip>

          </template>
        </el-table-column>
        <el-table-column label="供应价" prop="tmp.unit_price" sortable="custom" width="80" header-align="left"
                         align="right">
          <template slot-scope="scope">
            {{ priceFormat(scope.row.unitPrice) }}
          </template>
        </el-table-column>
        <el-table-column label="采购数量" prop="tmp.REQUEST_QTY" sortable="custom" width="90" header-align="left"
                         align="right">
          <template slot-scope="scope">
            <span>{{ scope.row.requestQty }}</span>
          </template>
        </el-table-column>
        <el-table-column label="采购金额（元）" prop="tmp.buyer_money" sortable="custom" width="130" header-align="left"
                         align="right">
          <template slot-scope="scope">
            {{ priceFormat(scope.row.buyerMoney) }}
          </template>
        </el-table-column>
        <el-table-column label="验收数量" prop="tmp.RECEIVE_QTY" sortable="custom" width="90" header-align="left"
                         align="right">
          <template slot-scope="scope">
            <span>{{ scope.row.receiveQty }}</span>
          </template>
        </el-table-column>
        <el-table-column label="验收金额（元）" prop="tmp.receive_money" sortable="custom" width="130" header-align="left"
                         align="right">
          <template slot-scope="scope">
            {{ priceFormat(scope.row.receiveMoney) }}
          </template>
        </el-table-column>
        <el-table-column label="退货数量" prop="tmp.RETURN_QTY" sortable="custom" width="90" header-align="left"
                         align="right">
          <template slot-scope="scope">
            <span>{{ scope.row.returnQty }}</span>
          </template>
        </el-table-column>
        <el-table-column label="退货金额（元）" prop="tmp.return_money" sortable="custom" width="90" header-align="left"
                         align="right">
          <template slot-scope="scope">
            <span>{{ priceFormat(scope.row.returnMoney) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="是否基药" prop="basic_medicant_flag" sortable="custom">
          <template slot-scope="scope">
            <span>{{ scope.row.baseMedicantFlag }}</span>
          </template>
        </el-table-column>
        <el-table-column label="查看" width="80">
          <template slot-scope="scope">
            <div class="operates">
              <a title="查看" class="green" @click="searchInfo(scope.row.productId)" size="small">查看</a>
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

    <div class="foot-btn" v-if="this.$route.params.buyerOrgId">
      <div class="foot-left">
        <el-button type="" @click="goBack">返回</el-button>
      </div>
    </div>
  </div>
  <!-- ========================== 主内容end ========================= -->

</template>
<script>

  // 引入用户相关请求
  import {reportProductList} from 'src/axios/trade/information/report'
  import {priceFormat, keyBoardEnter} from "src/utils";
  import {getSpecHints, getPackHints} from "src/utils/validateUtil";

  export default {
    name: 'based-city-snder-list',
    data() {
      return {
        currentOrder: undefined,
        activeName: 'first',  // 当前标签
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
    created() {
      this.list()
    },
    methods: {
      getSpecHints,
      getPackHints,
      priceFormat,
      reset() {
        this.query = this.metaQuery();
        this.list();
      },
      goBack() {
        this.$router.go(-1);
      },
      searchInfo(productId) {
        this.$router.push("/TRADE/dataReport/buyDetails/" + productId);
      },
      // -------------------------------------------- 数据初始化  -----------------------------------------
      metaData() {
        return {
          // 前后台交互数据封装格式
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
      metaQuery() { // 表单查询数据初始化
        return {

          medicalName: '',
          searchState: '',
          beginDate: '',
          endDate: ''

        }
      },
      searchEnterFun(e) {
        this.$store.state.pageSeach.pageNum = 1;
        this.resData.pageNum = 1;
        keyBoardEnter(e, () => {
          this.list();
        })
      },
      // ------------------------------------------------- 处理方法 ----------------------------------------
      //  获取用户分页列表
      list() {
        this.resData.orderBy = this.currentOrder;
        reportProductList(this.resData, this.query).then(res => {
          this.resData = res.data
          if (this.resData.pageNum === 0) {
            this.resData.pageNum = 1
          }
        })
      },
      sortChang(value) {
        let sortType = " desc"
        if (value.order.startsWith("asc")) {
          sortType = " asc";
        }
        this.currentOrder = value.prop + sortType;
        this.list()
      },

      // ************************ 分页操作 ************************
      handleSizeChange(val) {
        this.resData.pageSize = val
        this.list()
      },
      handleCurrentChange(val) {
        this.resData.pageNum = val
        this.list()
      },
      getHints(standardSpec, bakWrapName) {
        let _standardSpec, _bakWrapName;
        if (standardSpec == null || standardSpec == undefined || standardSpec == "空") {
          _standardSpec = "";
        } else {
          _standardSpec = standardSpec;
        }
        if (bakWrapName == null || bakWrapName == undefined || bakWrapName == "空") {
          _bakWrapName = "";
        } else {
          _bakWrapName = bakWrapName;
        }
        return "规格: "+_standardSpec +"   包材:"+ _bakWrapName
      },
    }
  }
</script>

