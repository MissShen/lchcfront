<template>
  <!-- 表格 -->
  <div class="tab-box">
   <!-- <div class="tabs-panel">
      <router-link to="/AUDIT/messageReportManager/orgReportClarify">企业举报澄清</router-link>
      <span class="active">产品举报澄清</span>
    </div>
-->
    <el-tabs v-model="activeName" @tab-click="toDeclare">
      <el-tab-pane label="企业举报澄清" name="first" />
      <el-tab-pane label="产品举报澄清" name="second" />
    </el-tabs>

    <div class="el-tabs__content">
      <div class="tablebox">

        <!-- 表格查询表单 -->
          <el-form ref="query" :model="query" label-position="right" size="small"  :inline="true" class="table-form">
                <el-form-item>
                  <el-input class="width-120" v-model="query.PRODUCT" placeholder="产品名称" @keyup.enter.native="searchEnterFun" size="small"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-input class="width-120" v-model="query.DOSAGE" placeholder="剂型" @keyup.enter.native="searchEnterFun" size="small"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-input class="width-120" v-model="query.SPEC" placeholder="规格" @keyup.enter.native="searchEnterFun" size="small"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-input class="width-120" v-model="query.MANUFACTURE" placeholder="生产企业" @keyup.enter.native="searchEnterFun" size="small"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-select class="width-120" v-model="query.DATE" placeholder="请选择时间" size="small">
                    <el-option
                      v-for="item in dateList"
                      :key="item.key"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item class="date-range-wrapper">
                  <el-date-picker class="width-200"
                    size="small"
                    v-model="query.SELECTDATE"
                    type="daterange"
                    value-format="yyyy-MM-dd"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                  </el-date-picker>
                </el-form-item>
                <el-form-item>
                  <el-select class="width-120" v-model="query.STATE" placeholder="全部" size="small">
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
            <!--<el-table-column label="产品名称">
              <template slot-scope="scope">
                <div>
                  <div class="text-inline">{{scope.row.PRODUCT}}</div>
                  <div class="text-inline">{{scope.row.MIXDOSAGE}}</div>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="产品信息">
              <template slot-scope="scope">
                <div class="pro-details">
                  <div class="text-inline">{{scope.row.COMBINED}}&nbsp;&nbsp;{{scope.row.WRAP}}</div>
                  <div class="text-inline">{{scope.row.ABBR}}</div>
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
            <el-table-column label="转换比" width="60px" header-align="left" align="right">
              <template slot-scope="scope">
                <span>{{ scope.row.STANDRATE }}</span>
              </template>
            </el-table-column>
            <el-table-column label="单位" width="50px">
              <template slot-scope="scope">
                <span>{{ scope.row.METRIC }}</span>
              </template>
            </el-table-column>
            <el-table-column label="包材" width="50px" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{ scope.row.WRAP }}</span>
              </template>
            </el-table-column>
            <el-table-column label="生产企业" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{ scope.row.MANUFACTURE }}</span>
              </template>
            </el-table-column>
            <el-table-column label="举报时间">
              <template slot-scope="scope">
                <span>{{scope.row.CREATEDATE}}</span>
              </template>
            </el-table-column>
            <el-table-column label="澄清时间">
              <template slot-scope="scope">
                <span>{{scope.row. CLARIFYDATE}}</span>
              </template>
            </el-table-column>
            <el-table-column label="回复时间">
              <template slot-scope="scope">
                <span>{{ scope.row.REPLYDATE }}</span>
              </template>
            </el-table-column>
            <el-table-column label="状态">
              <template slot-scope="scope">
                <span>{{{"0":"未澄清","1":"已澄清"}[scope.row.STATE]}}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="100px">
              <template slot-scope="scope">
                <div class="operates">
                  <a href="javascript:;" v-if="scope.row.STATE=='0'" @click="handleGoClarify(scope.row.ID,scope.row.QTID,scope.row.REPORTID)">澄清</a>
                  <a href="javascript:;" v-if="scope.row.STATE=='1'" @click="handleGoReport(scope.row.ID,scope.row.QTID,scope.row.STATES)">详情</a>
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
        <clarify ref="clarify" @update="list"></clarify>
        <auditMessageQuery ref="auditMessageQuery"></auditMessageQuery>
      </div>
    </div>
  </div>
</template>
<script>
    import {queryListClarify} from 'src/axios/auditchanges/messageReportManager/messageReport/productReport'
    import {keyBoardEnter} from "src/utils";
    import messageQuery from "./messageQuery";
    import clarify from "./clarify";
    import auditMessageQuery from "./auditMessageQuery";
  export default {
    components:{
      messageQuery,
      clarify,
      auditMessageQuery
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
          label: "未澄清",
          value: "0", /*值*/
        },{
          key:"3",
          label: "已澄清",
          value: "1", /*值*/
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
      searchEnterFun(e){
        this.resData.pageNum=1;
        keyBoardEnter(e, () => {
          this.list();
        })
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
        queryListClarify(this.resData, this.query).then(res => {
          this.resData = res.data
        })
      },
      // 重置用户表单
      resetForm () {
        /*  this.$refs['form'].resetFields()*/
        this.form = this.metaForm()
      },
      handleGoReport(id,qtID,STATES){
        this.$nextTick(() => {
          if(STATES=='2'){
            this.$refs.messageQuery.fillData(id,qtID)
          }else if(STATES=='4'){
            this.$refs.auditMessageQuery.fillData(id,qtID)
          }
        })
      },
      handleGoClarify(id,qtID,REPORTID){
        this.$nextTick(() => {
          this.$refs.clarify.fillData(id,qtID,REPORTID)
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
          this.$router.push('/AUDIT/messageReportManager/orgReportClarify');
        }
      },
      handleCurrentChange (val) {
        this.resData.pageNum = val
        this.list()
      }
    }
  }
</script>

<!--<style>
  .el-dialog {
    width: 80% !important;
  }
</style>-->
