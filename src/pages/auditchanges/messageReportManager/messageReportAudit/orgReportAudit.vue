<template>
  <div class="tab-box">

   <!-- <div class="tabs-panel">
      <span class="active">企业举报处理</span>
      <router-link to="/AUDIT/messageReportManager/productmessageAudit">产品举报处理</router-link>
    </div>-->

    <span class="tab-bar"></span>
    <el-tabs v-model="activeName" @tab-click="toChange">
      <el-tab-pane label="企业举报处理" name="first" />
      <el-tab-pane label="产品举报处理" name="second" />
    </el-tabs>
    <div class="el-tabs__content">
      <div class="tablebox">

      <el-form ref="reqData" :model="reqData" label-position="right" size="small" :inline="true" class="table-form">
          <el-form-item>
              <el-input class="width-120" v-model="reqData.name" type="text" @keyup.enter.native="searchEnterFun" placeholder="企业名称" size="small"></el-input>
          </el-form-item>
          <el-form-item>
              <el-input class="width-120" v-model="reqData.creaditCode" type="text" @keyup.enter.native="searchEnterFun" placeholder="社会统一信用代码" size="small"></el-input>
          </el-form-item>
          <el-form-item>
              <el-input class="width-120" v-model="reqData.organizeCode" type="text" @keyup.enter.native="searchEnterFun" placeholder="组织机构代码" size="small"></el-input>
          </el-form-item>
          <el-form-item>
              <el-select class="width-120" placeholder="请选择" v-model="reqData.states" size="small">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
          </el-form-item>
          <el-form-item>
            <el-select class="width-120" placeholder="请选择" v-model="reqData.flag" size="small">
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
              class="width-120"
              v-model="reqData.startDate"
              type="date"
              placeholder="开始日期"
              format="yyyy-MM-dd" value-format="yyyy-MM-dd" size="small">
            </el-date-picker>
            &nbsp;至&nbsp;
            <el-date-picker
              class="width-120"
              v-model="reqData.endDate"
              type="date"
              placeholder="结束日期"
              format="yyyy-MM-dd" value-format="yyyy-MM-dd"  size="small">
            </el-date-picker>
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
        <el-table-column label="企业名称" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{scope.row.NAME}}</span>
          </template>
        </el-table-column>
        <el-table-column label="社会统一信用代码" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{scope.row.CREDIT_CODE}}</span>
          </template>
        </el-table-column>
        <el-table-column label="组织机构代码" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{scope.row.ORGANIZE_CODE}}</span>
          </template>
        </el-table-column>
        <el-table-column label="举报时间" width="160px">
          <template slot-scope="scope">
            <span>{{scope.row.CREATE_DATE}}</span>
          </template>
        </el-table-column>
        <el-table-column label="澄清时间" width="160px">
          <template slot-scope="scope">
            <span>{{scope.row.CLARIFY_DATE}}</span>
          </template>
        </el-table-column>
        <el-table-column label="回复时间" width="160px">
          <template slot-scope="scope">
            <span>{{scope.row.REPLY_DATE}}</span>
          </template>
        </el-table-column>
        <el-table-column label="状态" width="100px">
          <template slot-scope="scope">
            <span>{{scope.row.STATES==0?"已提交":scope.row.STATES==1?"已受理":scope.row.STATES==2?"已澄清":scope.row.STATES==3?"已拒绝":"已审核"}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="80px">
          <template slot-scope="scope">
            <div class="operates">
              <span v-if="scope.row.STATES==3 || scope.row.STATES==4">
                <a href="javascript:;"
                   @click="openVis(scope.row.ID,scope.row.NAME,scope.row.STATES)"
                   class="operation-btn">详情
                </a>
              </span>
              <span v-if="scope.row.STATES==0 || scope.row.STATES==1|| scope.row.STATES==2">
                <a href="javascript:;"
                   @click="openVisible(scope.row.ID,scope.row.NAME,scope.row.STATES,scope.row.QTID,)"
                   class="operation-btn">审核
                </a>
              </span>
            </div>
           <!-- <el-button v-if="scope.row.STATES==3 || scope.row.STATES==4" type="text"
                       @click="openVis(scope.row.ID,scope.row.NAME,scope.row.STATES)">详情
            </el-button>
            <el-button v-if="scope.row.STATES==0 || scope.row.STATES==1|| scope.row.STATES==2" type="text"
                       @click="openVisible(scope.row.ID,scope.row.NAME,scope.row.STATES)">
              审核
            </el-button>-->
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
    <org-report-dispose-dialog ref="orgReportDisposeDialog" v-on:refresh="list()"></org-report-dispose-dialog>
  </div>
    </div>
  </div>
</template>

<script>
  import {orgReportAuditList} from 'src/axios/auditchanges/messageReportManager/messageReport/orgMessageReport'
  import {updateUserId} from 'src/axios/auditchanges/messageReportManager/messageReport/productReport'
  import {keyBoardEnter} from "src/utils";
  import orgReportDisposeDialog from '../orgReportDialog/orgReportDisposeDialog'
  import reportDetailsDialog from '../orgReportDialog/reportDetailsDialog'


  export default {
    name: "org-report-audit",
    components: {
      // orgReport
      orgReportDisposeDialog,
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
          value: '0',
          label: '已提交'
        }, {
          value: '1',
          label: '已受理'
        }, {
          value: '3',
          label: '拒绝'
        }, {
          value: '4',
          label: '已审核'
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
      this.resData.pageSize = 10;
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
      openVisible(id, name, states,qtID) {
        // console.log(id, name)
        // this.flag = ''
        // if (states == 0) {
        //   this.flag = 'b'
        // }
        console.log(id,qtID)
        updateUserId(qtID).then(res => {
          var type  = res.data;
          if(1 == type){
            alert("该数据存在审核员");
            window.location.reload()
          }
        })
        this.$nextTick(() => {
          this.$refs.orgReportDisposeDialog.fillData(id, name, states);
        })
      },
      list() {
        console.log(this.reqData,'reqdata')
        orgReportAuditList(this.reqData).then(res => {
          this.resData = res.data;
          console.log(res.data,'res.data')
          if (this.resData.pageNum == 0) {
            this.resData.pageNum = 1;
          }
        })
      },
      handleSizeChange(val) {
        this.resData.pageSize = val
        this.list()
      },
      handleCurrentChange(val) {
        this.resData.pageNum = val
        this.list()
      },
      toChange(t) {
        if(t.name == "second") {
          this.$router.push('/AUDIT/messageReportManager/productmessageAudit');
        }
      },
      queryData() {
        return {
          startDate: '',
          endDate: '',
          name:'',
          creaditCode:'',
          organizeCode:'',
          states:'',
          flag:'',
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
