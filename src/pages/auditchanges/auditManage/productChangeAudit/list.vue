<template>
    <div class="tab-box">
      <el-tabs v-model="activeName" @tab-click="toChange">
        <el-tab-pane label="产品信息申报审核" name="first" />
        <el-tab-pane label="产品信息变更审核" name="second" />
      </el-tabs>
      <!--<div class="iregular-tabs">-->
        <!--<span class="el-tabs__item"><router-link to="/AUDIT/auditManage/productDeclareAuditList">产品信息申报审核</router-link></span>-->
        <!--<span class="el-tabs__item is-active">产品信息变更审核</span>-->
      <!--</div>-->
      <!--<span class="tab-bar"></span>-->
      <!-- 表格 -->
      <!-- 表格查询表单 -->
      <div class="el-tabs__content">
        <div class="tablebox">
            <el-form ref="query" :model="query" :inline="true" class="demo-form-inline table-form">
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
                      <el-select v-model="query.CHECKSTATE" placeholder="全部" size="small">
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

          <div class="tableset">
            <el-table
              :data="resData.list"
              border
              stripe
            >
              <el-table-column label="申报号" width="100px" show-overflow-tooltip>
                <template slot-scope="scope">
                  <span>{{scope.row.ID}}</span>
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
                  <span>{{scope.row.DOSAGE}}</span>
                </template>
              </el-table-column>
              <el-table-column label="规格" width="150px" show-overflow-tooltip>
                <template slot-scope="scope">
                  <span>{{scope.row.SPEC}}</span>
                </template>
              </el-table-column>
              <el-table-column label="转换比" width="60px">
                <template slot-scope="scope">
                  <span>{{scope.row.STANDRATE}}</span>
                </template>
              </el-table-column>
              <el-table-column label="单位" width="50px">
                <template slot-scope="scope">
                  <span>{{scope.row.METRIC}}</span>
                </template>
              </el-table-column>
              <el-table-column label="包材" width="60px" show-overflow-tooltip>
                <template slot-scope="scope">
                  <span>{{scope.row.WRAP}}</span>
                </template>
              </el-table-column>
              <el-table-column label="生产企业" show-overflow-tooltip>
                <template slot-scope="scope">
                  <span>{{ scope.row.MANUFACTURE }}</span>
                </template>
              </el-table-column>
              <el-table-column label="申报时间">
                <template slot-scope="scope">
                  <span>{{scope.row.DECLAREDATE}}</span>
                </template>
              </el-table-column>
              <el-table-column label="质疑数量">
                <template slot-scope="scope">
                  <span>{{ scope.row.QUESTIONNUM }}</span>
                </template>
              </el-table-column>
              <el-table-column label="审核状态">
                <template slot-scope="scope">
                  <span>{{scope.row.CHECKSTATE=='0'?'未审核':{'1':'一审','2':'二审','3':'三审','4':'四审','5':'五审'}[scope.row.CHECKSTATE]}}</span>
                </template>
              </el-table-column>
              <el-table-column label="审核结果">
                <template slot-scope="scope">
                  <span>{{{"0":"未审核","1":"审核通过","2":"待确认","3":"审核不通过"}[scope.row.AUDITRESULTS]}}</span>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="120px">
                <template slot-scope="scope">
                  <div class="operates">
                    <!--一个账号审核一次-->
                    <span v-if="scope.row.AUDITFLAG == '1' && scope.row.STATE == '5'"><a class="operation-btn" @click="fromAudit(scope.row.ID,scope.row.PRODUCTID)">审核</a></span>
                    <span><a class="operation-btn" @click="handleView(scope.row.ID,scope.row.PRODUCTID)">查看</a></span>
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
          <find-view ref="findView"></find-view>
          <audit ref="audit"></audit>
        </div>
      </div>
    </div>
</template>


<script>
  import findView from './findView'
  import audit from './audit'
  import {queryProjectCheckCount} from 'src/axios/auditchanges/auditManage/productDeclareAudit'
  import {queryList} from 'src/axios/auditchanges/auditManage/productChangeAudit'
  import {keyBoardEnter} from "src/utils";
  export default {
    components:{
      findView,
      audit
    },
    data() {
      return {
        resData: this.metaData(),
        activeName: 'second',//标签页默认选中第一个
        query: this.metaQuery(), // 查询初始化
        count:4,
        options: []
      }
    },
    created() {
      this.list()
    },
  /*  //导航守卫 监测到路由变化后 删除本地搜索条件
    beforeRouteLeave(to,from,next){
      sessionStorage.removeItem('query')
      next()
    },*/
    methods: {
      toChange(t) {
        if(t.name == "first") {
          this.$router.push('/AUDIT/auditManage/productDeclareAuditList');
        }
      },
      // -------------------------------------------- 数据初始化  -----------------------------------------
      metaData() {
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
      metaQuery() { // 表单查询数据初始化
        let obj = {
          //查询封装的数据
          PRODUCT: undefined,
          DOSAGE: undefined,
          SPEC: undefined,
          MANUFACTURE: undefined,
          CHECKSTATE: undefined
        }
        if(sessionStorage.getItem('query')){
          obj = JSON.parse(sessionStorage.getItem('query'))
        }
        return obj
      },
     /* searchEnterFun(e){
        sessionStorage.setItem('query',JSON.stringify(this.query))
        this.$store.state.pageSeach.pageNum = 1;
        this.resData.pageNum=1;
        keyBoardEnter(e, () => {
          this.list();
        })
      },*/
      // ------------------------------------------------- 处理方法 ----------------------------------------
      //初始化调用的方法
      list() {
        queryList(this.resData,this.query).then(res=>{
          this.resData = res.data
        })
        //没有项目id之后打开就行了
//        queryProjectCheckCount().then(res=>{
//          this.count = res.data;
//        })
        let count = parseInt(this.count);
        let options = [{key:'',value:'',label:'全部'},{key:'0',value:'0',label:"未审核"}];
        for (let i=1;i<=count;i++){
          options.push({key:i,value:i,label:i+"审"});
        }
        this.options = options;
      },
      handleQuery(){
        this.list()
      },
      restQuery(){//重置
        sessionStorage.removeItem('query')
        this.query=this.metaQuery();this.list();
      },
      // ************************
      handleSizeChange(val) {
        this.resData.pageSize = val
        this.list()
      },
      handleCurrentChange(val) {
        this.resData.pageNum = val
        this.list()
      },
      fromAudit(id,productId){
        this.$nextTick(() => {
          this.$refs.audit.list(id,productId)
        })
      },
      handleView(id,productId) {
        this.$nextTick(() => {
          this.$refs.findView.list(id,productId)
        })
      }
    }
  }
</script>

<style scoped>

</style>
