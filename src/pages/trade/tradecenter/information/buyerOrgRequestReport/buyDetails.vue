<template>
  <!-- ========================== 机构采购分析 ========================= -->
  <!-- 表格 -->
  <div class="tablebox">
    <!-- 表格查询表单 -->
    <el-form ref="query" :model="query" label-position="right" size="small" :inline="true" class="table-form">
      <el-form-item>
        <el-input v-model="query.medicalName" @keyup.enter.native="searchEnterFun" size="small"
                  placeholder="品名"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="query.buyerOrg" @keyup.enter.native="searchEnterFun" size="small"
                  placeholder="医疗机构"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="success" @click="list" size="small">查询</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格列表 -->
    <div class="tableset">
      <el-table
        :data="resData.list"
        @sort-change="sortChang"
        border
        stripe>
        <!--<el-table-column type="index" header-align="left" align="center" width="50" label="序号"></el-table-column>-->
        <el-table-column label="产品名称" prop="DRUGNAME" sortable="custom" show-overflow-tooltip>
          <template slot-scope="scope">
            {{ scope.row.drugName }}
          </template>
        </el-table-column>
        <el-table-column label="医院名称" prop="buyerName" sortable="custom" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.buyerName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="采购金额（元）" align="right" prop="tmp.buyer_money" sortable="custom">
          <template slot-scope="scope">
            {{ priceFormat(scope.row.buyerMoney) }}
          </template>
        </el-table-column>
        <el-table-column label="验收金额（元）" align="right" prop="tmp.receive_money" sortable="custom">
          <template slot-scope="scope">
            {{ priceFormat(scope.row.receiveMoney) }}
          </template>
        </el-table-column>
        <el-table-column label="退货金额（元）" align="right" prop="tmp.return_money" sortable="custom">
          <template slot-scope="scope">
            <span>{{ priceFormat(scope.row.returnMoney) }}</span>
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
    <form-view v-if="formViewVisible" :parent-id="id" ref="buyDetails" @refreshData="metaList"></form-view>
  </div>
  <!-- ========================== 主内容end ========================= -->

</template>
<script>
  // 引入用户相关请求
  import {showOrgInfoList} from 'src/axios/trade/information/report'
  import {priceFormat} from "src/utils";

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
        formViewVisible: false,
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
      priceFormat,
      goBack() {
        this.$router.go(-1);
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
          productId: this.$route.params.productId,
          buyerOrg: '',
          medicalName: '',
          beginDate: '',
          endDate: ''
        }
      },
      // ------------------------------------------------- 处理方法 ----------------------------------------
      //  获取用户分页列表
      list() {
        this.resData.orderBy = this.currentOrder;
        showOrgInfoList(this.resData, this.query).then(res => {
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
        this.reportList()
      },
      handleFromView(id) {
        this.formViewVisible = true;
        this.$nextTick(() => {
          // 通过组件中设置的ref属性调取formView.vue中的fillData()方法加载弹窗内容
          this.$refs.buyDetails.fillData(id);
        })
      },
      fillData(id) {
        this.dataForm.id = id || undefined
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
        })
        if (this.dataForm.id) {
          menuView(this.dataForm.id).then(res => {
            this.dataForm = res.data
          })
        }
      },
      handleCurrentChange(val) {
        this.resData.pageNum = val
        this.reportList()
      }
    }
  }
</script>

