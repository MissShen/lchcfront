<template>
  <dl class="mainbox">
    <dd>
      <div class="s-form">
        <el-form :inline="true" :model="queryData" ref="queryData">
          <el-select placeholder="申报名称" class="width-150">
            <el-option v-for="item in operateOption" :key="item.code" :label="item.name" :value="item.code"></el-option>
          </el-select>
          <el-input v-model="queryData.orgName" placeholder="通用名"></el-input>
          <el-input v-model="queryData.productName" placeholder="产品名"></el-input>
          <el-input v-model="queryData.productionOrg" placeholder="商品名"></el-input>
          <el-input v-model="queryData.productionOrg" placeholder="生产企业"></el-input>
          <el-button @click="initTableData()" size="small">查询</el-button>
          <el-button @click="queryData =metaQuery()" size="small">重置</el-button>
          <el-button size="small">导出</el-button>
        </el-form>
      </div>
      <div class="tableset">
        <el-table :data="resData.list" stripe border tooltip-effect="dark">
          <el-table-column prop="hosProductName" label="中西药" show-overflow-tooltip>
            <template slot-scope="scope">
              <div class="ellipsis es300 ">中成药</div>
            </template>
          </el-table-column>
          <el-table-column prop="hosProductName" label="通用名" show-overflow-tooltip></el-table-column>
          <el-table-column prop="hosProductName" label="产品名称" show-overflow-tooltip></el-table-column>
          <el-table-column prop="hosShopName" label="商品名" width="100"></el-table-column>
          <el-table-column prop="hosDosageForm" label="剂型" width="100" show-overflow-tooltip></el-table-column>
          <!--<el-table-column prop="hosSpec" label="规格" width="100" show-overflow-tooltip></el-table-column>-->
          <!--<el-table-column prop="hosConversionRatio" label="转换比" width="80" align="right"></el-table-column>-->
          <!--<el-table-column prop="hosUnit" label="单位" width="100" show-overflow-tooltip></el-table-column>-->
          <!--<el-table-column prop="hosPackingMaterial" label="包材" width="100" show-overflow-tooltip></el-table-column>-->
          <!--<el-table-column prop="hosCreateOrg" label="生产企业" show-overflow-tooltip></el-table-column>-->
          <el-table-column prop="drugStorage" label="产品信息" show-overflow-tooltip>
            <template slot-scope="scope">
              <div class="ellipsis es300 ">
                {{ scope.row.hosSpec}} × {{ scope.row.hosConversionRatio}} {{scope.row.hosUnit}} / {{ scope.row.hosUnit}}
                &nbsp;&nbsp; 中大包装: {{ scope.row.hosPackingMaterial}}/{{scope.row.hosPackingMaterial}}
              </div>
              <div :title="scope.row.hosCreateOrg" class="ellipsis es200"
                   v-if="scope.row.hosCreateOrg!=''">{{ scope.row.hosCreateOrg}}
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="hosPrice" label="单价" width="80" align="right"></el-table-column>
          <el-table-column prop="hosCreateOrg" label="卖方机构名称" width="150" align="center" show-overflow-tooltip></el-table-column>
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
    name: "main-monitor-drug",
    data() {
      return {
        operateOption: [
          {name: '全部', code: '>'},
          {name: '重点监控药品申报', code: '<'},
        ],
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
    }
  }
</script>

<style scoped>

</style>
