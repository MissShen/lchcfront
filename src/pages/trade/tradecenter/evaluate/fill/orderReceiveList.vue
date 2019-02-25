<template>
  <div>
    <!-- ========================== 主内容start ========================= -->

    <!-- 表格 -->
    <div class="tablebox">
      <!-- 表格查询表单 -->
      <div class="table-form">
        <el-form ref="query" :model="query" label-position="right" size="small">
          <el-row :gutter="24">
            <el-col :span="3">
              <el-form-item>
                <el-input v-model="query.searchSenderName" placeholder="通用名"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="3">
              <el-form-item>
                <el-input v-model="query.searchSenderName" placeholder="生产企业"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="3">
              <el-form-item>
                <el-input v-model="query.searchSenderName" placeholder="规格包装"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item>
                <span>
                      <el-date-picker type="date" size="small" placeholder="开始日期" v-model="query.beginDate"></el-date-picker>
                </span>
                <span>到</span>
                <span>
                      <el-date-picker type="date" placeholder="结束日期" v-model="query.endDate"></el-date-picker>
                </span>
              </el-form-item>
            </el-col>
            <el-col :span="2">
              <el-form-item>
                <el-button type="warning">查询</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>

      </div>
      <el-button type="warning" size="small">新增</el-button>
      <!-- 表格列表 -->
      <div class="tableset">
        <el-table
          :data="resData.list"
          border
          stripe>
          <!--<el-table-column type="index" width="50" label="序号"></el-table-column>-->
          <el-table-column label="通用名">
            <template slot-scope="scope">
              {{ scope.row.medicalName }}
            </template>
          </el-table-column>
          <el-table-column label="商品名">
            <template slot-scope="scope">
              <span>{{ scope.row.aaa }}</span>
            </template>
          </el-table-column>
          <el-table-column label="规格包装">
            <template slot-scope="scope">
              <span>{{ scope.row.aaa }}</span>
            </template>
          </el-table-column>
          <el-table-column label="生产企业">
            <template slot-scope="scope">
              <span>{{ scope.row.aaa }}</span>
            </template>
          </el-table-column>
          <el-table-column label="单价（元）">
            <template slot-scope="scope">
              <span>{{ scope.row.aaa }}</span>
            </template>
          </el-table-column>
          <el-table-column label="零售价(元)">
            <template slot-scope="scope">
              <span>{{ scope.row.aaa }}</span>
            </template>
          </el-table-column>
          <el-table-column label="违约主体">
            <template slot-scope="scope">
              <span>{{ scope.row.productName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="违约行为">
            <template slot-scope="scope">
              <span>{{ scope.row.aaa }}</span>
            </template>
          </el-table-column>
          <el-table-column label="填报机构">
            <template slot-scope="scope">
              <span>{{ scope.row.aaa }}</span>
            </template>
          </el-table-column>
          <el-table-column label="审批机构">
            <template slot-scope="scope">
              <span>{{ scope.row.aaa }}</span>
            </template>
          </el-table-column>
          <el-table-column label="状态">
            <template slot-scope="scope">
              <span>{{ scope.row.aaa }}</span>
            </template>
          </el-table-column>
          <el-table-column label="创建日期">
            <template slot-scope="scope">
              <span>{{ scope.row.aaa }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <span>{{ scope.row.aaa }}</span>
            </template>
          </el-table-column>

        </el-table>
      </div>
      <div style="margin: 20px 0">
        <el-button type="warning" size="small">新增</el-button>
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
  import {selectParameterSettingList} from 'src/axios/trade/audit/auditConfig'

  export default {
    name: "orderReceiveList",
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
        },
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
            searchSenderName: undefined,
            searchSenderAbbr: undefined,
          }
        }
      },
      // ------------------------------------------------- 处理方法 ----------------------------------------
      //  获取用户分页列表
      list () {
        selectParameterSettingList(this.resData, this.query).then(res => {
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

