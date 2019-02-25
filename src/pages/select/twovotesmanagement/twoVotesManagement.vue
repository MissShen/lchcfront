<template>
  <div>
    <!-- ========================== 主内容start ========================= -->
    <div class="tabs-panel">
      <span class="active">承诺书签订</span>
    </div>

    <div class="tablebox">
      <!-- 表格查询表单 -->

      <!-- 表格列表 -->
      <div class="tableset">
        <el-table
          :data="resData.list"
          style="width: 100%"
          border
          stripe>
          <el-table-column label="单位名称">
            <template slot-scope="scope">
              <span>{{ scope.row.aa }}</span>
            </template>
          </el-table-column>
          <el-table-column label="是否签订两票制承诺书">
            <template slot-scope="scope">
              <span>{{ scope.row.aa }}</span>
            </template>
          </el-table-column>
          <el-table-column label="签订时间">
            <template slot-scope="scope">
              <span>{{ scope.row.aa }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="text" size="small">签订承诺书</el-button>
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
  import {selectTwoVomanagementList} from 'src/axios/select/twovotesmanagement/twoVotesManagement'

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
        }
      },

      // 打开用户新增页面
      handleGoAdd () {
        this.resetForm()
        this.form = this.metaForm()
        this.showForm = true
        /*this.$refs['form'].resetFields()*/
        this.formStatus = 'add'
        this.rules = this.metaRules()
      },

      metaQuery () { // 表单查询数据初始化
        return {
          query: {
            id: undefined,
            searchRuleName: undefined
          }
        }
      },
      // ------------------------------------------------- 处理方法 ----------------------------------------
      //  获取用户分页列表
      list () {
        selectTwoVomanagementList(this.resData, this.query).then(res => {
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

