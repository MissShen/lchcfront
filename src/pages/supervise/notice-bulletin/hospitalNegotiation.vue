<template>
  <dl class="mainbox">
    <dd>
      <div class="s-form" >
        <el-form :inline="true" :model="queryData" ref="queryData">
          <el-input v-model="queryData.orgName" placeholder="医院名称"></el-input>
          <el-input v-model="queryData.productName" placeholder="产品名称"></el-input>
          <el-input v-model="queryData.productionOrg" placeholder="生产企业"></el-input>
         <!-- <el-select v-model="queryData.productId" placeholder="全部" size="small">
            <el-option
              v-for="item in this.productDate"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>-->
          <el-button @click="handleQuery()">查询</el-button>
          <el-button type="warning" @click="queryData =metaQuery()" size="small">重置</el-button>
        </el-form>
      </div>
      <div class="tableset">
        <el-table :data="resData.list" stripe border tooltip-effect="dark">
          <!--<el-table-column prop="projectName" label="项目"></el-table-column>-->
          <el-table-column prop="hospatilName" label="医院名称" show-overflow-tooltip></el-table-column>
          <el-table-column prop="talksProductName" label="产品名称" show-overflow-tooltip></el-table-column>
          <el-table-column prop="talksShopName" label="商品名" width="120" show-overflow-tooltip></el-table-column>
          <el-table-column prop="talksDosageForm" label="剂型" width="100" show-overflow-tooltip></el-table-column>
          <el-table-column prop="talksSpec" label="规格" width="100" show-overflow-tooltip></el-table-column>
          <el-table-column prop="talksConversionRatio" label="转换比" width="70" align="right"></el-table-column>
          <el-table-column prop="talksUnit" label="单位" width="100" show-overflow-tooltip></el-table-column>
          <el-table-column prop="talksPackingMaterial" label="包材" width="100" show-overflow-tooltip></el-table-column>
          <el-table-column prop="talksCreateOrg" label="生产企业" show-overflow-tooltip></el-table-column>
          <el-table-column prop="talksPrice" label="议价价格" width="100" align="right"></el-table-column>
          <el-table-column prop="talksDate" label="议价时间" width="80" align="center"></el-table-column>
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
    </dd>
  </dl>
</template>
<script>
  import {queryTalks,queryProject} from 'src/axios/supervise/notice/notice'

  export default {
    name: 'manufacturingEnterprise',
    data() {
      return {
        dialogTableVisible: false,
        resData: this.metaData(),
        productDate:this.productDates(),
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
          orgName:'',
          productId:'',
          productName: '',
          productionOrg:''
        }
      },
      productDates(){
        return {
          list: []
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
       /* queryProject(this.resData, this.queryData).then(response => {
          this.productDate = response.data.list;
        })*/
        queryTalks(this.resData, this.queryData).then(response => {
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
