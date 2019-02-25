<template>
  <div>
    <!--图形显示区-->
    <div class="infobox">
      <div class="s-form">
        <form>
          <el-input placeholder="退货单号" v-model="queryData.searchReturnCode"></el-input>
          <el-input placeholder="品名" v-model="queryData.searchMedicalName"></el-input>
          <el-input placeholder="买方机构" v-model="queryData.searchBuyerName"></el-input>
          <el-input placeholder="生产企业" v-model="queryData.searchFactoryName"></el-input>
          <span class="date-group">
            <el-date-picker
              size="small"
              type="date"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              placeholder="创建开始日期"
              :editable="false"
              v-model="queryData.searchBeginDate">
            </el-date-picker>
            &nbsp;至&nbsp;
            <el-date-picker
              size="small"
              type="date"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              placeholder="创建结束日期"
              :editable="false"
              v-model="queryData.searchEndDate">
            </el-date-picker>
            <el-button @click="handleQuery">查询</el-button>
            <el-button @click="queryData = metaQuery()"> 重置</el-button>
            <el-button size="small">导出</el-button>
          </span>

        </form>
      </div>
      <div class="tableset">
        <el-table
          :data="resData.list" stripe border tooltip-effect="dark">
          <el-table-column prop="returnCode" label="到货单号" width="130"></el-table-column>
          <el-table-column prop="productName" label="产品名称" width="120" show-overflow-tooltip></el-table-column>
          <el-table-column prop="tradeName" label="商用名" width="90" show-overflow-tooltip></el-table-column>
          <el-table-column prop="spec" label="规格" width="120" show-overflow-tooltip></el-table-column>
          <el-table-column prop="doseageForm" label="剂型" width="80" show-overflow-tooltip></el-table-column>
          <el-table-column prop="factoryName" label="生产企业" show-overflow-tooltip></el-table-column>
          <el-table-column label="单价" align="right" width="80">
            <template slot-scope="scope">
              <span>{{ priceFormat(scope.row.unitPrice)}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="returnNum" label="数量" align="right" width="70"></el-table-column>
          <el-table-column label="金额" align="right" width="70">
            <template slot-scope="scope">
              <span>{{ priceFormat(scope.row.returnSum)}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="buyerName" label="医疗机构" show-overflow-tooltip></el-table-column>
          <el-table-column prop="senderName" label="配送企业" show-overflow-tooltip></el-table-column>
          <el-table-column prop="returnState" label="状态" width="80" align="center" show-overflow-tooltip></el-table-column>
          <el-table-column prop="returnDate" label="日期" align="center" width="80"></el-table-column>
        </el-table>
      </div>
      <!-- 表格分页 -->
      <page-bar :data="resData" @refreshPage="refreshPage"></page-bar>
    </div>
  </div>
</template>

<script>
  import {orderReturnList, orderReturnSateEnumList} from "src/axios/supervise/trade/orderMonitor";
  import {PageData} from "src/components/mixins/index";
  import {priceFormat} from "src/utils/index"

  export default {
    name: "return-order",
    mixins: [PageData],
    created() {
      this.metaList();
    },
    data() {
      return {
        queryData: this.metaQuery(), // 查询初始化
        orderSateEnum: [],
        X_Data: [],
        y_returnQty: [],
        y_returnSum: [],
      }
    },
    methods: {
      priceFormat,
      metaData() {
        return {
          pageNum: 1,
          pageSize: 10,
          total: 0,
          pages: 0,
          list: []
        }
      },
      metaQuery() {
        return {
          searchReturnCode: '',
          searchMedicalName: '',
          searchBuyerName: '',
          searchFactoryName: '',
          searchBeginDate: '',
          searchEndDate: '',
        }
      },
      metaList() {
        orderReturnList(this.resData.pageNum, this.resData.pageSize, this.queryData).then(res => {
          if (res.code == 200) {
            this.resData = res.data;
          }
        }).then(() => {
          orderReturnSateEnumList().then(res => {
            this.orderSateEnum = res.data
          });
        })
      },
    }
  }
</script>
