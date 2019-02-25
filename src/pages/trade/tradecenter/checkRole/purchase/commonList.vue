<template>
  <div>
    <!-- ========================== 主内容start ========================= -->
    <!-- 表格 -->
    <div class="tablebox">
      <!-- 表格查询表单 -->
      <div class="table-form">
        <el-form ref="query" :model="query" label-position="right" size="small">
          <div class="formrow">
            <span>
              <el-select v-model="value" placeholder="状态" size="small">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </span>
            <span>
              <el-select v-model="value" placeholder="品名" size="small">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </span>
            <span>
                <el-input v-model="query.searchproductName" placeholder="模糊查询" size="small"></el-input>
            </span>
            <span>
              <el-date-picker type="date" placeholder="开始日期" v-model="query.searchBenDate"
                              format="yyyy-MM-dd" value-format="yyyy-MM-dd" size="small"></el-date-picker>
              &nbsp;至&nbsp;
              <el-date-picker type="date" placeholder="结束日期" v-model="query.searchEndDate"
                              format="yyyy-MM-dd" value-format="yyyy-MM-dd" size="small"></el-date-picker>
            </span>
          <!--  <span>
                <el-button type="warning">查询</el-button>
                <el-button type="primary">重置</el-button>
            </span>-->
          </div>
        </el-form>
      </div>

      <!-- 表格列表 -->
      <div class="tableset">
        <el-table
          :data="resData.list"
          border
          stripe>
          <!--<el-table-column type="index" label="序号" width="50"></el-table-column>-->
          <el-table-column label="状态">
            <template slot-scope="scope">
              <span>{{ scope.row.purchaseState }}</span>
            </template>
          </el-table-column>
          <el-table-column label="产品名">
            <template slot-scope="scope">
              <span>{{ scope.row.productName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="商品名">
            <template slot-scope="scope">
              <span>{{ scope.row.tradeName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="剂型">
            <template slot-scope="scope">
              <span>{{ scope.row.doseageName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="包装规格">
          <template slot-scope="scope">
            <span>{{ scope.row.spec }}</span>
          </template>
          </el-table-column>
          <el-table-column label="中/大包装">
            <template slot-scope="scope">
              <span>{{ scope.row.middleStandRate }}</span>
            </template>
          </el-table-column>
          <el-table-column label="医疗机构">
            <template slot-scope="scope">
              <span>{{ scope.row.buyerEasy }}</span>
            </template>
          </el-table-column>
          <el-table-column label="生产企业">
            <template slot-scope="scope">
              <span>{{ scope.row.producerName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="配送企业">
            <template slot-scope="scope">
              <span>{{ scope.row.senderAbbr }}</span>
            </template>
          </el-table-column>
          <el-table-column label="单价（元）">
            <template slot-scope="scope">
              <span>{{ priceFormat(scope.row.unitPrice) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="数量">
            <template slot-scope="scope">
              <span>{{ scope.row.requestQty }}</span>
            </template>
          </el-table-column>
          <el-table-column label="计划金额（元）">
            <template slot-scope="scope">
              <span>{{ priceFormat(scope.row.planPrice) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="医保标识">
            <template slot-scope="scope">
              <span>{{ scope.row.bakProvinceInsuranceFlagName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="可采购">
            <template slot-scope="scope">
              <span>{{ scope.row.recordId }}</span>
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
  import {itemAllList} from 'src/axios/trade/purchase/purchase'
  import {priceFormat} from "src/utils";

  export default {
    name:'based-city-snder-list',
    data () {
      return {
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
          value: '全部药库',
          label: '全部药库'
        },{
          value: '中药库',
          label: '中药库'
        },{
          value: '西药库',
          label: '西药库'
        }],
        value: ''
      }
    },
    created () {
      this.list()
    },
    methods: {
      priceFormat,
      // -------------------------------------------- 数据初始化  -----------------------------------------
      metaData () {
        return {
          resData: { // 前后台交互数据封装格式
            pageNum: 1,
            pageSize: 20,
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
        }
      },
      metaQuery () { // 表单查询数据初始化
        return {
          query: {
            id: undefined,
            orgAllName: undefined,
            searchAllproductName: undefined,
            searchAllproductName:undefined,
            senderOrgName:undefined,
            searchBenDate:undefined,
            searchEndDate:undefined
          }
        }
      },
      // ------------------------------------------------- 处理方法 ----------------------------------------
      //  获取用户分页列表
      list () {
        itemAllList(this.resData, this.query).then(res => {
          this.resData = res.data
          if(this.resData.pageNum === 0){
            this.resData.pageNum = 1
          }
        })
      },
      // ************************ 分页操作 ************************
      handleSizeChange (val) {
        this.resData.pageSize = val
        this.list()
      },
      handleCurrentChange (val) {
        this.resData.pageNum = val
        this.list()
      }
    }
  }
</script>

