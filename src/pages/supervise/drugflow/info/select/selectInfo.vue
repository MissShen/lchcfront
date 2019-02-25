<template>
  <div class="tableset">
    <el-table :data="resData" stripe border>
      <el-table-column prop="sendOrgName" label="配送企业" show-overflow-tooltip></el-table-column>
      <el-table-column prop="quotePrice" label="报价" align="right" header-align="left" width="120"></el-table-column>
      <el-table-column prop="quoteDate" label="报价日期" width="150"></el-table-column>
      <el-table-column prop="resState" label="是否进入候选目录" width="150" :formatter="resStateFormat"></el-table-column>
      <el-table-column prop="bargainOrgName" label="议价对象" width="180"></el-table-column>
      <el-table-column prop="bargainDate" label="议价时间" width="150"></el-table-column>
      <el-table-column prop="bargainPrice" label="议价价格" align="right" header-align="left" width="120"></el-table-column>
    </el-table>
    <!--<div class="s-title"><i class="el-icon-document"></i>调价记录</div>
    <el-table :data="resPriceData.list" stripe>
      <el-table-column prop="projectName" label="项目"></el-table-column>
      <el-table-column prop="tradePrice" label="现行交易价"></el-table-column>
      <el-table-column prop="applyArea" label="适用地区"></el-table-column>
      <el-table-column prop="priceChangeTimes" label="价格变更次数"></el-table-column>
      <el-table-column prop="maxPrice" label="最高价"></el-table-column>
      <el-table-column prop="minPrice" label="最低价"></el-table-column>
      <el-table-column prop="changeTime" label="最新变更时间"></el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <a class="operation-btn" @click="showChangeDetail(scope.row.id)">查看变更详情</a>
        </template>
      </el-table-column>
    </el-table>-->
    <change-detail ref="ChangeDetail"></change-detail>
  </div>
</template>

<script>

  import ChangeDetail from './changeDetail'
  import {findSelectInfoByProductId} from 'src/axios/supervise/drug-flow/drugFlow'

  export default {
    components: {
      ChangeDetail
    },
    name: "select-info",
    data() {
      return {
        productId: this.$route.query.id,
        resData: [],
        resPriceData: this.metePriceData(),
      }
    },
    methods: {
      metePriceData() {
        return {
          pageNum: 1,
          pageSize: 10,
          total: 0,
          pages: 0,
          list: [{
            projectName: '北京市昌平区采购项目',
            tradePrice: '1780',
            applyArea: '北京',
            priceChangeTimes: '3',
            maxPrice: '2780',
            minPrice: '1600',
            changeTime: '2001-01-01 11:30:00',
          }, {
            projectName: '北京市怀柔区采购项目',
            tradePrice: '1780',
            applyArea: '北京',
            priceChangeTimes: '4',
            maxPrice: '2780',
            minPrice: '1600',
            changeTime: '2001-01-01 11:30:00',
          }, {
            projectName: '北京市顺义区采购项目',
            tradePrice: '1780',
            applyArea: '北京',
            priceChangeTimes: '5',
            maxPrice: '2780',
            minPrice: '1600',
            changeTime: '2001-01-01 11:30:00',
          },]
        }
      },
      metaList() {
        findSelectInfoByProductId(this.productId).then((res) => {
          this.resData = res.data;
        })
      },
      showChangeDetail(id) {
        this.$nextTick(() => {
          this.$refs.ChangeDetail.fillData(id)
        })
      },
      resStateFormat(row, column, cellValue) {
        return cellValue === 1 ? '是' : '否'
      }
    },
    mounted() {
      this.metaList()
    }
  }
</script>
