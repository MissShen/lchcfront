<template>
  <div class="infobox">
    <div class="s-form">
      <el-form :inline="true" :model="queryData" ref="queryData">
        <el-input v-model="queryData.orgName" placeholder="企业名称"></el-input>
        <el-button @click="handleQuery()">查询</el-button>
        <el-button type="warning" @click="queryData =metaQuery()" size="small">重置</el-button>
      </el-form>
    </div>
    <div class="tableset">
        <el-table :data="resData.list" stripe border tooltip-effect="dark">
          <el-table-column prop="oldOrgName" label="原企业名称" show-overflow-tooltip></el-table-column>
          <el-table-column prop="newOrgName" label="现企业名称" show-overflow-tooltip></el-table-column>
          <el-table-column prop="executeDate" label="执行时间" width="130"></el-table-column>
          <el-table-column prop="orgChangeCause" label="变更原因" show-overflow-tooltip></el-table-column>
          <el-table-column prop="orgCreateDate" label="创建时间" width="130"></el-table-column>
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
  import {queryOrgChange} from 'src/axios/supervise/notice/notice'

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
        queryOrgChange(this.resData, this.queryData).then(response => {
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
