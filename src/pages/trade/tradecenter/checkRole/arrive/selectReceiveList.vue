<template>
  <!-- ========================== 主内容start ========================= -->
  <!-- 表格 -->
  <div class="tablebox">
    <!-- 表格查询表单 -->
    <el-form ref="query" :model="query" label-position="right" size="small" :inline="true" class="table-form">
      <el-form-item class="width-150">
        <el-input v-model="query.bakBuyerEasy" @keyup.enter.native="searchEnterFun" placeholder="买方机构"
                  size="small"></el-input>
      </el-form-item>
      <el-form-item class="width-150">
        <el-input v-model="query.bakProductName" @keyup.enter.native="searchEnterFun" placeholder="产品名"
                  size="small"></el-input>
      </el-form-item>
      <el-form-item class="width-150">
        <el-input v-model="query.bakMedicalName" @keyup.enter.native="searchEnterFun" placeholder="规格"
                  size="small"></el-input>
      </el-form-item>
      <el-form-item>
        <el-date-picker size="small" type="date" @keyup.enter.native="searchEnterFun" placeholder="到货日期"
                        format="yyyy-MM-dd" value-format="yyyy-MM-dd" v-model="query.searchBenDate"></el-date-picker>
        &nbsp;至&nbsp;
        <el-date-picker size="small" type="date" @keyup.enter.native="searchEnterFun" placeholder="到货日期"
                        format="yyyy-MM-dd" value-format="yyyy-MM-dd" v-model="query.searchEndDate"></el-date-picker>
      </el-form-item>
      <el-form-item class="width-150">
        <el-input v-model="query.bakFactoryEasy" @keyup.enter.native="searchEnterFun" placeholder="生产企业"
                  size="small"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="success" @click="searchEnterFun" size="small">查询</el-button>
        <el-button type="warning" @click="resetForm" size="small">重置</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格列表 -->
    <div class="tableset">
      <el-table
        :data="resData.list"
        border
        stripe
        @sort-change="sortChang"
      >
        <!--<el-table-column type="index" width="50" header-align="left" align="center" label="序号"></el-table-column>-->
        <el-table-column label="采购单号" width="160" prop="purchaseCode" sortable="custom">
          <template slot-scope="scope">
            <span>{{scope.row.purchaseCode}}</span>
          </template>
        </el-table-column>
        <el-table-column label="买方机构" show-overflow-tooltip prop="bakBuyerEasy" sortable="custom">
          <template slot-scope="scope">
            {{ scope.row.bakBuyerEasy }}
          </template>
        </el-table-column>

        <el-table-column label="产品名称" min-width="200" prop="b.bak_product_name" sortable="custom">
          <template slot-scope="scope" class="drugMessage">
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

          </template>
        </el-table-column>

        <el-table-column prop="drugStorage" label="产品信息" min-width="200">
          <template slot-scope="scope">
            <el-tooltip placement="top" :enterable="false">
              <div slot="content">
                {{getHints(scope.row.bakProductSpec,scope.row.bakWrapName)}}<br/>
                {{getPackHints(scope.row.bakFactoryEasy,scope.row.middleStandRate,scope.row.bigMiddleRate)}}
              </div>
              <div class="el-tooltip-box">
                <div class="text-inline">
                  <span class="text-inline"  v-if="scope.row.bakWrapName != '空' && scope.row.bakWrapName != null">   {{ scope.row.bakProductSpec}}  &nbsp;&nbsp; {{ scope.row.bakWrapName}}</span>
                  <span class="text-inline"  v-if="scope.row.bakWrapName == '空' || scope.row.bakWrapName == null">   {{ scope.row.bakProductSpec}}</span>
                </div>
                <div class="text-inline" >
                  {{ scope.row.bakFactoryEasy}}&nbsp;&nbsp; 中大包装: {{scope.row.middleStandRate}}/{{ scope.row.bigMiddleRate}}
                </div>
              </div>
            </el-tooltip>

          </template>
        </el-table-column>

        <el-table-column label="单价" width="80" align="right" prop="b.unit_Price" sortable="custom">
          <template slot-scope="scope">
            <span>{{ priceFormat(scope.row.unitPrice) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="到货量" width="80" align="right" prop="oor.receive_Qty" sortable="custom">
          <template slot-scope="scope">
            <span>{{ scope.row.receiveQty }}</span>
          </template>
        </el-table-column>
        <el-table-column label="批号" show-overflow-tooltip prop="oor.lot_No" sortable="custom">
          <template slot-scope="scope">
            <span>{{ scope.row.lotNo }}</span>
          </template>
        </el-table-column>
        <el-table-column label="有效期" width="120" align="center" prop="oor.medical_Expired_Date" sortable="custom">
          <template slot-scope="scope">
            <span>{{ scope.row.medicalExpiredDate }}</span>
          </template>
        </el-table-column>
        <el-table-column label="到货日期" width="120" align="center" prop="receiveDate" sortable="custom">
          <template slot-scope="scope">
            <span>{{ scope.row.receiveDate }}</span>
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
        <el-button type="warning" size="small" @click="exportExcel">导出Excel</el-button>
      </div>
    </div>

  </div>
  <!-- ========================== 主内容end ========================= -->

</template>
<script>

  // 数据来源
  import {selectReceiveList, exportDeleteEXL} from 'src/axios/trade/audit/auditConfig'
  import fileUpload from 'js-file-download'
  import {priceFormat, keyBoardEnter} from "src/utils";
  import {getSpecHints, getPackHints} from "src/utils/validateUtil";

  export default {
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
        },
        options: [{
          value: '选项1',
          label: '到货中'
        }, {
          value: '选项2',
          label: '完成'
        }, {
          value: '选项3',
          label: '到货修改'
        }]
      }
    },
    created() {
      this.list()
    },

    methods: {
      getSpecHints,
      getPackHints,
      priceFormat,
      // -------------------------------------------- 数据初始化  -----------------------------------------
      sortChang(value) {
        let sortType = " desc"
        if (value.order.startsWith("asc")) {
          sortType = " asc";
        }
        this.currentOrder = value.prop + sortType;
        this.list()
      },
      searchEnterFun(e) {
        this.$store.state.pageSeach.pageNum = 1;
        this.resData.pageNum = 1;
        keyBoardEnter(e, () => {
          this.list();
        })
      },
      metaData() {
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
      metaQuery() { // 表单查询数据初始化
        return {

          id: undefined,
          searchSenderName: undefined,
          searchSenderAbbr: undefined,

        }
      },
      // 重置表单
      resetForm() {
        this.form = this.metaData()
        this.list()
      },
      // ------------------------------------------------- 处理方法 ----------------------------------------
      //  获取用户分页列表
      list() {
        this.resData.orderBy = this.currentOrder;
        selectReceiveList(this.resData, this.query).then(res => {
          this.resData = res.data;
          if (this.resData.pageNum === 0) {
            this.resData.pageNum = 1;
          }
        })
      },
      exportExcel() {
        if (this.query.searchBenDate == undefined || this.query.searchBenDate == '' || this.query.searchEndDate == undefined || this.query.searchEndDate == null) {
          this.$message({
            type: 'error',
            message: '请选择创建的开始日期及创建的结束日期'
          });
          return false;
        } else {
          exportDeleteEXL(this.query).then(res => {
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
      handleSizeChange(val) {
        this.resData.pageSize = val
        this.list()
      },
      handleCurrentChange(val) {
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

