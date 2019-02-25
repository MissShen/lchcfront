<template>
  <div class="infobox">
    <div class="s-form">
      <el-form :inline="true" :model="queryData" ref="queryData">
        <el-input v-model="queryData.productName" placeholder="产品名称"></el-input>
        <el-button @click="handleQuery()">查询</el-button>
        <el-button @click="queryData =metaQuery()" size="small">重置</el-button>
      </el-form>
    </div>
    <div class="tableset">
      <el-table :data="resData.list" stripe border tooltip-effect="dark">
        <el-table-column prop="productNamePri" label="产品名称" show-overflow-tooltip></el-table-column>
        <el-table-column prop="shopNamePri" label="商品名"></el-table-column>
        <el-table-column prop="dosageFormPri" label="剂型" width="100"></el-table-column>
        <el-table-column prop="specPri" label="规格" width="100" show-overflow-tooltip></el-table-column>
        <el-table-column prop="conversionRatioPri" label="转换比" align="right" width="80"></el-table-column>
        <el-table-column prop="companyPri" label="单位"></el-table-column>
        <el-table-column prop="packingMaterialPri" label="包材"  show-overflow-tooltip></el-table-column>
        <el-table-column prop="productionOrgPri" label="生产企业" show-overflow-tooltip></el-table-column>
        <el-table-column prop="oldPrice" label="原价格" width="100" align="right"></el-table-column>
        <el-table-column prop="newPrice" label="现价格" width="100" align="right"></el-table-column>
        <el-table-column prop="oldPriceFrom" label="原价格来源" width="90" show-overflow-tooltip></el-table-column>
        <el-table-column prop="newPriceFrom" label="现价格来源" width="90" show-overflow-tooltip></el-table-column>
        <el-table-column prop="createDatePri" label="创建时间" width="130"></el-table-column>
      </el-table>
    </div>
    <div class="pagebox">
      <el-pagination
        layout="total, sizes, prev, pager, next, jumper"
        :page-sizes="[10, 20, 30]"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :total="resData.total"
        :page-size="resData.pageSize"
        :page-count="resData.pages"
        :current-page.sync="resData.pageNum">
      </el-pagination>
    </div>
  </div>
</template>
<script>
  import {queryPriceChange} from 'src/axios/supervise/notice/notice'

  export default {
    name: 'manufacturingEnterprise',
    data() {
      return {
        dialogTableVisible: false,
        resData: this.metaData(),
        queryData: this.metaQuery(), // 查询初始化
        resDescData:this.metaDescData(),
        queryDescData:this.metaDescQuery(),
      }
    },
    mounted() {

    },
    created(){
      this.initTableData()
    },
    methods: {
      metaQuery() { // 查询数据封装格式
        return {
          orgName: '',
          productionOrg:'',
          productName:'',
          beginDate: undefined,
          endDate: undefined

        }
      },
      metaData() { // 前后台交互数据封装格式
        return {
          pageNum: 1,
          pageSize: 20,
          total: 10,
          pages: 1,
          list: []
        }
      },
      metaDescQuery(){
        return{
          id:'',
        }
      },
      metaDescData() { // 前后台交互数据封装格式
        return {
          pageNum: 1,
          pageSize: 20,
          total: 10,
          pages: 1,
          list: []
        }
      },
      initTableData() {
        queryPriceChange(this.resData, this.queryData).then(response => {
          console.info("response ", response);
          this.resData = response.data;
          0 === this.resData.pageNum ? this.resData.pageNum = 1 : null;
        })
      },
      handleQuery() {
        this.resData = this.metaData();
        this.initTableData();
      },
      handleSizeChange(val) {
        this.resData.pageSize = val;
        this.initTableData()
      },
      handleCurrentChange(val) {
        this.resData.pageNum = val;
        this.initTableData()
      },
      handleDescSizeChange(val) {
        this.resDescData.pageSize = val;
        this.selectHospital(this.queryDescData.id)
      },
      handleDescCurrentChange(val) {
        this.resDescData.pageNum = val;
        this.selectHospital(this.queryDescData.id)
      },
      handleClose(){
        this.dialogTableVisible = false;
        this.resDescData = {};
      }
    }
  }
</script>
