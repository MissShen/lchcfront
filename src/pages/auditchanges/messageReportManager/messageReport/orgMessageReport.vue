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
                 <el-select placeholder="请选择" v-model="reqData.states" size="small">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
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
        <el-table-column label="举报时间">
          <template slot-scope="scope">
            <span>{{scope.row.CREATE_DATE}}</span>
          </template>
        </el-table-column>
        <el-table-column label="回复时间">
          <template slot-scope="scope">
            <span>{{scope.row.REPLY_DATE}}</span>
          </template>
        </el-table-column>
        <el-table-column label="状态" width="100">
          <template slot-scope="scope">
            <span>{{scope.row.STATES==0?"已提交":scope.row.STATES==1?"已受理":scope.row.STATES==2?"已澄清":scope.row.STATES==3?"已拒绝":"已审核"}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="80">
          <template slot-scope="scope">
            <div class="operates">
              <span>
                <a href="javascript:;" @click="openVisible(scope.row.ID,scope.row.NAME,scope.row.STATES)"
                   class="operation-btn">详情
                </a>
              </span>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="foot-btn">
      <div class="foot-left">
        <router-link to="/AUDIT/messageReportManager/reportOrgList">
          <el-button type="primary" size="small">举报</el-button>
        </router-link>
      </div>
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
    <!--<org-report ref="orgReport"></org-report>-->
    <report-details-dialog ref="reportDetailsDialog"></report-details-dialog>
  </div>
</template>

<script>
  import {findReportList} from "src/axios/auditchanges/messageReportManager/messageReport/orgMessageReport"
  import {keyBoardEnter} from "src/utils";
  import reportDetailsDialog from '../orgReportDialog/reportDetailsDialog'

  export default {
    name: "change-doubt-list",
    components: {
      // orgReport
      reportDetailsDialog
    },
    data() {
      return {
        resData: this.mataData(),
        reqData: this.queryData(),
        options: [{
          value: '',
          label: '全部'
        }, {
          value: '0',
          label: '已提交'
        }, {
          value: '1',
          label: '已受理'
        }, {
          value: '2',
          label: '已澄清'
        }, {
          value: '3',
          label: '已拒绝'
        }, {
          value: '4',
          label: '已审核'
        }],
        form: {}
      }
    },
    created() {
      if(!!this.$store.state.pageSeach.pageNum){
        this.reqData = this.$store.state.pageSeach;
        this.resData.pageSize = this.$store.state.pageSeach.pageSize;
        this.resData.pageNum = this.$store.state.pageSeach.pageNum;
      }
      this.$store.state.pageSeach=this.reqData;
      this.resData.pageSize = 10;
      this.list()
    },
    methods: {
      openVisible(id, name, states) {
        this.$nextTick(() => {
          this.$refs.reportDetailsDialog.fillData(id, name, states);
        })
      },
      //查询
      searchEnterFun(e){
        this.$store.state.pageSeach.pageNum = 1;
        this.resData.pageNum=1;
        keyBoardEnter(e, () => {
          this.list();
        })
      },
      findListByCondition() {
        this.list()
      },
      restQuery() {
        this.reqData = this.queryData()
        this.list();
      },
      queryData() {
        return {
          name: '',
          creaditCode: '',
          organizeCode: '',
          states: ''
        }
      },
      handleSizeChange(val) {
        this.$store.state.pageSeach.pageSize = val
        this.resData.pageSize = val
        this.list()
      },
      handleCurrentChange(val) {
        this.$store.state.pageSeach.pageNum = val
        this.resData.pageNum = val
        this.list()
      },

      mataData() {
        return {
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
      list() {
        this.$store.state.pageSeach = this.reqData;
        findReportList(this.reqData, this.resData).then(res => {
          this.resData = res.data;
          console.log(this.resData)
          if (this.resData.pageNum == 0) {
            this.resData.pageNum = 1;
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
