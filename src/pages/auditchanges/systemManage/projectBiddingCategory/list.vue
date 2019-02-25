<template>
  <!-- 表格 -->
  <div class="tablebox">
    <!-- 表格查询表单 -->
      <el-form ref="query" :model="query" label-position="right" size="small" :inline="true" class="table-form">
          <el-form-item>
            <el-select v-model="query.searchProjectId" placeholder="全部项目" size="small">
              <el-option
                label="全部项目"
                value="">
              </el-option>
              <el-option
                v-for="item in projectList"
                :key="item.id"
                :label="item.projectName"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-input v-model="query.searchName" placeholder="标的物类别名称" @keyup.enter.native="searchEnterFun" size="small"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="success" @click="searchEnterFun" size="small">查询</el-button>
            <el-button type="warning" @click="restQuery" size="small">重置</el-button>
          </el-form-item>
      </el-form>

    <div class="table-caption foot-btn">
      <div class="foot-left">
        <el-button type="success" size="small" @click="handleFromView()">新增</el-button>
      </div>
    </div>

    <!-- 表格列表 -->
    <div class="tableset">
      <el-table
        :data="resData.list"
        border
        stripe
        :row-key="getRowkeys"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="50" :reserve-selection="true" align="center"></el-table-column>
        <el-table-column label="所属项目" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.catProjectId }}</span>
          </template>
        </el-table-column>
        <el-table-column label="标的物类别名称" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.categoryName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <div class="operates">
              <span><a class="operation-btn" @click="handleView(scope.row.id)">查看</a></span>
              <span><a class="operation-btn" @click="handleFromView(scope.row.id)">修改</a></span>
              <span><a class="operation-btn" @click="handleDelete(scope.row.id)">删除</a></span>
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
    <add-or-update v-if="formViewVisible" ref="addOrUpdate" @refreshData="list"></add-or-update>
    <find-view v-if="viewVisible" ref="findView" ></find-view>
  </div>

</template>
<script>

  // 引入用户相关请求
  import {queryList,projectList,remove} from 'src/axios/auditchanges/systemManage/projectBiddingCategory'
  import {keyBoardEnter} from "src/utils";
  import addOrUpdate from './addOrUpdate'
  import findView from './findView'
  export default {
    name:'list',
    components: {
      addOrUpdate,
      findView
    },
    data () {
      return {
        // activeName: 'first',  // 当前标签
        resData: this.metaData(),
        // form: this.metaForm(), // 表单初始化
        query: this.metaQuery(), // 查询初始化
        // showForm: false, // 表单可见性初始化
        // showQuery: false, // 表单查询初始化
        formViewVisible: false,
        viewVisible:false,
        // defaultProps: {
        //   children: 'children',
        //   label: 'name',
        //   id: 'id'
        // },
        projectList:this.searchProject(),
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
            // prePage: 0,
            // nextPage: 0,
            // isFirstPage: false,
            // isLastPage: true,
            // hasPreviousPage: false,
            // hasNextPage: false,
            // navigatePages: 8,
            // navigatepageNums: [],
            // navigateFirstPage: 0,
            // navigateLastPage: 0,
            // firstPage: 0,
            // lastPage: 0,
            list: []
        }
      },
      metaForm () { // 表单数据初始化
        return {
          id: undefined,
          catProjectId: undefined,
          categoryName: undefined
        }
      },
      metaList() { // 立即加载数据初始化
        queryList(this.resData,this.query).then(res => {
          console.log(this.query);
          this.resData = res.data
        })
      },
      metaQuery () { // 表单查询数据初始化
        return {
          query: {
            searchProjectId: undefined,
            searchName: undefined
          }
        }
      },
      searchProject(){
        return {
          projectList : {
            id:undefined,
            projectName:undefined
          }
        }
      },
      getRowkeys(row){
        return row.id;
      },
      //查询并绑定回车事件
      searchEnterFun(e){
        this.$store.state.pageSeach.pageNum = 1;
        this.resData.pageNum=1;
        keyBoardEnter(e, () => {
          this.list();
        })
      },
      //  获取用户分页列表
      list () {
        queryList(this.resData, this.query).then(res => {
          console.log(res.data);
          this.resData = res.data
        });

          projectList().then(res => {
            console.log(res.data);
            this.projectList = res.data
          })
      },
      // ************************
      handleSizeChange (val) {
        this.resData.pageSize = val;
        this.list()
      },
      handleCurrentChange (val) {
        this.resData.pageNum = val;
        this.list()
      },
      // handleQuery(){
      //   this.list()
      // },
      //重置
      restQuery(){
        this.query=this.metaQuery();
        this.list();
      },
      //修改
      handleFromView(id) {
        this.formViewVisible = true;
        this.$nextTick(() => {
          this.$refs.addOrUpdate.fillData(id)
        })
      },
      //查看
      handleView(id) {
        this.viewVisible = true;
        this.$nextTick(() => {
          this.$refs.findView.fillData(id)
        })
      },
      //所选对象
      handleSelectionChange(val){
        //val 所选对象
      },
      //删除
      handleDelete(id) {
        this.$confirm(`确定删除吗?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          remove(id).then(res => {
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
      }
    }
  }
</script>
