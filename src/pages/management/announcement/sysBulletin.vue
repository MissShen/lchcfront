<template>

  <!-- 表格 -->
  <div class="tablebox">
    <div class="tabs-panel">
      <span class="active">公告列表</span>
    </div>
    <!-- 表格查询表单 -->
    <el-form ref="queryData" :model="queryData" style="padding-top: 10px;" label-position="right" size="small">
      <el-row :gutter="24">
        <el-col :span="4">
          <el-form-item>
            <el-select v-model="queryData.queryType" placeholder="公告标题">
              <el-option label="公告标题" value="1"></el-option>
              <el-option label="公告类型" value="2"></el-option>
              <el-option label="关键字" value="3"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item>
            <el-input v-model="queryData.queryContent" placeholder="查询内容"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item>
              <span>
                <el-date-picker type="date" ormat="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="创建开始日期" v-model="queryData.beginDate"></el-date-picker>
              </span>
            <span>到</span>
            <span>
                <el-date-picker type="date" ormat="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="创建结束日期" v-model="queryData.endDate"></el-date-picker>
             </span>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item>
            <el-button type="warning" @click="handleQuery">查询</el-button>
            <el-button @click="restQuery">重置</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <!-- 表格列表 -->
    <div class="tableset">
      <el-table
        :data="resData.list"
        :default-sort="{prop: 'date', order: 'descending'}"
        @selection-change="handleSelectionChange"
        border
        stripe>
        <!--<el-table-column header-align="center" type="selection" width="50"></el-table-column>-->
        <el-table-column label="序号" header-align="center" type="index" width="50"></el-table-column>
        <el-table-column label="公告标题" header-align="center">
          <template slot-scope="scope" >
            <span ><a @click="handleView(scope.row.id)" style="cursor: pointer">{{ scope.row.noticeTitle }}</a></span>
          </template>
        </el-table-column>
        <el-table-column label="公示类型" header-align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.noticeTypeName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="创建日期" header-align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.createDate }}</span>
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
</template>

<script>
  import {noticeList} from "src/axios/management/subsidiary/notice";

  export default {
    name: "Bulletin",
    data() {
      return {
        resData: this.metaData(),
        queryData: this.metaQuery(), // 查询初始化
        deleteDataList: [],
      }
    },
    created() {
      this.metaList()
    },
    methods: {
      // -------------------------------------------- 数据初始化  -----------------------------------------
      metaData() { // 前后台交互数据封装格式
        return {
          pageNum: 0,
          pageSize: 20,
          size: 10,
          startRow: 0,
          endRow: 0,
          total: 0,
          pages: 0,
          prePage: 0,
          nextPage: 0,
          isFirstPage: false,
          isLastPage: true,
          hasPreviousPage: false,
          hasNextPage: false,
          navigatePages: 8,
          navigatepageNums: [],
          navigateFirstPage: 0,
          navigateLastPage: 0,
          firstPage: 0,
          lastPage: 0,
          list: []
        }
      },
      metaQuery() { // 查询数据封装格式
        return {
          queryType: undefined,
          queryContent: undefined,
          beginDate: undefined,
          endDate: undefined
        }
      },
      metaList() {
        noticeList(this.resData, this.queryData).then(res => {
          this.resData = res.data
        })
      },
      // -------------------------------------------- 数据初始化完毕  -----------------------------------------
      handleFromView(id) {
        this.$router.push("/subsidiary/noticeForm/" + id)
      },
      handleView(id){
        this.$router.push("/subsidiary/noticeView/" + id)
      },
      handleQuery() {
        this.metaList()
      },
      restQuery() {
        this.queryData = this.metaQuery()
      },
      // ************************
      handleSizeChange(val) {
        this.resData.pageSize = val
        this.metaList()
      },
      handleCurrentChange(val) {
        this.resData.pageNum = val
        this.metaList()
      },
      handleSelectionChange(val) {
        this.deleteDataList = val
      },
      handleTop(id) {
        noticeTop(id).then(res => {
          this.$message({
            message: res.data,
            type: 'success',
            duration: 1000,
            onClose: () => {
              this.metaList()
            }
          })
        })
      },
      handleQuery() {
        this.metaList()
      },
      restQuery() {
        this.queryData = this.metaQuery()
      },
    }
  }
</script>

<style scoped>

</style>
