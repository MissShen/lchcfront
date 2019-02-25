<template>
  <!-- 表格 -->
  <div class="tab-box">
    <!--<div class="tabs-panel">
      <router-link to="/AUDIT/messageReportManager/orgReportAudit">企业举报处理</router-link>
      <span class="active">产品举报处理</span>
    </div>-->

    <span class="tab-bar"></span>
    <el-tabs v-model="activeName" @tab-click="toDeclare">
      <el-tab-pane label="企业举报处理" name="first" />
      <el-tab-pane label="产品举报处理" name="second" />
    </el-tabs>

    <div class="el-tabs__content">
      <div class="tablebox">

    <!-- 表格查询表单 -->
      <el-form ref="query" :model="query" label-position="right" size="small" class="table-form" :inline="true">
            <el-form-item>
              <el-input class="width-120" v-model="query.PRODUCT" @keyup.enter.native="searchEnterFun" placeholder="产品名称" size="small"></el-input>
            </el-form-item>
            <el-form-item>
              <el-input  class="width-120"  v-model="query.DOSAGE" @keyup.enter.native="searchEnterFun" placeholder="剂型" size="small"></el-input>
            </el-form-item>
            <el-form-item>
              <el-input  class="width-120"  v-model="query.SPEC" @keyup.enter.native="searchEnterFun" placeholder="规格" size="small"></el-input>
            </el-form-item>
            <el-form-item>
              <el-input class="width-120"  v-model="query.MANUFACTURE" @keyup.enter.native="searchEnterFun" placeholder="生产企业" size="small"></el-input>
            </el-form-item>
            <el-form-item>
              <el-select  class="width-120"  v-model="query.DATE" placeholder="请选择时间" size="small">
                <el-option
                  v-for="item in dateList"
                  :key="item.key"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item class="date-range-wrapper">
              <el-date-picker
                class="width-180"
                size="small"
                v-model="query.SELECTDATE"
                type="daterange"
                value-format="yyyy-MM-dd"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
            </el-form-item>
            <!--<span class="date-group">-->
              <!--<el-date-picker-->
                <!--v-model="query.SELECTDATE"-->
                <!--type="date"-->
                <!--value-format="yyyy-MM-dd"-->
                <!--placeholder="开始日期">-->
              <!--</el-date-picker>-->
              <!--&nbsp;至&nbsp;-->
              <!--<el-date-picker-->
                <!--v-model="query.SELECTDATE"-->
                <!--type="date"-->
                <!--value-format="yyyy-MM-dd"-->
                <!--placeholder="结束日期">-->
              <!--</el-date-picker>-->
            <!--</span>-->
            <el-form-item>
              <el-select  class="width-120"  v-model="query.STATE" placeholder="全部" size="small">
                <el-option
                  v-for="item in stateList"
                  :key="item.key"
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

    <!-- 表格列表 -->
    <div class="tableset">
      <el-table
        :data="resData.list"
        border
        stripe
        @selection-change="handleSelectionChange">
       <!-- <el-table-column label="产品名称">
          <template slot-scope="scope">
            <div>
              <div class="text-inline">{{scope.row.PRODUCT}}</div>
              <div class="text-inline">{{ scope.row.MIXDOSAGE }}</div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="产品信息">
          <template slot-scope="scope">
            <div class="pro-details">
              <div class="text-inline">{{scope.row.COMBINED}}&nbsp;&nbsp;{{scope.row.WRAP}}</div>
              <div class="text-inline">{{ scope.row.ABBR }}</div>
            </div>
          </template>
        </el-table-column>-->

        <el-table-column label="产品名称" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.PRODUCT }}</span>
          </template>
        </el-table-column>
        <el-table-column label="商品名" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.TRADE }}</span>
          </template>
        </el-table-column>
        <el-table-column label="剂型" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.DOSAGE }}</span>
          </template>
        </el-table-column>
        <el-table-column label="规格" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.SPEC }}</span>
          </template>
        </el-table-column>
        <el-table-column label="转换比" width="70px" header-align="left" align="right">
          <template slot-scope="scope">
            <span>{{ scope.row.STANDRATE }}</span>
          </template>
        </el-table-column>
        <el-table-column label="单位" width="60px">
          <template slot-scope="scope">
            <span>{{ scope.row.METRIC }}</span>
          </template>
        </el-table-column>
        <el-table-column label="包材" width="60px" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.WRAP }}</span>
          </template>
        </el-table-column>
        <el-table-column label="生产企业" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.MANUFACTURE }}</span>
          </template>
        </el-table-column>
        <el-table-column label="举报时间" width="100" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.CREATEDATE}}</span>
          </template>
        </el-table-column>
        <el-table-column label="澄清时间" width="100" align="center">
          <template slot-scope="scope">
            <span>{{scope.row. CLARIFYDATE}}</span>
          </template>
        </el-table-column>
        <el-table-column label="回复时间" width="100" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.REPLYDATE }}</span>
          </template>
        </el-table-column>
        <el-table-column label="状态" width="80" align="center">
          <template slot-scope="scope">
            <span>{{{"0":"未审核","1":"已受理","2":"已澄清","3":"已拒绝","4":"已审核"}[scope.row.STATE]}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="80">
          <template slot-scope="scope">
            <div class="operates">
              <a href="javascript:;" @click="handleGoReport(scope.row.ID,scope.row.QTID,scope.row.REPORTID,scope.row.STATE,scope.row.USERID)">{{scope.row.STATE=='0'||scope.row.STATE=='1'||scope.row.STATE=='2'?'处理':'详情'}}</a>
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
    <messageQuery ref="messageQuery"></messageQuery>
    <uploadQuery ref="uploadQuery" @update="list"></uploadQuery>
    <clarifyQuery ref="clarifyQuery"></clarifyQuery>
    <refuseQuery ref="refuseQuery"></refuseQuery>
  </div>
    </div>
  </div>
</template>
<script>
  import {queryListAudit,updateUserId} from 'src/axios/auditchanges/messageReportManager/messageReport/productReport'
  import {keyBoardEnter} from "src/utils";
  import messageQuery from "./messageQuery";
  import uploadQuery from "./uploadQuery";
  import refuseQuery from "./refuseQuery";
  import clarifyQuery from "./clarifyQuery";
  export default {
    components:{
      messageQuery,
      uploadQuery,
      clarifyQuery,
      refuseQuery
    },
    data () {
      return {
        resData: this.metaData(),
        visible: false,
        form: this.metaForm(), // 表单初始化
        activeName: 'second',//标签页默认选中第一个
        query: this.metaQuery(), // 查询初始化
        showForm: false, // 表单可见性初始化
        showQuery: false, // 表单查询初始化
        defaultProps: {
          children: 'children',
          label: 'name',
          id: 'id'
        },stateList:[{
          key:"1",
          label: "全部",
          value: "", /*值*/
        },{
          key:"2",
          label: "未审核",
          value: "0", /*值*/
        },{
          key:"3",
          label: "已受理",
          value: "1", /*值*/
        },{
          key:"4",
          label: "已澄清",
          value: "2", /*值*/
        },{
          key:"5",
          label: "已拒绝",
          value: "3", /*值*/
        },{
          key:"6",
          label: "已审核",
          value: "4", /*值*/
        }],
        dateList:[{
          key:"1",
          label: "全部",
          value: "", /*值*/
        },{
          key:"2",
          label: "举报时间",
          value: "0", /*值*/
        },{
          key:"3",
          label: "澄清时间",
          value: "1", /*值*/
        },{
          key:"4",
          label: "回复时间",
          value: "2", /*值*/
        }]
      }
    },
    created () {
      this.list()
    },
    methods: {
      // -------------------------------------------- 数据初始化  -----------------------------------------
      metaData () {
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
      metaForm () { // 表单数据初始化
        return {
        }
      },
      metaQuery () { // 表单查询数据初始化
        return {
          query: {
            projectId: undefined,
            categoryName: undefined,
            STATE:'',
            DATE:'',
            SELECTDATE:''
          }
        }
      },
      // ------------------------------------------------- 处理方法 ----------------------------------------
      toggleQuery () {
        this.showQuery = !this.showQuery
      },
      toggleForm () {
        this.showForm = !this.showForm
      },
      closeForm () {
        this.$refs['form'].resetFields()
        this.toggleForm()
      },
      //  获取用户分页列表
      list () {
        queryListAudit(this.resData, this.query).then(res => {
          this.resData = res.data
          console.log('update')
        })
      },
      // 重置用户表单
      resetForm () {
        /*  this.$refs['form'].resetFields()*/
        this.form = this.metaForm()
      },
      handleGoReport(id,qtID,REPORTID,STATE,USERID){
        console.log(id,qtID,REPORTID,USERID)
        updateUserId(qtID).then(res => {
          var type  = res.data;
          if(1 == type){
            alert("该数据存在审核员");
            window.location.reload()
          }
        })
        this.$nextTick(() => {
          if(STATE=='0'){
            this.$refs.uploadQuery.fillData(id,qtID,REPORTID)
          }else if(STATE=='1'||STATE=='2'){
            this.$refs.clarifyQuery.fillData(id,qtID,REPORTID)
          }else if(STATE=='3'){
            this.$refs.refuseQuery.fillData(id,qtID,REPORTID)
          }else if(STATE=='4'){
            this.$refs.messageQuery.fillData(id,qtID,REPORTID)
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
      // ************************
      handleSizeChange (val) {
        this.resData.pageSize = val
        this.list()
      },
      handleSelectionChange(val){
        //val 所选对象
      },
      handleQuery(){
        this.list()
      },
      restQuery(){//重置
        this.query=this.metaQuery();
        this.list();
      },
      toDeclare(t) {
        if(t.name == "first") {
          this.$router.push('/AUDIT/messageReportManager/orgReportAudit');
        }
      },
      handleCurrentChange (val) {
        this.resData.pageNum = val
        this.list()
      }
    }
  }
</script>

