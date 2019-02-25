<template>
  <!-- 表格 -->
  <div class="tab-box">
   <!-- <div class="tabs-panel">
      <span class="active">产品申报澄清</span>
      <router-link to="/AUDIT/orgClarify/productMessageChangeClarify">产品变更澄清</router-link>
    </div>-->

    <span class="tab-bar"></span>
    <el-tabs v-model="activeName" @tab-click="toChange">
      <el-tab-pane label="产品申报" name="first" />
      <el-tab-pane label="产品变更" name="second" />
      <el-tab-pane label="产品质疑记录" name="three" />
      <!--<el-tab-pane label="产品申报质疑" name="three" />-->
      <!--<el-tab-pane label="产品变更质疑" name="four" />-->
      <el-tab-pane label="产品澄清" name="five" />
     <!-- <el-tab-pane label="产品变更澄清" name="six" />-->
    </el-tabs>

    <div class="el-tabs__content">
      <div class="tablebox">

    <!-- 表格查询表单 -->
      <el-form ref="query" :model="query" label-position="right" size="small" :inline="true" class="table-form">
        <el-form-item>
          <el-radio-group v-model="declareOrChange" @change="selectRadio">
            <el-radio label="0">申报质疑</el-radio>
            <el-radio label="1">变更质疑</el-radio>
          </el-radio-group>
        </el-form-item><br>
          <el-form-item>
            <el-input v-model="query.PRODUCT" placeholder="产品名称" @keyup.enter.native="searchEnterFun" size="small"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="query.DOSAGE" placeholder="剂型" @keyup.enter.native="searchEnterFun" size="small"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="query.SPEC" placeholder="规格" @keyup.enter.native="searchEnterFun" size="small"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="query.MANUFACTURE" placeholder="生产企业" @keyup.enter.native="searchEnterFun" size="small"></el-input>
          </el-form-item>
          <el-form-item>
            <el-select v-model="query.STATE" placeholder="全部" size="small">
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
        <el-table-column label="申报号" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{scope.row.UPPRODUCTID}}</span>
          </template>
        </el-table-column>
       <!-- <el-table-column label="产品名称">
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
        <el-table-column label="剂型" width="100px" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.DOSAGE }}</span>
          </template>
        </el-table-column>
        <el-table-column label="规格" width="80px" show-overflow-tooltip>
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
        <el-table-column label="包材" width="50px">
          <template slot-scope="scope">
            <span>{{ scope.row.WRAP }}</span>
          </template>
        </el-table-column>
        <el-table-column label="生产企业" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.MANUFACTURE }}</span>
          </template>
        </el-table-column>
        <el-table-column label="质疑字段" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{getChn(scope.row.QUESTIONFIELD)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="回复状态" width="120px">
          <template slot-scope="scope">
            <span v-if="scope.row.STATE==='0'">未回复</span>
            <span v-if="scope.row.STATE==='1'">已回复</span>
          </template>
        </el-table-column>
        <el-table-column label="回复时间" width="120px">
          <template slot-scope="scope">
            <span>{{ scope.row.REPLYDATE }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="80px">
          <template slot-scope="scope">
            <div class="operates">
              <span>
                <a class="operation-btn" @click="handleGoClarify(scope.row.ID,scope.row.QTID,scope.row.UPPRODUCTID)">详情</a>
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
    <changeMessageQuery ref="changeMessageQuery"></changeMessageQuery>
  </div>
    </div>
  </div>
</template>
<script>
  import {queryListChange} from 'src/axios/auditchanges/messageDoubt/productDoubt'
  import changeMessageQuery from "./changeMessageQuery";
  import {getJsonChn} from "src/axios/auditchanges/common/catProduct";
  import {keyBoardEnter} from "src/utils";

  export default {
    components:{
      changeMessageQuery
    },
    data () {
      return {
        declareOrChange:'1',
        resData: this.metaData(),
        form: this.metaForm(), // 表单初始化
        activeName: 'three',//标签页默认选中第一个
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
          label: "未回复",
          value: "0", /*值*/
        },{
          key:"3",
          label: "已回复",
          value: "1", /*值*/
        }]
      }
    },
    created () {
      this.list()
    },
    methods: {
      selectRadio(){
        if(this.declareOrChange=='0'){
          this.$router.push('/AUDIT/messageDoubt/productMessageDoubt');
        }
      },
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
      //查询
      searchEnterFun(e){
        this.$store.state.pageSeach.pageNum = 1;
        this.resData.pageNum=1;
        keyBoardEnter(e, () => {
          this.list();
        })
      },
      //  获取用户分页列表
      list () {
        queryListChange(this.resData, this.query).then(res => {
          this.resData = res.data
        })
      },
      getChn(field){
        return getJsonChn(field)
      },
      // 重置用户表单
      resetForm () {
        /*  this.$refs['form'].resetFields()*/
        this.form = this.metaForm()
      },
      handleGoClarify(id,qtID,upProductId){
        this.$nextTick(() => {
          this.$refs.changeMessageQuery.fillData(id,qtID,upProductId)
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
        this.list()
      },
     /* toDeclare(t) {
        if(t.name == "first") {
          this.$router.push('/AUDIT/messageDoubt/productMessageDoubt');
        }
      },*/
      toChange(t) {
        if(t.name == "first") {
          this.$router.push('/AUDIT/messageDeclare/productMessageDeclareList');
        }if(t.name == "second") {
          this.$router.push('/AUDIT/messageChanges/productMessageChangeList');
        }if(t.name == "five") {
          this.$router.push('/AUDIT/orgClarify/productMessageDeclareClarify');
        }if(t.name == "six") {
          this.$router.push('/AUDIT/orgClarify/productMessageChangeClarify');
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
