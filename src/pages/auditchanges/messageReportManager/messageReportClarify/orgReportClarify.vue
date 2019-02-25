<template>
  <div class="tab-box">
    <!--<div class="tabs-panel">
      <span class="active">企业举报澄清</span>
      <router-link to="/AUDIT/messageReportManager/productmessageClarify">产品举报澄清</router-link>
    </div>-->

    <el-tabs v-model="activeName" @tab-click="toChange">
      <el-tab-pane label="企业举报澄清" name="first" />
      <el-tab-pane label="产品举报澄清" name="second" />
    </el-tabs>
    <div class="el-tabs__content">
      <div class="tablebox">

      <el-form ref="reqData" :model="reqData" label-position="right" size="small" :inline="true" class="table-form">
         <el-form-item>
            <el-select
              placeholder="请选择"
              size="small"
              v-model="reqData.flag">
              <el-option
                v-for="item in dateFlag"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
          </el-select>
          </el-form-item>
          <el-form-item>
           <el-date-picker
             v-model="reqData.startDate"
             type="date"
             placeholder="开始日期"
             format="yyyy-MM-dd" value-format="yyyy-MM-dd" size="small">
           </el-date-picker>
            &nbsp;至&nbsp;
            <el-date-picker
              v-model="reqData.endDate"
              type="date"
              placeholder="结束日期"
              format="yyyy-MM-dd" value-format="yyyy-MM-dd" size="small">
            </el-date-picker>
        </el-form-item>
          <el-form-item>
           <el-select
             placeholder="请选择"
             size="small"
             v-model="reqData.states">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
        </el-form-item>
          <el-form-item>
             <el-button type="success" @click="searchEnterFun" size="small">查询</el-button>
              <el-button type="warning" @click="restQuery" size="small">重置</el-button>
          </el-form-item>

      </el-form>
    <div class="tableset">
      <el-table
        :data="resData.list"
        border
        stripe>
        <el-table-column label="举报时间">
          <template slot-scope="scope">
            <span>{{scope.row.CREATE_DATE}}</span>
          </template>
        </el-table-column>
        <el-table-column label="澄清时间" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.CLARIFY_DATE}}</span>
          </template>
        </el-table-column>
        <el-table-column label="回复时间" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.REPLY_DATE}}</span>
          </template>
        </el-table-column>
        <el-table-column label="状态" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.STATES==0?"已提交":scope.row.STATES==1?"未澄清":scope.row.STATES==2?"已澄清":scope.row.STATES==3?"已拒绝":"已审核"}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <div class="operates">
              <a href="javascript:;" v-if="scope.row.STATES==1"
                 @click="openVisible(scope.row.ID,scope.row.NAME,scope.row.STATES)">澄清</a>
              <a  href="javascript:;" v-if="scope.row.STATES>=2"
                 @click="openVis(scope.row.ID,scope.row.NAME,scope.row.STATES)">详情</a>
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
    <!--<org-report ref="orgReport"></org-report>-->
    <report-details-dialog ref="reportDetailsDialog"></report-details-dialog>
    <org-report-clarify-dialog ref="orgReportClarifyDialog" v-on:closeVis="list()"></org-report-clarify-dialog>
  </div>
    </div>
  </div>
</template>

<script>
  import {findOrgCliarifyList} from 'src/axios/auditchanges/messageReportManager/messageReport/orgMessageReport'
  import {keyBoardEnter} from "src/utils";
  import orgReportClarifyDialog from '../orgReportDialog/orgReportClarifyDialog'
  import reportDetailsDialog from '../orgReportDialog/reportDetailsDialog'


  export default {
    name: "org-report-clarify",
    components: {
      // orgReport
      orgReportClarifyDialog,
      reportDetailsDialog
    },
    data() {
      return {
        resData: this.mataData(),
        activeName: 'first',//标签页默认选中第一个
        reqData: this.queryData(),
        options: [{
          value: '',
          label: '全部'
        }, {
          value: '2',
          label: '已澄清'
        }, {
          value: '1',
          label: '未澄清'
        }],
        dateFlag: [{
          value: '0',
          label: '举报时间'
        }, {
          value: '1',
          label: '澄清时间'
        }, {
          value: '2',
          label: '回复时间'
        }]
      }
    },
    created() {
      this.list();
    },
    methods: {
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
      restQuery() {
        this.reqData = this.queryData()
        this.list();
      },
      openVis(id, name, states) {
        console.log(id, name)
        this.$nextTick(() => {
          this.$refs.reportDetailsDialog.fillData(id, name, states);
        })
      },
      openVisible(id, name, states) {
        this.$nextTick(() => {
          this.$refs.orgReportClarifyDialog.fillData(id, name, states);
        })
      },
      list() {
        findOrgCliarifyList(this.reqData,this.resData).then(res => {
          this.resData = res.data;
          if (this.resData.list.length == 0) {
            this.resData.pageNum = 1;
          }
        })
      },
      handleSizeChange(val) {
        this.resData.pageSize = val
        this.list()
      },
      toChange(t) {
        if(t.name == "second") {
          this.$router.push('/AUDIT/messageReportManager/productmessageClarify');
        }
      },
      handleCurrentChange(val) {
        this.resData.pageNum = val
        this.list()
      },
      queryData() {
        return {
          startDate: '',
          endDate: '',
          name: '',
          creaditCode: '',
          organizeCode: '',
          states: '',
          flag: '',
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
      },
    }
  }
</script>
