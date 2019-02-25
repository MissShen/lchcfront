<template>
  <div>
    <div class="infobox">
      <div class="s-form">
        <el-form ref="queryData" :model="queryData">
          <el-input v-model="queryData.searchOrderCode" placeholder="订单号"></el-input>
          <el-input v-model="queryData.searchMedicalName" placeholder="产品名称"></el-input>
          <el-input v-model="queryData.searchBuyerName" placeholder="医院名称"></el-input>
          <el-input v-model="queryData.searchFactoryName" placeholder="生产企业"></el-input>
          <el-input v-model="queryData.searchSenderName" placeholder="配送企业"></el-input>
          <el-select v-model="queryData.searchOrderState" placeholder="订单状态">
            <el-option value="">全部</el-option>
            <el-option v-for="item in orderSateEnum"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value"
            ></el-option>
          </el-select>
          <el-button size="small" @click="handleQuery">查询</el-button>
          <el-button size="small" @click="queryData = metaQuery()"> 重置</el-button>
          <el-button size="small">导出</el-button>
        </el-form>
      </div>
      <div class="tableset">
        <el-table :data="resData.list" stripe border tooltip-effect="dark">
          <el-table-column prop="orderCode" label="订单号" show-overflow-tooltip></el-table-column>
          <el-table-column prop="buyerName" label="医院名称" show-overflow-tooltip></el-table-column>
          <el-table-column prop="medicalName" label="产品名称" show-overflow-tooltip></el-table-column>
          <el-table-column prop="productName" label="商用名" show-overflow-tooltip></el-table-column>
          <el-table-column prop="medicalMode" label="剂型" width="70" show-overflow-tooltip></el-table-column>
          <el-table-column prop="spec" label="规格" show-overflow-tooltip></el-table-column>
          <el-table-column prop="factoryName" label="生产企业" show-overflow-tooltip></el-table-column>
          <el-table-column prop="senderName" label="配送企业" show-overflow-tooltip></el-table-column>
          <el-table-column prop="unitPrice" label="单价" align="right" width="60"></el-table-column>
          <el-table-column prop="orderQty" label="订购数量" align="right" width="70"></el-table-column>
          <el-table-column prop="orderSum" label="订购金额" align="right" width="70"></el-table-column>
          <el-table-column prop="receiveQty" label="到货数量" align="right"
                           width="70"></el-table-column>
          <el-table-column prop="receiveSum" label="到货金额" align="right"
                           width="70"></el-table-column>
          <el-table-column prop="receiveRatio" label="到货率(%)" align="right"
                           width="80"></el-table-column>
          <el-table-column label="状态" align="center" width="60">
            <template slot-scope="scope">
              <span v-for="item in orderSateEnum" :key="item.value" v-if="item.value===scope.row.orderState">{{item.label}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="orderDate" label="日期" align="center" width="80" show-overflow-tooltip></el-table-column>
        </el-table>
      </div>
      <!-- 表格分页 -->
      <page-bar :data="resData" @refreshPage="refreshPage"></page-bar>
    </div>
  </div>
</template>

<script>
  import {orderReceiveList, orderReceiveSateEnumList} from "src/axios/supervise/trade/orderMonitor";
  import {PageData} from "src/components/mixins/index";

  export default {
    name: "receive",
    mixins: [PageData],
    created() {
      this.metaList();
    },
    data() {
      return {
        queryData: this.metaQuery(), // 查询初始化
        orderSateEnum: [],
        X_Data: [],
        y_orderQty: [],
        y_receiveQty: [],
      }
    },
    methods: {
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
          searchOrderCode: '',
          searchMedicalName: '',
          searchBuyerName: '',
          searchFactoryName: '',
          searchSenderName: '',
          searchOrderState: '',
        }
      },
      metaList: function () {
        orderReceiveList(this.resData, this.queryData).then(res => {
          if (res.code == 200) {
            this.resData = res.data;
            0 === this.resData.pageNum ? this.resData.pageNum = 1 : null;
          }
        }).then(() => {
          orderReceiveSateEnumList().then(res => {
            this.orderSateEnum = res.data
          });
        })
      },
    },
  }
</script>
