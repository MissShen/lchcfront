<template>
  <div>
    <!-- ========================== 主内容start ========================= -->
    <div class="tabs-panel">
      <span class="active">用户管理</span>
    </div>
    <!-- 表格 -->
    <div class="tablebox">
      <!-- 表格查询表单 -->
      <div class="table-form">
        <el-form ref="query" :model="query" label-position="right" size="small">
          <div class="formrow">
            <span>
              <el-date-picker type="date" placeholder="创建开始日期" v-model="query.beginDate" size="small"></el-date-picker>
              &nbsp;到&nbsp;
              <el-date-picker type="date" placeholder="创建结束日期" v-model="query.endDate" size="small"></el-date-picker>
            </span>
            <span>
              <el-input v-model="query.name" placeholder="用户名称" size="small"></el-input>
            </span>
            <span>
              <el-button type="warning" size="small">查询</el-button>
              <el-button type="primary" size="small">重置</el-button>
            </span>
            <span style="text-align: right">
              <el-button icon="iconfont icon-cartplus" size="small">
                临采购物车
                <span class="badges">1</span>
              </el-button>
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
          <el-table-column type="index" width="50"></el-table-column>
          <el-table-column label="登录账号">
            <template slot-scope="scope">
              <a href="javascript:;" @click="handleGoEdit(scope.row.userName)">{{ scope.row.userCode }}</a>
            </template>
          </el-table-column>
          <el-table-column label="用户名称">
            <template slot-scope="scope">
              <span>{{ scope.row.userName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="账号类型" width="180">
            <template slot-scope="scope">
              <span>{{ scope.row.orgName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="角色" width="180">
            <template slot-scope="scope">
              <span>{{ scope.row.modifyName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="机构性质" width="180">
            <template slot-scope="scope">
              <span>{{ scope.row.enableFlag }}</span>
            </template>
          </el-table-column>
          <el-table-column label="创建日期" width="180">
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
    <!-- ========================== 主内容end ========================= -->
  </div>

</template>
<script>

  // 引入用户相关请求
  import {userList} from 'src/axios/management/authority/sysUser'

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
        return {// 前后台交互数据封装格式
          pageNum: 1,
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
      metaQuery () { // 表单查询数据初始化
        return {
          query: {
            id: undefined,
            code: undefined,
            name: undefined,
            beginDate: undefined,
            endDate: undefined
          }
        }
      },
      // ------------------------------------------------- 处理方法 ----------------------------------------
      //  获取用户分页列表
      list () {
        userList(this.resData, this.query).then(res => {
          this.resData = res.data
          if(this.resData.pageNum === 0){
            this.resData.pageNum = 1;
          }
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

