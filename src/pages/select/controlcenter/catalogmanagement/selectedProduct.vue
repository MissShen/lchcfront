<template>
  <div>
    <!-- ========================== 主内容start ========================= -->

    <!-- 表格 -->
    <div class="tablebox">
      <!-- 表格查询表单 -->
      <div class="table-form">
        <el-form ref="query" :model="query" size="small" :inline="true" class="demo-form-inline">
          <el-form-item>
            <el-button type="primary" size="small">确认完成</el-button>
            <el-button>删除</el-button>
            <el-button>下载模板</el-button>
            <el-button>导入</el-button>
          </el-form-item>
          <el-form-item>
            <el-input v-model="query.name" placeholder="标的物编号"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="query.name" placeholder="产品名"></el-input>
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
          <el-table-column label="标的物编号">
            <template slot-scope="scope">
              <span>{{ scope.row.userName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="产品名">
            <template slot-scope="scope">
              <span>{{ scope.row.expertName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="商品名">
            <template slot-scope="scope">
              <span>{{ scope.row.expertName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="剂型">
            <template slot-scope="scope">
              <span>{{ scope.row.expertName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="规格包装">
            <template slot-scope="scope">
              <span>{{ scope.row.expertName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="生产企业">
            <template slot-scope="scope">
              <span>{{ scope.row.expertName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="申报企业">
            <template slot-scope="scope">
              <span>{{ scope.row.expertName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="参考价">
            <template slot-scope="scope">
              <span>{{ scope.row.expertName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="全国最低价">
            <template slot-scope="scope">
              <span>{{ scope.row.expertName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="评价层次">
            <template slot-scope="scope">
              <span>{{ scope.row.expertName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="主要规格">
            <template slot-scope="scope">
              <span>{{ scope.row.expertName }}</span>
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
  import {selectExpertList} from 'src/axios/select/controlcenter/expertmanagement/expert'

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
        selectExpertList(this.resData, this.query).then(res => {
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

