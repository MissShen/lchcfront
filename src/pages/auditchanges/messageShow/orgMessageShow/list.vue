<template>

  <!-- 表格 -->
  <div class="tablebox">
        <!-- 表格查询表单 -->
          <el-form ref="query" :model="query" label-position="right" size="small" :inline="true" class="table-form">
              <el-form-item>
                <el-input v-model="query.name" placeholder="企业名称" @keyup.enter.native="searchEnterFun" size="small"></el-input>
              </el-form-item>
              <el-form-item>
                <el-input v-model="query.creditCode" placeholder="社会统一信用代码" @keyup.enter.native="searchEnterFun" size="small"></el-input>
              </el-form-item>
              <el-form-item>
                <el-input v-model="query.organizeCode" placeholder="组织机构代码" @keyup.enter.native="searchEnterFun" size="small"></el-input>
              </el-form-item>
              <span>
                <el-button type="success" @click="searchEnterFun" size="small">查询</el-button>
                <el-button type="warning" @click="restQuery" size="small">重置</el-button>
              </span>
          </el-form>

        <div class="tableset">
          <el-table
            :data="resData.list"
            border
            stripe
            @selection-change="handleSelectionChange">
            <el-table-column label="企业名称" show-overflow-tooltip>
              <template slot-scope="scope">
                  <span>{{scope.row.name}}</span>
              </template>
            </el-table-column>
            <el-table-column label="企业简称">
              <template slot-scope="scope">
                <span>{{scope.row.abbr}}</span>
              </template>
            </el-table-column>
            <el-table-column label="社会统一信用代码">
              <template slot-scope="scope">
                <span>{{scope.row.creditCode}}</span>
              </template>
            </el-table-column>
            <el-table-column label="组织机构代码">
              <template slot-scope="scope">
                <span>{{scope.row.organizeCode}}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="100">
              <template slot-scope="scope">
                <div class="operates">
                  <span><a class="operation-btn" @click="handleView(scope.row.id)">查看详情</a></span>
                </div>

                <!--<el-button @click="handleView(scope.row.id)" type="text" size="small">查看详情</el-button>-->
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
    <org-page ref="orgPage"></org-page>
  </div>

</template>

<script>
  import {queryList} from 'src/axios/auditchanges/infoshow/orgInfoShow'
  import {keyBoardEnter} from "src/utils";
  import orgPage from "./orgPage";
  export default {
    components:{
      orgPage
    },
    data () {
      return {
        resData: this.metaData(),
        activeName: 'first',//标签页默认选中第一个
        form: this.metaForm(), // 表单初始化
        query: this.metaQuery(), // 查询初始化
        showForm: false, // 表单可见性初始化
        showQuery: false, // 表单查询初始化
        formStatus: 'add', // 表单状态 add
        roleDialogVisible: false, // 角色对话框可见性 不可见
        roleDialogLoading: false, // 角色加载状态   已加载
        roleTree: [], // 角色分配树节点
        defaultProps: {
          children: 'children',
          label: 'name',
          id: 'id'
        }
      }
    },
    created () {
      this.list()
    },
    methods: {
      // -------------------------------------------- 数据初始化  -----------------------------------------
      metaData () {
        return {
         // 前后台交互数据封装格式
            pageNum: 1,
            pageSize: 10,
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
      },
      metaForm () { // 表单数据初始化
        return {
          /*   form: {*/
          id: undefined,
          name:undefined,
          abbr:undefined,
          creditCode: undefined,
          organizeCode: undefined


          /* }*/
        }
      },

      metaQuery () { // 表单查询数据初始化
        return {
          query: {
            id: undefined,
            name:undefined,
            abbr:undefined,
            creditCode: undefined,
            organizeCode: undefined
          }
        }
      },
      //查询
      searchEnterFun(e){
        this.$store.state.pageSeach.pageNum = 1;
        this.resData.pageNum=1;
        keyBoardEnter(e, () => {
          this.list();
        })
      },
      // ------------------------------------------------- 处理方法 ----------------------------------------
      list () {
        queryList(this.resData, this.query).then(res => {
          console.log(res);
          this.resData = res.data
        })
      },
      handleSizeChange (val) {
        this.resData.pageSize = val
        this.list()
      },
      handleCurrentChange (val) {
        this.resData.pageNum = val
        this.list()
      },
      handleQuery(){
        this.list()
      },
      handleSelectionChange(val){
        //val 所选对象
      },
      restQuery(){//重置
        this.query=this.metaQuery();
        this.list()
      },
      handleView(id) {
        this.$nextTick(() => {
          this.$refs.orgPage.list(id)
        })
      }
    }
  }
</script>
