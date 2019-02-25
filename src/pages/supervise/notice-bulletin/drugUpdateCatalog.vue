<template>
  <dl class="mainbox">
    <dd>
      <div class="s-form">
          <el-form :inline="true" :model="queryData" ref="queryData">
            <el-input v-model="queryData.orgName" placeholder="医院名称"></el-input>
            <el-input v-model="queryData.productName" placeholder="产品名称"></el-input>
            <el-input v-model="queryData.productionOrg" placeholder="生产企业"></el-input>
            <span class="date-group">
              <el-date-picker
                class="hospital"
                size="small"
                type="month"
                format="yyyy-MM"
                value-format="yyyy-MM"
                placeholder="开始日期"
                :editable="false"
                v-model="queryData.startDate">
              </el-date-picker>
            </span>
            <span class="date-group">
                <el-date-picker
                  size="small"
                  type="month"
                  format="yyyy-MM"
                  value-format="yyyy-MM"
                  placeholder="结束日期"
                  :editable="false"
                  v-model="queryData.endDate">
                </el-date-picker>
            </span>
            <el-button @click="initTableData()" size="small">查询</el-button>
            <el-button @click="queryData =metaQuery()" size="small">重置</el-button>
          </el-form>
        </div>
      <div class="tableset">
        <el-table :data="resData.list" stripe border tooltip-effect="dark">
          <el-table-column prop="hosName" label="医院名称" show-overflow-tooltip></el-table-column>
          <el-table-column prop="hosProductName" label="产品名称" show-overflow-tooltip></el-table-column>
          <el-table-column prop="hosShopName" label="商品名" width="100"></el-table-column>
          <el-table-column prop="hosDosageForm" label="剂型" width="100" show-overflow-tooltip></el-table-column>
          <el-table-column prop="hosSpec" label="规格" width="100" show-overflow-tooltip></el-table-column>
          <el-table-column prop="hosConversionRatio" label="转换比" width="80" align="right"></el-table-column>
          <el-table-column prop="hosUnit" label="单位" width="100" show-overflow-tooltip></el-table-column>
          <el-table-column prop="hosPackingMaterial" label="包材" width="100" show-overflow-tooltip ></el-table-column>
          <el-table-column prop="hosCreateOrg" label="生产企业" show-overflow-tooltip></el-table-column>
          <el-table-column prop="hosPrice" label="单价" width="80" align="right"></el-table-column>
          <el-table-column prop="hosBaseFlag" label="基药标记" width="80" align="center"></el-table-column>
          <el-table-column prop="hosStatus" label="调整状态" width="80"></el-table-column>
          <el-table-column prop="hosDate" label="调整时间" width="80" align="center"></el-table-column>
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
  import {queryCataLog} from 'src/axios/supervise/notice/notice'

  export default {
    name: 'manufacturingEnterprise',
    data() {
      return {

        dialogTableVisible: false,
        resData: this.metaData(),
        queryData: this.metaQuery(), // 查询初始化
      }
    },
    mounted() {
        this.initTableData();
    },
    methods: {
      metaQuery() { // 查询数据封装格式
        return {
          orgName:undefined,
          productName:undefined,
          productionOrg:undefined,
          startDate:undefined,
          endDate:undefined
        }
      },
      metaData(){
        return {
          pageNum: 1,
          pageSize: 20,
          total: 10,
          pages: 1,
          list: []
        }
      },
      initTableData() {
        queryCataLog(this.resData, this.queryData).then(response => {
          console.info("response ", response);
          this.resData = response.data;
          0 === this.resData.pageNum ? this.resData.pageNum = 1 : null;
        })
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
