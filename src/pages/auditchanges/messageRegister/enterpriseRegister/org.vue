<template>
  <el-dialog top="2vh" title="分装企业" :visible.sync="visible" :close-on-click-modal="false">
    <div class="tablebox" style="width: 100%">
      <!-- 表格查询表单 -->
        <el-form ref="query" label-position="right" size="small" :inline="true" class="table-form">
            <el-form-item>
              <el-input v-model="name" placeholder="企业名称或编码" @keyup.enter.native="list" size="small"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="success" @click="list" size="small">查询</el-button>
            </el-form-item>
        </el-form>

      <div class="tableset">
        <el-table
          :data="resData.list"
          border
          stripe
          @selection-change="handleSelectionChange">
          <el-table-column label="企业名称" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{scope.row.NAME}}</span>
            </template>
          </el-table-column>
          <el-table-column label="企业编码" show-overflow-tooltip>
            <template slot-scope="scope">
              {{scope.row.CODE}}
            </template>
          </el-table-column>
          <el-table-column label="操作" show-overflow-tooltip>
            <template slot-scope="scope">
              <a href="javascript:;" @click="choose(scope.row)">选择</a>
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
    </div>
  </el-dialog>
</template>

<script>
  import { findPacking } from "src/axios/auditchanges/messageRegister/enterpriseRegister"

  export default {
    data() {
      return {
        visible: false,
        name: undefined,
        resData: this.metaData(),
      }
    },
    methods: {
      init() {
        this.visible = true;
        this.list();
      },
      async list() {
        let res = await findPacking(this.name, this.resData);
        console.log(res);
        if(res.success) {
          this.resData = res.data;
          if(this.resData.pageNum == 0) {
            this.resData.pageNum = 1;
          }
        }
      },
      choose(row) {
        this.$emit("choose", row);
        this.visible = false;
      },
      metaData () {
        return {
          pageNum: 1,
          pageSize: 10,
          size: undefined,
          startRow: undefined,
          endRow: undefined,
          total: undefined,
          pages: undefined,
          prePage: undefined,
          nextPage: undefined,
          isFirstPage: true,
          isLastPage: undefined,
          hasPreviousPage: undefined,
          hasNextPage: undefined,
          navigatePages: undefined,
          navigatepageNums: undefined,
          navigateFirstPage: undefined,
          navigateLastPage: undefined,
          firstPage: undefined,
          lastPage: undefined,
          list: undefined
        }
      },
      // ************************
      handleSizeChange(val) {
        this.resData.pageSize = val
        this.list()
      },
      handleSelectionChange(val){
        //val 所选对象
      },
      handleCurrentChange(val) {
        this.resData.pageNum = val;
        this.list();
      },
    }
  }
</script>
