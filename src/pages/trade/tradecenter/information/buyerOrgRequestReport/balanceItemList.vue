<template>
  <!-- ========================== 订单明细信息列表 ========================= -->
  <!-- 表格 -->
  <div class="tablebox">
    <!-- 表格查询表单 -->
    <el-form ref="query" :model="query" label-position="right" size="small" :inline="true" class="table-form">
      <el-form-item>
        <el-input v-model="query.medicalName" @keyup.enter.native="searchEnterFun" placeholder="品名"
                  size="small"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="query.approveOrg" @keyup.enter.native="searchEnterFun" placeholder="生产企业"
                  size="small"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="query.senderOrg" @keyup.enter.native="searchEnterFun" placeholder="配送企业"
                  size="small"></el-input>
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
        ref="multipleTable"
        stripe>
        <el-table-column type="expand">
          <template slot-scope="scope">
            <el-form label-position="left" height="30px" inline>
              &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
              <span style="font-size: 14px;">采购数量：{{ scope.row.requestQty}}&nbsp; &nbsp;
                        采购金额：{{ priceFormat(scope.row.buyerMoney) }}&nbsp; &nbsp;
                        验收数量：{{ scope.row.receiveQty}}&nbsp; &nbsp;
                        验收金额：{{ priceFormat(scope.row.receiveMoney)}}&nbsp; &nbsp;
                        退货数量：{{ scope.row.returnQty}}&nbsp; &nbsp;
                        退货金额：{{ priceFormat(scope.row.returnMoney)}}&nbsp; &nbsp;
                        发送时间：{{ scope.row.createDate}}
                  </span>
            </el-form>
          </template>
        </el-table-column>
        <!-- <el-table-column type="index" width="50" label="序号" header-align="left" align="center"></el-table-column>-->
        <el-table-column label="产品名" show-overflow-tooltip prop="DRUGNAME" sortable="custom">
          <template slot-scope="scope">
            <!--<span>{{ scope.row.drugName }}</span>-->
              <!--tootip提示气泡-->
              <!--:enterable="false" 鼠标不可进入tooltip中-->
              <el-tooltip placement="top" :enterable="false">
                <!--气泡内容（必须放在slot="content"内）,布局与源内容保持一致-->
                <div slot="content">
                  <div>{{ scope.row.drugName }}</div>
                  <div class="text-inline">{{ scope.row.bakMedicalMode }}
                    <span v-if="scope.row.tradeName != '无' && scope.row.tradeName !=null">({{ scope.row.tradeName }})</span>
                  </div>
                </div>

                <!--源内容（必须放在class="el-tooltip-box"内）-->
                <div class="el-tooltip-box">
                  <!--加class="text-inline"确保内容不折行-->
                  <div class="text-inline">{{ scope.row.drugName }}</div>
                  <div class="text-inline">{{ scope.row.bakMedicalMode }}
                    <span v-if="scope.row.tradeName != '无' && scope.row.tradeName !=null">({{ scope.row.tradeName }})</span>
                  </div>
                </div>
              </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column label="产品信息" show-overflow-tooltip prop="TRADE_NAME" sortable="custom">
          <template slot-scope="scope">
            <!--<span>{{ scope.row.tradeName }}</span>-->
            <el-tooltip placement="top" :enterable="false">
              <div slot="content">
                {{getHints(scope.row.standardSpec,scope.row.wrapName)}}<br/>
                {{getPackHints(scope.row.manuname,scope.row.bakMiddleStandRate,scope.row.bakBigMiddleRate)}}
              </div>
              <div class="el-tooltip-box">
                <div class="text-inline">
                  {{ scope.row.standardSpec }}&nbsp;&nbsp;
                  <span v-if="scope.row.wrapName != '空' && scope.row.wrapName != null">{{scope.row.wrapName}}</span>
                </div>
                <div class="text-inline" >
                  {{ scope.row.manuname}}&nbsp;&nbsp; 中大包装:{{scope.row.bakMiddleStandRate}}/{{scope.row.bakBigMiddleRate}}
                </div>
              </div>
            </el-tooltip>

          </template>
        </el-table-column>
        <!--     <el-table-column label="单位" sortable width="60" prop="B.METRIC_NAME" sortable="custom">
              <template slot-scope="scope">
                <span>{{ scope.row.metricName }}</span>
              </template>
            </el-table-column>
           <el-table-column label="剂型" sortable width="60" prop="B.BAK_MEDICAL_MODE" sortable="custom" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{ scope.row.bakMedicalMode }}</span>
              </template>
            </el-table-column>
            <el-table-column label="规格包装" show-overflow-tooltip prop="STANDARD_SPEC" sortable="custom">
              <template slot-scope="scope">
                <span>{{ scope.row.standardSpec }}</span>
              </template>
            </el-table-column>-->
        <el-table-column label="供应价" width="80" align="right" prop="UNIT_PRICE" sortable="custom">
          <template slot-scope="scope">
            <span>{{ priceFormat(scope.row.unitPrice) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="零售价" width="80" header-align="left" align="right" prop="BAK_RETAIL_PRICE"
                         sortable="custom">
          <template slot-scope="scope">
            <span>{{ priceFormat(scope.row.bakRetailPrice) }}</span>
          </template>
        </el-table-column>
        <!--  <el-table-column label="生产企业" show-overflow-tooltip prop="MANUNAME" sortable="custom">
             <template slot-scope="scope">
               {{ scope.row.maunName }}
             </template>
           </el-table-column>-->
        <el-table-column label="医疗机构" show-overflow-tooltip prop="BUYERNAME" sortable="custom">
          <template slot-scope="scope">
            {{ scope.row.buyerName }}
          </template>
        </el-table-column>
        <el-table-column label="配送企业" show-overflow-tooltip prop="SENDERNAME" sortable="custom">
          <template slot-scope="scope">
            <span>{{ scope.row.senderName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="采购单号" prop="A.ORDER_CODE" sortable="custom" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.orderCode }}</span>
          </template>
        </el-table-column>
        <!--<el-table-column label="操作">
          <template slot-scope="scope">
            <span><a href="javascript:void(0)" @click="handleGoShow(scope.row.id)" title="详情"
                     class="operation-btn" size="small">详情</a></span>
          </template>
        </el-table-column>-->
        <el-table-column label="操作">
          <template slot-scope="scope">
            <div class="operates">
              <a href="javascript:;" class="green" @click="show(scope.row)">查看</a>
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
    <div class="foot-btn">
      <div class="foot-left">
        <el-button type="" @click="goBack">返回</el-button>
      </div>
    </div>
    <!--<el-dialog :title="详情"
               top="2vh" :visible.sync="showForm" :before-close="handleClose">
      <div style="width: 500px">
        <el-form ref="form" :model="form" :rules="rules" label-width="80px">
          <el-form-item label="产品名" prop="drugName">
            {{scope.row.drugName}}
          </el-form-item>
          <el-form-item label="商品名" prop="tradeName">
            {{scope.row.tradeName}}
          </el-form-item>
          <el-form-item label="发送时间" prop="createDate">
            {{scope.row.createDate}}
          </el-form-item>
          <el-form-item label="单价" prop="unitPrice">
            {{scope.row.unitPrice}}
          </el-form-item>
          <el-form-item label="订购量" prop="requestQty">
            {{scope.row.requestQty}}
          </el-form-item>
          <el-form-item label="订购金额" prop="buyerMoney">
            {{scope.row.unitPrice}}
          </el-form-item>
          <el-form-item label="到货量" prop="receiveQty">
            {{scope.row.receiveQty}}
          </el-form-item>
          <el-form-item label="到货金额" prop="receiveMoney">
            {{scope.row.receiveMoney}}
          </el-form-item>
          <el-form-item label="退货数量" prop="returnQty">
            {{scope.row.returnQty}}
          </el-form-item>
          <el-form-item label="退货金额" prop="returnMoney">
            {{scope.row.returnMoney}}
          </el-form-item>
          <span slot="footer">
            <el-button @click="handleClose" size="small">关闭</el-button>
          </span>
        </el-form>
      </div>
    </el-dialog>-->
  </div>
  <!-- ========================== 主内容end ========================= -->

</template>
<script>

  // 引入用户相关请求
  import {reportOrderList} from 'src/axios/trade/information/report'
  import {priceFormat, keyBoardEnter} from "src/utils";
  import {getSpecHints, getPackHints} from "src/utils/validateUtil";

  export default {
    name: 'based-city-snder-list',
    data() {
      return {
        activeName: 'first',  // 当前标签
        resData: this.metaData(),
        currentOrder: undefined,
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
      show(row) {
        this.$refs.multipleTable.toggleRowExpansion(row, this.expanded)
        this.expanded = !this.expanded
      },
      goBack() {
        this.$router.go(-1)
      },
      reset() {
        this.query = this.metaQuery();
        this.list()
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
          buyerOrgId: this.$route.params.buyerOrgId,
          infoFlag: this.$route.params.equalFlag,
          medicalName: '',
          approveOrg: '',
          senderOrg: ''
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
        reportOrderList(this.resData, this.query).then(res => {
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
        this.resData.pageSize = val;
        this.list()
      },
      handleCurrentChange(val) {
        this.resData.pageNum = val
        this.list()
      },
      // 打开详情页面
      handleGoShow(orderCode) {
        findBuyerOrderDetails(orderCode).then(res => {
          this.showForm = true;
          this.form = res.data;
        })
      },
      handleClose(done) {
        this.$refs['form'].resetFields();
        this.toggleForm();
      },
      getHints(standardSpec, wrapName) {
        let _standardSpec, _wrapName;
        if (standardSpec == null || standardSpec == undefined || standardSpec == "空") {
          _standardSpec = "";
        } else {
          _standardSpec = standardSpec;
        }
        if (wrapName == null || wrapName == undefined || wrapName == "空") {
          _wrapName = "";
        } else {
          _wrapName = wrapName;
        }
        return _standardSpec + _wrapName
      },
    }
  }
</script>
<!--<style>
  .el-table__expand-icon:after {
    content: "查看";
    color: #66cc66 !important;
    cursor: pointer;
  }
  .el-table__expand-icon>i{
    display: none !important;
  }
</style>-->
