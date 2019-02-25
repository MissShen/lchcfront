<template>
  <el-dialog
    title="选择机构"
    top="4vh"
    width="60%"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <!-- 表格 -->
    <div class="table-form">
      <el-form ref="queryData" :model="queryData" label-position="right">
        <div class="formrow">
            <span>
              <el-input v-model="queryData.searchName" placeholder="企业名称" size="small"></el-input>
            </span>
          <span>
              <el-input v-model="queryData.searchCode" placeholder="企业编码" size="small"></el-input>
            </span>
          <span>
              <el-button type="success" @click="handleQuery" size="small">查询</el-button>
              <el-button type="warning" @click="restQuery" size="small">重置</el-button>
            </span>
        </div>
      </el-form>
    </div>
    <!-- 表格列表 -->
    <div class="tableset">
      <el-table
        :data="resData.list"
        border
        stripe>
        <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
        <el-table-column label="企业编码" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.CODE }}</span>
          </template>
        </el-table-column>
        <el-table-column label="企业名称" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.NAME }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <a class="operation-btn" @click="chooseOrg(scope.row.ID,scope.row.ORG_TYPE,scope.row.NAME)">选择</a>
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
    <span slot="footer">
      <el-button @click="visible = false" type="danger" size="small">关闭</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import {catOrgList} from "../../../../axios/common/common";

  export default {
    name: "catOrg",
    data() {
      return {
        visible: false,
        resData: this.metaData(),  // 展示数据初始化
        queryData: this.metaQuery(),// 查询数据初始化
      }
    },
    methods: {
      metaData() { // 前后台交互数据封装格式
        return {
          pageNum: 2,
          pageSize: 8,
          total: 0,
          pages: 0,
          list: []
        }
      },
      metaQuery() { // 表单查询数据初始化
        return {
          searchCode: undefined,
          searchName: undefined,
        }
      },
      metaList() {
        this.visible = true;
        catOrgList(this.resData, this.queryData).then(res => {
          if (res.code == 200) {
            this.resData = res.data;
            0 === this.resData.pageNum ? this.resData.pageNum = 1 : null;
          }
        })
      },
      chooseOrg(id, orgType, orgName) {
        this.visible = false;
        this.$emit('chooseOrg', id, orgType, orgName);
      },
      // --------------------------------------------------------------
      handleSizeChange(val) {
        this.resData.pageSize = val;
        this.metaList()
      },
      handleCurrentChange(val) {
        this.resData.pageNum = val;
        this.metaList()
      },
      // ---------------------------------------------------------------------
      handleQuery() {
        this.metaList();
      },
      restQuery() {
        this.queryData = this.metaQuery();
      },
    }
  }
</script>

<style scoped>

</style>
