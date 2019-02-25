<template>
  <div>
    <!-- ========================== 主内容start ========================= -->
    <div class="tabs-panel">
      <span class="active">企业评分</span>
    </div>

    <!-- 表格 -->
    <div class="tablebox">
      <!-- 表格查询表单 -->
      <div class="table-form">
        <el-form ref="query" :model="query" size="small" :inline="true" class="demo-form-inline">
          <el-form-item>
            <el-input v-model="query.name" placeholder="企业编码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="query.name" placeholder="企业名称"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="query.name" placeholder="企业简称"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="query.name" placeholder="评分与否"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="warning">查询</el-button>
            <el-button>重置</el-button>
          </el-form-item>
        </el-form>
      </div>

      <!-- 表格列表 -->
      <div class="tableset">
        <el-table
          :data="resData.list"
          border
          stripe>
          <el-table-column label="序号" type="index" width="50"></el-table-column>
          <el-table-column label="企业编码">
            <template slot-scope="scope">
              <span>{{ scope.row.no1 }}</span>
            </template>
          </el-table-column>
          <el-table-column label="企业名称">
            <template slot-scope="scope">
              <span>{{ scope.row.productName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="企业简称">
            <template slot-scope="scope">
              <span>{{ scope.row.productName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="主观分">
            <template slot-scope="scope">
              <span>{{ scope.row.productName }}</span>
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
    <!-- ========================== 主内容end ========================= -->
  </div>

</template>
<script>

  // 引入用户相关请求  引自js文件
  import {selectScoreOrgList} from 'src/axios/select/scoremanagement/scoreOrg'

  export default {
    data () {
      return {
        activeName: 'first',  // 当前标签
        resData: this.metaData(),
        query: this.metaQuery(), // 查询初始化
        showForm: false, // 表单可见性初始化
        showQuery: false, // 表单查询初始化
        defaultProps: {
          children: 'children',
          label: 'name',
          id: 'id'
        }
      }
    },
    created () {
      this.list()
    },
    methods: {
      // -------------------------------------------- 数据初始化  -----------------------------------------
      metaData () {
        return {
          resData: { // 前后台交互数据封装格式
            pageNum: 1,
            pageSize: 20,
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
        }
      },
      metaQuery () { // 表单查询数据初始化
        return {
          query: {
            id: undefined,
            searchUserName: undefined
          }
        }
      },
      // ------------------------------------------------- 处理方法 ----------------------------------------
      //  获取用户分页列表
      list () {
        selectScoreOrgList(this.resData, this.query).then(res => {
          console.log(res);
          this.resData = res.data
        })
      },
      // ************************ 分页操作 ************************
      handleSizeChange (val) {
        this.resData.pageSize = val
        this.list()
      },
      handleCurrentChange (val) {
        this.resData.pageNum = val
        this.list()
      }
    }
  }
</script>

