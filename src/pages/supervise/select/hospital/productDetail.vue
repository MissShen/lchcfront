<template>
  <el-dialog
    title="本院用药目录"
    :visible.sync="visible"
    width="1200px">
    <div class="tableset service-table">
      <el-table :data="resData.list" stripe>
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column prop="fullName" label="产品名称" width="120" show-overflow-tooltip></el-table-column>
        <el-table-column prop="tradeName" label="商用名"></el-table-column>
        <el-table-column prop="doseage" label="剂型"></el-table-column>
        <el-table-column prop="spec" label="规格" width="120" show-overflow-tooltip></el-table-column>
        <el-table-column prop="standRate" label="转换比"></el-table-column>
        <el-table-column prop="specUnit" label="单位"></el-table-column>
        <el-table-column prop="wrapName" label="包材" width="120" show-overflow-tooltip></el-table-column>
        <el-table-column prop="manufactureName" label="生产企业" width="120" show-overflow-tooltip></el-table-column>
        <el-table-column prop="catalogArea" label="所属目录" width="120" show-overflow-tooltip></el-table-column>
        <el-table-column prop="basicFlag" label="基药标记" :formatter="basicFlagFormat"></el-table-column>
      </el-table>
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
  </el-dialog>
</template>

<script>

  import {findSelectProductInfo} from 'src/axios/supervise/select/select'

  export default {
    name: "product-detail",
    data() {
      return {
        visible: false,
        resData: this.metaData(),
        queryData:{},
        activeName2: 'first',
      }
    },
    methods: {
      metaData() {
        return {
          pageNum: 1,
          pageSize: 10,
          total: 0,
          pages: 0,
          list: []
        }
      },
      handleSizeChange(val) {
        this.resData.pageSize = val;
        this.metaList()
      },
      handleCurrentChange(val) {
        this.resData.pageNum = val;
        this.metaList()
      },
      metaList() {
        findSelectProductInfo(this.resData, this.queryData).then(res => {
          this.resData = res.data;
        });
      },
      fillData(id) {
        this.visible = true;
        this.metaList()
      },
      basicFlagFormat(row, column, cellValue) {
        let desc;
        if (cellValue === '0') {
          desc = '国家基药'
        } else if (cellValue === '1') {
          desc = '北京增补'
        }
        return desc
      },
    }
  }
</script>

<style scoped>

</style>
