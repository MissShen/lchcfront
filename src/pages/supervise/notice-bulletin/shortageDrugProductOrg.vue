<template>
  <el-dialog
    title="医院详情"
    :visible.sync="dialogTableVisible"
    width="80%"
    @close="handleClose">
    <div class="tableset">
      <template>
        <el-table :data="resDescData.list" stripe border tooltip-effect="dark">
          <el-table-column property="orgName" label="医院名称" show-overflow-tooltip></el-table-column>
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
</template>

<script>
  export default {
    name: "shortage-drug-product-org",
    data() {
      return {
        dialogTableVisible: false,
        resDescData: this.metaDescData(),
      }
    },
    methods: {
      fillData(id) {
        this.dialogTableVisible = true;
        this.resDescData = this.metaDescData();
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
            },
            {
              orgName: "首都医科大学附属北京天坛医院",
            },
            {
              orgName: "首都医科大学附属北京天坛医院",
            },
            {
              orgName: "首都医科大学附属北京天坛医院",
            },
            {
              orgName: "首都医科大学附属北京天坛医院",
            },
          ]
        }
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
      }
    }
  }
</script>

<style scoped>

</style>
