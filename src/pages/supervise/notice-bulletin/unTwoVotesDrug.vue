<template>
  <dl class="mainbox">
    <dd>
      <div class="s-form">
        <el-form :inline="true" :model="queryData" ref="queryData">
          <el-input v-model="queryData.productName" placeholder="产品名称"></el-input>
          <el-input v-model="queryData.productionOrg" placeholder="机型名称"></el-input>
          <el-input v-model="queryData.productionOrg" placeholder="生产企业"></el-input>
          <el-button @click="initTableData()" size="small">查询</el-button>
          <el-button @click="queryData =metaQuery()" size="small">重置</el-button>
          <el-button size="small">导出</el-button>
        </el-form>
      </div>
      <div class="tableset">
        <el-table :data="resData.list" stripe border tooltip-effect="dark">
          <el-table-column prop="hosProductName" label="通用名" show-overflow-tooltip></el-table-column>
          <el-table-column prop="hosProductName" label="产品名称" show-overflow-tooltip></el-table-column>
          <el-table-column prop="hosShopName" label="商品名" width="100"></el-table-column>
          <el-table-column prop="hosDosageForm" label="剂型" width="100" show-overflow-tooltip></el-table-column>
          <el-table-column prop="drugStorage" label="产品信息" show-overflow-tooltip>
            <template slot-scope="scope">
              <div class="ellipsis es300 ">
                {{ scope.row.hosSpec}} × {{ scope.row.hosConversionRatio}} {{scope.row.hosUnit}} / {{
                scope.row.hosUnit}}
                &nbsp;&nbsp; 中大包装: {{ scope.row.hosPackingMaterial}}/{{scope.row.hosPackingMaterial}}
              </div>
              <div :title="scope.row.hosCreateOrg" class="ellipsis es200"
                   v-if="scope.row.hosCreateOrg!=''">{{ scope.row.hosCreateOrg}}
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="hosCreateOrg" label="上报机构数" width="150" align="center"
                           show-overflow-tooltip></el-table-column>
          <el-table-column label="操作" width="120">
            <template slot-scope="scope">
              <div class="operates">
                <a href="javascript:" @click="selectOrg(scope.row.hospitalId)">查看机构</a>
              </div>
            </template>
          </el-table-column>
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
    <el-dialog title="医院详情" :visible.sync="dialogTableVisible" width="80%" @close="handleClose">
      <div class="tableset">
        <template>
          <el-table :data="resDescData.list" stripe border tooltip-effect="dark">
            <el-table-column property="orgName" label="医院名称" show-overflow-tooltip></el-table-column>
            <el-table-column property="reason" label="非两票制原因" show-overflow-tooltip></el-table-column>
          </el-table>
          <div class="pagebox">
            <el-pagination
              layout="total, sizes, prev, pager, next, jumper"
              :page-sizes="[10, 20, 30]"
              @size-change="handleDescSizeChange"
              @current-change="handleDescCurrentChange"
              :total="resDescData.total"
              :page-size="resDescData.pageSize"
              :page-count="resDescData.pages"
              :current-page.sync="resDescData.pageNum">
            </el-pagination>
          </div>
        </template>
      </div>
    </el-dialog>
  </dl>
</template>

<script>
  import {queryCataLog} from 'src/axios/supervise/notice/notice'

  export default {
    name: "un-two-votes-drug",
    data() {
      return {
        dialogTableVisible: false,
        resData: this.metaData(),
        resDescData: this.metaDescData(),
        queryData: this.metaQuery(), // 查询初始化
      }
    },
    mounted() {
      this.initTableData();
    },
    methods: {
      metaQuery() { // 查询数据封装格式
        return {
          orgName: undefined,
          productName: undefined,
          productionOrg: undefined,
          startDate: undefined,
          endDate: undefined
        }
      },
      metaData() {
        return {
          pageNum: 1,
          pageSize: 20,
          total: 10,
          pages: 1,
          list: []
        }
      },
      metaDescData() { // 前后台交互数据封装格式
        return {
          pageNum: 1,
          pageSize: 20,
          total: 10,
          pages: 1,
          list: [
            {
              orgName: "首都医科大学附属北京天坛医院",
              reason: "低价",
            },
            {
              orgName: "首都医科大学附属北京天坛医院",
              reason: "低价",
            },
            {
              orgName: "首都医科大学附属北京天坛医院",
              reason: "低价",
            },
            {
              orgName: "首都医科大学附属北京天坛医院",
              reason: "低价",
            },
            {
              orgName: "首都医科大学附属北京天坛医院",
              reason: "低价",
            },
          ]
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
        this.selectProduct(this.queryDescData.id)
      },
      handleDescCurrentChange(val) {
        this.resDescData.pageNum = val;
        this.selectProduct(this.queryDescData.id)
      },
      handleClose() {
        this.dialogTableVisible = false;
        this.resDescData = {};
      },
      selectOrg(id) {
        this.dialogTableVisible = true;
      },
    }
  }
</script>

<style scoped>

</style>
