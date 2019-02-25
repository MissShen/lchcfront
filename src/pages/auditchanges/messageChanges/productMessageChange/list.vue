<template>
  <div>

    <el-tabs v-model="activeName" @tab-click="toChange">
      <el-tab-pane label="产品申报" name="first" />
      <el-tab-pane label="产品变更" name="second" />
      <el-tab-pane label="产品质疑记录" name="three" />
     <!-- <el-tab-pane label="产品变更质疑" name="four" />-->
      <el-tab-pane label="产品澄清" name="five" />
     <!-- <el-tab-pane label="产品变更澄清" name="six" />-->
    </el-tabs>

  <!-- 表格 -->
  <div class="tablebox">
        <!-- 表格查询表单 -->
          <el-form ref="query" :model="query" :inline="true" class="demo-form-inline table-form">
              <el-form-item class="width-150">
                <el-input v-model="query.PRODUCT" placeholder="产品名称" @keyup.enter.native="searchEnterFun" size="small"></el-input>
              </el-form-item>
              <el-form-item class="width-150">
                <el-input v-model="query.DOSAGE" placeholder="剂型" @keyup.enter.native="searchEnterFun" size="small"></el-input>
              </el-form-item >
              <el-form-item class="width-150">
                <el-input v-model="query.SPEC" placeholder="规格" @keyup.enter.native="searchEnterFun" size="small"></el-input>
              </el-form-item>
              <el-form-item class="width-150">
                <el-input v-model="query.MANUFACTURE" placeholder="生产企业" @keyup.enter.native="searchEnterFun" size="small"></el-input>
              </el-form-item>
              <el-form-item class="width-150">
                <el-input v-model="query.ID" placeholder="申报号" size="small" @keyup.enter.native="searchEnterFun"></el-input>
              </el-form-item>
              <el-form-item>
                  <el-select v-model="query.STATE" placeholder="全部" size="small">
                    <el-option
                      v-for="item in options"
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
        <div class="table-caption foot-btn">
          <div class="foot-left">
            <el-button type="primary" size="small" @click="handleGoAddList">
              产品申报变更
            </el-button>
          </div>
        </div>

        <div class="tableset">
          <el-table
            :data="resData.list"
            border
            stripe
            :row-key="getRowkeys"
            @selection-change="handleSelectionChange">
            <el-table-column label="申报号" width="100" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{ scope.row.ID }}</span>
              </template>
            </el-table-column>
           <!-- <el-table-column label="产品名称">
              <template slot-scope="scope">
                <div>
                  <div class="text-inline">{{ scope.row.PRODUCT }}</div>
                </div>
                <div class="text-inline">{{ scope.row.MIXDOSAGE }}</div>
              </template>
            </el-table-column>
            <el-table-column label="产品信息">
              <template slot-scope="scope">
                <div class="pro-details">
                  <div class="text-inline">{{ scope.row.COMBINED }}&nbsp;&nbsp;{{scope.row.WRAP}}</div>
                </div>
                <div class="text-inline">{{ scope.row.ABBR }}</div>
              </template>
            </el-table-column>-->

            <el-table-column label="产品名称" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{scope.row.PRODUCT}}</span>
              </template>
            </el-table-column>
            <el-table-column label="商品名" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{scope.row.TRADE}}</span>
              </template>
            </el-table-column>
            <el-table-column label="剂型" width="100" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{scope.row.DOSAGE}}</span>
              </template>
            </el-table-column>
            <el-table-column label="规格" width="80" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{scope.row.SPEC}}</span>
              </template>
            </el-table-column>
            <el-table-column label="转换比" width="60" header-align="left" align="right">
              <template slot-scope="scope">
                <span>{{scope.row.STANDRATE}}</span>
              </template>
            </el-table-column>
            <el-table-column label="单位" width="50">
              <template slot-scope="scope">
                <span>{{scope.row.METRIC}}</span>
              </template>
            </el-table-column>
            <el-table-column label="包材" width="60" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{scope.row.WRAP}}</span>
              </template>
            </el-table-column>
            <el-table-column label="生产企业" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{ scope.row.MANUFACTURE }}</span>
              </template>
            </el-table-column>
            <el-table-column label="当前状态">
              <template slot-scope="scope">
                <span>{{{"0":"未提交","1":"提交","2":"公示","3":"质疑","4":"澄清","5":"审核","6":"挂网","8":"确认中","9":"已确认"}[scope.row.STATE]}}</span>
              </template>
            </el-table-column>
            <el-table-column label="审核结果">
              <template slot-scope="scope">
                <span>{{{"0":"未审核","1":"审核通过","2":"待确认","3":"审核不通过"}[scope.row.AUDITRESULTS]}}</span>
              </template>
            </el-table-column>DATEADD
            <el-table-column label="申报时间">
              <template slot-scope="scope">
                <span>{{scope.row.DATEADD}}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="200">
              <template slot-scope="scope">
                <div class="operates">
                  <span><a class="operation-btn" @click="findView(scope.row.ID,scope.row.PRODUCTID)">查看</a></span>
                  <span v-if="scope.row.STATE=='0' && scope.row.AUDITRESULTS =='0'"><a class="operation-btn" @click="update(scope.row.ID,scope.row.PRODUCTID)">修改</a></span>
                  <span v-if="scope.row.STATE=='0' && scope.row.AUDITRESULTS =='0'"><a class="operation-btn" @click="remove(scope.row.ID)">删除</a></span>
                  <span v-if="scope.row.STATE!='0' && scope.row.STATE!='5' && scope.row.STATE!='6' && scope.row.AUDITRESULTS =='0'"><a class="operation-btn" @click="rollback(scope.row.ID)">撤销</a></span>
                  <span v-if="scope.row.STATE=='0' && scope.row.AUDITRESULTS =='0'"><a class="operation-btn" @click="submit(scope.row.ID)">提交</a></span>
                  <span v-if="scope.row.STATE=='0' && scope.row.AUDITRESULTS !='0' && scope.row.AUDITRESULTS != '1'"><a class="operation-btn" @click="update(scope.row.ID,scope.row.PRODUCTID,true)">复制</a></span>
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
    <change ref="change"></change>
    <find-view ref="findView"></find-view>
  </div>
  </div>
