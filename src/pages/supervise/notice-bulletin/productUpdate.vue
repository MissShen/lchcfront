<template>
  <div class="infobox">
    <div class="s-form" >
      <el-form :inline="true" :model="queryData" ref="queryData">
        <el-input v-model="queryData.productName" placeholder="产品名称"></el-input>
        <el-input v-model="queryData.productionOrg" placeholder="生产企业"></el-input>
        <el-button @click="handleQuery()">查询</el-button>
        <el-button type="warning" @click="queryData =metaQuery()" size="small">重置</el-button>
      </el-form>
    </div>
    <div class="tableset">
        <el-table :data="resData.list" stripe border tooltip-effect="dark">
          <el-table-column prop="productName" label="产品名称" show-overflow-tooltip></el-table-column>
          <el-table-column prop="shopName" label="商品名" width="100" show-overflow-tooltip></el-table-column>
          <el-table-column prop="dosageForm" label="剂型" width="120" show-overflow-tooltip></el-table-column>
          <el-table-column prop="spec" label="规格" width="120" show-overflow-tooltip></el-table-column>
          <el-table-column prop="conversionRatio" label="转换比" align="right" header-align="left" width="70"></el-table-column>
          <el-table-column prop="company" label="单位" width="70"></el-table-column>
          <el-table-column prop="packingMaterial" label="包材" width="100" show-overflow-tooltip></el-table-column>
          <el-table-column prop="productionOrg" label="生产企业" show-overflow-tooltip></el-table-column>
          <el-table-column prop="proChangeCause" label="变更原因" show-overflow-tooltip></el-table-column>
          <el-table-column prop="proCreateDate" label="创建时间" width="130"></el-table-column>
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
  import {queryProductChange} from 'src/axios/supervise/notice/notice'

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
          productName: '',
          productionOrg:''
        }
      },
      selectHospital(val) {
        this.queryDescData.id = val;
        this.dialogTableVisible = true;
        getHosplist(this.resDescData, this.queryDescData).then(response => {
          this.resDescData = response.data;
          0 === this.resDescData.pageNum ? this.resDescData.pageNum = 1 : null;
        });
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
        queryProductChange(this.resData, this.queryData).then(response => {
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
