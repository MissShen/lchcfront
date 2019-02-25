<template>
  <div class="tablebox">
      <el-form ref="reqData" :model="reqData" label-position="right" size="small" :inline="true" class="table-form">
                <el-form-item>
                 <el-input v-model="reqData.name" type="text" @keyup.enter.native="searchEnterFun" placeholder="企业名称" size="small"></el-input>
                </el-form-item>
          <el-form-item>
                  <el-input v-model="reqData.creaditCode" type="text" @keyup.enter.native="searchEnterFun" placeholder="社会统一信用代码" size="small"></el-input>
                </el-form-item>
          <el-form-item>
                <el-input v-model="reqData.organizeCode" type="text" @keyup.enter.native="searchEnterFun" placeholder="组织机构代码" size="small"></el-input>
                </el-form-item>
          <el-form-item>
                  <el-button type="success"  @click="searchEnterFun" size="small">查询</el-button>
                  <el-button type="warning" @click="restQuery" size="small">重置</el-button>
                </el-form-item>
      </el-form>
    <div class="tableset">
      <el-table
        :data="resData.list"
        border
        stripe>
        <el-table-column label="企业名称" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{scope.row.NAME}}</span>
          </template>
        </el-table-column>
        <el-table-column label="社会统一信用代码">
          <template slot-scope="scope">
            <span>{{scope.row.CREDIT_CODE}}</span>
          </template>
        </el-table-column>
        <el-table-column label="组织机构代码">
          <template slot-scope="scope">
            <span>{{scope.row.ORGANIZE_CODE}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="60">
          <template slot-scope="scope">
            <div class="operates">
              <span>
                <a href="javascript:;" @click="openVisible(scope.row.ID,scope.row.NAME)"
                   class="operation-btn">举报
                </a>
              </span>
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
    <div class="table-caption foot-btn">
      <div class="foot-left">
        <el-button @click="goBack">返回</el-button>
      </div>
    </div>
    <org-report ref="orgReport"></org-report>
  </div>
</template>

<script>
  import {findOrgList} from 'src/axios/auditchanges/messageReportManager/messageReport/orgMessageReport'
  import {keyBoardEnter} from "src/utils";
  import orgReport from '../orgReportDialog/orgReportDialog'

  export default {
    name: "org-show-list",
    components: {
      orgReport
    },
    data() {
      return {
        reqData: this.queryData(),
        resData: this.mataData(),
      }
    },
    created() {
      this.list()
    },
    methods: {
      openVisible(id, name) {
        this.$nextTick(() => {
          this.$refs.orgReport.fillData(id, name);
        })
      },
      goBack() {
        this.$router.go(-1)
      },
      handleSizeChange(val) {
        this.resData.pageSize = val
        this.list()
      },
      handleCurrentChange(val) {
        this.resData.pageNum = val
        this.list()
      },
      list() {
        findOrgList(this.reqData, this.resData).then(res => {
          this.resData = res.data;
          if (this.resData.list.length == 0) {
            this.resData.pageNum = 1;
          }
        })
      },
      //查询
      searchEnterFun(e){
        this.resData.pageNum=1;
        keyBoardEnter(e, () => {
          this.list();
        })
      },
      findListByCondition() {
        this.list()
      },
      restQuery() {//重置
        this.reqData = this.queryData()
        this.list();
      },
      queryData() {
        return {
          name: '',
          creaditCode: '',
          organizeCode: '',
        }
      },
      mataData() {
        return {
          pageNum: 0,
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
      }
    }
  }
</script>

<style scoped>

</style>