</template>

<script>

  // 引入用户相关请求
  import findView from "./findView";
  import change from "./change"
  // import {keyBoardEnter} from "src/utils";
  import {queryList,submitChange,rollbackChange,deleteProductChange,checkProductChange} from "src/axios/auditchanges/messageChanges/productChange"
  export default {
    components:{
      change,
      findView
    },
    data() {
      return {
        resData: this.metaData(),
        activeName: 'second',//标签页默认选中第一个
        query: this.metaQuery(), // 查询初始化
        options: [{
          key:'0',
          value: '0',
          label: '未提交'
        }, {
          key:'1',
          value: '1',
          label: '已提交'
        }]
      }
    },
    created() {
      if(!!this.$store.state.pageSeach.pageNum){
        this.query = this.$store.state.pageSeach;
        this.resData.pageSize = this.$store.state.pageSeach.pageSize;
        this.resData.pageNum = this.$store.state.pageSeach.pageNum;
      }
      this.$store.state.pageSeach=this.query;
      this.resData.pageSize = 10;
      this.list()
    },
    methods: {
      // -------------------------------------------- 数据初始化  -----------------------------------------
      metaData() {
        return {
          resData: { // 前后台交互数据封装格式
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
      },
      metaQuery() { // 表单查询数据初始化
        let obj = {
          PRODUCT: undefined,
          DOSAGE: undefined,
          SPEC: undefined,
          MANUFACTURE: undefined,
          ID: undefined,
          STATE: undefined
        }
        if(sessionStorage.getItem('query')){
          obj = JSON.parse(sessionStorage.getItem('query'))
        }
        return obj
      },
      // ------------------------------------------------- 处理方法 ----------------------------------------
      // //查询
      // searchEnterFun(e){
      //   this.$store.state.pageSeach.pageNum = 1;
      //   this.resData.pageNum=1;
      //   keyBoardEnter(e, () => {
      //     this.list();
      //   })
      // },
      getRowkeys(row){
        return row.ID;
      },
      //  获取列表
      list() {
        this.$store.state.pageSeach=this.query;
        queryList(this.resData,this.query).then(res => {
          this.resData = res.data
        })
      },
      toChange(t) {
        if(t.name == "first") {
          this.$router.push('/AUDIT/messageDeclare/productMessageDeclareList');
        }if(t.name == "three") {
          this.$router.push('/AUDIT/messageDoubt/productMessageDoubt');
        }if(t.name == "four") {
          this.$router.push('/AUDIT/messageDoubt/productMessageDoubtChange');
        }if(t.name == "five") {
          this.$router.push('/AUDIT/orgClarify/productMessageDeclareClarify');
        }if(t.name == "six") {
          this.$router.push('/AUDIT/orgClarify/productMessageChangeClarify');
        }
      },
      // ************************
      handleSizeChange(val) {
        this.$store.state.pageSeach.pageSize = val
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
        sessionStorage.removeItem('query')
        this.query=this.metaQuery();
        this.list();
      },
      handleGoAddList(){
        this.$router.push("/AUDIT/messageChanges/addProductMessageChangeList")
      },
      handleCurrentChange(val) {
        this.$store.state.pageSeach.pageNum = val
        this.resData.pageNum = val
        this.list()
      },
      findView(id,productId){
        this.$nextTick(() => {
          this.$refs.findView.list(productId,id)
        })
      },
      update(id,productId,copyFlag){
        this.$nextTick(() => {
        if(copyFlag){
          checkProductChange(productId).then(res =>{
            if(res.data != '0'){
              this.$message.error("该产品正在变更中");
            }else{
              this.$refs.change.list(productId,id,true)
            }
          })
        }else{
          this.$refs.change.list(productId,id)
        }
        })
      },
      rollback(id){
        rollbackChange(id).then(res =>{
          if(res.success){
            this.$message({
              message: res.exceptionMessage,
              type:'success'
            })
            onClose: ()=>{
              this.list()
            }
          }else {
            this.$message({
              message: res.exceptionMessage,
              type: 'error'
            })
          }
        })
       /* rollbackChange(id);
        this.list();*/
      },
      submit(id){
        submitChange(id).then(res =>{
          this.$message({
            message: '提交成功',
            type: 'success',
            duration:1000,
            onClose: ()=>{
              this.list()
            }
          })
        })
       /* submitChange(id);
        this.list();*/
      },
      remove(id){
        this.$confirm(`确定删除吗?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteProductChange(id).then(res => {
            this.$message({
              message: '删除成功',
              type: 'success',
              duration: 1000,
              onClose: () => {
                this.list()
              }
            })
          })
        })

       /* deleteProductChange(id);
        this.list();*/
      }
    }
  }
</script>

