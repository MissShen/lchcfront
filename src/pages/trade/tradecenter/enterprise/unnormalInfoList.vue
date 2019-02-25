<template>
  <!-- ========================== 医院黄页 ========================= -->
  <!-- 表格 -->
  <div class="tablebox">
    <!-- 表格查询表单 -->
    <el-form ref="query" :model="query" label-position="right" size="small" :inline="true" class="table-form">
      <el-form-item>
        <el-input v-model="query.searchBuyerName" @keyup.enter.native="searchEnterFun" placeholder="医院名称"
                  size="small"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="success" size="small" @click="searchEnterFun">查询</el-button>
        <el-button type="warning" size="small" @click="reset()">重置</el-button>
      </el-form-item>
    </el-form>

    <!-- 表格列表 -->
    <div class="tableset">
      <el-table
        :data="resData.list"
        border
        stripe>
        <!--<el-table-column type="index" width="50" header-align="left" align="center" label="序号"></el-table-column>-->
        <el-table-column label="医疗机构">
          <template slot-scope="scope">
            {{ scope.row.bakBuyerName }}
          </template>
        </el-table-column>
        <el-table-column label="异常数量" align="right" width="250">
          <template slot-scope="scope">
            {{scope.row.orderItemNum}}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="250px">
          <template slot-scope="scope">
            <div class="operates">
              <a class="green" @click="showInfo(scope.row.buyerOrgid)">详情</a>
            </div>
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

</template>
<script>

  // 引入用户相关请求
  import {queryUnnormalInfoList} from 'src/axios/trade/enterprise/enterprise'
  import {keyBoardEnter} from "src/utils";

  export default {
    data() {
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
    created() {
      this.list()
    },
    methods: {
      // -------------------------------------------- 数据初始化  -----------------------------------------
      showInfo(buyerOrgid) {
        this.$router.push("/trade/information/queryOrderUnnormalInfoList/" + buyerOrgid );
      },
      reset() {
        this.query = this.metaQuery();
        this.list();
      },
      metaData() {
        return {
          // 前后台交互数据封装格式
          pageNum: 1,
          pageSize: 10,
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
      metaQuery() { // 表单查询数据初始化
        return {
          searchBuyerName: ''
        }
      },
      // ------------------------------------------------- 处理方法 ----------------------------------------
      //  获取用户分页列表
      list() {
        queryUnnormalInfoList(this.resData, this.query).then(res => {
          this.resData = res.data
          if (this.resData.pageNum === 0) {
            this.resData.pageNum = 1
          }
        })
      },
      searchEnterFun(e) {
        this.$store.state.pageSeach.pageNum = 1;
        this.resData.pageNum = 1;
        keyBoardEnter(e, () => {
          this.list();
        })
      },
      // ************************ 分页操作 ************************
      handleSizeChange(val) {
        this.resData.pageSize = val
        this.list()
      },
      handleCurrentChange(val) {
        this.resData.pageNum = val
        this.list()
      },
    }
  }
</script>

/
